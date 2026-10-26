# GyaanConnect — Product Requirements Document (PRD)

**Document Version:** 2.0.0  
**Status:** Approved for Implementation Planning  
**Target Platform:** Web (Mobile-First, Tablet, Desktop)  
**Primary Users:** Indian School Students (Classes 1–12), Educators, Self-Learners

---

## 1. Product Vision & Value Proposition

- **Product Name:** GyaanConnect (ज्ञानकनेक्ट)
- **Tagline:** *“Don't just watch the lesson. Prove that you understood it.”*
- **Core Problem:** Traditional EdTech platforms trap Indian school students in passive video consumption. Despite watching hours of lecture marathons, students suffer from the illusion of competence—memory retention drops below 20% within 48 hours, and subtle conceptual misconceptions go undetected until exams.
- **The GyaanConnect Solution:** A voice-first active learning and diagnostic platform that enforces the **Feynman Active Recall Technique**:
  1. The student studies a bite-sized concept.
  2. The student closes all notes and books.
  3. The student explains the concept aloud in their own words (Indian English, Hindi, or Hinglish).
  4. An AI tutor listens, evaluates conceptual depth across 5 pillars, detects specific misconceptions, and diagnoses foundational prerequisite gaps.
  5. The student receives Socratic follow-up challenges and automated spaced revision schedules.

---

## 2. Traceable Requirements Matrix

| ID | Feature Module | Priority | Description & Acceptance Criteria | Old Flaw to Prevent |
| :--- | :--- | :--- | :--- | :--- |
| **FR-01** | **Feynman Oral Recall Studio** | P0 (Critical) | 4-phase structured workflow: `briefing` &rarr; `explaining` &rarr; `evaluating` &rarr; `evaluated`. Evaluates spoken/written explanation across 5 pillars: Understanding, Accuracy, Clarity, Confidence, and Misconception Avoidance. | Do not allow arbitrary client scoring; do not skip phases. |
| **FR-02** | **Bilingual Voice Learning** | P0 (Critical) | Web Speech API speech-to-text supporting Indian English (`en-IN`) and Hindi (`hi-IN`). SpeechSynthesis text-to-speech for tutor voice guidance. Quiet-room typing mode fallback when mic is unavailable. | Do not retain or upload raw audio files; zero server audio storage. |
| **FR-03** | **Offline Socratic Engine** | P0 (Critical) | Built-in heuristic evaluation engine matching must-know points and catching misconceptions locally without network or API keys. Used whenever offline or when upstream AI is unreachable. | Must remain 100% free, deterministic, and instant (&lt;50ms). |
| **FR-04** | **Concept Knowledge DAG** | P0 (Critical) | Models syllabus concepts as a Directed Acyclic Graph (DAG). Identifies root-cause prerequisite gaps when a student struggles with downstream concepts. | Must be strictly acyclic; validate dependencies at startup. |
| **FR-05** | **Spaced Repetition (SM-2)** | P1 (High) | SuperMemo SM-2 interval scheduler (1d, 3d, 7d). Overdue review queue surfaced prominently on the student dashboard. | Do not schedule revision if student failed to demonstrate understanding. |
| **FR-06** | **Lecture & Study Theater** | P1 (High) | Unified study view coordinating concept cards, video playlists, formula banks, revision notes, practical steps, and quizzes. | No broken YouTube embed links; provide fallback preview states. |
| **FR-07** | **Practical Labs & Materials** | P1 (High) | Science practical instructions: apparatus/materials list, step-by-step procedures, safety precautions, and real-world connections. | Must not be empty placeholders; grounded in verified NCERT lab manuals. |
| **FR-08** | **Practice MCQs & Gamification**| P1 (High) | Conceptual questions with step-by-step explanations, anti-spam XP allocation, daily streak tracking, and achievement badges. | Streaks must require genuine daily study activity, not mere page visits. |
| **FR-09** | **Curriculum Hierarchy** | P0 (Critical) | Strict hierarchy: Board &rarr; Academic Year &rarr; Class &rarr; Subject &rarr; Chapter &rarr; Concept &rarr; Learning Objective. | **NEVER fabricate procedural dummy chapters (`Unit 1`)**. Label uncurated topics as `curation_pending`. |
| **FR-10** | **Secure Server AI Proxy** | P0 (Critical) | Server looks up authoritative concepts by `conceptId` from trusted server data. Evaluates via Gemini API with backend credentials. | **NEVER trust client-supplied rubrics (`mustKnowPoints`)**. |
| **FR-11** | **Data Backup & Restore** | P2 (Medium) | 1-click JSON export and import for student learning records and badges with schema validation. | Validate uploaded JSON structure before restoring state. |
| **FR-12** | **Global Search (Ctrl+K)** | P2 (Medium) | Fast in-memory keyboard search across concepts, chapters, subjects, and boards. | Accessible modal with escape key dismissal and keyboard arrows. |
| **FR-13** | **Premium SaaS Redesign** | P0 (Critical) | Clean, minimal, student-friendly interface. Primary Deep Purple (`#56358B`), Secondary Teal (`#16A39A`), Soft Off-White (`#FAF9FC`), clean Lucide outline icons. | **No cyberpunk neon, no emojis as UI icons, no heavy dark glassmorphism**. |

---

## 3. Anti-Requirements: Implementation Pitfalls Never to Repeat

1. **No Insecure Client Rubric Injection:**
   The client must never send `mustKnowPoints` or `commonMisconceptions` to the evaluation API. The server must strictly load the concept rubric using `conceptId` from its authoritative database.
2. **No Client-Side AI Secrets:**
   No Google Gemini API keys may be entered into or stored in browser `localStorage`. All AI interactions must flow through the server proxy (`POST /api/evaluate`).
3. **No Mock Syllabus Masquerading:**
   Never run loops like `generateChaptersForSubject()` that synthesize fake chapter titles (`Chapter 1: Mathematics - Unit 1`) with round-robin video IDs and generic quizzes. If a syllabus is not yet curated, it must be explicitly labeled `status: 'curation_pending'`.
4. **No Conflicting Board Registries:**
   Do not maintain separate, desynchronized board lists across frontend and backend. Board definitions must stem from a single shared schema.
5. **No Dead or Orphaned Components:**
   No unused prototype files (such as `AiVoiceRoom.jsx`) may linger in the codebase.
6. **No Superficial Mastery Marking:**
   A chapter or concept must never be marked "complete" merely because the student clicked on it or opened the screen.
7. **No Inappropriate Visual Clutter:**
   Avoid oversized floating emojis, neon shadows, dark translucent glassmorphism, or non-semantic icons. Every icon must come from `lucide-react` with consistent 18–22px sizing and clear text alignment.

---

## 4. User Personas & Core Journeys

### Persona A: Aarav (Class 10 CBSE Student)
- **Goal:** Wants to prepare for CBSE Board Science exam without getting overwhelmed by 2-hour marathon lectures.
- **Journey:** Opens GyaanConnect &rarr; Selects Class 10 Science &rarr; Electricity &rarr; Selects concept *Ohm's Law & Resistance* &rarr; Reviews key formula $V=IR$ &rarr; Clicks *Prove You Understand* &rarr; Notes disappear &rarr; Explains concept aloud in microphone &rarr; GyaanConnect catches that he forgot to specify *"at constant temperature"* &rarr; Awards 85% score &rarr; Asks Socratic follow-up question &rarr; Schedules revision in 3 days.

### Persona B: Priya (Class 9 UP Board Student - Hindi/Bilingual)
- **Goal:** Wants to understand Newton's Laws of Motion in simple bilingual Hindi/English.
- **Journey:** Selects UP Board &rarr; Class 9 Science &rarr; Force & Laws of Motion &rarr; Reads bilingual summary in Hindi & English &rarr; Explains in Hindi voice: *"गति का पहला नियम कहता है कि कोई वस्तु तब तक स्थिर रहेगी जब तक बाहरी बल न लगे..."* &rarr; GyaanConnect recognizes Hindi speech &rarr; Awards badge &rarr; Explains real-world seatbelt example.

### Persona C: Rohan (Class 11 Student with Prerequisite Gaps)
- **Goal:** Struggling with Projectile Motion in Physics.
- **Journey:** Attempts Feynman explanation of *Projectile Trajectory* &rarr; Repeatedly confuses horizontal and vertical velocity components &rarr; Prerequisite Engine triggers alert: *"Your difficulty in Projectile Motion stems from Vector Resolution into Components"* &rarr; Provides 1-click shortcut to master the prerequisite vector concept first.
