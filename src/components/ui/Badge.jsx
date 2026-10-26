// GYAAN.AI Badge Component
// Restrained status, category, and subject tags

import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = ''
}) {
  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-[10px] gap-1',
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5'
  };

  const variantStyles = {
    default: 'bg-[#FAF9FC] text-[#6C667A] border border-[#E5E0EE]',
    primary: 'bg-[#56358B]/10 text-[#56358B] border border-[#56358B]/20 font-semibold',
    teal: 'bg-[#14A89A]/10 text-[#10897D] border border-[#14A89A]/20 font-semibold',
    amber: 'bg-[#F0B44D]/15 text-[#B45309] border border-[#F0B44D]/30 font-semibold',
    rose: 'bg-rose-50 text-rose-700 border border-rose-200 font-semibold',
    emerald: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200'
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-lg select-none whitespace-nowrap ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.default} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
