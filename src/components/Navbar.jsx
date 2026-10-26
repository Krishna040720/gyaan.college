// GYAAN.AI Top Navigation Bar
// Logo (mobile), Global Search (Ctrl+K), Enrolled Board/Class (Locked vs Guest), Compact Voice/Settings/Profile

import React from 'react';
import { 
  Search, 
  ChevronDown, 
  RotateCcw, 
  Flame, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Settings, 
  LogIn, 
  Lock,
  User
} from 'lucide-react';
import { BOARDS } from '../data/boardsRegistry';
import { soundService } from '../services/soundService';
import { progressService } from '../services/progressService';
import { authService } from '../services/authService';
import Logo from './brand/Logo';

export default function Navbar({
  selectedBoard,
  onSelectBoard,
  selectedGrade,
  onSelectGrade,
  xp = 0,
  streak = 0,
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  onOpenProfile,
  onOpenSearch,
  onOpenAuth,
  onOpenChangeEnrollment,
  onOpenDueWork
}) {
  const revisionQueue = progressService.getRevisionQueue();
  const isUpBoard = selectedBoard?.id === 'up_board';
  const isGuest = authService.isGuest();
  const authUser = authService.getAuthUser();

  return (
    <header className="sticky top-0 z-20 w-full border-b border-[#E5E0EE] bg-white/95 backdrop-blur-md">
      <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Left Side: Mobile Logo & Desktop Search */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {/* Logo on Mobile/Tablet (Sidebar has it on desktop) */}
          <div className="md:hidden shrink-0">
            <Logo size="sm" showTagline={false} />
          </div>

          {/* Global Search Input Trigger (Ctrl+K) */}
          <button
            onClick={() => {
              soundService.playClick();
              if (onOpenSearch) onOpenSearch();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FAF9FC] hover:bg-[#F2EFF7] text-[#6C667A] hover:text-[#221E2C] border border-[#E5E0EE] transition text-xs font-medium cursor-pointer"
            title="Search topics, formulas, or concepts (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-[#6C667A]" />
            <span className="hidden sm:inline text-[#6C667A]">Search curriculum...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] text-[#6C667A] bg-white rounded border border-[#E5E0EE] font-mono">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Center/Right: Board & Class Context (Locked for Authenticated, Selectable for Guests) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Board Selector / Locked Pill */}
          {isGuest ? (
            <div className="relative">
              <select
                value={selectedBoard?.id || 'cbse'}
                onChange={(e) => {
                  soundService.playClick();
                  onSelectBoard(e.target.value);
                }}
                className="appearance-none bg-[#FAF9FC] text-[#221E2C] font-semibold text-xs sm:text-sm pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-1.5 sm:py-2 rounded-xl border border-[#E5E0EE] hover:border-[#D2CADF] transition cursor-pointer focus:outline-none focus:border-[#56358B]"
              >
                {BOARDS.map((b) => (
                  <option key={b.id} value={b.id} className="bg-white text-[#221E2C]">
                    {b.shortName}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6C667A] absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          ) : (
            <button
              onClick={() => {
                soundService.playClick();
                if (onOpenChangeEnrollment) onOpenChangeEnrollment();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-[#56358B]/10 hover:bg-[#56358B]/15 text-[#56358B] border border-[#56358B]/20 font-bold text-xs sm:text-sm transition group cursor-pointer"
              title="Enrolled board is locked. Click to request change."
            >
              <span>{(authUser?.enrolledBoard || selectedBoard?.shortName || 'CBSE').toUpperCase()}</span>
              <Lock className="w-3.5 h-3.5 text-[#56358B]/70 group-hover:text-[#56358B]" />
            </button>
          )}

          {/* Class Select Dropdown (1 to 12) / Locked Pill */}
          {isGuest ? (
            <div className="relative">
              <select
                value={selectedGrade}
                onChange={(e) => {
                  soundService.playClick();
                  onSelectGrade(Number(e.target.value));
                }}
                className="appearance-none bg-[#FAF9FC] text-[#221E2C] font-semibold text-xs sm:text-sm pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-1.5 sm:py-2 rounded-xl border border-[#E5E0EE] hover:border-[#D2CADF] transition cursor-pointer focus:outline-none focus:border-[#56358B]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g} className="bg-white text-[#221E2C]">
                    {isUpBoard ? `कक्षा ${g}` : `Class ${g}`}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6C667A] absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          ) : (
            <button
              onClick={() => {
                soundService.playClick();
                if (onOpenChangeEnrollment) onOpenChangeEnrollment();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-[#14A89A]/10 hover:bg-[#14A89A]/15 text-[#10897D] border border-[#14A89A]/20 font-bold text-xs sm:text-sm transition group cursor-pointer"
              title="Enrolled class is locked. Click to request change."
            >
              <span>{isUpBoard ? `कक्षा ${selectedGrade}` : `Class ${selectedGrade}`}</span>
              <Lock className="w-3.5 h-3.5 text-[#14A89A]/70 group-hover:text-[#10897D]" />
            </button>
          )}

          {/* Revision Due Badge */}
          {!isGuest && revisionQueue.length > 0 && (
            <button 
              onClick={() => {
                soundService.playClick();
                if (onOpenDueWork) onOpenDueWork();
              }}
              title={`${revisionQueue.length} concepts scheduled for spaced repetition review.`}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>{revisionQueue.length} Due</span>
            </button>
          )}

          {/* Restrained Gamification: Streak Pill */}
          {!isGuest && (
            <div 
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs font-bold text-amber-800"
              title="Daily Active Study Streak"
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>{streak}d</span>
            </div>
          )}

          {/* XP Pill / Profile Trigger */}
          <div 
            onClick={onOpenProfile}
            className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer transition ${
              isGuest 
                ? 'bg-[#FAF9FC] border-[#E5E0EE] text-[#6C667A] hover:bg-[#F2EFF7]'
                : 'bg-[#56358B]/10 border-[#56358B]/20 text-[#56358B] hover:bg-[#56358B]/15'
            }`}
            title={isGuest ? 'Guest Explorer' : `Total Mastery XP (${authUser?.name || 'Scholar'})`}
          >
            {isGuest ? (
              <>
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>Guest</span>
              </>
            ) : (
              <>
                <Trophy className="w-3.5 h-3.5 text-[#56358B]" />
                <span>{xp} XP</span>
              </>
            )}
          </div>

          {/* Mobile Sound Toggle */}
          <button
            onClick={() => {
              soundService.playClick();
              onToggleSound();
            }}
            className="md:hidden p-2 rounded-xl bg-[#FAF9FC] hover:bg-[#F2EFF7] text-[#6C667A] border border-[#E5E0EE] transition cursor-pointer"
            title={soundEnabled ? 'Mute Audio Tutor' : 'Enable Audio Tutor'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#56358B]" /> : <VolumeX className="w-4 h-4 text-[#6C667A]" />}
          </button>

          {/* Mobile Settings Toggle */}
          <button
            onClick={() => {
              soundService.playClick();
              if (onOpenSettings) onOpenSettings();
            }}
            className="md:hidden p-2 rounded-xl bg-[#FAF9FC] hover:bg-[#F2EFF7] text-[#6C667A] border border-[#E5E0EE] transition cursor-pointer"
            title="Speech & AI Diagnostics Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Mobile Profile / Auth Button */}
          <div className="md:hidden">
            {isGuest ? (
              <button
                onClick={() => {
                  soundService.playClick();
                  if (onOpenAuth) onOpenAuth();
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#56358B] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  soundService.playClick();
                  if (onOpenProfile) onOpenProfile();
                }}
                className="p-2 rounded-xl bg-[#FAF9FC] text-[#56358B] border border-[#E5E0EE] cursor-pointer"
              >
                <User className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
