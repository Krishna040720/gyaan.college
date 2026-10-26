// GYAAN.AI Card Component
// Textbook-clean surface container with consistent borders and subtle shadows

import React from 'react';

export default function Card({
  children,
  className = '',
  hover = false,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#E5E0EE] rounded-2xl shadow-xs transition-all ${
        hover ? 'hover:border-[#D2CADF] hover:shadow cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
