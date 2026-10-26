// GYAAN.AI Complete Logo Component
// Combines SVG LogoMark with Brand Typography and Active Recall Badge

import React from 'react';
import LogoMark from './LogoMark';

export default function Logo({
  size = 'md',
  showTagline = true,
  className = '',
  onClick
}) {
  const markSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const tagSize = size === 'sm' ? 'text-[9px]' : 'text-[10px]';

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      <LogoMark 
        size={markSize} 
        className="transition-transform group-hover:scale-105" 
      />

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`${textSize} font-black text-[#221E2C] tracking-tight`}>
            GYAAN<span className="text-[#56358B]">.AI</span>
          </span>
          <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#14A89A] bg-[#14A89A]/10 border border-[#14A89A]/20 rounded">
            Active Recall
          </span>
        </div>

        {showTagline && (
          <p className={`${tagSize} text-[#6C667A] font-medium tracking-tight mt-0.5`}>
            Don&apos;t just watch. Prove it.
          </p>
        )}
      </div>
    </div>
  );
}
