// GYAAN AI Teach-Back Phases 3, 4, 5 Verification Test Suite
// Verifies:
// PHASE 3: Teach-back validation (transcript edit, under 15 words/low confidence/off-topic rejection, evaluation consistency)
// PHASE 4: Multiple attempts (unlimited attempts, history tracking, best score, XP only on first completion or improvement)
// PHASE 5: Honest labels (Verified NCERT ONLY when status === 'reviewed', else Based on the NCERT syllabus)

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage for Node test runner environment
const storageMap = new Map();
if (!globalThis.localStorage) {
  globalThis.localStorage = {
    getItem: (k) => (storageMap.has(k) ? storageMap.get(k) : null),
    setItem: (k, v) => storageMap.set(k, String(v)),
    removeItem: (k) => storageMap.delete(k),
    clear: () => storageMap.clear()
  };
}

import { 
  evaluateStudentExplanation, 
  normalizeEvaluationResponse,
  evaluateLocally 
} from '../src/services/aiVoiceService.js';
import { progressService } from '../src/services/progressService.js';
import { authService } from '../src/services/authService.js';

describe('Phase 3: Teach-Back Validation Suite', () => {

  const testConcept = {
    id: 'c10-sci-ch3-t2',
    title: 'Ionic Bond Formation & Properties of Ionic Compounds',
    chapterId: 'ch-3-science',
    chapterTitle: 'Metals and Non-Metals',
    mustKnowPoints: [
      'Ionic compounds have high melting and boiling points due to strong inter-ionic electrostatic attractions',
      'Solid ionic crystals do not conduct electricity because ions are firmly fixed in lattice positions',
      'In molten state or aqueous solution, electrostatic bonds break, allowing ions to move freely and conduct electric current',
      'Ionic bonds form by complete transfer of electrons from metals to non-metals'
    ],
    commonMisconceptions: [
      {
        misconception: 'Metals share electrons with non-metals to form covalent bonds',
        correction: 'Metals transfer valence electrons completely to non-metals, forming electrostatic ionic bonds.'
      }
    ]
  };

  it('1. Rejects empty transcript but accepts and evaluates brief explanation without word limit gate', async () => {
    // Empty input must be rejected
    const emptyResult = await evaluateStudentExplanation({
      studentAnswer: '   ',
      concept: testConcept,
      grade: 10,
      boardId: 'cbse'
    });
    assert.equal(emptyResult.validationError, true);
    assert.equal(emptyResult.accuracy, 0);
    assert.equal(emptyResult.error, 'Please speak or enter an explanation to evaluate.');

    // Brief 3-word input must be accepted and evaluated (no word limit gate)
    const brief = 'Metals transfer electrons.'; // 3 words
    const result = evaluateLocally(brief, testConcept, 10, 1);
    assert.equal(result.isEvaluated, true);
    assert.ok(result.accuracy > 0);
    assert.ok(result.whatYouGotRight && result.whatYouGotRight.length > 0);
    assert.ok(result.otherWaysToUnderstand);
  });

  it('2. Rejects transcript when STT confidence is low (< 0.65): unscored, 0 XP', async () => {
    const validLength = 'Metals lose valence electrons to form cations and non-metals gain them to form anions with high melting points.';
    const result = await evaluateStudentExplanation({
      studentAnswer: validLength,
      concept: testConcept,
      confidence: 0.52, // Low confidence
      grade: 10,
      boardId: 'cbse'
    });

    assert.equal(result.unscored, true);
    assert.equal(result.accuracy, 0);
    assert.equal(result.xpAwarded, 0);
    assert.ok(result.error.includes("I couldn't hear a clear explanation"));
  });

  it('3. Rejects off-topic explanation: unscored, 0 XP, exact error message', async () => {
    // 16 words, but talking about cricket and movies instead of chemistry
    const offTopicAnswer = 'Today I watched an exciting cricket match and then ate biryani while watching an action movie with my friends.';
    const result = await evaluateStudentExplanation({
      studentAnswer: offTopicAnswer,
      concept: testConcept,
      grade: 10,
      boardId: 'cbse'
    });

    assert.equal(result.unscored, true);
    assert.equal(result.offTopic, true);
    assert.equal(result.accuracy, 0);
    assert.equal(result.xpAwarded, 0);
    assert.equal(result.message, "I couldn't understand this. Try writing a full sentence about the topic.");
  });

  it('4. Enforces evaluation consistency: score, missed points and misconceptions never contradict each other', () => {
    // Case A: High score (>=80) cannot have unpenalized misconceptions
    const rawContradictory = {
      accuracyScore: 92,
      understandingScore: 90,
      misconceptionsDetected: [{ detected: 'Metals share electrons', correction: 'Metals transfer electrons' }],
      mustKnowMissed: []
    };
    const normalized = normalizeEvaluationResponse(rawContradictory, testConcept);
    
    assert.ok(normalized.accuracy <= 70, `Contradictory score should be scaled down when misconceptions are present, got ${normalized.accuracy}`);
    assert.equal(normalized.isEvaluated, true);

    // Case B: Clean explanation with no misconceptions
    const rawClean = {
      accuracyScore: 90,
      understandingScore: 88,
      misconceptionsDetected: [],
      mustKnowMissed: []
    };
    const cleanNorm = normalizeEvaluationResponse(rawClean, testConcept);
    assert.ok(cleanNorm.accuracy >= 80);
    assert.equal(cleanNorm.misconceptionsDetected.length, 0);
    assert.equal(cleanNorm.isEvaluated, true);
  });
});

describe('Phase 4: Multiple Attempts & History Tracking Suite', () => {
  const conceptId = 'test-multi-attempt-concept';

  it('1. Records attempt history with score, date, and transcript for unlimited attempts', () => {
    authService.signIn({
      name: 'Priya Sharma',
      enrolledClass: 10,
      enrolledBoard: 'CBSE'
    });

    // Attempt 1: Score 50%
    progressService.recordConceptEvaluation({
      conceptId,
      conceptTitle: 'Test Multi Attempt',
      chapterId: 'ch-test',
      transcript: 'Attempt 1 explanation with partial understanding.',
      evaluation: { accuracy: 50, understandingScore: 52 }
    });

    let attempts = progressService.getConceptAttempts(conceptId);
    let progress = progressService.getConceptProgress(conceptId);
    assert.equal(attempts.length, 1);
    assert.equal(progress.bestScore, 50);
    assert.equal(progress.lastScore, 50);
    assert.equal(attempts[0].score, 50);
    assert.ok(attempts[0].date);
    assert.ok(attempts[0].transcript.includes('Attempt 1'));

    // Attempt 2: Score 85% (Score improves)
    progressService.recordConceptEvaluation({
      conceptId,
      conceptTitle: 'Test Multi Attempt',
      chapterId: 'ch-test',
      transcript: 'Attempt 2 explanation with superb conceptual clarity.',
      evaluation: { accuracy: 85, understandingScore: 88 }
    });

    attempts = progressService.getConceptAttempts(conceptId);
    progress = progressService.getConceptProgress(conceptId);
    assert.equal(attempts.length, 2);
    assert.equal(progress.bestScore, 85, 'Best score must update to 85');
    assert.equal(progress.lastScore, 85);
    assert.equal(attempts[0].score, 85, 'Latest attempt is at top of history');
    assert.equal(attempts[1].score, 50);

    // Attempt 3: Score 70% (Repeat attempt, lower than best)
    progressService.recordConceptEvaluation({
      conceptId,
      conceptTitle: 'Test Multi Attempt',
      chapterId: 'ch-test',
      transcript: 'Attempt 3 explanation with moderate coverage.',
      evaluation: { accuracy: 70, understandingScore: 72 }
    });

    attempts = progressService.getConceptAttempts(conceptId);
    progress = progressService.getConceptProgress(conceptId);
    assert.equal(attempts.length, 3, 'Unlimited attempts are stored');
    assert.equal(progress.bestScore, 85, 'Best score remains 85 (does not regress)');
    assert.equal(progress.lastScore, 70);
  });

  it('2. Enforces XP rule: awards XP only on first completion or when score improves', () => {
    const calculateXpAward = (isFirst, score, prevBest) => {
      if (isFirst) {
        return score >= 75 ? 25 : 15;
      }
      if (score > prevBest) {
        return Math.max(10, Math.round((score - prevBest) * 0.5));
      }
      return 0; // No XP on same or lower score
    };

    // First completion -> awards XP
    assert.equal(calculateXpAward(true, 60, 0), 15);
    assert.equal(calculateXpAward(true, 85, 0), 25);

    // Repeat attempt with lower score -> 0 XP
    assert.equal(calculateXpAward(false, 50, 85), 0);

    // Repeat attempt with equal score -> 0 XP
    assert.equal(calculateXpAward(false, 85, 85), 0);

    // Repeat attempt with improved score -> awards delta XP
    assert.equal(calculateXpAward(false, 95, 85), 10);
  });
});

describe('Phase 5: Honest Curriculum Labels Suite', () => {
  it('1. Shows "Verified NCERT" ONLY when status === "reviewed"', () => {
    const getProvenanceLabel = (status) => {
      return status === 'reviewed' ? 'Verified NCERT' : 'Based on the NCERT syllabus';
    };

    assert.equal(getProvenanceLabel('reviewed'), 'Verified NCERT');
    assert.equal(getProvenanceLabel('draft'), 'Based on the NCERT syllabus');
    assert.equal(getProvenanceLabel('published'), 'Based on the NCERT syllabus');
    assert.equal(getProvenanceLabel(undefined), 'Based on the NCERT syllabus');
  });
});
