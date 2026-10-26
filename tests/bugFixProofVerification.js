// GYAAN.AI Teach-Back & Voice Mode Bug Fix Verification Suite
// Proves all 10 verification points specified by the user

import assert from 'node:assert/strict';
import { 
  evaluateStudentExplanation, 
  cleanSpokenTranscript,
  evaluateLocally,
  SpeechManager
} from '../src/services/aiVoiceService.js';
import { 
  getNotesForChapter,
  getConceptsForChapter 
} from '../server/curriculumDatabase.js';

console.log('====================================================');
console.log('   GYAAN.AI VOICE & TEACH-BACK VERIFICATION PROOF   ');
console.log('====================================================\n');

async function runVerifications() {
  const targetConcept = {
    id: 'c10-sci-ch3-t1',
    title: 'Reactivity Series & Chemical Properties of Metals',
    chapterId: 'ch-3-science',
    chapterTitle: 'Metals and Non-Metals',
    subject: 'science',
    mustKnowPoints: [
      'Metals react with oxygen to form basic oxides',
      'Reactivity Series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au',
      'Metals above hydrogen in the series displace H2 gas from dilute acids'
    ],
    commonMisconceptions: [
      {
        misconception: 'Copper displaces hydrogen from dilute hydrochloric acid',
        correction: 'Copper is less reactive than hydrogen and does not displace H2 gas from dilute acids.'
      }
    ]
  };

  // TEST 1: "Electricity is the flow of charge" (6 words)
  console.log('▶ [VERIFY 1] "Electricity is the flow of charge" (6 words)');
  const res1 = evaluateLocally('Electricity is the flow of charge', {
    id: 'ncert-c10-s-ch12-c1',
    title: 'Electric Current & Electric Circuit',
    mustKnowPoints: [
      'Electric current is expressed by the amount of charge flowing through a particular area in unit time',
      'SI unit of electric charge is coulomb and electric current is ampere (A = C/s)',
      'Direction of electric current is taken as opposite to the direction of flow of electrons'
    ]
  }, 10, 1);
  assert.ok(res1.accuracy > 0, 'Must produce real accuracy score');
  assert.ok(res1.whatYouGotRight?.length > 0, 'Must have whatYouGotRight');
  assert.ok(res1.otherWaysToUnderstand?.realLifeAnalogy, 'Must have real life analogy');
  assert.ok(res1.otherWaysToUnderstand?.workedExample, 'Must have worked example');
  assert.ok(res1.otherWaysToUnderstand?.formulaOrDiagram, 'Must have formula or diagram');
  assert.ok(res1.otherWaysToUnderstand?.hindiHinglishExplanation, 'Must have Hindi/Hinglish explanation');
  assert.ok(res1.otherWaysToUnderstand?.memoryTrick, 'Must have memory trick');
  console.log(`   ✔ Accepted & Answered! Score: ${res1.accuracy}%, Analogy: ${res1.otherWaysToUnderstand.realLifeAnalogy.slice(0, 60)}...`);

  // TEST 2: 1-word explanation ("Electrons")
  console.log('▶ [VERIFY 2] 1-word explanation ("Electrons")');
  const res2 = evaluateLocally('Electrons', {
    id: 'ncert-c10-s-ch12-c1',
    title: 'Electric Current & Electric Circuit',
    mustKnowPoints: ['Electric current is the flow of electric charge (electrons)']
  }, 10, 1);
  assert.ok(res2.isEvaluated, '1-word valid input must be evaluated');
  assert.ok(res2.accuracy > 0, 'Must have score');
  assert.ok(res2.socraticFollowUp, 'Must have follow-up question');
  console.log(`   ✔ Evaluated! Accuracy: ${res2.accuracy}%, Follow-up: "${res2.socraticFollowUp.slice(0, 50)}..."`);

  // TEST 3: Long thorough explanation
  console.log('▶ [VERIFY 3] Long thorough explanation');
  const longAns = 'Metals react actively with oxygen to form basic metallic oxides like magnesium oxide. In the reactivity series, K, Na, and Ca are at the very top, while Cu, Ag, and Au are at the bottom. Metals above hydrogen readily displace H2 gas from dilute acids, but copper cannot.';
  const res3 = evaluateLocally(longAns, targetConcept, 10, 1);
  assert.ok(res3.accuracy >= 75, `Expected high accuracy >= 75, got ${res3.accuracy}`);
  assert.ok(res3.whatYouGotRight?.length >= 2, 'Should have multiple strengths');
  console.log(`   ✔ Mastered! Accuracy: ${res3.accuracy}%, Covered: ${res3.mustKnowCovered.length} must-know points`);

  // TEST 4: Empty input
  console.log('▶ [VERIFY 4] Empty input rejected without crash');
  const res4 = await evaluateStudentExplanation({
    studentAnswer: '   ',
    concept: targetConcept,
    grade: 10
  });
  assert.equal(res4.validationError, true);
  assert.equal(res4.accuracy, 0);
  console.log(`   ✔ Correctly rejected with message: "${res4.error}"`);

  // TEST 5: Gibberish typed input ("VRGRGRRTRRTRY")
  console.log('▶ [VERIFY 5] Gibberish typed text ("VRGRGRRTRRTRY")');
  const res5 = await evaluateStudentExplanation({
    studentAnswer: 'VRGRGRRTRRTRY',
    concept: targetConcept,
    grade: 10,
    inputSource: 'text'
  });
  assert.equal(res5.needsGuidance, true, 'Must trigger guidance');
  assert.equal(res5.unscored, true, 'Must not be scored');
  assert.equal(res5.accuracy, 0, 'Must be 0 score');
  assert.equal(res5.xpAwarded, 0, 'Must be 0 XP');
  assert.equal(res5.message, "I couldn't understand this. Try writing a full sentence about the topic.");
  assert.ok(res5.conceptExplanation, 'Must provide concept explanation');
  assert.ok(res5.sampleSentence, 'Must provide sample sentence');
  assert.ok(res5.guidingQuestions?.length > 0, 'Must provide guiding questions');
  assert.ok(res5.exampleAnswer, 'Must provide example answer');
  console.log(`   ✔ Unscored, 0 XP! Message: "${res5.message}"`);
  console.log(`   ✔ Concept explanation provided: "${res5.conceptExplanation.slice(0, 60)}..."`);
  console.log(`   ✔ Sample sentence: "${res5.sampleSentence.slice(0, 60)}..."`);

  // TEST 6: Unclear voice input (confidence < 0.65)
  console.log('▶ [VERIFY 6] Unclear voice input (confidence = 0.45)');
  const res6 = await evaluateStudentExplanation({
    studentAnswer: 'Metals lose electrons',
    concept: targetConcept,
    confidence: 0.45,
    grade: 10,
    inputSource: 'voice'
  });
  assert.equal(res6.needsGuidance, true);
  assert.equal(res6.unscored, true);
  assert.equal(res6.accuracy, 0);
  assert.equal(res6.xpAwarded, 0);
  assert.equal(res6.message, "I couldn't hear a clear explanation. Try speaking closer to the mic.");
  console.log(`   ✔ Unscored, 0 XP! Message: "${res6.message}"`);

  // TEST 7: Speech mishearing cleanup
  console.log('▶ [VERIFY 7] Mishearing corrections');
  const clean1 = await cleanSpokenTranscript({
    rawTranscript: 'Electricity dies available charge',
    vocabularyHints: ['Electricity', 'electric charge', 'current']
  });
  assert.ok(clean1.hasCorrection, 'Should detect correction');
  assert.ok(clean1.corrected.includes('flow of'), `Expected flow of in '${clean1.corrected}'`);
  console.log(`   ✔ "Electricity dies available charge" -> "${clean1.corrected}"`);

  const clean2 = await cleanSpokenTranscript({
    rawTranscript: 'Atlantic City is flow of charge',
    vocabularyHints: ['Electricity', 'circuit']
  });
  assert.ok(clean2.hasCorrection, 'Should detect Atlantic City mishearing');
  assert.ok(clean2.corrected.toLowerCase().includes('electricity'), `Expected electricity in '${clean2.corrected}'`);
  console.log(`   ✔ "Atlantic City is flow of charge" -> "${clean2.corrected}"`);

  // TEST 8: Server failure (503 simulated)
  console.log('▶ [VERIFY 8] Server failure handling (503)');
  const res8 = await evaluateStudentExplanation({
    studentAnswer: 'Metals react with oxygen',
    concept: targetConcept,
    grade: 10,
    simulateFailure: true
  });
  assert.equal(res8.isServiceUnavailable, true);
  assert.equal(res8.canRetry, true);
  assert.equal(res8.accuracy, 0);
  assert.equal(res8.xpAwarded, 0);
  assert.ok(res8.error.includes('Evaluation is unavailable right now'), `Expected honest error, got '${res8.error}'`);
  console.log(`   ✔ Honest error returned: "${res8.error}", Retry enabled: ${res8.canRetry}, 0 fake XP`);

  // TEST 9: Curriculum loading for chapter ch-3-science
  console.log('▶ [VERIFY 9] Curriculum database resolution for ch-3-science');
  const notesCh3 = getNotesForChapter(10, 'science', 'ch-3-science', 'cbse');
  assert.ok(notesCh3, 'Notes for ch-3-science must be found');
  assert.equal(notesCh3.chapterNumber, 3);
  assert.ok(notesCh3.topics?.length > 0, 'Must have multiple topics');
  const conceptsCh3 = getConceptsForChapter('ch-3-science', 'Metals and Non-Metals');
  assert.ok(conceptsCh3?.length > 0, 'Must have concepts for chapter');
  console.log(`   ✔ Found Chapter 3 Notes! Title: "${notesCh3.chapterTitle}", Topics: ${notesCh3.topics.length}, Concepts: ${conceptsCh3.length}`);

  // TEST 10: SpeechManager chunking
  console.log('▶ [VERIFY 10] SpeechManager chunking stability');
  const sm = new SpeechManager();
  const testText = 'Electric current is the rate of flow of electric charges. Potential difference across two points is the work done per unit charge. Ohm\'s law states that current is proportional to potential difference under constant temperature.';
  sm.speak(testText);
  const chunkCount = sm.activeChunks.length;
  assert.ok(chunkCount >= 2, 'Long text should chunk into <= 130 character segments');
  for (const chunk of sm.activeChunks) {
    assert.ok(chunk.length <= 130, `Chunk length ${chunk.length} should be <= 130`);
  }
  sm.stopSpeaking();
  assert.equal(sm.isSpeaking, false, 'Must stop cleanly');
  console.log(`   ✔ SpeechManager chunked text into ${chunkCount} phrases <= 130 chars with clean stop`);

  console.log('\n====================================================');
  console.log('   ALL 10 VERIFICATION CHECKS PASSED WITH PROOF!    ');
  console.log('====================================================\n');
}

runVerifications().catch(err => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
