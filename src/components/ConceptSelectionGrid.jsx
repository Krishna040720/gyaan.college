// GYAAN AI Concept Units & Mind Map Coordinator
// Single canonical interface toggling between:
// 1. Chapter Units View (Expandable Units -> Topics -> Subtopics Tree)
// 2. Branching Mind Map View (Connected SVG Radial/Branching Tree with Docked Inspector)
// Both views strictly share the canonical curriculum hierarchy from curriculumHierarchyService

import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  GitBranch, 
  Network
} from 'lucide-react';
import { curriculumHierarchyService } from '../services/curriculumHierarchyService';
import { soundService } from '../services/soundService';
import ChapterUnitsView from './concept/ChapterUnitsView';
import ConceptMindMap from './concept/ConceptMindMap';

export default function ConceptSelectionGrid({
  selectedBoard,
  selectedGrade,
  selectedSubject,
  selectedChapter,
  activeConceptId,
  onSelectConcept,
  onSelectConceptToProve,
  onOpenNotes,
  onOpenPractice,
  onOpenGraphModal
}) {
  // 'units' | 'mindmap'
  const [viewLayout, setViewLayout] = useState('units');

  // Build context for hierarchical resolution
  const context = useMemo(() => ({
    board: selectedBoard?.shortName || selectedBoard?.id || selectedBoard || 'CBSE',
    classLevel: Number(selectedGrade || 10),
    subjectId: selectedSubject?.id || 'sci-10',
    subjectName: selectedSubject?.name || 'Science'
  }), [selectedBoard, selectedGrade, selectedSubject]);

  // Shared canonical hierarchy for this chapter
  const hierarchy = useMemo(() => {
    if (!selectedChapter) return null;
    return curriculumHierarchyService.getChapterHierarchy(selectedChapter, context);
  }, [selectedChapter, context]);

  const handleProveClick = (concept) => {
    soundService.playClick();
    if (onSelectConcept) {
      onSelectConcept(concept);
    } else if (onSelectConceptToProve) {
      onSelectConceptToProve(concept);
    }
  };

  const handleOpenGraph = () => {
    soundService.playClick();
    if (onOpenGraphModal && hierarchy) {
      onOpenGraphModal({
        id: hierarchy.chapterId,
        title: hierarchy.chapterTitle,
        chapterTitle: hierarchy.chapterTitle
      });
    }
  };

  return (
    <div className="space-y-4 text-[#25212B]">
      
      {/* Top Navigation & View Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E9E5EF] shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#777381] mb-0.5">
            <span className="text-[#56358B] font-bold">Chapter Knowledge Architecture</span>
            <span>•</span>
            <span>{selectedSubject?.name || 'Science'}</span>
            <span>•</span>
            <span>{selectedChapter?.title || 'Chapter'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-[#25212B]">
            {viewLayout === 'units' ? 'Chapter Units & Topics Tree' : 'Branching Concept Mind Map'}
          </h3>
        </div>

        {/* View Switcher: [ Chapter Units ] [ Branching Mind Map ] */}
        <div className="flex items-center gap-2">
          {onOpenGraphModal && (
            <button
              onClick={handleOpenGraph}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#56358B] font-bold text-xs border border-[#E9E5EF] transition"
              title="Open full diagnostic dependency chain"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Full Graph Modal</span>
            </button>
          )}

          <div className="flex items-center bg-[#FAF9FC] p-1 rounded-xl border border-[#E9E5EF]">
            <button
              onClick={() => { soundService.playClick(); setViewLayout('units'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition ${
                viewLayout === 'units' 
                  ? 'bg-[#56358B] text-white shadow-2xs' 
                  : 'text-[#777381] hover:text-[#25212B]'
              }`}
              title="Hierarchical Unit & Topic List View"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Chapter Units</span>
            </button>

            <button
              onClick={() => { soundService.playClick(); setViewLayout('mindmap'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition ${
                viewLayout === 'mindmap' 
                  ? 'bg-[#16A39A] text-white shadow-2xs' 
                  : 'text-[#777381] hover:text-[#25212B]'
              }`}
              title="Interactive Branching Mind Map"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Mind Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area: Synchronized from Same Canonical Hierarchy */}
      {viewLayout === 'units' ? (
        <ChapterUnitsView
          hierarchy={hierarchy}
          activeNodeId={activeConceptId}
          onSelectTopic={handleProveClick}
          onProveConcept={handleProveClick}
          onOpenNotes={onOpenNotes}
          onOpenPractice={onOpenPractice}
        />
      ) : (
        <ConceptMindMap
          chapter={selectedChapter}
          context={context}
          selectedConceptId={activeConceptId}
          onSelectConcept={handleProveClick}
          onOpenNotes={onOpenNotes}
          onOpenPractice={onOpenPractice}
        />
      )}
    </div>
  );
}
