# GYAAN.AI (ज्ञान) • Cross-Platform AI Voice & Practice Learning Platform
## For Indian School Students (Classes 1–12)

[![CI Tests](https://img.shields.io/badge/tests-12%2F12%20passing-brightgreen)](#automated-testing)
[![FastAPI](https://img.shields.io/badge/backend-FastAPI%20%2B%20PostgreSQL%20pgvector-009688)](backend/)
[![Flutter](https://img.shields.io/badge/mobile-Flutter%20(Android%20%26%20iOS)-02569B)](mobile_app/)
[![DPDP Act 2023](https://img.shields.io/badge/privacy-India%20DPDP%20Act%202023%20Compliant-56358B)](#child-safety--privacy-dpdp-act-2023)

An adaptive, voice-first learning platform for Indian students in Classes 1–12 across CBSE, CISCE/ISC, and State Boards (UPMSP, Maharashtra, Tamil Nadu). Combines AI voice-based concept learning, Feynman teach-back active recall, and an adaptive practice quiz engine.

---

## 🏛️ System Architecture & Tech Stack

```text
                  ┌──────────────────────────────────────────────┐
                  │          Flutter Cross-Platform App          │
                  │             (Android First, iOS)             │
                  │   • Large-touch Child UI    • Riverpod State  │
                  │   • Voice STT / TTS          • LaTeX Formula  │
                  │   • Offline SQLite Cache     • Low Bandwidth  │
                  └──────────────────────┬───────────────────────┘
                                         │ REST & WebSockets
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │             Python FastAPI Backend           │
                  │   • Strict Board/Class Auth  • Pydantic v2   │
                  │   • Socratic Diagnostic RAG  • Quiz Engine   │
                  │   • Spaced Repetition (SM-2) • DPDP Consent  │
                  └──────────────────────┬───────────────────────┘
                                         │ SQLAlchemy 2.0 / Alembic
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │       PostgreSQL Database with pgvector      │
                  │   • Hierarchical Curriculum  • Vector Embed  │
                  │   • 2-Step Verified Questions• Zero Ad Store │
                  └──────────────────────────────────────────────┘
```

---

## 📚 Curriculum Scope (Data-Driven Architecture)

Content is organized strictly through database relationships with **zero hardcoding** in application code:

$$\text{Board} \longrightarrow \text{Academic Class} \longrightarrow \text{Subject} \longrightarrow \text{Chapter} \longrightarrow \text{Topic} \longrightarrow \text{Concept} \longrightarrow \text{Question}$$

### Statutory Subject Conformance Rules

| Grade Level | Statutory Subjects | Total Count |
| :--- | :--- | :--- |
| **Classes 1–5** | English, Mathematics, Environmental Studies (EVS), Hindi | **4 per class** |
| **Classes 6–9** | English, Mathematics, Science, Social Science, Hindi | **5 per class** |
| **Class 10** | **IDENTICAL for EVERY board:** English, Mathematics, Science, Social Science, Hindi | **5 per class** |
| **Classes 11 & 12** | Mathematics, English, Chemistry, Physics (Identical for all boards) | **4 per class** |

> **Extensibility Guarantee:** Additional state boards can be added dynamically simply by inserting a row into the `boards` table and running the seed routine.

### Official Syllabus Provenance
- Chapter titles are extracted exclusively from official syllabus documents (NCERT Rationalised 2026–27, CISCE, UPMSP).
- Where official state board documents are pending, explicit `TODO: Official syllabus document pending - [Board] [Class] [Subject]` placeholders are assigned with **zero invented chapter names**.

---

## 🚀 Quickstart & Setup Guide

### 1. Prerequisites
- **Python:** 3.10+ (tested on Python 3.14)
- **Database:** PostgreSQL with `pgvector` (or SQLite for lightweight zero-dependency testing)
- **Flutter SDK:** 3.24+ (with Android SDK)

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv .venv

# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env

# Apply Alembic database migrations
alembic upgrade head

# Run curriculum seed script
python scripts/seed_curriculum.py

# Launch FastAPI development server
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Mobile App Setup (Flutter)
```bash
cd mobile_app
flutter pub get
flutter run
```

---

## 🧪 Automated Testing & Verification

Run the full backend test suite verifying curriculum rules, class counts, subject isolation, chapter provenance, and API health:

```bash
# From workspace root
backend/.venv/Scripts/pytest backend/tests -v
```

### Phase 1 Verification Results:
- **12/12 Tests Passing:**
  - `test_seed_execution_integrity` (5 boards, 12 classes, 265 subjects, 625 chapters)
  - `test_all_five_boards_present` (CBSE, ICSE, UPMSP, Maharashtra, Tamil Nadu)
  - `test_classes_1_to_5_subjects` (4 subjects each: English, Maths, EVS, Hindi)
  - `test_classes_6_to_9_subjects` (5 subjects each: English, Maths, Science, Social Science, Hindi)
  - `test_class_10_identical_subject_list_for_every_board` (Identical 5 subjects)
  - `test_classes_11_and_12_subjects` (4 subjects each: Maths, English, Chemistry, Physics)
  - `test_total_subject_breakdown_per_board` (Exactly 53 subjects per board)
  - `test_official_chapter_provenance_and_zero_invented_names` (NCERT 2026-27 + explicit TODOs)
  - `test_data_driven_extensibility_add_new_board` (Dynamic board insertion test)
  - `test_seed_idempotency` (Zero duplicate records on re-run)
  - `test_health_check_endpoint` (HTTP 200)
  - `test_root_endpoint` (HTTP 200)

---

## 🔒 Child-Safety & Privacy (DPDP Act 2023)

GYAAN.AI is engineered in strict compliance with the **India Digital Personal Data Protection Act 2023**:
1. **Verifiable Parental Consent:** Mandatory parent verification workflow for student accounts under 18 years of age.
2. **Zero Behavioral Tracking:** No profiling, no user tracking pixels, and no third-party advertisements.
3. **Data Minimization:** Only stores educational progress, mastery states, and quiz responses required for pedagogical instruction.

---

## 🗺️ Implementation Phases

| Phase | Description | Status |
| :---: | :--- | :---: |
| **Phase 1** | Project setup, database schema, migrations, seed script for boards/classes/subjects, unit tests. | **COMPLETED** |
| **Phase 2** | Backend APIs (curriculum, quiz, auth, parental consent) with unit tests. | *Upcoming* |
| **Phase 3** | Flutter app: onboarding, board/class selector, dynamic curriculum navigation. | *Upcoming* |
| **Phase 4** | Quiz engine and mock tests, with 20 sample reviewed CBSE Class 10 Maths questions. | *Upcoming* |
| **Phase 5** | Voice pipeline (STT -> RAG -> LLM -> TTS) on CBSE Class 10 Maths and Science. | *Upcoming* |
| **Phase 6** | Adaptive practice, analytics, offline caching, low-bandwidth mode. | *Upcoming* |
| **Phase 7** | Admin review tool, security check, final test pass. | *Upcoming* |
