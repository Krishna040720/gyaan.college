// GYAAN.AI Button Component
// Centralized accessible button with design tokens, states, and icon slots

import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft: IconLeft,
  iconRight: IconRight,
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  title,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#56358B] focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer';

  const sizeStyles = {
    xs: 'px-2.5 py-1 text-[11px] rounded-lg gap-1.5',
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-4 py-2 text-xs sm:text-sm rounded-xl gap-2',
    lg: 'px-5 py-2.5 text-sm sm:text-base rounded-2xl gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-[#56358B] hover:bg-[#482C75] text-white shadow-xs hover:shadow border border-[#56358B]',
    secondary: 'bg-[#14A89A] hover:bg-[#10897D] text-white shadow-xs hover:shadow border border-[#14A89A]',
    amber: 'bg-[#F0B44D] hover:bg-[#D99B35] text-white shadow-xs border border-[#F0B44D]',
    outline: 'bg-white hover:bg-[#FAF9FC] text-[#221E2C] border border-[#E5E0EE] hover:border-[#D2CADF] shadow-xs',
    subtle: 'bg-[#FAF9FC] hover:bg-[#EFEBF5] text-[#56358B] border border-[#E5E0EE]',
    ghost: 'bg-transparent hover:bg-[#FAF9FC] text-[#6C667A] hover:text-[#221E2C]',
    danger: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      title={title}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : IconLeft ? (
        <IconLeft className="w-4 h-4 shrink-0" />
      ) : null}

      <span>{children}</span>

      {!loading && IconRight ? (
        <IconRight className="w-4 h-4 shrink-0" />
      ) : null}
    </button>
  );
}
