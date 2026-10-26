// GYAAN AI Purpose & Differentiation Modal
// Articulates: "Don't just watch the lesson. Prove that you understood it."

import React from 'react';
import { 
  X, 
  Mic, 
  Sparkles, 
  CheckCircle2, 
  GitBranch,
  RotateCcw
} from 'lucide-react';

export default function WhyGyanModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const comparisonPoints = [
    {
      factor: 'Core Learning Loop',
      traditional: 'Passive video consumption & guesswork MCQs (retention drops under 20% in 48h).',
      gyan: 'Prove Understanding: Close the book, explain out loud in your own words, and have AI verify true conceptual depth.',
      highlight: true
    },
    {
      factor: 'Struggling with a Concept',
      traditional: 'Gives the student another 45-minute lecture of the same concept.',
      gyan: 'Diagnostic Prerequisite Engine: Diagnoses root-cause foundational gaps (e.g. checks Vector Components when failing Projectile Motion).',
      highlight: true
    },
    {
      factor: 'Misconception Detection',
      traditional: 'Only marks MCQs right or wrong; never catches wrong mental models.',
      gyan: 'Real-time Misconception Catching: Detects nuanced traps (e.g. confusing resistance with resistivity or thinking current is consumed).',
      highlight: true
    },
    {
      factor: 'Exam Retention Strategy',
      traditional: 'Cramming the night before exams followed by quick forgetting.',
      gyan: 'Automated Spaced Repetition (SuperMemo SM-2): Schedules revision exactly when memory decay begins (1d, 3d, 7d).',
      highlight: false
    },
    {
      factor: 'Syllabus Authority',
      traditional: 'Disorganized YouTube clips without clear syllabus versions.',
      gyan: 'Strictly structured hierarchical curriculum: Board → Year → Class → Subject → Chapter → Concept, verified against NCERT 2026-27.',
      highlight: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25212B]/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-[#E9E5EF] shadow-2xl p-6 sm:p-8 text-[#25212B]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9FC] text-[#777381] hover:text-[#25212B] hover:bg-[#E9E5EF] transition border border-[#E9E5EF]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#56358B]/10 border border-[#56358B]/20 text-[#56358B] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            The GyaanConnect Difference
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#25212B] tracking-tight">
            “Don't just watch the lesson. <span className="text-[#56358B]">Prove that you understood it.</span>”
          </h2>
          <p className="mt-2 text-sm text-[#777381]">
            GyaanConnect is not another passive video streaming app or generic chatbot. It is an active diagnostic learning platform that listens to students explain concepts in their own words and verifies real conceptual mastery.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-[#56358B]/5 border border-[#56358B]/15 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#56358B]/10 flex items-center justify-center text-[#56358B] mb-2">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#25212B] text-sm">Feynman Active Recall</h3>
            <p className="text-xs text-[#777381] leading-relaxed">
              Close your notes. Explain the concept out loud in plain English, Hindi, or Hinglish. Speaking out loud triggers active neural encoding.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#16A39A]/5 border border-[#16A39A]/15 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#16A39A]/10 flex items-center justify-center text-[#16A39A] mb-2">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#25212B] text-sm">Prerequisite Diagnostics</h3>
            <p className="text-xs text-[#777381] leading-relaxed">
              When a student repeatedly struggles with advanced concepts like Projectile Motion, GyaanConnect investigates foundational prerequisites like Vector Components first.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-2">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#25212B] text-sm">Automated Spaced Revision</h3>
            <p className="text-xs text-[#777381] leading-relaxed">
              Concepts are automatically queued for revision before memory decay occurs (SuperMemo SM-2 scheduling), guaranteeing 90%+ long-term retention.
            </p>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="overflow-hidden rounded-2xl border border-[#E9E5EF] bg-white mb-6 shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E9E5EF] bg-[#FAF9FC]">
                <th className="p-3.5 text-[#777381] font-bold uppercase tracking-wider w-1/4">Aspect</th>
                <th className="p-3.5 text-[#777381] font-bold uppercase tracking-wider w-3/8">Traditional Platforms</th>
                <th className="p-3.5 text-[#56358B] font-bold uppercase tracking-wider w-3/8">GyaanConnect Approach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E5EF]">
              {comparisonPoints.map((pt, i) => (
                <tr key={i} className={pt.highlight ? 'bg-[#56358B]/5' : ''}>
                  <td className="p-3.5 font-bold text-[#25212B]">{pt.factor}</td>
                  <td className="p-3.5 text-[#777381] leading-relaxed">{pt.traditional}</td>
                  <td className="p-3.5 text-[#25212B] font-medium leading-relaxed">
                    <span className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A39A] shrink-0 mt-0.5" />
                      <span>{pt.gyan}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#56358B] hover:bg-[#462973] text-white font-bold text-xs transition shadow-sm"
          >
            Start Proving My Concepts Now
          </button>
        </div>

      </div>
    </div>
  );
}
