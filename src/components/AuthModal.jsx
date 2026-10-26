// GYAAN AI Student Sign-In & Authentication Modal
// Allows guest scholars to create/access their authenticated profile and preserve learning history

import React, { useState } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  LogIn 
} from 'lucide-react';
import { authService } from '../services/authService';
import { soundService } from '../services/soundService';
import { BOARDS } from '../data/boardsRegistry';
import LogoMark from './brand/LogoMark';

const AVATARS = ['🦁', '🚀', '🦉', '⚡', '🌟', '🧠', '🐯', '🐬'];

export default function AuthModal({
  isOpen,
  onClose,
  initialGrade = 10,
  initialBoardId = 'cbse',
  onAuthSuccess
}) {
  const [name, setName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(initialGrade);
  const [selectedBoard, setSelectedBoard] = useState(initialBoardId);
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    soundService.playSuccess();
    const studentName = name.trim() || 'Young Scholar';
    const user = authService.signIn({
      name: studentName,
      grade: Number(selectedGrade),
      boardId: selectedBoard,
      avatar: selectedAvatar
    });
    if (onAuthSuccess) {
      onAuthSuccess(user);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25212B]/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-white border border-[#E9E5EF] shadow-2xl p-6 sm:p-7 text-[#25212B]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9FC] text-[#777381] hover:text-[#25212B] hover:bg-[#E9E5EF] transition border border-[#E9E5EF]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <LogoMark size={38} />
          <div>
            <h3 className="text-xl font-black text-[#25212B] tracking-tight">
              Sign In to GYAAN<span className="text-[#56358B]">.AI</span>
            </h3>
            <p className="text-xs text-[#777381]">
              Save your Feynman voice proofs, XP streaks & badges
            </p>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mb-5 p-3.5 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] space-y-1.5 text-xs text-[#56358B]">
          <div className="flex items-center gap-2 font-bold text-[#25212B]">
            <ShieldCheck className="w-4 h-4 text-[#16A39A]" />
            <span>Zero Tracking • 100% Student Privacy</span>
          </div>
          <p className="text-[11px] text-[#777381] leading-relaxed">
            Your oral explanations and progress are securely stored in your browser session and verified against official board standards.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#25212B] mb-1.5">
              Student Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Aarav Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5EF] bg-white text-sm text-[#25212B] placeholder-[#A6A2AF] focus:outline-none focus:border-[#56358B] transition font-medium"
              />
              <User className="w-4 h-4 text-[#777381] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#25212B] mb-1.5">
                Class / Grade
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E9E5EF] bg-white text-sm text-[#25212B] font-semibold focus:outline-none focus:border-[#56358B] transition cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>Class {g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#25212B] mb-1.5">
                Education Board
              </label>
              <select
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E9E5EF] bg-white text-sm text-[#25212B] font-semibold focus:outline-none focus:border-[#56358B] transition cursor-pointer"
              >
                {BOARDS.map((b) => (
                  <option key={b.id} value={b.id}>{b.shortName}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#25212B] mb-1.5">
              Choose Scholar Mascot
            </label>
            <div className="flex items-center justify-between gap-1 p-2 bg-[#FAF9FC] rounded-xl border border-[#E9E5EF]">
              {AVATARS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => { soundService.playClick(); setSelectedAvatar(emoji); }}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition ${
                    selectedAvatar === emoji
                      ? 'bg-white shadow-sm border border-[#56358B] scale-110'
                      : 'hover:bg-white/60'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#16A39A]" />
              <span>Start Learning Journey</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundService.playSuccess();
                const adminUser = authService.grantAdminAccess();
                if (onAuthSuccess) onAuthSuccess(adminUser);
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#56358B] border border-purple-200 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#56358B]" />
              <span>Sign In with Admin Access (Voice Debug)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#777381] text-xs font-semibold transition cursor-pointer"
            >
              Continue Exploring as Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
