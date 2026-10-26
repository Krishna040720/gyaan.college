import re
import uuid
import logging
from datetime import datetime, timezone
from typing import List, Optional, Any, Dict
from fastapi import APIRouter, Depends, HTTPException, Query, Header, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.models.voice_log import VoiceQueryLog
from backend.app.services.voice_service import VoiceQueryManager

logger = logging.getLogger("voice_api")
router = APIRouter(prefix="/api/voice", tags=["Voice AI & Diagnostics"])


def require_admin(
    x_user_role: Optional[str] = Header(None, alias="x-user-role"),
    authorization: Optional[str] = Header(None, alias="authorization")
) -> str:
    """
    Enforces role 'admin' for debug trace and management endpoints.
    Raises 403 Forbidden for non-admins or unauthenticated users.
    """
    role = (x_user_role or "").strip().lower()
    if not role and authorization:
        auth_clean = authorization.strip().lower()
        if "admin" in auth_clean:
            role = "admin"

    if role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden: Admin role required to access voice debug logs"
        )
    return role


class VoiceQueryRequest(BaseModel):
    transcript: str = Field(..., min_length=1, description="Raw or recognized speech transcript")
    confidence: float = Field(default=1.0, ge=0.0, le=1.0, description="STT confidence score (0 to 1)")
    user_edited_transcript: Optional[str] = Field(default=None, description="Transcript edited by student (Phase 2)")
    board_id: str = Field(default="cbse", description="Board identifier (e.g. cbse, icse, up_board)")
    class_level: int = Field(default=10, ge=1, le=12, description="Class level (1 to 12)")
    subject_id: str = Field(default="science", description="Subject key (science, physics, maths, etc.)")
    current_chapter_id: Optional[str] = Field(default=None, description="Currently open chapter ID in workspace")
    force_current_chapter: bool = Field(default=False, description="Whether retrieval was forced to current chapter (disabled by default in real pipeline)")
    use_hybrid_retrieval: bool = Field(default=True, description="Enable hybrid keyword + vector retrieval (enabled by default)")
    strict_llm_prompt: bool = Field(default=True, description="Enable strict topic-grounded LLM prompt (enabled by default)")
    stt_language: str = Field(default="en-IN", description="STT spoken language code")


class RetrievedChunkSchema(BaseModel):
    rank: int
    chunk_id: str
    chapter_id: str
    chapter_title: str
    topic_id: str
    topic_title: str
    score: float
    content: str
    method: str


class VoiceQueryResponse(BaseModel):
    id: str
    created_at: str
    raw_stt_transcript: str
    stt_confidence: float
    user_edited_transcript: Optional[str]
    retrieved_chunks: List[Dict[str, Any]]
    retrieval_confidence: float
    final_llm_prompt: str
    final_answer: str
    diagnosed_stage: str
    response_type: str
    status: str
    latency_ms: int


class CleanTranscriptRequest(BaseModel):
    rawTranscript: str = Field(..., description="Raw speech recognition transcript")
    vocabularyHints: Optional[List[str]] = Field(default=None, description="Chapter key vocabulary terms")
    conceptTitle: Optional[str] = Field(default=None, description="Concept title")
    chapterId: Optional[str] = Field(default=None, description="Chapter ID")


class CleanTranscriptResponse(BaseModel):
    raw: str
    corrected: str
    hasCorrection: bool
    suggestedText: str


@router.post("/clean-transcript", response_model=CleanTranscriptResponse, tags=["Voice AI & Diagnostics"])
def clean_voice_transcript(payload: CleanTranscriptRequest, db: Session = Depends(get_db)):
    """
    PHASE 4: Transcript Cleanup & Mishearing Correction
    Corrects likely speech mishearings using chapter vocabulary before evaluation.
    Logs raw and corrected transcripts for admin inspection.
    """
    raw = payload.rawTranscript.strip()
    cleaned = raw

    replacements = [
        (r"\belectricity\s+dies\s+available\s+charge\b", "Electricity is the flow of electric charge"),
        (r"\bAtlantic\s+City\b", "Electricity"),
        (r"\batlantic\s+city\b", "electricity"),
        (r"\bdies\s+available\s+charge\b", "flow of charge"),
        (r"\bdies\s+available\b", "is flow of"),
        (r"\bavailable\s+charge\b", "electric charge"),
        (r"\bhome'?s\s+law\b", "Ohm's law"),
        (r"\bhomes\s+law\b", "Ohm's law"),
        (r"\bresister\b", "resistor"),
        (r"\bcolumns?\b", "Coulombs"),
        (r"\bempires?\b", "Amperes"),
        (r"\bpotential\s+different\b", "potential difference"),
        (r"\bvolt\s+age\b", "voltage"),
        (r"\bserious\s+circuit\b", "series circuit"),
        (r"\bmagnetic\s+feel\b", "magnetic field"),
    ]

    for pattern, repl in replacements:
        cleaned = re.sub(pattern, repl, cleaned, flags=re.IGNORECASE)

    if payload.vocabularyHints:
        for hint in payload.vocabularyHints:
            if isinstance(hint, str) and len(hint) > 3:
                if "electric" in hint.lower() and "atlantic" in cleaned.lower():
                    cleaned = re.sub(r"atlantic", "electric", cleaned, flags=re.IGNORECASE)

    has_correction = cleaned.strip().lower() != raw.strip().lower()

    # Log to VoiceQueryLog for admin inspection
    try:
        log_entry = VoiceQueryLog(
            id=f"vlog-{uuid.uuid4().hex[:12]}",
            raw_stt_transcript=raw,
            user_edited_transcript=cleaned if has_correction else None,
            current_chapter_id=payload.chapterId or "teachback",
            status="cleaned" if has_correction else "verified",
            diagnosed_stage="SPEECH_CORRECTION",
            created_at=datetime.now(timezone.utc)
        )
        db.add(log_entry)
        db.commit()
    except Exception as log_err:
        logger.warning("Could not persist clean transcript log: %s", log_err)

    return CleanTranscriptResponse(
        raw=raw,
        corrected=cleaned.strip(),
        hasCorrection=has_correction,
        suggestedText=cleaned.strip() if has_correction else ""
    )


@router.get("/providers", tags=["Voice AI & Diagnostics"])
def get_providers_info():
    """
    Returns live information on configured AI providers (LLM, STT, TTS, Retrieval).
    """
    from backend.app.providers import get_llm_provider, get_stt_provider, get_tts_provider, get_retrieval_provider
    llm = get_llm_provider()
    stt = get_stt_provider()
    tts = get_tts_provider()
    ret = get_retrieval_provider()
    return {
        "status": "ok",
        "providers": {
            "llm": {"name": llm.name, "model": llm.model, "health": llm.health_check()},
            "stt": {"name": stt.name, "health": stt.health_check()},
            "tts": {"name": tts.name, "health": tts.health_check()},
            "retrieval": {"name": ret.name}
        }
    }


@router.post("/query", response_model=VoiceQueryResponse, status_code=status.HTTP_201_CREATED)
def submit_voice_query(payload: VoiceQueryRequest, db: Session = Depends(get_db)):
    """
    Submits a voice query into the end-to-end Voice AI pipeline:
    1. STT Transcript intake & confidence recording
    2. Top 5 chunk retrieval with similarity scores
    3. LLM prompt construction with retrieved context
    4. LLM answer generation
    5. Full trace persistence to VoiceQueryLog debug table
    """
    log_entry = VoiceQueryManager.process_voice_query(
        db=db,
        raw_transcript=payload.transcript,
        stt_confidence=payload.confidence,
        user_edited_transcript=payload.user_edited_transcript,
        board_id=payload.board_id,
        class_level=payload.class_level,
        subject_id=payload.subject_id,
        current_chapter_id=payload.current_chapter_id,
        force_current_chapter=payload.force_current_chapter,
        use_hybrid_retrieval=payload.use_hybrid_retrieval,
        strict_llm_prompt=payload.strict_llm_prompt,
        stt_language=payload.stt_language
    )

    return {
        "id": log_entry.id,
        "created_at": log_entry.created_at.isoformat(),
        "raw_stt_transcript": log_entry.raw_stt_transcript,
        "stt_confidence": log_entry.stt_confidence,
        "user_edited_transcript": log_entry.user_edited_transcript,
        "retrieved_chunks": log_entry.retrieved_chunks,
        "retrieval_confidence": log_entry.retrieval_confidence,
        "final_llm_prompt": log_entry.final_llm_prompt,
        "final_answer": log_entry.final_answer,
        "diagnosed_stage": log_entry.diagnosed_stage,
        "response_type": log_entry.response_type,
        "status": log_entry.status,
        "latency_ms": log_entry.latency_ms
    }


@router.get("/logs", tags=["Voice AI & Diagnostics"])
def get_voice_query_logs(
    limit: int = Query(50, ge=1, le=200),
    stage: Optional[str] = Query(None, description="Filter by diagnosed_stage"),
    db: Session = Depends(get_db),
    _admin: str = Depends(require_admin)
):
    """
    Retrieves logged voice query traces for the Admin Debug Screen.
    Auto-prunes logs older than 7 days.
    Restricted to admin users (HTTP 403 for non-admins).
    """
    # Auto-prune logs older than 7 days
    VoiceQueryManager.cleanup_expired_logs(db, days=7)

    query = db.query(VoiceQueryLog)
    if stage:
        query = query.filter(VoiceQueryLog.diagnosed_stage == stage)

    logs = query.order_by(VoiceQueryLog.created_at.desc()).limit(limit).all()

    return [
        {
            "id": log.id,
            "created_at": log.created_at.isoformat(),
            "raw_stt_transcript": log.raw_stt_transcript,
            "stt_confidence": log.stt_confidence,
            "user_edited_transcript": log.user_edited_transcript,
            "board_id": log.board_id,
            "class_level": log.class_level,
            "subject_id": log.subject_id,
            "current_chapter_id": log.current_chapter_id,
            "retrieved_chunks": log.retrieved_chunks,
            "retrieval_confidence": log.retrieval_confidence,
            "retrieval_strategy": log.retrieval_strategy,
            "final_llm_prompt": log.final_llm_prompt,
            "final_answer": log.final_answer,
            "diagnosed_stage": log.diagnosed_stage,
            "response_type": log.response_type,
            "status": log.status,
            "latency_ms": log.latency_ms
        }
        for log in logs
    ]


@router.get("/logs/{log_id}", tags=["Voice AI & Diagnostics"])
def get_voice_query_log_detail(
    log_id: str,
    db: Session = Depends(get_db),
    _admin: str = Depends(require_admin)
):
    """
    Returns full debug trace details for an individual voice query.
    Restricted to admin users (HTTP 403 for non-admins).
    """
    log = db.query(VoiceQueryLog).filter(VoiceQueryLog.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail=f"Voice log '{log_id}' not found")

    return {
        "id": log.id,
        "created_at": log.created_at.isoformat(),
        "raw_stt_transcript": log.raw_stt_transcript,
        "stt_confidence": log.stt_confidence,
        "user_edited_transcript": log.user_edited_transcript,
        "board_id": log.board_id,
        "class_level": log.class_level,
        "subject_id": log.subject_id,
        "current_chapter_id": log.current_chapter_id,
        "retrieved_chunks": log.retrieved_chunks,
        "retrieval_confidence": log.retrieval_confidence,
        "retrieval_strategy": log.retrieval_strategy,
        "final_llm_prompt": log.final_llm_prompt,
        "final_answer": log.final_answer,
        "diagnosed_stage": log.diagnosed_stage,
        "response_type": log.response_type,
        "status": log.status,
        "latency_ms": log.latency_ms
    }


@router.post("/cleanup", tags=["Voice AI & Diagnostics"])
def cleanup_old_debug_logs(
    days: int = Query(7, ge=1, le=90, description="Delete logs older than N days"),
    db: Session = Depends(get_db),
    _admin: str = Depends(require_admin)
):
    """
    Explicitly triggers auto-deletion of debug logs older than `days` (default 7 days).
    Restricted to admin users.
    """
    deleted_count = VoiceQueryManager.cleanup_expired_logs(db, days=days)
    return {
        "status": "ok",
        "deleted_count": deleted_count,
        "message": f"Successfully deleted voice debug logs older than {days} days"
    }


@router.delete("/logs", tags=["Voice AI & Diagnostics"])
def clear_voice_query_logs(
    db: Session = Depends(get_db),
    _admin: str = Depends(require_admin)
):
    """
    Clears all voice query debug logs.
    Restricted to admin users (HTTP 403 for non-admins).
    """
    count = db.query(VoiceQueryLog).delete()
    db.commit()
    return {"status": "ok", "deleted_count": count}
