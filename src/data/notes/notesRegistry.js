// GYAAN AI Master Notes Registry
// Single authoritative access engine for Classes 1 to 12 Study Notes across all supported boards
// Provides getChapterNotes, getAllNotesForSubject, searchNotes, and export helpers

import { CBSE_CLASS_11_PHYSICS_NOTES } from './cbseClass11PhysicsNotes.js';
import { CBSE_CLASS_11_CHEMISTRY_NOTES } from './cbseClass11ChemistryNotes.js';
import { CBSE_CLASS_11_MATHEMATICS_NOTES } from './cbseClass11MathsNotes.js';
import { CBSE_CLASS_11_ENGLISH_NOTES } from './cbseClass11EnglishNotes.js';

import { CBSE_CLASS_12_PHYSICS_NOTES } from './cbseClass12PhysicsNotes.js';
import { CBSE_CLASS_12_CHEMISTRY_NOTES } from './cbseClass12ChemistryNotes.js';
import { CBSE_CLASS_12_MATHEMATICS_NOTES } from './cbseClass12MathsNotes.js';
import { CBSE_CLASS_12_ENGLISH_NOTES } from './cbseClass12EnglishNotes.js';

import { CBSE_CLASS_10_SCIENCE_NOTES, CBSE_CLASS_10_MATHS_NOTES } from './cbseClass10Notes.js';

import { ISC_CLASS_11_ENGLISH_NOTES, ISC_CLASS_12_ENGLISH_NOTES } from './iscSeniorSecondaryNotes.js';
import { UP_BOARD_CLASS_11_NOTES, UP_BOARD_CLASS_12_NOTES } from './upBoardBilingualNotes.js';
import { STATE_BOARDS_EQUIVALENCE } from './stateBoardsNotes.js';
import { getGradeData } from '../curriculumData.js';

export {
  CBSE_CLASS_11_PHYSICS_NOTES,
  CBSE_CLASS_11_CHEMISTRY_NOTES,
  CBSE_CLASS_11_MATHEMATICS_NOTES,
  CBSE_CLASS_11_ENGLISH_NOTES,
  CBSE_CLASS_12_PHYSICS_NOTES,
  CBSE_CLASS_12_CHEMISTRY_NOTES,
  CBSE_CLASS_12_MATHEMATICS_NOTES,
  CBSE_CLASS_12_ENGLISH_NOTES,
  CBSE_CLASS_10_SCIENCE_NOTES,
  CBSE_CLASS_10_MATHS_NOTES,
  ISC_CLASS_11_ENGLISH_NOTES,
  ISC_CLASS_12_ENGLISH_NOTES,
  UP_BOARD_CLASS_11_NOTES,
  UP_BOARD_CLASS_12_NOTES,
  STATE_BOARDS_EQUIVALENCE
};

/**
 * Normalizes subject key to canonical id
 */
export function normalizeSubject(subjectKey = '') {
  const s = String(subjectKey || '').toLowerCase().trim();
  if (s.includes('phy')) return 'phy';
  if (s.includes('chem')) return 'chem';
  if (s.includes('math')) return 'math';
  if (s.includes('eng')) return 'eng';
  if (s.includes('sci')) return 'science';
  if (s.includes('soc') || s.includes('sst')) return 'social science';
  if (s.includes('evs')) return 'evs';
  if (s.includes('hin')) return 'hindi';
  if (s.includes('bio')) return 'bio';
  return s;
}

/**
 * Synthesizes a structured notes object from raw curriculumData chapter
 */
function synthesizeNotesFromCurriculum(rawChapter, classLevel, boardId, subjectKey, subjectName) {
  if (!rawChapter) return null;
  const rawNotes = rawChapter.notes || {};
  const topics = [];

  const rawKeyPoints = Array.isArray(rawChapter.keyPoints) && rawChapter.keyPoints.length > 0
    ? rawChapter.keyPoints
    : ['Fundamental principles and concepts of this chapter.', 'Master the core board formulas and definitions.'];

  // If topicVideos are available, turn them into topics
  if (Array.isArray(rawChapter.topicVideos) && rawChapter.topicVideos.length > 0) {
    rawChapter.topicVideos.forEach((tv, idx) => {
      topics.push({
        id: `${rawChapter.id}-t${idx + 1}`,
        title: tv.title ? tv.title.replace(/^Part\s+\d+:\s*/i, '') : `Topic ${idx + 1}`,
        content: `Comprehensive study of ${tv.title} in ${rawChapter.title}. Focus on definitions, mechanisms, derivations, and board examination patterns.`,
        mustKnowPoints: rawKeyPoints.slice(idx * 2, (idx + 1) * 2).length > 0
          ? rawKeyPoints.slice(idx * 2, (idx + 1) * 2)
          : rawKeyPoints,
        formulas: rawNotes.formulas || [],
        solvedNumericals: (rawNotes.solvedQuestions || []).map(sq => ({
          q: sq.q || sq.question,
          sol: sq.sol || sq.solution
        })),
        commonTraps: ['Not reviewing standard definitions and step-by-step marking schemes.'],
        sections: [
          { type: 'definition', content: rawNotes.definition || rawChapter.summary || '' },
          ...rawKeyPoints.map(kp => ({ type: 'key_point', content: kp }))
        ]
      });
    });
  }

  // Fallback single topic if no topic videos
  if (topics.length === 0) {
    topics.push({
      id: `${rawChapter.id}-t1`,
      title: rawChapter.title ? rawChapter.title.replace(/^Chapter\s+\d+:\s*/i, '') : 'Core Concepts',
      content: rawNotes.definition || rawChapter.summary || 'Fundamental principles and syllabus core topics.',
      mustKnowPoints: rawKeyPoints,
      formulas: rawNotes.formulas || [],
      solvedNumericals: (rawNotes.solvedQuestions || []).map(sq => ({
        q: sq.q || sq.question,
        sol: sq.sol || sq.solution
      })),
      commonTraps: ['Not reviewing standard definitions and step-by-step marking schemes.'],
      sections: [
        { type: 'definition', content: rawNotes.definition || rawChapter.summary || '' },
        ...rawKeyPoints.map(kp => ({ type: 'key_point', content: kp }))
      ]
    });
  }

  const cleanTitle = (rawChapter.title || '').replace(/^Chapter\s+\d+:\s*/i, '') || rawChapter.title;

  return {
    id: rawChapter.id,
    chapterNumber: rawChapter.chapterNumber || 1,
    chapterTitle: cleanTitle,
    classLevel: Number(classLevel),
    boardId: String(boardId || 'cbse').toLowerCase(),
    subjectId: subjectKey,
    subjectName: subjectName || subjectKey,
    status: rawChapter.status || 'published',
    summary: rawChapter.summary || `Comprehensive study notes for Class ${classLevel} ${subjectName}, Chapter ${rawChapter.chapterNumber}: ${cleanTitle}.`,
    practicalActivity: rawChapter.practicalActivity || null,
    quickRevisionPoints: rawChapter.keyPoints || (topics[0]?.mustKnowPoints) || [],
    mustKnowPoints: rawChapter.keyPoints || (topics[0]?.mustKnowPoints) || [],
    topics
  };
}

/**
 * Retrieve notes for a specific chapter
 * @param {string} boardId - Board identifier ('cbse', 'icse', 'up_board', etc.)
 * @param {number|string} classLevel - 1 to 12
 * @param {string} subjectKey - e.g. 'science', 'math', 'phy', 'chem', 'eng'
 * @param {string|number} chapterIdOrNum - Chapter ID (e.g. 'ch-3-science', 'c11-phy-ch1') or number (3)
 */
export function getChapterNotes(boardId = 'cbse', classLevel = 11, subjectKey = 'phy', chapterIdOrNum) {
  const normBoard = String(boardId || 'cbse').toLowerCase();
  const numGrade = Number(classLevel);
  const normSubj = normalizeSubject(subjectKey);

  // 1. ISC English differentiation (CISCE Class 11 & 12)
  if (normBoard === 'icse' && normSubj === 'eng') {
    const list = numGrade === 11 ? ISC_CLASS_11_ENGLISH_NOTES : ISC_CLASS_12_ENGLISH_NOTES;
    const found = findChapterInList(list, chapterIdOrNum);
    if (found) return found;
  }

  // 2. UP Board Bilingual Notes
  if (normBoard === 'up_board') {
    const upList = numGrade === 11 ? UP_BOARD_CLASS_11_NOTES : UP_BOARD_CLASS_12_NOTES;
    const foundUp = findChapterInList(upList, chapterIdOrNum);
    if (foundUp) return foundUp;
  }

  // 3. Class 10 Curated Notes
  if (numGrade === 10) {
    if (normSubj === 'science') {
      const found = findChapterInList(CBSE_CLASS_10_SCIENCE_NOTES, chapterIdOrNum);
      if (found) return found;
    } else if (normSubj === 'math') {
      const found = findChapterInList(CBSE_CLASS_10_MATHS_NOTES, chapterIdOrNum);
      if (found) return found;
    }
  }

  // 4. Senior Secondary (Class 11 & 12) CBSE and Universal NCERT Equivalence
  let list = [];
  if (numGrade === 11) {
    if (normSubj === 'phy') list = CBSE_CLASS_11_PHYSICS_NOTES;
    else if (normSubj === 'chem') list = CBSE_CLASS_11_CHEMISTRY_NOTES;
    else if (normSubj === 'math') list = CBSE_CLASS_11_MATHEMATICS_NOTES;
    else if (normSubj === 'eng') list = CBSE_CLASS_11_ENGLISH_NOTES;
  } else if (numGrade === 12) {
    if (normSubj === 'phy') list = CBSE_CLASS_12_PHYSICS_NOTES;
    else if (normSubj === 'chem') list = CBSE_CLASS_12_CHEMISTRY_NOTES;
    else if (normSubj === 'math') list = CBSE_CLASS_12_MATHEMATICS_NOTES;
    else if (normSubj === 'eng') list = CBSE_CLASS_12_ENGLISH_NOTES;
  }

  if (list && list.length > 0) {
    const found = findChapterInList(list, chapterIdOrNum);
    if (found) return found;
  }

  // 5. Dynamic Fallback to curriculumData for ANY class (Classes 1-12)
  try {
    const gradeData = getGradeData(numGrade, normBoard);
    if (gradeData && Array.isArray(gradeData.subjects)) {
      const matchedSubject = gradeData.subjects.find(s => {
        const sid = (s.id || '').toLowerCase();
        const sname = (s.name || '').toLowerCase();
        return sid === normSubj || 
               sname === normSubj || 
               normalizeSubject(sid) === normSubj || 
               normalizeSubject(sname) === normSubj ||
               sid.includes(normSubj) || 
               sname.includes(normSubj);
      }) || gradeData.subjects[0];

      if (matchedSubject && Array.isArray(matchedSubject.chapters)) {
        const rawChapter = findChapterInRawList(matchedSubject.chapters, chapterIdOrNum);
        if (rawChapter) {
          return synthesizeNotesFromCurriculum(rawChapter, numGrade, normBoard, matchedSubject.id, matchedSubject.name);
        }
      }
    }
  } catch (err) {
    console.error(`[NotesRegistry] Error querying curriculumData for class ${numGrade}:`, err.message);
  }

  return null;
}

function findChapterInList(list = [], chapterIdOrNum) {
  if (!chapterIdOrNum) return list[0] || null;
  const targetStr = String(chapterIdOrNum).toLowerCase().trim();
  const targetNum = Number(chapterIdOrNum);

  // Exact matches
  const directMatch = list.find(c => {
    if (c.id && c.id.toLowerCase() === targetStr) return true;
    if (c.chapterNumber && Number(c.chapterNumber) === targetNum) return true;
    if (c.chapterTitle && c.chapterTitle.toLowerCase().includes(targetStr)) return true;
    if (Array.isArray(c.chapterAliases) && c.chapterAliases.some(a => a.toLowerCase() === targetStr)) return true;
    return false;
  });
  if (directMatch) return directMatch;

  // Extract chapter number from strings like 'c11-mat-ch1', 'ch-3-science', 'ch-3', 'ch_3'
  const matchDigits = targetStr.match(/ch(?:apter)?[-_]?(\d+)/i) || targetStr.match(/(\d+)$/);
  if (matchDigits) {
    const extractedNum = parseInt(matchDigits[1], 10);
    const numMatch = list.find(c => Number(c.chapterNumber) === extractedNum);
    if (numMatch) return numMatch;
  }

  return null;
}

function findChapterInRawList(chapters = [], chapterIdOrNum) {
  if (!chapterIdOrNum) return chapters[0] || null;
  const targetStr = String(chapterIdOrNum).toLowerCase().trim();
  const targetNum = Number(chapterIdOrNum);

  const directMatch = chapters.find(c => {
    if (c.id && c.id.toLowerCase() === targetStr) return true;
    if (c.chapterNumber && Number(c.chapterNumber) === targetNum) return true;
    if (c.title && c.title.toLowerCase().includes(targetStr)) return true;
    return false;
  });
  if (directMatch) return directMatch;

  const matchDigits = targetStr.match(/ch(?:apter)?[-_]?(\d+)/i) || targetStr.match(/(\d+)$/);
  if (matchDigits) {
    const extractedNum = parseInt(matchDigits[1], 10);
    const numMatch = chapters.find(c => Number(c.chapterNumber) === extractedNum);
    if (numMatch) return numMatch;
  }

  return null;
}

/**
 * Retrieve all notes for a subject
 */
export function getAllNotesForSubject(boardId = 'cbse', classLevel = 11, subjectKey = 'phy') {
  const normBoard = String(boardId || 'cbse').toLowerCase();
  const numGrade = Number(classLevel);
  const normSubj = normalizeSubject(subjectKey);

  if (normBoard === 'icse' && normSubj === 'eng') {
    return numGrade === 11 ? ISC_CLASS_11_ENGLISH_NOTES : ISC_CLASS_12_ENGLISH_NOTES;
  }

  if (numGrade === 10) {
    if (normSubj === 'science') return CBSE_CLASS_10_SCIENCE_NOTES;
    if (normSubj === 'math') return CBSE_CLASS_10_MATHS_NOTES;
  }

  if (numGrade === 11) {
    if (normSubj === 'phy') return CBSE_CLASS_11_PHYSICS_NOTES;
    if (normSubj === 'chem') return CBSE_CLASS_11_CHEMISTRY_NOTES;
    if (normSubj === 'math') return CBSE_CLASS_11_MATHEMATICS_NOTES;
    if (normSubj === 'eng') return CBSE_CLASS_11_ENGLISH_NOTES;
  } else if (numGrade === 12) {
    if (normSubj === 'phy') return CBSE_CLASS_12_PHYSICS_NOTES;
    if (normSubj === 'chem') return CBSE_CLASS_12_CHEMISTRY_NOTES;
    if (normSubj === 'math') return CBSE_CLASS_12_MATHEMATICS_NOTES;
    if (normSubj === 'eng') return CBSE_CLASS_12_ENGLISH_NOTES;
  }

  // Fallback to curriculumData chapters
  try {
    const gradeData = getGradeData(numGrade, normBoard);
    if (gradeData && Array.isArray(gradeData.subjects)) {
      const matchedSubject = gradeData.subjects.find(s => {
        const sid = (s.id || '').toLowerCase();
        const sname = (s.name || '').toLowerCase();
        return sid === normSubj || 
               sname === normSubj || 
               normalizeSubject(sid) === normSubj || 
               normalizeSubject(sname) === normSubj ||
               sid.includes(normSubj) || 
               sname.includes(normSubj);
      });
      if (matchedSubject && Array.isArray(matchedSubject.chapters)) {
        return matchedSubject.chapters.map(ch => 
          synthesizeNotesFromCurriculum(ch, numGrade, normBoard, matchedSubject.id, matchedSubject.name)
        );
      }
    }
  } catch (err) {
    console.error(`[NotesRegistry] getAllNotesForSubject error:`, err.message);
  }

  return [];
}

/**
 * Search notes across chapters by keyword
 */
export function searchNotes(query = '', { boardId = 'cbse', classLevel = 11, subjectKey } = {}) {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const subjects = subjectKey ? [normalizeSubject(subjectKey)] : ['phy', 'chem', 'math', 'eng', 'science'];
  const results = [];

  for (const subj of subjects) {
    const chapters = getAllNotesForSubject(boardId, classLevel, subj);
    for (const chap of chapters) {
      if (chap.chapterTitle.toLowerCase().includes(q) || chap.summary?.toLowerCase().includes(q)) {
        results.push({
          chapterId: chap.id,
          chapterTitle: chap.chapterTitle,
          subjectId: chap.subjectId,
          classLevel: chap.classLevel,
          matchType: 'chapter',
          snippet: chap.summary?.slice(0, 150)
        });
      }
      for (const t of (chap.topics || [])) {
        if (t.title.toLowerCase().includes(q) || t.content?.toLowerCase().includes(q)) {
          results.push({
            chapterId: chap.id,
            chapterTitle: chap.chapterTitle,
            topicId: t.id,
            topicTitle: t.title,
            subjectId: chap.subjectId,
            classLevel: chap.classLevel,
            matchType: 'topic',
            snippet: t.content?.slice(0, 150)
          });
        }
      }
    }
  }

  return results.slice(0, 15);
}
