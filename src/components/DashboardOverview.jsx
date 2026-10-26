// GYAAN.AI Personalized Learning Dashboard
// Prioritizes:
// 1. Continue Learning (last studied or current curriculum chapter)
// 2. Recommended Next Concept (grounded in syllabus progression)
// 3. Today's Learning Plan (real due work & spaced repetition, never fabricated)
// 4. Learning Path & Subject Mastery Overview
// 5. Secondary, restrained gamification bar at the bottom

import React from 'react';
import { 
  Play, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Sparkles,
  Flame,
  Layers
} from 'lucide-react';
import { progressService } from '../services/progressService';
import { gamificationService } from '../services/gamificationService';
import { authService } from '../services/authService';
import { soundService } from '../services/soundService';
import { dueWorkService } from '../services/dueWorkService';
import Button from './ui/Button';
import Card from './ui/Card';
import MasteryPill from './ui/MasteryPill';

export default function DashboardOverview({
  selectedGrade = 10,
  selectedBoard,
  gradeData,
  onSelectConceptToProve,
  onOpenProfile,
  onOpenDueWork,
  onNavigateToLearning
}) {
  const isGuest = authService.isGuest();
  const masteryStats = progressService.getOverallMastery();
  const lastStudied = progressService.getLastStudied();
  const gamification = gamificationService.getGamificationState();

  // Due Work items from student task manager
  const dueData = dueWorkService.getDueWork({ grade: selectedGrade, boardId: selectedBoard?.id });
  const dueTasks = isGuest ? [] : (dueData.dueToday || []);

  // Determine current active chapter & subject
  const firstSubject = gradeData?.subjects?.[0];
  const firstChapter = firstSubject?.chapters?.[0];

  const hasValidLastStudied = lastStudied && Number(lastStudied.grade) === Number(selectedGrade);
  const activeChapterTitle = hasValidLastStudied 
    ? lastStudied.chapterTitle 
    : (firstChapter?.title || `Class ${selectedGrade} Curriculum`);
  const activeSubjectName = hasValidLastStudied 
    ? lastStudied.subjectName 
    : (firstSubject?.name || 'Science');
  const activeChapterId = hasValidLastStudied
    ? lastStudied.chapterId
    : (firstChapter?.id || `c${selectedGrade}-ch1`);
  const activeConceptTitle = hasValidLastStudied
    ? (lastStudied.conceptTitle || lastStudied.chapterTitle)
    : (firstChapter?.title || `Fundamental Concepts`);
  const activeConceptId = hasValidLastStudied
    ? (lastStudied.conceptId || firstChapter?.id)
    : (firstChapter?.id || `c${selectedGrade}-intro-concept`);

  // Compute recommended next concept
  const recommendedConcept = {
    title: activeConceptTitle,
    chapterTitle: activeChapterTitle,
    subjectName: activeSubjectName,
    chapterId: activeChapterId,
    conceptId: activeConceptId,
    reason: isGuest 
      ? 'Recommended starting topic for this academic grade.' 
      : 'Next scheduled syllabus milestone based on your active course path.'
  };

  const handleResumeClick = () => {
    soundService.playClick();
    if (onSelectConceptToProve) {
      onSelectConceptToProve({
        id: recommendedConcept.conceptId,
        title: recommendedConcept.title,
        chapterId: recommendedConcept.chapterId,
        chapterTitle: recommendedConcept.chapterTitle,
        classLevel: selectedGrade,
        subject: recommendedConcept.subjectName
      });
    } else if (onNavigateToLearning) {
      onNavigateToLearning();
    }
  };

  const handleDueTaskClick = (task) => {
    soundService.playClick();
    if (onSelectConceptToProve) {
      onSelectConceptToProve({
        id: task.conceptId || task.id,
        title: task.conceptTitle || task.title,
        chapterId: task.chapterId,
        chapterTitle: task.chapterTitle,
        classLevel: selectedGrade,
        subject: task.subjectName
      });
    }
  };

  return (
    <div className="space-y-6 text-[#221E2C]">
      
      {/* 1. HERO SECTION: CONTINUE LEARNING & RECOMMENDED NEXT CONCEPT */}
      <Card className="p-6 sm:p-7 border border-[#E5E0EE] bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Continue Learning Information */}
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#14A89A] bg-[#14A89A]/10 px-2.5 py-0.5 rounded-md border border-[#14A89A]/20">
                Continue Learning
              </span>
              <span className="text-xs text-[#6C667A]">
                {selectedBoard?.shortName || 'CBSE'} • Class {selectedGrade} • {activeSubjectName}
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#221E2C] tracking-tight">
                {activeChapterTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#6C667A] mt-1 leading-relaxed">
                Active topic: <strong className="text-[#221E2C]">{activeConceptTitle}</strong>. 
                Learn through structured lessons, audio explanations, and prove understanding with your own voice.
              </p>
            </div>

            {/* Recommended Concept Context Box */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9FC] border border-[#E5E0EE] text-xs text-[#4A4556]">
              <Sparkles className="w-4 h-4 text-[#F0B44D] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#221E2C]">Recommended Next Step: </span>
                <span>{recommendedConcept.reason}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Button
              variant="primary"
              size="lg"
              iconLeft={Play}
              onClick={handleResumeClick}
              className="w-full sm:w-auto"
            >
              Resume Lesson
            </Button>

            <Button
              variant="outline"
              size="md"
              iconRight={ArrowRight}
              onClick={() => {
                soundService.playClick();
                if (onNavigateToLearning) onNavigateToLearning();
              }}
              className="w-full sm:w-auto"
            >
              Browse Syllabus
            </Button>
          </div>

        </div>
      </Card>

      {/* 2. TODAY'S LEARNING PLAN & REVISION QUEUE (Student-Controlled, Never Fake) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Today's Tasks */}
        <Card className="lg:col-span-2 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E0EE] pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#56358B]" />
              <h3 className="font-bold text-sm sm:text-base text-[#221E2C]">
                Today&apos;s Learning Plan
              </h3>
              {dueTasks.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                  {dueTasks.length} Due
                </span>
              )}
            </div>

            <button
              onClick={() => {
                soundService.playClick();
                if (onOpenDueWork) onOpenDueWork();
              }}
              className="text-xs font-semibold text-[#56358B] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Manage Tasks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Task List or Calm Empty State */}
          {dueTasks.length > 0 ? (
            <div className="space-y-2.5">
              {dueTasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleDueTaskClick(task)}
                  className="p-3.5 rounded-xl border border-[#E5E0EE] bg-[#FAF9FC] hover:bg-white hover:border-[#D2CADF] transition flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-[#6C667A]">
                      <span className="font-semibold text-[#56358B]">{task.subjectName}</span>
                      <span>•</span>
                      <span>{task.chapterTitle}</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-[#221E2C] truncate group-hover:text-[#56358B] transition">
                      {task.title || task.conceptTitle}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                      Revision Due
                    </span>
                    <Button variant="outline" size="xs">
                      Study
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center rounded-xl bg-[#FAF9FC] border border-[#E5E0EE] space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#14A89A] mx-auto" />
              <div className="font-bold text-sm text-[#221E2C]">All clear for today!</div>
              <p className="text-xs text-[#6C667A] max-w-sm mx-auto">
                {isGuest 
                  ? 'Sign in to schedule personal study tasks and track your spaced repetition revision.'
                  : 'You have no pending revisions due today. Choose any concept to strengthen or practice.'}
              </p>
              <div className="pt-2">
                <Button variant="outline" size="sm" onClick={onOpenDueWork}>
                  Open Task Manager
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Right 1 Col: Syllabus Mastery Overview */}
        <Card className="p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#E5E0EE] pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#14A89A]" />
                <h3 className="font-bold text-sm text-[#221E2C]">
                  Syllabus Mastery
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#56358B]">
                {masteryStats.averageMastery}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-2.5 bg-[#FAF9FC] rounded-full overflow-hidden border border-[#E5E0EE]">
                <div 
                  className="h-full bg-[#14A89A] transition-all duration-500 rounded-full"
                  style={{ width: `${Math.max(4, masteryStats.averageMastery)}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#6C667A]">
                <span>Evaluated Concepts: {masteryStats.assessedCount}</span>
                <span>Mastered: {masteryStats.masteredCount}</span>
              </div>
            </div>

            {/* Subject Mastery Breakdown */}
            <div className="space-y-2 pt-2">
              {(gradeData?.subjects || []).slice(0, 3).map((subj) => (
                <div key={subj.id} className="flex items-center justify-between text-xs">
                  <span className="text-[#4A4556] font-medium truncate max-w-[140px]">{subj.name}</span>
                  <MasteryPill 
                    mastery={isGuest ? null : 0} 
                    isAssessed={!isGuest && masteryStats.assessedCount > 0} 
                    size="sm" 
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E5E0EE]">
            <Button
              variant="ghost"
              size="sm"
              iconRight={ArrowRight}
              onClick={onOpenProfile}
              className="w-full text-xs text-[#56358B]"
            >
              View Full Analytics
            </Button>
          </div>
        </Card>

      </div>

      {/* 3. LEARNING PATH OVERVIEW: SUBJECTS IN THIS GRADE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#6C667A]">
            Curriculum Subjects ({selectedBoard?.shortName} • Class {selectedGrade})
          </h3>
          <span className="text-xs text-[#6C667A]">
            {gradeData?.subjects?.length || 0} Core Subjects
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(gradeData?.subjects || []).map((subj) => (
            <Card
              key={subj.id}
              hover
              onClick={() => {
                soundService.playClick();
                if (onNavigateToLearning) onNavigateToLearning(subj);
              }}
              className="p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#56358B] bg-[#56358B]/10 px-2 py-0.5 rounded-md">
                  {subj.chapters?.length || 0} Chapters
                </span>
                <MasteryPill mastery={null} isAssessed={false} size="sm" showIcon={false} />
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#221E2C] group-hover:text-[#56358B]">
                  {subj.name}
                </h4>
                <p className="text-[11px] text-[#6C667A] line-clamp-1 mt-0.5">
                  {subj.chapters?.[0]?.title ? `Ch 1: ${subj.chapters[0].title}` : 'Full Syllabus'}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#14A89A] font-semibold pt-1 border-t border-[#E5E0EE]">
                <span>Explore Subject</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. RESTRAINED GAMIFICATION & STATUS FOOTER */}
      <div className="p-4 rounded-2xl bg-white border border-[#E5E0EE] flex flex-wrap items-center justify-between gap-4 text-xs text-[#6C667A]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#56358B]/10 text-[#56358B] font-black flex items-center justify-center">
            {isGuest ? '1' : gamification.level}
          </div>
          <div>
            <div className="font-bold text-[#221E2C]">
              {isGuest ? 'Guest Explorer' : gamification.title}
            </div>
            <div className="text-[11px]">
              {isGuest ? (
                <span className="text-amber-700">Guest mode • Sign in to save XP and streaks</span>
              ) : (
                <span>Level {gamification.level} • {gamification.xp} XP Earned</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isGuest && (
            <div className="flex items-center gap-1.5 text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>{gamification.streak} Day Streak</span>
            </div>
          )}

          <Button variant="ghost" size="xs" onClick={onOpenProfile}>
            View Badges & Details
          </Button>
        </div>
      </div>

    </div>
  );
}
