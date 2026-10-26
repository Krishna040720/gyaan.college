// GYAAN.AI Root Application
// Incorporates canonical 7-destination Information Architecture:
// Desktop Sidebar · Top Navigation · Mobile Bottom Navigation · Chapter Workspace · Dashboard

import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/navigation/Sidebar';
import BottomNav from './components/navigation/BottomNav';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import ClassOverview from './components/ClassOverview';
import LectureTheater from './components/LectureTheater';
import ConceptGraphModal from './components/ConceptGraphModal';
import WhyGyanModal from './components/WhyGyanModal';
import GeminiSettingsModal from './components/GeminiSettingsModal';
import StudentProfileModal from './components/StudentProfileModal';
import GlobalSearchModal from './components/GlobalSearchModal';
import AuthModal from './components/AuthModal';
import ChangeEnrollmentModal from './components/ChangeEnrollmentModal';
import DueWorkModal from './components/DueWorkModal';
import VoiceSettingsModal from './components/voice/VoiceSettingsModal';
import ChapterNotesView from './components/notes/ChapterNotesView';
import ConceptMindMap from './components/concept/ConceptMindMap';
import ChapterUnitsView from './components/concept/ChapterUnitsView';
import VoiceDebugAdmin from './components/admin/VoiceDebugAdmin';
import { curriculumHierarchyService } from './services/curriculumHierarchyService';
import { 
  FileText, 
  GitBranch, 
  Play, 
  BookOpen, 
  Layers, 
  List, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { getGradeData, validateContentContext } from './data/curriculumData';
import { BOARDS } from './data/boardsRegistry';
import { soundService } from './services/soundService';
import { gamificationService } from './services/gamificationService';
import { authService } from './services/authService';

export default function App() {
  const currentAuth = authService.getAuthUser();
  const currentIsGuest = authService.isGuest();

  // If authenticated, academic context is strictly locked to enrolledClass & enrolledBoard
  const initialGrade = (!currentIsGuest && (currentAuth?.enrolledClass || currentAuth?.classLevel))
    ? Number(currentAuth.enrolledClass || currentAuth.classLevel)
    : Number(localStorage.getItem('gyan_grade') || 10);
  const initialBoard = (!currentIsGuest && (currentAuth?.enrolledBoard || currentAuth?.boardId))
    ? (currentAuth.enrolledBoard || currentAuth.boardId).toLowerCase()
    : (localStorage.getItem('gyan_board') || 'cbse');
  const initialGradeData = getGradeData(initialGrade, initialBoard);

  const [selectedBoardId, setSelectedBoardId] = useState(initialBoard);
  const selectedBoard = BOARDS.find(b => b.id === selectedBoardId) || BOARDS[0];
  const isUpBoard = selectedBoard.id === 'up_board';

  const [selectedGrade, setSelectedGrade] = useState(initialGrade);
  const [gradeData, setGradeData] = useState(initialGradeData);
  const [selectedSubject, setSelectedSubject] = useState(initialGradeData.subjects?.[0] || null);
  const [selectedChapter, setSelectedChapter] = useState(initialGradeData.subjects?.[0]?.chapters?.[0] || null);
  const [selectedConcept, setSelectedConcept] = useState(null);

  // Canonical Navigation View State
  // 'overview' | 'mylearning' | 'notes' | 'mindmap'
  const [activeNavView, setActiveNavView] = useState('overview');
  // Chapter Workspace Tab: 'learn' | 'mindmap' | 'notes' | 'practice' | 'tests'
  const [lectureTab, setLectureTab] = useState('learn');
  const [mindmapMode, setMindmapMode] = useState('tree'); // 'tree' | 'units'

  // Concept Graph Modal state
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);
  const [graphModalConcept, setGraphModalConcept] = useState(null);

  // Gamification state
  const [gamState, setGamState] = useState(() => {
    return gamificationService.getGamificationState();
  });

  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modal states
  const [isWhyGyanOpen, setIsWhyGyanOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChangeEnrollmentOpen, setIsChangeEnrollmentOpen] = useState(false);
  const [isDueWorkOpen, setIsDueWorkOpen] = useState(false);
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);

  // Subscribe to auth state updates (sign in, sign out)
  useEffect(() => {
    const unsubscribe = authService.subscribe((user) => {
      setGamState(gamificationService.getGamificationState());
      if (user && !user.isGuest) {
        const enrolledClass = Number(user.enrolledClass || user.classLevel || user.grade || 10);
        const enrolledBoardId = (user.enrolledBoard || user.boardId || 'cbse').toLowerCase();
        setSelectedGrade(enrolledClass);
        setSelectedBoardId(enrolledBoardId);
        const freshData = getGradeData(enrolledClass, enrolledBoardId);
        setGradeData(freshData);
        const firstSubj = freshData.subjects?.[0] || null;
        const firstChap = firstSubj?.chapters?.[0] || null;
        setSelectedSubject(firstSubj);
        setSelectedChapter(firstChap);
        setSelectedConcept(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Global Ctrl+K / CMD+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation Item Selection Handler
  const handleSelectNavView = useCallback((viewId) => {
    soundService.playClick();
    if (viewId === 'revision') {
      setIsDueWorkOpen(true);
      return;
    }
    if (viewId === 'progress') {
      setIsProfileOpen(true);
      return;
    }
    if (viewId === 'practice') {
      setActiveNavView('mylearning');
      setLectureTab('practice');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }
    if (viewId === 'mindmap') {
      setActiveNavView('mindmap');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (viewId === 'notes') {
      setActiveNavView('notes');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (viewId === 'mylearning') {
      setActiveNavView('mylearning');
      setLectureTab('learn');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }
    setActiveNavView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenNotes = useCallback((chapter, subject) => {
    soundService.playClick();
    if (subject) setSelectedSubject(subject);
    if (chapter) setSelectedChapter(chapter);
    setActiveNavView('notes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenMindmap = useCallback((chapter, subject) => {
    soundService.playClick();
    if (subject) setSelectedSubject(subject);
    if (chapter) setSelectedChapter(chapter);
    setActiveNavView('mindmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectSubject = useCallback((subj) => {
    soundService.playClick();
    setSelectedSubject(subj);
    if (subj?.chapters?.length > 0) {
      setSelectedChapter(subj.chapters[0]);
    }
    setSelectedConcept(null);
  }, []);

  // Controlled Enrollment Change Confirmation Flow
  const handleChangeEnrollment = useCallback(({ board, classLevel }) => {
    soundService.playSuccess();
    authService.updateEnrollment({ board, classLevel });
    const cleanClass = Number(classLevel || 10);
    const cleanBoardId = (board || 'cbse').toLowerCase();

    setSelectedGrade(cleanClass);
    setSelectedBoardId(cleanBoardId);
    localStorage.setItem('gyan_grade', cleanClass.toString());
    localStorage.setItem('gyan_board', cleanBoardId);

    const freshData = getGradeData(cleanClass, cleanBoardId);
    setGradeData(freshData);
    const firstSubj = freshData.subjects?.[0] || null;
    const firstChap = firstSubj?.chapters?.[0] || null;
    setSelectedSubject(firstSubj);
    setSelectedChapter(firstChap);
    setSelectedConcept(null);
  }, []);

  // Board switch (Restricted for authenticated scholars, open for guests)
  const handleSelectBoard = useCallback((boardId) => {
    soundService.playClick();
    if (!authService.isGuest()) {
      setIsChangeEnrollmentOpen(true);
      return;
    }

    setSelectedBoardId(boardId);
    localStorage.setItem('gyan_board', boardId);

    const freshData = getGradeData(selectedGrade, boardId);
    setGradeData(freshData);
    const firstSubj = freshData.subjects?.[0] || null;
    const firstChap = firstSubj?.chapters?.[0] || null;
    setSelectedSubject(firstSubj);
    setSelectedChapter(firstChap);
    setSelectedConcept(null);
  }, [selectedGrade]);

  // Grade switch (Restricted for authenticated scholars, open for guests)
  const handleSelectGrade = useCallback((g) => {
    soundService.playClick();
    if (!authService.isGuest()) {
      setIsChangeEnrollmentOpen(true);
      return;
    }

    setSelectedGrade(g);
    localStorage.setItem('gyan_grade', g.toString());

    const freshData = getGradeData(g, selectedBoardId);
    setGradeData(freshData);
    const firstSubj = freshData.subjects?.[0] || null;
    const firstChap = firstSubj?.chapters?.[0] || null;

    if (firstChap) {
      validateContentContext(firstChap, { classLevel: g });
    }

    setSelectedSubject(firstSubj);
    setSelectedChapter(firstChap);
    setSelectedConcept(null);
  }, [selectedBoardId]);

  const handleAddXp = useCallback((_amount) => {
    const updated = gamificationService.getGamificationState();
    setGamState(updated);
  }, []);

  const handleSelectChapter = useCallback((chapter, subject) => {
    if (chapter) {
      validateContentContext(chapter, { classLevel: selectedGrade });
    }
    setSelectedChapter(chapter);
    if (subject) setSelectedSubject(subject);
    setSelectedConcept(null);
    setActiveNavView('mylearning');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }, [selectedGrade]);

  const handleSelectConceptToProve = useCallback((concept) => {
    soundService.playClick();
    setSelectedConcept(concept);
    setActiveNavView('mylearning');
    setLectureTab('learn');

    // If concept belongs to a specific chapter, synchronize chapter
    if (concept?.chapterId) {
      for (const subj of gradeData.subjects || []) {
        const foundCh = subj.chapters?.find(c => 
          c.id === concept.chapterId || 
          c.title.toLowerCase().includes(concept.chapterTitle?.toLowerCase() || '')
        );
        if (foundCh) {
          setSelectedSubject(subj);
          setSelectedChapter(foundCh);
          break;
        }
      }
    }

    window.scrollTo({ top: 140, behavior: 'smooth' });
  }, [gradeData.subjects]);

  const handleSelectDueTask = useCallback((item) => {
    soundService.playClick();
    setIsDueWorkOpen(false);

    let matchedChapter = null;
    let matchedSubject = null;
    for (const subj of gradeData.subjects || []) {
      const foundCh = subj.chapters?.find(c => 
        c.id === item.chapterId || 
        c.title.toLowerCase().includes(item.chapterTitle?.toLowerCase() || '')
      );
      if (foundCh) {
        matchedSubject = subj;
        matchedChapter = foundCh;
        break;
      }
    }

    if (!matchedChapter) {
      matchedSubject = gradeData.subjects?.[0] || null;
      matchedChapter = matchedSubject?.chapters?.[0] || null;
    }

    if (matchedSubject) setSelectedSubject(matchedSubject);
    if (matchedChapter) setSelectedChapter(matchedChapter);

    setSelectedConcept({
      id: item.conceptId,
      title: item.conceptTitle,
      chapterId: item.chapterId || matchedChapter?.id,
      chapterTitle: item.chapterTitle || matchedChapter?.title,
      subject: item.subjectName || matchedSubject?.name,
      classLevel: selectedGrade
    });

    setActiveNavView('mylearning');
    setLectureTab('learn');
    window.scrollTo({ top: 140, behavior: 'smooth' });
  }, [gradeData.subjects, selectedGrade]);

  const handleOpenGraphModal = useCallback((concept) => {
    setGraphModalConcept(concept || selectedConcept);
    setIsGraphModalOpen(true);
  }, [selectedConcept]);

  const handleSelectConceptFromGraph = useCallback((targetConcept) => {
    setIsGraphModalOpen(false);
    handleSelectConceptToProve(targetConcept);
  }, [handleSelectConceptToProve]);

  const handleSearchResultSelect = useCallback((result) => {
    const targetBoardId = result.board?.id || selectedBoardId;
    const targetGrade = result.grade || selectedGrade;

    if (!authService.isGuest()) {
      const user = authService.getAuthUser();
      if (user && (Number(targetGrade) !== Number(user.enrolledClass) || targetBoardId.toLowerCase() !== user.boardId.toLowerCase())) {
        setIsChangeEnrollmentOpen(true);
        return;
      }
    }

    setSelectedBoardId(targetBoardId);
    setSelectedGrade(targetGrade);
    localStorage.setItem('gyan_board', targetBoardId);
    localStorage.setItem('gyan_grade', targetGrade.toString());

    const freshData = getGradeData(targetGrade, targetBoardId);
    setGradeData(freshData);

    const matchedSubj = freshData.subjects?.find(s => 
      s.name.toLowerCase().includes(result.subject?.name?.toLowerCase()) || 
      result.subject?.name?.toLowerCase().includes(s.name.toLowerCase())
    ) || freshData.subjects?.[0];

    setSelectedSubject(matchedSubj);

    const matchedChapter = matchedSubj?.chapters?.find(c => 
      c.title.toLowerCase().includes(result.title?.toLowerCase())
    ) || matchedSubj?.chapters?.[0] || null;

    setSelectedChapter(matchedChapter);
    setSelectedConcept(null);
    setActiveNavView('mylearning');
    setLectureTab('learn');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }, [selectedBoardId, selectedGrade]);

  const handleAuthSuccess = (user) => {
    if (user?.grade || user?.enrolledClass) {
      const g = Number(user.enrolledClass || user.grade);
      const b = (user.enrolledBoard || user.boardId || 'cbse').toLowerCase();
      setSelectedGrade(g);
      setSelectedBoardId(b);
      const freshData = getGradeData(g, b);
      setGradeData(freshData);
      setSelectedSubject(freshData.subjects?.[0] || null);
      setSelectedChapter(freshData.subjects?.[0]?.chapters?.[0] || null);
    }
    setGamState(gamificationService.getGamificationState());
  };

  return (
    <div className="min-h-screen bg-[#F7F5FA] text-[#221E2C] flex antialiased">
      
      {/* 1. Desktop Sidebar Navigation (Hidden on Mobile) */}
      <Sidebar
        activeView={activeNavView}
        onSelectView={handleSelectNavView}
        selectedBoard={selectedBoard}
        selectedGrade={selectedGrade}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenSettings={() => setIsVoiceSettingsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenChangeEnrollment={() => setIsChangeEnrollmentOpen(true)}
        onOpenWhyGyan={() => setIsWhyGyanOpen(true)}
      />

      {/* 2. Main Application Canvas */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        
        {/* Top Header Navbar */}
        <Navbar
          selectedBoard={selectedBoard}
          onSelectBoard={handleSelectBoard}
          selectedGrade={selectedGrade}
          onSelectGrade={handleSelectGrade}
          xp={gamState.xp}
          streak={gamState.streak}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onOpenSettings={() => setIsVoiceSettingsOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenChangeEnrollment={() => setIsChangeEnrollmentOpen(true)}
          onOpenDueWork={() => setIsDueWorkOpen(true)}
        />

        {/* Main View Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
          
          {/* VIEW: OVERVIEW (DASHBOARD) */}
          {activeNavView === 'overview' && (
            <div className="space-y-8">
              <DashboardOverview
                selectedGrade={selectedGrade}
                selectedBoard={selectedBoard}
                gradeData={gradeData}
                onSelectConceptToProve={handleSelectConceptToProve}
                onOpenProfile={() => setIsProfileOpen(true)}
                onOpenDueWork={() => setIsDueWorkOpen(true)}
                onNavigateToLearning={(subj) => {
                  if (subj) setSelectedSubject(subj);
                  setActiveNavView('mylearning');
                  setLectureTab('learn');
                }}
              />

              {/* Quick Class Curriculum Navigator */}
              <section className="pt-2 border-t border-[#E5E0EE]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-base text-[#221E2C]">Quick Syllabus Navigator</h3>
                    <p className="text-xs text-[#6C667A]">Select any subject or chapter to open the Chapter Workspace</p>
                  </div>
                  <button
                    onClick={() => {
                      soundService.playClick();
                      setActiveNavView('mylearning');
                      setLectureTab('learn');
                    }}
                    className="text-xs font-bold text-[#56358B] hover:underline cursor-pointer"
                  >
                    Open Workspace →
                  </button>
                </div>

                <ClassOverview
                  gradeData={gradeData}
                  selectedBoard={selectedBoard}
                  selectedSubject={selectedSubject}
                  onSelectSubject={handleSelectSubject}
                  selectedChapter={selectedChapter}
                  onSelectChapter={handleSelectChapter}
                  onOpenNotes={handleOpenNotes}
                  onOpenMindmap={handleOpenMindmap}
                />
              </section>
            </div>
          )}

          {/* VIEW: MY LEARNING (CHAPTER WORKSPACE) */}
          {activeNavView === 'mylearning' && (
            <div className="space-y-8">
              {/* Flagship: Active Chapter Workspace with 5 Tabs */}
              {selectedChapter && (
                <section>
                  <LectureTheater
                    chapter={selectedChapter}
                    grade={selectedGrade}
                    subject={selectedSubject}
                    board={selectedBoard}
                    soundEnabled={soundEnabled}
                    onAddXp={handleAddXp}
                    selectedConcept={selectedConcept}
                    onSelectConcept={setSelectedConcept}
                    onOpenGraphModal={handleOpenGraphModal}
                    initialTab={lectureTab}
                  />
                </section>
              )}

              {/* Hierarchical Curriculum Browser: Subjects & All Chapters */}
              <section className="pt-2 border-t border-[#E5E0EE]">
                <ClassOverview
                  gradeData={gradeData}
                  selectedBoard={selectedBoard}
                  selectedSubject={selectedSubject}
                  onSelectSubject={handleSelectSubject}
                  selectedChapter={selectedChapter}
                  onSelectChapter={handleSelectChapter}
                  onOpenNotes={handleOpenNotes}
                  onOpenMindmap={handleOpenMindmap}
                />
              </section>
            </div>
          )}

          {/* VIEW: NOTES (DEDICATED FULL-PAGE TEXTBOOK NOTES) */}
          {activeNavView === 'notes' && (
            <div className="space-y-6">
              {/* Clean Top Navigation Bar for Notes */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E0EE] shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0EE] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#56358B]/10 flex items-center justify-center text-[#56358B]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[#221E2C] flex items-center gap-2">
                        <span>{selectedSubject?.name} Notes</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#56358B]/10 text-[#56358B]">
                          Class {selectedGrade} • {selectedBoard?.shortName}
                        </span>
                      </h2>
                      <p className="text-xs text-[#6C667A]">
                        Study notes based on the NCERT/CBSE syllabus
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        soundService.playClick();
                        setActiveNavView('mindmap');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF9FC] hover:bg-[#14A89A]/10 text-[#14A89A] border border-[#E5E0EE] transition cursor-pointer"
                      title="Open Mind Map for this Chapter"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Mind Map</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundService.playClick();
                        setActiveNavView('mylearning');
                        setLectureTab('learn');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF9FC] hover:bg-[#56358B]/10 text-[#56358B] border border-[#E5E0EE] transition cursor-pointer"
                      title="Watch Video Lecture"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Lecture Video</span>
                    </button>
                  </div>
                </div>

                {/* Subject Selector Ribbon */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#6C667A]">
                    Select Subject:
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {gradeData.subjects?.map((subj) => {
                      const isSubjSelected = selectedSubject?.id === subj.id;
                      return (
                        <button
                          key={subj.id}
                          type="button"
                          onClick={() => handleSelectSubject(subj)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer whitespace-nowrap ${
                            isSubjSelected
                              ? 'bg-[#56358B] text-white border-[#56358B] shadow-xs'
                              : 'bg-[#FAF9FC] text-[#221E2C] border-[#E5E0EE] hover:border-[#D2CADF]'
                          }`}
                        >
                          {subj.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Chapter Selector Ribbon: Shows ALL chapters of selected subject */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#6C667A]">
                    <span className="uppercase tracking-wider">
                      All Chapters in {selectedSubject?.name} ({selectedSubject?.chapters?.length || 0} Available):
                    </span>
                    <span className="text-[#56358B] truncate max-w-[200px]">
                      Selected: {selectedChapter?.title || selectedSubject?.chapters?.[0]?.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                    {selectedSubject?.chapters?.map((ch, idx) => {
                      const activeChapId = selectedChapter?.id || selectedSubject?.chapters?.[0]?.id;
                      const isChapActive = activeChapId === ch.id;
                      return (
                        <button
                          key={ch.id || idx}
                          type="button"
                          onClick={() => {
                            soundService.playClick();
                            setSelectedChapter(ch);
                            setSelectedConcept(null);
                          }}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border cursor-pointer shrink-0 ${
                            isChapActive
                              ? 'bg-[#56358B] text-white border-[#56358B] shadow-xs'
                              : 'bg-white text-[#221E2C] border-[#E5E0EE] hover:border-[#D2CADF]'
                          }`}
                        >
                          <span>{ch.chapterNumber ? `Ch ${ch.chapterNumber}:` : `Ch ${idx + 1}:`}</span>
                          <span className="truncate max-w-[160px] sm:max-w-[220px]">{ch.title.replace(/^Chapter\s*\d+:\s*/i, '')}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Dedicated Chapter Notes Document */}
              <div className="bg-white rounded-3xl border border-[#E5E0EE] p-4 sm:p-8 shadow-xs">
                <ChapterNotesView
                  chapter={selectedChapter || selectedSubject?.chapters?.[0]}
                  grade={selectedGrade}
                  subject={selectedSubject}
                  board={selectedBoard}
                  onProveConcept={handleSelectConceptToProve}
                />
              </div>
            </div>
          )}

          {/* VIEW: MIND MAP (DEDICATED FULL-PAGE HIERARCHY & CONCEPT TREE) */}
          {activeNavView === 'mindmap' && (
            <div className="space-y-6">
              {/* Clean Top Navigation Bar for Mindmap */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E0EE] shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0EE] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#14A89A]/10 flex items-center justify-center text-[#14A89A]">
                      <GitBranch className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[#221E2C] flex items-center gap-2">
                        <span>{selectedSubject?.name} Mind Map</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#14A89A]/10 text-[#14A89A]">
                          Class {selectedGrade} • {selectedBoard?.shortName}
                        </span>
                      </h2>
                      <p className="text-xs text-[#6C667A]">
                        Hierarchical curriculum knowledge tree & unit breakdown
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Mode Switcher: Tree vs Units */}
                    <div className="flex items-center p-0.5 rounded-xl bg-[#FAF9FC] border border-[#E5E0EE]">
                      <button
                        type="button"
                        onClick={() => {
                          soundService.playClick();
                          setMindmapMode('tree');
                        }}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          mindmapMode === 'tree'
                            ? 'bg-white text-[#56358B] shadow-2xs font-bold'
                            : 'text-[#6C667A] hover:text-[#221E2C]'
                        }`}
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>Branching Tree</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          soundService.playClick();
                          setMindmapMode('units');
                        }}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          mindmapMode === 'units'
                            ? 'bg-white text-[#56358B] shadow-2xs font-bold'
                            : 'text-[#6C667A] hover:text-[#221E2C]'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Units & Topics</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        soundService.playClick();
                        setActiveNavView('notes');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF9FC] hover:bg-[#56358B]/10 text-[#56358B] border border-[#E5E0EE] transition cursor-pointer"
                      title="Read Chapter Notes"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Read Notes</span>
                    </button>
                  </div>
                </div>

                {/* Subject Selector Ribbon */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#6C667A]">
                    Select Subject:
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {gradeData.subjects?.map((subj) => {
                      const isSubjSelected = selectedSubject?.id === subj.id;
                      return (
                        <button
                          key={subj.id}
                          type="button"
                          onClick={() => handleSelectSubject(subj)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer whitespace-nowrap ${
                            isSubjSelected
                              ? 'bg-[#14A89A] text-white border-[#14A89A] shadow-xs'
                              : 'bg-[#FAF9FC] text-[#221E2C] border-[#E5E0EE] hover:border-[#D2CADF]'
                          }`}
                        >
                          {subj.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Chapter Selector Ribbon */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#6C667A]">
                    <span className="uppercase tracking-wider">
                      All Chapters in {selectedSubject?.name} ({selectedSubject?.chapters?.length || 0} Available):
                    </span>
                    <span className="text-[#14A89A] truncate max-w-[200px]">
                      Selected: {selectedChapter?.title || selectedSubject?.chapters?.[0]?.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                    {selectedSubject?.chapters?.map((ch, idx) => {
                      const activeChapId = selectedChapter?.id || selectedSubject?.chapters?.[0]?.id;
                      const isChapActive = activeChapId === ch.id;
                      return (
                        <button
                          key={ch.id || idx}
                          type="button"
                          onClick={() => {
                            soundService.playClick();
                            setSelectedChapter(ch);
                            setSelectedConcept(null);
                          }}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border cursor-pointer shrink-0 ${
                            isChapActive
                              ? 'bg-[#14A89A] text-white border-[#14A89A] shadow-xs'
                              : 'bg-white text-[#221E2C] border-[#E5E0EE] hover:border-[#D2CADF]'
                          }`}
                        >
                          <span>{ch.chapterNumber ? `Ch ${ch.chapterNumber}:` : `Ch ${idx + 1}:`}</span>
                          <span className="truncate max-w-[160px] sm:max-w-[220px]">{ch.title.replace(/^Chapter\s*\d+:\s*/i, '')}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mindmap or Units Display Container */}
              <div className="bg-white rounded-3xl border border-[#E5E0EE] overflow-hidden shadow-xs">
                {mindmapMode === 'tree' ? (
                  <ConceptMindMap
                    chapter={selectedChapter || selectedSubject?.chapters?.[0]}
                    context={{
                      boardId: selectedBoard?.id,
                      classNum: selectedGrade,
                      subjectId: selectedSubject?.id
                    }}
                    selectedConceptId={selectedConcept?.id}
                    onSelectConcept={handleSelectConceptToProve}
                    onOpenNotes={() => setActiveNavView('notes')}
                    onOpenPractice={() => {
                      setActiveNavView('mylearning');
                      setLectureTab('practice');
                    }}
                  />
                ) : (
                  <div className="p-4 sm:p-6">
                    <ChapterUnitsView
                      hierarchy={curriculumHierarchyService.getChapterHierarchy(
                        selectedChapter || selectedSubject?.chapters?.[0],
                        {
                          boardId: selectedBoard?.id,
                          classNum: selectedGrade,
                          subjectId: selectedSubject?.id
                        }
                      )}
                      activeNodeId={selectedConcept?.id}
                      onSelectTopic={handleSelectConceptToProve}
                      onProveConcept={handleSelectConceptToProve}
                      onOpenNotes={() => setActiveNavView('notes')}
                      onOpenPractice={() => {
                        setActiveNavView('mylearning');
                        setLectureTab('practice');
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: VOICE DEBUG (ADMIN VOICE QUERY TRACE LOGS - RESTRICTED TO ROLE ADMIN) */}
          {activeNavView === 'voice_debug' && (
            authService.isAdmin() ? (
              <VoiceDebugAdmin onClose={() => setActiveNavView('overview')} />
            ) : (
              <div className="p-8 max-w-lg mx-auto my-12 bg-white rounded-3xl border border-rose-200 text-center space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto font-bold text-lg">
                  403
                </div>
                <h3 className="font-bold text-lg text-[#221E2C]">Access Restricted</h3>
                <p className="text-xs text-[#6C667A]">
                  Voice AI debug logs and telemetry inspection are restricted to administrators only.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      soundService.playSuccess();
                      authService.grantAdminAccess();
                      setActiveNavView('voice_debug');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    Grant Admin Access Now
                  </button>
                  <button
                    onClick={() => setActiveNavView('overview')}
                    className="px-4 py-2 rounded-xl bg-[#FAF9FC] hover:bg-[#F2EFF7] text-[#6C667A] text-xs font-semibold border border-[#E5E0EE] transition cursor-pointer"
                  >
                    Return to Learning
                  </button>
                </div>
              </div>
            )
          )}

        </main>

        {/* Textbook-Clean Pedagogical Footer */}
        <footer className="border-t border-[#E5E0EE] bg-white py-8 text-center text-xs text-[#6C667A] no-print">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="font-bold text-[#56358B]">GYAAN.AI</span>
              <span>•</span>
              <span>{isUpBoard ? 'यूपी बोर्ड, सीबीएसई और आईसीएसई' : selectedBoard?.name}</span>
              <span>•</span>
              <span className="text-[#14A89A] font-semibold">“Don&apos;t just watch. Prove it.”</span>
            </div>
            <p className="text-[#6C667A] text-[11px]">
              {isUpBoard 
                ? 'भारतीय विद्यालय संवादात्मक शिक्षण प्रणाली • सक्रिय स्मरण (Active Recall), डायग्नोस्टिक पूर्व-आवश्यकताएं व आवर्ती पुनरावलोकन।'
                : 'The Indian School Diagnostic Learning System • Classes 1 to 12 • Active Recall, Prerequisite Diagnostics & Spaced Revision.'}
            </p>
          </div>
        </footer>

      </div>

      {/* 3. Mobile Bottom Navigation Bar (Hidden on Desktop) */}
      <BottomNav
        activeView={activeNavView}
        onSelectView={handleSelectNavView}
      />

      {/* Concept Knowledge Graph & Lineage Modal */}
      <ConceptGraphModal
        isOpen={isGraphModalOpen}
        onClose={() => setIsGraphModalOpen(false)}
        concept={graphModalConcept || selectedConcept}
        onSelectConcept={handleSelectConceptFromGraph}
      />

      {/* Modals */}
      <WhyGyanModal
        isOpen={isWhyGyanOpen}
        onClose={() => setIsWhyGyanOpen(false)}
      />

      <GeminiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <VoiceSettingsModal
        isOpen={isVoiceSettingsOpen}
        onClose={() => setIsVoiceSettingsOpen(false)}
      />

      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        selectedGrade={selectedGrade}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenChangeEnrollment={() => setIsChangeEnrollmentOpen(true)}
      />

      <ChangeEnrollmentModal
        isOpen={isChangeEnrollmentOpen}
        onClose={() => setIsChangeEnrollmentOpen(false)}
        currentBoard={selectedBoard?.name || 'CBSE'}
        currentGrade={selectedGrade}
        onConfirmChange={handleChangeEnrollment}
      />

      <DueWorkModal
        isOpen={isDueWorkOpen}
        onClose={() => setIsDueWorkOpen(false)}
        grade={selectedGrade}
        boardId={selectedBoardId}
        onSelectTask={handleSelectDueTask}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSearchResultSelect}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialGrade={selectedGrade}
        initialBoardId={selectedBoardId}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
