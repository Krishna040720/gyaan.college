// Automated Unit & Integration Test Suite for Adaptive Learning Engine,
// Student-Controlled Learning Plan, Subject-Specific Quizzes, and Mastery Tracking
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

import { authService } from '../src/services/authService.js';
import { progressService, getMasteryCategory, determineStatus } from '../src/services/progressService.js';
import { dueWorkService } from '../src/services/dueWorkService.js';
import { storageService, STORAGE_KEYS } from '../src/services/storageService.js';
import { getQuestionsForChapter } from '../src/data/subjectQuizBank.js';
import { getGradeData } from '../src/data/curriculumData.js';

describe('Phase 14: Adaptive Learning & Honest Mastery Suite', () => {
  beforeEach(() => {
    storageMap.clear();
    authService.signOut();
  });

  test('Test A: Fresh account has 0 fabricated mastery and displays "Not assessed yet"', () => {
    authService.signIn({
      name: 'Tanvi Nair',
      enrolledClass: 10,
      enrolledBoard: 'CBSE'
    });

    const conceptId = 'c10-sci-ch1-c1';
    const initialProg = progressService.getConceptProgress(conceptId);

    // Initial concept state must be honest
    assert.equal(initialProg.isAssessed, false);
    assert.equal(initialProg.mastery, null);
    assert.equal(initialProg.attempts, 0);
    assert.equal(initialProg.status, 'not_assessed');

    // Canonical formatting must return "Not assessed yet"
    const formatted = progressService.formatConceptMastery(conceptId);
    assert.equal(formatted, 'Not assessed yet');

    // Canonical category must be not_assessed with honest action
    const category = getMasteryCategory(initialProg.mastery, initialProg.isAssessed);
    assert.equal(category.category, 'not_assessed');
    assert.equal(category.label, 'Not assessed yet');
    assert.equal(category.threshold, 'Unassessed');
    assert.equal(category.action, 'Start Practice');

    // Merely opening or viewing the chapter content must NOT fabricate mastery or award 75%
    const studyRecord = progressService.recordTopicStudy({
      chapterId: 'c10-sci-ch1',
      topicId: 'c1',
      subjectName: 'Science',
      chapterTitle: 'Chemical Reactions and Equations',
      grade: 10,
      boardId: 'cbse'
    });

    assert.equal(studyRecord.hasViewed, true);
    assert.equal(studyRecord.isAssessed, false);
    assert.equal(studyRecord.mastery, null);
    assert.equal(studyRecord.status, 'not_assessed');
  });

  test('Test B: Weak concept (<60%) produces red "Needs Strengthening" action and pedagogical diagnostic', () => {
    authService.signIn({
      name: 'Rohan Deshmukh',
      enrolledClass: 10,
      enrolledBoard: 'CBSE'
    });

    const category = getMasteryCategory(45, true);
    assert.equal(category.category, 'needs_strengthening');
    assert.equal(category.shortLabel, 'Needs Strengthening');
    assert.equal(category.color, 'rose');
    assert.equal(category.threshold, '<60%');
    assert.equal(category.action, 'Strengthen Understanding');

    // Simulate an oral Feynman recall attempt with weak coverage (42%)
    const evaluated = progressService.recordConceptEvaluation({
      conceptId: 'c10-sci-ch1-c1',
      conceptTitle: 'Balancing Chemical Equations',
      chapterId: 'c10-sci-ch1',
      evaluation: {
        accuracyScore: 40,
        clarityScore: 45,
        understanding: 40,
        confidence: 40,
        misconceptions: ['Charge balance confused with mass balance']
      }
    });

    assert.equal(evaluated.isAssessed, true);
    assert.ok(evaluated.mastery < 60, `Mastery ${evaluated.mastery} should be <60%`);
    assert.equal(evaluated.status, 'needs_strengthening');

    // Weak topics diagnostic must flag this concept
    const weakList = progressService.getWeakTopics();
    const foundWeak = weakList.find((w) => w.conceptId === 'c10-sci-ch1-c1');
    assert.ok(foundWeak, 'Weak concept must be reported in weak topics list');
    assert.equal(foundWeak.isAssessed, true);
  });

  test('Test C: Developing concept (60–79%) produces amber "Developing" state', () => {
    const category = getMasteryCategory(72, true);
    assert.equal(category.category, 'developing');
    assert.equal(category.shortLabel, 'Developing');
    assert.equal(category.color, 'amber');
    assert.equal(category.threshold, '60–79%');
    assert.equal(category.action, 'Focused Practice');
    assert.equal(determineStatus(72, true), 'developing');
  });

  test('Test D: Strong concept (>=80%) produces green "Strong Understanding" state', () => {
    const category = getMasteryCategory(88, true);
    assert.equal(category.category, 'strong');
    assert.equal(category.shortLabel, 'Strong Understanding');
    assert.equal(category.color, 'emerald');
    assert.equal(category.threshold, '80–100%');
    assert.equal(category.action, 'Next Concept');
    assert.equal(determineStatus(88, true), 'mastered');
  });

  test('Test E: Manual task creation, editing, rescheduling, completing, and persistence', () => {
    authService.signIn({
      name: 'Isha Patel',
      enrolledClass: 10,
      enrolledBoard: 'CBSE'
    });

    // 1. Add Task
    const newTask = dueWorkService.addTask({
      title: 'Practice 10 numericals on Ohm’s Law and Resistivity',
      subjectName: 'Physics',
      chapterTitle: 'Electricity',
      conceptTitle: 'Ohm’s Law & Resistance',
      estimatedMinutes: 25,
      priority: 'high',
      dueDate: new Date().toISOString()
    });

    assert.ok(newTask.id, 'Task must receive a persistent unique ID');
    assert.equal(newTask.title, 'Practice 10 numericals on Ohm’s Law and Resistivity');
    assert.equal(newTask.estimatedMinutes, 25);
    assert.equal(newTask.priority, 'HIGH');
    assert.equal(newTask.isCompleted, false);

    // 2. Edit Task
    const editedTask = dueWorkService.editTask(newTask.id, {
      title: 'Practice 15 numericals on Joule Heating Law',
      estimatedMinutes: 35
    });
    assert.equal(editedTask.title, 'Practice 15 numericals on Joule Heating Law');
    assert.equal(editedTask.estimatedMinutes, 35);

    // 3. Reschedule Task
    const nextWeek = '2026-10-24';
    const rescheduled = dueWorkService.rescheduleTask(newTask.id, nextWeek);
    assert.equal(rescheduled.dueDate, nextWeek);

    // 4. Complete Task
    const completed = dueWorkService.completeTask(newTask.id);
    assert.equal(completed.status, 'completed');
    assert.ok(completed.completedAt, 'Must record completion timestamp');

    // 5. Verification from persistent state
    const savedState = dueWorkService.getTasksState();
    assert.equal(savedState.tasks.length, 1);
    assert.equal(savedState.tasks[0].id, newTask.id);
    assert.equal(savedState.tasks[0].status, 'completed');
  });

  test('Test F: clearAllActiveTasks clears tasks and dismissed recommendations do NOT regenerate', () => {
    authService.signIn({
      name: 'Karan Mehra',
      enrolledClass: 10,
      enrolledBoard: 'CBSE'
    });

    // Add two active tasks
    dueWorkService.addTask({
      title: 'Task 1: Balance redox reactions',
      subjectName: 'Chemistry',
      estimatedMinutes: 20
    });
    dueWorkService.addTask({
      title: 'Task 2: Ray diagrams for concave mirrors',
      subjectName: 'Physics',
      estimatedMinutes: 30
    });

    let due = dueWorkService.getDueWork({ grade: 10, boardId: 'cbse' });
    assert.ok(due.totalCount >= 2, 'Should have at least 2 active items');

    // Call clearAllActiveTasks
    dueWorkService.clearAllActiveTasks();

    // Verify all active tasks are gone
    due = dueWorkService.getDueWork({ grade: 10, boardId: 'cbse' });
    assert.equal(due.tasks.length, 0, 'Active manual tasks must be 0');
    assert.equal(due.dueToday.length, 0, 'Due today must be 0 after clear');
    assert.equal(due.overdue.length, 0, 'Overdue must be 0 after clear');
    assert.equal(due.totalMinutes, 0, 'Estimated minutes must be 0');

    // Dismissed IDs must be recorded so recommendations do NOT regenerate on subsequent queries
    const state = dueWorkService.getTasksState();
    assert.ok(state.dismissedConceptIds.length > 0, 'Dismissed concepts must be persisted');

    // Second call to getDueWork immediately after clear must remain clear
    const dueSecondQuery = dueWorkService.getDueWork({ grade: 10, boardId: 'cbse' });
    assert.equal(dueSecondQuery.dueToday.length, 0, 'Dismissed recommendations must not regenerate');
  });

  test('Test G: Subject-specific quiz questions are returned for Chemistry, Physics, and Math (no generic methodology questions)', () => {
    const cbse10 = getGradeData(10, 'cbse');
    assert.ok(cbse10, 'CBSE Class 10 curriculum must exist');

    const sciSubj = cbse10.subjects.find(
      (s) => s.id.toLowerCase().includes('sci') || s.name.toLowerCase().includes('science')
    );
    assert.ok(sciSubj, 'Science subject must exist in Class 10');

    // Test Chemistry: Chemical Reactions and Equations
    const chemChapter = sciSubj.chapters.find(
      (c) => c.chapterNumber === 1 || c.title.toLowerCase().includes('chemical reactions')
    );
    assert.ok(chemChapter, 'Science Chapter 1 Chemical Reactions must exist');

    const chemQuestions = getQuestionsForChapter(chemChapter, { classLevel: 10, subjectName: 'Science', limit: 10 });
    assert.ok(chemQuestions.length >= 3, 'Must return at least 3 curated questions');

    // Verify questions are strictly subject-specific
    const genericMethodologyText = 'What is the most effective scientific method to achieve 90%+ retention?';
    chemQuestions.forEach((q) => {
      assert.notEqual(q.q, genericMethodologyText, 'Must not return generic study methodology question');
      assert.ok(q.options.length === 4, 'Must provide 4 answer options');
      assert.ok(typeof q.correct === 'number' && q.correct >= 0 && q.correct <= 3);
      assert.ok(q.explanation && q.explanation.length > 10, 'Must provide detailed pedagogical explanation');
      assert.ok(q.hint && q.hint.length > 5, 'Must provide helpful hint');
    });

    const chemTopicsCombined = chemQuestions.map((q) => q.topic).join(' ');
    assert.ok(
      chemTopicsCombined.includes('Chemical') || chemTopicsCombined.includes('Balancing') || chemTopicsCombined.includes('Reactions'),
      'Questions must address Chemistry topics'
    );

    // Test Physics: Electricity
    const elecChapter = sciSubj.chapters.find(
      (c) => c.chapterNumber === 12 || c.title.toLowerCase().includes('electricity')
    );
    assert.ok(elecChapter, 'Science Chapter 12 Electricity must exist');

    const elecQuestions = getQuestionsForChapter(elecChapter, { classLevel: 10, subjectName: 'Science', limit: 10 });
    const elecTextCombined = elecQuestions.map((q) => q.q).join(' ');
    assert.ok(
      elecTextCombined.includes('Ohm') || elecTextCombined.includes('resistivity') || elecTextCombined.includes('heat') || elecTextCombined.includes('resistance'),
      'Electricity questions must cover Ohm’s Law, resistance, or Joule heating'
    );

    // Test Mathematics: Real Numbers
    const mathSubj = cbse10.subjects.find(
      (s) => s.id.toLowerCase().includes('math') || s.name.toLowerCase().includes('math')
    );
    assert.ok(mathSubj, 'Mathematics subject must exist');
    const mathChapter = mathSubj.chapters.find(
      (c) => c.chapterNumber === 1 || c.title.toLowerCase().includes('real numbers')
    );
    assert.ok(mathChapter, 'Math Chapter 1 Real Numbers must exist');

    const mathQuestions = getQuestionsForChapter(mathChapter, { classLevel: 10, subjectName: 'Mathematics', limit: 10 });
    const mathTextCombined = mathQuestions.map((q) => q.q).join(' ');
    assert.ok(
      mathTextCombined.includes('Fundamental Theorem of Arithmetic') || mathTextCombined.includes('HCF') || mathTextCombined.includes('LCM') || mathTextCombined.includes('Real Numbers') || mathTextCombined.includes('Prime'),
      'Math questions must cover authentic mathematical syllabus'
    );
  });

  test('Test H: Validated quiz completion updates progressService concept mastery with real score', () => {
    authService.signIn({
      name: 'Devika Sen',
      enrolledClass: 10,
      enrolledBoard: 'CBSE'
    });

    // Take an authentic quiz on Science Chapter 1 with 4 out of 5 correct (80%)
    const result = progressService.recordQuizResult({
      chapterId: 'c10-sci-ch1',
      topicId: 'c1',
      score: 4,
      total: 5,
      weakConcepts: []
    });

    assert.equal(result.isAssessed, true);
    assert.equal(result.quiz, 80);
    assert.equal(result.quizAttempts, 1);
    assert.ok(result.mastery >= 60, 'Mastery must be computed from actual quiz performance');
    assert.equal(result.status, result.mastery >= 80 ? 'mastered' : 'developing');

    // Verify stored progress state in localStorage
    const savedProgress = storageService.getItem(STORAGE_KEYS.LEARNING_PROGRESS);
    assert.ok(savedProgress, 'Progress must be saved to storage');
    assert.equal(savedProgress.quizHistory.length, 1);
    assert.equal(savedProgress.quizHistory[0].score, 4);
    assert.equal(savedProgress.quizHistory[0].total, 5);
    assert.equal(savedProgress.quizHistory[0].percentage, 80);
  });
});
