// GYAAN.AI Mobile Bottom Navigation Bar
// Accessible touch targets (min 44px) for 5 key destinations on mobile/tablet viewports

import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckCircle2, 
  GitBranch, 
  FileText,
  RotateCcw 
} from 'lucide-react';
import { soundService } from '../../services/soundService';
import { progressService } from '../../services/progressService';
import { authService } from '../../services/authService';

export default function BottomNav({
  activeView = 'overview',
  onSelectView
}) {
  const isGuest = authService.isGuest();
  const revisionQueue = progressService.getRevisionQueue();
  const dueCount = isGuest ? 0 : revisionQueue.length;

  const ITEMS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'mylearning', label: 'Learn', icon: BookOpen },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'mindmap', label: 'Mind Map', icon: GitBranch },
    { id: 'practice', label: 'Practice', icon: CheckCircle2 }
  ];

  const handleNavClick = (id) => {
    soundService.playClick();
    if (onSelectView) {
      onSelectView(id);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E0EE] px-2 py-1.5 flex items-center justify-around shadow-lg safe-area-inset-bottom">
      {ITEMS.map((item) => {
        const IconComp = item.icon;
        const isActive = activeView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl text-[10px] font-semibold transition select-none cursor-pointer relative ${
              isActive
                ? 'text-[#56358B] font-bold'
                : 'text-[#6C667A] hover:text-[#221E2C]'
            }`}
          >
            <div className="relative">
              <IconComp className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-[#56358B]' : ''}`} />
              {item.badge && (
                <span className="absolute -top-1 -right-2.5 w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="mt-0.5 leading-none">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
