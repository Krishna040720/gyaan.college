// GYAAN.AI Mastery Pill Component
// Authoritative mastery state indicator across all screens
// Below 60%: strengthening required (red-toned)
// 60-79%: developing (amber)
// 80%+: strong understanding (teal/emerald)
// Unassessed: Not Assessed (slate)

import React from 'react';
import { CheckCircle2, AlertCircle, HelpCircle, Sparkles } from 'lucide-react';
import { getMasteryCategory } from '../../services/progressService';

export default function MasteryPill({
  mastery,
  isAssessed = false,
  showIcon = true,
  size = 'md',
  className = ''
}) {
  const cat = getMasteryCategory(mastery, isAssessed);

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2'
  };

  const renderIcon = () => {
    if (!showIcon) return null;
    if (!isAssessed || mastery === null || mastery === undefined) {
      return <HelpCircle className="w-3.5 h-3.5 shrink-0" />;
    }
    if (mastery < 60) {
      return <AlertCircle className="w-3.5 h-3.5 shrink-0" />;
    }
    if (mastery < 80) {
      return <Sparkles className="w-3.5 h-3.5 shrink-0" />;
    }
    return <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />;
  };

  return (
    <span
      className={`inline-flex items-center font-bold rounded-lg border select-none whitespace-nowrap ${cat.badgeClass} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      title={cat.label}
    >
      {renderIcon()}
      <span>{cat.shortLabel || cat.label}</span>
      {isAssessed && typeof mastery === 'number' && (
        <span className="font-mono text-[10px] opacity-80">({mastery}%)</span>
      )}
    </span>
  );
}
