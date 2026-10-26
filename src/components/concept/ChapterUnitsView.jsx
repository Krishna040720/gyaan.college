// GYAAN AI Chapter Units View Component
// Hierarchical Curriculum Explorer rendering: Chapter -> Unit (when present) -> Topic -> Subtopics
// Features expandable/collapsible units & topics, canonical mastery indicators, and direct actions (Prove, Notes, Quiz)

import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Mic, 
  FileText, 
  CheckCircle, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Maximize2,
  Minimize2
} from 'lucide-react';
import { progressService } from '../../services/progressService';
import { soundService } from '../../services/soundService';
import { IMPORTANCE_LEVELS, PROVENANCE_TYPES } from '../../data/curriculumHierarchyData';

export default function ChapterUnitsView({
  hierarchy,
  activeNodeId,
  onSelectTopic,
  onProveConcept,
  onOpenNotes,
  onOpenPractice
}) {
  const [collapsedUnits, setCollapsedUnits] = useState({});
  const [collapsedTopics, setCollapsedTopics] = useState({});
  const [filterImportance, setFilterImportance] = useState('all'); // 'all' | 'high_yield'
  const [filterMastery, setFilterMastery] = useState('all'); // 'all' | 'needs_strengthening' | 'developing' | 'strong' | 'not_assessed'
  const [selectedNode, setSelectedNode] = useState(null);

  if (!hierarchy) {
    return (
      <div className="p-8 text-center rounded-3xl bg-white border border-[#E9E5EF] text-[#777381] text-xs">
        No curriculum hierarchy available for this chapter.
      </div>
    );
  }

  const toggleUnit = (unitId) => {
    soundService.playClick();
    setCollapsedUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const toggleTopic = (topicId) => {
    soundService.playClick();
    setCollapsedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const expandAll = () => {
    soundService.playClick();
    setCollapsedUnits({});
    setCollapsedTopics({});
  };

  const collapseAll = () => {
    soundService.playClick();
    const allUnits = {};
    const allTopics = {};
    if (hierarchy.hasUnits && Array.isArray(hierarchy.units)) {
      hierarchy.units.forEach(u => {
        allUnits[u.id] = true;
        (u.topics || []).forEach(t => { allTopics[t.id] = true; });
      });
    } else if (Array.isArray(hierarchy.topics)) {
      hierarchy.topics.forEach(t => { allTopics[t.id] = true; });
    }
    setCollapsedUnits(allUnits);
    setCollapsedTopics(allTopics);
  };

  const handleTopicClick = (topic) => {
    soundService.playClick();
    setSelectedNode(topic);
    if (onSelectTopic) onSelectTopic(topic);
  };

  const handleProve = (e, topic) => {
    e.stopPropagation();
    soundService.playClick();
    if (onProveConcept) {
      onProveConcept({
        id: topic.conceptId || topic.id,
        title: topic.title,
        chapterTitle: hierarchy.chapterTitle,
        chapterId: hierarchy.chapterId,
        mustKnowPoints: topic.keyTakeaways || [topic.description],
        description: topic.description
      });
    }
  };

  const handleNotes = (e, topic) => {
    e.stopPropagation();
    soundService.playClick();
    if (onOpenNotes) onOpenNotes(topic);
  };

  const handlePractice = (e, topic) => {
    e.stopPropagation();
    soundService.playClick();
    if (onOpenPractice) onOpenPractice(topic);
  };

  const getMasteryBadge = (nodeId, conceptId) => {
    const targetId = conceptId || nodeId;
    const progress = progressService.getConceptProgress(targetId);

    if (!progress.isAssessed || progress.mastery === null || progress.mastery === undefined) {
      return (
        <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
          Not assessed yet
        </span>
      );
    }

    if (progress.mastery < 60) {
      return (
        <span className="flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
          <AlertCircle className="w-3 h-3 text-rose-600" /> Needs Strengthening ({progress.mastery}%)
        </span>
      );
    }

    if (progress.mastery < 80) {
      return (
        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
          <Clock className="w-3 h-3 text-amber-600" /> Developing ({progress.mastery}%)
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Strong ({progress.mastery}%)
      </span>
    );
  };

  const filterNode = (node) => {
    if (filterImportance === 'high_yield' && node.importance !== IMPORTANCE_LEVELS.HIGH_YIELD) {
      return false;
    }

    if (filterMastery !== 'all') {
      const progress = progressService.getConceptProgress(node.conceptId || node.id);
      if (filterMastery === 'not_assessed' && progress.isAssessed) return false;
      if (filterMastery === 'needs_strengthening' && (!progress.isAssessed || progress.mastery >= 60)) return false;
      if (filterMastery === 'developing' && (!progress.isAssessed || progress.mastery < 60 || progress.mastery >= 80)) return false;
      if (filterMastery === 'strong' && (!progress.isAssessed || progress.mastery < 80)) return false;
    }

    return true;
  };

  // Compute total counts
  const totalUnits = hierarchy.hasUnits && Array.isArray(hierarchy.units) ? hierarchy.units.length : 0;
  let totalTopics = 0;
  let totalSubtopics = 0;

  if (hierarchy.hasUnits && Array.isArray(hierarchy.units)) {
    hierarchy.units.forEach(u => {
      totalTopics += (u.topics || []).length;
      (u.topics || []).forEach(t => {
        totalSubtopics += (t.subtopics || []).length;
      });
    });
  } else if (Array.isArray(hierarchy.topics)) {
    totalTopics = hierarchy.topics.length;
    hierarchy.topics.forEach(t => {
      totalSubtopics += (t.subtopics || []).length;
    });
  }

  return (
    <div className="space-y-4 text-[#25212B]">
      
      {/* Chapter Overview & Toolbar Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E9E5EF] shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#777381] mb-1">
              <span className="text-[#56358B] font-bold">Curriculum Breakdown</span>
              <span>•</span>
              <span>{hierarchy.board} Class {hierarchy.classLevel}</span>
              <span>•</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                hierarchy.status === 'reviewed' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-[#FAF9FC] text-[#6C667A] border-[#E5E0EE]'
              }`}>
                {hierarchy.status === 'reviewed' ? 'Verified NCERT' : 'Based on the NCERT syllabus'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-[#25212B]">
              {hierarchy.chapterTitle}
            </h3>
          </div>

          {/* Global expand / collapse triggers */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={expandAll}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#777381] hover:text-[#25212B] font-semibold border border-[#E9E5EF] transition"
              title="Expand All Units and Topics"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand All</span>
            </button>
            <button
              onClick={collapseAll}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#777381] hover:text-[#25212B] font-semibold border border-[#E9E5EF] transition"
              title="Collapse All Units and Topics"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Collapse All</span>
            </button>
          </div>
        </div>

        {/* Stats & Filter Bar */}
        <div className="pt-2 border-t border-[#F0EDF5] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {hierarchy.hasUnits && (
              <span className="px-2.5 py-1 rounded-xl bg-[#56358B]/10 text-[#56358B] font-bold">
                {totalUnits} {totalUnits === 1 ? 'Unit' : 'Units'}
              </span>
            )}
            <span className="px-2.5 py-1 rounded-xl bg-[#16A39A]/10 text-[#16A39A] font-bold">
              {totalTopics} {totalTopics === 1 ? 'Topic' : 'Topics'}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-bold">
              {totalSubtopics} Subtopics
            </span>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="flex items-center bg-[#FAF9FC] p-0.5 rounded-xl border border-[#E9E5EF]">
              <button
                onClick={() => { soundService.playClick(); setFilterImportance('all'); }}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${
                  filterImportance === 'all' ? 'bg-[#56358B] text-white' : 'text-[#777381] hover:text-[#25212B]'
                }`}
              >
                All Topics
              </button>
              <button
                onClick={() => { soundService.playClick(); setFilterImportance('high_yield'); }}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${
                  filterImportance === 'high_yield' ? 'bg-[#56358B] text-white' : 'text-[#777381] hover:text-[#25212B]'
                }`}
              >
                High Yield Only
              </button>
            </div>

            <select
              value={filterMastery}
              onChange={(e) => { soundService.playClick(); setFilterMastery(e.target.value); }}
              className="px-2.5 py-1 rounded-xl bg-[#FAF9FC] border border-[#E9E5EF] text-[11px] font-semibold text-[#25212B] focus:outline-none focus:ring-1 focus:ring-[#56358B]"
              aria-label="Filter by mastery level"
            >
              <option value="all">All Mastery</option>
              <option value="needs_strengthening">Needs Strengthening (&lt;60%)</option>
              <option value="developing">Developing (60-79%)</option>
              <option value="strong">Strong (≥80%)</option>
              <option value="not_assessed">Not Assessed</option>
            </select>
          </div>
        </div>
      </div>

      {/* RENDER MODE 1: CHAPTER WITH UNITS */}
      {hierarchy.hasUnits && Array.isArray(hierarchy.units) && (
        <div className="space-y-4">
          {hierarchy.units.map((unit) => {
            const isUnitCollapsed = Boolean(collapsedUnits[unit.id]);
            const unitFilteredTopics = (unit.topics || []).filter(filterNode);

            return (
              <div 
                key={unit.id}
                className="rounded-3xl bg-white border border-[#E9E5EF] shadow-xs overflow-hidden transition"
              >
                {/* Unit Header Bar (Clickable to Collapse/Expand) */}
                <div 
                  onClick={() => toggleUnit(unit.id)}
                  className="p-4 sm:p-5 bg-linear-to-r from-[#FAF9FC] to-white border-b border-[#E9E5EF] flex items-center justify-between gap-3 cursor-pointer select-none hover:bg-[#F6F4F9] transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-[#56358B] text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                      U{unit.unitNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#56358B]">
                          Unit {unit.unitNumber}
                        </span>
                        <span className="text-[10px] text-[#777381]">•</span>
                        <span className="text-[10px] font-semibold text-[#777381]">
                          {(unit.topics || []).length} Topics
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-[#25212B]">
                        {unit.title}
                      </h4>
                      {unit.description && (
                        <p className="text-xs text-[#777381] line-clamp-1 mt-0.5">
                          {unit.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#777381]">
                    <span className="text-xs font-semibold hidden sm:inline">
                      {isUnitCollapsed ? 'Expand' : 'Collapse'}
                    </span>
                    {isUnitCollapsed ? (
                      <ChevronRight className="w-5 h-5 text-[#56358B]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#56358B]" />
                    )}
                  </div>
                </div>

                {/* Unit Topics Content */}
                {!isUnitCollapsed && (
                  <div className="p-4 sm:p-5 space-y-3 bg-[#FCFBFE]">
                    {unitFilteredTopics.length === 0 ? (
                      <div className="p-4 text-center text-xs text-[#777381]">
                        No topics match the selected filter in this unit.
                      </div>
                    ) : (
                      unitFilteredTopics.map((topic, tIdx) => (
                        <TopicCardItem
                          key={topic.id}
                          topic={topic}
                          index={tIdx}
                          unitNumber={unit.unitNumber}
                          isCollapsed={Boolean(collapsedTopics[topic.id])}
                          isSelected={activeNodeId === topic.id || selectedNode?.id === topic.id}
                          onToggle={() => toggleTopic(topic.id)}
                          onClick={() => handleTopicClick(topic)}
                          onProve={(e) => handleProve(e, topic)}
                          onNotes={(e) => handleNotes(e, topic)}
                          onPractice={(e) => handlePractice(e, topic)}
                          getMasteryBadge={getMasteryBadge}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* RENDER MODE 2: CHAPTER WITHOUT UNITS (Direct Topics -> Subtopics) */}
      {!hierarchy.hasUnits && Array.isArray(hierarchy.topics) && (
        <div className="space-y-3">
          {hierarchy.topics.filter(filterNode).length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-white border border-[#E9E5EF] text-xs text-[#777381]">
              No topics match the selected filter in this chapter.
            </div>
          ) : (
            hierarchy.topics.filter(filterNode).map((topic, tIdx) => (
              <TopicCardItem
                key={topic.id}
                topic={topic}
                index={tIdx}
                unitNumber={null}
                isCollapsed={Boolean(collapsedTopics[topic.id])}
                isSelected={activeNodeId === topic.id || selectedNode?.id === topic.id}
                onToggle={() => toggleTopic(topic.id)}
                onClick={() => handleTopicClick(topic)}
                onProve={(e) => handleProve(e, topic)}
                onNotes={(e) => handleNotes(e, topic)}
                onPractice={(e) => handlePractice(e, topic)}
                getMasteryBadge={getMasteryBadge}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Reusable Topic Card with Subtopics Tree and Action Bar
 */
function TopicCardItem({
  topic,
  index,
  unitNumber,
  isCollapsed,
  isSelected,
  onToggle,
  onClick,
  onProve,
  onNotes,
  onPractice,
  getMasteryBadge
}) {
  const hasSubtopics = Array.isArray(topic.subtopics) && topic.subtopics.length > 0;
  const numbering = unitNumber ? `${unitNumber}.${index + 1}` : `${index + 1}`;

  return (
    <div 
      className={`rounded-2xl border transition bg-white ${
        isSelected 
          ? 'border-[#56358B] ring-2 ring-[#56358B]/15 shadow-sm' 
          : 'border-[#E9E5EF] hover:border-[#CDC7D9]'
      }`}
    >
      {/* Topic Header Row */}
      <div 
        onClick={onClick}
        className="p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none"
      >
        <div className="flex items-start gap-3 flex-1 min-w-[240px]">
          <div className="w-7 h-7 rounded-xl bg-[#FAF9FC] border border-[#E9E5EF] text-[#56358B] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            {numbering}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h5 className="text-sm font-bold text-[#25212B]">
                {topic.title}
              </h5>
              {topic.importance === IMPORTANCE_LEVELS.HIGH_YIELD && (
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                  High Yield
                </span>
              )}
            </div>

            {topic.description && (
              <p className="text-xs text-[#777381] line-clamp-2">
                {topic.description}
              </p>
            )}

            {/* Mastery status badge */}
            <div className="mt-2 flex items-center gap-2">
              {getMasteryBadge(topic.id, topic.conceptId)}
              {hasSubtopics && (
                <span className="text-[10px] text-[#777381]">
                  • {topic.subtopics.length} Subtopics
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Triggers Bar */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onProve}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#56358B] hover:bg-[#462b71] text-white text-xs font-bold shadow-2xs transition"
            title="Prove understanding with Feynman Voice Recall"
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prove</span>
          </button>

          <button
            onClick={onNotes}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#25212B] text-xs font-semibold border border-[#E9E5EF] transition"
            title="Read detailed topic notes and derivations"
          >
            <FileText className="w-3.5 h-3.5 text-[#56358B]" />
            <span className="hidden md:inline">Notes</span>
          </button>

          <button
            onClick={onPractice}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#25212B] text-xs font-semibold border border-[#E9E5EF] transition"
            title="Practice questions for this topic"
          >
            <CheckCircle className="w-3.5 h-3.5 text-[#16A39A]" />
            <span className="hidden md:inline">Quiz</span>
          </button>

          {hasSubtopics && (
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              className="p-1.5 rounded-xl hover:bg-[#FAF9FC] text-[#777381] transition ml-1"
              title={isCollapsed ? 'Expand subtopics' : 'Collapse subtopics'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-[#56358B]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#56358B]" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Expandable Subtopics List */}
      {hasSubtopics && !isCollapsed && (
        <div className="px-4 pb-4 pt-1 border-t border-[#F0EDF5] bg-[#FAF9FC]/60 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#777381] pl-6 pt-1">
            Subtopics & Syllabus Learning Units:
          </div>
          <div className="space-y-1.5 pl-6 border-l-2 border-[#E9E5EF] ml-4">
            {topic.subtopics.map((sub, sIdx) => (
              <SubtopicItemRow 
                key={sub.id}
                subtopic={sub}
                parentNumbering={numbering}
                subIndex={sIdx}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Nested Subtopic Row with Level-4 Nesting Support
 */
function SubtopicItemRow({ subtopic, parentNumbering, subIndex }) {
  const hasNested = Array.isArray(subtopic.subtopics) && subtopic.subtopics.length > 0;
  const subNumbering = `${parentNumbering}.${subIndex + 1}`;

  return (
    <div className="p-2.5 rounded-xl bg-white border border-[#E9E5EF] text-xs space-y-1 hover:border-[#56358B]/30 transition">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A39A]" />
          <span className="font-bold text-[#56358B] text-[11px]">{subNumbering}</span>
          <span className="font-semibold text-[#25212B]">{subtopic.title}</span>
        </div>

        {subtopic.importance === IMPORTANCE_LEVELS.HIGH_YIELD && (
          <span className="px-1.5 py-0.2 rounded-md bg-rose-50 text-rose-700 text-[9px] font-bold border border-rose-200">
            High Yield
          </span>
        )}
      </div>

      {subtopic.description && (
        <p className="text-[11px] text-[#777381] pl-4">
          {subtopic.description}
        </p>
      )}

      {/* Level 4 Nested Subtopics (if present) */}
      {hasNested && (
        <div className="pl-4 pt-1.5 space-y-1 border-l-2 border-[#16A39A]/30 ml-2">
          <div className="text-[9px] font-bold text-[#16A39A] uppercase tracking-wider">
            Detailed Concepts:
          </div>
          {subtopic.subtopics.map((nest) => (
            <div key={nest.id} className="p-1.5 rounded-lg bg-[#FAF9FC] border border-[#E9E5EF] text-[10px] flex items-center justify-between gap-2">
              <span className="font-medium text-[#25212B]">{nest.title}</span>
              <span className="text-[9px] text-[#777381]">{nest.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
