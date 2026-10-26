// GYAAN.AI Chapter Workspace Component
// 5 Coherent Educational Views:
// 1. Learn (Video Lesson & Prove Understanding Active Recall Studio)
// 2. Mind Map (Branching Concept Mind Map & Canonical Unit Tree)
// 3. Notes (Digital Textbook Notes, Practical Labs & Dedicated Printout)
// 4. Practice (Adaptive Question Practice with Hints)
// 5. Revision & Tests (Timed Examinations & Spaced Review)

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Mic, 
  CheckCircle, 
  Clock, 
  FileText,
  Search,
  ExternalLink,
  RefreshCw,
  Zap,
  ListVideo,
  GitBranch,
  Timer
} from 'lucide-react';
import ProveUnderstandingStudio from './ProveUnderstandingStudio';
import PracticeQuiz from './PracticeQuiz';
import VideoPlayer from './VideoPlayer';
import ChapterNotesView from './notes/ChapterNotesView';
import FormulaBankView from './notes/FormulaBankView';
import ConceptMindMap from './concept/ConceptMindMap';
import ChapterUnitsView from './concept/ChapterUnitsView';
import { soundService } from '../services/soundService';
import { progressService } from '../services/progressService';
import { curriculumService } from '../services/curriculumService';
import { curriculumHierarchyService } from '../services/curriculumHierarchyService';

export default function LectureTheater({
  chapter,
  grade,
  subject,
  board,
  soundEnabled,
  onAddXp,
  selectedConcept,
  onSelectConcept,
  onOpenGraphModal,
  initialTab = 'learn'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [prevInitialTab, setPrevInitialTab] = useState(initialTab);
  if (initialTab !== prevInitialTab) {
    setPrevInitialTab(initialTab);
    setActiveTab(initialTab);
  }

  const [videoMode, setVideoMode] = useState('one_shot');
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [currentMirror, setCurrentMirror] = useState('primary');
  const [chapterConcepts, setChapterConcepts] = useState([]);
  const [mindMapViewMode, setMindMapViewMode] = useState('map'); // 'map' | 'tree'
  const [notesViewMode, setNotesViewMode] = useState('notes'); // 'notes' | 'formulas'

  // Fetch concepts for this chapter
  useEffect(() => {
    let active = true;
    if (chapter?.id) {
      curriculumService.getConcepts(chapter.id, chapter.title).then(list => {
        if (active && list && list.length > 0) {
          setChapterConcepts(list);
          if (!selectedConcept) {
            onSelectConcept(list[0]);
          }
        }
      });
    }
    return () => { active = false; };
  }, [chapter?.id, chapter?.title, selectedConcept, onSelectConcept]);

  // Track study progress when chapter loads
  useEffect(() => {
    if (chapter?.id) {
      progressService.recordTopicProgress(chapter.id, {
        chapterTitle: chapter.title,
        subject: subject?.name,
        grade: grade || 10
      });
    }
  }, [chapter?.id, chapter?.title, subject?.name, grade]);

  const oneShotVideo = chapter.oneShotVideo || null;
  const topicVideos = (chapter.topicVideos && chapter.topicVideos.length > 0) ? chapter.topicVideos : [];
  const currentTopic = topicVideos[activeTopicIndex] || topicVideos[0] || null;
  const activeVideo = videoMode === 'one_shot' ? oneShotVideo : currentTopic;
  const activeVideoId = activeVideo?.id || null;

  const handleTabChange = (tab) => {
    soundService.playClick();
    setActiveTab(tab);
  };

  const handleVideoModeChange = (mode) => {
    soundService.playClick();
    setVideoMode(mode);
  };

  const handleTopicSelect = (idx) => {
    soundService.playClick();
    setActiveTopicIndex(idx);
    setVideoMode('topic_wise');
  };

  const toggleMirror = () => {
    soundService.playClick();
    setCurrentMirror(m => m === 'primary' ? 'backup' : 'primary');
  };

  const directYoutubeUrl = `https://www.youtube.com/watch?v=${activeVideoId}`;

  const currentConceptToUse = selectedConcept || chapterConcepts[0] || {
    id: `${chapter.id}-c01`,
    title: chapter.title,
    chapterTitle: chapter.title,
    subject: subject?.name || 'Science',
    mustKnowPoints: chapter.keyPoints || ['Core physical law', 'Formula and unit'],
    learningObjectives: chapter.learningObjectives || ['Understand fundamental principles']
  };

  // Resolve hierarchy for mindmap and unit tree
  const chapterHierarchy = curriculumHierarchyService.getChapterHierarchy(chapter, {
    board: board?.shortName || board?.id,
    classLevel: grade,
    subjectId: subject?.id,
    subjectName: subject?.name
  });

  return (
    <div className="space-y-6">
      
      {/* Chapter Workspace Header Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E5E0EE] shadow-xs space-y-4 no-print theater-non-notes">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6C667A] mb-1">
              <span>{board?.name || 'CBSE'}</span>
              <span>•</span>
              <span>Class {grade}</span>
              <span>•</span>
              <span className="text-[#56358B] font-bold">{subject?.name}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {chapter.duration || '45 mins'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#221E2C] tracking-tight">
              {chapter.title}
            </h2>
          </div>

          {/* Differentiator Callout Pill */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#56358B]/10 border border-[#56358B]/20 text-[#56358B] text-xs font-bold">
            <Mic className="w-4 h-4 text-[#56358B]" />
            <span>“Don&apos;t just watch. Prove it.”</span>
          </div>
        </div>

        {/* 5 Canonical Workspace Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-[#FAF9FC] p-1.5 rounded-2xl border border-[#E5E0EE] text-xs font-semibold overflow-x-auto scrollbar-none">
          
          {/* TAB 1: Learn */}
          <button
            onClick={() => handleTabChange('learn')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'learn' 
                ? 'bg-[#56358B] text-white font-bold shadow-xs' 
                : 'text-[#4A4556] hover:bg-white hover:text-[#221E2C]'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Learn</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
              activeTab === 'learn' ? 'bg-white text-[#56358B]' : 'bg-[#56358B]/10 text-[#56358B]'
            }`}>
              Video + Recall
            </span>
          </button>

          {/* TAB 2: Mind Map */}
          <button
            onClick={() => handleTabChange('mindmap')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'mindmap' 
                ? 'bg-white text-[#14A89A] font-bold shadow-xs border border-[#E5E0EE]' 
                : 'text-[#6C667A] hover:text-[#221E2C]'
            }`}
          >
            <GitBranch className="w-4 h-4 text-[#14A89A]" />
            <span>Mind Map</span>
            {chapterHierarchy?.units?.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#14A89A]/10 text-[#14A89A]">
                {chapterHierarchy.units.length} Units
              </span>
            )}
          </button>

          {/* TAB 3: Notes */}
          <button
            onClick={() => handleTabChange('notes')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'notes' 
                ? 'bg-white text-[#221E2C] font-bold shadow-xs border border-[#E5E0EE]' 
                : 'text-[#6C667A] hover:text-[#221E2C]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Notes & Labs</span>
            {chapter.practicalActivity && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                Lab
              </span>
            )}
          </button>

          {/* TAB 4: Practice */}
          <button
            onClick={() => handleTabChange('practice')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'practice' 
                ? 'bg-white text-[#047857] font-bold shadow-xs border border-[#E5E0EE]' 
                : 'text-[#6C667A] hover:text-[#221E2C]'
            }`}
          >
            <CheckCircle className="w-4 h-4 text-[#047857]" />
            <span>Practice</span>
          </button>

          {/* TAB 5: Revision & Tests */}
          <button
            onClick={() => handleTabChange('tests')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'tests' 
                ? 'bg-white text-amber-800 font-bold shadow-xs border border-[#E5E0EE]' 
                : 'text-[#6C667A] hover:text-[#221E2C]'
            }`}
          >
            <Timer className="w-4 h-4 text-amber-600" />
            <span>Revision & Tests</span>
          </button>

        </div>
      </div>

      {/* VIEW 1: LEARN (Lesson Video + Prove Understanding Feynman Studio) */}
      {activeTab === 'learn' && (
        <div className="space-y-6">
          
          {/* Active Recall Studio */}
          <ProveUnderstandingStudio
            concept={currentConceptToUse}
            chapter={chapter}
            chapterConcepts={chapterConcepts}
            grade={grade}
            board={board}
            soundEnabled={soundEnabled}
            onAddXp={onAddXp}
            onOpenGraphModal={onOpenGraphModal}
            onSwitchConcept={(conceptId) => {
              const found = chapterConcepts.find(c => c.id === conceptId);
              if (found) onSelectConcept(found);
            }}
          />

          {/* Video Lecture Section */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5E0EE] shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0EE] pb-3">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#56358B]" />
                <h3 className="font-bold text-sm sm:text-base text-[#221E2C]">
                  Lesson Video Stream
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVideoModeChange('one_shot')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    videoMode === 'one_shot' 
                      ? 'bg-[#56358B] text-white shadow-xs' 
                      : 'bg-[#FAF9FC] text-[#6C667A] hover:bg-[#EFEBF5]'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>One-Shot</span>
                </button>

                <button
                  onClick={() => handleVideoModeChange('topic_wise')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    videoMode === 'topic_wise' 
                      ? 'bg-[#14A89A] text-white shadow-xs' 
                      : 'bg-[#FAF9FC] text-[#6C667A] hover:bg-[#EFEBF5]'
                  }`}
                >
                  <ListVideo className="w-3.5 h-3.5" />
                  <span>Topic by Topic</span>
                </button>

                <button
                  onClick={toggleMirror}
                  className="px-2.5 py-1.5 rounded-xl bg-[#FAF9FC] hover:bg-[#EFEBF5] text-[#6C667A] text-xs font-medium border border-[#E5E0EE] transition flex items-center gap-1 cursor-pointer"
                  title="Switch between video mirrors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Mirror: {currentMirror}</span>
                </button>

                <a
                  href={directYoutubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-xl bg-[#FAF9FC] hover:bg-[#EFEBF5] text-[#6C667A] text-xs font-medium border border-[#E5E0EE] transition flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="hidden sm:inline">YouTube</span>
                </a>
              </div>
            </div>

            <VideoPlayer
              video={activeVideo}
              selectedClass={grade}
              chapterTitle={chapter?.title}
              onOpenFeynmanStudio={() => window.scrollTo({ top: 120, behavior: 'smooth' })}
              onOpenNotes={() => setActiveTab('notes')}
            />

            {/* Topic Playlist if in topic-wise mode */}
            {videoMode === 'topic_wise' && topicVideos.length > 0 && (
              <div className="pt-2 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6C667A]">
                  Chapter Topics:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {topicVideos.map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTopicSelect(idx)}
                      className={`p-3 rounded-xl border text-xs text-left transition cursor-pointer ${
                        activeTopicIndex === idx
                          ? 'bg-[#14A89A]/10 border-[#14A89A]/40 text-[#10897D] font-bold'
                          : 'bg-[#FAF9FC] border-[#E5E0EE] hover:bg-[#F2EFF7] text-[#221E2C]'
                      }`}
                    >
                      <div className="text-[10px] text-[#6C667A] uppercase">Part {topic.part} • {topic.duration}</div>
                      <div className="truncate mt-0.5">{topic.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* VIEW 2: MIND MAP (Interactive Branching Mind Map & Canonical Unit Tree) */}
      {activeTab === 'mindmap' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-[#E5E0EE] shadow-xs">
            <div className="text-xs text-[#6C667A]">
              Concept Hierarchy: <strong className="text-[#221E2C]">{chapter.title}</strong>
            </div>

            <div className="flex items-center gap-1 bg-[#FAF9FC] p-1 rounded-xl border border-[#E5E0EE] text-xs">
              <button
                onClick={() => setMindMapViewMode('map')}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  mindMapViewMode === 'map'
                    ? 'bg-[#56358B] text-white shadow-xs'
                    : 'text-[#6C667A] hover:text-[#221E2C]'
                }`}
              >
                Interactive Mind Map
              </button>
              <button
                onClick={() => setMindMapViewMode('tree')}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  mindMapViewMode === 'tree'
                    ? 'bg-[#56358B] text-white shadow-xs'
                    : 'text-[#6C667A] hover:text-[#221E2C]'
                }`}
              >
                Unit & Topic Tree
              </button>
            </div>
          </div>

          {mindMapViewMode === 'map' ? (
            <ConceptMindMap
              chapter={chapter}
              context={{ 
                board: board?.shortName || board?.id, 
                classLevel: grade, 
                subjectId: subject?.id, 
                subjectName: subject?.name 
              }}
              selectedConceptId={selectedConcept?.id}
              onSelectConcept={onSelectConcept}
              onOpenNotes={() => setActiveTab('notes')}
              onOpenPractice={() => setActiveTab('practice')}
            />
          ) : (
            <ChapterUnitsView
              hierarchy={chapterHierarchy}
              activeNodeId={selectedConcept?.id}
              onSelectTopic={(topic) => onSelectConcept(topic)}
              onProveConcept={(concept) => {
                onSelectConcept(concept);
                setActiveTab('learn');
              }}
              onOpenNotes={() => setActiveTab('notes')}
              onOpenPractice={() => setActiveTab('practice')}
            />
          )}
        </div>
      )}

      {/* VIEW 3: NOTES & FORMULAS */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-[#E5E0EE] shadow-xs no-print">
            <div className="text-xs text-[#6C667A]">
              Textbook Reference: <strong className="text-[#221E2C]">{chapter.title}</strong>
            </div>

            <div className="flex items-center gap-1 bg-[#FAF9FC] p-1 rounded-xl border border-[#E5E0EE] text-xs">
              <button
                onClick={() => setNotesViewMode('notes')}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  notesViewMode === 'notes'
                    ? 'bg-[#56358B] text-white shadow-xs'
                    : 'text-[#6C667A] hover:text-[#221E2C]'
                }`}
              >
                Chapter Notes
              </button>
              <button
                onClick={() => setNotesViewMode('formulas')}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  notesViewMode === 'formulas'
                    ? 'bg-[#56358B] text-white shadow-xs'
                    : 'text-[#6C667A] hover:text-[#221E2C]'
                }`}
              >
                <Search className="w-3 h-3 inline mr-1" />
                Formula Bank
              </button>
            </div>
          </div>

          {notesViewMode === 'notes' ? (
            <ChapterNotesView
              chapter={chapter}
              grade={grade}
              subject={subject}
              board={board}
              onProveConcept={(concept) => {
                onSelectConcept(concept);
                setActiveTab('learn');
              }}
            />
          ) : (
            <FormulaBankView
              _chapter={chapter}
              chapter={chapter}
              grade={grade}
              subject={subject}
              board={board}
            />
          )}
        </div>
      )}

      {/* VIEW 4: PRACTICE (Adaptive Questions with Hints) */}
      {activeTab === 'practice' && (
        <PracticeQuiz
          chapter={chapter}
          subjectName={subject?.name || 'Science'}
          classLevel={grade || 10}
          onAddXp={onAddXp}
          onSwitchToVoice={() => setActiveTab('learn')}
          initialSection="practice"
        />
      )}

      {/* VIEW 5: REVISION & TESTS (Timed 5-min exam & test review) */}
      {activeTab === 'tests' && (
        <PracticeQuiz
          chapter={chapter}
          subjectName={subject?.name || 'Science'}
          classLevel={grade || 10}
          onAddXp={onAddXp}
          onSwitchToVoice={() => setActiveTab('learn')}
          initialSection="test"
        />
      )}

    </div>
  );
}
