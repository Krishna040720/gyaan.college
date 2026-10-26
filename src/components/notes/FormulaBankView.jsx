// GYAAN AI Formula & Equation Bank
// Specialized Formula Cards for Physics, Chemistry, Mathematics, and Biology
// Displays SI units, conditions of validity, symbol definitions, and audio pronunciation

import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  Volume2, 
  Search, 
  Atom, 
  Zap, 
  Calculator, 
  Dna,
  BookMarked
} from 'lucide-react';
import { speechManager } from '../../services/aiVoiceService';
import { soundService } from '../../services/soundService';
import { getChapterNotes } from '../../data/notes/notesRegistry';

const FORMULA_DATABASE = [
  // PHYSICS
  {
    id: 'f-ohm',
    subject: 'Physics',
    topic: 'Electricity',
    name: "Ohm's Law",
    formula: 'V = I · R',
    symbols: 'V = Potential Difference (Volts), I = Electric Current (Amperes), R = Resistance (Ohms Ω)',
    siUnit: 'Volt (V)',
    condition: 'Valid only at constant temperature and physical dimensions of the conductor.',
    examNote: 'V-I graph is a straight line passing through origin. Slope of V-I graph equals resistance R.'
  },
  {
    id: 'f-resistivity',
    subject: 'Physics',
    topic: 'Electricity',
    name: 'Resistance & Resistivity',
    formula: 'R = ρ · (L / A)',
    symbols: 'R = Resistance (Ω), ρ = Resistivity (Ω·m), L = Length of conductor (m), A = Cross-sectional area (m²)',
    siUnit: 'Resistivity: Ohm-meter (Ω·m)',
    condition: 'Resistivity depends solely on material and temperature, independent of length or shape.',
    examNote: 'If wire is stretched to double length, its resistance quadruples (R ∝ L² for constant volume).'
  },
  {
    id: 'f-joule',
    subject: 'Physics',
    topic: 'Electricity',
    name: "Joule's Law of Heating",
    formula: 'H = I² · R · t = V · I · t',
    symbols: 'H = Heat energy produced (Joules), I = Current (A), R = Resistance (Ω), t = Time elapsed (s)',
    siUnit: 'Joule (J)',
    condition: 'Applies to purely resistive heating elements like nichrome in electric irons/toasters.',
    examNote: '1 kWh = 3.6 × 10⁶ Joules (Commercial unit of electrical energy).'
  },
  {
    id: 'f-mirror',
    subject: 'Physics',
    topic: 'Light - Optics',
    name: 'Mirror Formula & Magnification',
    formula: '1/f = 1/v + 1/u  |  m = -v/u = h\'/h',
    symbols: 'f = Focal length, u = Object distance, v = Image distance, h = Object height, h\' = Image height',
    siUnit: 'Meter (m) / Centimeter (cm)',
    condition: 'Cartesian sign convention strictly applies: u is always negative; concave f is negative; convex f is positive.',
    examNote: 'Magnification m < 0 indicates real & inverted image; m > 0 indicates virtual & erect image.'
  },
  {
    id: 'f-snell',
    subject: 'Physics',
    topic: 'Light - Optics',
    name: "Snell's Law of Refraction",
    formula: 'n = sin(i) / sin(r) = c / v',
    symbols: 'n = Refractive index, i = Angle of incidence, r = Angle of refraction, c = Speed of light in vacuum',
    siUnit: 'Dimensionless (Unitless ratio)',
    condition: 'Applies for a given pair of media and monochromatic light.',
    examNote: 'Light bending towards normal indicates entering an optically denser medium (speed decreases).'
  },

  // CHEMISTRY
  {
    id: 'f-combustion',
    subject: 'Chemistry',
    topic: 'Chemical Reactions',
    name: 'Combustion of Hydrocarbons',
    formula: 'CH₄ + 2O₂ → CO₂ + 2H₂O + Heat + Light',
    symbols: 'Reactants: Methane gas + Oxygen gas; Products: Carbon dioxide + Water vapor',
    siUnit: 'Exothermic (ΔH < 0)',
    condition: 'Requires sufficient supply of oxygen; incomplete combustion yields carbon monoxide (CO) and soot.',
    examNote: 'Exothermic reactions release energy; represented with + Heat on product side.'
  },
  {
    id: 'f-redox',
    subject: 'Chemistry',
    topic: 'Chemical Reactions',
    name: 'Redox Reaction (Reduction & Oxidation)',
    formula: 'CuO + H₂ →(heat) Cu + H₂O',
    symbols: 'CuO is reduced to Cu (loss of oxygen); H₂ is oxidized to H₂O (gain of oxygen)',
    siUnit: 'Conservation of mass & electron transfer',
    condition: 'Oxidation and reduction occur simultaneously in chemical systems.',
    examNote: 'Oxidizing agent is the substance that gets reduced (CuO); Reducing agent is the substance oxidized (H₂).'
  },
  {
    id: 'f-ph',
    subject: 'Chemistry',
    topic: 'Acids, Bases & Salts',
    name: 'pH Scale & Hydrogen Ion Concentration',
    formula: 'pH = -log₁₀[H⁺]',
    symbols: '[H⁺] = Hydrogen ion concentration in mol/L; pH range 0 (strongly acidic) to 14 (strongly alkaline)',
    siUnit: 'Dimensionless pH unit',
    condition: 'Neutral water at 25°C has pH = 7.0 ([H⁺] = 10⁻⁷ mol/L).',
    examNote: 'Tooth decay starts when mouth pH falls below 5.5 due to bacterial acid production.'
  },

  // MATHEMATICS
  {
    id: 'f-quad',
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    name: 'Quadratic Formula (Shreedharacharya Rule)',
    formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
    symbols: 'ax² + bx + c = 0 (a ≠ 0), Discriminant D = b² - 4ac',
    siUnit: 'Roots / Solutions',
    condition: 'If D > 0: two distinct real roots; D = 0: two equal real roots; D < 0: no real roots.',
    examNote: 'Always state the nature of roots using D before computing roots in board exams.'
  },
  {
    id: 'f-trig-ident',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    name: 'Fundamental Pythagorean Trigonometric Identities',
    formula: 'sin²θ + cos²θ = 1  |  1 + tan²θ = sec²θ  |  1 + cot²θ = cosec²θ',
    symbols: 'θ = Acute angle in right-angled triangle; sin θ = P/H, cos θ = B/H, tan θ = P/B',
    siUnit: 'Ratios (Dimensionless)',
    condition: 'Valid for all values of θ where trigonometric functions are mathematically defined.',
    examNote: 'In trigonometric identity proofs, converting everything into sin and cos resolves 90% of exam problems.'
  },
  {
    id: 'f-ap',
    subject: 'Mathematics',
    topic: 'Arithmetic Progressions',
    name: 'nth Term & Sum of AP',
    formula: 'aₙ = a + (n - 1)d  |  Sₙ = (n/2) · [2a + (n - 1)d] = (n/2) · [a + l]',
    symbols: 'a = First term, d = Common difference, n = Number of terms, l = Last term (aₙ)',
    siUnit: 'Numerical series terms',
    condition: 'Common difference d = aₖ - aₖ₋₁ must remain constant across all terms.',
    examNote: 'If 3 terms in AP are required in a word problem, assume them as (a - d), a, (a + d).'
  },

  // BIOLOGY
  {
    id: 'f-photosynthesis',
    subject: 'Biology',
    topic: 'Life Processes',
    name: 'Photosynthesis Chemical Equation',
    formula: '6CO₂ + 12H₂O →(chlorophyll, sunlight) C₆H₁₂O₆ + 6O₂ + 6H₂O',
    symbols: 'Carbon dioxide + Water in presence of Chlorophyll & Sunlight yields Glucose + Oxygen + Water',
    siUnit: 'Biochemical Autotrophic Equation',
    condition: 'Occurs in the chloroplasts of green mesophyll cells during daytime photoperiod.',
    examNote: 'Oxygen released during photosynthesis originates from water molecules (photolysis of water), not CO₂.'
  }
];

export default function FormulaBankView({ _chapter, chapter: propChapter, grade, subject, board }) {
  const currentChapter = propChapter || _chapter;
  const [activeSubject, setActiveSubject] = useState('all'); // 'all' | 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology'
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const formulasList = useMemo(() => {
    const list = [...FORMULA_DATABASE];

    if (currentChapter) {
      const chapName = currentChapter.titleEn || currentChapter.chapterTitle || currentChapter.name || 'Chapter Formula';
      const subjName = typeof subject === 'string' ? subject : (subject?.name || currentChapter.subjectName || 'Physics');

      // 1. Chapter-level direct formulas
      if (Array.isArray(currentChapter.formulas)) {
        currentChapter.formulas.forEach((f, idx) => {
          if (!list.some(item => item.name.toLowerCase() === (f.name || '').toLowerCase())) {
            list.unshift({
              id: `chap-f-${currentChapter.id || currentChapter.num || 'c'}-${idx}`,
              subject: subjName,
              topic: chapName,
              name: f.name || 'Governing Equation',
              formula: f.formula,
              symbols: f.desc || f.symbols || 'Standard governing relationship.',
              siUnit: f.units || f.siUnit || 'SI Units',
              condition: f.condition || 'Applies under standard curriculum boundary conditions.',
              examNote: f.examNote || 'High-frequency relation in board numericals and derivations.'
            });
          }
        });
      }

      // 2. Topic-level formulas from Notes Registry
      try {
        const notes = getChapterNotes(
          board || 'cbse',
          grade || currentChapter.classLevel || 11,
          typeof subject === 'string' ? subject : (subject?.id || 'phy'),
          currentChapter.id || currentChapter.num
        );
        if (notes && Array.isArray(notes.topics)) {
          notes.topics.forEach((t) => {
            if (Array.isArray(t.formulas)) {
              t.formulas.forEach((tf, tfIdx) => {
                if (!list.some(item => item.name.toLowerCase() === (tf.name || '').toLowerCase())) {
                  list.unshift({
                    id: `note-f-${t.id || 't'}-${tfIdx}`,
                    subject: notes.subjectName || subjName,
                    topic: t.title || chapName,
                    name: tf.name,
                    formula: tf.formula,
                    symbols: tf.desc || 'Fundamental physical / chemical parameters.',
                    siUnit: tf.units || 'SI Units',
                    condition: 'Strictly valid within NCERT / ISC syllabus scope.',
                    examNote: 'Key equation for stepwise marking in board examinations.'
                  });
                }
              });
            }
          });
        }
      } catch {
        // Fallback silently if notes lookup is unavailable
      }
    }

    return list;
  }, [currentChapter, grade, subject, board]);

  const handleCopy = (id, text) => {
    soundService.playSuccess();
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (formula) => {
    soundService.playClick();
    const textToSpeak = `${formula.name}. Formula: ${formula.formula}. Where ${formula.symbols}. Standard unit: ${formula.siUnit}. Remember: ${formula.examNote}`;
    speechManager.speak(textToSpeak);
  };

  const filtered = formulasList.filter(f => {
    if (activeSubject !== 'all' && f.subject !== activeSubject) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return f.name.toLowerCase().includes(q) ||
        f.formula.toLowerCase().includes(q) ||
        f.topic.toLowerCase().includes(q) ||
        f.symbols.toLowerCase().includes(q);
    }
    return true;
  });

  const getSubjectIcon = (subj) => {
    switch (subj) {
      case 'Physics': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'Chemistry': return <Atom className="w-4 h-4 text-[#16A39A]" />;
      case 'Mathematics': return <Calculator className="w-4 h-4 text-[#56358B]" />;
      case 'Biology': return <Dna className="w-4 h-4 text-emerald-600" />;
      default: return <BookMarked className="w-4 h-4 text-[#56358B]" />;
    }
  };

  return (
    <div className="max-w-[780px] mx-auto space-y-6 text-[#25212B]">
      
      {/* Header bar */}
      <div className="p-6 rounded-3xl bg-white border border-[#E9E5EF] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E9E5EF] pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#56358B]">
              Standardized Curriculum Reference
            </span>
            <h3 className="text-xl font-black text-[#25212B]">
              Formula, Equation & Unit Bank
            </h3>
            <p className="text-xs text-[#777381]">
              Verified formulas with SI units, conditions of validity, and board exam notes
            </p>
          </div>
        </div>

        {/* Search & Subject Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search formula (e.g. Ohm, Mirror, Snell, Photosynthesis)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E9E5EF] bg-[#FAF9FC] text-xs font-semibold placeholder-[#A6A2AF] focus:outline-none focus:border-[#56358B] transition"
            />
            <Search className="w-4 h-4 text-[#777381] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="flex items-center gap-1 bg-[#FAF9FC] p-1 rounded-xl border border-[#E9E5EF] text-xs font-bold overflow-x-auto w-full sm:w-auto scrollbar-none">
            {['all', 'Physics', 'Chemistry', 'Mathematics', 'Biology'].map((subj) => (
              <button
                key={subj}
                onClick={() => { soundService.playClick(); setActiveSubject(subj); }}
                className={`py-1.5 px-3 rounded-lg transition whitespace-nowrap ${
                  activeSubject === subj ? 'bg-[#56358B] text-white shadow-2xs' : 'text-[#777381] hover:text-[#25212B]'
                }`}
              >
                {subj === 'all' ? 'All Subjects' : subj}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Formula Cards */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white border border-[#E9E5EF] text-xs text-[#777381]">
            No formulas match the current search filters.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E9E5EF] hover:border-[#56358B]/40 shadow-xs transition space-y-3.5"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E9E5EF] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF9FC] border border-[#E9E5EF] flex items-center justify-center">
                    {getSubjectIcon(item.subject)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#777381]">
                        {item.subject} • {item.topic}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#25212B]">
                      {item.name}
                    </h4>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSpeak(item)}
                    className="p-2 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#56358B] transition border border-[#E9E5EF]"
                    title="Pronounce formula out loud"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleCopy(item.id, `${item.name}: ${item.formula} (${item.symbols})`)}
                    className="p-2 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#777381] hover:text-[#25212B] transition border border-[#E9E5EF]"
                    title="Copy formula"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Formula Display Box */}
              <div className="p-4 rounded-2xl bg-[#56358B]/5 border border-[#56358B]/15 text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#56358B] block mb-1">
                  Governing Equation:
                </span>
                <div className="text-base sm:text-lg font-mono font-black text-[#56358B] tracking-wide">
                  {item.formula}
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#FAF9FC] border border-[#E9E5EF] space-y-1">
                  <strong className="block text-[#25212B] font-bold">Symbol Meanings:</strong>
                  <p className="text-[#777381] leading-relaxed">{item.symbols}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9FC] border border-[#E9E5EF] space-y-1">
                  <strong className="block text-[#16A39A] font-bold">Standard SI Unit:</strong>
                  <p className="text-[#25212B] font-semibold">{item.siUnit}</p>
                </div>
              </div>

              {/* Validity Condition & Exam Strategy */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1">
                <strong className="block font-bold text-amber-900">Condition of Validity & Board Tip:</strong>
                <p className="leading-relaxed text-amber-900/90">{item.condition} {item.examNote}</p>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
