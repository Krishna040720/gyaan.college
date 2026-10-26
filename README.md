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

## ☁️ Deployment on Render (Linux)

GYAAN is fully prepared for zero-downtime, continuous deployment on Render (Linux) via **Render Blueprints** or manual service creation.

### Option A: 1-Click Render Blueprint (Recommended)
This repository includes a pre-configured [`render.yaml`](file:///c:/Users/krish/OneDrive/GYAAN/render.yaml) declaring both services:
1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** $\rightarrow$ **Blueprint**.
3. Connect your repository: `https://github.com/Krishna040720/gyaan.college`.
4. Render will detect `render.yaml` and provision:
   - **`gyaan-api`** (Node.js Web Service on port `10000` / `0.0.0.0`)
   - **`gyaan-frontend`** (Static Site with SPA routing and `/api/*` reverse proxy)
5. Under Environment Secrets, set `GEMINI_API_KEY` (if using Google Gemini API).
6. Click **Apply**.

---

### Option B: Manual Service Setup on Render

#### 1. Backend Web Service (`gyaan-api`)
- **Type:** Web Service
- **Environment:** Node
- **Region:** Any (e.g., Oregon)
- **Branch:** `main`
- **Build Command:** `npm install`
- **Start Command:** `npm run server`
- **Plan:** Free
- **Health Check Path:** `/api/health`
- **Environment Variables:**
  | Variable | Value | Purpose |
  | :--- | :--- | :--- |
  | `NODE_ENV` | `production` | Production optimizations |
  | `PORT` | `10000` | Port assigned by Render (listens on `0.0.0.0`) |
  | `GEMINI_API_KEY` | *(your key)* | Google Gemini AI key (kept in env, not committed) |
  | `LLM_PROVIDER` | `gemini_free` | Free tier LLM provider |
  | `STT_PROVIDER` | `web_speech` | Client-side speech-to-text |
  | `TTS_PROVIDER` | `browser_speech` | Natural speech synthesis |
  | `RETRIEVAL_PROVIDER` | `sqlite_local` | In-memory / lightweight curriculum vector search |

#### 2. Frontend Static Site (`gyaan-frontend`)
- **Type:** Static Site
- **Branch:** `main`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- **Redirects / Rewrites (Under Site Settings $\rightarrow$ Redirects/Rewrites):**
  1. **API Proxy Rewrite:**
     - **Type:** Rewrite
     - **Source:** `/api/*`
     - **Destination:** `https://gyaan-api.onrender.com/api/*`
  2. **Single-Page Application (SPA) Fallback:**
     - **Type:** Rewrite
     - **Source:** `/*`
     - **Destination:** `/index.html`

---

### 🛡️ Ephemeral Filesystem & Startup Seeding Guarantee
Render free instances run on ephemeral containers with non-persistent filesystems. To guarantee the platform is 100% operational on every restart:
- On startup, `server/index.js` automatically executes `seedDemoData()`.
- Seeds the comprehensive curriculum, the flagship chapter (**Class 10 Science: Electricity**), and a sample student account labelled **"Demo data"** (`Aarav Sharma (Demo data)`).
- The `/api/health` endpoint verifies demo seed status on every container boot.
- Voice Debug admin routes require `x-user-role: admin` (HTTP 403 Forbidden for non-admins). Demo-seed buttons are removed from production.

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
