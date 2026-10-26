from datetime import datetime, timezone, timedelta
import pytest
from fastapi.testclient import TestClient
from sqlalchemy.pool import StaticPool
from backend.app.main import app
from backend.app.core.database import get_db, Base, create_engine, sessionmaker
from backend.app.models.voice_log import VoiceQueryLog
from backend.app.services.voice_service import VoiceRetrievalEngine, VoiceQueryManager

# In-memory test DB for voice tests with StaticPool
TEST_DB_URL = "sqlite:///:memory:"
test_engine = create_engine(
    TEST_DB_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

@pytest.fixture(scope="module")
def client():
    Base.metadata.create_all(bind=test_engine)
    
    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()
            
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=test_engine)


def test_voice_query_logging_fields(client):
    """
    PHASE 1 VERIFICATION:
    Ensure raw STT transcript, STT confidence, top 5 retrieved chunks with scores,
    final LLM prompt, and final answer are stored in the debug table.
    """
    payload = {
        "transcript": "what is electric potential difference and ohm's law?",
        "confidence": 0.94,
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "current_chapter_id": "cbse-10-science-ch11",
        "force_current_chapter": False,
        "use_hybrid_retrieval": True,
        "strict_llm_prompt": True
    }
    
    response = client.post("/api/voice/query", json=payload)
    assert response.status_code == 201
    data = response.json()
    
    # 1. Verify required debug trace fields in response
    assert "id" in data
    assert data["raw_stt_transcript"] == payload["transcript"]
    assert data["stt_confidence"] == 0.94
    assert len(data["retrieved_chunks"]) == 5
    assert "final_llm_prompt" in data
    assert len(data["final_llm_prompt"]) > 50
    assert "final_answer" in data
    assert len(data["final_answer"]) > 20
    assert data["status"] == "completed"
    
    # 2. Verify top chunks structure and scores
    top_chunk = data["retrieved_chunks"][0]
    assert "rank" in top_chunk and top_chunk["rank"] == 1
    assert "chunk_id" in top_chunk
    assert "topic_title" in top_chunk
    assert "score" in top_chunk
    assert top_chunk["score"] > 0.0


def test_admin_role_enforcement_403_for_non_admins(client):
    """
    PHASE 1 REQUIREMENT:
    Enforce Voice Debug access on the backend API (403 for non-admins).
    """
    # 1. No role header provided -> 403 Forbidden
    resp_no_header = client.get("/api/voice/logs")
    assert resp_no_header.status_code == 403
    assert "Admin role required" in resp_no_header.json()["detail"]

    # 2. Student role provided -> 403 Forbidden
    resp_student = client.get("/api/voice/logs", headers={"x-user-role": "student"})
    assert resp_student.status_code == 403
    assert "Admin role required" in resp_student.json()["detail"]

    # 3. Non-admin trying to fetch log details -> 403 Forbidden
    resp_detail_unauth = client.get("/api/voice/logs/vlog-test-123", headers={"x-user-role": "student"})
    assert resp_detail_unauth.status_code == 403

    # 4. Non-admin trying to delete logs -> 403 Forbidden
    resp_delete_unauth = client.delete("/api/voice/logs", headers={"x-user-role": "student"})
    assert resp_delete_unauth.status_code == 403

    # 5. Non-admin trying to trigger cleanup -> 403 Forbidden
    resp_cleanup_unauth = client.post("/api/voice/cleanup", headers={"x-user-role": "student"})
    assert resp_cleanup_unauth.status_code == 403

    # 6. Admin role provided -> 200 OK
    resp_admin = client.get("/api/voice/logs", headers={"x-user-role": "admin"})
    assert resp_admin.status_code == 200
    logs = resp_admin.json()
    assert isinstance(logs, list)
    assert len(logs) >= 1

    first_log_id = logs[0]["id"]
    resp_admin_detail = client.get(f"/api/voice/logs/{first_log_id}", headers={"x-user-role": "admin"})
    assert resp_admin_detail.status_code == 200
    assert resp_admin_detail.json()["id"] == first_log_id


def test_auto_deletion_of_logs_after_7_days(client):
    """
    PHASE 1 REQUIREMENT:
    Add auto-deletion of debug logs after 7 days.
    """
    db = TestingSessionLocal()
    try:
        now = datetime.now(timezone.utc)
        
        # Insert a log from 10 days ago (expired)
        expired_log = VoiceQueryLog(
            id="vlog-expired-10d",
            created_at=now - timedelta(days=10),
            raw_stt_transcript="expired ancient query",
            stt_confidence=0.99,
            board_id="cbse",
            class_level=10,
            subject_id="science",
            retrieved_chunks=[],
            retrieval_confidence=0.0,
            retrieval_strategy="vector_only",
            final_llm_prompt="test prompt",
            final_answer="test answer",
            diagnosed_stage="healthy",
            latency_ms=10
        )
        # Insert a log from 2 days ago (active)
        active_log = VoiceQueryLog(
            id="vlog-active-2d",
            created_at=now - timedelta(days=2),
            raw_stt_transcript="active recent query",
            stt_confidence=0.95,
            board_id="cbse",
            class_level=10,
            subject_id="science",
            retrieved_chunks=[],
            retrieval_confidence=0.0,
            retrieval_strategy="vector_only",
            final_llm_prompt="test prompt",
            final_answer="test answer",
            diagnosed_stage="healthy",
            latency_ms=10
        )
        db.add(expired_log)
        db.add(active_log)
        db.commit()
    finally:
        db.close()

    # Trigger GET /logs as admin (which runs auto-pruning)
    resp = client.get("/api/voice/logs", headers={"x-user-role": "admin"})
    assert resp.status_code == 200
    returned_log_ids = [l["id"] for l in resp.json()]

    # Expired log must NOT be present
    assert "vlog-expired-10d" not in returned_log_ids
    # Active log must still be present
    assert "vlog-active-2d" in returned_log_ids

    # Also verify cleanup endpoint
    cleanup_resp = client.post("/api/voice/cleanup?days=7", headers={"x-user-role": "admin"})
    assert cleanup_resp.status_code == 200
    assert "deleted_count" in cleanup_resp.json()


def test_seed_demo_logs_removed_from_production(client):
    """
    PHASE 1 REQUIREMENT:
    Remove the 'Seed Diagnostic Demo Logs' button and any demo/fake log data from production builds.
    Endpoint /seed-demo-logs must no longer exist (404/405).
    """
    resp = client.post("/api/voice/seed-demo-logs")
    assert resp.status_code in (404, 405)
