"""
Test Suite: Phase 1 Curriculum Seed & Structural Verification
Verifies all strict rules from Master Prompt:
- 5 authoritative boards (CBSE, CISCE/ISC, UP Board, Maharashtra, Tamil Nadu)
- Academic classes 1 to 12
- Classes 1-5: English, Maths, EVS, Hindi (4 subjects each)
- Classes 6-9: English, Maths, Science, Social Science, Hindi (5 subjects each)
- Class 10: IDENTICAL subject list for EVERY board: English, Maths, Science, Social Science, Hindi (5 subjects)
- Classes 11 and 12 (for every board): Maths, English, Chemistry, Physics (4 subjects each)
- Total subjects count = 5 boards * 53 subjects = 265
- Official chapter provenance verification & TODO placeholder compliance (zero invented names)
- Extensibility: Adding new boards purely via data without app code changes
- Idempotency: Re-running seed causes zero duplicates or errors
"""

import pytest
from backend.app.models.curriculum import Board, AcademicClass, Subject, Chapter
from backend.scripts.seed_curriculum import seed_curriculum, BOARDS_DATA


def test_seed_execution_integrity(db_session_seeded):
    """Verify seed script creates required entities without errors."""
    board_count = db_session_seeded.query(Board).count()
    class_count = db_session_seeded.query(AcademicClass).count()
    subject_count = db_session_seeded.query(Subject).count()
    chapter_count = db_session_seeded.query(Chapter).count()

    assert board_count == 5, f"Expected 5 initial boards, got {board_count}"
    assert class_count == 12, f"Expected 12 classes (1-12), got {class_count}"
    assert subject_count == 265, f"Expected 265 subjects (5 * 53), got {subject_count}"
    assert chapter_count >= 625, f"Expected at least 625 chapters, got {chapter_count}"


def test_all_five_boards_present(db_session_seeded):
    """Verify presence of CBSE, CISCE/ISC, UP Board, Maharashtra, and Tamil Nadu."""
    expected_board_ids = {"cbse", "icse", "up_board", "maharashtra", "tamil_nadu"}
    actual_board_ids = {b.id for b in db_session_seeded.query(Board).all()}

    assert expected_board_ids.issubset(actual_board_ids), (
        f"Missing boards: {expected_board_ids - actual_board_ids}"
    )


def test_classes_1_to_5_subjects(db_session_seeded):
    """Classes 1-5: Exactly 4 subjects (English, Maths, EVS, Hindi) for all boards."""
    expected_codes = {"english", "maths", "evs", "hindi"}
    boards = db_session_seeded.query(Board).all()

    for board in boards:
        for grade in range(1, 6):
            subjects = (
                db_session_seeded.query(Subject)
                .filter_by(board_id=board.id, class_id=grade)
                .all()
            )
            actual_codes = {s.code for s in subjects}

            assert len(subjects) == 4, (
                f"Board {board.id} Class {grade} must have 4 subjects, got {len(subjects)}"
            )
            assert actual_codes == expected_codes, (
                f"Board {board.id} Class {grade} codes mismatch: {actual_codes} != {expected_codes}"
            )


def test_classes_6_to_9_subjects(db_session_seeded):
    """Classes 6-9: Exactly 5 subjects (English, Maths, Science, Social Science, Hindi) for all boards."""
    expected_codes = {"english", "maths", "science", "social_science", "hindi"}
    boards = db_session_seeded.query(Board).all()

    for board in boards:
        for grade in range(6, 10):
            subjects = (
                db_session_seeded.query(Subject)
                .filter_by(board_id=board.id, class_id=grade)
                .all()
            )
            actual_codes = {s.code for s in subjects}

            assert len(subjects) == 5, (
                f"Board {board.id} Class {grade} must have 5 subjects, got {len(subjects)}"
            )
            assert actual_codes == expected_codes, (
                f"Board {board.id} Class {grade} codes mismatch: {actual_codes} != {expected_codes}"
            )


def test_class_10_identical_subject_list_for_every_board(db_session_seeded):
    """
    Class 10: IDENTICAL subject list for EVERY board:
    English, Maths, Science, Social Science, Hindi (5 subjects).
    """
    expected_codes = {"english", "maths", "science", "social_science", "hindi"}
    boards = db_session_seeded.query(Board).all()

    for board in boards:
        subjects = (
            db_session_seeded.query(Subject)
            .filter_by(board_id=board.id, class_id=10)
            .all()
        )
        actual_codes = {s.code for s in subjects}

        assert len(subjects) == 5, (
            f"Class 10 on board {board.id} must have exactly 5 subjects, got {len(subjects)}"
        )
        assert actual_codes == expected_codes, (
            f"Class 10 on board {board.id} subject mismatch: {actual_codes} != {expected_codes}"
        )


def test_classes_11_and_12_subjects(db_session_seeded):
    """Classes 11 and 12 (for every board): Maths, English, Chemistry, Physics (4 subjects each)."""
    expected_codes = {"maths", "english", "chemistry", "physics"}
    boards = db_session_seeded.query(Board).all()

    for board in boards:
        for grade in (11, 12):
            subjects = (
                db_session_seeded.query(Subject)
                .filter_by(board_id=board.id, class_id=grade)
                .all()
            )
            actual_codes = {s.code for s in subjects}

            assert len(subjects) == 4, (
                f"Board {board.id} Class {grade} must have 4 subjects, got {len(subjects)}"
            )
            assert actual_codes == expected_codes, (
                f"Board {board.id} Class {grade} codes mismatch: {actual_codes} != {expected_codes}"
            )


def test_total_subject_breakdown_per_board(db_session_seeded):
    """Each board must have exactly 53 subjects: (5*4) + (4*5) + (1*5) + (2*4) = 53."""
    boards = db_session_seeded.query(Board).all()
    for board in boards:
        count = db_session_seeded.query(Subject).filter_by(board_id=board.id).count()
        assert count == 53, f"Board {board.id} must have 53 subjects, got {count}"


def test_official_chapter_provenance_and_zero_invented_names(db_session_seeded):
    """
    Chapter lists must come from official syllabus documents (NCERT/CISCE/state board).
    If a syllabus file is not available, leave a clearly marked TODO placeholder.
    Do NOT invent chapter names.
    """
    # 1. Official chapters must have valid titles and official source
    cbse_c10_maths = (
        db_session_seeded.query(Chapter)
        .filter(Chapter.id.like("cbse-c10-maths%"))
        .all()
    )
    assert len(cbse_c10_maths) == 14, f"CBSE Class 10 Maths must have 14 official chapters, got {len(cbse_c10_maths)}"
    for chap in cbse_c10_maths:
        assert not chap.is_placeholder
        assert "NCERT" in chap.syllabus_source
        assert not chap.title.startswith("TODO:")

    # 2. Unverified/pending syllabus subjects must have explicit TODO placeholder without invented names
    placeholders = db_session_seeded.query(Chapter).filter_by(is_placeholder=True).all()
    assert len(placeholders) > 0, "Expected TODO placeholders for pending syllabus documents"
    for chap in placeholders:
        assert chap.title.startswith("TODO: Official syllabus document pending"), (
            f"Invalid placeholder title: {chap.title}"
        )
        assert chap.syllabus_source.startswith("TODO:")


def test_data_driven_extensibility_add_new_board(db_session_seeded):
    """
    The system must allow adding more boards by inserting data only (no app code changes).
    Verifies that inserting a new board and triggering seed creates its complete 53 subjects.
    """
    new_board = Board(
        id="karnataka",
        code="KSEAB",
        name="Karnataka School Examination and Assessment Board",
        state="Karnataka",
        description="State board for Karnataka schools.",
        is_active=True
    )
    db_session_seeded.add(new_board)
    db_session_seeded.flush()

    # Re-run seed to populate new board's subjects
    seed_curriculum(db_session_seeded)

    karnataka_subjects = (
        db_session_seeded.query(Subject)
        .filter_by(board_id="karnataka")
        .count()
    )
    assert karnataka_subjects == 53, (
        f"New board 'karnataka' must automatically receive all 53 compliant subjects, got {karnataka_subjects}"
    )


def test_seed_idempotency(db_session_seeded):
    """Running seed multiple times must be idempotent and produce identical counts."""
    # First re-run
    seed_curriculum(db_session_seeded)
    count_1 = db_session_seeded.query(Subject).count()

    # Second re-run
    seed_curriculum(db_session_seeded)
    count_2 = db_session_seeded.query(Subject).count()

    assert count_1 == count_2
