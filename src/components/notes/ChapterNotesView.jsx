// GYAAN AI Chapter Notes, Practical Activities & Formula Sheet
// Pedagogically structured textbook-quality notes container adhering to 720-820px optimal reading width
// Features Table of Contents jump links, topic-level voice explanations, common mistakes, exam tips, and quick revision

import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  FlaskConical, 
  ShieldAlert, 
  Compass, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  Mic, 
  ListOrdered, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { speechManager } from '../../services/aiVoiceService';
import { soundService } from '../../services/soundService';
import { curriculumService } from '../../services/curriculumService';
import VoiceWaveform from '../voice/VoiceWaveform';

export default function ChapterNotesView({
  chapter,
  grade = 10,
  subject,
  board,
  onProveConcept
}) {
  const [concepts, setConcepts] = useState([]);
  const [chapterNotes, setChapterNotes] = useState(null);
  const [activeVoiceTopicId, setActiveVoiceTopicId] = useState(null);

  useEffect(() => {
    let active = true;
    if (chapter?.id) {
      curriculumService.getNotes(chapter.id, { boardId: board?.id, classNum: grade, subjectId: subject?.id })
        .then(notes => {
          if (active && notes) setChapterNotes(notes);
        })
        .catch(() => {});

      curriculumService.getConcepts(chapter.id, chapter.title, { boardId: board?.id, classNum: grade, subjectId: subject?.id })
        .then(list => {
          if (active && list) {
            setConcepts(list);
          }
        });
    }
    return () => { active = false; };
  }, [chapter?.id, chapter?.title, board?.id, grade, subject?.id]);

  const handleSpeakTopic = (topic, index) => {
    soundService.playClick();
    if (activeVoiceTopicId === topic.id && speechManager.isSpeaking) {
      speechManager.stopSpeaking();
      setActiveVoiceTopicId(null);
      return;
    }

    setActiveVoiceTopicId(topic.id);
    const speechScript = `
      Topic ${index + 1}: ${topic.title}.
      Here is the conceptual explanation: ${topic.description}.
      Important points to remember: ${(topic.mustKnowPoints || []).slice(0, 3).join('. ')}.
      ${topic.commonMisconceptions?.[0] ? `Be careful of this common mistake: ${topic.commonMisconceptions[0].misconception}. Remember, ${topic.commonMisconceptions[0].correction}.` : ''}
    `;

    speechManager.speak(speechScript, {
      onEnd: () => setActiveVoiceTopicId(null)
    });
  };

  const handlePrint = () => {
    soundService.playClick();
    window.print();
  };

  const isExamFocus = (index) => index === 0 || index === 1;

  const isReviewed = chapter?.status === 'reviewed' || chapterNotes?.status === 'reviewed';
  const provenanceLabel = isReviewed ? 'Reviewed' : 'Study notes based on the NCERT/CBSE syllabus';
  const effectivePractical = chapter.practicalActivity || chapterNotes?.practicalActivity;
  const effectiveSummary = chapterNotes?.summary || chapter.summary;
  const displayTitle = chapterNotes?.chapterTitle || chapter.title;

  return (
    <div id="gyaan-printable-document" className="max-w-[780px] mx-auto space-y-8 text-[#25212B] pb-12">

      {/* Chapter Notes Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E9E5EF] shadow-xs space-y-4 print-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E9E5EF] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#56358B]">
                Study notes based on the NCERT/CBSE syllabus
              </span>
              {isReviewed && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Reviewed
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#25212B] tracking-tight">
              {displayTitle}
            </h2>
            {chapterNotes?.titleHi && (
              <p className="text-sm font-bold text-[#56358B]">
                {chapterNotes.titleHi}
              </p>
            )}
            <p className="text-xs text-[#777381]">
              Class {grade} • {subject?.name || 'Science'} • {board?.name || 'CBSE'}
            </p>
            {chapterNotes?.definitionHi && (
              <div className="text-xs text-[#25212B] bg-amber-50/70 p-3 rounded-2xl border border-amber-200 mt-2">
                <strong className="text-amber-900 block font-bold mb-0.5">मूल परिभाषा (Bilingual Overview):</strong>
                <span>{chapterNotes.definitionHi}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#25212B] text-xs font-semibold transition border border-[#E9E5EF] flex items-center gap-1.5 shadow-2xs"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#56358B]" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Table of Contents (Jump Links) */}
        {concepts.length > 0 && (
          <div className="p-4 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#25212B]">
              <ListOrdered className="w-4 h-4 text-[#56358B]" />
              <span>Table of Contents (Jump to Topic):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {concepts.map((concept, idx) => (
                <a
                  key={concept.id}
                  href={`#topic-${concept.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    soundService.playClick();
                    document.getElementById(`topic-${concept.id}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#FAF7FD] text-xs font-semibold text-[#56358B] border border-[#E9E5EF] hover:border-[#56358B]/40 transition shadow-2xs flex items-center gap-1.5"
                >
                  <span className="w-4 h-4 rounded-full bg-[#56358B]/10 text-[#56358B] flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span>{concept.title}</span>
                </a>
              ))}
              {effectivePractical && (
                <a
                  href="#lab-practical"
                  onClick={(e) => {
                    e.preventDefault();
                    soundService.playClick();
                    document.getElementById('lab-practical')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-xs font-bold text-emerald-800 border border-emerald-200 transition shadow-2xs flex items-center gap-1.5"
                >
                  <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Lab Experiment</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* PRACTICAL ACTIVITY / LAB EXPERIMENT (NCERT Lab Manual Link) */}
      {effectivePractical && (
        <div id="lab-practical" className="p-6 sm:p-7 rounded-3xl bg-emerald-50/70 border border-emerald-200/90 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200/70 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
                  NCERT Lab Practical Activity
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#25212B]">
                  {effectivePractical.title}
                </h3>
              </div>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-white text-emerald-800 font-bold border border-emerald-300">
              Hands-on Experiment
            </span>
          </div>

          {/* Required Materials */}
          {effectivePractical.materials?.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-[#25212B] uppercase tracking-wider">
                Apparatus & Materials Required:
              </h5>
              <div className="flex flex-wrap gap-2">
                {effectivePractical.materials.map((mat, idx) => (
                  <span key={idx} className="text-xs px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-[#25212B] shadow-2xs font-medium">
                    • {mat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step Procedure */}
          {effectivePractical.procedure?.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-[#25212B] uppercase tracking-wider">
                Experimental Procedure:
              </h5>
              <div className="space-y-2">
                {effectivePractical.procedure.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#25212B] bg-white p-3 rounded-2xl border border-emerald-100 shadow-2xs">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed flex-1">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety & Real World Application */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {effectivePractical.safety && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Lab Safety Precaution:</strong>
                  <span className="text-amber-900 leading-relaxed">{effectivePractical.safety}</span>
                </div>
              </div>
            )}
            {effectivePractical.realWorldApplication && (
              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-950 flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Everyday World Application:</strong>
                  <span className="text-teal-900 leading-relaxed">{effectivePractical.realWorldApplication}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOPIC-BY-TOPIC TEXTBOOK PEDAGOGICAL NOTES */}
      <div className="space-y-6">
        {concepts.map((concept, index) => {
          const isSpeakingThis = activeVoiceTopicId === concept.id && speechManager.isSpeaking;

          return (
            <article
              key={concept.id}
              id={`topic-${concept.id}`}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E9E5EF] shadow-xs space-y-5 hover:border-[#56358B]/30 transition scroll-mt-24"
            >
              {/* Topic Header with Badges and Audio Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E9E5EF] pb-3.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#56358B]/10 text-[#56358B] px-2 py-0.5 rounded-md">
                      Topic {index + 1}
                    </span>
                    {isExamFocus(index) && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md">
                        ★ Exam Focus
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-[#777381]">
                      {concept.difficulty?.toUpperCase() || 'CORE'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#25212B]">
                    {concept.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 no-print">
                  {isSpeakingThis && <VoiceWaveform />}
                  <button
                    onClick={() => handleSpeakTopic(concept, index)}
                    className={`py-1.5 px-3 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ${
                      isSpeakingThis
                        ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                        : 'bg-[#FAF9FC] text-[#56358B] border-[#E9E5EF] hover:bg-[#56358B] hover:text-white'
                    }`}
                    title="Listen to textbook explanation read aloud by female AI voice"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isSpeakingThis ? 'Stop Audio' : 'Explain Topic'}</span>
                  </button>
                </div>
              </div>

              {/* 1. Simple Conceptual Explanation */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#56358B] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Conceptual Explanation:
                </h4>
                <div className="p-4 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] text-sm text-[#25212B] leading-relaxed">
                  {concept.description}
                </div>
              </div>

              {/* 2. Key Takeaways & Must-Know Points */}
              {concept.mustKnowPoints?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#16A39A] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Key Must-Know Points (Board Mark Criteria):
                  </h4>
                  <ul className="space-y-1.5 pl-1">
                    {concept.mustKnowPoints.map((pt, i) => (
                      <li key={i} className="text-xs sm:text-sm text-[#25212B] flex items-start gap-2 bg-white p-2.5 rounded-xl border border-[#E9E5EF]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A39A] mt-2 shrink-0" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 3. Common Misconception to Avoid */}
              {concept.commonMisconceptions?.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5 text-xs text-amber-950">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Common Exam Trap to Avoid:</span>
                  </div>
                  <p className="text-rose-900 font-semibold line-through pl-5">
                    "{concept.commonMisconceptions[0].misconception}"
                  </p>
                  <p className="text-emerald-900 font-medium pl-5 leading-relaxed">
                    <strong>Correct Understanding:</strong> {concept.commonMisconceptions[0].correction}
                  </p>
                </div>
              )}

              {/* 4. Key Formulas & Mathematical Relations */}
              {concept.formulas?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#56358B] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Mathematical Formulas & SI Units:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {concept.formulas.map((f, fidx) => (
                      <div key={fidx} className="p-3 bg-[#FAF9FC] rounded-xl border border-[#E9E5EF] space-y-1">
                        <div className="font-bold text-xs text-[#25212B]">{f.name}</div>
                        <div className="font-mono text-xs font-bold text-[#56358B]">{f.formula}</div>
                        {f.units && <div className="text-[10px] text-gray-500 font-medium">SI Units: {f.units}</div>}
                        {f.desc && <div className="text-[11px] text-gray-600 leading-tight">{f.desc}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Mathematical & Physical Derivations */}
              {concept.derivations?.length > 0 && (
                <div className="space-y-2">
                  {concept.derivations.map((d, didx) => (
                    <div key={didx} className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2.5 text-xs">
                      <div className="flex items-center gap-2 font-bold text-indigo-900">
                        <BookOpen className="w-4 h-4 text-indigo-700 shrink-0" />
                        <span>Derivation: {d.title}</span>
                      </div>
                      <div className="space-y-1.5 pl-2 text-indigo-950 font-mono text-[11px] leading-relaxed">
                        {d.steps.map((st, sidx) => (
                          <div key={sidx} className="bg-white/80 p-2 rounded-lg border border-indigo-100">
                            {st}
                          </div>
                        ))}
                      </div>
                      <div className="pt-1.5 text-xs font-bold text-indigo-900 border-t border-indigo-200/60">
                        <strong>Conclusion:</strong> {d.conclusion}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 6. Balanced Chemical Reactions & Mechanisms */}
              {concept.chemicalReactions?.length > 0 && (
                <div className="space-y-2">
                  {concept.chemicalReactions.map((r, ridx) => (
                    <div key={ridx} className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 space-y-2 text-xs">
                      <div className="flex items-center gap-2 font-bold text-teal-900">
                        <FlaskConical className="w-4 h-4 text-teal-700 shrink-0" />
                        <span>Chemical Reaction: {r.name}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-teal-200 font-mono text-xs text-teal-950 font-bold">
                        {r.equation}
                      </div>
                      {r.conditions && (
                        <p className="text-teal-900 text-[11px]">
                          <strong>Conditions:</strong> {r.conditions}
                        </p>
                      )}
                      {r.mechanism && (
                        <p className="text-teal-900 text-[11px] leading-relaxed">
                          <strong>Mechanism:</strong> {r.mechanism}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 7. Solved Numericals & Worked Examples */}
              {concept.solvedNumericals?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Step-by-Step Solved Problem:
                  </h4>
                  {concept.solvedNumericals.map((sn, sidx) => (
                    <div key={sidx} className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2 text-xs">
                      <p className="font-bold text-emerald-950">{sn.problem}</p>
                      {sn.given && <p className="text-[11px] text-emerald-900"><strong>Given:</strong> {sn.given}</p>}
                      {sn.toFind && <p className="text-[11px] text-emerald-900"><strong>To Find:</strong> {sn.toFind}</p>}
                      {sn.formula && <p className="text-[11px] text-emerald-900 font-mono font-semibold"><strong>Formula:</strong> {sn.formula}</p>}
                      {sn.substitution && <p className="text-[11px] text-emerald-900"><strong>Substitution:</strong> {sn.substitution}</p>}
                      <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-emerald-950 font-bold text-xs">
                        Final Answer: {sn.answer}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 8. English Literature Analysis (Themes, Characters, Poetic Devices, Quotes) */}
              {concept.literatureAnalysis && (
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-purple-200/60 pb-2">
                    <span className="font-bold text-purple-900 uppercase tracking-wider text-[10px]">
                      Literature Critical Analysis • {concept.literatureAnalysis.genre}
                    </span>
                  </div>
                  {concept.literatureAnalysis.plotSummary && (
                    <div>
                      <strong className="block text-purple-950 mb-1">Textual Exposition:</strong>
                      <p className="text-purple-900 leading-relaxed text-[11px]">{concept.literatureAnalysis.plotSummary}</p>
                    </div>
                  )}
                  {concept.literatureAnalysis.themes?.length > 0 && (
                    <div>
                      <strong className="block text-purple-950 mb-1">Central Themes:</strong>
                      <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-purple-900">
                        {concept.literatureAnalysis.themes.map((th, tidx) => (
                          <li key={tidx}>{th}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {concept.literatureAnalysis.characterAnalysis?.length > 0 && (
                    <div className="space-y-1.5">
                      <strong className="block text-purple-950">Character Sketch:</strong>
                      {concept.literatureAnalysis.characterAnalysis.map((ch, cidx) => (
                        <div key={cidx} className="p-2.5 bg-white rounded-xl border border-purple-100 text-[11px] leading-relaxed">
                          <span className="font-bold text-purple-950">{ch.name}: </span>
                          <span className="text-gray-700">{ch.traits}. </span>
                          <span className="text-purple-800 italic">{ch.significance}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {concept.literatureAnalysis.poeticDevices?.length > 0 && (
                    <div className="space-y-1.5">
                      <strong className="block text-purple-950">Poetic / Literary Devices:</strong>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {concept.literatureAnalysis.poeticDevices.map((pd, pidx) => (
                          <div key={pidx} className="p-2 bg-white rounded-xl border border-purple-100 text-[11px]">
                            <span className="font-bold text-purple-950">{pd.device}: </span>
                            <span className="italic text-purple-800">"{pd.example}"</span>
                            <p className="text-gray-600 text-[10px] mt-0.5">{pd.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {concept.literatureAnalysis.importantQuotes?.length > 0 && (
                    <div className="space-y-1.5">
                      <strong className="block text-purple-950">Key Quotations:</strong>
                      {concept.literatureAnalysis.importantQuotes.map((q, qidx) => (
                        <blockquote key={qidx} className="p-2.5 bg-white border-l-4 border-purple-600 rounded-r-xl text-[11px] text-purple-950 italic">
                          "{q.quote}"
                          <span className="block not-italic text-[10px] text-gray-500 mt-1">— {q.speaker} ({q.context})</span>
                        </blockquote>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 9. English Writing Skills Guide (Format, Marking Scheme, Model Answer) */}
              {concept.writingGuide && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3 text-xs">
                  <div className="font-bold text-amber-900 uppercase tracking-wider text-[10px]">
                    Official Format & Marking Scheme Guidelines
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-amber-200 text-[11px] leading-relaxed">
                    <strong>Format Specification:</strong> {concept.writingGuide.format}
                  </div>
                  {concept.writingGuide.markingScheme?.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      {concept.writingGuide.markingScheme.map((ms, midx) => (
                        <span key={midx} className="px-2 py-1 bg-amber-100/70 text-amber-900 rounded-lg font-semibold">
                          {ms.component}: {ms.marks}
                        </span>
                      ))}
                    </div>
                  )}
                  {concept.writingGuide.modelAnswer && (
                    <div className="space-y-1">
                      <strong className="block text-amber-950 text-[11px]">Full-Scoring Model Answer:</strong>
                      <pre className="p-3 bg-white rounded-xl border border-amber-200 text-[10px] font-mono whitespace-pre-wrap text-gray-800 leading-relaxed overflow-x-auto">
                        {concept.writingGuide.modelAnswer}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* 10. Exam Tip / Board Strategy */}
              <div className="p-4 rounded-2xl bg-[#56358B]/5 border border-[#56358B]/15 space-y-1 text-xs text-[#25212B]">
                <div className="flex items-center gap-1.5 font-bold text-[#56358B]">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Board Exam Tip:</span>
                </div>
                <p className="text-[#777381] pl-5 leading-relaxed">
                  In board exams, always state the standard definition, specify conditions (such as constant temperature), and include full SI units in numerical answers.
                </p>
              </div>

              {/* Action Button: Prove Understanding */}
              <div className="pt-2 flex justify-end no-print">
                <button
                  onClick={() => {
                    soundService.playClick();
                    if (onProveConcept) onProveConcept(concept);
                  }}
                  className="py-2 px-4 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Mic className="w-3.5 h-3.5 text-[#16A39A]" />
                  <span>Prove You Understand {concept.title}</span>
                </button>
              </div>

            </article>
          );
        })}
      </div>

      {/* QUICK REVISION BOX (End of Chapter Review) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#56358B] to-[#482C75] text-white shadow-md space-y-4 print-card">
        <div className="flex items-center gap-3 border-b border-white/20 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center no-print">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-white/80">
              5-Minute Rapid Recap
            </span>
            <h3 className="text-lg font-bold">
              Quick Chapter Revision Box: {chapter.title}
            </h3>
          </div>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-white/90 leading-relaxed">
          <p>
            • <strong>Core Definition:</strong> {chapter.notes?.definition || chapter.summary}
          </p>
          {concepts.slice(0, 4).map((c, i) => (
            <p key={i}>
              • <strong>{c.title}:</strong> {c.mustKnowPoints?.[0] || c.description}
            </p>
          ))}
          <p>
            • <strong>Exam Golden Rule:</strong> Always verify unit conversions before plugging values into formulas.
          </p>
        </div>

        <div className="pt-2 flex justify-end no-print">
          <button
            onClick={() => {
              soundService.playClick();
              if (onProveConcept && concepts[0]) onProveConcept(concepts[0]);
            }}
            className="py-2.5 px-4 rounded-xl bg-white hover:bg-[#FAF9FC] text-[#56358B] font-black text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <Mic className="w-4 h-4 text-[#16A39A]" />
            <span>Start Active Feynman Proof</span>
          </button>
        </div>
      </div>

    </div>
  );
}
