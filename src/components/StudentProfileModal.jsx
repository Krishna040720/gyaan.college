import React, { useState } from 'react';
import { 
  X, 
  Trophy, 
  Flame, 
  Download, 
  Upload,
  LogIn,
  LogOut,
  Sparkles
} from 'lucide-react';
import { gamificationService } from '../services/gamificationService';
import { progressService } from '../services/progressService';
import { studentService } from '../services/studentService';
import { authService } from '../services/authService';
import { soundService } from '../services/soundService';

export default function StudentProfileModal({
  isOpen,
  onClose,
  selectedGrade,
  onOpenAuth,
  onOpenChangeEnrollment
}) {
  const [copyNotice, setCopyNotice] = useState('');

  if (!isOpen) return null;

  const isGuest = authService.isGuest();
  const authUser = authService.getAuthUser();
  const gamification = gamificationService.getGamificationState();
  const masteryStats = progressService.getOverallMastery();
  const weakTopics = progressService.getWeakTopics();
  const badges = gamification.badges || [];

  const handleExportData = () => {
    soundService.playSuccess();
    const jsonStr = studentService.exportProfileData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gyan-student-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setCopyNotice('Progress backup downloaded safely!');
    setTimeout(() => setCopyNotice(''), 3000);
  };

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result;
          if (typeof content === 'string') {
            const success = studentService.importProfileData(content);
            if (success) {
              soundService.playSuccess();
              setCopyNotice('Progress restored! Reloading...');
              setTimeout(() => window.location.reload(), 800);
            } else {
              setCopyNotice('Invalid backup file format.');
            }
          }
        } catch {
          setCopyNotice('Could not parse backup file.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleSignOut = () => {
    soundService.playClick();
    authService.signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25212B]/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-white border border-[#E9E5EF] shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto text-[#25212B]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9FC] text-[#777381] hover:text-[#25212B] hover:bg-[#E9E5EF] transition border border-[#E9E5EF]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Card Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#56358B] to-[#16A39A] flex items-center justify-center text-white shadow-md text-3xl">
              {authUser?.avatar || (isGuest ? '👤' : '🦁')}
            </div>
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-[#16A39A] text-[10px] font-black text-white">
              {isGuest ? 'Guest' : `Lvl ${gamification.level}`}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-[#25212B]">
                {authUser?.name || (isGuest ? 'Guest Explorer' : `Young Scholar • Class ${selectedGrade}`)}
              </h3>
            </div>
            <div className="text-xs text-[#56358B] font-semibold flex items-center gap-1.5 mt-0.5">
              {isGuest ? (
                <span>Visitor Mode • Unauthenticated</span>
              ) : (
                <>
                  <span>{(authUser?.enrolledBoard || 'CBSE').toUpperCase()} • Class {authUser?.enrolledClass || selectedGrade}</span>
                  <button 
                    onClick={() => {
                      onClose();
                      if (onOpenChangeEnrollment) onOpenChangeEnrollment();
                    }}
                    className="ml-2 text-[11px] text-[#56358B] hover:text-[#482C75] font-bold underline cursor-pointer"
                  >
                    Change Class
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Guest Banner */}
        {isGuest && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-amber-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" /> Save Your Learning Journey
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-200/60 font-bold">
                Guest Mode
              </span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              You are currently learning as a guest. Sign in to save your daily streak, Feynman voice explanations, and unlock achievement badges.
            </p>
            <div className="pt-1">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenAuth) onOpenAuth();
                }}
                className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In or Create Student Profile</span>
              </button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#777381] block">Daily Streak</span>
              <span className="text-xl font-black text-[#25212B]">{gamification.streak} Days</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#56358B]/10 text-[#56358B]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#777381] block">Knowledge XP</span>
              <span className="text-xl font-black text-[#56358B]">{gamification.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        {!isGuest && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF]">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-[#25212B]">Level {gamification.level} Progress</span>
              <span className="text-[#56358B]">{gamification.nextLevelXp - gamification.xp} XP to Level {gamification.level + 1}</span>
            </div>
            <div className="w-full h-2 bg-[#E9E5EF] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#56358B] to-[#16A39A] transition-all duration-300"
                style={{ width: `${gamification.progressToNextLevel}%` }}
              />
            </div>
          </div>
        )}

        {/* Learning Health Summary */}
        <div className="p-4 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] mb-6 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#777381] block">
            Learning Mastery Health:
          </span>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-white border border-[#E9E5EF]">
              <span className="text-[10px] text-[#777381] block">Avg Mastery</span>
              <span className="text-base font-extrabold text-emerald-700">{masteryStats.averageMastery}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#E9E5EF]">
              <span className="text-[10px] text-[#777381] block">Topics Studied</span>
              <span className="text-base font-extrabold text-[#16A39A]">{masteryStats.totalTopics}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#E9E5EF]">
              <span className="text-[10px] text-[#777381] block">Focus Topics</span>
              <span className="text-base font-extrabold text-rose-600">{weakTopics.length}</span>
            </div>
          </div>
        </div>

        {/* Badges Unlocked */}
        <div className="space-y-3 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#777381] block">
            Achievements & Confidence Badges:
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {badges.map((b) => (
              <div 
                key={b.id}
                className={`p-3 rounded-xl border flex items-start gap-2.5 transition ${
                  b.unlocked 
                    ? 'bg-[#56358B]/5 border-[#56358B]/20 text-[#25212B]' 
                    : 'bg-[#FAF9FC] border-[#E9E5EF] opacity-50 text-[#777381]'
                }`}
              >
                <span className="text-xl">{b.icon}</span>
                <div className="space-y-0.5">
                  <h5 className="text-xs font-bold text-[#25212B]">{b.title}</h5>
                  <p className="text-[10px] text-[#777381] leading-tight">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Portability (Export & Import) */}
        {!isGuest && (
          <div className="p-4 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#777381]">
                Data Backup & Sync
              </span>
              {copyNotice && (
                <span className="text-[10px] text-emerald-700 font-bold animate-pulse">
                  {copyNotice}
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#777381]">
              Export your XP, badges, and learning history as a JSON backup or import it onto another device.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleExportData}
                className="flex-1 py-1.5 px-3 rounded-xl bg-white hover:bg-[#FAF9FC] text-[#25212B] text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-[#E9E5EF] shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#56358B]" /> Export Backup
              </button>
              <button
                onClick={handleImportClick}
                className="flex-1 py-1.5 px-3 rounded-xl bg-white hover:bg-[#FAF9FC] text-[#25212B] text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-[#E9E5EF] shadow-xs cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#16A39A]" /> Import Backup
              </button>
            </div>
          </div>
        )}

        {/* Role & Permissions (Admin Access) */}
        {!isGuest && (
          <div className="p-4 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] mb-6 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-[#777381]">
                Account Role:
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                authUser?.role === 'admin'
                  ? 'bg-[#56358B]/15 text-[#56358B] border border-[#56358B]/30'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                {authUser?.role || 'student'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 pt-1 text-xs">
              <span className="text-[11px] text-[#777381]">Admin Voice Debug access:</span>
              <button
                type="button"
                onClick={() => {
                  soundService.playClick();
                  const newRole = authUser?.role === 'admin' ? 'student' : 'admin';
                  authService.setRole(newRole);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  authUser?.role === 'admin'
                    ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                    : 'bg-white text-[#56358B] border-[#56358B]/30 hover:bg-[#56358B]/10'
                }`}
              >
                {authUser?.role === 'admin' ? 'Switch to Student Role' : 'Switch to Admin Role'}
              </button>
            </div>
          </div>
        )}

        {/* Sign Out or Close */}
        <div className="space-y-2">
          {!isGuest && (
            <button
              onClick={handleSignOut}
              className="w-full py-2.5 rounded-xl bg-[#FAF9FC] hover:bg-rose-50 hover:text-rose-600 text-xs font-bold text-[#777381] transition border border-[#E9E5EF] flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of Account</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#56358B] hover:bg-[#462973] text-xs font-bold text-white transition shadow-sm"
          >
            Keep Learning & Speaking
          </button>
        </div>

      </div>
    </div>
  );
}
