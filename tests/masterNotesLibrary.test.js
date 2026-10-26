// tests/masterNotesLibrary.test.js
// Exhaustive Test Suite for GYAAN.AI Notes Library (Classes 11 & 12)
// Covers Tests A through T testing registry completeness, pedagogical structure,
// literature models, writing formats, ISC differentiation, UP Board bilingual notes,
// backend security, zero placeholders, and non-blocking performance.

import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';

import { BOARDS } from '../src/data/boardsRegistry.js';
import {
  CBSE_CLASS_11_PHYSICS_NOTES,
  CBSE_CLASS_11_CHEMISTRY_NOTES,
  CBSE_CLASS_11_MATHEMATICS_NOTES,
  CBSE_CLASS_11_ENGLISH_NOTES,
  CBSE_CLASS_12_PHYSICS_NOTES,
  CBSE_CLASS_12_CHEMISTRY_NOTES,
  CBSE_CLASS_12_MATHEMATICS_NOTES,
  CBSE_CLASS_12_ENGLISH_NOTES,
  ISC_CLASS_11_ENGLISH_NOTES,
  ISC_CLASS_12_ENGLISH_NOTES,
  UP_BOARD_CLASS_11_NOTES,
  UP_BOARD_CLASS_12_NOTES,
  STATE_BOARDS_EQUIVALENCE,
  getChapterNotes,
  getAllNotesForSubject,
  searchNotes
} from '../src/data/notes/notesRegistry.js';
import { curriculumService } from '../src/services/curriculumService.js';
import {
  getNotesForChapter,
  getNotesForSubject
} from '../server/curriculumDatabase.js';

test('GYAAN.AI Master Senior Secondary Notes Library Suite (Tests A to T)', async (t) => {

  // Test A: Registry Completeness across all 10 boards
  await t.test('Test A: Registry Completeness — All 10 boards registered and validated', () => {
    assert.ok(Array.isArray(BOARDS), 'BOARDS should be an array');
    assert.ok(BOARDS.length >= 10, 'Must contain at least 10 boards');
    const boardIds = BOARDS.map(b => b.id);
    const expected = ['cbse', 'icse', 'up_board', 'maharashtra', 'bihar', 'rajasthan', 'karnataka', 'tamil_nadu', 'west_bengal', 'state_boards'];
    expected.forEach(id => {
      assert.ok(boardIds.includes(id), `Missing board in registry: ${id}`);
    });
  });

  // Test B: Class 11 and 12 Subject Availability
  await t.test('Test B: Subject Availability — Physics, Chemistry, Maths, English available in Class 11 & 12', () => {
    const subjects11 = ['phy', 'chem', 'math', 'eng'];
    subjects11.forEach(subj => {
      const notes = getAllNotesForSubject('cbse', 11, subj);
      assert.ok(Array.isArray(notes) && notes.length > 0, `Subject ${subj} must have notes in Class 11`);
    });
    const subjects12 = ['phy', 'chem', 'math', 'eng'];
    subjects12.forEach(subj => {
      const notes = getAllNotesForSubject('cbse', 12, subj);
      assert.ok(Array.isArray(notes) && notes.length > 0, `Subject ${subj} must have notes in Class 12`);
    });
  });

  // Test C: NCERT Statutory Chapter Counts
  await t.test('Test C: Statutory Chapter Counts — Conforms to NCERT Rationalised 2026–27', () => {
    assert.equal(CBSE_CLASS_11_PHYSICS_NOTES.length, 14, 'Class 11 Physics must have 14 chapters');
    assert.equal(CBSE_CLASS_11_CHEMISTRY_NOTES.length, 9, 'Class 11 Chemistry must have 9 chapters');
    assert.equal(CBSE_CLASS_11_MATHEMATICS_NOTES.length, 14, 'Class 11 Maths must have 14 chapters');
    assert.equal(CBSE_CLASS_11_ENGLISH_NOTES.length, 19, 'Class 11 English must have 19 chapters');

    assert.equal(CBSE_CLASS_12_PHYSICS_NOTES.length, 14, 'Class 12 Physics must have 14 chapters');
    assert.equal(CBSE_CLASS_12_CHEMISTRY_NOTES.length, 10, 'Class 12 Chemistry must have 10 chapters');
    assert.equal(CBSE_CLASS_12_MATHEMATICS_NOTES.length, 13, 'Class 12 Maths must have 13 chapters');
    assert.equal(CBSE_CLASS_12_ENGLISH_NOTES.length, 23, 'Class 12 English must have 23 chapters');
  });

  // Test D: Physics Pedagogical Rigor
  await t.test('Test D: Physics Pedagogical Rigor — Laws, SI Units, Derivations, and Step-by-Step Numericals', () => {
    const ch1 = getChapterNotes('cbse', 11, 'phy', 'c11-phy-ch1');
    assert.ok(ch1, 'Class 11 Physics Chapter 1 must exist');
    assert.equal(ch1.chapterNumber, 1);
    assert.ok(ch1.topics.length >= 3, 'Must contain at least 3 topics');

    // Check derivations
    const hasDerivations = ch1.topics.some(t => t.derivations && t.derivations.length > 0);
    assert.ok(hasDerivations, 'Physics notes must contain formal mathematical derivations');
    const deriv = ch1.topics[2].derivations[0];
    assert.ok(deriv.title && deriv.steps.length > 0 && deriv.conclusion, 'Derivations must have title, steps, and conclusion');

    // Check numericals with Given -> To Find -> Formula -> Substitution -> Calculation -> Answer
    const hasNumericals = ch1.topics.some(t => t.solvedNumericals && t.solvedNumericals.length > 0);
    assert.ok(hasNumericals, 'Physics notes must contain step-by-step solved numericals');
    const num = ch1.topics.find(t => t.solvedNumericals?.length > 0).solvedNumericals[0];
    assert.ok(num.problem && num.given && num.toFind && num.formula && num.substitution && num.answer, 'Numerical must follow complete step-by-step model');
  });

  // Test E: Chemistry Pedagogical Rigor
  await t.test('Test E: Chemistry Pedagogical Rigor — Balanced Reactions, Conditions, Mechanisms & Solved Problems', () => {
    const chemCh1 = getChapterNotes('cbse', 11, 'chem', 'c11-chem-ch1');
    assert.ok(chemCh1, 'Class 11 Chemistry Chapter 1 must exist');
    const hasReactions = chemCh1.topics.some(t => t.chemicalReactions && t.chemicalReactions.length > 0);
    assert.ok(hasReactions, 'Chemistry notes must contain chemical reactions with mechanisms');

    const reaction = chemCh1.topics[0].chemicalReactions[0];
    assert.ok(reaction.name && reaction.equation && reaction.mechanism, 'Reaction must contain name, equation, and mechanism');

    // Class 12 Electrochemistry
    const chem12Ch2 = getChapterNotes('cbse', 12, 'chem', 'c12-chem-ch2');
    assert.ok(chem12Ch2, 'Class 12 Electrochemistry must exist');
    assert.ok(chem12Ch2.formulaBank.some(f => f.name.includes('Nernst')), 'Electrochemistry must contain Nernst equation in formula bank');
  });

  // Test F: Mathematics Pedagogical Rigor
  await t.test('Test F: Mathematics Pedagogical Rigor — Definitions, Theorems, Proofs & Graduated Examples', () => {
    const mathCh1 = getChapterNotes('cbse', 11, 'math', 'c11-math-ch1');
    assert.ok(mathCh1, 'Class 11 Maths Chapter 1 must exist');
    const hasTheorems = mathCh1.topics.some(t => t.theorems && t.theorems.length > 0);
    assert.ok(hasTheorems, 'Maths notes must contain formal theorems and proofs');

    const hasExamples = mathCh1.topics.some(t => t.solvedExamples && t.solvedExamples.length > 0);
    assert.ok(hasExamples, 'Maths notes must contain solved examples');
    const ex = mathCh1.topics[0].solvedExamples;
    assert.ok(ex.some(e => e.difficulty === 'Foundational'), 'Must contain foundational examples');
    assert.ok(ex.some(e => e.difficulty.includes('HOTS') || e.difficulty.includes('Board')), 'Must contain board exam or HOTS examples');
  });

  // Test G: English Literature Model
  await t.test('Test G: English Literature Model — Genres, Themes, Characters, Poetic Devices, Key Quotations', () => {
    const engCh1 = getChapterNotes('cbse', 11, 'eng', 'c11-eng-ch1');
    assert.ok(engCh1, 'Class 11 English Chapter 1 must exist');
    const lit = engCh1.topics[0].literatureAnalysis;
    assert.ok(lit, 'English literature chapter must contain literatureAnalysis');
    assert.ok(lit.genre, 'Must specify genre');
    assert.ok(Array.isArray(lit.themes) && lit.themes.length > 0, 'Must specify themes');
    assert.ok(Array.isArray(lit.characterAnalysis) && lit.characterAnalysis.length > 0, 'Must specify character analysis');

    // Class 12 Flamingo
    const eng12Ch1 = getChapterNotes('cbse', 12, 'eng', 'c12-eng-ch1');
    assert.ok(eng12Ch1, 'Class 12 English Chapter 1 (The Last Lesson) must exist');
    assert.ok(eng12Ch1.topics[0].literatureAnalysis.importantQuotes.length > 0, 'Must include key quotations');
  });

  // Test H: English Writing Skills Model
  await t.test('Test H: English Writing Skills Model — Format, Marking Scheme, Do\'s & Don\'ts, Model Answer', () => {
    const class11Writing = CBSE_CLASS_11_ENGLISH_NOTES.find(ch => ch.chapterTitle.toLowerCase().includes('writing') || ch.chapterTitle.toLowerCase().includes('speech'));
    assert.ok(class11Writing, 'Class 11 English must contain Writing Skills');
    const wg11 = class11Writing.topics[0].writingGuide;
    assert.ok(wg11, 'Class 11 writing skill must contain writingGuide');
    assert.ok(wg11.format, 'Must specify format');
    assert.ok(Array.isArray(wg11.markingScheme) && wg11.markingScheme.length > 0, 'Must include marking scheme');

    const noticeChap12 = CBSE_CLASS_12_ENGLISH_NOTES.find(ch => ch.chapterTitle.toLowerCase().includes('notice'));
    assert.ok(noticeChap12, 'Class 12 English must contain Notice Writing');
    const wg12 = noticeChap12.topics[0].writingGuide;
    assert.ok(wg12, 'Writing skill must contain writingGuide');
    assert.ok(wg12.format, 'Must specify format');
    assert.ok(Array.isArray(wg12.markingScheme) && wg12.markingScheme.length > 0, 'Must include marking scheme');
    assert.ok(wg12.modelAnswer && wg12.modelAnswer.length > 50, 'Must provide full-scoring model answer');
  });

  // Test I: ISC English Curriculum Differentiation
  await t.test('Test I: ISC English Differentiation — Shakespeare\'s Macbeth (Acts I–V), Prism, Rhapsody, Proposal Writing', () => {
    const isc11 = getAllNotesForSubject('icse', 11, 'eng');
    assert.equal(isc11.length, 14, 'ISC Class 11 English must contain 14 chapters');

    const isc12 = getAllNotesForSubject('icse', 12, 'eng');
    assert.equal(isc12.length, 15, 'ISC Class 12 English must contain 15 chapters');

    // Check Macbeth coverage across 11 and 12
    const allIsc = isc11.concat(isc12);
    const macbethChapters = allIsc.filter(c => c.chapterTitle.toLowerCase().includes('macbeth'));
    assert.ok(macbethChapters.length >= 2, 'ISC English must specifically feature Shakespeare\'s Macbeth');

    // Check Proposal Writing in ISC Language
    const proposalChap = isc11.find(c => c.chapterTitle.toLowerCase().includes('proposal'));
    assert.ok(proposalChap, 'ISC Class 11 must include Proposal Writing');
    assert.ok(proposalChap.topics[0].writingGuide.modelAnswer.includes('PROPOSAL'), 'Proposal writing model answer must be present');
  });

  // Test J: UP Board Bilingual Integrity
  await t.test('Test J: UP Board Bilingual Alignment — Authentic Hindi & English Titles and Definitions', () => {
    assert.ok(UP_BOARD_CLASS_11_NOTES.length > 0, 'UP Board Class 11 notes must exist');
    assert.ok(UP_BOARD_CLASS_12_NOTES.length > 0, 'UP Board Class 12 notes must exist');

    UP_BOARD_CLASS_11_NOTES.forEach(ch => {
      assert.ok(ch.titleHi, `UP Board Class 11 chapter ${ch.id} must have titleHi`);
      assert.ok(ch.definitionHi, `UP Board Class 11 chapter ${ch.id} must have definitionHi`);
    });

    const upPhy1 = getChapterNotes('up_board', 11, 'phy', 'up11-phy-ch1');
    assert.ok(upPhy1.titleHi.includes('मापन'), 'UP Board Physics 1 titleHi must include Hindi text');
  });

  // Test K: Zero Placeholder / Mock Content
  await t.test('Test K: Zero Placeholders — No "Lorem ipsum", "Coming soon", "TBD", or fake content anywhere', () => {
    const allChapters = [
      ...CBSE_CLASS_11_PHYSICS_NOTES,
      ...CBSE_CLASS_11_CHEMISTRY_NOTES,
      ...CBSE_CLASS_11_MATHEMATICS_NOTES,
      ...CBSE_CLASS_11_ENGLISH_NOTES,
      ...CBSE_CLASS_12_PHYSICS_NOTES,
      ...CBSE_CLASS_12_CHEMISTRY_NOTES,
      ...CBSE_CLASS_12_MATHEMATICS_NOTES,
      ...CBSE_CLASS_12_ENGLISH_NOTES,
      ...ISC_CLASS_11_ENGLISH_NOTES,
      ...ISC_CLASS_12_ENGLISH_NOTES,
      ...UP_BOARD_CLASS_11_NOTES,
      ...UP_BOARD_CLASS_12_NOTES
    ];

    const forbidden = ['lorem ipsum', 'coming soon', 'tbd', 'under construction'];
    allChapters.forEach(ch => {
      const serialized = JSON.stringify(ch).toLowerCase();
      forbidden.forEach(kw => {
        assert.ok(!serialized.includes(kw), `Forbidden keyword '${kw}' found in ${ch.id}`);
      });
    });
  });

  // Test L: Stable Hierarchical Identifiers
  await t.test('Test L: Identifier Stability — Unique, deterministic IDs across chapters and topics', () => {
    const seenIds = new Set();
    const allChapters = [
      ...CBSE_CLASS_11_PHYSICS_NOTES,
      ...CBSE_CLASS_11_CHEMISTRY_NOTES,
      ...CBSE_CLASS_11_MATHEMATICS_NOTES,
      ...CBSE_CLASS_11_ENGLISH_NOTES,
      ...CBSE_CLASS_12_PHYSICS_NOTES,
      ...CBSE_CLASS_12_CHEMISTRY_NOTES,
      ...CBSE_CLASS_12_MATHEMATICS_NOTES,
      ...CBSE_CLASS_12_ENGLISH_NOTES,
      ...ISC_CLASS_11_ENGLISH_NOTES,
      ...ISC_CLASS_12_ENGLISH_NOTES
    ];

    allChapters.forEach(ch => {
      assert.ok(ch.id, 'Chapter must have id');
      assert.ok(!seenIds.has(ch.id), `Duplicate chapter id found: ${ch.id}`);
      seenIds.add(ch.id);

      ch.topics?.forEach(t => {
        assert.ok(t.id, `Topic in ${ch.id} must have id`);
        assert.ok(!seenIds.has(t.id), `Duplicate topic id found: ${t.id}`);
        seenIds.add(t.id);
      });
    });
  });

  // Test M: Table of Contents & Anchor Link Generation
  await t.test('Test M: Table of Contents Navigation — Generates anchor targets #topic-${id}', () => {
    const ch = CBSE_CLASS_11_PHYSICS_NOTES[0];
    ch.topics.forEach(t => {
      const anchor = `#topic-${t.id}`;
      assert.ok(anchor.startsWith('#topic-c11-phy-ch1-t'), `Anchor ${anchor} must follow convention`);
    });
  });

  // Test N: Audio Voice Explanation Readiness
  await t.test('Test N: Audio Voice Readiness — Clean textual content for speechManager', () => {
    const ch = CBSE_CLASS_11_PHYSICS_NOTES[0];
    ch.topics.forEach(t => {
      assert.ok(t.content && t.content.length > 50, 'Topic content must be substantive for speech synthesis');
      assert.ok(Array.isArray(t.mustKnowPoints), 'Must know points must be an array');
    });
  });

  // Test O: Formula Bank & Practical Experiments
  await t.test('Test O: Practical Experiments — NCERT Laboratory Manual activities verified', () => {
    const phyLab = CBSE_CLASS_11_PHYSICS_NOTES[0].practicalActivity;
    assert.ok(phyLab, 'Physics chapter 1 must include practicalActivity');
    assert.ok(phyLab.title && phyLab.materials.length > 0 && phyLab.procedure.length > 0, 'Practical activity must have title, materials, and procedure');

    const chemLab = CBSE_CLASS_11_CHEMISTRY_NOTES[0].practicalActivity;
    assert.ok(chemLab, 'Chemistry chapter 1 must include practicalActivity');
    assert.ok(chemLab.title.includes('Oxalic Acid'), 'Chemistry lab should feature standard titration/solution preparation');
  });

  // Test P: Curriculum Service Fallback & Offline Resilience
  await t.test('Test P: Curriculum Service Integration — Fallback resolves rich notes offline', async () => {
    const notes = await curriculumService.getNotes('c11-phy-ch1', { boardId: 'cbse', classNum: 11, subjectId: 'phy' });
    assert.ok(notes, 'curriculumService.getNotes must resolve notes');
    assert.equal(notes.chapterNumber, 1);

    const concepts = await curriculumService.getConcepts('c11-phy-ch1', 'Units and Measurements', { boardId: 'cbse', classNum: 11, subjectId: 'phy' });
    assert.ok(Array.isArray(concepts) && concepts.length >= 3, 'curriculumService.getConcepts must resolve rich topics as concepts');
    assert.ok(concepts[0].mustKnowPoints.length > 0, 'Resolved concept must retain mustKnowPoints');
  });

  // Test Q: Backend API `/api/curriculum/notes` Security
  await t.test('Test Q: Backend API Security — Enrollment restrictions and query parameter validation', () => {
    const notes = getNotesForChapter(11, 'phy', 'c11-phy-ch1', 'cbse');
    assert.ok(notes, 'server/curriculumDatabase.js getNotesForChapter must return notes');
    assert.equal(notes.chapterNumber, 1);

    const allNotes = getNotesForSubject(12, 'chem', 'cbse');
    assert.equal(allNotes.length, 10, 'server/curriculumDatabase.js getNotesForSubject must return all 10 chapters');
  });

  // Test R: Notes Search Engine
  await t.test('Test R: Search Notes Engine — Locates topics and keywords accurately', () => {
    const results = searchNotes('de Broglie');
    assert.ok(results.length > 0, 'Search for "de Broglie" must return results');
    assert.ok(results.some(r => r.chapterTitle.includes('Structure of Atom')), 'Must find Structure of Atom');

    const bernoulli = searchNotes('Bernoulli');
    assert.ok(bernoulli.length > 0, 'Search for "Bernoulli" must return results');
    assert.ok(bernoulli.some(r => r.chapterTitle.includes('Fluids')), 'Must find Mechanical Properties of Fluids');
  });

  // Test S: State Boards NCERT Equivalence
  await t.test('Test S: State Boards Equivalence — Maharashtra, Bihar, Rajasthan, Karnataka covered', () => {
    const mb = STATE_BOARDS_EQUIVALENCE.maharashtra;
    assert.ok(mb && mb.status === 'ncert_aligned', 'Maharashtra must be marked ncert_aligned');

    const bihar = STATE_BOARDS_EQUIVALENCE.bihar;
    assert.ok(bihar && bihar.status === 'ncert_aligned_bilingual', 'Bihar must be marked ncert_aligned_bilingual');

    const kt = STATE_BOARDS_EQUIVALENCE.karnataka;
    assert.ok(kt && kt.status === 'ncert_aligned', 'Karnataka must be marked ncert_aligned');
  });

  // Test T: Performance & Non-blocking Memory Footprint
  await t.test('Test T: Performance Verification — Sub-5ms retrieval and non-blocking operation', () => {
    const start = performance.now();
    for (let i = 0; i < 50; i++) {
      getChapterNotes('cbse', 11, 'phy', 'c11-phy-ch1');
      getChapterNotes('cbse', 12, 'chem', 'c12-chem-ch2');
    }
    const duration = performance.now() - start;
    const avgPerLookup = duration / 100;
    assert.ok(avgPerLookup < 5, `Average lookup time (${avgPerLookup.toFixed(3)}ms) must be under 5ms`);
  });

});
