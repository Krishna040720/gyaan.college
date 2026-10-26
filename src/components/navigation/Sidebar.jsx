// GYAAN.AI Desktop Sidebar Navigation
// Canonical 7-Destination Educational Navigation:
// Overview · My Learning · Practice · Concept Map · Notes · Revision Plan · Progress
// Enforces Enrolled Board/Class locking and restrained gamification

import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckCircle2, 
  GitBranch, 
  FileText, 
  RotateCcw, 
  TrendingUp,
  Lock,
  Volume2,
  VolumeX,
  Settings,
  LogIn,
  User,
  Sparkles,
  Activity
} from 'lucide-react';
import Logo from '../brand/Logo';
import { authService } from '../../services/authService';
import { progressService } from '../../services/progressService';
import { soundService } from '../../services/soundService';

export default function Sidebar({
  activeView = 'overview',
  onSelectView,
  selectedBoard,
  selectedGrade,
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  onOpenProfile,
  onOpenAuth,
  onOpenChangeEnrollment,
  onOpenWhyGyan
}) {
  const isGuest = authService.isGuest();
  const authUser = authService.getAuthUser();
  const revisionQueue = progressService.getRevisionQueue();
  const dueCount = isGuest ? 0 : revisionQueue.length;

  const NAV_ITEMS = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      description: "Today's plan & learning path"
    },
    {
      id: 'mylearning',
      label: 'My Learning',
      icon: BookOpen,
      description: 'Subjects, chapters & lessons'
    },
    {
      id: 'practice',
      label: 'Practice',
      icon: CheckCircle2,
      description: 'Adaptive questions & oral recall'
    },
    {
      id: 'mindmap',
      label: 'Concept Map',
      icon: GitBranch,
      description: 'Hierarchical knowledge tree'
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: FileText,
      description: 'Textbook notes & formulas'
    },
    {
      id: 'revision',
      label: 'Revision Plan',
      icon: RotateCcw,
      badge: dueCount > 0 ? `${dueCount} Due` : null,
      badgeColor: 'amber',
      description: 'Spaced repetition schedule'
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: TrendingUp,
      description: 'Mastery analytics & topics'
    },
    {
      id: 'voice_debug',
      label: 'Voice Debug',
      icon: Activity,
      badge: authService.isAdmin() ? 'Admin' : 'Restricted',
      badgeColor: authService.isAdmin() ? 'purple' : 'gray',
      description: 'Voice AI trace logs & diagnostics'
    }
  ];

  const handleNavClick = (id) => {
    soundService.playClick();
    if (onSelectView) {
      onSelectView(id);
    }
  };

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[#E5E0EE] flex flex-col justify-between h-screen sticky top-0 z-30 select-none hidden md:flex">
      
      {/* Top Header & Brand */}
      <div className="p-5 border-b border-[#E5E0EE] space-y-4">
        <Logo size="md" />

        {/* Academic Context Badge (Locked for Enrolled, Selector for Guests) */}
        <div className="pt-1">
          {isGuest ? (
            <div className="p-2.5 rounded-xl bg-[#FAF9FC] border border-[#E5E0EE] text-xs space-y-1">
              <div className="flex items-center justify-between text-[#6C667A]">
                <span className="font-semibold uppercase tracking-wider text-[10px]">Academic Context</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 font-bold text-[10px] border border-amber-200">
                  Guest
                </span>
              </div>
              <div className="font-bold text-[#221E2C] flex items-center justify-between">
                <span>{selectedBoard?.shortName || 'CBSE'} • Class {selectedGrade}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                soundService.playClick();
                if (onOpenChangeEnrollment) onOpenChangeEnrollment();
              }}
              className="w-full p-2.5 rounded-xl bg-[#56358B]/5 hover:bg-[#56358B]/10 border border-[#56358B]/20 text-xs transition text-left cursor-pointer group"
              title="Academic context is locked to your enrollment. Click to change."
            >
              <div className="flex items-center justify-between text-[#56358B] mb-0.5">
                <span className="font-bold uppercase tracking-wider text-[10px]">Enrolled Student</span>
                <Lock className="w-3 h-3 text-[#56358B] group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-extrabold text-[#221E2C] text-sm">
                {(authUser?.enrolledBoard || selectedBoard?.shortName || 'CBSE').toUpperCase()} • Class {authUser?.enrolledClass || selectedGrade}
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Primary Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const IconComp = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition group cursor-pointer ${
                isActive
                  ? 'bg-[#56358B] text-white shadow-xs font-bold'
                  : 'text-[#4A4556] hover:bg-[#FAF9FC] hover:text-[#221E2C]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <IconComp className={`w-4 h-4 shrink-0 transition ${
                  isActive ? 'text-white' : 'text-[#6C667A] group-hover:text-[#56358B]'
                }`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                  isActive 
                    ? 'bg-white text-[#56358B]' 
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Controls */}
      <div className="p-4 border-t border-[#E5E0EE] space-y-3 bg-[#FAF9FC]">
        {/* Why GYAAN Pill */}
        <button
          onClick={() => {
            soundService.playClick();
            if (onOpenWhyGyan) onOpenWhyGyan();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-[#F2EFF7] text-[#56358B] text-xs font-semibold border border-[#E5E0EE] transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#56358B]" />
          <span>Why GYAAN.AI?</span>
        </button>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between pt-1">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              soundService.playClick();
              if (onToggleSound) onToggleSound();
            }}
            className="p-2 rounded-xl bg-white hover:bg-[#F2EFF7] text-[#6C667A] hover:text-[#221E2C] border border-[#E5E0EE] transition cursor-pointer"
            title={soundEnabled ? 'Mute Audio Tutor' : 'Enable Audio Tutor'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#56358B]" /> : <VolumeX className="w-4 h-4 text-[#6C667A]" />}
          </button>

          {/* Voice & AI Diagnostics Settings */}
          <button
            onClick={() => {
              soundService.playClick();
              if (onOpenSettings) onOpenSettings();
            }}
            className="p-2 rounded-xl bg-white hover:bg-[#F2EFF7] text-[#6C667A] hover:text-[#221E2C] border border-[#E5E0EE] transition cursor-pointer"
            title="Speech & Diagnostic Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Profile / Auth Button */}
          {isGuest ? (
            <button
              onClick={() => {
                soundService.playClick();
                if (onOpenAuth) onOpenAuth();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white text-xs font-bold transition shadow-xs cursor-pointer"
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
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#F2EFF7] text-[#221E2C] border border-[#E5E0EE] text-xs font-bold transition cursor-pointer"
              title="View Student Profile"
            >
              <User className="w-3.5 h-3.5 text-[#56358B]" />
              <span className="truncate max-w-[80px]">{authUser?.name?.split(' ')[0] || 'Profile'}</span>
            </button>
          )}
        </div>
      </div>

    </aside>
  );
}
