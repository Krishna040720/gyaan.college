# GyaanConnect — REST API Specification

**Document Version:** 2.0.0  
**Base URL:** `http://localhost:3001/api` (Proxied in dev from `/api`)  
**Transport:** HTTP/1.1 JSON (UTF-8)

---

## 1. Overview & Architectural Security Rules

All requests must use JSON bodies with `Content-Type: application/json`.

### Strict Security Rules:
1. **Never Accept Client Rubrics:** `POST /api/evaluate` strictly requires `conceptId`. It completely ignores any `mustKnowPoints` or `commonMisconceptions` passed in the request body. Rubrics are resolved exclusively from server-side memory.
2. **Never Expose AI API Keys:** Keys are read from `process.env.GEMINI_API_KEY` on the server and are never returned in any response.
3. **Structured Validation:** Input is validated for type, boundaries, and string length. Invalid requests immediately return HTTP 400 with a descriptive error message.

---

## 2. API Endpoints

### 2.1 Health Check
- **`GET /api/health`**
- **Description:** Verifies server status and AI integration readiness.
- **Response (200 OK):**
```json
{
  "status": "ok",
  "service": "GyaanConnect AI Backend Service",
  "version": "2026.2",
  "geminiConfigured": true
}
```

---

### 2.2 Curriculum Hierarchy Endpoints

#### A. List Education Boards
- **`GET /api/curriculum/boards`**
- **Response (200 OK):**
```json
[
  {
    "id": "cbse",
    "name": "CBSE (NCERT Rationalised)",
    "shortName": "CBSE",
    "tagline": "Central Board of Secondary Education • 2026-27",
    "primaryLanguage": "en",
    "supportedLanguages": ["en", "hi", "hinglish"],
    "status": "active"
  },
  {
    "id": "up_board",
    "name": "UP Board (UPMSP)",
    "shortName": "UP Board",
    "tagline": "उत्तर प्रदेश माध्यमिक शिक्षा परिषद् • द्विभाषी",
    "primaryLanguage": "hi",
    "supportedLanguages": ["hi", "en", "hinglish"],
    "status": "active"
  }
]
```

#### B. List Supported Classes
- **`GET /api/curriculum/classes`**
- **Response (200 OK):**
```json
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

#### C. Get Subjects for Grade & Board
- **`GET /api/curriculum/subjects?board=cbse&class=10`**
- **Query Parameters:**
  - `board` (required): Board ID (e.g. `cbse`, `up_board`).
  - `class` (required): Integer from `1` to `12`.
- **Response (200 OK):**
```json
[
  {
    "id": "sci-10",
    "name": "Science",
    "icon": "Atom",
    "grade": 10,
    "boardId": "cbse",
    "chapterCount": 13
  },
  {
    "id": "math-10",
    "name": "Mathematics",
    "icon": "Binary",
    "grade": 10,
    "boardId": "cbse",
    "chapterCount": 14
  }
]
```
- **Error Responses:**
  - `400 Bad Request`: `{ "error": "Invalid or missing 'class' parameter (must be 1-12)" }`
  - `404 Not Found`: `{ "error": "Board 'xyz' not recognized" }`

#### D. Get Chapters for Subject
- **`GET /api/curriculum/chapters?board=cbse&class=10&subject=sci-10`**
- **Query Parameters:**
  - `board` (required): Board ID.
  - `class` (required): Integer from `1` to `12`.
  - `subject` (required): Subject ID (e.g. `sci-10`).
- **Response (200 OK):**
```json
[
  {
    "id": "c10-sci-ch11",
    "chapterNumber": 11,
    "title": "Electricity",
    "duration": "52 min",
    "status": "verified",
    "isCurated": true,
    "difficulty": "Board Standard",
    "learningObjectives": [
      "Understand electric current, potential difference, and Ohm's law",
      "Calculate series and parallel resistance combinations",
      "Analyze Joule's heating effect and electric power"
    ],
    "keyPoints": [
      "Current I = Q/t (Ampere)",
      "Ohm's Law: V = IR at constant temperature",
      "Joule heating: H = I²Rt"
    ],
    "practicalActivity": {
      "title": "Verification of Ohm's Law",
      "objective": "Determine resistance by plotting V vs I graph",
      "apparatusRequired": ["Voltmeter", "Ammeter", "Rheostat", "Nichrome wire"],
      "safetyPrecautions": ["Avoid prolonged current flow to prevent heating"],
      "realWorldExample": "How smartphone fast chargers modulate V & I using Ohm's Law"
    }
  }
]
```

#### E. Get Concepts for Chapter
- **`GET /api/curriculum/concepts?chapterId=c10-sci-ch11`**
- **Response (200 OK):**
```json
[
  {
    "id": "c-10-sci-elec-02",
    "chapterId": "c10-sci-ch11",
    "title": "Ohm's Law & Resistance",
    "description": "Potential difference is proportional to current at constant temperature. R = V/I.",
    "difficulty": "medium",
    "status": "verified",
    "prerequisites": ["c-10-sci-elec-01"],
    "dependentConcepts": ["c-10-sci-elec-03"],
    "mustKnowPoints": [
      "Potential difference across conductor is directly proportional to current flowing through it",
      "Temperature must remain constant (physical conditions unchanged)",
      "Mathematical expression: V = I × R",
      "SI unit of resistance is Ohm (Ω = Volt / Ampere)"
    ],
    "commonMisconceptions": [
      {
        "misconception": "Resistance depends on the applied voltage or current.",
        "correction": "Resistance is an intrinsic geometric/material property (R = ρL/A); varying V or I does not change R for ohmic conductors."
      }
    ],
    "socraticQuestion": "What happens to the current in a circuit if resistance is doubled while voltage remains constant?"
  }
]
```

#### F. Concept Dependency Graph Snapshot
- **`GET /api/curriculum/concept/c-10-sci-elec-02/graph`**
- **Response (200 OK):**
```json
{
  "concept": { "id": "c-10-sci-elec-02", "title": "Ohm's Law & Resistance" },
  "prerequisites": [
    { "id": "c-10-sci-elec-01", "title": "Electric Potential & Potential Difference" }
  ],
  "dependents": [
    { "id": "c-10-sci-elec-03", "title": "Series & Parallel Resistor Combinations" }
  ]
}
```

---

### 2.3 Conceptual Evaluation Endpoints

#### A. Evaluate Student Oral/Written Explanation
- **`POST /api/evaluate`**
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "conceptId": "c-10-sci-elec-02",
  "studentAnswer": "Ohm's law states that current flowing through a conductor is directly proportional to the potential difference across its ends provided temperature remains constant, so V equals I times R.",
  "grade": 10,
  "attempts": 1
}
```
- **Validation Rules:**
  - `conceptId`: Must be a non-empty string referencing an existing concept in the server database.
  - `studentAnswer`: Must be a string with trimmed length $\ge 5$ characters and $\le 3000$ characters.
  - `grade`: Optional integer (defaults to 10).
  - `attempts`: Optional integer (defaults to 1).
- **Response (200 OK):**
```json
{
  "understandingScore": 92,
  "accuracyScore": 95,
  "clarityScore": 90,
  "confidenceScore": 88,
  "praise": "Shabash! 🌟 Brilliant explanation of Ohm's Law. You captured both the proportional relationship and the critical constant temperature condition!",
  "gentleTip": "In board exams, always draw the linear V-I slope graph to guarantee full marks.",
  "speakingTip": "Your verbal articulation was fluent, precise, and confident.",
  "strengths": [
    "Identified constant temperature condition",
    "Correctly stated V = I × R"
  ],
  "mustKnowCovered": [
    "Potential difference across conductor is directly proportional to current",
    "Temperature must remain constant",
    "Mathematical expression: V = I × R"
  ],
  "mustKnowMissed": [
    "SI unit of resistance is Ohm (Ω)"
  ],
  "misconceptionsDetected": [],
  "actionableGapFix": "Remember that 1 Ohm is the resistance when 1 Volt produces 1 Ampere of current.",
  "socraticFollowUp": "If you double the resistance of an electric iron while plugged into a 220V wall socket, what happens to the electric current?",
  "tutorSpeech": "Shabash! That was an exceptionally clear explanation of Ohm's law. You nailed the physical condition! Now, let's explore one follow-up question together.",
  "masteryImpact": 22
}
```
- **Error Responses:**
  - `400 Bad Request`: `{ "error": "Invalid or missing 'conceptId' parameter" }`
  - `404 Not Found`: `{ "error": "Concept 'c-99-unknown' not found in authoritative database" }`
  - `503 Service Unavailable`:
    ```json
    {
      "error": "AI service unavailable or API key not configured",
      "fallbackToLocal": true
    }
    ```

#### B. Socratic Follow-Up Evaluation
- **`POST /api/evaluate/followup`**
- **Request Body:**
```json
{
  "conceptId": "c-10-sci-elec-02",
  "followUpQuestion": "If you double the resistance while keeping voltage constant, what happens to the current?",
  "studentFollowUpAnswer": "Current will become half because current is inversely proportional to resistance according to I = V/R."
}
```
- **Response (200 OK):**
```json
{
  "answered": true,
  "bonusScore": 20,
  "feedback": "Outstanding physical intuition! You recognized the inverse relationship between I and R.",
  "tutorSpeech": "Brilliant deduction! Understanding how variables react to change proves true mastery."
}
```
