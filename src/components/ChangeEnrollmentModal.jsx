// GYAAN AI Change Enrollment Flow Modal
// Enforces academic enrollment locking while allowing controlled, confirmed transitions
// Preserves student historical records while switching active curriculum & spaced revision context

import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  AlertTriangle, 
  ArrowRight, 
  GraduationCap, 
  CheckCircle2, 
  RotateCcw 
} from 'lucide-react';
import { BOARDS } from '../data/boardsRegistry';
import { soundService } from '../services/soundService';

export default function ChangeEnrollmentModal({
  isOpen,
  onClose,
  currentBoard = 'CBSE',
  currentGrade = 10,
  onConfirmChange
}) {
  const [targetBoard, setTargetBoard] = useState(currentBoard);
  const [targetGrade, setTargetGrade] = useState(currentGrade);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const isUpBoard = targetBoard?.toLowerCase() === 'up_board' || targetBoard?.toLowerCase() === 'up board';
  const hasChanged = targetBoard.toUpperCase() !== currentBoard.toUpperCase() || Number(targetGrade) !== Number(currentGrade);

  const handleConfirm = () => {
    soundService.playSuccess();
    setIsSubmitting(true);
    if (onConfirmChange) {
      onConfirmChange({
        board: targetBoard,
        classLevel: Number(targetGrade)
      });
    }
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25212B]/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-white border border-[#E9E5EF] shadow-2xl p-6 sm:p-7 text-[#25212B] space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9FC] text-[#777381] hover:text-[#25212B] hover:bg-[#E9E5EF] transition border border-[#E9E5EF]"
          title="Cancel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#25212B] tracking-tight">
              Change Academic Enrollment
            </h3>
            <p className="text-xs text-[#777381]">
              Switch your primary curriculum grade and examination board
            </p>
          </div>
        </div>

        {/* Current Enrollment Badge */}
        <div className="p-3.5 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] flex items-center justify-between text-xs">
          <span className="text-[#777381] font-semibold">Active Enrollment:</span>
          <span className="font-extrabold text-[#56358B] flex items-center gap-1.5 bg-[#56358B]/10 px-2.5 py-1 rounded-xl border border-[#56358B]/20">
            <Lock className="w-3.5 h-3.5" />
            {currentBoard.toUpperCase()} • Class {currentGrade}
          </span>
        </div>

        {/* Impact Warning Notice */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2 text-xs text-amber-900">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Academic Context Shift:</span>
          </div>
          <ul className="space-y-1 text-[11px] leading-relaxed text-amber-900/90 pl-6 list-disc">
            <li>Your active syllabus, daily revision queue, and video lessons will switch to the new class.</li>
            <li>Your historical mastery, oral recall recordings, and XP in Class {currentGrade} remain safely saved.</li>
            <li>Cross-class content switching is restricted to maintain focused academic integrity.</li>
          </ul>
        </div>

        {/* Selection Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-xs font-bold text-[#25212B] mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#56358B]" />
              Select Target Board
            </label>
            <select
              value={targetBoard.toLowerCase()}
              onChange={(e) => { soundService.playClick(); setTargetBoard(e.target.value); }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5EF] bg-white text-sm text-[#25212B] font-semibold focus:outline-none focus:border-[#56358B] transition cursor-pointer"
            >
              {BOARDS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.shortName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#25212B] mb-1.5 flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-[#16A39A]" />
              Select Target Class
            </label>
            <select
              value={targetGrade}
              onChange={(e) => { soundService.playClick(); setTargetGrade(Number(e.target.value)); }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5EF] bg-white text-sm text-[#25212B] font-semibold focus:outline-none focus:border-[#56358B] transition cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                <option key={g} value={g}>
                  {isUpBoard ? `कक्षा ${g}` : `Class ${g}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Summary */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#E9E5EF] flex items-center justify-center gap-3 text-xs font-bold">
          <span className="text-[#777381]">{currentBoard.toUpperCase()} Class {currentGrade}</span>
          <ArrowRight className="w-4 h-4 text-[#56358B]" />
          <span className="text-[#56358B]">{targetBoard.toUpperCase()} Class {targetGrade}</span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={handleConfirm}
            disabled={!hasChanged || isSubmitting}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-sm ${
              hasChanged 
                ? 'bg-[#56358B] hover:bg-[#482C75] text-white hover:scale-[1.01] active:scale-[0.99] cursor-pointer' 
                : 'bg-[#E9E5EF] text-[#777381] cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-[#16A39A]" />
            <span>{hasChanged ? 'Confirm & Switch Class' : 'Select a Different Class/Board'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#777381] text-xs font-semibold transition"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
