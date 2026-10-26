// GYAAN.AI Deterministic SVG Brand Mark
// Geometric synthesis of:
// 1. Open Book (Knowledge Foundation)
// 2. Diamond Cap (Academic Rigor & Achievement)
// 3. Acoustic Voice Beacon (Feynman Oral Recall Differentiator)
// Optimized for 16px, 24px, 32px, 48px rendering

import React from 'react';

export default function LogoMark({ 
  size = 32, 
  className = '', 
  animated = false 
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GYAAN.AI Brand Mark"
      className={`inline-block select-none ${className}`}
    >
      <defs>
        {/* Deep Purple Brand Gradient */}
        <linearGradient id="gyaanPurpleGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#56358B" />
          <stop offset="100%" stopColor="#43266E" />
        </linearGradient>

        {/* Learning Teal Acoustic Wave Gradient */}
        <linearGradient id="gyaanTealGrad" x1="16" y1="6" x2="32" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1DD4C9" />
          <stop offset="100%" stopColor="#14A89A" />
        </linearGradient>

        {/* Focus Amber Diamond Intellect Accent */}
        <linearGradient id="gyaanGoldGrad" x1="20" y1="2" x2="28" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F0B44D" />
          <stop offset="100%" stopColor="#D99B35" />
        </linearGradient>
      </defs>

      {/* Rounded Hexagonal / Shield Background Container */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill="url(#gyaanPurpleGrad)"
      />

      {/* 1. KNOWLEDGE FOUNDATION: Stylized Open Book Wings */}
      {/* Left Page Wing */}
      <path
        d="M24 37C19.5 34 13.5 34 8 36V22C13.5 20.5 19.5 21 24 23.5V37Z"
        fill="#FFFFFF"
        fillOpacity="0.95"
      />
      {/* Right Page Wing */}
      <path
        d="M24 37C28.5 34 34.5 34 40 36V22C34.5 20.5 28.5 21 24 23.5V37Z"
        fill="#FFFFFF"
        fillOpacity="0.82"
      />
      {/* Book Spine Center Line */}
      <line
        x1="24"
        y1="23.5"
        x2="24"
        y2="37"
        stroke="#482C75"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* 2. ACOUSTIC VOICE BEACON: Radiating Soundwaves (Feynman Oral Recall) */}
      {/* Outer Sound Wave Arc */}
      <path
        d="M17 12C21.2 9.5 26.8 9.5 31 12"
        stroke="url(#gyaanTealGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className={animated ? 'animate-pulse' : ''}
      />
      {/* Inner Sound Wave Arc */}
      <path
        d="M20 15.5C22.4 14 25.6 14 28 15.5"
        stroke="#16A39A"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 3. DIAMOND SCHOLAR'S CREST (Intelligence & Academic Rigor) */}
      <polygon
        points="24,14 27.5,18 24,22 20.5,18"
        fill="url(#gyaanGoldGrad)"
      />
      
      {/* Central Radiance Core */}
      <circle
        cx="24"
        cy="18"
        r="1.5"
        fill="#FFFFFF"
      />
    </svg>
  );
}
