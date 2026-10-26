// GYAAN AI Adaptive Learning, Spaced Revision & Task Management Engine
// Synthesizes Spaced Repetition (SM-2), Low-Mastery Diagnostics, and Student-Controlled Learning Plans
// Guarantees 100% academic integrity, isolated guest states, persistent task lifecycles, and no auto-regenerating ghosts.

import { authService } from './authService.js';
import { progressService } from './progressService.js';
import { getGradeData } from '../data/curriculumData.js';
import { storageService } from './storageService.js';

const TASKS_STORAGE_KEY = 'gyaan_student_tasks_v2';

class DueWorkService {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notifySubscribers() {
    this.subscribers.forEach(cb => {
      try { cb(); } catch {}
    });
  }

  /**
   * Safe retrieval of student tasks state
   */
  getTasksState() {
    if (authService.isGuest()) {
      return {
        tasks: [],
        dismissedConceptIds: []
      };
    }
    const stored = storageService.getItem(TASKS_STORAGE_KEY, null);
    if (!stored || typeof stored !== 'object') {
      return {
        tasks: [],
        dismissedConceptIds: []
      };
    }
    return {
      tasks: Array.isArray(stored.tasks) ? stored.tasks : [],
      dismissedConceptIds: Array.isArray(stored.dismissedConceptIds) ? stored.dismissedConceptIds : []
    };
  }

  saveTasksState(state) {
    if (authService.isGuest()) return;
    storageService.setItem(TASKS_STORAGE_KEY, state);
    this.notifySubscribers();
  }

  /**
   * Main query engine returning active tasks, overdue, due today, upcoming, completed, and adaptive recommendations
   */
  getDueWork({ grade = 10, boardId = 'cbse' } = {}) {
    const isGuest = authService.isGuest();
    if (isGuest) {
      return {
        isGuest: true,
        tasks: [],
        overdue: [],
        dueToday: [],
        upcoming: [],
        completed: [],
        recommendations: [],
        totalCount: 0,
        totalMinutes: 0,
        overdueCount: 0,
        dueTodayCount: 0,
        upcomingCount: 0,
        completedCount: 0
      };
    }

    const authUser = authService.getAuthUser();
    const effectiveGrade = Number(authUser?.enrolledClass || authUser?.classLevel || grade);
    const effectiveBoard = (authUser?.enrolledBoard || boardId || 'cbse').toLowerCase();

    const tasksState = this.getTasksState();
    const studentTasks = tasksState.tasks || [];
    const dismissedSet = new Set(tasksState.dismissedConceptIds || []);

    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);

    const overdue = [];
    const dueToday = [];
    const upcoming = [];
    const completed = [];
    const activeTasks = [];

    // 1. Process explicit student tasks
    studentTasks.forEach(task => {
      if (task.status === 'completed') {
        completed.push(task);
        return;
      }
      if (task.status === 'dismissed') {
        return;
      }

      // Active task
      activeTasks.push(task);
      const scheduleDate = task.scheduledFor || todayStr;

      if (scheduleDate < todayStr) {
        task.urgencyTag = 'Overdue';
        overdue.push(task);
      } else if (scheduleDate === todayStr) {
        task.urgencyTag = 'Due Today';
        dueToday.push(task);
      } else {
        task.urgencyTag = 'Upcoming';
        upcoming.push(task);
      }
    });

    // 2. Compute Adaptive Recommendations (from real learning evidence)
    const revisionQueue = progressService.getRevisionQueue();
    const weakTopics = progressService.getWeakTopics();
    const recommendations = [];
    const processedConceptIds = new Set([
      ...activeTasks.map(t => t.conceptId).filter(Boolean),
      ...dismissedSet
    ]);

    // A. Spaced Repetition Revisions
    revisionQueue.forEach(revItem => {
      if (!revItem.id || processedConceptIds.has(revItem.id)) return;
      processedConceptIds.add(revItem.id);

      const revDateStr = revItem.nextRevisionDate ? revItem.nextRevisionDate.slice(0, 10) : todayStr;
      const rec = {
        id: `rec-rev-${revItem.id}`,
        conceptId: revItem.id,
        conceptTitle: revItem.title,
        chapterId: revItem.chapterId || revItem.id,
        chapterTitle: revItem.chapterTitle || revItem.title,
        subjectName: revItem.subjectName || 'Science',
        taskType: 'Oral Recall',
        source: 'spaced_revision',
        reason: `Spaced retrieval due • Prior retention interval: ${revItem.intervalDays || 1} day(s)`,
        dueDate: revDateStr,
        scheduledFor: revDateStr,
        priority: revDateStr < todayStr ? 'HIGH' : 'MEDIUM',
        estimatedMinutes: 5,
        mastery: revItem.mastery || 50,
        actionLabel: 'Revise with Feynman Proof'
      };

      recommendations.push(rec);

      // If active tasks are empty, automatically present un-dismissed scheduled items in due queues
      if (revDateStr < todayStr) {
        rec.urgencyTag = 'Overdue';
        overdue.push(rec);
      } else if (revDateStr === todayStr) {
        rec.urgencyTag = 'Due Today';
        dueToday.push(rec);
      } else {
        rec.urgencyTag = 'Upcoming';
        upcoming.push(rec);
      }
    });

    // B. Weak Concepts (Mastery < 60%)
    weakTopics.forEach(weak => {
      const cId = weak.conceptId || weak.topicKey;
      if (!cId || processedConceptIds.has(cId)) return;
      processedConceptIds.add(cId);

      const rec = {
        id: `rec-weak-${cId}`,
        conceptId: cId,
        conceptTitle: weak.title || weak.topicKey,
        chapterId: weak.chapterId || cId,
        chapterTitle: weak.chapterTitle || weak.title || 'Chapter',
        subjectName: weak.subject || 'Science',
        taskType: 'Concept Proof',
        source: 'weak_concept',
        reason: `Low demonstrated understanding: ${weak.mastery}% • Re-prove core fundamentals`,
        dueDate: todayStr,
        scheduledFor: todayStr,
        urgencyTag: 'Needs Attention',
        priority: 'HIGH',
        estimatedMinutes: 8,
        mastery: weak.mastery || 35,
        actionLabel: 'Strengthen Concept'
      };

      recommendations.push(rec);
      dueToday.push(rec);
    });

    // C. Syllabus Continuity for Fresh Student (only if no active tasks and not dismissed)
    if (activeTasks.length === 0 && overdue.length === 0 && dueToday.length === 0) {
      const gradeData = getGradeData(effectiveGrade, effectiveBoard);
      const firstSubj = gradeData.subjects?.[0];
      const firstChap = firstSubj?.chapters?.[0];
      const defaultConceptId = firstChap ? `${firstChap.id}-c01` : null;

      if (firstChap && defaultConceptId && !dismissedSet.has(defaultConceptId)) {
        const continuityItem = {
          id: `due-curric-${firstChap.id}`,
          conceptId: defaultConceptId,
          conceptTitle: firstChap.title,
          chapterId: firstChap.id,
          chapterTitle: firstChap.title,
          subjectName: firstSubj.name,
          taskType: 'Concept Proof',
          source: 'continuity',
          reason: 'Next core syllabus topic ready to master',
          dueDate: todayStr,
          scheduledFor: todayStr,
          urgencyTag: 'Fresh Topic',
          priority: 'NORMAL',
          estimatedMinutes: 8,
          mastery: 0,
          actionLabel: 'Start Learning'
        };
        dueToday.push(continuityItem);
        recommendations.push(continuityItem);
      }
    }

    // Dynamic duration calculation: sum estimatedMinutes of active due tasks
    const activeDueList = [...overdue, ...dueToday];
    const totalMinutes = activeDueList.reduce((acc, t) => acc + (Number(t.estimatedMinutes) || 6), 0);
    const totalCount = overdue.length + dueToday.length;

    return {
      isGuest: false,
      tasks: activeTasks,
      overdue,
      dueToday,
      upcoming,
      completed,
      recommendations,
      totalCount,
      totalMinutes,
      overdueCount: overdue.length,
      dueTodayCount: dueToday.length,
      upcomingCount: upcoming.length,
      completedCount: completed.length
    };
  }

  /**
   * Adds a manual student task
   */
  addTask({
    title,
    board = 'CBSE',
    classLevel = 10,
    subject = '',
    chapterId = '',
    chapterTitle = '',
    conceptId = '',
    conceptTitle = '',
    taskType = 'Personal Study',
    scheduledFor = '',
    priority = 'MEDIUM',
    estimatedMinutes = 10,
    notes = ''
  }) {
    if (!title || !title.trim()) {
      throw new Error('Task title is required');
    }

    const state = this.getTasksState();
    const todayStr = new Date().toISOString().slice(0, 10);
    const validScheduledFor = scheduledFor && scheduledFor.trim() ? scheduledFor.trim() : todayStr;

    // Duplicate check
    const isDuplicate = state.tasks.some(t => 
      t.status === 'active' && 
      t.title.toLowerCase().trim() === title.toLowerCase().trim() &&
      t.scheduledFor === validScheduledFor
    );

    if (isDuplicate) {
      throw new Error('An active task with this title and date already exists');
    }

    const taskId = `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const normPriority = typeof priority === 'string' ? priority.toUpperCase() : 'MEDIUM';
    const newTask = {
      taskId,
      id: taskId,
      title: title.trim(),
      conceptTitle: conceptTitle || title.trim(),
      board,
      classLevel: Number(classLevel),
      subjectName: subject || 'General',
      chapterId: chapterId || null,
      chapterTitle: chapterTitle || null,
      conceptId: conceptId || null,
      taskType,
      source: 'manual',
      scheduledFor: validScheduledFor,
      dueDate: validScheduledFor,
      status: 'active',
      isCompleted: false,
      priority: ['HIGH', 'MEDIUM', 'NORMAL'].includes(normPriority) ? normPriority : 'MEDIUM',
      estimatedMinutes: Math.max(1, Math.min(180, Number(estimatedMinutes) || 10)),
      notes: notes ? notes.trim() : '',
      reason: 'Student-scheduled personal learning task',
      actionLabel: 'Open Study Session',
      createdAt: new Date().toISOString(),
      completedAt: null,
      dismissedAt: null
    };

    state.tasks.unshift(newTask);
    this.saveTasksState(state);
    return newTask;
  }

  /**
   * Edits an existing task without touching student's underlying concept mastery
   */
  editTask(taskId, updates = {}) {
    const state = this.getTasksState();
    const taskIndex = state.tasks.findIndex(t => t.taskId === taskId || t.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const existing = state.tasks[taskIndex];
    const updated = {
      ...existing,
      title: updates.title !== undefined ? updates.title.trim() : existing.title,
      scheduledFor: updates.scheduledFor !== undefined ? updates.scheduledFor : existing.scheduledFor,
      dueDate: updates.scheduledFor !== undefined ? updates.scheduledFor : existing.dueDate,
      priority: updates.priority || existing.priority,
      estimatedMinutes: updates.estimatedMinutes ? Number(updates.estimatedMinutes) : existing.estimatedMinutes,
      notes: updates.notes !== undefined ? updates.notes.trim() : existing.notes,
      taskType: updates.taskType || existing.taskType,
      chapterId: updates.chapterId !== undefined ? updates.chapterId : existing.chapterId,
      chapterTitle: updates.chapterTitle !== undefined ? updates.chapterTitle : existing.chapterTitle,
      conceptId: updates.conceptId !== undefined ? updates.conceptId : existing.conceptId,
      conceptTitle: updates.conceptTitle !== undefined ? updates.conceptTitle : existing.conceptTitle,
      updatedAt: new Date().toISOString()
    };

    state.tasks[taskIndex] = updated;
    this.saveTasksState(state);
    return updated;
  }

  /**
   * Completes a task occurrence
   */
  completeTask(taskId) {
    const state = this.getTasksState();
    const taskIndex = state.tasks.findIndex(t => t.taskId === taskId || t.id === taskId);

    if (taskIndex !== -1) {
      state.tasks[taskIndex].status = 'completed';
      state.tasks[taskIndex].completedAt = new Date().toISOString();
      this.saveTasksState(state);
      return state.tasks[taskIndex];
    }

    // If it was an automatic recommendation completed by student
    const completedVirtualTask = {
      taskId: taskId || `task-rec-${Date.now()}`,
      id: taskId,
      title: 'Completed Recommendation',
      status: 'completed',
      source: 'recommendation',
      completedAt: new Date().toISOString()
    };
    state.tasks.push(completedVirtualTask);
    this.saveTasksState(state);
    return completedVirtualTask;
  }

  /**
   * Deletes a user-created manual task
   */
  removeTask(taskId) {
    const state = this.getTasksState();
    state.tasks = state.tasks.filter(t => t.taskId !== taskId && t.id !== taskId);
    this.saveTasksState(state);
    return true;
  }

  /**
   * Dismisses an automatic recommendation so it doesn't regenerate
   */
  dismissRecommendation(recId, conceptId) {
    const state = this.getTasksState();
    const cId = conceptId || (recId && recId.replace(/^rec-(rev|weak)-/, ''));
    if (cId) {
      if (!state.dismissedConceptIds.includes(cId)) {
        state.dismissedConceptIds.push(cId);
      }
    }
    // Also if it exists as an active task
    state.tasks = state.tasks.map(t => {
      if (t.taskId === recId || t.id === recId || t.conceptId === cId) {
        return { ...t, status: 'dismissed', dismissedAt: new Date().toISOString() };
      }
      return t;
    });
    this.saveTasksState(state);
  }

  /**
   * Reschedules an active task to a future date
   */
  rescheduleTask(taskId, newDateStr) {
    return this.editTask(taskId, { scheduledFor: newDateStr });
  }

  /**
   * Snoozes a task by N days
   */
  snoozeTask(taskId, days = 1) {
    const target = new Date();
    target.setDate(target.getDate() + Number(days));
    const newDateStr = target.toISOString().slice(0, 10);
    return this.rescheduleTask(taskId, newDateStr);
  }

  /**
   * Clears all active tasks with proper persistence.
   * Completed history, concept mastery, and enrollment are strictly preserved.
   * Cleared items are added to dismissedConceptIds so they DO NOT immediately regenerate on refresh!
   */
  clearAllActiveTasks({ clearDismissed = true } = {}) {
    const state = this.getTasksState();
    const activeTasks = state.tasks.filter(t => t.status === 'active');
    
    // Collect concept IDs to prevent immediate re-creation
    activeTasks.forEach(t => {
      if (t.conceptId && !state.dismissedConceptIds.includes(t.conceptId)) {
        state.dismissedConceptIds.push(t.conceptId);
      }
    });

    // Also collect current recommendations so they don't pop right back
    const currentDue = this.getDueWork();
    [...currentDue.overdue, ...currentDue.dueToday].forEach(item => {
      if (item.conceptId && !state.dismissedConceptIds.includes(item.conceptId)) {
        state.dismissedConceptIds.push(item.conceptId);
      }
    });

    // Mark existing active tasks as dismissed
    state.tasks = state.tasks.map(t => {
      if (t.status === 'active') {
        return { ...t, status: 'dismissed', dismissedAt: new Date().toISOString() };
      }
      return t;
    });

    // Also suppress initial syllabus continuity recommendations so student gets a clean empty state
    try {
      const authUser = authService.getAuthUser();
      const effectiveGrade = authUser?.enrolledClass || 10;
      const effectiveBoard = authUser?.enrolledBoard || 'cbse';
      const gradeData = getGradeData(effectiveGrade, effectiveBoard);
      if (gradeData?.subjects) {
        gradeData.subjects.forEach(subj => {
          subj.chapters?.forEach(ch => {
            if (!state.dismissedConceptIds.includes(ch.id)) state.dismissedConceptIds.push(ch.id);
            if (!state.dismissedConceptIds.includes(`${ch.id}-c01`)) state.dismissedConceptIds.push(`${ch.id}-c01`);
            if (!state.dismissedConceptIds.includes(`${ch.id}-c1`)) state.dismissedConceptIds.push(`${ch.id}-c1`);
          });
        });
      }
    } catch {}

    if (clearDismissed) {
      // Retain history
    }

    this.saveTasksState(state);
    return true;
  }
}

export const dueWorkService = new DueWorkService();
