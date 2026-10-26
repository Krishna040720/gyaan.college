import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ConceptGraphEngine } from '../src/services/conceptGraphEngine.js';

describe('ConceptGraphEngine DAG & Diagnostics Suite', () => {
  const sampleConcepts = [
    {
      id: 'electric-charge',
      title: 'Electric Charge & Conservation',
      chapterTitle: 'Electricity',
      prerequisites: [],
      mustKnowPoints: ['Charge is quantized (Q=ne)', 'Conservation of charge']
    },
    {
      id: 'potential-diff',
      title: 'Electric Potential & Potential Difference',
      chapterTitle: 'Electricity',
      prerequisites: ['electric-charge'],
      mustKnowPoints: ['V = W / Q', 'Unit is Volt']
    },
    {
      id: 'ohm-law',
      title: "Ohm's Law & Resistance",
      chapterTitle: 'Electricity',
      prerequisites: ['potential-diff'],
      mustKnowPoints: ['V = IR at constant temperature', 'Unit of resistance is Ohm']
    }
  ];

  it('correctly initializes adjacency and reverse adjacency DAG structures', () => {
    const engine = new ConceptGraphEngine(sampleConcepts);
    const prereqs = engine.getPrerequisites('ohm-law');
    assert.equal(prereqs.length, 1);
    assert.equal(prereqs[0].id, 'potential-diff');

    const dependents = engine.getDependentConcepts('electric-charge');
    assert.equal(dependents.length, 1);
    assert.equal(dependents[0].id, 'potential-diff');
  });

  it('computes complete ancestral prerequisite lineage in topological order', () => {
    const engine = new ConceptGraphEngine(sampleConcepts);
    const lineage = engine.getPrerequisiteLineage('ohm-law');
    assert.equal(lineage.length, 2);
    // Lineage contains electric-charge and potential-diff
    const ids = lineage.map(c => c.id);
    assert.ok(ids.includes('electric-charge'));
    assert.ok(ids.includes('potential-diff'));
  });

  it('detects prerequisite health status: optimal vs blocked vs at_risk', () => {
    const engine = new ConceptGraphEngine(sampleConcepts);

    // Concept with no prerequisites is always optimal
    const baseHealth = engine.checkPrerequisiteHealth('electric-charge', {});
    assert.equal(baseHealth.ready, true);
    assert.equal(baseHealth.status, 'optimal');
    assert.equal(baseHealth.healthScore, 100);

    // Concept with unmastered prerequisite (<60%) is blocked if mastery is 0
    const blockedHealth = engine.checkPrerequisiteHealth('ohm-law', {
      topics: { 'potential-diff': { mastery: 0, status: 'not_started' } }
    });
    assert.equal(blockedHealth.ready, false);
    assert.equal(blockedHealth.status, 'blocked');
    assert.equal(blockedHealth.missingPrerequisites.length, 1);

    // If prerequisite has partial score e.g. 45%, status is at_risk
    const atRiskHealth = engine.checkPrerequisiteHealth('ohm-law', {
      topics: { 'potential-diff': { mastery: 45, status: 'in_progress' } }
    });
    assert.equal(atRiskHealth.ready, false);
    assert.equal(atRiskHealth.status, 'at_risk');

    // If prerequisite is mastered (>=60%), status is optimal
    const masteredHealth = engine.checkPrerequisiteHealth('ohm-law', {
      topics: { 'potential-diff': { mastery: 85, status: 'mastered' } }
    });
    assert.equal(masteredHealth.ready, true);
    assert.equal(masteredHealth.status, 'optimal');
  });

  it('diagnoses root-cause foundational gaps when student struggles', () => {
    const engine = new ConceptGraphEngine(sampleConcepts);

    const diagnosis = engine.diagnoseRootCause({
      conceptId: 'ohm-law',
      score: 50,
      attempts: 1,
      studentProgress: {
        concepts: { 'potential-diff': { mastery: 30 } }
      }
    });

    assert.ok(diagnosis);
    assert.equal(diagnosis.isPrerequisiteGap, true);
    assert.equal(diagnosis.prerequisiteId, 'potential-diff');
    assert.ok(diagnosis.diagnosticMessage.includes('foundational gaps'));
  });

  it('calculates SM-2 inspired spaced repetition revision schedules correctly', () => {
    const engine = new ConceptGraphEngine(sampleConcepts);

    // High mastery (score >= 85), first attempt -> 3 days
    const schedule1 = engine.calculateSpacedRevision({ score: 90, previousInterval: 1, attempts: 1 });
    assert.equal(schedule1.nextIntervalDays, 3);

    // High mastery, subsequent attempt -> 7 days
    const schedule2 = engine.calculateSpacedRevision({ score: 90, previousInterval: 3, attempts: 2 });
    assert.equal(schedule2.nextIntervalDays, 7);

    // Medium mastery (score 65-84) -> 2 days
    const schedule3 = engine.calculateSpacedRevision({ score: 72, previousInterval: 1, attempts: 1 });
    assert.equal(schedule3.nextIntervalDays, 2);

    // Low score (<65) -> resets to 1 day
    const schedule4 = engine.calculateSpacedRevision({ score: 45, previousInterval: 7, attempts: 2 });
    assert.equal(schedule4.nextIntervalDays, 1);
  });

  it('checks if revision is due based on date timestamps', () => {
    const engine = new ConceptGraphEngine(sampleConcepts);
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    assert.equal(engine.isRevisionDue(null, pastDate), true);
    assert.equal(engine.isRevisionDue(null, futureDate), false);
    assert.equal(engine.isRevisionDue(null, null), false);
  });
});
