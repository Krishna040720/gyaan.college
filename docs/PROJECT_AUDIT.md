# GyaanConnect — Comprehensive Project Audit

**Document Version:** 1.0.0  
**Audit Date:** October 15, 2026  
**Auditor:** Senior Full-Stack & EdTech Software Architect (Pair Programming with Student Developer)  
**Repository Working Directory:** `c:\Users\krish\OneDrive\GYAAN`

---

## 1. Executive Summary

GyaanConnect (internally named `gyan` / `GYAAN AI`) is designed as a voice-first diagnostic learning platform for Indian school students (Classes 1–12 across CBSE, ICSE, UPMSP, and State Boards). Its primary differentiator is the **Feynman Active Oral Recall loop**: *“Don't just watch the lesson. Prove that you understood it.”*

### Key Audit Findings at a Glance
| Category | Status | Health Rating | Critical Issues |
| :--- | :--- | :--- | :--- |
| **Lint & Type Check** | ❌ Broken | Needs Immediate Fix | `oxlint` fails with 3,186 warnings & 14 errors due to unignored `.vite_cache` |
| **Build Pipeline** | ⚠️ Warning | Functional | Builds in 6.56s, but Node engine warning (Node 20.18 vs Vite 8 req 20.19+/22.12+) |
| **Test Suite** | ❌ Missing | No Tests | 0 unit tests, 0 integration tests, 0 end-to-end tests; no test runner configured |
| **Backend & APIs** | ⚠️ Partial | Partially Working | Missing `/api/curriculum/subjects` & `/api/curriculum/chapters` endpoints (404) |
| **Security & Rubric** | 🚨 Critical | Insecure Rubric | Server evaluates using client-supplied rubric (`mustKnowPoints`), enabling cheat injections |
| **Curriculum Schema**| ⚠️ Inconsistent | High Technical Debt | 3 competing, conflicting board registries; procedural dummy chapter generators |
| **Secret Management**| ⚠️ Medium Risk | Needs Hardening | Client-side Tier 2 Gemini API key input in localStorage; no exposed repo secrets |
| **Student Progress** | ⚠️ Local Only | Isolated | 100% browser localStorage; no server-side sync, user accounts, or auth |

---

## 2. Environment, Dependencies & Tooling Inspection

### 2.1 Package & Tooling Manifest (`package.json`)
```json
{
  "name": "gyan",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "server": "node server/index.js",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "canvas-confetti": "^1.9.4",
    "lucide-react": "^1.43.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@oxlint/binding-win33-x64-msvc": "^1.82.0",
    "@rolldown/binding-win32-x64-msvc": "^1.2.7",
    "@tailwindcss/vite": "^4.3.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "autoprefixer": "^10.5.5",
    "oxlint": "^1.79.0",
    "postcss": "^8.5.28",
    "tailwindcss": "^4.3.3",
    "vite": "^8.2.2"
  }
}
```

### 2.2 Git Environment Anomaly
- **Finding:** Running `git rev-parse --show-toplevel` returned `C:/Users/krish` instead of the project directory `c:/Users/krish/OneDrive/GYAAN`.
- **Evidence:** `git status` output lists user home directories (`AppData`, `NTUSER.DAT`, `Contacts`, `Desktop`) with `"No commits yet"`.
- **Severity:** Medium. Accidental `git add .` or commands could track sensitive personal OS files.
- **Proposed Fix:** Initialize a dedicated git repository specifically in `c:\Users\krish\OneDrive\GYAAN` with a robust `.gitignore` isolating the project.

---

## 3. Detailed Audit Findings & Evidence

### Finding 1: Broken `npm run lint` Script
- **Files Involved:** `.oxlintrc.json`, `vite.config.js`, `.gitignore`, `package.json`
- **Severity:** High
- **Evidence:**
  Executing `npm run lint` triggers `oxlint`, which scans the entire directory including `.vite_cache/deps/lucide-react.js`. Because `vite.config.js` configures `cacheDir: './.vite_cache'`, Vite writes pre-bundled dependencies there. Oxlint encounters 3,186 warnings and 14 `no-unused-expressions` errors in `lucide-react.js` and exits with code 1.
- **Proposed Fix:**
  Add `".vite_cache"` and `"dist"` to `.gitignore` and configure `.oxlintrc.json` ignore patterns (or pass directory targets `src server` in `package.json`).

### Finding 2: Cascading React State Updates in Effects
- **Files Involved:**
  - `src/components/ConceptSelectionGrid.jsx#L37` (`setLoading(true)` inside `useEffect`)
  - `src/components/ProveUnderstandingStudio.jsx#L76` (`setPhase('briefing')` inside `useEffect`)
- **Severity:** Medium
- **Evidence:**
  `oxlint src server` surfaces:
  ```text
  ! react(set-state-in-effect): Calling setState synchronously within an effect can trigger cascading renders
    ,-[src/components/ConceptSelectionGrid.jsx:37:7]
  37 |       setLoading(true);
  ```
  Calling `setState` synchronously on effect entry causes unnecessary re-renders and degrades UI responsiveness on lower-end student devices.
- **Proposed Fix:**
  Derive state directly, set initial states during render transitions, or wrap updates in appropriate callback flows.

### Finding 3: Insecure Server Rubric Injection (Prompt Injection via Client Payload)
- **Files Involved:** `server/index.js` (lines 31–43, 57–60), `src/services/aiVoiceService.js` (lines 237–256)
- **Severity:** Critical (Security & Academic Integrity)
- **Evidence:**
  In `server/index.js`:
  ```javascript
  const payload = JSON.parse(body || '{}');
  const { studentAnswer, concept, chapter, grade = 10, attempts = 1 } = payload;
  const targetConcept = concept || {
    title: chapter?.title || 'Concept',
    mustKnowPoints: chapter?.keyPoints || [],
    commonMisconceptions: []
  };
  ...
  Must-Know Core Points: ${JSON.stringify(targetConcept.mustKnowPoints || [])}
  ```
  The server takes `concept.mustKnowPoints` directly from the HTTP request body sent by the browser. A malicious user or script can override the expected points with trivial strings to receive a 100% score.
- **Proposed Fix:**
  Refactor `handleEvaluate`:
  1. Client sends only `{ conceptId, studentAnswer, grade, attempts }`.
  2. The server loads the **authoritative** concept from `curriculumDatabase.js` by `conceptId`.
  3. Never accept client-supplied grading rubrics, core points, or misconception definitions.

### Finding 4: Client-Side Gemini API Key Storage and Direct Browser API Calls
- **Files Involved:** `src/components/GeminiSettingsModal.jsx#L83-L90`, `src/services/aiVoiceService.js#L261-L275, #L438-L489`
- **Severity:** High (Security)
- **Evidence:**
  `GeminiSettingsModal` stores user-provided API keys in browser `localStorage.getItem('gyan_gemini_key')`. In `aiVoiceService.js`, `callGeminiDirect()` directly initiates an external HTTP fetch to Google's API endpoint:
  ```javascript
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;
  ```
  Browser extensions, XSS, or shared student computers can leak this key.
- **Proposed Fix:**
  Route all AI requests strictly through the backend server proxy (`server/index.js`), which holds the secure `GEMINI_API_KEY` in environment variables. If a user brings their own key, it should only be passed to the backend session in a secure header or proxy, never called raw from the browser.

### Finding 5: Outdated Gemini Model Endpoint
- **Files Involved:** `server/index.js#L91, #L154`, `src/services/aiVoiceService.js#L472`
- **Severity:** Medium
- **Evidence:**
  The server and client use `gemini-1.5-flash` via raw URL strings:
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
- **Proposed Fix:**
  Update to current standard Gemini models (`gemini-2.0-flash` or current stable Google GenAI SDK) with structured schema validation and standardized error codes.

### Finding 6: Missing Backend Curriculum Endpoints (404 Failures)
- **Files Involved:** `server/index.js` (lines 196–235), `src/services/curriculumService.js` (lines 30–60)
- **Severity:** High
- **Evidence:**
  `curriculumService.js` queries:
  - `GET /api/curriculum/subjects?board=...&class=...&academicYear=...`
  - `GET /api/curriculum/chapters?board=...&class=...&subject=...`
  Neither endpoint is registered in `server/index.js`'s HTTP routing switch. The server returns:
  ```json
  { "error": "Route not found" } (Status 404)
  ```
  The client silently catches the error and falls back to local data, concealing the broken backend contract.
- **Proposed Fix:**
  Implement `/api/curriculum/subjects` and `/api/curriculum/chapters` in `server/index.js` or consolidate the curriculum repository so the backend is authoritative.

### Finding 7: Inconsistent and Duplicated Board/Curriculum Registries
- **Files Involved:**
  - `src/data/conceptKnowledgeBase.js` (Defines 9 Boards: CBSE, ICSE, UPMSP, MSBSHSE, BSEB, RBSE, KSEAB, TN, WBBSE)
  - `server/curriculumDatabase.js` (Defines only 5 Boards)
  - `src/data/curriculumData.js` (Defines only 3 Boards: `up_board`, `cbse`, `icse`)
- **Severity:** High (Data Integrity & Architecture)
- **Evidence:**
  In `src/data/curriculumData.js#L374`:
  ```javascript
  const boardInfo = BOARDS.find(b => b.id === boardId) || BOARDS[0];
  ```
  If a student selects "Rajasthan Board (RBSE)" or "Maharashtra" in the UI (populated from `conceptKnowledgeBase.js`), `curriculumData.js` cannot find the board in its 3-board list and silently falls back to `BOARDS[0]` (`up_board`).
- **Proposed Fix:**
  Unify boards and curriculum into a single authoritative schema.

### Finding 8: Fabricated Procedural Curriculum Coverage
- **Files Involved:** `src/data/curriculumData.js#L390-L537, #L647-L728`
- **Severity:** High (Pedagogical & Quality)
- **Evidence:**
  Only Class 10 Science (13 chapters) and Class 10 Math (14 chapters) have actual curriculum definitions. For all other classes (1–9, 11, 12) and other subjects, the code runs `generateChaptersForSubject()`, which synthesizes dummy chapters like:
  ```text
  Chapter 1: Mathematics - Unit 1
  Chapter 2: Mathematics - Unit 2
  ```
  with round-robin generic video IDs and generic quiz questions ("What is the most effective scientific method to achieve 90%+ retention?").
- **Proposed Fix:**
  Clearly label unverified/unmapped syllabus modules as `"draft"` or `"curation_pending"`. Never fabricate fake unit titles. Map verified NCERT and board syllabi with proper citations and provenance.

### Finding 9: Dead & Orphaned Code (`AiVoiceRoom.jsx`)
- **Files Involved:** `src/components/AiVoiceRoom.jsx` (584 lines, 24,866 bytes)
- **Severity:** Low (Code Maintenance)
- **Evidence:**
  `AiVoiceRoom.jsx` is not imported anywhere in `src/` or `server/`. It was the early chapter-level prototype that was superseded by `ProveUnderstandingStudio.jsx`.
- **Proposed Fix:**
  Archive or safely remove `AiVoiceRoom.jsx` after verifying no required logic is lost.

### Finding 10: Zero Test Automation
- **Files Involved:** Root directory, `package.json`
- **Severity:** High
- **Evidence:**
  No test files exist (`*.test.js`, `*.spec.jsx`). No test scripts exist in `package.json`. No CI pipeline or assertion framework is installed.
- **Proposed Fix:**
  Introduce a lightweight testing setup (`vitest` with `@testing-library/react`) to test scoring logic, graph prerequisite algorithms, and API response normalization.

---

## 4. Current Feature Status Matrix

| Feature | Intended Behavior | Current Status | Notes / Limitations |
| :--- | :--- | :--- | :--- |
| **Board Selection** | Multi-board selector (CBSE, ICSE, UP Board, States) | 🟡 Partially Working | Dropdown shows 9 boards, but backend only knows 5; `curriculumData` falls back to UP Board for 6 of them. |
| **Class Selection (1–12)** | Switch grade levels seamlessly | 🟡 Partially Working | Class 10 is well-defined; Classes 1–9, 11–12 rely on procedurally generated dummy placeholders. |
| **Subject & Chapter Browser** | Catalog subjects, one-shot marathon, topic videos | 🟢 Working | Responsive cards, video modals, tabs for notes, quiz, and study progress. |
| **Speech-to-Text (STT)** | Voice recording in English, Hindi, Hinglish | 🟢 Working | Uses Web Speech API with microphone permission handling, interim feedback, and text fallback. |
| **Text-to-Speech (TTS)** | Reads AI tutor feedback aloud | 🟢 Working | Uses `SpeechSynthesis` with voice pitch/rate tuning. |
| **Feynman Oral Recall Studio** | Close notes, explain in own words, AI evaluation | 🟢 Working | Phase-based (`briefing` → `explaining` → `evaluating` → `evaluated`), 5-pillar scores, confetti. |
| **Socratic Multi-Turn Probe** | Follow-up question to test intuitive edge-cases | 🟢 Working | Two-turn conversational evaluation works locally and via server. |
| **Prerequisite DAG Engine** | Graph visualizer & root-cause gap diagnosis | 🟢 Working | Directed acyclic graph algorithm traverses ancestors and warns if prerequisite mastery is <60%. |
| **Spaced Repetition Scheduler** | SM-2 interval scheduling (1d, 3d, 7d) | 🟢 Working | Queues review tasks based on student accuracy; dashboard shows overdue items. |
| **Practice MCQs** | Interactive quiz with explanation & XP | 🟢 Working | Working for Class 10; generic placeholder questions for other grades. |
| **Student Profile & Backups** | Gamification XP, levels, badges, JSON backup | 🟢 Working (Local) | Export/import works via JSON download/upload; no server database persistence. |
| **Global Search (Ctrl+K)** | Unified search across concepts, chapters, boards | 🟢 Working | In-memory filtering across concept repository. |
| **Materials & Practical Instructions**| Science practical apparatus and experiment guides | 🔴 Missing | Described in master specification; not yet modeled in data schemas. |
| **Real-World Examples & News Links** | Connect concepts to contemporary science news | 🔴 Missing | Mentioned in master specification; not yet implemented in UI. |
| **Server Persistence & Auth** | Multi-user accounts, progress sync, secure rubrics | 🔴 Missing | Server is stateless; all state resides in student's browser `localStorage`. |

---

## 5. Security & Privacy Review

1. **Child Privacy & Data Retention:**
   - No audio recordings or voice streams are sent to third parties or saved on disk.
   - Speech-to-text runs entirely within the student's browser via the native Web Speech API.
   - No personally identifiable information (PII) is collected or stored on the server.
2. **Secret Management:**
   - `.env.example` provides clean templates. No real secrets were found in git history or client bundles.
   - However, client-side entry of Gemini keys in `GeminiSettingsModal` is risky and should be phased out in favor of backend-only key management.
3. **Prompt Injection & Cheating Risks:**
   - Because the client sends the rubric `mustKnowPoints` to `/api/evaluate`, the evaluation engine is vulnerable to manipulation.
   - Proposed Fix: Ground evaluation on the server by looking up the concept by `conceptId` from trusted server-side data.

---

## 6. Build and Verification Results

- **`npm run lint`:** Failed (Exit code 1). Scanned 36 files; 3,186 warnings, 14 errors (all in `.vite_cache/deps/lucide-react.js`).
- **`npx oxlint src server`:** Succeeded (Exit code 0). 0 errors, 2 warnings (cascading `setState` in `useEffect`).
- **`npm run build`:** Succeeded (Exit code 0). 1,872 modules transformed; bundle created in 6.56s (`dist/assets/index-DMkJVySV.js` 469.75 kB).
- **Backend Server Boot:** Succeeded. `node server/index.js` boots on port 3001, serves `/api/health`, `/api/curriculum/boards`, `/api/curriculum/classes`, `/api/curriculum/concepts`.
- **Backend AI Evaluation (`/api/evaluate`):** Returns HTTP 503 (`fallbackToLocal: true`) when `GEMINI_API_KEY` is not present, gracefully signaling client to use the built-in local Socratic engine.

---

## 7. Recommended Action Plan & Next Steps

1. **Fix Lint & Build Pipeline (Smallest Safe Task):**
   Exclude `.vite_cache` and `dist` from oxlint to bring `npm run lint` to a clean passing state (0 errors).
2. **Secure the AI Evaluation Rubric:**
   Update `server/index.js` so it loads authoritative `mustKnowPoints` from the concept database using `conceptId`, rejecting client-supplied rubrics.
3. **Register Missing Backend Endpoints:**
   Add `/api/curriculum/subjects` and `/api/curriculum/chapters` in `server/index.js` to eliminate 404s.
4. **Harmonize Board & Curriculum Data:**
   Consolidate boards across `conceptKnowledgeBase.js`, `curriculumDatabase.js`, and `curriculumData.js`.
5. **Establish Test Foundation:**
   Install and configure Vitest to ensure automated regression protection for scoring, DAG traversal, and curriculum models.
