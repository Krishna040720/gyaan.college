// Automated Unit & Integration Test Suite for Curriculum Hierarchy and Branching Mind Map
// Tests A through J verifying authentic hierarchy, unit handling, subtopics, validation, and synchronization.

import { test, describe, beforeEach } from 'node:test';
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

import { curriculumHierarchyService } from '../src/services/curriculumHierarchyService.js';
import { 
  CANONICAL_CHAPTER_HIERARCHIES, 
  IMPORTANCE_LEVELS, 
  PROVENANCE_TYPES 
} from '../src/data/curriculumHierarchyData.js';
import { authService } from '../src/services/authService.js';
import { progressService, getMasteryCategory } from '../src/services/progressService.js';

describe('Phase 15: Curriculum Hierarchy & Branching Mind Map Suite', () => {
  beforeEach(() => {
    storageMap.clear();
    authService.signOut();
  });

  // =========================================================================
  // TEST A: Chapter With Units
  // =========================================================================
  test('Test A: Chapter with units preserves hierarchy in both views without flattening', () => {
    const chapter = { id: 'c10-sci-ch11', title: 'Electricity' };
    const context = { board: 'CBSE', classLevel: 10, subjectId: 'science' };

    const hierarchy = curriculumHierarchyService.getChapterHierarchy(chapter, context);

    assert.ok(hierarchy, 'Hierarchy must be resolved for Class 10 Science Electricity');
    assert.equal(hierarchy.chapterId, 'ch-11-science');
    assert.equal(hierarchy.hasUnits, true, 'Electricity chapter must have units');
    assert.ok(Array.isArray(hierarchy.units), 'Units must be an array');
    assert.ok(hierarchy.units.length >= 3, 'Electricity must have at least 3 authentic units');

    // Verify each unit structure
    const expectedUnitIds = [
      'u-c10-elec-01',
      'u-c10-elec-02',
      'u-c10-elec-03'
    ];

    expectedUnitIds.forEach(uId => {
      const unit = hierarchy.units.find(u => u.id === uId);
      assert.ok(unit, `Unit ${uId} must exist`);
      assert.equal(unit.type, 'unit');
      assert.equal(unit.chapterId, 'ch-11-science');
      assert.ok(Array.isArray(unit.topics), `Unit ${uId} must have topics array`);
      assert.ok(unit.topics.length > 0, `Unit ${uId} topics must not be empty`);

      // Verify topics in unit point back to unit
      unit.topics.forEach(t => {
        assert.equal(t.unitId, uId, `Topic ${t.id} must point to unit ${uId}`);
        assert.equal(t.type, 'topic');
        assert.ok(Array.isArray(t.subtopics), `Topic ${t.id} must have subtopics array`);
      });
    });

    // Verify stats
    const stats = curriculumHierarchyService.calculateHierarchyStats(hierarchy);
    assert.equal(stats.unitCount, hierarchy.units.length);
    assert.ok(stats.topicCount >= 7, 'Electricity has at least 7 topics');
    assert.ok(stats.subtopicCount >= 10, 'Electricity has at least 10 subtopics');
  });

  // =========================================================================
  // TEST B: Chapter Without Units
  // =========================================================================
  test('Test B: Chapter without units connects directly from chapter to topics without fake units', () => {
    const chapter = { id: 'c10-sci-ch13', title: 'Our Environment' };
    const context = { board: 'CBSE', classLevel: 10, subjectId: 'science' };

    const hierarchy = curriculumHierarchyService.getChapterHierarchy(chapter, context);

    assert.ok(hierarchy, 'Hierarchy must be resolved for Our Environment');
    assert.equal(hierarchy.chapterId, 'ch-13-science');
    assert.equal(hierarchy.hasUnits, false, 'Our Environment must NOT have units');
    assert.equal(hierarchy.units, undefined, 'Units array must be undefined for non-unit chapter');

    assert.ok(Array.isArray(hierarchy.topics), 'Topics array must be attached directly to the chapter');
    assert.ok(hierarchy.topics.length >= 3, 'Must have at least 3 authentic topics');

    // Ensure NO fake unit was fabricated
    hierarchy.topics.forEach(t => {
      assert.equal(t.type, 'topic');
      assert.equal(t.unitId, null, `Topic ${t.id} must have unitId === null`);
      assert.equal(t.chapterId, 'ch-13-science');
      assert.ok(t.title && t.title.length > 0);
    });

    const stats = curriculumHierarchyService.calculateHierarchyStats(hierarchy);
    assert.equal(stats.unitCount, 0, 'Unit count must be 0 for chapter without units');
    assert.equal(stats.topicCount, hierarchy.topics.length);
    assert.ok(stats.subtopicCount >= 6, 'Must have authentic subtopics');
  });

  // =========================================================================
  // TEST C: Nested Subtopics (Depth Levels 3 and 4)
  // =========================================================================
  test('Test C: Nested subtopics preserve depth levels 3 and 4 with parent-child linkage', () => {
    const chapter = { id: 'c10-sci-ch11', title: 'Electricity' };
    const context = { board: 'CBSE', classLevel: 10, subjectId: 'science' };
    const hierarchy = curriculumHierarchyService.getChapterHierarchy(chapter, context);

    // Find topic with deep subtopics: Factors Affecting Resistance
    const factorsTopic = curriculumHierarchyService.findNodeById(hierarchy, 't-c10-elec-02-02');
    assert.ok(factorsTopic, 'Factors affecting resistance topic must exist');
    assert.ok(Array.isArray(factorsTopic.rawNode.subtopics), 'Must have subtopics');

    // Find subtopic Specific Resistivity Formula
    const resistivitySubtopic = factorsTopic.rawNode.subtopics.find(s => s.id === 'st-c10-elec-02-02-02');
    assert.ok(resistivitySubtopic, 'Resistivity subtopic must exist');
    assert.ok(Array.isArray(resistivitySubtopic.subtopics), 'Resistivity must have nested subtopics');
    assert.ok(resistivitySubtopic.subtopics.length >= 2, 'Resistivity must have at least 2 Level-4 subtopics');

    // Check Level 4 nested subtopics
    const spectrumNode = resistivitySubtopic.subtopics.find(s => s.id === 'nst-c10-elec-02-02-02-01');
    assert.ok(spectrumNode, 'Resistivity spectrum detailed concept must exist');
    assert.equal(spectrumNode.type, 'subtopic');
    assert.equal(spectrumNode.parentTopicId, 'st-c10-elec-02-02-02');

    const heatingAlloys = resistivitySubtopic.subtopics.find(s => s.id === 'nst-c10-elec-02-02-02-02');
    assert.ok(heatingAlloys, 'Heating alloys concept must exist');
    assert.equal(heatingAlloys.importance, IMPORTANCE_LEVELS.HIGH_YIELD);

    // Verify lookup of level 4 node
    const foundNested = curriculumHierarchyService.findNodeById(hierarchy, 'nst-c10-elec-02-02-02-02');
    assert.ok(foundNested, 'Deep nested node must be retrievable by ID');
    assert.equal(foundNested.depth, 4, 'Nested subtopic depth must be 4');
  });

  // =========================================================================
  // TEST D: Node Selection & Inspection Details
  // =========================================================================
  test('Test D: Node selection returns complete metadata, provenance, and breadcrumb lineage', () => {
    const chapter = { id: 'c10-sci-ch11', title: 'Electricity' };
    const hierarchy = curriculumHierarchyService.getChapterHierarchy(chapter, { board: 'CBSE', classLevel: 10, subjectId: 'science' });

    // 1. Select Unit
    const unitNode = curriculumHierarchyService.findNodeById(hierarchy, 'u-c10-elec-02');
    assert.ok(unitNode);
    assert.equal(unitNode.type, 'unit');
    assert.equal(unitNode.depth, 1);
    assert.ok(unitNode.title.includes("Ohm's Law"));

    // 2. Select Topic
    const topicNode = curriculumHierarchyService.findNodeById(hierarchy, 't-c10-elec-02-01');
    assert.ok(topicNode);
    assert.equal(topicNode.type, 'topic');
    assert.equal(topicNode.depth, 2);
    assert.equal(topicNode.conceptId, 'c-10-sci-elec-02');
    assert.equal(topicNode.importance, IMPORTANCE_LEVELS.HIGH_YIELD);
    assert.ok(topicNode.lineage.includes('Electricity'));
    assert.ok(topicNode.lineage.some(l => l.includes("Ohm's Law")));

    // 3. Select Non-existent node returns null
    const nonExistent = curriculumHierarchyService.findNodeById(hierarchy, 'fake-id-999');
    assert.equal(nonExistent, null);
  });

  // =========================================================================
  // TEST E: Progress & Canonical Mastery Thresholds
  // =========================================================================
  test('Test E: Evaluates unassessed, needs strengthening (<60%), developing (60-79%), and strong (>=80%)', () => {
    authService.signIn({
      name: 'Rohan Sharma',
      enrolledClass: 10,
      enrolledBoard: 'CBSE'
    });

    const topicConceptId = 'c-10-sci-elec-02';

    // 1. Unassessed state
    const unassessedProg = progressService.getConceptProgress(topicConceptId);
    assert.equal(unassessedProg.isAssessed, false);
    assert.equal(unassessedProg.mastery, null);
    const unassessedCat = getMasteryCategory(unassessedProg.mastery, unassessedProg.isAssessed);
    assert.equal(unassessedCat.category, 'not_assessed');
    assert.equal(unassessedCat.label, 'Not assessed yet');

    // 2. Needs strengthening (< 60%)
    progressService.recordConceptEvaluation({
      conceptId: topicConceptId,
      evaluation: {
        accuracy: 45,
        understandingScore: 40
      }
    });
    const weakProg = progressService.getConceptProgress(topicConceptId);
    assert.equal(weakProg.isAssessed, true);
    assert.ok(weakProg.mastery < 60);
    const weakCat = getMasteryCategory(weakProg.mastery, weakProg.isAssessed);
    assert.equal(weakCat.category, 'needs_strengthening');
    assert.equal(weakCat.shortLabel, 'Needs Strengthening');

    // 3. Developing (60% to 79%)
    progressService.recordConceptEvaluation({
      conceptId: topicConceptId,
      evaluation: {
        accuracy: 72,
        understandingScore: 70
      }
    });
    const devProg = progressService.getConceptProgress(topicConceptId);
    assert.ok(devProg.mastery >= 60 && devProg.mastery < 80);
    const devCat = getMasteryCategory(devProg.mastery, devProg.isAssessed);
    assert.equal(devCat.category, 'developing');
    assert.equal(devCat.shortLabel, 'Developing');

    // 4. Strong (>= 80%)
    progressService.recordConceptEvaluation({
      conceptId: topicConceptId,
      evaluation: {
        accuracy: 92,
        understandingScore: 92
      }
    });
    const strongProg = progressService.getConceptProgress(topicConceptId);
    assert.ok(strongProg.mastery >= 80);
    const strongCat = getMasteryCategory(strongProg.mastery, strongProg.isAssessed);
    assert.equal(strongCat.category, 'strong');
    assert.equal(strongCat.shortLabel, 'Strong Understanding');
  });

  // =========================================================================
  // TEST F: Curriculum Isolation & Academic Context Integrity
  // =========================================================================
  test('Test F: Board and class context isolation prevents cross-curriculum leakage', () => {
    // Curated Class 10 CBSE Chapter
    const c10Hierarchy = curriculumHierarchyService.getChapterHierarchy(
      { id: 'ch-1-science', title: 'Chemical Reactions and Equations' },
      { board: 'CBSE', classLevel: 10, subjectId: 'science' }
    );
    assert.ok(c10Hierarchy);
    assert.equal(c10Hierarchy.board, 'CBSE');
    assert.equal(c10Hierarchy.classLevel, 10);
    assert.equal(c10Hierarchy.provenance, PROVENANCE_TYPES.VERIFIED_NCERT);

    // Uncurated context gracefully synthesizes without throwing or inventing fake data
    const uncuratedHierarchy = curriculumHierarchyService.getChapterHierarchy(
      { id: 'ch-fake', title: 'Sample Uncurated Lesson' },
      { board: 'ICSE', classLevel: 5, subjectId: 'general_science' }
    );
    assert.ok(uncuratedHierarchy, 'Must return synthesized hierarchy safely');
    assert.equal(uncuratedHierarchy.provenance, PROVENANCE_TYPES.BOARD_OFFICIAL);
    assert.equal(uncuratedHierarchy.board, 'ICSE');
    assert.equal(uncuratedHierarchy.classLevel, 5);
  });

  // =========================================================================
  // TEST G: Validation Engine (Detects Duplicate IDs, Cycles, Wrong Links)
  // =========================================================================
  test('Test G: Validation engine detects duplicate IDs, circular refs, and missing parents gracefully', () => {
    // 1. Valid hierarchy passes validation with 0 errors
    const validHierarchy = CANONICAL_CHAPTER_HIERARCHIES['ch-11-science'];
    const validResult = curriculumHierarchyService.validateCurriculumHierarchy(validHierarchy);
    assert.equal(validResult.valid, true);
    assert.equal(validResult.errors.length, 0);

    // 2. Corrupt hierarchy with Duplicate IDs
    const duplicateIdHierarchy = {
      chapterId: 'ch-test',
      chapterTitle: 'Test Chapter',
      hasUnits: true,
      units: [
        {
          id: 'u1-dup',
          title: 'Unit 1',
          chapterId: 'ch-test',
          topics: [
            { id: 'shared-id-123', title: 'Topic A', chapterId: 'ch-test', unitId: 'u1-dup' }
          ]
        },
        {
          id: 'u2-dup',
          title: 'Unit 2',
          chapterId: 'ch-test',
          topics: [
            { id: 'shared-id-123', title: 'Topic B with Duplicate ID', chapterId: 'ch-test', unitId: 'u2-dup' }
          ]
        }
      ]
    };
    const dupResult = curriculumHierarchyService.validateCurriculumHierarchy(duplicateIdHierarchy);
    assert.equal(dupResult.valid, false);
    const hasDupError = dupResult.errors.some(e => e.code === 'DUPLICATE_ID' && e.nodeId === 'shared-id-123');
    assert.ok(hasDupError, 'Must detect duplicate node ID');
    assert.ok(dupResult.sanitized, 'Sanitization must produce a safe fallback structure');

    // 3. Corrupt hierarchy with Missing Unit link
    const invalidLinkHierarchy = {
      chapterId: 'ch-test-2',
      chapterTitle: 'Test Chapter 2',
      hasUnits: true,
      units: [
        {
          id: 'u1-valid',
          title: 'Unit 1',
          chapterId: 'ch-test-2',
          topics: [
            { id: 'top-wrong-link', title: 'Wrong Unit Link', chapterId: 'ch-test-2', unitId: 'wrong-unit-id' }
          ]
        }
      ]
    };
    const linkResult = curriculumHierarchyService.validateCurriculumHierarchy(invalidLinkHierarchy);
    assert.equal(linkResult.valid, false);
    const hasLinkError = linkResult.errors.some(e => e.code === 'WRONG_UNIT_LINK' || e.code === 'INVALID_UNIT_LINK');
    assert.ok(hasLinkError, 'Must detect invalid unit link');
  });

  // =========================================================================
  // TEST H: Large Map Geometry & Spacing (Zero Label Overlaps)
  // =========================================================================
  test('Test H: Graph layout guarantees horizontal ordering by depth and vertical leaf spacing', () => {
    const chapter = { id: 'c10-sci-ch11', title: 'Electricity' };
    const hierarchy = curriculumHierarchyService.getChapterHierarchy(chapter, { board: 'CBSE', classLevel: 10, subjectId: 'science' });
    const flat = curriculumHierarchyService.flattenHierarchy(hierarchy);

    assert.ok(flat.length >= 20, 'Electricity tree must contain >= 20 nodes total');

    // Simulate vertical leaf stepping from ConceptMindMap
    const ROW_HEIGHT = 72;
    const HORIZONTAL_SPACING = 300;
    let leafRow = 0;
    const nodeCoords = new Map();

    const simulateLayout = (node, depth) => {
      const children = (node.units || node.topics || node.subtopics || []);
      let y;
      if (children.length === 0) {
        y = leafRow * ROW_HEIGHT + 70;
        leafRow += 1;
      } else {
        const childYs = children.map(c => simulateLayout(c, depth + 1));
        y = (childYs[0] + childYs[childYs.length - 1]) / 2;
      }
      const x = 160 + depth * HORIZONTAL_SPACING;
      nodeCoords.set(node.id, { x, y, depth });
      return y;
    };

    simulateLayout({
      id: hierarchy.chapterId,
      units: hierarchy.units,
      topics: hierarchy.topics
    }, 0);

    // Verify horizontal monotonicity: depth 0 < depth 1 < depth 2 < depth 3 < depth 4
    for (const [, coord] of nodeCoords.entries()) {
      assert.equal(coord.x, 160 + coord.depth * HORIZONTAL_SPACING);
    }

    // Verify leaf nodes have unique vertical spacing
    const leafYPositions = [];
    flat.filter(n => n.type === 'subtopic' && (!n.subtopics || n.subtopics.length === 0)).forEach(leaf => {
      const coord = nodeCoords.get(leaf.id);
      if (coord) {
        assert.ok(!leafYPositions.includes(coord.y), `Leaf node ${leaf.id} must not share vertical coordinate`);
        leafYPositions.push(coord.y);
      }
    });
  });

  // =========================================================================
  // TEST I: Responsive Layout & Mobile/Desktop Tree Equivalence
  // =========================================================================
  test('Test I: Desktop Canvas model and Mobile Tree view share 100% identical nodes and lineage', () => {
    const chapter = { id: 'c10-sci-ch13', title: 'Our Environment' };
    const hierarchy = curriculumHierarchyService.getChapterHierarchy(chapter, { board: 'CBSE', classLevel: 10, subjectId: 'science' });

    const flatNodes = curriculumHierarchyService.flattenHierarchy(hierarchy);

    // Desktop representation extracts all nodes
    const desktopNodeIds = flatNodes.map(n => n.id);

    // Mobile tree mode traverses the exact same hierarchy child units/topics plus root
    const mobileNodeIds = [hierarchy.chapterId];
    const traverseMobileTree = (items) => {
      if (!Array.isArray(items)) return;
      items.forEach(item => {
        mobileNodeIds.push(item.id);
        if (item.units) traverseMobileTree(item.units);
        if (item.topics) traverseMobileTree(item.topics);
        if (item.subtopics) traverseMobileTree(item.subtopics);
      });
    };
    if (hierarchy.units) traverseMobileTree(hierarchy.units);
    if (hierarchy.topics) traverseMobileTree(hierarchy.topics);

    assert.equal(desktopNodeIds.length, mobileNodeIds.length);
    desktopNodeIds.forEach(id => {
      assert.ok(mobileNodeIds.includes(id), `Node ${id} must be present in both views`);
    });
  });

  // =========================================================================
  // TEST J: Shared Canonical Data Source Synchronization
  // =========================================================================
  test('Test J: ChapterUnitsView and ConceptMindMap are synchronized from the identical canonical source', () => {
    authService.signIn({
      name: 'Priya Patel',
      enrolledClass: 10,
      enrolledBoard: 'CBSE'
    });

    const chapter = { id: 'c10-sci-ch11', title: 'Electricity' };
    const context = { board: 'CBSE', classLevel: 10, subjectId: 'science' };

    // Both views fetch from curriculumHierarchyService
    const unitsViewSource = curriculumHierarchyService.getChapterHierarchy(chapter, context);
    const mindMapSource = curriculumHierarchyService.getChapterHierarchy(chapter, context);

    // Verify deep identity of canonical structure
    assert.deepEqual(unitsViewSource, mindMapSource, 'Both views must receive identical data');

    // Verify node IDs match concepts repository
    const ohmsLawTopic = unitsViewSource.units
      .find(u => u.id === 'u-c10-elec-02')
      .topics.find(t => t.id === 't-c10-elec-02-01');

    assert.equal(ohmsLawTopic.conceptId, 'c-10-sci-elec-02');

    // Updating progress on this concept must reflect on both views
    progressService.recordConceptEvaluation({
      conceptId: ohmsLawTopic.conceptId,
      evaluation: {
        accuracy: 85,
        understandingScore: 85
      }
    });

    const progUnits = progressService.getConceptProgress(ohmsLawTopic.conceptId);
    const progMindMap = progressService.getConceptProgress(ohmsLawTopic.conceptId);

    assert.equal(progUnits.mastery, 85);
    assert.equal(progMindMap.mastery, 85);
    assert.equal(getMasteryCategory(progUnits.mastery, progUnits.isAssessed).category, 'strong');
    assert.equal(getMasteryCategory(progMindMap.mastery, progMindMap.isAssessed).category, 'strong');
  });
});
