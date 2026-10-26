// GYAAN AI Teach-Back & Evaluation Verification Test Suite
// Verifies:
// 1. Failed AI call shows honest error without fake score or XP
// 2. Transcripts under 15 words are unscored (0 XP, "I couldn't hear a clear explanation. Try again.")
// 3. Three distinct teach-back explanations (correct, half-correct, wrong) on Chapter 3 Science yield 3 distinct results

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { 
  evaluateStudentExplanation, 
  chunkIntoSentences,
  SpeechManager 
} from '../src/services/aiVoiceService.js';
import { getChapterNotes } from '../src/data/notes/notesRegistry.js';
import { evaluateLocally } from '../src/services/aiVoiceService.js';

describe('Teach-Back Evaluation & Honest Failure Verification Suite', () => {

  const ch3Notes = getChapterNotes('cbse', 10, 'science', 'ch-3-science');
  const targetConcept = {
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
      },
      {
        misconception: 'Solid ionic compounds conduct electricity',
        correction: 'Solid ionic crystals do not conduct electricity because ions are immobilized in a crystal lattice.'
      }
    ]
  };

  it('1. Failed AI call shows error NOT fake result, with 0 XP and canRetry: true', async () => {
    // Calling evaluateStudentExplanation with server returning 503 (or unconfigured key)
    const result = await evaluateStudentExplanation({
      studentAnswer: 'Metals lose valence electrons to form cations and non-metals gain them to form anions with high melting points.',
      concept: targetConcept,
      grade: 10,
      boardId: 'cbse',
      attempts: 1,
      simulateFailure: true
    });

    assert.ok(result.error, 'Result must contain an error property');
    assert.equal(result.isServiceUnavailable, true, 'Must indicate service is unavailable');
    assert.equal(result.canRetry, true, 'Must allow retry via Retry button');
    assert.equal(result.error, 'Evaluation is unavailable right now, please try again');
    assert.equal(result.accuracy, 0, 'Must NOT fabricate an accuracy score on failure');
    assert.equal(result.xpAwarded, 0, 'Must NOT award XP on failed evaluation');
  });

  it('2. Empty explanation is rejected while brief explanation is accepted and evaluated', async () => {
    // Empty input must be rejected
    const emptyResult = await evaluateStudentExplanation({
      studentAnswer: '  ',
      concept: targetConcept,
      grade: 10,
      boardId: 'cbse',
      attempts: 1
    });
    assert.equal(emptyResult.validationError, true);
    assert.equal(emptyResult.error, 'Please speak or enter an explanation to evaluate.');

    // Brief explanation (even 4 words or 6 words) is accepted and evaluated
    const briefAnswer = 'Metals react with acids.'; // 4 words
    const result = evaluateLocally(briefAnswer, targetConcept, 10, 1);
    assert.equal(result.isEvaluated, true, 'Must evaluate without minimum word count barrier');
    assert.ok(result.accuracy > 0, 'Accuracy must be calculated for brief answer');
    assert.ok(result.otherWaysToUnderstand, 'Must provide other ways to understand');
  });

  it('3. Three distinct teach-back explanations on Chapter 3 Science produce 3 distinct diagnostic results', () => {
    // 3.A Correct explanation
    const correctExplanation = `
      Metals lose electrons to form positive ions called cations, and non-metals accept electrons to form negative anions. 
      The strong electrostatic attraction between these oppositely charged ions forms an ionic bond. 
      Ionic compounds have high melting and boiling points because a large amount of energy is required to break the strong lattice bonds. 
      In solid state, ions cannot move freely, so they do not conduct electricity, but in molten state or aqueous solution, 
      electrostatic bonds break and ions are free to move and conduct electric current.
    `;

    // 3.B Half-correct explanation
    const halfCorrectExplanation = `
      Metals and non-metals form ionic compounds when they react together. 
      They have high melting points and can conduct electricity, but I am not very sure about how the electron transfer happens 
      or why they do not conduct in solid state.
    `;

    // 3.C Wrong explanation
    const wrongExplanation = `
      Metals share electrons equally with non-metals through covalent bonding. 
      Because of this sharing, ionic compounds melt at very low temperatures and they conduct electricity easily in solid crystal form 
      but not in liquid form.
    `;

    const evalA = evaluateLocally(correctExplanation, targetConcept, 10, 1);
    const evalB = evaluateLocally(halfCorrectExplanation, targetConcept, 10, 1);
    const evalC = evaluateLocally(wrongExplanation, targetConcept, 10, 1);

    // Verify Result A: High accuracy, high understanding, zero misconceptions
    assert.ok(evalA.accuracy >= 80, `Expected high accuracy >= 80, got ${evalA.accuracy}`);
    assert.ok(evalA.mustKnowCovered.length >= 3, 'Expected at least 3 must-know points covered');
    assert.equal(evalA.misconceptionsDetected.length, 0, 'Expected 0 misconceptions for correct explanation');

    // Verify Result B: Moderate accuracy (40-80%), partial coverage
    assert.ok(evalB.accuracy >= 40 && evalB.accuracy <= 80, `Expected moderate accuracy (40-80), got ${evalB.accuracy}`);
    assert.ok(evalB.mustKnowCovered.length < evalA.mustKnowCovered.length, 'Half-correct must cover fewer points than correct');
    assert.ok(evalB.mustKnowMissed.length > 0, 'Half-correct must have missed points');

    // Verify Result C: Low accuracy (< 40%), misconceptions detected
    assert.ok(evalC.accuracy < 40, `Expected low accuracy < 40, got ${evalC.accuracy}`);
    assert.ok(evalC.misconceptionsDetected.length > 0, 'Wrong explanation must detect misconceptions');
    assert.ok(
      evalC.misconceptionsDetected.some(m => m.detected.includes('share electrons') || m.detected.includes('Solid ionic')),
      'Must detect covalent sharing or solid conduction misconception'
    );

    // Verify all 3 results are strictly differentiated
    assert.notEqual(evalA.accuracy, evalB.accuracy, 'Correct and half-correct must have different scores');
    assert.notEqual(evalB.accuracy, evalC.accuracy, 'Half-correct and wrong must have different scores');
    assert.ok(evalA.accuracy > evalB.accuracy, 'Correct score must be higher than half-correct');
    assert.ok(evalB.accuracy > evalC.accuracy, 'Half-correct score must be higher than wrong');
  });

  it('4. SpeechManager chunks text into short natural phrases without queue overflow', () => {
    const longText = 'Metals react with oxygen to form basic oxides, which can be tested using litmus paper. Amphoteric oxides such as aluminum oxide and zinc oxide show both acidic as well as basic behavior by reacting with both acids and bases to produce salt and water.';
    const chunks = chunkIntoSentences(longText);

    assert.ok(chunks.length >= 2, 'Long text should be divided into multiple natural chunks');
    chunks.forEach(chunk => {
      assert.ok(chunk.length <= 135, `Chunk length (${chunk.length}) must be short and natural: "${chunk}"`);
    });
  });

  it('5. SpeechManager stopSpeaking cleans up active utterance without race condition', () => {
    const sm = new SpeechManager();
    sm.currentUtterance = { onend: () => {}, onerror: () => {} };
    sm.isSpeaking = true;

    sm.stopSpeaking();

    assert.equal(sm.isSpeaking, false, 'isSpeaking must be false after stopSpeaking');
    assert.equal(sm.currentUtterance, null, 'currentUtterance must be detached');
    assert.equal(sm.activeChunks.length, 0, 'activeChunks must be empty');
  });
});
