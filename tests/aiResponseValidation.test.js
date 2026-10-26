import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { 
  normalizeEvaluationResponse, 
  getFriendlySpeechErrorMessage 
} from '../src/services/aiVoiceService.js';

describe('AI Response Validation & Normalization Suite', () => {
  const dummyConcept = {
    id: 'test-concept',
    title: 'Photosynthesis',
    mustKnowPoints: [
      'Conversion of light energy into chemical energy',
      'Chlorophyll absorbs sunlight',
      'Water and carbon dioxide are raw materials',
      'Oxygen is released as byproduct'
    ]
  };

  it('safely normalizes an empty or null raw response with robust defaults', () => {
    const normalized = normalizeEvaluationResponse({}, dummyConcept);

    assert.equal(typeof normalized.accuracy, 'number');
    assert.equal(typeof normalized.clarity, 'number');
    assert.equal(typeof normalized.confidence, 'number');
    assert.equal(typeof normalized.understandingScore, 'number');

    assert.ok(normalized.accuracy >= 0 && normalized.accuracy <= 100);
    assert.ok(normalized.praise.length > 0);
    assert.ok(Array.isArray(normalized.strengths));
    assert.ok(Array.isArray(normalized.mustKnowCovered));
    assert.ok(Array.isArray(normalized.mustKnowMissed));
    assert.ok(normalized.actionableGapFix.length > 0);
  });

  it('clamps extreme, negative, or overflowing scores strictly within [0, 100]', () => {
    const rawOverflow = {
      accuracy: 250,
      clarity: -50,
      confidence: 120,
      understandingScore: 999
    };

    const normalized = normalizeEvaluationResponse(rawOverflow, dummyConcept);

    assert.equal(normalized.accuracy, 100);
    assert.equal(normalized.clarity, 0);
    assert.equal(normalized.confidence, 100);
    assert.equal(normalized.understandingScore, 100);
  });

  it('preserves valid custom evaluation fields from AI server', () => {
    const customAiResponse = {
      accuracyScore: 88,
      clarityScore: 92,
      confidenceScore: 85,
      understandingScore: 90,
      praise: 'Shabash! Excellent explanation of the light-dependent reaction.',
      gentleTip: 'Also remember to state the chemical equation clearly in board exams.',
      strengths: ['Clear terminology', 'Highlighted chlorophyll role'],
      mistakes: ['Did not mention splitting of water molecules'],
      mustKnowCovered: ['Chlorophyll absorbs sunlight'],
      mustKnowMissed: ['Conversion of light energy into chemical energy'],
      actionableGapFix: 'Remember 6CO2 + 6H2O -> C6H12O6 + 6O2',
      socraticFollowUp: 'What would happen if a plant is kept in green light only?'
    };

    const normalized = normalizeEvaluationResponse(customAiResponse, dummyConcept);

    assert.equal(normalized.accuracyScore, 88);
    assert.equal(normalized.clarityScore, 92);
    assert.equal(normalized.understandingScore, 90);
    assert.equal(normalized.praise, customAiResponse.praise);
    assert.deepEqual(normalized.strengths, customAiResponse.strengths);
    assert.deepEqual(normalized.mistakes, customAiResponse.mistakes);
    assert.equal(normalized.socraticFollowUp, customAiResponse.socraticFollowUp);
  });

  it('provides friendly, actionable error messages for speech recognition exceptions', () => {
    const deniedMsg = getFriendlySpeechErrorMessage('not-allowed');
    assert.ok(deniedMsg.includes('Microphone permission is required'));
    assert.ok(deniedMsg.includes('type your thoughts below'));

    const micMissingMsg = getFriendlySpeechErrorMessage('audio-capture');
    assert.ok(micMissingMsg.includes('No microphone was detected'));

    const networkMsg = getFriendlySpeechErrorMessage('network');
    assert.ok(networkMsg.includes('Network connection issue'));

    const unknownMsg = getFriendlySpeechErrorMessage('random-unknown-event');
    assert.ok(unknownMsg.includes('temporary hiccup'));
  });
});
