from datetime import datetime, timezone
import uuid
from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    Text,
    DateTime,
    JSON
)
from backend.app.core.database import Base


def get_utc_now():
    return datetime.now(timezone.utc)


class VoiceQueryLog(Base):
    """
    Debug entity recording end-to-end voice AI query traces:
    - Raw STT transcript & confidence
    - User edited transcript (Phase 2)
    - Top 5 retrieved chunks with relevance/similarity scores
    - Final LLM prompt constructed
    - Final generated answer
    - Diagnosed failure stage (STT vs Retrieval vs Prompting)
    """
    __tablename__ = "voice_query_logs"

    id = Column(String(100), primary_key=True, default=lambda: f"vlog-{uuid.uuid4().hex[:12]}")
    created_at = Column(DateTime, default=get_utc_now, nullable=False, index=True)

    # 1. Speech Recognition (STT) Stage
    raw_stt_transcript = Column(Text, nullable=False)
    stt_confidence = Column(Float, nullable=False, default=1.0)
    user_edited_transcript = Column(Text, nullable=True)
    stt_language = Column(String(20), default="en-IN", nullable=False)
    stt_provider = Column(String(50), default="web_speech", nullable=False)

    # Academic Scope Context
    board_id = Column(String(50), nullable=False, default="cbse")
    class_level = Column(Integer, nullable=False, default=10)
    subject_id = Column(String(100), nullable=False, default="science")
    current_chapter_id = Column(String(120), nullable=True)  # Populated when client context forced a chapter

    # 2. Retrieval Stage (RAG)
    # Stored as JSON list of 5 objects: [{ rank, topic_id, topic_title, chapter_id, chapter_title, score, content, method }]
    retrieved_chunks = Column(JSON, nullable=False, default=list)
    retrieval_confidence = Column(Float, nullable=False, default=0.0)
    retrieval_strategy = Column(String(50), default="vector_only", nullable=False)  # 'vector_only', 'hybrid_reranked'

    # 3. LLM Generation Stage
    final_llm_prompt = Column(Text, nullable=False)
    final_answer = Column(Text, nullable=False)
    llm_model = Column(String(100), default="gemini-2.0-flash", nullable=False)
    response_type = Column(String(50), default="direct_answer", nullable=False)  # 'direct_answer', 'clarification_question'

    # Diagnostics & Status
    diagnosed_stage = Column(String(50), default="healthy", nullable=False)  # 'retrieval_mismatch', 'stt_low_confidence', 'llm_drift', 'healthy'
    status = Column(String(50), default="completed", nullable=False)  # 'completed', 'clarification_requested', 'error'
    latency_ms = Column(Integer, default=0, nullable=False)
