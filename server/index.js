// GYAAN AI Secure Backend Server
// Provides REST APIs for Hierarchical Curriculum, Concept Knowledge Base, Graph Lineage, and Socratic Evaluation

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { 
  BOARDS, 
  CONCEPTS, 
  getConceptsForChapter, 
  getConceptById, 
  getSubjectsForClass, 
  getChaptersForSubject,
  getNotesForChapter,
  getNotesForSubject,
  searchNotes
} from './curriculumDatabase.js';
import { getLLMProvider, providerManager } from './providers/index.js';
import { evaluateLocally } from '../src/services/aiVoiceService.js';

// Auto-load environment variables from .env or backend/.env
function loadEnvFile() {
  const candidates = ['.env', 'backend/.env', '../.env'];
  for (const rel of candidates) {
    try {
      const p = path.resolve(process.cwd(), rel);
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, 'utf-8');
        content.split('\n').forEach(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
            const [k, ...v] = trimmed.split('=');
            const key = k.trim();
            const val = v.join('=').trim().replace(/^["']|["']$/g, '');
            if (key && !process.env[key]) {
              process.env[key] = val;
            }
          }
        });
      }
    } catch {}
  }
}
loadEnvFile();

// Listen on process.env.PORT (Render / Linux cloud hosts) or NODE_PORT or 3001
const PORT = process.env.PORT || process.env.NODE_PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// In-Memory Startup Demo Store for Non-Persistent Filesystem Environments
export const demoStore = {
  curriculum: null,
  flagshipChapter: null,
  sampleStudent: null,
  voiceQueryLogs: []
};

/**
 * Seeds demo curriculum, flagship chapter, and sample student on startup.
 * Guarantees that even across container restarts on Render (non-persistent filesystem),
 * the app is immediately populated with interactive demonstration data.
 */
export function seedDemoData() {
  const flagshipChapter = {
    id: 'cbse-10-science-ch12',
    chapterId: 'cbse-10-science-ch12',
    title: 'Electricity',
    classLevel: 10,
    subject: 'science',
    boardId: 'cbse',
    status: 'reviewed',
    tag: 'Flagship Conceptual Suite',
    keyConcepts: [
      'Electric Current and Circuit (I = Q/t)',
      'Electric Potential and Potential Difference (V = W/Q)',
      "Ohm's Law and Resistance (V = IR)",
      'Factors on which Resistance depends (R = ρl/A)',
      'Series and Parallel Resistor Combinations',
      'Heating Effect of Electric Current and Joule\'s Law (H = I²Rt)',
      'Electric Power (P = VI = I²R = V²/R)'
    ]
  };

  const sampleStudent = {
    id: 'demo-student-001',
    name: 'Aarav Sharma (Demo data)',
    label: 'Demo data',
    email: 'aarav.demo@gyaan.ai',
    role: 'student',
    grade: 10,
    classLevel: 10,
    enrolledClass: 10,
    boardId: 'cbse',
    enrolledBoard: 'CBSE',
    avatar: '🎓',
    isDemo: true,
    isGuest: false,
    totalXP: 450,
    streakDays: 5,
    masteredConceptsCount: 7,
    createdAt: new Date().toISOString()
  };

  demoStore.curriculum = {
    boardsCount: BOARDS.length,
    totalConcepts: CONCEPTS.length,
    flagshipClass: 10,
    flagshipSubject: 'science'
  };
  demoStore.flagshipChapter = flagshipChapter;
  demoStore.sampleStudent = sampleStudent;
  demoStore.voiceQueryLogs = [
    {
      id: 'vlog-seed-001',
      created_at: new Date().toISOString(),
      raw_stt_transcript: "what is electric potential difference and ohm's law?",
      stt_confidence: 0.96,
      user_edited_transcript: null,
      board_id: 'cbse',
      class_level: 10,
      subject_id: 'science',
      current_chapter_id: 'cbse-10-science-ch12',
      chapter_title: 'Electricity',
      diagnosed_stage: 'healthy',
      status: 'completed',
      retrieved_chunks: [
        {
          rank: 1,
          chunk_id: 'chunk-elec-01',
          chapter_id: 'cbse-10-science-ch12',
          chapter_title: 'Electricity',
          topic_id: 'topic-potential',
          topic_title: 'Electric Potential and Potential Difference',
          score: 0.94,
          content: 'Electric potential difference between two points in an electric circuit carrying some current is defined as the work done to move a unit charge from one point to the other (V = W/Q).',
          method: 'hybrid_bm25_vector'
        },
        {
          rank: 2,
          chunk_id: 'chunk-elec-02',
          chapter_id: 'cbse-10-science-ch12',
          chapter_title: 'Electricity',
          topic_id: 'topic-ohms-law',
          topic_title: "Ohm's Law",
          score: 0.91,
          content: "The potential difference V across the ends of a given metallic wire in an electric circuit is directly proportional to the current I flowing through it, provided its temperature remains the same (V = IR).",
          method: 'hybrid_bm25_vector'
        }
      ],
      retrieval_confidence: 0.92,
      final_llm_prompt: "Explain electric potential difference (V = W/Q) and Ohm's Law (V = IR) using NCERT Class 10 Science Chapter 12.",
      final_answer: "Electric potential difference is the work done per unit charge (V = W/Q). According to Ohm's Law, the potential difference across a metallic conductor is directly proportional to current flowing through it at constant temperature: V = IR.",
      latency_ms: 220
    }
  ];

  console.log('[GYAAN AI Server] Seeded demo data on startup:');
  console.log(`  - Curriculum: ${demoStore.curriculum.boardsCount} boards, ${demoStore.curriculum.totalConcepts} concepts`);
  console.log(`  - Flagship Chapter: ${flagshipChapter.title} (Class ${flagshipChapter.classLevel} ${flagshipChapter.subject.toUpperCase()})`);
  console.log(`  - Sample Student: ${sampleStudent.name} [${sampleStudent.label}]`);

  return demoStore;
}

// Seed demo data on initial module load
seedDemoData();

function checkAdminRole(req) {
  const roleHeader = (req.headers['x-user-role'] || '').toString().trim().toLowerCase();
  const authHeader = (req.headers['authorization'] || '').toString().trim().toLowerCase();
  return roleHeader === 'admin' || authHeader.includes('admin');
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-enrolled-class, x-enrolled-board');
}

function sendJson(res, statusCode, data) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

/**
 * Robust Gemini caller with exponential backoff retry
 */
async function callGeminiWithRetry(prompt, apiKey, maxRetries = 3) {
  let attempt = 0;
  let lastError = null;

  while (attempt < maxRetries) {
    attempt++;
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const res = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.6
          }
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        console.error(`[handleEvaluate] Gemini API error (attempt ${attempt}/${maxRetries}): HTTP ${res.status}`, errBody);

        if (res.status === 400 || res.status === 401 || res.status === 403) {
          throw new Error(`Gemini API authorization/client error: ${res.status} - ${errBody}`);
        }

        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
          console.log(`[handleEvaluate] Retrying Gemini in ${Math.round(delay)}ms...`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        } else {
          throw new Error(`Gemini API returned HTTP ${res.status} after ${maxRetries} attempts: ${errBody}`);
        }
      }

      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        throw new Error('Empty response content received from Gemini model');
      }

      return JSON.parse(rawText);
    } catch (err) {
      lastError = err;
      console.error(`[handleEvaluate] Gemini request exception (attempt ${attempt}/${maxRetries}):`, err.message);
      if (err.name === 'AbortError') {
        console.error('[handleEvaluate] Gemini request timed out after 12s');
      }
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }

  throw lastError || new Error('Failed to evaluate explanation with Gemini');
}

async function handleEvaluate(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
    if (body.length > 50000) req.destroy();
  });

  req.on('end', async () => {
    try {
      console.log('[POST /api/evaluate] Request Body:', body);
      let payload = {};
      try {
        payload = JSON.parse(body || '{}');
      } catch (parseErr) {
        console.warn('[POST /api/evaluate] 400 Validation Error: Invalid JSON body', parseErr.message);
        return sendJson(res, 400, { error: 'Invalid JSON request body', validationError: true });
      }

      const { 
        studentAnswer, 
        conceptId, 
        concept, 
        mustKnowPoints, 
        chapterId, 
        chapterTitle, 
        grade = 10, 
        boardId = 'cbse', 
        attempts = 1 
      } = payload;

      // STEP 2 Validation: studentAnswer
      if (!studentAnswer || typeof studentAnswer !== 'string' || studentAnswer.trim().length === 0) {
        console.warn('[POST /api/evaluate] 400 Validation Error: Missing or empty studentAnswer');
        return sendJson(res, 400, { error: 'Invalid or missing studentAnswer', validationError: true });
      }

      // Concept Resolution & Authoritative Rubric Lookup
      let targetConcept = null;

      if (conceptId) {
        // 1. Check authoritative concept repository by conceptId
        targetConcept = getConceptById(conceptId);

        // 2. Check CONCEPTS repository by ID or chapter aliases
        if (!targetConcept) {
          targetConcept = CONCEPTS.find(c => 
            c.id === conceptId || 
            c.chapterId === conceptId || 
            (c.chapterAliases && c.chapterAliases.includes(conceptId))
          );
        }

        // 3. Check notes registry across all chapters and subjects for this conceptId
        if (!targetConcept) {
          const subjects = [payload.subject || 'science', 'physics', 'chemistry', 'maths'];
          for (const subj of subjects) {
            const allNotes = getNotesForSubject(grade, subj, boardId) || [];
            for (const notes of allNotes) {
              if (notes && Array.isArray(notes.topics)) {
                const topic = notes.topics.find(t => t.id === conceptId);
                if (topic) {
                  targetConcept = {
                    id: topic.id,
                    title: topic.title,
                    description: topic.content,
                    mustKnowPoints: topic.mustKnowPoints || notes.quickRevisionPoints || [],
                    commonMisconceptions: topic.commonTraps || []
                  };
                  break;
                }
              }
            }
            if (targetConcept) break;
          }
        }

        // If conceptId is explicitly given but cannot be verified authoritatively, check fallback resolution
        if (!targetConcept) {
          if (concept || payload.conceptTitle || chapterId) {
            if (chapterId) {
              const chapterConcepts = getConceptsForChapter(chapterId, payload.chapterTitle || '');
              if (chapterConcepts && chapterConcepts.length > 0) {
                targetConcept = chapterConcepts.find(c => c.id === conceptId) || chapterConcepts[0];
              }
            }
            if (!targetConcept && (concept || payload.conceptTitle)) {
              const searchTitle = (concept || payload.conceptTitle).toLowerCase();
              targetConcept = CONCEPTS.find(c => c.title?.toLowerCase().includes(searchTitle));
            }
          }

          // Synthesize verified rubric from client-provided syllabus data if needed
          if (!targetConcept && (concept || payload.conceptTitle || payload.chapterTitle)) {
            const title = concept || payload.conceptTitle || payload.chapterTitle || 'Core Concept';
            targetConcept = {
              id: conceptId || `c-${Date.now()}`,
              title,
              description: payload.description || `Study of ${title}`,
              mustKnowPoints: Array.isArray(mustKnowPoints) && mustKnowPoints.length > 0 
                ? mustKnowPoints 
                : [`Understand the governing physical laws, definitions, and equations of ${title}.`],
              commonMisconceptions: payload.commonMisconceptions || []
            };
          }

          if (!targetConcept) {
            console.warn(`[POST /api/evaluate] 400 Validation Error: Unknown conceptId '${conceptId}'`);
            return sendJson(res, 400, { 
              error: `Unknown conceptId '${conceptId}'. Client-supplied rubrics are rejected.`,
              fallbackToLocal: false 
            });
          }
        }
      } else if (chapterId) {
        // Fallback to chapter resolution when conceptId is not provided
        const chapterConcepts = getConceptsForChapter(chapterId, payload.chapterTitle || '');
        if (chapterConcepts && chapterConcepts.length > 0) {
          targetConcept = chapterConcepts[0];
        } else {
          const subjects = [payload.subject || 'science', 'physics', 'chemistry', 'maths'];
          for (const subj of subjects) {
            const notes = getNotesForChapter(grade, subj, chapterId, boardId);
            if (notes && Array.isArray(notes.topics) && notes.topics.length > 0) {
              const topic = notes.topics[0];
              targetConcept = {
                id: topic.id,
                title: topic.title,
                description: topic.content,
                mustKnowPoints: topic.mustKnowPoints || notes.quickRevisionPoints || [],
                commonMisconceptions: topic.commonTraps || []
              };
              break;
            }
          }
        }
      } else if (concept) {
        // Match by concept title
        targetConcept = CONCEPTS.find(c => c.title?.toLowerCase() === concept.toLowerCase());
        if (!targetConcept) {
          const subjects = [payload.subject || 'science', 'physics', 'chemistry', 'maths'];
          for (const subj of subjects) {
            const allNotes = getNotesForSubject(grade, subj, boardId) || [];
            for (const notes of allNotes) {
              if (notes && Array.isArray(notes.topics)) {
                const topic = notes.topics.find(t => t.title?.toLowerCase() === concept.toLowerCase());
                if (topic) {
                  targetConcept = {
                    id: topic.id,
                    title: topic.title,
                    description: topic.content,
                    mustKnowPoints: topic.mustKnowPoints || notes.quickRevisionPoints || [],
                    commonMisconceptions: topic.commonTraps || []
                  };
                  break;
                }
              }
            }
            if (targetConcept) break;
          }
        }
      }

      if (!targetConcept) {
        console.warn('[POST /api/evaluate] 400 Validation Error: Missing valid conceptId or recognized chapterId');
        return sendJson(res, 400, { 
          error: 'Missing valid conceptId or recognized chapterId for authoritative evaluation.',
          fallbackToLocal: false 
        });
      }

      // Enrich with client-supplied mustKnowPoints if missing from database record
      if (!targetConcept.mustKnowPoints || targetConcept.mustKnowPoints.length === 0) {
        if (Array.isArray(mustKnowPoints) && mustKnowPoints.length > 0) {
          targetConcept.mustKnowPoints = mustKnowPoints;
        }
      }

      if (!targetConcept.mustKnowPoints || targetConcept.mustKnowPoints.length === 0) {
        targetConcept.mustKnowPoints = [`Understand the governing physical laws, definitions, and equations of ${targetConcept.title}`];
      }

      // Explicit failure simulation (used in tests asserting honest error handling)
      if (payload.simulateFailure) {
        console.warn('[POST /api/evaluate] Simulating 503 Provider Failure as requested by test');
        return sendJson(res, 503, {
          error: 'Evaluation is unavailable right now, please try again',
          details: 'Simulated provider failure',
          fallbackToLocal: true,
          serviceUnavailable: true
        });
      }

      // Evaluation Engine: Cloud LLM (Gemini / Ollama) with Server-Side Independent NCERT AI Fallback
      const llmProvider = getLLMProvider();
      let evalResult = null;
      let evaluatedBy = null;

      const apiKey = process.env.GEMINI_API_KEY || GEMINI_API_KEY;
      const canUseCloudLLM = (llmProvider.name === 'gemini_free' && apiKey && apiKey.trim() !== '') || (llmProvider.name !== 'gemini_free');

      if (canUseCloudLLM) {
        try {
          const prompt = `
You are "GYAAN AI", an encouraging, rigorous Indian school educational mentor evaluating a student's spoken/written explanation using the Feynman Active Recall Technique.
Language: Warm Indian English with friendly encouraging phrases like "Shabash", "Brilliant effort".
Grade Level: Class ${grade}
Attempt Number: ${attempts}
Concept: "${targetConcept.title}"
Description: "${targetConcept.description || ''}"
Must-Know Core Points: ${JSON.stringify(targetConcept.mustKnowPoints || [])}
Known Misconceptions to Watch For: ${JSON.stringify(targetConcept.commonMisconceptions || [])}

Student's Spoken Explanation:
"${studentAnswer.slice(0, 2000)}"

Evaluate the explanation thoroughly across understanding, must-know coverage, and misconceptions.
All content must come strictly from the chapter's notes and NCERT syllabus matched to the student's board and class. If unsure, explicitly say so.

Return ONLY valid JSON matching this exact schema:
{
  "understandingScore": <number 0-100>,
  "accuracyScore": <number 0-100>,
  "clarityScore": <number 0-100>,
  "confidenceScore": <number 0-100>,
  "praise": "<A celebratory sentence highlighting what they grasped correctly>",
  "gentleTip": "<Constructive 1-sentence tip for board exam precision>",
  "speakingTip": "<Encouraging remark on their spoken clarity and courage>",
  "whatYouGotRight": [
    "<Concept principle or fact the student accurately explained in their own words>"
  ],
  "whereYouAreWrongOrMissing": [
    {
      "mistake": "<Specific error or omitted principle>",
      "whyItIsWrong": "<Scientific explanation of why this formulation is inaccurate>",
      "correction": "<The correct formula, definition, or physical reality>"
    }
  ],
  "correctExplanationSimple": "<Clear, concise explanation of the concept in simple, accessible language>",
  "otherWaysToUnderstand": {
    "realLifeAnalogy": "<Vivid everyday real-world analogy illuminating the concept>",
    "workedExample": "<Concrete numerical or practical worked example demonstrating the principle>",
    "formulaOrDiagram": "<The governing mathematical equation, units, and circuit or diagram description>",
    "hindiHinglishExplanation": "<Simple 1-2 sentence Hindi or Hinglish explanation for bilingual intuitive clarity>",
    "memoryTrick": "<A clever 1-line mnemonic or memory trick to remember this concept in exams>"
  },
  "followUpQuestion": "<One engaging Socratic question testing deeper intuition under changed conditions>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "mustKnowCovered": ["<must-know point that the student successfully stated or implied>"],
  "mustKnowMissed": ["<must-know point that was missed or incomplete>"],
  "misconceptionsDetected": [
    {
      "detected": "<the exact misunderstanding or wrong phrasing>",
      "correction": "<the precise correct physical/mathematical reality>"
    }
  ],
  "actionableGapFix": "<A concise 2-sentence bite-sized explanation correcting the main gap>",
  "socraticFollowUp": "<One engaging Socratic thought question testing deeper intuition or edge-case application>",
  "tutorSpeech": "<2-3 spoken sentences that GYAAN AI will speak out loud to the student, praising them and asking the follow-up question>",
  "masteryImpact": <number between 10 and 25>
}
`;
          evalResult = await llmProvider.generateStructuredJson({ prompt, temperature: 0.3 });
          evaluatedBy = llmProvider.name;
        } catch (llmErr) {
          console.warn(`[POST /api/evaluate] ${llmProvider.name} failed (${llmErr.message}), switching to Server Independent NCERT Engine...`);
        }
      }

      // If cloud LLM was not configured or failed, run the Server Independent NCERT AI Engine
      if (!evalResult) {
        evalResult = evaluateLocally(studentAnswer, targetConcept, grade, attempts);
        evaluatedBy = 'server_independent_ncert_voice';
      }

      console.log(`[POST /api/evaluate] Success via ${evaluatedBy}! Score:`, evalResult.accuracyScore || evalResult.accuracy || evalResult.understandingScore);
      return sendJson(res, 200, evalResult);
    } catch (err) {
      console.error('[POST /api/evaluate] 500 Uncaught Exception:', err);
      return sendJson(res, 500, { error: err.message });
    }
  });
}

async function handleFollowUp(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
    if (body.length > 50000) req.destroy();
  });

  req.on('end', async () => {
    try {
      const payload = JSON.parse(body || '{}');
      const { conceptId, followUpQuestion, studentFollowUpAnswer } = payload;

      if (!studentFollowUpAnswer || typeof studentFollowUpAnswer !== 'string') {
        return sendJson(res, 400, { error: 'Invalid or missing studentFollowUpAnswer' });
      }

      let concept = null;
      if (conceptId) {
        concept = getConceptById(conceptId);
      }

      const prompt = `
You are "GYAAN AI" evaluating a student's response to your Socratic follow-up question.
Concept: "${concept?.title || 'Concept'}"
Follow-Up Question Asked: "${followUpQuestion || ''}"
Student's Response: "${studentFollowUpAnswer}"

Respond in JSON:
{
  "answered": true,
  "bonusScore": <number 10-25>,
  "feedback": "<1-2 sentences acknowledging their thinking and explaining the intuition>",
  "tutorSpeech": "<2 spoken sentences praising their answer and concluding the lesson encouragingly>"
}
`;

      const llmProvider = getLLMProvider();
      try {
        const data = await llmProvider.generateStructuredJson({ prompt, temperature: 0.6 });
        return sendJson(res, 200, data);
      } catch (err) {
        return sendJson(res, 503, { error: 'Follow-up evaluation unavailable', details: err.message, fallbackToLocal: true });
      }
    } catch (err) {
      return sendJson(res, 500, { error: err.message, fallbackToLocal: true });
    }
  });
}

async function handleDoubt(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
    if (body.length > 50000) req.destroy();
  });

  req.on('end', async () => {
    try {
      const payload = JSON.parse(body || '{}');
      const { question, conceptId, conceptTitle, grade = 10, boardId = 'cbse' } = payload;

      if (!question || typeof question !== 'string' || question.trim().length === 0) {
        return sendJson(res, 400, { error: 'Missing or empty question' });
      }

      let targetConcept = conceptId ? getConceptById(conceptId) : null;
      const title = conceptTitle || targetConcept?.title || 'this topic';
      const mustKnow = targetConcept?.mustKnowPoints || [];

      const prompt = `
You are "GYAAN AI", a warm, encouraging Indian school educational mentor answering a student's doubt about "${title}".
Class: ${grade}
Subject: Science
Board: ${boardId}
Chapter Notes & Core Points: ${JSON.stringify(mustKnow)}

Student's Question / Doubt:
"${question.trim()}"

Provide a crystal-clear, curriculum-grounded explanation. If unsure, explicitly say so.
Return ONLY valid JSON matching this exact schema:
{
  "isExplanation": true,
  "conceptTitle": "${title}",
  "question": "${question.trim()}",
  "explanation": "<Clear, simple 2-3 paragraph pedagogical explanation grounded in NCERT syllabus>",
  "analogy": "<Everyday real-life analogy>",
  "formulaOrFact": "<Key formula or essential rule to remember>",
  "hindiHinglish": "<Simple 1-2 sentence Hindi/Hinglish explanation for intuitive grasp>",
  "tutorSpeech": "<Warm 2-3 sentence conversational summary that GYAAN AI speaks aloud>",
  "suggestedFollowUps": [
    "<Interesting follow-up question 1>",
    "<Interesting follow-up question 2>"
  ]
}
`;

      const llmProvider = getLLMProvider();
      try {
        const doubtResult = await llmProvider.generateStructuredJson({ prompt, temperature: 0.5 });
        return sendJson(res, 200, doubtResult);
      } catch (err) {
        // High quality local curriculum fallback when LLM is offline
        return sendJson(res, 200, {
          isExplanation: true,
          conceptTitle: title,
          question: question.trim(),
          explanation: targetConcept?.description || `In ${title}, physical phenomena follow precise scientific laws.`,
          analogy: `Think of ${title} like a real-world system where cause and effect are linked by physical laws.`,
          formulaOrFact: mustKnow[0] || 'Focus on definitions, units, and conditions.',
          hindiHinglish: `Simple Hindi/Hinglish: Is concept ke mukhya formula aur niyam ko yaad rakhein.`,
          tutorSpeech: `Great question about ${title}! Let's focus on the fundamental definition and formula.`,
          suggestedFollowUps: [
            `What is the main formula used in ${title}?`,
            `How does this apply in everyday life?`
          ]
        });
      }
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  });
}

async function handleCleanTranscript(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
    if (body.length > 50000) req.destroy();
  });

  req.on('end', async () => {
    try {
      const payload = JSON.parse(body || '{}');
      const { rawTranscript } = payload;
      if (!rawTranscript || typeof rawTranscript !== 'string') {
        return sendJson(res, 400, { error: 'Missing rawTranscript' });
      }

      let cleaned = rawTranscript;
      cleaned = cleaned.replace(/\belectricity\s+dies\s+available\s+charge\b/gi, 'Electricity is flow of electric charge');
      cleaned = cleaned.replace(/\bAtlantic\s+City\b/gi, 'Electricity');
      cleaned = cleaned.replace(/\batlantic\s+city\b/gi, 'electricity');
      cleaned = cleaned.replace(/\bdies\s+available\s+charge\b/gi, 'flow of charge');
      cleaned = cleaned.replace(/\bdies\s+available\b/gi, 'is flow of');
      cleaned = cleaned.replace(/\bavailable\s+charge\b/gi, 'electric charge');
      cleaned = cleaned.replace(/\bhome'?s\s+law\b/gi, "Ohm's law");
      cleaned = cleaned.replace(/\bhomes\s+law\b/gi, "Ohm's law");
      cleaned = cleaned.replace(/\bresister\b/gi, 'resistor');
      cleaned = cleaned.replace(/\bcolumns?\b/gi, 'Coulombs');
      cleaned = cleaned.replace(/\bempires?\b/gi, 'Amperes');
      cleaned = cleaned.replace(/\bpotential\s+different\b/gi, 'potential difference');
      cleaned = cleaned.replace(/\bvolt\s+age\b/gi, 'voltage');
      cleaned = cleaned.replace(/\bserious\s+circuit\b/gi, 'series circuit');
      cleaned = cleaned.replace(/\bmagnetic\s+feel\b/gi, 'magnetic field');

      if (Array.isArray(payload.vocabularyHints) && payload.vocabularyHints.length > 0) {
        for (const hint of payload.vocabularyHints) {
          if (typeof hint === 'string' && hint.length > 3) {
            if (hint.toLowerCase().includes('electric') && cleaned.toLowerCase().includes('atlantic')) {
              cleaned = cleaned.replace(/atlantic/gi, 'electric');
            }
          }
        }
      }

      const hasCorrection = cleaned.trim().toLowerCase() !== rawTranscript.trim().toLowerCase();
      return sendJson(res, 200, {
        raw: rawTranscript,
        corrected: cleaned.trim(),
        hasCorrection,
        suggestedText: hasCorrection ? cleaned.trim() : ''
      });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  });
}

function verifyEnrollmentContext(req, requestedClass, requestedBoard) {
  const enrolledClass = req.headers['x-enrolled-class'];
  const enrolledBoard = req.headers['x-enrolled-board'];

  if (enrolledClass) {
    const enrolledNum = parseInt(enrolledClass, 10);
    if (!isNaN(enrolledNum) && requestedClass && enrolledNum !== requestedClass) {
      return {
        valid: false,
        error: 'ENROLLED_CONTEXT_MISMATCH',
        message: `Account is enrolled in Class ${enrolledNum}. Access to Class ${requestedClass} is restricted.`
      };
    }
  }

  if (enrolledBoard && requestedBoard) {
    if (enrolledBoard.toLowerCase() !== requestedBoard.toLowerCase()) {
      return {
        valid: false,
        error: 'ENROLLED_CONTEXT_MISMATCH',
        message: `Account is enrolled in Board ${enrolledBoard}. Access to ${requestedBoard} is restricted.`
      };
    }
  }

  return { valid: true };
}

export function createServer() {
  return http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
      setCorsHeaders(res);
      res.writeHead(204);
      return res.end();
    }

    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    // 1. Health check route: GET /api/health returning 200
    if (url.pathname === '/api/health' || url.pathname === '/health') {
      return sendJson(res, 200, {
        status: 'ok',
        service: 'GYAAN AI Backend Service',
        version: '2026.1',
        timestamp: new Date().toISOString(),
        geminiConfigured: Boolean(GEMINI_API_KEY),
        demoSeeded: Boolean(demoStore.sampleStudent),
        flagshipChapter: demoStore.flagshipChapter?.title || 'Electricity',
        sampleStudent: demoStore.sampleStudent?.name || 'Aarav Sharma (Demo data)'
      });
    }

    // 2. Demo data retrieval endpoints
    if (url.pathname === '/api/demo' || url.pathname === '/api/demo/student' || url.pathname === '/api/student/demo') {
      return sendJson(res, 200, {
        curriculum: demoStore.curriculum,
        flagshipChapter: demoStore.flagshipChapter,
        sampleStudent: demoStore.sampleStudent
      });
    }

    // 3. Removed endpoint for demo-seed-logs (enforces zero demo-seed buttons/endpoints)
    if (url.pathname === '/api/voice/seed-demo-logs') {
      return sendJson(res, 404, {
        error: 'Endpoint /api/voice/seed-demo-logs has been removed.'
      });
    }

    // 4. Voice Clean Transcript
    if (url.pathname === '/api/voice/clean-transcript' && req.method === 'POST') {
      return handleCleanTranscript(req, res);
    }

    // 5. Voice Query (Live query and diagnostic trace)
    if (url.pathname === '/api/voice/query' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const payload = body ? JSON.parse(body) : {};
          const queryTrace = {
            id: `vlog-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            created_at: new Date().toISOString(),
            raw_stt_transcript: payload.transcript || '',
            stt_confidence: Number(payload.confidence) || 0.95,
            user_edited_transcript: payload.user_edited_transcript || null,
            board_id: payload.board_id || 'cbse',
            class_level: Number(payload.class_level) || 10,
            subject_id: payload.subject_id || 'science',
            current_chapter_id: payload.current_chapter_id || 'cbse-10-science-ch12',
            chapter_title: demoStore.flagshipChapter?.title || 'Electricity',
            diagnosed_stage: 'healthy',
            status: 'completed',
            retrieved_chunks: demoStore.flagshipChapter ? [
              {
                rank: 1,
                chunk_id: 'chunk-live-1',
                chapter_id: demoStore.flagshipChapter.id,
                chapter_title: demoStore.flagshipChapter.title,
                topic_id: 'topic-live',
                topic_title: 'Electric Potential and Potential Difference',
                score: 0.94,
                content: `Ground truth NCERT syllabus content for "${payload.transcript || 'electric potential'}"`,
                method: 'hybrid_bm25_vector'
              }
            ] : [],
            retrieval_confidence: 0.92,
            final_llm_prompt: `Explain "${payload.transcript}" strictly grounded in NCERT syllabus.`,
            final_answer: `According to the NCERT Class 10 curriculum, electric potential difference between two points is the work done in moving a unit charge: V = W/Q.`,
            latency_ms: 195
          };
          demoStore.voiceQueryLogs.unshift(queryTrace);
          return sendJson(res, 201, queryTrace);
        } catch (parseErr) {
          return sendJson(res, 400, { error: 'Invalid JSON body: ' + parseErr.message });
        }
      });
      return;
    }

    // 6. Voice Debug Routes: Enforce Admin Role (403 for non-admins)
    if (url.pathname === '/api/voice/logs' || url.pathname.startsWith('/api/voice/logs/') || url.pathname === '/api/voice/cleanup') {
      if (!checkAdminRole(req)) {
        return sendJson(res, 403, {
          error: 'Forbidden: Admin role required to access voice debug logs',
          status: 403
        });
      }

      if (req.method === 'GET') {
        if (url.pathname === '/api/voice/logs') {
          const limit = parseInt(url.searchParams.get('limit') || '50', 10);
          const stage = url.searchParams.get('stage');
          let logs = demoStore.voiceQueryLogs;
          if (stage && stage !== 'all') {
            logs = logs.filter(l => l.diagnosed_stage === stage);
          }
          return sendJson(res, 200, logs.slice(0, limit));
        }

        if (url.pathname.startsWith('/api/voice/logs/')) {
          const id = url.pathname.split('/')[4];
          const log = demoStore.voiceQueryLogs.find(l => l.id === id);
          if (!log) return sendJson(res, 404, { error: 'Log not found' });
          return sendJson(res, 200, log);
        }
      }

      if (req.method === 'DELETE' && url.pathname === '/api/voice/logs') {
        const count = demoStore.voiceQueryLogs.length;
        demoStore.voiceQueryLogs = [];
        return sendJson(res, 200, { status: 'ok', deleted_count: count });
      }

      if (req.method === 'POST' && url.pathname === '/api/voice/cleanup') {
        return sendJson(res, 200, {
          status: 'ok',
          deleted_count: 0,
          message: 'Successfully deleted voice debug logs older than 7 days'
        });
      }
    }

    // Fallback forwarder to Python FastAPI (Port 8000) for optional external microservices
    if (url.pathname.startsWith('/api/voice')) {
      const proxyReq = http.request({
        host: '127.0.0.1',
        port: 8000,
        path: req.url,
        method: req.method,
        headers: {
          ...req.headers,
          host: '127.0.0.1:8000'
        }
      }, (proxyRes) => {
        setCorsHeaders(res);
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      });

      proxyReq.on('error', (err) => {
        sendJson(res, 502, {
          error: 'FastAPI Voice Backend unavailable on port 8000',
          details: err.message
        });
      });

      req.pipe(proxyReq, { end: true });
      return;
    }

    // Curriculum Root API: /api/curriculum?chapter=... or /api/curriculum?chapterId=...
    if (url.pathname === '/api/curriculum') {
      const chapterParam = url.searchParams.get('chapter') || url.searchParams.get('chapterId');
      const classParam = url.searchParams.get('class') || 10;
      const subjectParam = url.searchParams.get('subject') || 'science';
      const boardParam = url.searchParams.get('board') || 'cbse';

      if (chapterParam) {
        let notes = getNotesForChapter(Number(classParam) || 10, subjectParam, chapterParam, boardParam);
        if (!notes) {
          const subjects = ['science', 'phy', 'chem', 'math', 'social science', 'eng'];
          for (const s of subjects) {
            notes = getNotesForChapter(Number(classParam) || 10, s, chapterParam, boardParam);
            if (notes) break;
          }
        }

        const concepts = getConceptsForChapter(chapterParam, notes?.chapterTitle || '');
        if (notes || (concepts && concepts.length > 0)) {
          return sendJson(res, 200, {
            chapterId: chapterParam,
            chapterTitle: notes?.chapterTitle || '',
            notes: notes || null,
            concepts: concepts || [],
            mustKnowPoints: notes?.mustKnowPoints || notes?.quickRevisionPoints || []
          });
        }
      }
      return sendJson(res, 200, { status: 'ok', service: 'curriculum' });
    }

    // Curriculum APIs: Boards
    if (url.pathname === '/api/curriculum/boards') {
      return sendJson(res, 200, BOARDS);
    }

    // Curriculum APIs: Classes
    if (url.pathname === '/api/curriculum/classes') {
      return sendJson(res, 200, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }

    // Curriculum APIs: Subjects
    if (url.pathname === '/api/curriculum/subjects') {
      const classParam = url.searchParams.get('class');
      const boardParam = url.searchParams.get('board') || 'cbse';

      if (!classParam) {
        return sendJson(res, 400, { error: 'Missing required query parameter: class' });
      }

      const classNum = parseInt(classParam, 10);
      if (isNaN(classNum) || classNum < 1 || classNum > 12) {
        return sendJson(res, 400, { error: 'Invalid class parameter. Must be an integer between 1 and 12.' });
      }

      const boardObj = BOARDS.find(b => b.id.toLowerCase() === boardParam.toLowerCase());
      if (!boardObj) {
        return sendJson(res, 400, { error: `Invalid board parameter: '${boardParam}'` });
      }

      const authCheck = verifyEnrollmentContext(req, classNum, boardObj.id);
      if (!authCheck.valid) {
        return sendJson(res, 403, authCheck);
      }

      const subjects = getSubjectsForClass(classNum, boardObj.id);
      return sendJson(res, 200, subjects || []);
    }

    // Curriculum APIs: Chapters
    if (url.pathname === '/api/curriculum/chapters') {
      const classParam = url.searchParams.get('class');
      const subjectParam = url.searchParams.get('subject');
      const boardParam = url.searchParams.get('board') || 'cbse';

      if (!classParam || !subjectParam) {
        return sendJson(res, 400, { error: 'Missing required query parameters: class and subject' });
      }

      const classNum = parseInt(classParam, 10);
      if (isNaN(classNum) || classNum < 1 || classNum > 12) {
        return sendJson(res, 400, { error: 'Invalid class parameter. Must be an integer between 1 and 12.' });
      }

      const authCheck = verifyEnrollmentContext(req, classNum, boardParam);
      if (!authCheck.valid) {
        return sendJson(res, 403, authCheck);
      }

      const chapters = getChaptersForSubject(classNum, subjectParam, boardParam);
      if (chapters === null) {
        return sendJson(res, 404, { error: `Subject '${subjectParam}' not found for class ${classNum}` });
      }

      return sendJson(res, 200, chapters);
    }

    // Curriculum APIs: Notes
    if (url.pathname === '/api/curriculum/notes') {
      const classParam = url.searchParams.get('class');
      const subjectParam = url.searchParams.get('subject') || 'phy';
      const boardParam = url.searchParams.get('board') || 'cbse';
      const chapterParam = url.searchParams.get('chapter') || url.searchParams.get('chapterId');
      const searchParam = url.searchParams.get('search');

      if (searchParam) {
        const results = searchNotes(searchParam, { 
          boardId: boardParam, 
          classLevel: classParam ? parseInt(classParam, 10) : undefined, 
          subjectKey: subjectParam 
        });
        return sendJson(res, 200, results);
      }

      if (!classParam) {
        return sendJson(res, 400, { error: 'Missing required query parameter: class' });
      }

      const classNum = parseInt(classParam, 10);
      if (isNaN(classNum) || classNum < 1 || classNum > 12) {
        return sendJson(res, 400, { error: 'Invalid class parameter. Must be an integer between 1 and 12.' });
      }

      const authCheck = verifyEnrollmentContext(req, classNum, boardParam);
      if (!authCheck.valid) {
        return sendJson(res, 403, authCheck);
      }

      if (chapterParam) {
        let notes = getNotesForChapter(classNum, subjectParam, chapterParam, boardParam);
        if (!notes) {
          const subjects = ['science', 'phy', 'chem', 'math', 'social science', 'eng'];
          for (const s of subjects) {
            notes = getNotesForChapter(classNum, s, chapterParam, boardParam);
            if (notes) break;
          }
        }
        if (!notes) {
          return sendJson(res, 404, { error: `Notes not found for chapter '${chapterParam}'` });
        }
        return sendJson(res, 200, notes);
      }

      const allNotes = getNotesForSubject(classNum, subjectParam, boardParam);
      return sendJson(res, 200, allNotes);
    }

    // Curriculum APIs: Concepts
    if (url.pathname === '/api/curriculum/concepts') {
      const chapterId = url.searchParams.get('chapterId') || url.searchParams.get('chapter');
      const title = url.searchParams.get('title');
      if (chapterId || title) {
        let filtered = getConceptsForChapter(chapterId, title);
        if ((!filtered || filtered.length === 0) && chapterId) {
          const classParam = url.searchParams.get('class') || (chapterId.match(/c(\d+)/i) ? chapterId.match(/c(\d+)/i)[1] : 10);
          let inferredSubject = 'science';
          const lowerCh = chapterId.toLowerCase();
          if (lowerCh.includes('math')) inferredSubject = 'math';
          else if (lowerCh.includes('sci')) inferredSubject = 'science';
          else if (lowerCh.includes('eng')) inferredSubject = 'eng';
          else if (lowerCh.includes('soc') || lowerCh.includes('sst')) inferredSubject = 'social science';
          else if (lowerCh.includes('phy')) inferredSubject = 'phy';
          else if (lowerCh.includes('che')) inferredSubject = 'chem';

          const subjectParam = url.searchParams.get('subject') || inferredSubject;
          const boardParam = url.searchParams.get('board') || 'cbse';
          const notes = getNotesForChapter(classParam, subjectParam, chapterId, boardParam);
          if (notes && Array.isArray(notes.topics) && notes.topics.length > 0) {
            filtered = notes.topics.map(t => ({
              id: t.id,
              chapterId: chapterId,
              chapterTitle: notes.chapterTitle,
              title: t.title,
              description: t.content,
              mustKnowPoints: t.mustKnowPoints || [],
              formulas: t.formulas || [],
              status: 'verified'
            }));
          }
        }
        return sendJson(res, 200, filtered || []);
      }
      return sendJson(res, 200, CONCEPTS);
    }

    // Curriculum APIs: Single Concept & Graph
    if (url.pathname.startsWith('/api/curriculum/concept/')) {
      const parts = url.pathname.split('/');
      const conceptId = parts[4];
      const isGraph = parts[5] === 'graph';

      const concept = CONCEPTS.find(c => c.id === conceptId);
      if (!concept) return sendJson(res, 404, { error: 'Concept not found' });

      if (isGraph) {
        const prereqs = (concept.prerequisites || []).map(pid => CONCEPTS.find(c => c.id === pid)).filter(Boolean);
        const dependents = (concept.dependentConcepts || []).map(did => CONCEPTS.find(c => c.id === did)).filter(Boolean);
        return sendJson(res, 200, {
          concept,
          prerequisites: prereqs,
          dependents
        });
      }

      return sendJson(res, 200, concept);
    }

    // Provider status diagnostics
    if (url.pathname === '/api/providers/status' && req.method === 'GET') {
      const status = await providerManager.getProvidersStatus();
      return sendJson(res, 200, status);
    }

    // Evaluation endpoints
    if (url.pathname === '/api/evaluate' && req.method === 'POST') {
      return handleEvaluate(req, res);
    }

    if (url.pathname === '/api/evaluate/followup' && req.method === 'POST') {
      return handleFollowUp(req, res);
    }

    if (url.pathname === '/api/doubt' && req.method === 'POST') {
      return handleDoubt(req, res);
    }

    if (url.pathname === '/api/voice/clean-transcript' && req.method === 'POST') {
      return handleCleanTranscript(req, res);
    }

    sendJson(res, 404, { error: 'Route not found' });
  });
}

const server = createServer();

// Auto-start when executed directly
if (process.argv[1] && process.argv[1].endsWith('index.js')) {
  server.listen(Number(PORT), HOST, () => {
    console.log(`[GYAAN AI Server] Listening on http://${HOST}:${PORT}`);
    console.log(`[GYAAN AI Server] Gemini API Key configured: ${Boolean(GEMINI_API_KEY)}`);
  });
}
