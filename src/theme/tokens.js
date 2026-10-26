// GYAAN.AI Design System Tokens
// Authoritative palette, typography, radii, spacing, and mastery semantics
// Primary Purple: #56358B | Learning Teal: #14A89A | Focus Amber: #F0B44D | Light Canvas: #F7F5FA

export const TOKENS = {
  colors: {
    // Brand Core
    primary: '#56358B',
    primaryHover: '#482C75',
    primaryLight: 'rgba(86, 53, 139, 0.08)',
    primaryBorder: 'rgba(86, 53, 139, 0.20)',

    // Learning Teal
    teal: '#14A89A',
    tealHover: '#10897D',
    tealLight: 'rgba(20, 168, 154, 0.08)',
    tealBorder: 'rgba(20, 168, 154, 0.20)',

    // Focus Amber
    amber: '#F0B44D',
    amberHover: '#D99B35',
    amberLight: 'rgba(240, 180, 77, 0.12)',
    amberBorder: 'rgba(240, 180, 77, 0.28)',

    // Canvas & Surfaces
    canvas: '#F7F5FA',
    surface: '#FFFFFF',
    surfaceSubtle: '#FAF9FC',
    surfaceHover: '#F2EFF7',

    // Neutral Text
    textPrimary: '#221E2C',
    textSecondary: '#4A4556',
    textMuted: '#6C667A',
    textSubtle: '#9A95A8',

    // Borders & Dividers
    borderSubtle: '#EFEBF5',
    borderDefault: '#E5E0EE',
    borderStrong: '#D2CADF',

    // Canonical Educational Mastery Semantics
    mastery: {
      needsStrengthening: {
        threshold: '<60%',
        text: '#B91C1C',
        bg: '#FEF2F2',
        border: '#FECACA',
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
        actionLabel: 'Strengthen Concept',
        label: 'Needs Strengthening'
      },
      developing: {
        threshold: '60–79%',
        text: '#B45309',
        bg: '#FFFBEB',
        border: '#FDE68A',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
        actionLabel: 'Continue Practice',
        label: 'Developing Understanding'
      },
      strong: {
        threshold: '80%+',
        text: '#047857',
        bg: '#ECFDF5',
        border: '#A7F3D0',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        actionLabel: 'Mastered',
        label: 'Strong Understanding'
      },
      notAssessed: {
        threshold: 'Unassessed',
        text: '#4B5563',
        bg: '#F3F4F6',
        border: '#E5E7EB',
        badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
        actionLabel: 'Assess Understanding',
        label: 'Not Assessed Yet'
      }
    }
  },

  radii: {
    xs: '0.25rem',  // 4px
    sm: '0.375rem', // 6px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    xl: '1rem',     // 16px
    '2xl': '1.25rem',// 20px
    '3xl': '1.5rem', // 24px
    full: '9999px'
  },

  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(86, 53, 139, 0.04)',
    sm: '0 1px 3px 0 rgba(86, 53, 139, 0.06), 0 1px 2px -1px rgba(86, 53, 139, 0.04)',
    md: '0 4px 6px -1px rgba(86, 53, 139, 0.08), 0 2px 4px -2px rgba(86, 53, 139, 0.04)',
    lg: '0 10px 15px -3px rgba(86, 53, 139, 0.08), 0 4px 6px -4px rgba(86, 53, 139, 0.03)'
  }
};
