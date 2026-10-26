// GYAAN AI Server Curriculum Database & Knowledge Base
// Authoritative single-source reference connecting multi-board definitions,
// verified concept repository, and curriculum structure for Classes 1 to 12.

import { BOARDS } from '../src/data/boardsRegistry.js';
import { 
  CONCEPTS_REPOSITORY, 
  getConceptsForChapter as getConceptsFromKB, 
  getConceptById as getConceptByIdKB 
} from '../src/data/conceptKnowledgeBase.js';
import { getGradeData } from '../src/data/curriculumData.js';
import {
  getChapterNotes as getNotesFromRegistry,
  getAllNotesForSubject as getSubjectNotesFromRegistry,
  searchNotes as searchNotesFromRegistry
} from '../src/data/notes/notesRegistry.js';

export { BOARDS };
export const CONCEPTS = CONCEPTS_REPOSITORY;

export function getConceptById(conceptId) {
  return getConceptByIdKB(conceptId);
}

export function getConceptsForChapter(chapterId, chapterTitle = '') {
  return getConceptsFromKB(chapterId, chapterTitle);
}

export function getSubjectsForClass(classNum, boardId = 'cbse') {
  const num = Number(classNum);
  if (isNaN(num) || num < 1 || num > 12) return null;
  const gradeData = getGradeData(num, boardId);
  return gradeData.subjects || [];
}

export function getChaptersForSubject(classNum, subjectId, boardId = 'cbse') {
  const num = Number(classNum);
  if (isNaN(num) || num < 1 || num > 12) return null;
  const gradeData = getGradeData(num, boardId);
  const subject = (gradeData.subjects || []).find(s => s.id === subjectId || s.name.toLowerCase() === (subjectId || '').toLowerCase());
  if (!subject) return null;
  return subject.chapters || [];
}

export function getNotesForChapter(classNum, subjectId, chapterId, boardId = 'cbse') {
  return getNotesFromRegistry(boardId, classNum, subjectId, chapterId);
}

export function getNotesForSubject(classNum, subjectId, boardId = 'cbse') {
  return getSubjectNotesFromRegistry(boardId, classNum, subjectId);
}

export function searchNotes(query, { boardId, classLevel, subjectKey } = {}) {
  return searchNotesFromRegistry(query, { boardId, classLevel, subjectKey });
}

