import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateLocally } from '../src/services/aiVoiceService.js';
import { calculateMastery } from '../src/services/progressService.js';

describe('Scoring & Socratic Diagnostic Engine Suite', () => {
  const testConcept = {
    id: 'ohm-law',
    title: "Ohm's Law",
    mustKnowPoints: [
      'Current is directly proportional to potential difference',
      'Temperature and physical conditions must remain constant',
      'V = IR where R is resistance in Ohms'
    ],
    commonMisconceptions: [
      {
        misconception: 'Current is consumed or used up by the resistor in the circuit',
        correction: 'Current is conserved in a closed loop; it is energy that is dissipated, not the electrons.'
      }
    ],
    socraticQuestion: 'What would happen to the current if resistance is doubled at constant voltage?'
  };

  it('correctly scores high coverage with bounded results [0, 100]', () => {
    const answer = "Ohm's law states that electric current is directly proportional to potential difference across a conductor, provided temperature remains constant. The formula is V = IR.";
    const result = evaluateLocally(answer, testConcept, 10, 1);

    assert.ok(result.accuracy >= 70 && result.accuracy <= 100);
    assert.ok(result.clarity >= 60 && result.clarity <= 100);
    assert.ok(result.confidence >= 50 && result.confidence <= 100);
    assert.ok(result.understandingScore >= 60 && result.understandingScore <= 100);

    // Key points covered
    assert.ok(result.mustKnowCovered.length > 0);
    assert.equal(result.misconceptionsDetected.length, 0);
    assert.ok(result.praise.includes('Shabash') || result.praise.includes('Good'));
  });

  it('detects common misconceptions and provides actionable correction', () => {
    const answer = "Electric current flows through the circuit and is consumed or used up by the resistor. That is why current becomes zero.";
    const result = evaluateLocally(answer, testConcept, 10, 1);

    assert.ok(result.misconceptionsDetected.length > 0);
    assert.ok(result.misconceptionsDetected[0].detected.includes('consumed or used up'));
    assert.ok(result.actionableGapFix.includes('conserved') || result.actionableGapFix.includes('energy'));
  });

  it('handles sparse or low-effort answers gracefully without NaN or errors', () => {
    const answer = "It is electricity.";
    const result = evaluateLocally(answer, testConcept, 10, 1);

    assert.ok(!isNaN(result.accuracy));
    assert.ok(!isNaN(result.understandingScore));
    assert.ok(result.accuracy >= 35); // base minimum floor
    assert.ok(result.mustKnowMissed.length > 0);
    assert.ok(result.socraticFollowUp.length > 0);
  });

  it('calculateMastery correctly balances understanding, explanation, and quiz scores', () => {
    // Without quiz: 45% understanding + 55% explanation
    const noQuiz = calculateMastery({ understanding: 80, explanation: 90, quiz: 0 });
    // (80 * 0.45) + (90 * 0.55) = 36 + 49.5 = 85.5 -> 86
    assert.equal(noQuiz, 86);

    // With quiz: 35% understanding + 45% explanation + 20% quiz
    const withQuiz = calculateMastery({ understanding: 80, explanation: 90, quiz: 100 });
    // (80 * 0.35) + (90 * 0.45) + (100 * 0.20) = 28 + 40.5 + 20 = 88.5 -> 89
    assert.equal(withQuiz, 89);

    // Edge clamping: never exceeds 100 or drops below 0
    assert.equal(calculateMastery({ understanding: 150, explanation: 120, quiz: 100 }), 100);
    assert.equal(calculateMastery({ understanding: -50, explanation: -10, quiz: 0 }), 0);
  });
});
