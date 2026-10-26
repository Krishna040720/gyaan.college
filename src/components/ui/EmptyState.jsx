// GYAAN.AI Empty State Component
// Calm, textbook educational placeholder for empty views

import React from 'react';
import { BookOpen } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = BookOpen,
  title = 'No items found',
  description = 'There are currently no items in this section.',
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div className={`p-8 sm:p-12 text-center rounded-2xl bg-white border border-[#E5E0EE] space-y-4 max-w-md mx-auto ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-[#56358B]/10 text-[#56358B] flex items-center justify-center mx-auto">
        <Icon className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-bold text-[#221E2C]">{title}</h3>
        <p className="text-xs text-[#6C667A] leading-relaxed">{description}</p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
