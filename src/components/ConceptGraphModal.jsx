// GYAAN AI Concept Graph Modal
// Visualizes Directed Acyclic Graph (DAG) of prerequisites, current concept, and dependent concepts

import React, { useState } from 'react';
import { 
  X, 
  GitBranch, 
  ArrowDown, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Network
} from 'lucide-react';
import { conceptGraphEngine } from '../services/conceptGraphEngine';
import { progressService } from '../services/progressService';
import { soundService } from '../services/soundService';
import ConceptMindMap from './concept/ConceptMindMap';

export default function ConceptGraphModal({
  isOpen,
  onClose,
  concept,
  onSelectConcept
}) {
  const [viewMode, setViewMode] = useState('graph'); // 'graph' | 'mindmap'

  if (!isOpen || !concept) return null;

  const prerequisites = conceptGraphEngine.getPrerequisites(concept.id);
  const dependents = conceptGraphEngine.getDependentConcepts(concept.id);
  const currentProgress = progressService.getConceptProgress(concept.id);

  const getStatusBadge = (score) => {
    if (score >= 80) {
      return (
        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Mastered ({score}%)
        </span>
      );
    }
    if (score >= 60) {
      return (
        <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
          <Clock className="w-3 h-3 text-amber-600" /> In Progress ({score}%)
        </span>
      );
    }
    if (score > 0) {
      return (
        <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
          <AlertCircle className="w-3 h-3 text-rose-600" /> Needs Review ({score}%)
        </span>
      );
    }
    return (
      <span className="text-[11px] font-medium text-[#777381] bg-[#FAF9FC] border border-[#E9E5EF] px-2 py-0.5 rounded-full">
        Not Started
      </span>
    );
  };

  const handleNodeClick = (targetConcept) => {
    soundService.playClick();
    onClose();
    if (onSelectConcept) {
      onSelectConcept(targetConcept);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25212B]/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white border border-[#E9E5EF] rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] text-[#25212B]"
        onClick={e => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#16A39A]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E9E5EF]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#56358B]/10 border border-[#56358B]/20 flex items-center justify-center text-[#56358B]">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#25212B] flex items-center gap-2">
                {viewMode === 'graph' ? 'Concept Knowledge Graph & Lineage' : 'Chapter Concept Mind Map'}
              </h3>
              <p className="text-xs text-[#777381]">
                {viewMode === 'graph' ? `Diagnostic prerequisite dependency chain for ${concept.title}` : `Interactive radial mind map for ${concept.chapterTitle || concept.title}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: [ Knowledge Graph ] [ Mind Map ] */}
            <div className="flex items-center bg-[#FAF9FC] p-1 rounded-xl border border-[#E9E5EF] text-xs font-bold">
              <button
                onClick={() => { soundService.playClick(); setViewMode('graph'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  viewMode === 'graph' ? 'bg-[#56358B] text-white shadow-2xs' : 'text-[#777381] hover:text-[#25212B]'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Knowledge Graph</span>
              </button>
              <button
                onClick={() => { soundService.playClick(); setViewMode('mindmap'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  viewMode === 'mindmap' ? 'bg-[#16A39A] text-white shadow-2xs' : 'text-[#777381] hover:text-[#25212B]'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Mind Map</span>
              </button>
            </div>

            <button
              onClick={() => {
                soundService.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#777381] hover:text-[#25212B] flex items-center justify-center transition border border-[#E9E5EF]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {viewMode === 'mindmap' ? (
          <div className="py-4 overflow-y-auto flex-1">
            <ConceptMindMap 
              chapter={{ id: concept.chapterId || concept.id, title: concept.chapterTitle || concept.title }}
              context={{ board: concept.board || 'CBSE', classLevel: concept.class || 10, subjectId: concept.subjectId }}
              selectedConceptId={concept.id}
              onSelectConcept={handleNodeClick}
            />
          </div>
        ) : (
          <div className="py-6 overflow-y-auto space-y-6 flex-1 pr-1">
          
          {/* Section 1: Prerequisites (Foundational Ancestors) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#777381]">
              <span className="flex items-center gap-1.5 text-amber-700">
                <ArrowDown className="w-3.5 h-3.5" /> Prerequisites (Foundations)
              </span>
              <span className="text-[11px] text-[#777381]">
                {prerequisites.length > 0 ? `${prerequisites.length} required before this` : 'No prerequisites (Foundation concept)'}
              </span>
            </div>

            {prerequisites.length === 0 ? (
              <div className="p-3.5 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] text-xs text-[#777381] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#16A39A] shrink-0" />
                <span>This is a foundational concept with no required prerequisites. You can begin right away!</span>
              </div>
            ) : (
              <div className="space-y-2">
                {prerequisites.map((prereq) => {
                  const pProgress = progressService.getConceptProgress(prereq.id);
                  return (
                    <div
                      key={prereq.id}
                      onClick={() => handleNodeClick(prereq)}
                      className="p-3.5 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] hover:border-[#56358B]/50 hover:bg-white cursor-pointer transition flex items-center justify-between gap-3 group shadow-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#25212B] group-hover:text-[#56358B] transition">
                            {prereq.title}
                          </span>
                          <span className="text-[10px] text-[#777381] uppercase tracking-wider">
                            {prereq.chapterTitle}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#777381] line-clamp-1">
                          {prereq.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {getStatusBadge(pProgress.mastery)}
                        <ArrowRight className="w-4 h-4 text-[#777381] group-hover:text-[#56358B] group-hover:translate-x-0.5 transition" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Connection Line */}
          <div className="flex justify-center -my-2">
            <div className="w-0.5 h-6 bg-gradient-to-b from-amber-400 via-[#16A39A] to-[#56358B]" />
          </div>

          {/* Section 2: Current Selected Concept (Center Node) */}
          <div className="p-4 rounded-2xl bg-[#56358B]/5 border-2 border-[#56358B]/40 shadow-sm space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-md bg-[#56358B] text-white text-[10px] font-extrabold uppercase tracking-wider">
                Current Focus
              </span>
              {getStatusBadge(currentProgress.mastery)}
            </div>

            <div>
              <h4 className="text-sm font-black text-[#25212B]">
                {concept.title}
              </h4>
              <p className="text-xs text-[#777381] mt-1">
                {concept.description}
              </p>
            </div>

            {/* Must-Know points preview */}
            {concept.mustKnowPoints && concept.mustKnowPoints.length > 0 && (
              <div className="pt-2 border-t border-[#E9E5EF]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#56358B] block mb-1">
                  Key Evaluation Pillars:
                </span>
                <ul className="text-[11px] text-[#25212B] space-y-1 list-disc list-inside">
                  {concept.mustKnowPoints.slice(0, 2).map((pt, i) => (
                    <li key={i} className="line-clamp-1">{pt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Connection Line */}
          <div className="flex justify-center -my-2">
            <div className="w-0.5 h-6 bg-gradient-to-b from-[#56358B] to-[#16A39A]" />
          </div>

          {/* Section 3: Dependent Concepts (Unlocked Next) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#777381]">
              <span className="flex items-center gap-1.5 text-[#16A39A] font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Unlocks Next (Dependent Concepts)
              </span>
              <span className="text-[11px] text-[#777381]">
                {dependents.length} downstream concepts
              </span>
            </div>

            {dependents.length === 0 ? (
              <div className="p-3.5 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] text-xs text-[#777381]">
                Mastering this concept solidifies chapter excellence for upcoming board exam derivations!
              </div>
            ) : (
              <div className="space-y-2">
                {dependents.map((dep) => {
                  const dProgress = progressService.getConceptProgress(dep.id);
                  return (
                    <div
                      key={dep.id}
                      onClick={() => handleNodeClick(dep)}
                      className="p-3.5 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] hover:border-[#16A39A]/50 hover:bg-white cursor-pointer transition flex items-center justify-between gap-3 group shadow-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#25212B] group-hover:text-[#16A39A] transition">
                            {dep.title}
                          </span>
                          <span className="text-[10px] text-[#777381] uppercase tracking-wider">
                            {dep.chapterTitle}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#777381] line-clamp-1">
                          {dep.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {getStatusBadge(dProgress.mastery)}
                        <ArrowRight className="w-4 h-4 text-[#777381] group-hover:text-[#16A39A] group-hover:translate-x-0.5 transition" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

        {/* Footer */}
        <div className="pt-4 border-t border-[#E9E5EF] flex items-center justify-between text-xs text-[#777381]">
          <span>Click any concept to jump directly to its oral evaluation.</span>
          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#25212B] font-semibold transition border border-[#E9E5EF]"
          >
            Close Graph
          </button>
        </div>
      </div>
    </div>
  );
}
