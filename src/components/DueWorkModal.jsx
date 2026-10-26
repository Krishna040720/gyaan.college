// GYAAN AI Today's Learning Plan & Student-Controlled Task Manager
// Comprehensive task management combining adaptive spaced repetition, diagnostic follow-ups, and student control
// Features Add/Edit/Complete/Dismiss/Snooze/Clear-All actions with 100% persistent state

import React, { useState, useEffect } from 'react';
import { 
  X, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  Mic, 
  CheckCircle2, 
  Sparkles, 
  LogIn, 
  BookOpen, 
  Layers, 
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  Check,
  CalendarCheck,
  AlertCircle
} from 'lucide-react';
import { dueWorkService } from '../services/dueWorkService';
import { soundService } from '../services/soundService';
import { getGradeData } from '../data/curriculumData';

export default function DueWorkModal({
  isOpen,
  onClose,
  grade = 10,
  boardId = 'cbse',
  onSelectTask,
  onOpenAuth
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'today' | 'overdue' | 'upcoming' | 'completed' | 'recommendations'
  const [_refreshCounter, setRefreshCounter] = useState(0);

  // Modal sub-states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  // Form state for Add/Edit Task
  const [formTitle, setFormTitle] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formChapterId, setFormChapterId] = useState('');
  const [formConceptId, setFormConceptId] = useState('');
  const [formTaskType, setFormTaskType] = useState('Personal Study');
  const [formScheduledFor, setFormScheduledFor] = useState(new Date().toISOString().slice(0, 10));
  const [formPriority, setFormPriority] = useState('MEDIUM');
  const [formMinutes, setFormMinutes] = useState(10);
  const [formNotes, setFormNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Curriculum data for dropdowns
  const gradeData = getGradeData(Number(grade), boardId);
  const subjects = gradeData.subjects || [];
  const selectedSubjObj = subjects.find(s => s.name === formSubject || s.id === formSubject) || subjects[0];
  const chapters = selectedSubjObj?.chapters || [];
  const selectedChapObj = chapters.find(c => c.id === formChapterId) || chapters[0];

  useEffect(() => {
    const unsub = dueWorkService.subscribe(() => {
      setRefreshCounter(c => c + 1);
    });
    return unsub;
  }, []);

  if (!isOpen) return null;

  const dueData = dueWorkService.getDueWork({ grade, boardId });
  const { 
    isGuest, 
    tasks: _tasks = [], 
    overdue = [], 
    dueToday = [], 
    upcoming = [], 
    completed = [], 
    recommendations = [], 
    totalCount = 0, 
    totalMinutes = 0 
  } = dueData;

  const handleTaskClick = (item) => {
    soundService.playClick();
    onClose();
    if (onSelectTask) {
      onSelectTask(item);
    }
  };

  const handleOpenAdd = () => {
    soundService.playClick();
    setEditingTask(null);
    setFormTitle('');
    setFormSubject(subjects[0]?.name || 'Science');
    setFormChapterId(chapters[0]?.id || '');
    setFormConceptId('');
    setFormTaskType('Personal Study');
    setFormScheduledFor(new Date().toISOString().slice(0, 10));
    setFormPriority('MEDIUM');
    setFormMinutes(10);
    setFormNotes('');
    setFormError('');
    setIsAddOpen(true);
  };

  const handleOpenEdit = (task) => {
    soundService.playClick();
    setEditingTask(task);
    setFormTitle(task.title || task.conceptTitle || '');
    setFormSubject(task.subjectName || subjects[0]?.name || 'Science');
    setFormChapterId(task.chapterId || '');
    setFormConceptId(task.conceptId || '');
    setFormTaskType(task.taskType || 'Personal Study');
    setFormScheduledFor(task.scheduledFor || task.dueDate || new Date().toISOString().slice(0, 10));
    setFormPriority(task.priority || 'MEDIUM');
    setFormMinutes(task.estimatedMinutes || 10);
    setFormNotes(task.notes || '');
    setFormError('');
    setIsAddOpen(true);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('Please enter a task title');
      return;
    }

    try {
      if (editingTask) {
        dueWorkService.editTask(editingTask.taskId || editingTask.id, {
          title: formTitle.trim(),
          scheduledFor: formScheduledFor,
          priority: formPriority,
          estimatedMinutes: Number(formMinutes),
          notes: formNotes.trim(),
          taskType: formTaskType,
          chapterId: formChapterId,
          chapterTitle: selectedChapObj?.title || null,
          conceptId: formConceptId || null
        });
      } else {
        dueWorkService.addTask({
          title: formTitle.trim(),
          board: boardId.toUpperCase(),
          classLevel: Number(grade),
          subject: formSubject,
          chapterId: formChapterId,
          chapterTitle: selectedChapObj?.title || '',
          conceptId: formConceptId,
          taskType: formTaskType,
          scheduledFor: formScheduledFor,
          priority: formPriority,
          estimatedMinutes: Number(formMinutes),
          notes: formNotes.trim()
        });
      }

      soundService.playSuccess();
      setIsAddOpen(false);
      setEditingTask(null);
    } catch (err) {
      setFormError(err.message || 'Error saving task');
    }
  };

  const handleComplete = (e, task) => {
    e.stopPropagation();
    soundService.playSuccess();
    dueWorkService.completeTask(task.taskId || task.id);
  };

  const handleRemove = (e, task) => {
    e.stopPropagation();
    soundService.playClick();
    if (task.source === 'manual') {
      dueWorkService.removeTask(task.taskId || task.id);
    } else {
      dueWorkService.dismissRecommendation(task.taskId || task.id, task.conceptId);
    }
  };

  const handleSnooze = (e, task) => {
    e.stopPropagation();
    soundService.playClick();
    dueWorkService.snoozeTask(task.taskId || task.id, 1);
  };

  const handleClearAllConfirm = () => {
    soundService.playClick();
    dueWorkService.clearAllActiveTasks({ clearDismissed: true });
    setIsClearConfirmOpen(false);
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'HIGH':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
            High Priority
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
            Standard Review
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FAF9FC] text-[#777381] border border-[#E9E5EF]">
            Normal
          </span>
        );
    }
  };

  const getUrgencyBadge = (urgencyTag) => {
    if (urgencyTag === 'Overdue') {
      return (
        <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
          <AlertTriangle className="w-3 h-3 text-rose-600" /> Overdue
        </span>
      );
    }
    if (urgencyTag === 'Due Today') {
      return (
        <span className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
          <Clock className="w-3 h-3 text-amber-700" /> Due Today
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
        <Calendar className="w-3 h-3 text-teal-600" /> {urgencyTag || 'Scheduled'}
      </span>
    );
  };

  const renderEmptyState = () => (
    <div className="p-8 text-center rounded-3xl bg-[#FAF9FC] border border-[#E9E5EF] space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
        <CheckCircle2 className="w-6 h-6" />
      </div>
      <h4 className="text-base font-extrabold text-[#25212B]">You're all caught up!</h4>
      <p className="text-xs text-[#777381] max-w-sm mx-auto leading-relaxed">
        Your next revision suggestions will appear as you continue learning. Add personal study goals or explore new concepts below.
      </p>
      <div className="pt-2 flex flex-wrap justify-center gap-2">
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add a Personal Task</span>
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF9FC] text-[#25212B] text-xs font-semibold transition border border-[#E9E5EF]"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );

  const renderTaskList = (items) => {
    if (items.length === 0) {
      return renderEmptyState();
    }

    return (
      <div className="space-y-3">
        {items.map((item) => {
          const isDone = item.status === 'completed';
          return (
            <div
              key={item.taskId || item.id}
              onClick={() => handleTaskClick(item)}
              className={`p-4 sm:p-5 rounded-2xl bg-white border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                isDone 
                  ? 'border-emerald-200 bg-emerald-50/20 opacity-80' 
                  : 'border-[#E9E5EF] hover:border-[#56358B] hover:shadow-md'
              }`}
            >
              {/* Task Details */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {!isDone && getUrgencyBadge(item.urgencyTag)}
                  {isDone && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <Check className="w-3 h-3" /> Completed
                    </span>
                  )}
                  {getPriorityBadge(item.priority)}
                  <span className="text-xs font-semibold text-[#777381] truncate">
                    {item.subjectName} {item.chapterTitle ? `• ${item.chapterTitle}` : ''}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FAF9FC] text-[#56358B] border border-[#E9E5EF]">
                    {item.taskType}
                  </span>
                </div>

                <h4 className={`text-base font-bold transition truncate ${isDone ? 'line-through text-[#777381]' : 'text-[#25212B] group-hover:text-[#56358B]'}`}>
                  {item.title || item.conceptTitle}
                </h4>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#777381]">
                  <span className="text-[#56358B] font-medium flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" /> {item.reason}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 shrink-0" /> ~{item.estimatedMinutes || 10} mins
                  </span>
                  {item.mastery !== undefined && item.mastery !== null && (
                    <>
                      <span>•</span>
                      <span className="font-semibold text-[#25212B]">
                        Mastery: {item.mastery}%
                      </span>
                    </>
                  )}
                </div>

                {item.notes && (
                  <p className="text-[11px] text-[#777381] bg-[#FAF9FC] p-2 rounded-lg border border-[#E9E5EF] italic">
                    "{item.notes}"
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                {!isDone && (
                  <>
                    <button
                      onClick={(e) => handleComplete(e, item)}
                      className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition"
                      title="Mark as Completed"
                    >
                      <Check className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleOpenEdit(item); }}
                      className="p-2 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#777381] hover:text-[#25212B] border border-[#E9E5EF] transition"
                      title="Edit Task"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => handleSnooze(e, item)}
                      className="p-2 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#777381] hover:text-[#25212B] border border-[#E9E5EF] transition"
                      title="Snooze for 1 Day"
                    >
                      <Clock className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => handleRemove(e, item)}
                      className="p-2 rounded-xl bg-[#FAF9FC] hover:bg-rose-50 text-[#777381] hover:text-rose-600 border border-[#E9E5EF] transition"
                      title="Dismiss or Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleTaskClick(item)}
                      className="py-2.5 px-3.5 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Mic className="w-3.5 h-3.5 text-[#16A39A]" />
                      <span>{item.actionLabel || 'Start Session'}</span>
                    </button>
                  </>
                )}

                {isDone && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Finished
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25212B]/45 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-white border border-[#E9E5EF] shadow-2xl p-6 sm:p-7 max-h-[92vh] flex flex-col text-[#25212B] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9FC] text-[#777381] hover:text-[#25212B] hover:bg-[#E9E5EF] transition border border-[#E9E5EF]"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E9E5EF]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#56358B]/10 border border-[#56358B]/20 text-[#56358B] flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#25212B] tracking-tight">
                Today's Learning Plan
              </h3>
              <p className="text-xs text-[#777381]">
                Your revisions, personal tasks, and recommended next steps • Class {grade} • {boardId.toUpperCase()}
              </p>
            </div>
          </div>

          {!isGuest && (
            <div className="flex items-center gap-2 pr-8 sm:pr-0">
              <button
                onClick={handleOpenAdd}
                className="px-3.5 py-2 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>

              {totalCount > 0 && (
                <button
                  onClick={() => setIsClearConfirmOpen(true)}
                  className="px-3 py-2 rounded-xl bg-[#FAF9FC] hover:bg-rose-50 text-[#777381] hover:text-rose-600 text-xs font-semibold transition border border-[#E9E5EF]"
                  title="Clear all active tasks"
                >
                  Clear All
                </button>
              )}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="py-4 overflow-y-auto space-y-4 flex-1 pr-1">
          
          {/* Guest State Prompt */}
          {isGuest ? (
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="text-base font-extrabold text-[#25212B]">
                Personalized Learning Schedule
              </h4>
              <p className="text-xs text-amber-900/90 max-w-md mx-auto leading-relaxed">
                Sign in with your scholar profile to unlock automatic spaced repetition (SM-2), diagnostic prerequisite tracking, and customized daily revision queues.
              </p>
              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenAuth) onOpenAuth();
                  }}
                  className="py-2.5 px-5 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white font-bold text-xs transition flex items-center gap-2 shadow-sm"
                >
                  <LogIn className="w-4 h-4 text-[#16A39A]" />
                  <span>Sign In to Save Progress</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Daily Overview Bar */}
              <div className="p-3.5 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 font-bold text-[#25212B]">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#56358B]" />
                    <span>{totalCount} Active Task{totalCount !== 1 ? 's' : ''}</span>
                  </span>
                  {completed.length > 0 && (
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      ✓ {completed.length} Completed
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[#777381]">
                  <Clock className="w-3.5 h-3.5 text-[#16A39A]" />
                  <span>Estimated Total: <strong className="text-[#25212B]">~{totalMinutes} mins</strong></span>
                </div>
              </div>

              {/* Segmented Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-[#FAF9FC] p-1 rounded-xl border border-[#E9E5EF] text-xs font-bold overflow-x-auto">
                <button
                  onClick={() => { soundService.playClick(); setActiveTab('all'); }}
                  className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
                    activeTab === 'all' ? 'bg-[#56358B] text-white shadow-xs' : 'text-[#777381] hover:text-[#25212B]'
                  }`}
                >
                  All Active ({totalCount})
                </button>
                <button
                  onClick={() => { soundService.playClick(); setActiveTab('today'); }}
                  className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
                    activeTab === 'today' ? 'bg-[#56358B] text-white shadow-xs' : 'text-[#777381] hover:text-[#25212B]'
                  }`}
                >
                  Due Today ({dueToday.length})
                </button>
                <button
                  onClick={() => { soundService.playClick(); setActiveTab('overdue'); }}
                  className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
                    activeTab === 'overdue' ? 'bg-rose-600 text-white shadow-xs' : 'text-[#777381] hover:text-[#25212B]'
                  }`}
                >
                  Overdue ({overdue.length})
                </button>
                <button
                  onClick={() => { soundService.playClick(); setActiveTab('upcoming'); }}
                  className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
                    activeTab === 'upcoming' ? 'bg-[#16A39A] text-white shadow-xs' : 'text-[#777381] hover:text-[#25212B]'
                  }`}
                >
                  Upcoming ({upcoming.length})
                </button>
                <button
                  onClick={() => { soundService.playClick(); setActiveTab('completed'); }}
                  className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
                    activeTab === 'completed' ? 'bg-emerald-600 text-white shadow-xs' : 'text-[#777381] hover:text-[#25212B]'
                  }`}
                >
                  Completed ({completed.length})
                </button>
                {recommendations.length > 0 && (
                  <button
                    onClick={() => { soundService.playClick(); setActiveTab('recommendations'); }}
                    className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
                      activeTab === 'recommendations' ? 'bg-[#56358B] text-white shadow-xs' : 'text-[#777381] hover:text-[#25212B]'
                    }`}
                  >
                    Recommended ({recommendations.length})
                  </button>
                )}
              </div>

              {/* Task Cards List */}
              {activeTab === 'all' && renderTaskList([...overdue, ...dueToday])}
              {activeTab === 'today' && renderTaskList(dueToday)}
              {activeTab === 'overdue' && renderTaskList(overdue)}
              {activeTab === 'upcoming' && renderTaskList(upcoming)}
              {activeTab === 'completed' && renderTaskList(completed)}
              {activeTab === 'recommendations' && renderTaskList(recommendations)}
            </>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#E9E5EF] flex items-center justify-between text-xs text-[#777381]">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-[#56358B]" />
            Spaced repetition and active recall reinforce long-term mastery.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#25212B] font-semibold transition border border-[#E9E5EF]"
          >
            Close
          </button>
        </div>

      </div>

      {/* Add / Edit Task Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#E9E5EF] shadow-2xl p-6 text-[#25212B] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E9E5EF] pb-3">
              <h4 className="text-base font-extrabold text-[#25212B]">
                {editingTask ? 'Edit Learning Task' : 'Add New Task'}
              </h4>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#FAF9FC] text-[#777381]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveTask} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#25212B] mb-1">Task Title *</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Revise Chemical Reactions & Balancing"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5EF] focus:border-[#56358B] focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#25212B] mb-1">Subject</label>
                  <select
                    value={formSubject}
                    onChange={(e) => {
                      setFormSubject(e.target.value);
                      const sub = subjects.find(s => s.name === e.target.value);
                      if (sub?.chapters?.[0]) setFormChapterId(sub.chapters[0].id);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E5EF] bg-white"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#25212B] mb-1">Chapter (Optional)</label>
                  <select
                    value={formChapterId}
                    onChange={(e) => setFormChapterId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E5EF] bg-white truncate"
                  >
                    <option value="">General (No chapter link)</option>
                    {chapters.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#25212B] mb-1">Task Type</label>
                  <select
                    value={formTaskType}
                    onChange={(e) => setFormTaskType(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-[#E9E5EF] bg-white"
                  >
                    <option value="Personal Study">Personal Study</option>
                    <option value="Oral Recall">Oral Recall</option>
                    <option value="Concept Proof">Concept Proof</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Revision Test">Revision Test</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#25212B] mb-1">Priority</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-[#E9E5EF] bg-white"
                  >
                    <option value="HIGH">High Priority</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="NORMAL">Normal</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#25212B] mb-1">Est. Minutes</label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={formMinutes}
                    onChange={(e) => setFormMinutes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9E5EF]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#25212B] mb-1">Scheduled Date</label>
                <input
                  type="date"
                  value={formScheduledFor}
                  onChange={(e) => setFormScheduledFor(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E9E5EF]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#25212B] mb-1">Personal Notes / Goals</label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  rows="2"
                  placeholder="e.g. Focus on balancing oxygen atoms first..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E9E5EF] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#FAF9FC] border border-[#E9E5EF] text-[#777381] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white font-bold transition shadow-xs"
                >
                  {editingTask ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Dialog */}
      {isClearConfirmOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-3xl bg-white border border-[#E9E5EF] shadow-2xl p-6 text-[#25212B] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="text-base font-extrabold text-[#25212B]">Clear All Active Tasks?</h4>
              <p className="text-xs text-[#777381] leading-relaxed">
                All currently active task occurrences will be cleared from your schedule.
                Completed learning history, concept mastery, and enrollment remain completely preserved.
                These tasks will not automatically regenerate on refresh.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setIsClearConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#FAF9FC] border border-[#E9E5EF] text-[#777381] font-semibold text-xs"
              >
                Keep Tasks
              </button>
              <button
                onClick={handleClearAllConfirm}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-xs"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
