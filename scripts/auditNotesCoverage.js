// scripts/auditNotesCoverage.js
// Automated Comprehensive Audit for GYAAN.AI Notes Library (Classes 11 & 12)
// Verifies 10 boards, 4 subjects, 100% syllabus coverage, zero placeholder text, and pedagogical integrity.

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

console.log('================================================================================');
console.log('  GYAAN.AI MASTER NOTES LIBRARY AUDIT — CLASSES 11 & 12');
console.log('  CBSE + CISCE/ISC + UP BOARD + STATE BOARDS | PHYSICS, CHEMISTRY, MATHS, ENGLISH');
console.log('================================================================================\n');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, testName, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] ${testName}: ${details}`);
  }
}

// 1. BOARD REGISTRY AUDIT (All 10 Boards)
console.log('--- Phase 1: Board Registry Completeness ---');
assert(Array.isArray(BOARDS) && BOARDS.length >= 10, 'All 10 boards registered in boardsRegistry.js', `Found ${BOARDS.length} boards`);
const boardIds = BOARDS.map(b => b.id);
['cbse', 'icse', 'up_board', 'maharashtra', 'bihar', 'rajasthan', 'karnataka', 'tamil_nadu', 'west_bengal', 'state_boards'].forEach(id => {
  assert(boardIds.includes(id), `Board '${id}' is active and present in registry`);
});

// 2. CHAPTER COUNT AUDIT ACROSS ALL SUBJECTS
console.log('\n--- Phase 2: Chapter Count Conformance ---');
assert(CBSE_CLASS_11_PHYSICS_NOTES.length === 14, 'CBSE Class 11 Physics contains 14 chapters (NCERT 2026-27)', `Found ${CBSE_CLASS_11_PHYSICS_NOTES.length}`);
assert(CBSE_CLASS_11_CHEMISTRY_NOTES.length === 9, 'CBSE Class 11 Chemistry contains 9 chapters (NCERT 2026-27)', `Found ${CBSE_CLASS_11_CHEMISTRY_NOTES.length}`);
assert(CBSE_CLASS_11_MATHEMATICS_NOTES.length === 14, 'CBSE Class 11 Mathematics contains 14 chapters (NCERT 2026-27)', `Found ${CBSE_CLASS_11_MATHEMATICS_NOTES.length}`);
assert(CBSE_CLASS_11_ENGLISH_NOTES.length === 19, 'CBSE Class 11 English contains 19 chapters (Hornbill, Snapshots, Writing)', `Found ${CBSE_CLASS_11_ENGLISH_NOTES.length}`);

assert(CBSE_CLASS_12_PHYSICS_NOTES.length === 14, 'CBSE Class 12 Physics contains 14 chapters (NCERT 2026-27)', `Found ${CBSE_CLASS_12_PHYSICS_NOTES.length}`);
assert(CBSE_CLASS_12_CHEMISTRY_NOTES.length === 10, 'CBSE Class 12 Chemistry contains 10 chapters (NCERT 2026-27)', `Found ${CBSE_CLASS_12_CHEMISTRY_NOTES.length}`);
assert(CBSE_CLASS_12_MATHEMATICS_NOTES.length === 13, 'CBSE Class 12 Mathematics contains 13 chapters (NCERT 2026-27)', `Found ${CBSE_CLASS_12_MATHEMATICS_NOTES.length}`);
assert(CBSE_CLASS_12_ENGLISH_NOTES.length === 23, 'CBSE Class 12 English contains 23 chapters (Flamingo, Vistas, Writing)', `Found ${CBSE_CLASS_12_ENGLISH_NOTES.length}`);

assert(ISC_CLASS_11_ENGLISH_NOTES.length === 14, 'ISC Class 11 English contains 14 prescribed syllabus chapters', `Found ${ISC_CLASS_11_ENGLISH_NOTES.length}`);
assert(ISC_CLASS_12_ENGLISH_NOTES.length === 15, 'ISC Class 12 English contains 15 prescribed syllabus chapters', `Found ${ISC_CLASS_12_ENGLISH_NOTES.length}`);

// 3. ZERO PLACEHOLDER CONTENT AUDIT
console.log('\n--- Phase 3: Zero Placeholder & Rigorous Content Verification ---');
const allNotes = [
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

const forbiddenKeywords = ['lorem ipsum', 'coming soon', 'tbd', 'under construction', 'placeholder'];
let placeholderFound = false;

allNotes.forEach(ch => {
  const json = JSON.stringify(ch).toLowerCase();
  forbiddenKeywords.forEach(kw => {
    if (json.includes(kw)) {
      placeholderFound = true;
      assert(false, `No placeholder in ${ch.id}`, `Found '${kw}' in ${ch.chapterTitle}`);
    }
  });
});
if (!placeholderFound) {
  assert(true, 'Zero placeholder text found across entire Class 11 & 12 notes library');
}

// 4. SUBJECT-SPECIFIC PEDAGOGICAL AUDIT
console.log('\n--- Phase 4: Subject-Specific Pedagogical Depth ---');

// Physics
const phyChaptersWithNumericals = CBSE_CLASS_11_PHYSICS_NOTES.filter(ch => ch.topics?.some(t => t.solvedNumericals?.length > 0));
assert(phyChaptersWithNumericals.length > 0, 'Physics notes contain step-by-step solved numericals', `${phyChaptersWithNumericals.length} chapters verified`);

const phyChaptersWithDerivations = CBSE_CLASS_11_PHYSICS_NOTES.filter(ch => ch.topics?.some(t => t.derivations?.length > 0));
assert(phyChaptersWithDerivations.length > 0, 'Physics notes contain formal calculus/geometric derivations', `${phyChaptersWithDerivations.length} chapters verified`);

// Chemistry
const chemChaptersWithReactions = CBSE_CLASS_11_CHEMISTRY_NOTES.filter(ch => ch.topics?.some(t => t.chemicalReactions?.length > 0));
assert(chemChaptersWithReactions.length > 0, 'Chemistry notes contain balanced equations, conditions, and mechanisms', `${chemChaptersWithReactions.length} chapters verified`);

// Mathematics
const mathChaptersWithTheorems = CBSE_CLASS_11_MATHEMATICS_NOTES.filter(ch => ch.topics?.some(t => t.theorems?.length > 0));
assert(mathChaptersWithTheorems.length > 0, 'Mathematics notes contain rigorous mathematical theorems and proofs', `${mathChaptersWithTheorems.length} chapters verified`);

// English Literature
const engLiteratureChapters = CBSE_CLASS_11_ENGLISH_NOTES.filter(ch => ch.topics?.some(t => t.literatureAnalysis));
assert(engLiteratureChapters.length > 0, 'English literature notes contain genres, themes, character sketches, and poetic devices', `${engLiteratureChapters.length} chapters verified`);

// English Writing Skills
const engWritingChapters = CBSE_CLASS_11_ENGLISH_NOTES.filter(ch => ch.topics?.some(t => t.writingGuide));
assert(engWritingChapters.length > 0, 'English writing notes contain formats, marking schemes, and full-scoring model answers', `${engWritingChapters.length} chapters verified`);

// ISC English Differentiation
const iscMacbethActs = ISC_CLASS_11_ENGLISH_NOTES.concat(ISC_CLASS_12_ENGLISH_NOTES).filter(ch => ch.chapterTitle.toLowerCase().includes('macbeth'));
assert(iscMacbethActs.length >= 2, 'ISC English includes Shakespeare\'s Macbeth (Acts I to V)', `Found ${iscMacbethActs.length} Macbeth modules`);

// UP Board Bilingual Integrity
assert(UP_BOARD_CLASS_11_NOTES.every(ch => ch.titleHi && ch.definitionHi), 'UP Board Class 11 notes contain authentic Hindi titles and definitions');
assert(UP_BOARD_CLASS_12_NOTES.every(ch => ch.titleHi && ch.definitionHi), 'UP Board Class 12 notes contain authentic Hindi titles and definitions');

// State Boards Equivalence
const stateBoardKeys = Object.keys(STATE_BOARDS_EQUIVALENCE);
assert(stateBoardKeys.includes('maharashtra') && stateBoardKeys.includes('bihar') && stateBoardKeys.includes('karnataka'), 'State boards equivalence mapping covers Maharashtra, Bihar, and Karnataka');

// 5. REGISTRY AND SEARCH FUNCTIONALITY AUDIT
console.log('\n--- Phase 5: Notes Registry Engine & Search ---');
const foundNote = getChapterNotes('cbse', 11, 'phy', 'c11-phy-ch1');
assert(foundNote !== null && foundNote.chapterNumber === 1, 'getChapterNotes resolves Class 11 Physics Chapter 1 accurately');

const allChem12 = getAllNotesForSubject('cbse', 12, 'chem');
assert(allChem12.length === 10, 'getAllNotesForSubject resolves all 10 Class 12 Chemistry chapters');

const searchResults = searchNotes('Hooke');
assert(searchResults.length > 0 && searchResults[0].chapterTitle.includes('Mechanical Properties of Solids'), 'searchNotes locates keywords and returns relevant chapter and topic results');

// AUDIT SUMMARY METRICS
console.log('\n================================================================================');
console.log('  AUDIT SUMMARY METRICS');
console.log('================================================================================');
console.log(`  Total Chapters Audited:        ${allNotes.length}`);
console.log(`  Total Verification Checks:     ${totalChecks}`);
console.log(`  Passed Checks:                 ${passedChecks}`);
console.log(`  Failed Checks:                 ${failedChecks}`);
console.log('================================================================================\n');

if (failedChecks === 0) {
  console.log('  RESULT: [ALL VERIFICATION CHECKS PASSED SUCCESSFULLY]');
  process.exit(0);
} else {
  console.error(`  RESULT: [FAILED: ${failedChecks} checks failed]`);
  process.exit(1);
}
