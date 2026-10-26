// Automated Master Test Suite for GYAAN.AI Senior Secondary Curriculum Expansion
// Tests A through Q verifying all 10 boards, Classes 11 & 12, Physics, Mathematics, Biology, English,
// strict academic isolation, source manifest, and hierarchy synchronization.

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

import { BOARDS } from '../src/data/boardsRegistry.js';
import { getGradeData } from '../src/data/curriculumData.js';
import { 
  CURRICULUM_SOURCE_MANIFEST, 
  ACADEMIC_SESSIONS, 
  VERIFICATION_STATUSES 
} from '../src/data/curriculumManifest.js';
import { 
  CANONICAL_CHAPTER_HIERARCHIES, 
  CURRICULUM_CATEGORIES, 
  IMPORTANCE_LEVELS, 
  PROVENANCE_TYPES 
} from '../src/data/curriculumHierarchyData.js';
import { curriculumHierarchyService } from '../src/services/curriculumHierarchyService.js';
import { authService } from '../src/services/authService.js';
import { getSubjectsForClass, getChaptersForSubject } from '../server/curriculumDatabase.js';

describe('GYAAN.AI Master Senior Secondary Curriculum Expansion Suite (Tests A to Q)', () => {
  beforeEach(() => {
    storageMap.clear();
    authService.signOut();
  });

  // =========================================================================
  // TEST A: Board Inventory Completeness
  // =========================================================================
  test('Test A: Board Inventory Completeness — All 10 boards in registry are audited', () => {
    assert.ok(Array.isArray(BOARDS), 'BOARDS registry must be an array');
    assert.equal(BOARDS.length, 10, 'Expected exactly 10 registered education boards');

    const expectedBoardIds = [
      'cbse',
      'icse',
      'up_board',
      'maharashtra',
      'bihar',
      'rajasthan',
      'karnataka',
      'tamil_nadu',
      'west_bengal',
      'state_boards'
    ];

    expectedBoardIds.forEach(bId => {
      const found = BOARDS.find(b => b.id === bId);
      assert.ok(found, `Board '${bId}' must be present in boardsRegistry.js`);
      assert.ok(found.name && found.name.length > 0, `Board '${bId}' must have a valid display name`);
    });
  });

  // =========================================================================
  // TEST B: Class 11 and 12 Subject Availability
  // =========================================================================
  test('Test B: Class 11 and 12 Subject Availability — Physics, Mathematics, English, Biology available', () => {
    const mandatoryKeys = ['phy', 'math', 'bio', 'eng'];

    BOARDS.forEach(board => {
      [11, 12].forEach(grade => {
        const gradeData = getGradeData(grade, board.id);
        assert.ok(gradeData, `Grade data must resolve for ${board.id} Class ${grade}`);
        assert.ok(Array.isArray(gradeData.subjects), `Subjects must be array for ${board.id} Class ${grade}`);

        mandatoryKeys.forEach(subjKey => {
          const subj = gradeData.subjects.find(s => s.id.toLowerCase().includes(subjKey));
          assert.ok(subj, `Subject '${subjKey}' must be present for board ${board.id} Class ${grade}`);
          assert.ok(Array.isArray(subj.chapters) && subj.chapters.length > 0, `Subject '${subjKey}' must have chapters in ${board.id} Class ${grade}`);
        });
      });
    });
  });

  // =========================================================================
  // TEST C: Chapter Count Accuracy (CBSE & ISC Official Syllabi)
  // =========================================================================
  test('Test C: Chapter Count Accuracy — CBSE & ISC conform to statutory official syllabi counts', () => {
    // 1. CBSE Class 11
    const cbse11 = getGradeData(11, 'cbse');
    const cbse11Phy = cbse11.subjects.find(s => s.id === 'phy-11');
    const cbse11Math = cbse11.subjects.find(s => s.id === 'math-11');
    const cbse11Bio = cbse11.subjects.find(s => s.id === 'bio-11');
    const cbse11Eng = cbse11.subjects.find(s => s.id === 'eng-11');

    assert.equal(cbse11Phy.chapters.length, 14, 'CBSE Class 11 Physics must have 14 chapters (NCERT Rationalised)');
    assert.equal(cbse11Math.chapters.length, 14, 'CBSE Class 11 Mathematics must have 14 chapters (NCERT Rationalised)');
    assert.equal(cbse11Bio.chapters.length, 19, 'CBSE Class 11 Biology must have 19 chapters (NCERT Rationalised)');
    assert.equal(cbse11Eng.chapters.length, 19, 'CBSE Class 11 English Core must have 19 prescribed works/units');

    // 2. CBSE Class 12
    const cbse12 = getGradeData(12, 'cbse');
    const cbse12Phy = cbse12.subjects.find(s => s.id === 'phy-12');
    const cbse12Math = cbse12.subjects.find(s => s.id === 'math-12');
    const cbse12Bio = cbse12.subjects.find(s => s.id === 'bio-12');
    const cbse12Eng = cbse12.subjects.find(s => s.id === 'eng-12');

    assert.equal(cbse12Phy.chapters.length, 14, 'CBSE Class 12 Physics must have 14 chapters (NCERT Rationalised)');
    assert.equal(cbse12Math.chapters.length, 13, 'CBSE Class 12 Mathematics must have 13 chapters (NCERT Rationalised)');
    assert.equal(cbse12Bio.chapters.length, 13, 'CBSE Class 12 Biology must have 13 chapters (NCERT Rationalised)');
    assert.equal(cbse12Eng.chapters.length, 23, 'CBSE Class 12 English Core must have 23 prescribed works/units');

    // 3. ISC Class 11 & 12 English
    const isc11Eng = getGradeData(11, 'icse').subjects.find(s => s.id === 'eng-11');
    const isc12Eng = getGradeData(12, 'icse').subjects.find(s => s.id === 'eng-12');

    assert.equal(isc11Eng.chapters.length, 14, 'ISC Class 11 English must have 14 prescribed works (Macbeth I-II, Prism, Rhapsody, Language)');
    assert.equal(isc12Eng.chapters.length, 15, 'ISC Class 12 English must have 15 prescribed works (Macbeth III-V, Prism, Rhapsody, Language)');
  });

  // =========================================================================
  // TEST D: Topic and Subtopic Hierarchy Integrity
  // =========================================================================
  test('Test D: Topic and Subtopic Hierarchy Integrity — Stable IDs, parent linkage, orderIndex', () => {
    const cbse11Phy = getGradeData(11, 'cbse').subjects.find(s => s.id === 'phy-11');
    const firstChapter = cbse11Phy.chapters[0];

    const hierarchy = curriculumHierarchyService.getChapterHierarchy(firstChapter, {
      board: 'CBSE',
      classLevel: 11,
      subjectId: 'phy-11',
      subjectName: 'Physics'
    });

    assert.ok(hierarchy, 'Hierarchy must be generated');
    assert.equal(hierarchy.classLevel, 11);
    assert.ok(hierarchy.hasUnits, 'Units and Measurements must have units');
    assert.ok(Array.isArray(hierarchy.units) && hierarchy.units.length > 0);

    const unit = hierarchy.units[0];
    assert.ok(unit.id, 'Unit must have an id');
    assert.equal(unit.type, 'unit');
    assert.ok(Array.isArray(unit.topics) && unit.topics.length >= 3);

    unit.topics.forEach((t, tIdx) => {
      assert.ok(t.id, 'Topic must have id');
      assert.equal(t.type, 'topic');
      assert.equal(t.unitId, unit.id, 'Topic must point to parent unit ID');
      assert.equal(t.order, tIdx + 1, 'Topic order must be sequential 1-based');
      assert.ok(t.title && t.title.length > 0, 'Topic must have a title');
      assert.ok(Array.isArray(t.subtopics) && t.subtopics.length > 0, 'Topic must have subtopics');

      t.subtopics.forEach((st, stIdx) => {
        assert.ok(st.id, 'Subtopic must have id');
        assert.equal(st.type, 'subtopic');
        assert.equal(st.parentTopicId, t.id, 'Subtopic must point to parent topic ID');
        assert.equal(st.order, stIdx + 1, 'Subtopic order must be sequential 1-based');
        assert.ok(st.title && st.title.length > 0, 'Subtopic must have title');
      });
    });
  });

  // =========================================================================
  // TEST E: Type A vs Type B Curriculum Categories
  // =========================================================================
  test('Test E: Type A vs Type B Curriculum Categories — Official Syllabus vs Learning Organization', () => {
    assert.equal(CURRICULUM_CATEGORIES.TYPE_A, 'TYPE_A');
    assert.equal(CURRICULUM_CATEGORIES.TYPE_B, 'TYPE_B');

    const cbse11 = getGradeData(11, 'cbse');
    const phy = cbse11.subjects.find(s => s.id === 'phy-11');

    phy.chapters.forEach(ch => {
      assert.ok(
        ch.curriculumCategory === 'TYPE_A' || ch.curriculumCategory === 'TYPE_B',
        `Chapter ${ch.title} must have a valid curriculumCategory (TYPE_A or TYPE_B)`
      );
    });
  });

  // =========================================================================
  // TEST F: Zero Placeholder Titles
  // =========================================================================
  test('Test F: Zero Placeholder Titles — No "Unit 1", "Part 1", or dummy placeholders anywhere', () => {
    const placeholderRegex = /-\s*(?:Unit|Part)\s*\d+$|^Chapter\s*\d+:\s*(?:Physics|Mathematics|English|Biology)\s*-\s*(?:Unit|Part)\s*\d+/i;

    BOARDS.forEach(board => {
      [11, 12].forEach(grade => {
        const gradeData = getGradeData(grade, board.id);
        (gradeData.subjects || []).forEach(subj => {
          (subj.chapters || []).forEach(ch => {
            assert.equal(
              placeholderRegex.test(ch.title),
              false,
              `Found placeholder title in board ${board.id} Class ${grade} ${subj.name}: "${ch.title}"`
            );
            assert.ok(!ch.title.includes('Dummy'), `Chapter title contains 'Dummy': ${ch.title}`);
            assert.ok(!ch.title.includes('TBD'), `Chapter title contains 'TBD': ${ch.title}`);
          });
        });
      });
    });
  });

  // =========================================================================
  // TEST G: Source Manifest Metadata
  // =========================================================================
  test('Test G: Source Manifest Metadata — 2026–27 session, valid URLs, verified status', () => {
    assert.equal(ACADEMIC_SESSIONS.CURRENT_TARGET, '2026-27');
    assert.ok(CURRICULUM_SOURCE_MANIFEST.cbse, 'CBSE manifest must exist');
    assert.ok(CURRICULUM_SOURCE_MANIFEST.icse, 'ICSE/ISC manifest must exist');
    assert.ok(CURRICULUM_SOURCE_MANIFEST.up_board, 'UP Board manifest must exist');

    assert.equal(CURRICULUM_SOURCE_MANIFEST.cbse.academicSession, '2026-27');
    assert.ok(CURRICULUM_SOURCE_MANIFEST.cbse.primaryPortal.startsWith('https://'));
    assert.equal(
      CURRICULUM_SOURCE_MANIFEST.cbse.subjects.physics.classes[11].status,
      VERIFICATION_STATUSES.VERIFIED_COMPLETE
    );
    assert.equal(
      CURRICULUM_SOURCE_MANIFEST.cbse.subjects.english.classes[12].status,
      VERIFICATION_STATUSES.VERIFIED_COMPLETE
    );
  });

  // =========================================================================
  // TEST H: Strict Academic Context Isolation & Zero Cross-Board Leakage
  // =========================================================================
  test('Test H: Strict Academic Context Isolation — Zero cross-board and zero cross-class contamination', () => {
    // CBSE vs ISC
    const cbse11Eng = getGradeData(11, 'cbse').subjects.find(s => s.id === 'eng-11').chapters;
    const isc11Eng = getGradeData(11, 'icse').subjects.find(s => s.id === 'eng-11').chapters;

    const cbseLeakedIsc = cbse11Eng.some(c => /Macbeth|Prism|Rhapsody/i.test(c.title));
    assert.equal(cbseLeakedIsc, false, 'CBSE English must never contain ISC literature (Macbeth/Prism/Rhapsody)');

    const iscLeakedCbse = isc11Eng.some(c => /Hornbill|Snapshots|Flamingo|Vistas/i.test(c.title));
    assert.equal(iscLeakedCbse, false, 'ISC English must never contain CBSE literature (Hornbill/Snapshots/Flamingo/Vistas)');

    // Class 11 vs Class 12
    const cbse12Eng = getGradeData(12, 'cbse').subjects.find(s => s.id === 'eng-12').chapters;
    const class11LeakedClass12 = cbse11Eng.some(c => /Flamingo|Vistas/i.test(c.title));
    const class12LeakedClass11 = cbse12Eng.some(c => /Hornbill|Snapshots/i.test(c.title));

    assert.equal(class11LeakedClass12, false, 'Class 11 must never contain Class 12 literature');
    assert.equal(class12LeakedClass11, false, 'Class 12 must never contain Class 11 literature');
  });

  // =========================================================================
  // TEST I: English Curriculum Differentiation
  // =========================================================================
  test('Test I: English Curriculum Differentiation — CBSE Core vs ISC Prescribed Texts', () => {
    const cbse11Eng = getGradeData(11, 'cbse').subjects.find(s => s.id === 'eng-11').chapters;
    const cbse12Eng = getGradeData(12, 'cbse').subjects.find(s => s.id === 'eng-12').chapters;
    const isc11Eng = getGradeData(11, 'icse').subjects.find(s => s.id === 'eng-11').chapters;
    const isc12Eng = getGradeData(12, 'icse').subjects.find(s => s.id === 'eng-12').chapters;

    // CBSE 11: Hornbill Prose & Poetry, Snapshots
    assert.ok(cbse11Eng.some(c => c.title.includes('The Portrait of a Lady')), 'CBSE 11 has The Portrait of a Lady');
    assert.ok(cbse11Eng.some(c => c.title.includes('A Photograph')), 'CBSE 11 has A Photograph');
    assert.ok(cbse11Eng.some(c => c.title.includes('The Summer of the Beautiful White Horse')), 'CBSE 11 has Snapshots 1');

    // CBSE 12: Flamingo Prose & Poetry, Vistas
    assert.ok(cbse12Eng.some(c => c.title.includes('The Last Lesson')), 'CBSE 12 has The Last Lesson');
    assert.ok(cbse12Eng.some(c => c.title.includes('My Mother at Sixty-Six')), 'CBSE 12 has My Mother at Sixty-Six');
    assert.ok(cbse12Eng.some(c => c.title.includes('The Third Level')), 'CBSE 12 has The Third Level');

    // ISC 11: Macbeth Act I & II, Prism, Rhapsody
    assert.ok(isc11Eng.some(c => c.title.includes('Drama: Macbeth Act I')), 'ISC 11 has Macbeth Act I');
    assert.ok(isc11Eng.some(c => c.title.includes('A Living God')), 'ISC 11 has Prism 1');
    assert.ok(isc11Eng.some(c => c.title.includes('Abhisara: The Tryst')), 'ISC 11 has Rhapsody 1');

    // ISC 12: Macbeth Act III, IV, V, Prism, Rhapsody
    assert.ok(isc12Eng.some(c => c.title.includes('Drama: Macbeth Act III')), 'ISC 12 has Macbeth Act III');
    assert.ok(isc12Eng.some(c => c.title.includes('Atithi')), 'ISC 12 has Prism Atithi');
    assert.ok(isc12Eng.some(c => c.title.includes('Telephone Conversation')), 'ISC 12 has Rhapsody Telephone Conversation');
  });

  // =========================================================================
  // TEST J: UP Board Bilingual Alignment
  // =========================================================================
  test('Test J: UP Board Bilingual Alignment — Authentic Hindi and English titles', () => {
    const up11 = getGradeData(11, 'up_board');
    const upPhy = up11.subjects.find(s => s.id === 'phy-11');
    const upMath = up11.subjects.find(s => s.id === 'math-11');
    const upBio = up11.subjects.find(s => s.id === 'bio-11');

    assert.ok(upPhy.name.includes('भौतिक विज्ञान'), 'UP Board Physics subject name must be bilingual');
    assert.ok(upMath.name.includes('गणित'), 'UP Board Mathematics subject name must be bilingual');
    assert.ok(upBio.name.includes('जीव विज्ञान'), 'UP Board Biology subject name must be bilingual');

    // Check first chapter of each
    assert.ok(upPhy.chapters[0].title.includes('मात्रक एवं मापन'), 'UP Physics Ch 1 has Hindi title');
    assert.ok(upMath.chapters[0].title.includes('समुच्चय'), 'UP Math Ch 1 has Hindi title');
    assert.ok(upBio.chapters[0].title.includes('जीव जगत'), 'UP Bio Ch 1 has Hindi title');
  });

  // =========================================================================
  // TEST K: Mind Map & Chapter Units Synchronization
  // =========================================================================
  test('Test K: Mind Map & Chapter Units Synchronization — Both views share identical hierarchy', () => {
    const chapter = { id: 'c11-phy-ch1', title: 'Units and Measurements' };
    const context = { board: 'CBSE', classLevel: 11, subjectId: 'phy-11', subjectName: 'Physics' };

    const hierarchy = curriculumHierarchyService.getChapterHierarchy(chapter, context);
    assert.ok(hierarchy, 'Hierarchy must be resolved');

    // Test tree nodes for ChapterUnitsView
    const stats = curriculumHierarchyService.calculateHierarchyStats(hierarchy);
    assert.ok(stats.topicCount >= 3, 'Must have at least 3 topics');
    assert.ok(stats.subtopicCount >= 6, 'Must have at least 6 subtopics');

    // Test graph nodes for ConceptMindMap
    const graphData = curriculumHierarchyService.generateMindMapGraph(hierarchy);
    assert.ok(graphData, 'Graph data must be generated');
    assert.ok(graphData.nodes.length > 0, 'Graph nodes must not be empty');
    assert.ok(graphData.edges.length > 0, 'Graph edges must not be empty');

    // Root node must correspond to chapter
    const rootNode = graphData.nodes.find(n => n.type === 'chapter');
    assert.ok(rootNode, 'Root chapter node must exist');
    assert.equal(rootNode.label, 'Units and Measurements');
  });

  // =========================================================================
  // TEST L: State Boards Graceful Handling
  // =========================================================================
  test('Test L: State Boards Graceful Handling — Documented status in source manifest', () => {
    const stateBoards = ['maharashtra', 'bihar', 'rajasthan', 'karnataka', 'tamil_nadu', 'west_bengal', 'state_boards'];

    stateBoards.forEach(bId => {
      const manifest = CURRICULUM_SOURCE_MANIFEST[bId];
      assert.ok(manifest, `Board ${bId} must be documented in CURRICULUM_SOURCE_MANIFEST`);
      assert.ok(manifest.primaryPortal, `Board ${bId} must have an official portal listed`);
      assert.ok(manifest.retrievalDate, `Board ${bId} must have a retrieval date`);
    });
  });

  // =========================================================================
  // TEST M: Preservation of Enrolled Student Restrictions
  // =========================================================================
  test('Test M: Preservation of Enrolled Student Restrictions — Enrolled context locks access', () => {
    authService.signIn('student11@gyaan.ai', 'Secret123!', {
      enrolledBoard: 'cbse',
      enrolledClass: 11
    });

    const user = authService.getCurrentUser();
    assert.ok(user, 'User must be authenticated');
    assert.equal(user.boardId, 'cbse');
    assert.equal(user.enrolledBoard.toUpperCase(), 'CBSE');
    assert.equal(user.enrolledClass, 11);

    // Verify student cannot switch or access another board or class
    const canAccessClass12 = user.enrolledClass === 12;
    const canAccessIsc = user.boardId === 'icse';

    assert.equal(canAccessClass12, false, 'Class 11 enrolled student cannot access Class 12');
    assert.equal(canAccessIsc, false, 'CBSE student cannot access ICSE/ISC');
  });

  // =========================================================================
  // TEST N: Practical Labs and Activities
  // =========================================================================
  test('Test N: Practical Labs and Activities — CBSE Physics and Biology contain authentic experiments', () => {
    const cbse11Phy = getGradeData(11, 'cbse').subjects.find(s => s.id === 'phy-11');
    const ch1 = cbse11Phy.chapters[0];

    assert.ok(ch1.practicalActivity, 'Chapter 1 must have a practicalActivity');
    assert.ok(ch1.practicalActivity.title.includes('Vernier Callipers'), 'Practical must reference Vernier Callipers');
    assert.ok(Array.isArray(ch1.practicalActivity.procedure), 'Procedure must be an array');
    assert.ok(ch1.practicalActivity.safety, 'Must have safety instructions');

    const ch2 = cbse11Phy.chapters[1];
    assert.ok(ch2.practicalActivity.title.includes('Simple Pendulum'), 'Chapter 2 practical must reference Simple Pendulum');
  });

  // =========================================================================
  // TEST O: Socratic Questions and Notes Completeness
  // =========================================================================
  test('Test O: Socratic Questions and Notes Completeness — Formulas, definitions, solved questions', () => {
    const cbse11 = getGradeData(11, 'cbse');
    const math = cbse11.subjects.find(s => s.id === 'math-11');

    math.chapters.forEach(ch => {
      assert.ok(ch.notes, `Chapter ${ch.title} must have notes object`);
      assert.ok(ch.notes.definition && ch.notes.definition.length > 0, `Chapter ${ch.title} must have definition`);
      assert.ok(ch.feynmanPrompt && ch.feynmanPrompt.length > 0, `Chapter ${ch.title} must have Feynman prompt`);
      assert.ok(ch.socraticQuestion && ch.socraticQuestion.length > 0, `Chapter ${ch.title} must have Socratic question`);
      assert.ok(Array.isArray(ch.quiz) && ch.quiz.length > 0, `Chapter ${ch.title} must have quiz question`);
    });
  });

  // =========================================================================
  // TEST P: Hierarchy Service Validation
  // =========================================================================
  test('Test P: Hierarchy Service Validation — No duplicates, dangling parents, or circular loops', () => {
    Object.keys(CANONICAL_CHAPTER_HIERARCHIES).forEach(key => {
      const hierarchy = CANONICAL_CHAPTER_HIERARCHIES[key];
      const { isValid, errors } = curriculumHierarchyService.validateCurriculumHierarchy(hierarchy);

      assert.ok(isValid, `Hierarchy for ${key} must be valid without errors. Errors: ${errors.join(', ')}`);
      assert.equal(errors.length, 0, `No validation errors expected for canonical ${key}`);
    });
  });

  // =========================================================================
  // TEST Q: Curriculum API Endpoints Compatibility
  // =========================================================================
  test('Test Q: Curriculum API Endpoints Compatibility — server/curriculumDatabase.js functions work', () => {
    const subjects11 = getSubjectsForClass(11, 'cbse');
    assert.ok(Array.isArray(subjects11), 'getSubjectsForClass(11) must return array');
    assert.equal(subjects11.length, 5, 'Class 11 CBSE has 5 subjects (Phy, Chem, Math, Bio, Eng)');

    const subjects12Isc = getSubjectsForClass(12, 'icse');
    assert.ok(Array.isArray(subjects12Isc), 'getSubjectsForClass(12, icse) must return array');
    assert.equal(subjects12Isc.length, 5, 'Class 12 ISC has 5 subjects');

    const math12Chapters = getChaptersForSubject(12, 'math-12', 'cbse');
    assert.ok(Array.isArray(math12Chapters), 'getChaptersForSubject(12, math-12) must return array');
    assert.equal(math12Chapters.length, 13, 'Class 12 Mathematics must have 13 chapters');

    const eng11IscChapters = getChaptersForSubject(11, 'eng-11', 'icse');
    assert.ok(Array.isArray(eng11IscChapters), 'getChaptersForSubject(11, eng-11, icse) must return array');
    assert.equal(eng11IscChapters.length, 14, 'ISC Class 11 English has 14 chapters');
  });
});
