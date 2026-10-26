# CHANGELOG — GYAAN.AI Full-Stack Platform

All notable changes to the cross-platform GYAAN.AI educational application (FastAPI + PostgreSQL pgvector + Flutter) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - Phase Roadmap

- **Phase 2:** Backend APIs (curriculum, quiz, auth, parental consent) with unit test coverage.
- **Phase 3:** Flutter mobile app: onboarding, board/class selector, dynamic curriculum navigation.
- **Phase 4:** Practice quiz engine, LaTeX formula rendering, 20 sample reviewed CBSE Class 10 Maths questions.
- **Phase 5:** Voice pipeline (streaming STT -> RAG -> LLM explanation -> TTS), teach-back mode on CBSE Class 10 Maths & Science.
- **Phase 6:** Adaptive practice, spaced repetition, offline local caching, low-bandwidth mode.
- **Phase 7:** Admin review portal, DPDP Act 2023 security audit, final end-to-end integration verification.

---

## [0.1.0] - 2026-10-18 (Phase 1: Project Setup, Schema, Migrations & Curriculum Seed)

### Added
- **Project Structure:** Established clean multi-tier repository architecture:
  - `backend/`: Python FastAPI + SQLAlchemy 2.0 + Alembic + pgvector + Pydantic v2.
  - `mobile_app/`: Cross-platform Flutter structure for Android & iOS with Riverpod, LaTeX rendering, offline SQLite, and STT/TTS support.
- **Database Schema Models (`backend/app/models/`):**
  - `Board`: Authoritative multi-board support (CBSE, CISCE/ISC, UP Board, Maharashtra, Tamil Nadu).
  - `AcademicClass`: Grade levels 1 through 12.
  - `Subject`: Board- and class-specific subjects with strict curriculum conformance.
  - `Chapter`: Statutory chapter records with syllabus provenance.
  - `Topic` & `Concept`: Canonical knowledge tree nodes with pgvector embedding support (`VectorType(1536)`).
  - `Question` & `QuizAttempt`: Multi-type question bank (MCQ, numerical, short/long answer, assertion-reason, case-based) with two-step verification workflow (`draft`, `reviewed`, `published`).
  - `User` & `ParentalConsent`: India DPDP Act 2023 compliant child-safe data models (zero tracking, verifiable parental consent).
- **Alembic Migrations:**
  - Initial database versioning script `001_initial_curriculum_and_quiz_schema.py` creating all 10 core tables with foreign keys and unique constraints.
- **Master Curriculum Seed Script (`backend/scripts/seed_curriculum.py`):**
  - Authoritative loading of 5 initial boards and 12 academic classes.
  - Exact subject compliance:
    - Classes 1–5: English, Maths, EVS, Hindi (4 subjects each).
    - Classes 6–9: English, Maths, Science, Social Science, Hindi (5 subjects each).
    - Class 10: IDENTICAL subject list for EVERY board (5 subjects).
    - Classes 11–12: Maths, English, Chemistry, Physics (4 subjects each).
    - Total seeded: 265 board-class-subject mappings (5 boards × 53 subjects).
  - Chapter lists sourced from official NCERT Rationalised 2026–27 documents (Class 10 Maths & Science, Class 11 & 12 Physics, Chemistry, Maths).
  - Strictly marked `TODO: Official syllabus document pending` placeholders for subjects awaiting official documents with ZERO invented chapter names.
- **Automated Test Suite (`backend/tests/`):**
  - 12 comprehensive unit tests running via Pytest (`test_curriculum_seed.py`, `test_api_health.py`).
  - 100% test pass rate verifying all subject rules, chapter provenance, data-driven extensibility, idempotency, and API health.
