// GYAAN AI "Prove You Understand" Feynman Active Recall Studio
// Implements the complete loop:
// Learn -> Close the material -> Explain in your own words -> GYAAN listens -> Evaluate understanding -> Detect gaps/misconceptions -> Teach/fix gap -> Socratic follow-up -> Student explains again -> Track mastery -> Schedule revision

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  BookOpen, 
  EyeOff, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Lightbulb, 
  Send, 
  GitBranch, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  History,
  Award,
  Check,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  speechManager, 
  evaluateStudentExplanation, 
  evaluateSocraticFollowUp,
  cleanSpokenTranscript
} from '../services/aiVoiceService';
import { soundService } from '../services/soundService';
import { progressService } from '../services/progressService';
import { gamificationService } from '../services/gamificationService';
import { conceptGraphEngine } from '../services/conceptGraphEngine';

export default function ProveUnderstandingStudio({
  concept,
  chapter,
  chapterConcepts = [],
  grade = 10,
  board,
  soundEnabled = true,
  onAddXp,
  onOpenGraphModal,
  onSwitchConcept
}) {
  // Studio phase: 'briefing' | 'explaining' | 'evaluating' | 'guidance' | 'evaluated'
  const [phase, setPhase] = useState('briefing');
  const [isRecording, setIsRecording] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanupSuggestion, setCleanupSuggestion] = useState(null);
  const [guidanceData, setGuidanceData] = useState(null);
  const [showExampleAnswer, setShowExampleAnswer] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [textInput, setTextInput] = useState('');
  const [selectedLang, setSelectedLang] = useState('en-IN'); // 'en-IN' | 'hi-IN'
  const [micError, setMicError] = useState('');
  const [evaluationError, setEvaluationError] = useState(null);
  const [canRetry, setCanRetry] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [scheduledRevisionDate, setScheduledRevisionDate] = useState('');

  // Socratic multi-turn states
  const [followUpAnswer, setFollowUpAnswer] = useState('');
  const [isEvaluatingFollowUp, setIsEvaluatingFollowUp] = useState(false);
  const [followUpResult, setFollowUpResult] = useState(null);

  // Prerequisite health check
  const prereqHealth = concept ? conceptGraphEngine.checkPrerequisiteHealth(concept.id, progressService.getProgress()) : { ready: true };

  // Stop listening/speaking on unmount or concept switch
  useEffect(() => {
    return () => {
      speechManager.stopListening();
      speechManager.stopSpeaking();
    };
  }, [concept?.id]);

  const latestTranscriptRef = useRef('');

  // Draft and evaluation keys per concept (No data loss on refresh)
  const draftKey = concept?.id ? `gyaan_draft_transcript_${concept.id}` : null;
  const evalKey = concept?.id ? `gyaan_latest_eval_${concept.id}` : null;

  // Track concept switches cleanly via ref without render-time state resets
  const prevConceptIdRef = useRef(concept?.id);

  // Restore draft and latest evaluation from localStorage on mount or concept switch
  useEffect(() => {
    if (!concept?.id || typeof window === 'undefined') return;

    try {
      const savedDraft = localStorage.getItem(`gyaan_draft_transcript_${concept.id}`);
      if (savedDraft && savedDraft.trim().length > 0) {
        setTextInput(savedDraft);
        setTranscript(savedDraft);
        latestTranscriptRef.current = savedDraft;
      } else {
        setTextInput('');
        setTranscript('');
        latestTranscriptRef.current = '';
      }

      const savedEval = localStorage.getItem(`gyaan_latest_eval_${concept.id}`);
      if (savedEval) {
        const parsed = JSON.parse(savedEval);
        if (parsed && !parsed.error) {
          setEvaluation(parsed);
          // If no unsaved active draft is in progress, restore evaluated view
          if (!savedDraft || savedDraft.trim().length === 0) {
            setPhase('evaluated');
          }
        }
      } else {
        setEvaluation(null);
      }
    } catch (e) {
      console.warn('Error loading concept draft or evaluation:', e);
    }

    if (prevConceptIdRef.current !== concept.id) {
      prevConceptIdRef.current = concept.id;
      setCleanupSuggestion(null);
      setGuidanceData(null);
      setFollowUpResult(null);
      setFollowUpAnswer('');
      setMicError('');
      setEvaluationError(null);
      setCanRetry(false);
    }
  }, [concept?.id]);

  if (!concept) {
    return (
      <div className="p-8 text-center rounded-3xl bg-white border border-[#E9E5EF] text-[#777381]">
        Please select a concept from the curriculum grid to begin oral proof.
      </div>
    );
  }

  const handleTextInputChange = (val) => {
    setTextInput(val);
    latestTranscriptRef.current = val;
    if (draftKey && typeof window !== 'undefined') {
      try {
        if (val && val.trim().length > 0) {
          localStorage.setItem(draftKey, val);
        } else {
          localStorage.removeItem(draftKey);
        }
      } catch (e) {
        console.warn('Error saving transcript draft:', e);
      }
    }
  };

  const handleClearText = () => {
    setTranscript('');
    setTextInput('');
    latestTranscriptRef.current = '';
    if (draftKey && typeof window !== 'undefined') {
      try {
        localStorage.removeItem(draftKey);
      } catch (e) {
        console.warn('Error clearing draft:', e);
      }
    }
  };

  const handleCloseMaterialAndStart = () => {
    soundService.playClick();
    setPhase('explaining');
    setEvaluation(null);
    setGuidanceData(null);
    const savedDraft = (draftKey && typeof window !== 'undefined') ? localStorage.getItem(draftKey) : '';
    if (!savedDraft) {
      setTranscript('');
      setTextInput('');
      latestTranscriptRef.current = '';
    } else {
      setTranscript(savedDraft);
      setTextInput(savedDraft);
      latestTranscriptRef.current = savedDraft;
    }
    setFollowUpResult(null);
    setEvaluationError(null);
    setCanRetry(false);
  };

  const conceptProgress = concept?.id ? progressService.getConceptProgress(concept.id) : null;
  const conceptAttempts = concept?.id ? progressService.getConceptAttempts(concept.id) : [];
  const bestScore = conceptProgress?.bestScore || 0;

  const handleSpeechEnded = async () => {
    setIsRecording(false);
    const textHeard = (latestTranscriptRef.current || textInput || transcript || '').trim();
    if (!textHeard || textHeard.length === 0) return;

    try {
      setIsCleaning(true);
      const vocabHints = [
        concept?.title,
        ...(concept?.mustKnowPoints || []),
        ...(concept?.keywords || []),
        chapter?.title
      ].filter(Boolean);

      const cleanup = await cleanSpokenTranscript({
        rawTranscript: textHeard,
        vocabularyHints: vocabHints,
        conceptTitle: concept?.title,
        chapterId: concept?.chapterId || chapter?.id
      });

      if (cleanup && cleanup.hasCorrection && cleanup.corrected.toLowerCase() !== textHeard.toLowerCase()) {
        setCleanupSuggestion(cleanup);
      }
    } catch (e) {
      console.warn('Transcript cleanup check error:', e);
    } finally {
      setIsCleaning(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      soundService.playClick();
      speechManager.stopListening();
      setIsRecording(false);
      handleSpeechEnded();
    } else {
      soundService.playMicStart();
      setMicError('');
      setEvaluationError(null);
      setCanRetry(false);
      setCleanupSuggestion(null);
      speechManager.stopSpeaking();
      setIsAiSpeaking(false);

      const vocabHints = [
        concept?.title,
        ...(concept?.mustKnowPoints || []),
        ...(concept?.keywords || []),
        chapter?.title
      ].filter(Boolean);

      const started = speechManager.startListening({
        lang: selectedLang,
        vocabularyHints: vocabHints,
        onTranscript: ({ text, interim }) => {
          if (!text && !interim) return;
          setTranscript(text);
          setInterimText(interim);
          setTextInput(text);
          latestTranscriptRef.current = text;
          if (draftKey && text && typeof window !== 'undefined') {
            try {
              localStorage.setItem(draftKey, text);
            } catch (e) {
              console.warn('Error saving transcript draft from STT:', e);
            }
          }
        },
        onError: (err) => {
          setMicError(`Microphone notice: ${err}. You can also type your thoughts in the box below!`);
          setIsRecording(false);
        },
        onEnd: () => {
          setIsRecording(false);
          handleSpeechEnded();
        }
      });

      if (started) {
        setIsRecording(true);
      }
    }
  };

  const handleTriggerEvaluation = async (textToEval, inputSource = 'text') => {
    const text = (textToEval || textInput || transcript || latestTranscriptRef.current || '').trim();
    setMicError('');
    setEvaluationError(null);
    setCanRetry(false);
    setGuidanceData(null);
    setCleanupSuggestion(null);

    if (!text || text.length === 0) {
      setEvaluationError('Please speak or type your explanation before evaluating.');
      return;
    }

    setPhase('evaluating');
    speechManager.stopListening();
    setIsRecording(false);

    try {
      const prevData = progressService.getConceptProgress(concept.id);
      const attemptsCount = (prevData.attempts || 0) + 1;

      const result = await evaluateStudentExplanation({
        studentAnswer: text,
        concept,
        chapter,
        grade,
        boardId: board?.id || 'cbse',
        attempts: attemptsCount,
        inputSource
      });

      // Never a dead end: Unclear voice or gibberish input gets constructive guidance
      if (result.needsGuidance) {
        setGuidanceData(result);
        setPhase('guidance');
        // Do NOT award XP, do NOT save score
        return;
      }

      if (result.isServiceUnavailable || (result.error && !result.accuracy)) {
        setEvaluationError(result.error || 'Evaluation is unavailable right now. Please try again.');
        setCanRetry(true);
        setPhase('explaining');
        // Do NOT award XP, do NOT save score
        return;
      }

      setEvaluation(result);
      setPhase('evaluated');

      // Persistence: Clear draft and save latest evaluation per concept to localStorage
      if (typeof window !== 'undefined') {
        try {
          if (draftKey) localStorage.removeItem(draftKey);
          if (evalKey) localStorage.setItem(evalKey, JSON.stringify(result));
        } catch (e) {
          console.warn('Error caching evaluation to localStorage:', e);
        }
      }

      // Record in progressService with spaced revision schedule & attempt history
      const saved = progressService.recordConceptEvaluation({
        conceptId: concept.id,
        conceptTitle: concept.title,
        chapterId: concept.chapterId,
        subject: concept.subject,
        grade,
        boardId: board?.id || 'cbse',
        transcript: text,
        evaluation: result
      });

      if (saved?.nextRevisionDate) {
        setScheduledRevisionDate(new Date(saved.nextRevisionDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }));
      }

      // PHASE 4: Award XP ONLY on first completion or when score improves
      const prevAttempts = prevData.attempts || 0;
      const isFirstCompletion = (!prevData.isAssessed || prevAttempts === 0);
      const isScoreImproved = result.accuracy > (prevData.bestScore || 0);

      let xpToAward = 0;
      if (isFirstCompletion) {
        xpToAward = result.accuracy >= 75 ? 25 : 15;
      } else if (isScoreImproved) {
        xpToAward = Math.max(10, Math.round((result.accuracy - (prevData.bestScore || 0)) * 0.5));
      }

      if (xpToAward > 0 && onAddXp) {
        onAddXp(xpToAward);
      }

      // Confetti celebration if accuracy >= 70
      if (result.accuracy >= 70) {
        confetti({
          particleCount: 75,
          spread: 65,
          origin: { y: 0.6 }
        });
      }

      // Read back tutor feedback
      if (soundEnabled && result.tutorSpeech) {
        setIsAiSpeaking(true);
        speechManager.speak(result.tutorSpeech, {
          onEnd: () => setIsAiSpeaking(false)
        });
      }

    } catch (err) {
      console.error('Evaluation error:', err);
      setEvaluationError('Evaluation is unavailable right now, please try again');
      setCanRetry(true);
      setPhase('explaining');
    }
  };

  const handleSendFollowUp = async () => {
    if (!followUpAnswer.trim() || !evaluation?.socraticFollowUp) return;
    setIsEvaluatingFollowUp(true);

    try {
      const res = await evaluateSocraticFollowUp({
        concept,
        initialEvaluation: evaluation,
        followUpQuestion: evaluation.socraticFollowUp,
        studentFollowUpAnswer: followUpAnswer
      });

      setFollowUpResult(res);

      if (res.bonusScore && onAddXp) {
        onAddXp(res.bonusScore);
      }

      if (soundEnabled && res.tutorSpeech) {
        setIsAiSpeaking(true);
        speechManager.speak(res.tutorSpeech, {
          onEnd: () => setIsAiSpeaking(false)
        });
      }
    } catch (e) {
      console.warn('Follow-up evaluation error:', e);
    } finally {
      setIsEvaluatingFollowUp(false);
    }
  };

  const handleReplayTutor = () => {
    const textToSpeak = followUpResult?.tutorSpeech || evaluation?.tutorSpeech;
    if (!textToSpeak) return;

    if (isAiSpeaking) {
      speechManager.stopSpeaking();
      setIsAiSpeaking(false);
    } else {
      setIsAiSpeaking(true);
      speechManager.speak(textToSpeak, {
        onEnd: () => setIsAiSpeaking(false)
      });
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-[#E9E5EF] p-5 sm:p-7 shadow-xs relative overflow-hidden space-y-6 text-[#25212B]">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E9E5EF] relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#777381] mb-1">
            <span className={`flex items-center gap-1 font-bold px-2 py-0.5 rounded-full border text-[11px] ${
              concept.status === 'reviewed' 
                ? 'text-[#16A39A] bg-[#16A39A]/10 border-[#16A39A]/20' 
                : 'text-[#6C667A] bg-[#FAF9FC] border-[#E5E0EE]'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{concept.status === 'reviewed' ? 'Verified NCERT' : 'Based on the NCERT syllabus'}</span>
            </span>
            <span>•</span>
            <span>{concept.subject || 'Science'}</span>
            <span>•</span>
            <span>{concept.chapterTitle || 'Electricity'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#25212B] flex items-center gap-2">
            {concept.title}
          </h2>
        </div>

        {/* Concept Switcher / Stepper & Graph action */}
        <div className="flex flex-wrap items-center gap-2.5">
          {chapterConcepts && chapterConcepts.length > 1 && (
            <div className="flex items-center gap-1.5">
              <select
                value={concept.id}
                onChange={(e) => onSwitchConcept && onSwitchConcept(e.target.value)}
                className="text-xs bg-[#FAF9FC] border border-[#E9E5EF] rounded-xl px-2.5 py-1.5 font-semibold text-[#25212B] focus:outline-none focus:border-[#56358B] cursor-pointer"
                title="Switch concept in this chapter"
              >
                {chapterConcepts.map((c, idx) => (
                  <option key={c.id || idx} value={c.id}>
                    Concept {idx + 1}: {c.title}
                  </option>
                ))}
              </select>
              {(() => {
                const currIdx = chapterConcepts.findIndex(c => c.id === concept.id);
                if (currIdx >= 0 && currIdx < chapterConcepts.length - 1) {
                  const nextConcept = chapterConcepts[currIdx + 1];
                  return (
                    <button
                      type="button"
                      onClick={() => onSwitchConcept && onSwitchConcept(nextConcept.id)}
                      className="px-2.5 py-1.5 rounded-xl bg-[#56358B]/10 hover:bg-[#56358B]/20 text-[#56358B] text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      title={`Jump to next concept: ${nextConcept.title}`}
                    >
                      <span>Next Concept</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  );
                }
                return null;
              })()}
            </div>
          )}

          <button
            onClick={() => onOpenGraphModal && onOpenGraphModal(concept)}
            className="px-3 py-1.5 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-xs text-[#25212B] font-semibold border border-[#E9E5EF] transition flex items-center gap-1.5 cursor-pointer"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#56358B]" />
            <span>Lineage Graph</span>
          </button>
        </div>
      </div>

      {/* PHASE 1: BRIEFING & "CLOSE THE MATERIAL" CTA */}
      {phase === 'briefing' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Prerequisite warning banner if missing foundations */}
          {!prereqHealth.ready && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <span className="font-bold text-amber-900 block">
                  Prerequisite Foundation Alert:
                </span>
                <p className="text-amber-800">
                  This concept builds upon earlier fundamentals ({prereqHealth.missingPrerequisites.map(p => p.title).join(', ')}). 
                  If you find yourself stuck, GYAAN AI will help you diagnose the root prerequisite!
                </p>
              </div>
            </div>
          )}

          {/* Learning Objectives Preview */}
          <div className="p-5 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#777381] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#56358B]" /> Official Learning Objectives
            </h4>
            <ul className="text-xs sm:text-sm text-[#25212B] space-y-2 list-disc list-inside">
              {(concept.learningObjectives || ['Master the fundamental definition and formula', 'Understand why conditions must remain constant', 'Apply relationship to numerical problems']).map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>

          {/* Quick Peek: Core Must-Know Points (Study them now before closing!) */}
          <div className="p-5 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#777381] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#16A39A]" /> Core Points to Master
              </h4>
              <span className="text-[11px] text-[#777381]">Read carefully before closing books</span>
            </div>
            <ul className="text-xs text-[#25212B] space-y-2">
              {(concept.mustKnowPoints || []).map((pt, i) => (
                <li key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-[#E9E5EF]">
                  <span className="w-5 h-5 rounded-full bg-[#56358B]/10 text-[#56358B] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The Core Active Recall Prompt: "Close Material" */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#56358B]/10 via-[#16A39A]/10 to-[#FAF9FC] border-2 border-[#56358B]/30 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#56358B] text-white shadow-sm">
              <EyeOff className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-lg font-black text-[#25212B]">
                “Don't just watch the lesson. Prove that you understood it.”
              </h3>
              <p className="text-xs text-[#777381]">
                Close your notes and textbooks. GYAAN AI will listen to you explain this concept in your own natural words and check whether you truly grasp the underlying principles.
              </p>
            </div>

            <button
              onClick={handleCloseMaterialAndStart}
              className="px-6 py-3 rounded-2xl bg-[#56358B] hover:bg-[#482C75] text-white font-black text-sm transition-all duration-200 shadow-sm hover:scale-105 inline-flex items-center gap-2"
            >
              <EyeOff className="w-4 h-4" />
              <span>Close Material & Start Oral Proof</span>
            </button>
          </div>

        </div>
      )}

      {/* PHASE 2: ACTIVE EXPLAINING STUDIO (BOOKS ARE CLOSED) */}
      {phase === 'explaining' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Books Closed Banner */}
          <div className="p-4 rounded-2xl bg-[#56358B]/10 border border-[#56358B]/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs text-[#56358B] font-bold">
              <EyeOff className="w-4 h-4 text-[#56358B]" />
              <span>Material is closed! Explain {concept.title} as if teaching a classmate.</span>
            </div>
            <button
              onClick={() => setPhase('briefing')}
              className="text-[11px] text-[#777381] hover:text-[#25212B] underline"
            >
              Peek at Notes
            </button>
          </div>

          {/* Language Selector & Speech Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-[#FAF9FC] p-1 rounded-xl border border-[#E9E5EF]">
              <span className="text-[11px] text-[#777381] px-2">Voice Language:</span>
              <button
                onClick={() => { soundService.playClick(); setSelectedLang('en-IN'); }}
                className={`px-3 py-1 rounded-lg font-semibold transition ${selectedLang === 'en-IN' ? 'bg-white text-[#56358B] shadow-xs' : 'text-[#777381] hover:text-[#25212B]'}`}
              >
                English (Indian)
              </button>
              <button
                onClick={() => { soundService.playClick(); setSelectedLang('hi-IN'); }}
                className={`px-3 py-1 rounded-lg font-semibold transition ${selectedLang === 'hi-IN' ? 'bg-white text-[#56358B] font-bold shadow-xs' : 'text-[#777381] hover:text-[#25212B]'}`}
              >
                हिंदी (Hindi/Hinglish)
              </button>
            </div>

            <div className="text-[11px] text-[#777381] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#16A39A]" />
              <span>Zero fear of judgment • Speak naturally</span>
            </div>
          </div>

          {/* Microphone Central Recording Area */}
          <div className="p-8 rounded-3xl bg-[#FAF9FC] border border-[#E9E5EF] text-center space-y-6 relative overflow-hidden">
            
            {/* Glowing ring while recording */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {isRecording && (
                  <div className="absolute inset-0 rounded-full bg-rose-500/30 animate-ping pointer-events-none scale-125" />
                )}
                <button
                  type="button"
                  onClick={toggleRecording}
                  disabled={phase === 'evaluating'}
                  title={
                    phase === 'evaluating'
                      ? 'Processing explanation...'
                      : isRecording
                        ? 'Listening... Click to stop and review transcript'
                        : 'Muted. Click microphone to start speaking'
                  }
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg relative z-10 ${
                    phase === 'evaluating'
                      ? 'bg-amber-500 text-white cursor-wait opacity-80'
                      : isRecording 
                        ? 'bg-rose-500 text-white scale-110 shadow-rose-500/50 cursor-pointer' 
                        : 'bg-[#56358B] hover:bg-[#482C75] text-white hover:scale-105 cursor-pointer'
                  }`}
                >
                  {phase === 'evaluating' ? (
                    <RotateCcw className="w-8 h-8 animate-spin" />
                  ) : isRecording ? (
                    <Mic className="w-8 h-8 animate-pulse text-white" />
                  ) : (
                    <MicOff className="w-8 h-8 text-white/80" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-1">
                {phase === 'evaluating' ? (
                  <span className="text-amber-800 bg-amber-50 border-amber-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    Processing Explanation
                  </span>
                ) : isCleaning ? (
                  <span className="text-indigo-800 bg-indigo-50 border-indigo-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    Processing Audio
                  </span>
                ) : isRecording ? (
                  <span className="text-rose-800 bg-rose-50 border-rose-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    Listening Active
                  </span>
                ) : (
                  <span className="text-[#6C667A] bg-[#FAF9FC] border-[#E5E0EE] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#6C667A]" />
                    Muted / Idle
                  </span>
                )}
              </div>
              <h4 className="text-base font-bold text-[#25212B]">
                {phase === 'evaluating' 
                  ? 'GYAAN AI is processing your explanation...'
                  : isCleaning
                    ? 'Processing audio & verifying vocabulary...'
                    : isRecording 
                      ? 'GYAAN AI is listening... Speak your explanation!' 
                      : 'Click the microphone to start speaking (or edit transcript below)'}
              </h4>
              <p className="text-xs text-[#777381] max-w-md mx-auto">
                {phase === 'evaluating'
                  ? 'Analyzing conceptual grounding, evaluating must-know points, and checking misconceptions...'
                  : isRecording 
                    ? 'Speak freely. Click the microphone again when you are finished to review and edit.' 
                    : 'Explain the core principles, formulas, and conditions in your own natural words.'}
              </p>
            </div>

            {/* Error or Notice */}
            {micError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 text-left">
                {micError}
              </div>
            )}

            {/* Evaluation Service Error Banner with Retry Button */}
            {evaluationError && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 text-left space-y-2.5 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{evaluationError}</span>
                </div>
                {canRetry && (
                  <div className="pt-1">
                    <button
                      onClick={() => {
                        setEvaluationError(null);
                        handleTriggerEvaluation(undefined, 'text');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Evaluation</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mishearing Cleanup Suggestion Card */}
            {cleanupSuggestion && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-[#56358B]/30 text-left space-y-2.5 animate-in fade-in duration-200 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-[#56358B] text-xs">
                  <Sparkles className="w-4 h-4 text-[#16A39A] shrink-0" />
                  <span>Did you mean: <span className="underline italic text-[#25212B]">"{cleanupSuggestion.corrected}"</span>?</span>
                </div>
                <p className="text-[11px] text-[#777381]">
                  GYAAN AI checked chapter vocabulary and detected a likely speech mishearing.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const corr = cleanupSuggestion.corrected;
                      handleTextInputChange(corr);
                      setCleanupSuggestion(null);
                      handleTriggerEvaluation(corr, 'voice');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white font-bold text-xs transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept & Evaluate</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleTextInputChange(cleanupSuggestion.corrected);
                      setCleanupSuggestion(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF9FC] text-[#25212B] font-semibold text-xs border border-[#E9E5EF] transition cursor-pointer"
                  >
                    Edit Text
                  </button>
                  <button
                    type="button"
                    onClick={() => setCleanupSuggestion(null)}
                    className="text-[11px] text-[#777381] hover:text-[#25212B] underline px-1 cursor-pointer"
                  >
                    Keep Heard
                  </button>
                </div>
              </div>
            )}

            {/* Recognized Transcript with Direct Edit Option Before Evaluating */}
            <div className="p-4 rounded-2xl bg-white border border-[#E9E5EF] text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#56358B] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#16A39A]" />
                  Recognized Transcript (Edit Option Before Evaluating)
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-purple-50 text-[#56358B] border-[#56358B]/20">
                  {textInput.trim().split(/\s+/).filter(Boolean).length} {textInput.trim().split(/\s+/).filter(Boolean).length === 1 ? 'word' : 'words'}
                </span>
              </div>

              <textarea
                value={textInput}
                onChange={e => handleTextInputChange(e.target.value)}
                placeholder="Click the microphone and speak your explanation, or type your thoughts here..."
                rows={4}
                className="w-full p-3 rounded-xl bg-[#FAF9FC] border border-[#E9E5EF] text-xs sm:text-sm text-[#25212B] placeholder-[#777381] focus:outline-none focus:border-[#56358B] resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between text-[11px] text-[#777381]">
                <span>Tip: You can edit or fix any words before evaluating.</span>
                <button
                  type="button"
                  onClick={handleClearText}
                  className="text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                >
                  Clear text
                </button>
              </div>
            </div>

            {/* Evaluate Button */}
            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleTriggerEvaluation(undefined, 'text')}
                disabled={isRecording || isCleaning || phase === 'evaluating' || textInput.trim().split(/\s+/).filter(Boolean).length === 0}
                className="px-6 py-2.5 rounded-xl bg-[#56358B] hover:bg-[#482C75] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#16A39A]" />
                <span>Evaluate My Explanation</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* PHASE: CONSTRUCTIVE GUIDANCE (NEVER A DEAD END FOR UNCLEAR / OFF-TOPIC INPUT) */}
      {phase === 'guidance' && guidanceData && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/80 space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-amber-950">
                  {guidanceData.message || "I couldn't hear a clear explanation. Try again."}
                </h3>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Don't worry! Active recall takes practice. Here is a quick breakdown to help you formulate your thought:
                </p>
              </div>
            </div>

            {/* Concept Explanation in simple words */}
            <div className="p-4 rounded-2xl bg-white border border-amber-200/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#56358B]">
                <BookOpen className="w-4 h-4 text-[#56358B]" />
                <span>Concept Core in Simple Words:</span>
              </div>
              <p className="text-xs text-[#25212B] leading-relaxed">
                {guidanceData.conceptExplanation}
              </p>
            </div>

            {/* Sample sentence student could say */}
            {guidanceData.sampleSentence && (
              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-[#56358B]/20 text-xs text-[#56358B] flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">Sample sentence you can speak:</span>
                  <p className="italic text-[#25212B]">{guidanceData.sampleSentence}</p>
                </div>
              </div>
            )}

            {/* Guiding Questions */}
            {Array.isArray(guidanceData.guidingQuestions) && guidanceData.guidingQuestions.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#25212B] block">Guiding Questions:</span>
                <div className="space-y-1.5">
                  {guidanceData.guidingQuestions.map((q, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-[#E9E5EF] text-xs text-[#25212B] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#56358B]/10 text-[#56358B] font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Example Answer Disclosure */}
            {showExampleAnswer && guidanceData.exampleAnswer && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2 animate-in fade-in">
                <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Model Example Answer:
                </span>
                <p className="leading-relaxed text-[#25212B]">
                  {guidanceData.exampleAnswer}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleTextInputChange(guidanceData.exampleAnswer);
                    setShowExampleAnswer(false);
                    setPhase('explaining');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer"
                >
                  Use as starting text in box
                </button>
              </div>
            )}

            {/* Actions: Show Example Answer & Try Again */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowExampleAnswer(!showExampleAnswer)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF9FC] text-[#56358B] border border-[#E9E5EF] font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#16A39A]" />
                <span>{showExampleAnswer ? 'Hide example answer' : 'Show me an example answer'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPhase('explaining');
                  setShowExampleAnswer(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: EVALUATING LOADER */}
      {phase === 'evaluating' && (
        <div className="p-12 text-center rounded-3xl bg-[#FAF9FC] border border-[#E9E5EF] space-y-4">
          <div className="w-12 h-12 border-4 border-[#56358B] border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="space-y-1">
            <h4 className="text-base font-bold text-[#25212B]">
              Thinking... Evaluating Conceptual Understanding...
            </h4>
            <p className="text-xs text-[#777381] max-w-sm mx-auto">
              Scanning for must-know principles, detecting common misconceptions, and verifying prerequisite foundations.
            </p>
          </div>
        </div>
      )}

      {/* PHASE 4: 5-PILLAR DIAGNOSTIC EVALUATION DASHBOARD */}
      {phase === 'evaluated' && evaluation && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Top Score & Mastery Impact Header */}
          <div className="p-6 rounded-3xl bg-white border border-[#E9E5EF] flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm ${
                evaluation.accuracy >= 80 
                  ? 'bg-emerald-600 text-white' 
                  : evaluation.accuracy >= 60 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-rose-500 text-white'
              }`}>
                {evaluation.accuracy}%
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#25212B]">
                    {evaluation.accuracy >= 80 ? 'Mastery Proven! 🌟' : evaluation.accuracy >= 60 ? 'Developing Understanding 🚀' : 'Foundational Gap Detected ⚠️'}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#777381]">
                    {(!conceptProgress?.isAssessed || (conceptProgress?.attempts || 0) <= 1 || evaluation.accuracy > (conceptProgress?.bestScore || 0))
                      ? `+${evaluation.masteryImpact || 15} XP Earned`
                      : 'Attempt recorded (XP awarded on score improvement)'}
                  </span>
                </div>
                <p className="text-xs text-[#777381] mt-1">
                  {evaluation.praise}
                </p>
              </div>
            </div>

            {/* AI Speech replay */}
            {evaluation.tutorSpeech && (
              <button
                onClick={handleReplayTutor}
                className={`px-4 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition ${
                  isAiSpeaking 
                    ? 'bg-[#56358B] text-white border-[#56358B]' 
                    : 'bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#25212B] border-[#E9E5EF]'
                }`}
              >
                {isAiSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#56358B]" />}
                <span>{isAiSpeaking ? 'Stop Audio' : 'Hear GYAAN Tutor'}</span>
              </button>
            )}
          </div>

          {/* DIAGNOSTIC PREREQUISITE ALERT (If student struggled & foundation is weak) */}
          {evaluation.prerequisiteDiagnosed && (
            <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-200 space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-rose-800">
                    Diagnostic Prerequisite Engine Alert:
                  </h4>
                  <p className="text-xs text-rose-900">
                    {evaluation.prerequisiteDiagnosed.diagnosticMessage}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onSwitchConcept && onSwitchConcept(evaluation.prerequisiteDiagnosed.prerequisiteId)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>{evaluation.prerequisiteDiagnosed.actionCta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* 2-Column Diagnostic Pillar Grid: Must-Know Coverage & Misconceptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Pillar A: Must-Know Points Checklist */}
            <div className="p-5 rounded-2xl bg-white border border-[#E9E5EF] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#777381] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Must-Know Points Analysis
              </h4>

              <div className="space-y-2">
                {(evaluation.mustKnowCovered || []).map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}

                {(evaluation.mustKnowMissed || []).map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-900 block text-[10px] uppercase">Missed in explanation:</span>
                      <span>{pt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillar B: Misconceptions Detected */}
            <div className="p-5 rounded-2xl bg-white border border-[#E9E5EF] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#777381] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" /> Misconceptions Caught
              </h4>

              {(!evaluation.misconceptionsDetected || evaluation.misconceptionsDetected.length === 0) ? (
                <div className="p-4 rounded-xl bg-[#FAF9FC] border border-[#E9E5EF] text-xs text-[#25212B] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero common misconceptions detected! Your conceptual mental model is solid.</span>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {evaluation.misconceptionsDetected.map((m, i) => (
                    <div key={i} className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1 text-xs">
                      <div className="font-bold text-rose-800 flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Trap: {m.detected}</span>
                      </div>
                      <p className="text-rose-900 text-[11px] pl-5 leading-relaxed">
                        <strong className="text-emerald-700">Fix:</strong> {m.correction}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Actionable Gap Fix */}
              {evaluation.actionableGapFix && (
                <div className="p-3.5 rounded-xl bg-[#16A39A]/10 border border-[#16A39A]/20 text-xs space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#16A39A] block">
                    Bite-Sized Gap Fix:
                  </span>
                  <p className="text-[#25212B] text-[11px] leading-relaxed">
                    {evaluation.actionableGapFix}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* SOCRATIC MULTI-TURN REMEDIATION (Deepen Intuition to 100%) */}
          {evaluation.socraticFollowUp && (
            <div className="p-5 sm:p-6 rounded-3xl bg-[#FAF9FC] border border-[#56358B]/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#56358B] text-white flex items-center justify-center font-bold">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#25212B]">
                      Socratic Follow-Up Challenge
                    </h4>
                    <p className="text-[11px] text-[#777381]">
                      Answer this question to lock in full concept mastery!
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#56358B] bg-[#56358B]/10 px-2 py-0.5 rounded-md border border-[#56358B]/20">
                  +15 Bonus XP
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E9E5EF] text-xs sm:text-sm font-medium text-[#56358B]">
                "{evaluation.socraticFollowUp}"
              </div>

              {followUpResult ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Follow-Up Evaluated (+{followUpResult.bonusScore || 15} XP)</span>
                  </div>
                  <p className="text-emerald-900 leading-relaxed">
                    {followUpResult.feedback}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={followUpAnswer}
                      onChange={e => setFollowUpAnswer(e.target.value)}
                      placeholder="Type your intuition or explanation here..."
                      className="flex-1 p-3 rounded-xl bg-white border border-[#E9E5EF] text-xs text-[#25212B] placeholder-[#777381] focus:outline-none focus:border-[#56358B]"
                      onKeyDown={e => { if (e.key === 'Enter') handleSendFollowUp(); }}
                    />
                    <button
                      onClick={handleSendFollowUp}
                      disabled={isEvaluatingFollowUp || !followUpAnswer.trim()}
                      className="px-4 py-2.5 rounded-xl bg-[#56358B] hover:bg-[#482C75] disabled:opacity-40 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
                    >
                      {isEvaluatingFollowUp ? 'Evaluating...' : <Send className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PHASE 4: ATTEMPT HISTORY (UNLIMITED ATTEMPTS) */}
          <div className="p-5 rounded-2xl bg-white border border-[#E9E5EF] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#56358B]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#25212B]">
                  Teach-Back Attempt History
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#56358B] bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#56358B]" />
                  Best Score: {bestScore}%
                </span>
                <span className="text-[11px] text-[#777381]">
                  {conceptAttempts.length} {conceptAttempts.length === 1 ? 'attempt' : 'attempts'} recorded
                </span>
              </div>
            </div>

            {conceptAttempts.length > 0 ? (
              <div className="space-y-2 pt-1 max-h-48 overflow-y-auto pr-1">
                {conceptAttempts.map((att, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#FAF9FC] border border-[#E9E5EF] flex items-center justify-between text-xs gap-3">
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#25212B]">Attempt #{att.attemptNumber || (conceptAttempts.length - idx)}</span>
                        <span className="text-[10px] text-[#777381]">
                          {att.date ? new Date(att.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6C667A] truncate italic">
                        "{att.transcript || 'Spoken explanation'}"
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                        att.score >= 80 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : att.score >= 60 
                            ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {att.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#777381] italic">No previous attempts recorded yet.</p>
            )}
          </div>

          {/* Bottom Actions Bar & Spaced Revision Info */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E5EF] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#777381]">
              <Calendar className="w-4 h-4 text-[#56358B]" />
              <span>Next Spaced Repetition Review: </span>
              <strong className="text-[#25212B]">
                {scheduledRevisionDate || 'in 3 days'}
              </strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPhase('explaining')}
                className="px-4 py-2 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#25212B] font-bold border border-[#E9E5EF] transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Explain Again</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
