"""
PHASE 2 VERIFICATION SUITE:
Applies the retrieval fix in the real pipeline:
1. Removes "Force Current Chapter" from the real voice flow.
2. Uses hybrid search + re-ranker over the whole board/class/subject.
3. Uses the strict grounded prompt by default.
4. Verifies 10 real test questions return their expected curriculum content.
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.pool import StaticPool
from backend.app.main import app
from backend.app.core.database import get_db, Base, create_engine, sessionmaker
from backend.app.services.voice_service import VoiceRetrievalEngine, VoiceQueryManager

TEST_DB_URL = "sqlite:///:memory:"
test_engine = create_engine(TEST_DB_URL, connect_args={"check_same_thread": False}, poolclass=StaticPool)
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


TEN_REAL_TEST_QUESTIONS = [
    {
        "id": 1,
        "query": "electricity",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "active_workspace_chapter": "cbse-10-science-ch12", # Student viewing Ch12 Magnetic Effects!
        "expected_chapter_id": "cbse-10-science-ch11",
        "expected_topic_keyword": "Electric",
        "forbidden_terms": ["bar magnet", "solenoid"],
        "required_in_answer": ["electric current", "electricity"]
    },
    {
        "id": 2,
        "query": "what is ohm's law and electrical resistance?",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "active_workspace_chapter": "cbse-10-science-ch09",
        "expected_chapter_id": "cbse-10-science-ch11",
        "expected_topic_keyword": "Ohm's Law",
        "forbidden_terms": ["snell's law", "lens"],
        "required_in_answer": ["ohm", "potential difference", "current"]
    },
    {
        "id": 3,
        "query": "bar magnet and magnetic field lines",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "active_workspace_chapter": "cbse-10-science-ch11",
        "expected_chapter_id": "cbse-10-science-ch12",
        "expected_topic_keyword": "Bar Magnet",
        "forbidden_terms": ["snell's law", "resistors in series"],
        "required_in_answer": ["magnet", "pole", "field lines"]
    },
    {
        "id": 4,
        "query": "how does a current-carrying solenoid act as a bar magnet?",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "active_workspace_chapter": "cbse-10-science-ch11",
        "expected_chapter_id": "cbse-10-science-ch12",
        "expected_topic_keyword": "Solenoid",
        "forbidden_terms": ["snell's law", "stoichiometry"],
        "required_in_answer": ["solenoid", "magnet"]
    },
    {
        "id": 5,
        "query": "explain fleming's left hand rule for force on a conductor",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "active_workspace_chapter": "cbse-10-science-ch01",
        "expected_chapter_id": "cbse-10-science-ch12",
        "expected_topic_keyword": "Fleming's Left-Hand Rule",
        "forbidden_terms": ["snell's law", "reactants"],
        "required_in_answer": ["fleming", "conductor", "force"]
    },
    {
        "id": 6,
        "query": "what is electromagnetic induction and faraday's principle?",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "active_workspace_chapter": "cbse-10-science-ch11",
        "expected_chapter_id": "cbse-10-science-ch12",
        "expected_topic_keyword": "Electromagnetic Induction",
        "forbidden_terms": ["chemical reaction", "concave mirror"],
        "required_in_answer": ["induced", "current"]
    },
    {
        "id": 7,
        "query": "joule's heating effect of electric current formula",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "active_workspace_chapter": "cbse-10-science-ch12",
        "expected_chapter_id": "cbse-10-science-ch11",
        "expected_topic_keyword": "Joule's Heating",
        "forbidden_terms": ["bar magnet", "solenoid"],
        "required_in_answer": ["heat", "joule"]
    },
    {
        "id": 8,
        "query": "snell's law and refraction of light through glass slab",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "active_workspace_chapter": "cbse-10-science-ch11",
        "expected_chapter_id": "cbse-10-science-ch09",
        "expected_topic_keyword": "Snell's Law",
        "forbidden_terms": ["bar magnet", "resistors"],
        "required_in_answer": ["refraction", "light"]
    },
    {
        "id": 9,
        "query": "balanced chemical equations and law of conservation of mass",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "active_workspace_chapter": "cbse-10-science-ch11",
        "expected_chapter_id": "cbse-10-science-ch01",
        "expected_topic_keyword": "Chemical Equations",
        "forbidden_terms": ["bar magnet", "refraction"],
        "required_in_answer": ["chemical", "mass"]
    },
    {
        "id": 10,
        "query": "representation of sets, subsets and power set",
        "board_id": "cbse",
        "class_level": 11,
        "subject_id": "maths",
        "active_workspace_chapter": "cbse-11-maths-ch05",
        "expected_chapter_id": "cbse-11-maths-ch01",
        "expected_topic_keyword": "Sets",
        "forbidden_terms": ["bar magnet", "refraction", "electric"],
        "required_in_answer": ["set", "subset"]
    }
]


@pytest.mark.parametrize("tcase", TEN_REAL_TEST_QUESTIONS, ids=[f"Q{t['id']}_{t['expected_topic_keyword']}" for t in TEN_REAL_TEST_QUESTIONS])
def test_ten_real_questions_hybrid_retrieval_and_grounded_answer(client, tcase):
    """
    PHASE 2 REQUIREMENT:
    Verify that in the real voice flow (without chapter locking):
    1. The query matches chunks across the full subject, NOT trapped in active_workspace_chapter.
    2. Rank 1 chunk is from the expected chapter.
    3. The generated answer addresses the requested topic without topic drift or forbidden terms.
    """
    payload = {
        "transcript": tcase["query"],
        "confidence": 0.97,
        "board_id": tcase["board_id"],
        "class_level": tcase["class_level"],
        "subject_id": tcase["subject_id"],
        "current_chapter_id": tcase["active_workspace_chapter"]
        # Defaults to: force_current_chapter=False, use_hybrid_retrieval=True, strict_llm_prompt=True
    }

    response = client.post("/api/voice/query", json=payload)
    assert response.status_code == 201
    data = response.json()

    # 1. Pipeline status must be healthy
    assert data["diagnosed_stage"] == "healthy"
    assert data["status"] == "completed"

    # 2. Retrieved Rank 1 chunk must match expected chapter
    top_chunk = data["retrieved_chunks"][0]
    assert top_chunk["chapter_id"] == tcase["expected_chapter_id"], (
        f"Query '{tcase['query']}' retrieved chapter '{top_chunk['chapter_id']}' ({top_chunk['chapter_title']}) "
        f"instead of expected '{tcase['expected_chapter_id']}'"
    )
    assert tcase["expected_topic_keyword"].lower() in top_chunk["topic_title"].lower()

    # 3. Method must be hybrid_reranked
    assert top_chunk["method"] == "hybrid_reranked"

    # 4. Final answer must contain required terms
    answer_lower = data["final_answer"].lower()
    for term in tcase["required_in_answer"]:
        assert term.lower() in answer_lower, (
            f"Expected answer for '{tcase['query']}' to contain '{term}'. Got: {data['final_answer']}"
        )

    # 5. Final answer must NOT contain forbidden drifted terms (e.g. electricity -> bar magnet)
    for forbidden in tcase["forbidden_terms"]:
        assert forbidden.lower() not in answer_lower, (
            f"Answer for '{tcase['query']}' contained forbidden drifted term '{forbidden}'. Got: {data['final_answer']}"
        )
