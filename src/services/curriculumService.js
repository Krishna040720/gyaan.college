// GYAAN AI Curriculum & Concept Service
// Connects to Backend REST API with transparent offline resilience to local Knowledge Base

import { 
  BOARDS, 
  CONCEPTS_REPOSITORY, 
  getConceptById, 
  getConceptsForChapter 
} from '../data/conceptKnowledgeBase.js';
import { getGradeData } from '../data/curriculumData.js';
import { getChapterNotes, getAllNotesForSubject, searchNotes as searchNotesFromRegistry } from '../data/notes/notesRegistry.js';
import { authService } from './authService.js';
import { curriculumHierarchyService } from './curriculumHierarchyService.js';

class CurriculumService {
  constructor() {
    this.apiBase = '/api/curriculum';
  }

  getEnrollmentHeaders() {
    const user = authService.getAuthUser();
    const headers = {};
    if (user && !user.isGuest) {
      const enrolledClass = user.enrolledClass || user.classLevel || user.grade;
      const enrolledBoard = user.enrolledBoard || user.boardId;
      if (enrolledClass) headers['x-enrolled-class'] = String(enrolledClass);
      if (enrolledBoard) headers['x-enrolled-board'] = String(enrolledBoard);
    }
    return headers;
  }

  assertLocalEnrollmentMatch(classNum, boardId) {
    const enrollment = authService.getEnrollment();
    if (enrollment) {
      if (classNum && Number(classNum) !== Number(enrollment.classLevel)) {
        const err = new Error(`Account is enrolled in Class ${enrollment.classLevel}. Access to Class ${classNum} is restricted.`);
        err.code = 'ENROLLED_CONTEXT_MISMATCH';
        err.status = 403;
        throw err;
      }
      if (boardId && enrollment.board && boardId.toLowerCase() !== enrollment.board.toLowerCase()) {
        const err = new Error(`Account is enrolled in Board ${enrollment.board}. Access to ${boardId} is restricted.`);
        err.code = 'ENROLLED_CONTEXT_MISMATCH';
        err.status = 403;
        throw err;
      }
    }
  }

  async getBoards() {
    try {
      const res = await fetch(`${this.apiBase}/boards`, {
        headers: this.getEnrollmentHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      if (e.status === 403) throw e;
      // Backend offline, fallback to local database
    }
    return BOARDS;
  }

  async getSubjects({ boardId = 'cbse', classNum = 10, academicYear = '2026-27' } = {}) {
    try {
      const res = await fetch(`${this.apiBase}/subjects?board=${boardId}&class=${classNum}&academicYear=${academicYear}`, {
        headers: this.getEnrollmentHeaders()
      });
      if (res.status === 403) {
        const errData = await res.json().catch(() => ({}));
        const err = new Error(errData.message || 'Access restricted: enrolled context mismatch');
        err.code = errData.error || 'ENROLLED_CONTEXT_MISMATCH';
        err.status = 403;
        throw err;
      }
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      if (e.status === 403) throw e;
      // Fallback
    }

    this.assertLocalEnrollmentMatch(classNum, boardId);
    const gradeData = getGradeData(Number(classNum), boardId);
    return gradeData.subjects || [];
  }

  async getChapters({ boardId = 'cbse', classNum = 10, subjectId } = {}) {
    try {
      const res = await fetch(`${this.apiBase}/chapters?board=${boardId}&class=${classNum}&subject=${subjectId}`, {
        headers: this.getEnrollmentHeaders()
      });
      if (res.status === 403) {
        const errData = await res.json().catch(() => ({}));
        const err = new Error(errData.message || 'Access restricted: enrolled context mismatch');
        err.code = errData.error || 'ENROLLED_CONTEXT_MISMATCH';
        err.status = 403;
        throw err;
      }
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      if (e.status === 403) throw e;
      // Fallback
    }

    this.assertLocalEnrollmentMatch(classNum, boardId);
    const gradeData = getGradeData(Number(classNum), boardId);
    const subject = gradeData.subjects?.find(s => s.id === subjectId) || gradeData.subjects?.[0];
    return subject?.chapters || [];
  }

  async getNotes(chapterId, { boardId = 'cbse', classNum = 11, subjectId = 'phy' } = {}) {
    try {
      const q = new URLSearchParams();
      if (classNum) q.append('class', classNum);
      if (subjectId) q.append('subject', subjectId);
      if (boardId) q.append('board', boardId);
      if (chapterId) q.append('chapter', chapterId);

      const res = await fetch(`${this.apiBase}/notes?${q.toString()}`, {
        headers: this.getEnrollmentHeaders()
      });
      if (res.status === 403) {
        const errData = await res.json().catch(() => ({}));
        const err = new Error(errData.message || 'Access restricted: enrolled context mismatch');
        err.code = errData.error || 'ENROLLED_CONTEXT_MISMATCH';
        err.status = 403;
        throw err;
      }
      if (res.ok) {
        const data = await res.json();
        if (data && !data.error) return data;
      }
    } catch (e) {
      if (e.status === 403) throw e;
      // Fallback to local notes registry
    }

    this.assertLocalEnrollmentMatch(classNum, boardId);
    return getChapterNotes(boardId, classNum, subjectId, chapterId);
  }

  async getSubjectNotes(boardId = 'cbse', classNum = 11, subjectId = 'phy') {
    try {
      const q = new URLSearchParams();
      if (classNum) q.append('class', classNum);
      if (subjectId) q.append('subject', subjectId);
      if (boardId) q.append('board', boardId);

      const res = await fetch(`${this.apiBase}/notes?${q.toString()}`, {
        headers: this.getEnrollmentHeaders()
      });
      if (res.status === 403) {
        const errData = await res.json().catch(() => ({}));
        const err = new Error(errData.message || 'Access restricted: enrolled context mismatch');
        err.code = errData.error || 'ENROLLED_CONTEXT_MISMATCH';
        err.status = 403;
        throw err;
      }
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      if (e.status === 403) throw e;
    }

    this.assertLocalEnrollmentMatch(classNum, boardId);
    return getAllNotesForSubject(boardId, classNum, subjectId);
  }

  async getConcepts(chapterId, chapterTitle = '', { boardId = 'cbse', classNum, subjectId } = {}) {
    try {
      const q = new URLSearchParams();
      if (chapterId) q.append('chapterId', chapterId);
      if (chapterTitle) q.append('title', chapterTitle);
      const res = await fetch(`${this.apiBase}/concepts?${q.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }

    const localConcepts = getConceptsForChapter(chapterId, chapterTitle);
    if (localConcepts.length > 0) return localConcepts;

    // Check authoritative Notes Registry for rich, syllabus-aligned chapter notes
    try {
      const gradeNum = classNum ? Number(classNum) : ((chapterId || '').match(/c(\d+)/i) ? Number((chapterId.match(/c(\d+)/i))[1]) : 11);
      const subjKey = subjectId || ((chapterId || '').includes('phy') ? 'phy' : (chapterId || '').includes('chem') ? 'chem' : (chapterId || '').includes('math') ? 'math' : (chapterId || '').includes('eng') ? 'eng' : 'phy');
      const chapterNotes = getChapterNotes(boardId, gradeNum, subjKey, chapterId);
      if (chapterNotes && Array.isArray(chapterNotes.topics) && chapterNotes.topics.length > 0) {
        return chapterNotes.topics.map((t, idx) => ({
          id: t.id || `${chapterId}-t${idx + 1}`,
          chapterId: chapterNotes.id || chapterId,
          chapterTitle: chapterNotes.chapterTitle || chapterTitle,
          title: t.title,
          description: t.content || `Detailed study of ${t.title}`,
          difficulty: idx === 0 ? 'easy' : idx === 1 ? 'medium' : 'hard',
          status: 'verified',
          learningObjectives: [t.title],
          prerequisites: [],
          mustKnowPoints: t.mustKnowPoints || [],
          commonMisconceptions: (t.commonTraps || []).map(trap => ({
            misconception: trap.trap,
            correction: trap.correction
          })),
          formulas: t.formulas || [],
          derivations: t.derivations || [],
          chemicalReactions: t.chemicalReactions || [],
          solvedNumericals: t.solvedNumericals || [],
          literatureAnalysis: t.literatureAnalysis,
          writingGuide: t.writingGuide,
          examTips: t.examTips
        }));
      }
    } catch {}

    // Check canonical curriculum hierarchy service for authentic units, topics, and subtopics
    try {
      const hierarchy = curriculumHierarchyService.getChapterHierarchy({ id: chapterId, title: chapterTitle });
      if (hierarchy) {
        const flattened = curriculumHierarchyService.flattenHierarchy(hierarchy)
          .filter(n => n.type === 'topic' || n.type === 'subtopic');
        if (flattened.length > 0) {
          return flattened.map(f => ({
            id: f.conceptId || f.id,
            chapterId: hierarchy.chapterId,
            chapterTitle: hierarchy.chapterTitle,
            title: f.title,
            description: f.description || `Core curriculum unit in ${hierarchy.chapterTitle}`,
            difficulty: f.importance === 'high_yield' ? 'hard' : f.importance === 'foundation' ? 'easy' : 'medium',
            status: 'verified',
            learningObjectives: [f.title],
            prerequisites: [],
            mustKnowPoints: f.rawNode?.keyTakeaways || [f.description || f.title],
            commonMisconceptions: []
          }));
        }
      }
    } catch {}

    // Check if chapter has structured topics in local curriculum database
    const gradeMatch = (chapterId || '').match(/c(\d+)/i);
    const gradeNum = gradeMatch ? Number(gradeMatch[1]) : 10;
    const gradeData = getGradeData(gradeNum, 'cbse');
    
    let matchedChapter = null;
    (gradeData.subjects || []).forEach(s => {
      const found = (s.chapters || []).find(c => c.id === chapterId || c.title?.toLowerCase() === chapterTitle.toLowerCase());
      if (found) matchedChapter = found;
    });

    if (matchedChapter && Array.isArray(matchedChapter.topics) && matchedChapter.topics.length > 0) {
      return matchedChapter.topics.map((t, idx) => {
        const topicTitle = t.titleEn || t.title || `Topic ${idx + 1}`;
        return {
          id: `${chapterId}-t${idx + 1}`,
          chapterId,
          chapterTitle: matchedChapter.title,
          title: topicTitle,
          description: `Comprehensive study of ${topicTitle} in ${matchedChapter.title}. Explains fundamental mechanisms, definitions, and applications according to the NCERT curriculum.`,
          difficulty: idx === 0 ? 'easy' : idx === 1 ? 'medium' : 'hard',
          status: 'verified',
          learningObjectives: [
            `Understand the core principle of ${topicTitle}`,
            `Explain practical observations and problem-solving techniques in ${matchedChapter.title}`
          ],
          prerequisites: [],
          mustKnowPoints: [
            `Scientific definition and primary conditions of ${topicTitle}`,
            `Standard examination formulas, units, and derivation principles`
          ],
          commonMisconceptions: []
        };
      });
    }

    // Return empty array to allow honest empty state rather than fabricated placeholder
    return [];
  }

  async getConceptDetails(conceptId) {
    try {
      const res = await fetch(`${this.apiBase}/concept/${conceptId}`);
      if (res.ok) {
        const data = await res.json();
        if (data && !data.error) return data;
      }
    } catch {
      // Fallback
    }

    return getConceptById(conceptId);
  }

  searchNotes(query = '', options = {}) {
    return searchNotesFromRegistry(query, options);
  }

  searchConcepts(query = '') {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();

    return CONCEPTS_REPOSITORY.filter(c => 
      c.title.toLowerCase().includes(q) ||
      c.chapterTitle?.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.mustKnowPoints || []).some(p => p.toLowerCase().includes(q))
    ).slice(0, 8);
  }
}

export const curriculumService = new CurriculumService();
