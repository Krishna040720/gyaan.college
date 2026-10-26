// GYAAN AI Learning Progress, Concept Mastery & Spaced Revision Engine
// Tracks student understanding, Feynman voice articulation, prerequisite health, and revision schedules
// Integrates with authService & storageService to ensure guests never receive fake persistent progress

import { conceptGraphEngine } from './conceptGraphEngine.js';
import { storageService, STORAGE_KEYS } from './storageService.js';
import { authService } from './authService.js';

export function createInitialProgressState() {
  return {
    concepts: {}, // conceptId: { mastery, understanding, explanation, quiz, confidence, status, attempts, lastScore, bestScore, nextRevisionDate, misconceptions: [], lastStudied }
    topics: {},   // chapterId-topicKey (backward-compatibility)
    chapters: {}, // chapterId: { completedTopics, totalTopics, mastery, status, lastAccessed }
    quizHistory: [],
    voiceHistory: [],
    timeSpentSeconds: 0,
    lastStudiedTopic: null
  };
}

export const INITIAL_PROGRESS_STATE = createInitialProgressState();

function getStorageSafe() {
  if (authService.isGuest()) {
    return createInitialProgressState();
  }
  const stored = storageService.getItem(STORAGE_KEYS.LEARNING_PROGRESS, null);
  if (!stored) return createInitialProgressState();
  return {
    ...createInitialProgressState(),
    ...stored,
    concepts: stored.concepts ? { ...stored.concepts } : {},
    topics: stored.topics ? { ...stored.topics } : {},
    chapters: stored.chapters ? { ...stored.chapters } : {},
    quizHistory: Array.isArray(stored.quizHistory) ? [...stored.quizHistory] : [],
    voiceHistory: Array.isArray(stored.voiceHistory) ? [...stored.voiceHistory] : []
  };
}

function saveStorageSafe(state) {
  if (authService.isGuest()) {
    return;
  }
  storageService.setItem(STORAGE_KEYS.LEARNING_PROGRESS, state);
}

export function calculateMastery({ understanding = 0, explanation = 0, quiz = 0 }) {
  // If no quiz attempted yet, weight explanation higher
  if (quiz === 0 && explanation > 0) {
    const weighted = (understanding * 0.45) + (explanation * 0.55);
    return Math.round(Math.min(100, Math.max(0, weighted)));
  }
  // If no oral explanation attempted yet, weight quiz and conceptual understanding
  if (explanation === 0 && quiz > 0) {
    const weighted = (understanding * 0.50) + (quiz * 0.50);
    return Math.round(Math.min(100, Math.max(0, weighted)));
  }
  if (explanation === 0 && quiz === 0) {
    return Math.round(Math.min(100, Math.max(0, understanding)));
  }
  const weighted = (understanding * 0.35) + (explanation * 0.45) + (quiz * 0.20);
  return Math.round(Math.min(100, Math.max(0, weighted)));
}

export function determineStatus(mastery, hasAttempts = false) {
  if (!hasAttempts || mastery === null || mastery === undefined) return 'not_assessed';
  if (mastery >= 80) return 'mastered';
  if (mastery >= 60) return 'developing';
  return 'needs_strengthening';
}

export function getMasteryCategory(mastery, isAssessed = false) {
  if (!isAssessed || mastery === null || mastery === undefined) {
    return {
      category: 'not_assessed',
      label: 'Not assessed yet',
      color: 'slate',
      badgeClass: 'bg-slate-100 text-slate-600 border border-slate-200',
      action: 'Start Practice',
      actionLabel: 'Assess Understanding',
      threshold: 'Unassessed'
    };
  }
  if (mastery < 60) {
    return {
      category: 'needs_strengthening',
      label: `Understanding: ${mastery}% (Needs Strengthening)`,
      shortLabel: 'Needs Strengthening',
      color: 'rose',
      badgeClass: 'bg-rose-50 text-rose-700 border border-rose-200',
      action: 'Strengthen Understanding',
      actionLabel: 'Strengthen Concept',
      threshold: '<60%'
    };
  }
  if (mastery < 80) {
    return {
      category: 'developing',
      label: `Understanding: ${mastery}% (Developing)`,
      shortLabel: 'Developing',
      color: 'amber',
      badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200',
      action: 'Focused Practice',
      actionLabel: 'Active Recall',
      threshold: '60–79%'
    };
  }
  return {
    category: 'strong',
    label: `Understanding: ${mastery}% (Strong)`,
    shortLabel: 'Strong Understanding',
    color: 'emerald',
    badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    action: 'Next Concept',
    actionLabel: 'Deepen Knowledge',
    threshold: '80–100%'
  };
}

export const progressService = {
  getProgress() {
    return getStorageSafe();
  },

  formatConceptMastery(conceptId) {
    const prog = this.getConceptProgress(conceptId);
    if (!prog.isAssessed || prog.mastery === null || prog.mastery === undefined) {
      return 'Not assessed yet';
    }
    return `${prog.mastery}%`;
  },

  getConceptProgress(conceptId) {
    if (authService.isGuest()) {
      return {
        conceptId,
        mastery: null,
        isAssessed: false,
        understanding: 0,
        explanation: 0,
        quiz: 0,
        confidence: 0,
        status: 'not_assessed',
        attempts: 0,
        lastScore: 0,
        bestScore: 0,
        nextRevisionDate: null,
        misconceptions: [],
        lastStudied: null
      };
    }
    const state = getStorageSafe();
    const data = state.concepts[conceptId] || state.topics[conceptId];
    if (data) {
      const isAssessed = Boolean(data.isAssessed || (data.attempts > 0 && (data.lastScore > 0 || data.explanation > 0 || data.quiz > 0)));
      return {
        ...data,
        isAssessed,
        mastery: isAssessed ? (data.mastery ?? 0) : null,
        status: isAssessed ? determineStatus(data.mastery, true) : 'not_assessed'
      };
    }

    return {
      conceptId,
      mastery: null,
      isAssessed: false,
      understanding: 0,
      explanation: 0,
      quiz: 0,
      confidence: 0,
      status: 'not_assessed',
      attempts: 0,
      lastScore: 0,
      bestScore: 0,
      attemptsHistory: [],
      nextRevisionDate: null,
      misconceptions: [],
      lastStudied: null
    };
  },

  recordConceptEvaluation({ 
    conceptId, 
    conceptTitle, 
    chapterId, 
    subject, 
    grade = 10, 
    boardId = 'cbse',
    transcript = '',
    evaluation = {} 
  }) {
    const isGuest = authService.isGuest();
    const state = getStorageSafe();
    const prev = state.concepts[conceptId] || {
      mastery: 0,
      understanding: 0,
      explanation: 0,
      quiz: 0,
      confidence: 50,
      attempts: 0,
      lastScore: 0,
      bestScore: 0,
      misconceptions: []
    };

    const explanationScore = Math.round(evaluation.accuracy || evaluation.accuracyScore || evaluation.understandingScore || 65);
    const understandingScore = Math.round(evaluation.understandingScore || Math.min(100, explanationScore + 5));
    const confidenceScore = Math.round(evaluation.confidence || evaluation.confidenceScore || 70);

    const newAttempts = (prev.attempts || 0) + 1;
    const newBestScore = Math.max(prev.bestScore || 0, explanationScore);

    const newMastery = calculateMastery({
      understanding: understandingScore,
      explanation: explanationScore,
      quiz: prev.quiz || 0
    });

    const revisionPlan = conceptGraphEngine.calculateSpacedRevision({
      score: explanationScore,
      attempts: newAttempts
    });

    const currentMisconceptions = Array.isArray(evaluation.mistakes) ? evaluation.mistakes : [];
    const mergedMisconceptions = Array.from(new Set([...(prev.misconceptions || []), ...currentMisconceptions])).slice(0, 5);

    const attemptRecord = {
      attemptNumber: newAttempts,
      score: explanationScore,
      date: new Date().toISOString(),
      transcript: transcript ? transcript.slice(0, 500) : '',
      accuracy: explanationScore,
      understandingScore,
      clarityScore: evaluation.clarityScore || 70,
      mustKnowCovered: evaluation.mustKnowCovered || [],
      mustKnowMissed: evaluation.mustKnowMissed || [],
      misconceptions: evaluation.misconceptionsDetected || []
    };

    const prevHistory = Array.isArray(prev.attemptsHistory) ? prev.attemptsHistory : [];

    const updatedConcept = {
      ...prev,
      conceptId,
      conceptTitle: conceptTitle || conceptId,
      chapterId,
      subject,
      grade,
      boardId,
      isAssessed: true,
      understanding: understandingScore,
      explanation: explanationScore,
      confidence: confidenceScore,
      mastery: newMastery,
      attempts: newAttempts,
      lastScore: explanationScore,
      bestScore: newBestScore,
      attemptsHistory: [attemptRecord, ...prevHistory],
      status: determineStatus(newMastery, true),
      nextRevisionDate: revisionPlan.nextRevisionDate,
      revisionIntervalDays: revisionPlan.nextIntervalDays,
      misconceptions: mergedMisconceptions,
      lastEvaluation: {
        accuracy: explanationScore,
        understandingScore,
        strengths: evaluation.strengths || [],
        mistakes: evaluation.mistakes || [],
        missingConcepts: evaluation.missingConcepts || [],
        socraticFollowUp: evaluation.socraticFollowUp || ''
      },
      lastStudied: new Date().toISOString()
    };

    if (!isGuest) {
      state.concepts[conceptId] = updatedConcept;
      state.topics[conceptId] = updatedConcept;

      state.lastStudiedTopic = {
        conceptId,
        chapterId,
        chapterTitle: conceptTitle,
        subjectName: subject || 'Science',
        grade,
        boardId,
        timestamp: new Date().toISOString()
      };

      state.voiceHistory.unshift({
        id: `voice-${Date.now()}`,
        conceptId,
        conceptTitle,
        accuracy: explanationScore,
        clarity: evaluation.clarityScore || evaluation.clarity || 70,
        transcript: transcript ? transcript.slice(0, 300) : '',
        date: new Date().toISOString()
      });

      if (state.voiceHistory.length > 50) {
        state.voiceHistory.pop();
      }

      saveStorageSafe(state);
    }

    return updatedConcept;
  },

  getTopicProgress(topicKey) {
    if (authService.isGuest()) {
      return {
        mastery: 0,
        understanding: 0,
        explanation: 0,
        quiz: 0,
        confidence: 0,
        status: 'not_started',
        voiceAttempts: 0,
        quizAttempts: 0,
        lastStudied: null
      };
    }
    const state = getStorageSafe();
    return state.topics[topicKey] || state.concepts[topicKey] || {
      mastery: 0,
      understanding: 0,
      explanation: 0,
      quiz: 0,
      confidence: 0,
      status: 'not_started',
      voiceAttempts: 0,
      quizAttempts: 0,
      lastStudied: null
    };
  },

  recordStudyTime(seconds = 60) {
    if (authService.isGuest()) return;
    const state = getStorageSafe();
    state.timeSpentSeconds = (state.timeSpentSeconds || 0) + seconds;
    saveStorageSafe(state);
  },

  recordTopicStudy({ chapterId, topicId, subjectName, chapterTitle, grade, boardId }) {
    if (authService.isGuest()) return null;
    const state = getStorageSafe();
    const topicKey = `${chapterId}-${topicId || 'main'}`;
    const prev = state.topics[topicKey] || {
      hasViewed: false,
      isAssessed: false,
      mastery: null,
      understanding: 0,
      explanation: 0,
      quiz: 0,
      confidence: 50,
      voiceAttempts: 0,
      quizAttempts: 0
    };

    // Merely opening or reading a topic must not inflate understanding or invent mastery.
    const isAssessed = Boolean(prev.isAssessed || (prev.voiceAttempts > 0) || (prev.quizAttempts > 0));
    const activeMastery = isAssessed ? (prev.mastery ?? 0) : null;

    state.topics[topicKey] = {
      ...prev,
      hasViewed: true,
      isAssessed,
      mastery: activeMastery,
      status: isAssessed ? determineStatus(activeMastery, true) : 'not_assessed',
      lastStudied: new Date().toISOString()
    };

    state.lastStudiedTopic = {
      chapterId,
      topicId: topicId || 'main',
      subjectName: subjectName || 'Science',
      chapterTitle: chapterTitle || chapterId,
      grade: grade || 10,
      boardId: boardId || 'cbse',
      timestamp: new Date().toISOString()
    };

    saveStorageSafe(state);
    return state.topics[topicKey];
  },

  recordTopicProgress(chapterId, metadata = {}) {
    return this.recordTopicStudy({
      chapterId,
      topicId: metadata.topicId || 'main',
      subjectName: metadata.subject || metadata.subjectName,
      chapterTitle: metadata.chapterTitle,
      grade: metadata.grade,
      boardId: metadata.boardId
    });
  },

  getConceptAttempts(conceptId) {
    const state = getStorageSafe();
    const concept = state.concepts[conceptId];
    return Array.isArray(concept?.attemptsHistory) ? concept.attemptsHistory : [];
  },

  getLastStudied() {
    if (authService.isGuest()) return null;
    const state = getStorageSafe();
    return state.lastStudiedTopic || null;
  },

  recordVoiceEvaluation({ chapterId, topicId, evaluation }) {
    return this.recordConceptEvaluation({
      conceptId: `${chapterId}-${topicId || 'main'}`,
      conceptTitle: chapterId,
      chapterId,
      evaluation
    });
  },

  recordQuizResult({ chapterId, topicId, score, total, weakConcepts = [] }) {
    const isGuest = authService.isGuest();
    const state = getStorageSafe();
    const topicKey = `${chapterId}-${topicId || 'main'}`;
    const prev = state.topics[topicKey] || {
      isAssessed: false,
      mastery: null,
      understanding: 0,
      explanation: 0,
      voiceAttempts: 0,
      quizAttempts: 0
    };

    const quizPct = total > 0 ? Math.round((score / total) * 100) : 0;
    const newQuiz = Math.max(prev.quiz || 0, quizPct);
    const newUnderstanding = prev.isAssessed && prev.understanding > 0 ? prev.understanding : quizPct;

    const newMastery = calculateMastery({
      understanding: newUnderstanding,
      explanation: prev.explanation || 0,
      quiz: newQuiz
    });

    const updated = {
      ...prev,
      isAssessed: true,
      quiz: newQuiz,
      understanding: newUnderstanding,
      mastery: newMastery,
      quizAttempts: (prev.quizAttempts || 0) + 1,
      weakConcepts,
      status: determineStatus(newMastery, true),
      lastStudied: new Date().toISOString()
    };

    if (!isGuest) {
      state.topics[topicKey] = updated;
      state.quizHistory.unshift({
        id: `quiz-${Date.now()}`,
        chapterId,
        score,
        total,
        percentage: quizPct,
        weakConcepts,
        date: new Date().toISOString()
      });

      if (state.quizHistory.length > 50) {
        state.quizHistory.pop();
      }

      saveStorageSafe(state);
    }

    return updated;
  },

  getRevisionQueue() {
    if (authService.isGuest()) return [];
    const state = getStorageSafe();
    const now = new Date();
    const dueList = [];

    const allItems = { ...state.topics, ...state.concepts };

    Object.entries(allItems).forEach(([id, data]) => {
      if (!data.lastStudied || !data.isAssessed) return;

      const isDue = data.nextRevisionDate ? (new Date(data.nextRevisionDate) <= now) : (data.mastery !== null && data.mastery < 60 && (data.attempts > 0 || data.quizAttempts > 0));

      if (isDue || data.status === 'needs_strengthening' || data.status === 'needs_revision') {
        dueList.push({
          id,
          title: data.conceptTitle || data.chapterTitle || id,
          mastery: data.mastery,
          status: data.status,
          nextRevisionDate: data.nextRevisionDate,
          attempts: data.attempts || 1,
          lastScore: data.lastScore || data.explanation || 0
        });
      }
    });

    return dueList.sort((a, b) => (a.mastery ?? 0) - (b.mastery ?? 0));
  },

  getWeakTopics() {
    if (authService.isGuest()) return [];
    const state = getStorageSafe();
    const weakList = [];
    const all = { ...state.topics, ...state.concepts };

    Object.entries(all).forEach(([key, data]) => {
      if (data.isAssessed && data.mastery !== null && data.mastery < 60) {
        weakList.push({
          topicKey: key,
          conceptId: data.conceptId || key,
          title: data.conceptTitle || data.chapterTitle || key,
          ...data
        });
      }
    });

    return weakList.sort((a, b) => (a.mastery ?? 0) - (b.mastery ?? 0));
  },

  getStrongTopics() {
    if (authService.isGuest()) return [];
    const state = getStorageSafe();
    const strongList = [];
    const all = { ...state.topics, ...state.concepts };

    Object.entries(all).forEach(([key, data]) => {
      if (data.status === 'mastered') {
        strongList.push({
          topicKey: key,
          conceptId: data.conceptId || key,
          title: data.conceptTitle || data.chapterTitle || key,
          ...data
        });
      }
    });

    return strongList.sort((a, b) => b.mastery - a.mastery);
  },

  getOverallMastery() {
    if (authService.isGuest()) {
      return {
        averageMastery: 0,
        totalTopics: 0,
        masteredTopics: 0,
        inProgressTopics: 0,
        weakTopics: 0
      };
    }
    const state = getStorageSafe();
    const concepts = Object.values(state.concepts);
    const topics = Object.values(state.topics);
    const pool = (concepts.length > 0 ? concepts : topics).filter(t => t.isAssessed && t.mastery !== null);

    if (!pool.length) {
      return {
        averageMastery: 0,
        totalTopics: 0,
        masteredTopics: 0,
        inProgressTopics: 0,
        weakTopics: 0
      };
    }
    const totalMastery = pool.reduce((acc, t) => acc + (t.mastery || 0), 0);
    const averageMastery = Math.round(totalMastery / pool.length);
    const masteredTopics = pool.filter(t => t.mastery >= 80).length;
    const inProgressTopics = pool.filter(t => t.mastery >= 60 && t.mastery < 80).length;
    const weakTopics = pool.filter(t => t.mastery < 60).length;

    return {
      averageMastery,
      totalTopics: pool.length,
      masteredTopics,
      inProgressTopics,
      weakTopics
    };
  },

  resetAll() {
    if (!authService.isGuest()) {
      saveStorageSafe({ ...INITIAL_PROGRESS_STATE });
    }
  }
};
