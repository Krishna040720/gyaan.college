// GYAAN AI Unified Global Search Modal (Ctrl+K)
// Searches across Boards, Classes, Subjects, Chapters, and Verified Concepts

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  X, 
  ChevronRight,
  Mic
} from 'lucide-react';
import { BOARDS, CONCEPTS_REPOSITORY } from '../data/conceptKnowledgeBase';
import { getSubjectsForGradeAndBoard } from '../data/curriculumData';
import { soundService } from '../services/soundService';

export default function GlobalSearchModal({
  isOpen,
  onClose,
  onSelectResult
}) {
  const [query, setQuery] = useState('');

  // Search catalog across concepts, chapters, subjects, and boards
  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const q = query.toLowerCase().trim();
    const matches = [];

    // 1. Search Concepts (Highest priority in GYAAN AI!)
    CONCEPTS_REPOSITORY.forEach(concept => {
      const matchTitle = concept.title.toLowerCase().includes(q);
      const matchDesc = concept.description.toLowerCase().includes(q);
      const matchCh = concept.chapterTitle?.toLowerCase().includes(q);
      const matchKey = (concept.mustKnowPoints || []).some(k => k.toLowerCase().includes(q));

      if (matchTitle || matchDesc || matchCh || matchKey) {
        matches.push({
          concept,
          title: concept.title,
          type: 'Concept',
          grade: concept.class,
          chapterTitle: concept.chapterTitle,
          subject: { id: concept.subjectId, name: concept.subject },
          board: BOARDS.find(b => b.shortName.toLowerCase() === (concept.board || 'cbse').toLowerCase()) || BOARDS[0]
        });
      }
    });

    // 2. Search Subjects & Chapters
    BOARDS.forEach(board => {
      [9, 10, 11, 12].forEach(grade => {
        const subjects = getSubjectsForGradeAndBoard(grade, board.id);
        subjects.forEach(subj => {
          if (subj.name.toLowerCase().includes(q)) {
            matches.push({
              board,
              grade,
              subject: subj,
              title: subj.name,
              type: 'Subject'
            });
          }

          subj.chapters?.forEach(ch => {
            if (ch.title.toLowerCase().includes(q)) {
              matches.push({
                board,
                grade,
                subject: subj,
                title: ch.title,
                type: 'Chapter'
              });
            }
          });
        });
      });
    });

    return matches.slice(0, 12);
  }, [query]);

  // Handle Ctrl+K / CMD+K global listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (item) => {
    soundService.playSuccess();
    onSelectResult(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-[#25212B]/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-white border border-[#E9E5EF] shadow-2xl overflow-hidden text-[#25212B]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="relative border-b border-[#E9E5EF] p-4 bg-white">
          <Search className="w-5 h-5 text-[#56358B] absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search concepts, formulas, or chapters (e.g. Ohm's Law, Vectors, Light, Real Numbers)..."
            className="w-full bg-[#FAF9FC] text-[#25212B] text-sm pl-11 pr-10 py-3 rounded-2xl border border-[#E9E5EF] focus:outline-none focus:border-[#56358B]"
          />
          <button
            onClick={onClose}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-[#777381] hover:text-[#25212B] p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1.5 divide-y divide-[#E9E5EF]">
          {query.trim().length === 0 ? (
            <div className="p-8 text-center text-xs text-[#777381] space-y-2">
              <p>Type any concept to jump directly into oral active recall!</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {["Ohm's Law", 'Projectile Motion', 'Mirror Formula', 'Chemical Reactions', 'Trigonometry'].map((suggested, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(suggested)}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[11px] text-[#25212B] border border-[#E9E5EF] transition"
                  >
                    {suggested}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#777381]">
              No matching concepts found for "{query}". Try checking the spelling.
            </div>
          ) : (
            results.map((res, i) => (
              <div
                key={i}
                onClick={() => handleSelect(res)}
                className="p-3.5 rounded-2xl bg-[#FAF9FC]/60 hover:bg-[#FAF9FC] cursor-pointer transition flex items-center justify-between gap-3 group border border-transparent hover:border-[#E9E5EF]"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className={`px-2 py-0.5 rounded-md font-bold uppercase ${
                      res.type === 'Concept' 
                        ? 'bg-[#56358B]/10 text-[#56358B] border border-[#56358B]/20' 
                        : res.type === 'Chapter' 
                          ? 'bg-[#16A39A]/10 text-[#16A39A]' 
                          : 'bg-[#FAF9FC] text-[#777381] border border-[#E9E5EF]'
                    }`}>
                      {res.type}
                    </span>
                    <span className="text-[#777381] font-semibold">
                      Class {res.grade}
                    </span>
                    <span className="text-[#E9E5EF]">•</span>
                    <span className="text-[#777381]">
                      {res.subject?.name}
                    </span>
                    {res.chapterTitle && (
                      <>
                        <span className="text-[#E9E5EF]">•</span>
                        <span className="text-[#777381] truncate">{res.chapterTitle}</span>
                      </>
                    )}
                  </div>
                  <h5 className="text-sm font-bold text-[#25212B] group-hover:text-[#56358B] transition truncate">
                    {res.title}
                  </h5>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {res.type === 'Concept' && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#56358B] bg-[#56358B]/10 px-2 py-0.5 rounded-lg border border-[#56358B]/20">
                      <Mic className="w-3 h-3" /> Prove Understanding
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-[#777381] group-hover:text-[#25212B] group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#FAF9FC] border-t border-[#E9E5EF] text-[11px] text-[#777381] flex items-center justify-between">
          <span>Search verified concepts across CBSE, ICSE & State Boards</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E9E5EF] text-[#25212B] font-mono shadow-xs">
            ESC to close
          </kbd>
        </div>
      </div>
    </div>
  );
}
