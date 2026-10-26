import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  Mic, 
  ArrowRight, 
  RotateCw, 
  Award,
  BookOpen,
  Timer,
  Play,
  RotateCcw,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundService } from '../services/soundService';
import { progressService } from '../services/progressService';
import { getQuestionsForChapter } from '../data/subjectQuizBank';

export default function PracticeQuiz({ 
  chapter, 
  subjectName = 'Science',
  classLevel = 10,
  onAddXp, 
  onSwitchToVoice,
  initialSection = 'practice'
}) {
  // Mode: 'practice' (Section A) | 'test' (Section B)
  const [activeSection, setActiveSection] = useState(initialSection);
  const [prevInitialSection, setPrevInitialSection] = useState(initialSection);
  if (initialSection !== prevInitialSection) {
    setPrevInitialSection(initialSection);
    setActiveSection(initialSection);
  }

  const [difficulty, setDifficulty] = useState('all'); // 'all' | 'foundation' | 'standard' | 'challenging'

  // Dynamic Questions from Subject Bank
  const initialQuestions = useMemo(() => {
    if (!chapter) return [];
    return getQuestionsForChapter({
      chapter,
      subjectName,
      classLevel,
      difficulty,
      limit: 15
    });
  }, [chapter, subjectName, classLevel, difficulty]);

  const [customQuestions, setCustomQuestions] = useState(null);
  const questions = customQuestions || initialQuestions;
  const [currentIdx, setCurrentIdx] = useState(0);

  // Practice Mode State
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [practiceHistory, setPracticeHistory] = useState([]);

  // Test Mode State
  const [testStatus, setTestStatus] = useState('idle'); // 'idle' | 'running' | 'completed'
  const testTimeLimitSec = 300; // 5 mins
  const [testTimeRemaining, setTestTimeRemaining] = useState(300);
  const [testAnswers, setTestAnswers] = useState({}); // { [qIdx]: optionIdx }
  const timerRef = useRef(null);

  const resetPractice = useCallback(() => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setPracticeScore(0);
    setPracticeCompleted(false);
    setPracticeHistory([]);
  }, []);

  const resetTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTestStatus('idle');
    setTestTimeRemaining(testTimeLimitSec);
    setTestAnswers({});
    setCurrentIdx(0);
  }, [testTimeLimitSec]);

  const handleFinishTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    soundService.playSuccess();
    setTestStatus('completed');

    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (testAnswers[idx] === q.correct) {
        correctCount += 1;
      }
    });

    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    if (onAddXp) onAddXp(50);

    // Persist real score in progressService
    progressService.recordQuizResult({
      chapterId: chapter?.id,
      chapterTitle: chapter?.title,
      subject: subjectName,
      score: correctCount,
      total: questions.length
    });
  }, [chapter?.id, chapter?.title, onAddXp, questions, subjectName, testAnswers]);

  // Timer loop for Test Mode
  useEffect(() => {
    if (testStatus === 'running') {
      timerRef.current = setInterval(() => {
        setTestTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleFinishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testStatus, handleFinishTest]);

  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 text-center rounded-3xl bg-white border border-[#E9E5EF] shadow-xs space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#56358B]/10 text-[#56358B] flex items-center justify-center mx-auto">
          <BookOpen className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-[#25212B] text-base">Practice Questions Preparing</h4>
        <p className="text-xs text-[#777381] max-w-sm mx-auto">
          Diagnostic subject questions for {chapter?.title} are being actively loaded from the NCERT question repository.
        </p>
      </div>
    );
  }

  const currentQ = questions[currentIdx] || questions[0];

  // -------------------------------------------------------------
  // SECTION A: PRACTICE HANDLERS
  // -------------------------------------------------------------
  const handleSelectOptionPractice = (optIdx) => {
    if (isAnswered) return;
    setSelectedOption(optIdx);
    setIsAnswered(true);

    const isCorrect = optIdx === currentQ.correct;
    const record = {
      qIndex: currentIdx,
      question: currentQ.q,
      topic: currentQ.topic,
      selected: currentQ.options[optIdx],
      correct: currentQ.options[currentQ.correct],
      isCorrect,
      explanation: currentQ.explanation
    };

    setPracticeHistory(prev => [...prev, record]);

    if (isCorrect) {
      soundService.playSuccess();
      setPracticeScore(s => s + 1);
    } else {
      soundService.playWrong();
    }
  };

  const handleNextPractice = () => {
    soundService.playClick();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setPracticeCompleted(true);
      soundService.playSuccess();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

      // Reward XP for completing practice
      if (onAddXp) onAddXp(30);

      // Record assessment evidence in progressService
      progressService.recordQuizResult({
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        subject: subjectName,
        score: practiceScore,
        total: questions.length
      });
    }
  };

  const handleRetryIncorrectPractice = () => {
    soundService.playClick();
    const wrongQs = questions.filter((_, idx) => {
      const rec = practiceHistory.find(h => h.qIndex === idx);
      return rec && !rec.isCorrect;
    });

    if (wrongQs.length > 0) {
      setCustomQuestions(wrongQs);
      resetPractice();
    } else {
      setCustomQuestions(null);
      resetPractice();
    }
  };

  // -------------------------------------------------------------
  // SECTION B: REVISION & TEST HANDLERS
  // -------------------------------------------------------------
  const handleStartTest = () => {
    soundService.playClick();
    setTestStatus('running');
    setTestTimeRemaining(testTimeLimitSec);
    setTestAnswers({});
    setCurrentIdx(0);
  };

  const handleSelectTestOption = (optIdx) => {
    soundService.playClick();
    setTestAnswers(prev => ({
      ...prev,
      [currentIdx]: optIdx
    }));
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // -------------------------------------------------------------
  // RENDER
  // -------------------------------------------------------------
  return (
    <div className="max-w-[780px] mx-auto space-y-6 text-[#25212B]">
      
      {/* Primary Section Switcher: Practice vs Revision Test */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E9E5EF] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#56358B]">
            Class {classLevel} • {subjectName} Diagnostic Arena
          </span>
          <h3 className="text-lg font-black text-[#25212B] tracking-tight">
            {chapter.title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 bg-[#FAF9FC] p-1.5 rounded-2xl border border-[#E9E5EF] text-xs font-bold">
          <button
            onClick={() => { soundService.playClick(); setActiveSection('practice'); resetPractice(); }}
            className={`py-2 px-4 rounded-xl transition ${
              activeSection === 'practice'
                ? 'bg-[#56358B] text-white shadow-xs'
                : 'text-[#777381] hover:text-[#25212B]'
            }`}
          >
            🎯 Section A: Practice
          </button>
          <button
            onClick={() => { soundService.playClick(); setActiveSection('test'); resetTest(); }}
            className={`py-2 px-4 rounded-xl transition ${
              activeSection === 'test'
                ? 'bg-[#16A39A] text-white shadow-xs'
                : 'text-[#777381] hover:text-[#25212B]'
            }`}
          >
            ⏱️ Section B: Revision & Tests
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION A: PRACTICE (Learn Through Questions) */}
      {/* ========================================================= */}
      {activeSection === 'practice' && (
        <div className="space-y-4">
          
          {/* Difficulty & Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E9E5EF]">
              <span className="text-[11px] font-bold text-[#777381] px-2">Difficulty:</span>
              {['all', 'foundation', 'standard', 'challenging'].map(d => (
                <button
                  key={d}
                  onClick={() => { soundService.playClick(); setDifficulty(d); }}
                  className={`px-2.5 py-1 rounded-lg capitalize font-semibold transition ${
                    difficulty === d 
                      ? 'bg-[#56358B] text-white' 
                      : 'text-[#777381] hover:text-[#25212B]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="text-xs font-semibold text-[#777381]">
              Question {currentIdx + 1} of {questions.length} • Score: <strong className="text-[#56358B]">{practiceScore}</strong>
            </div>
          </div>

          {!practiceCompleted ? (
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E9E5EF] shadow-xs space-y-5">
              
              {/* Question Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E9E5EF] pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#16A39A] bg-[#16A39A]/10 px-2 py-0.5 rounded-md">
                  Topic: {currentQ.topic || 'Core Concept'}
                </span>
                <span className="text-[10px] font-bold uppercase text-[#777381]">
                  Level: {currentQ.difficulty || 'Standard'}
                </span>
              </div>

              {/* Question Text */}
              <h4 className="text-base sm:text-lg font-bold text-[#25212B] leading-relaxed">
                {currentQ.q}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correct;
                  let optStyle = 'bg-[#FAF9FC] border-[#E9E5EF] hover:border-[#56358B]/40 text-[#25212B]';

                  if (isAnswered) {
                    if (isCorrect) {
                      optStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      optStyle = 'bg-rose-50 border-rose-300 text-rose-950';
                    } else {
                      optStyle = 'bg-white border-[#E9E5EF] text-[#777381] opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOptionPractice(idx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition flex items-start gap-3 ${optStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isAnswered && isCorrect 
                          ? 'bg-emerald-600 text-white' 
                          : isAnswered && isSelected 
                            ? 'bg-rose-600 text-white' 
                            : 'bg-white border border-[#E9E5EF] text-[#56358B]'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed flex-1">{option}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>

              {/* Pedagogical Hint & Step-by-Step Explanation */}
              <div className="space-y-3 pt-2">
                {!isAnswered && (
                  <div>
                    {!showHint ? (
                      <button
                        onClick={() => { soundService.playClick(); setShowHint(true); }}
                        className="text-xs font-semibold text-[#56358B] hover:underline flex items-center gap-1"
                      >
                        <HelpCircle className="w-3.5 h-3.5" /> Need a concept hint?
                      </button>
                    ) : (
                      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Hint: </strong>
                          <span>{currentQ.hint || 'Carefully review the fundamental definition and SI relationships.'}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {isAnswered && (
                  <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1.5 animate-in fade-in ${
                    selectedOption === currentQ.correct 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5">
                      {selectedOption === currentQ.correct ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Correct reasoning!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Not quite. Here is the NCERT textbook explanation:</span>
                        </>
                      )}
                    </div>
                    <p className="leading-relaxed pl-5 text-xs text-[#25212B]">
                      {currentQ.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Next Question Control */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextPractice}
                    className="py-2.5 px-5 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white font-bold text-xs transition flex items-center gap-2 shadow-xs"
                  >
                    <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'Complete Practice'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* Practice Completed Card */
            <div className="p-8 rounded-3xl bg-white border border-[#E9E5EF] shadow-xs text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-[#25212B]">Practice Session Completed!</h3>
                <p className="text-xs text-[#777381]">
                  You scored <strong className="text-[#56358B]">{practiceScore} out of {questions.length}</strong> ({Math.round((practiceScore / questions.length) * 100)}%).
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={handleRetryIncorrectPractice}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] border border-[#E9E5EF] text-[#25212B] text-xs font-bold transition flex items-center gap-2"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Retry Incorrect</span>
                </button>

                <button
                  onClick={resetPractice}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] border border-[#E9E5EF] text-[#25212B] text-xs font-bold transition flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Fresh Practice</span>
                </button>

                <button
                  onClick={onSwitchToVoice}
                  className="px-5 py-2.5 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white text-xs font-bold transition flex items-center gap-2 shadow-xs"
                >
                  <Mic className="w-3.5 h-3.5 text-[#16A39A]" />
                  <span>Prove via Feynman Recall</span>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION B: REVISION & TESTS (Formal Assessment Mode) */}
      {/* ========================================================= */}
      {activeSection === 'test' && (
        <div className="space-y-4">
          
          {testStatus === 'idle' && (
            <div className="p-8 rounded-3xl bg-white border border-[#E9E5EF] shadow-xs text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#16A39A]/10 text-[#16A39A] flex items-center justify-center mx-auto border border-[#16A39A]/20">
                <Timer className="w-8 h-8" />
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-xl font-black text-[#25212B]">
                  Formal Chapter Revision Test
                </h3>
                <p className="text-xs text-[#777381] leading-relaxed">
                  Evaluate your retention and examination readiness under timed test conditions. Results update your verified syllabus mastery.
                </p>
              </div>

              {/* Test Options */}
              <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-[#25212B] py-2">
                <div className="flex items-center gap-2 bg-[#FAF9FC] px-3.5 py-2 rounded-xl border border-[#E9E5EF]">
                  <BookOpen className="w-4 h-4 text-[#56358B]" />
                  <span>Questions: {questions.length}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#FAF9FC] px-3.5 py-2 rounded-xl border border-[#E9E5EF]">
                  <Timer className="w-4 h-4 text-[#16A39A]" />
                  <span>Time Allowed: {formatTimer(testTimeLimitSec)}</span>
                </div>
              </div>

              <button
                onClick={handleStartTest}
                className="px-7 py-3 rounded-2xl bg-[#16A39A] hover:bg-[#138780] text-white font-black text-sm transition shadow-sm hover:scale-105 inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                <span>Begin Revision Test</span>
              </button>
            </div>
          )}

          {testStatus === 'running' && (
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E9E5EF] shadow-xs space-y-5">
              
              {/* Header with Live Countdown Timer */}
              <div className="flex items-center justify-between border-b border-[#E9E5EF] pb-3 text-xs">
                <div className="font-bold text-[#25212B]">
                  Question {currentIdx + 1} of {questions.length}
                </div>

                <div className={`flex items-center gap-1.5 font-mono font-bold px-3 py-1 rounded-xl border ${
                  testTimeRemaining < 60 ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-[#FAF9FC] text-[#25212B] border-[#E9E5EF]'
                }`}>
                  <Timer className="w-4 h-4" />
                  <span>Time Left: {formatTimer(testTimeRemaining)}</span>
                </div>
              </div>

              {/* Question */}
              <h4 className="text-base sm:text-lg font-bold text-[#25212B] leading-relaxed">
                {currentQ.q}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = testAnswers[currentIdx] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectTestOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition flex items-start gap-3 ${
                        isSelected 
                          ? 'bg-[#16A39A]/10 border-[#16A39A] text-[#25212B] font-bold shadow-xs' 
                          : 'bg-[#FAF9FC] border-[#E9E5EF] hover:border-[#16A39A]/40 text-[#25212B]'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#16A39A] text-white' : 'bg-white border border-[#E9E5EF] text-[#777381]'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E9E5EF]">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => { soundService.playClick(); setCurrentIdx(c => c - 1); }}
                  className="px-4 py-2 rounded-xl bg-[#FAF9FC] border border-[#E9E5EF] text-xs font-semibold disabled:opacity-40"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {currentIdx + 1 < questions.length ? (
                    <button
                      onClick={() => { soundService.playClick(); setCurrentIdx(c => c + 1); }}
                      className="px-5 py-2 rounded-xl bg-[#16A39A] hover:bg-[#138780] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishTest}
                      className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition shadow-xs flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Submit Test</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}

          {testStatus === 'completed' && (
            <div className="p-8 rounded-3xl bg-white border border-[#E9E5EF] shadow-xs space-y-6">
              
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-[#25212B]">Revision Test Scorecard</h3>
                <p className="text-xs text-[#777381]">
                  Official assessment results recorded for {chapter.title}
                </p>
              </div>

              {/* Scorecard Metrics */}
              {(() => {
                let correctCount = 0;
                let answeredCount = 0;
                questions.forEach((q, idx) => {
                  if (testAnswers[idx] !== undefined) answeredCount += 1;
                  if (testAnswers[idx] === q.correct) correctCount += 1;
                });
                const pct = Math.round((correctCount / questions.length) * 100);

                return (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase">Score</span>
                      <div className="text-xl font-black text-emerald-900 mt-1">{correctCount} / {questions.length}</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#56358B]/10 border border-[#56358B]/20">
                      <span className="text-[10px] font-bold text-[#56358B] uppercase">Accuracy</span>
                      <div className="text-xl font-black text-[#56358B] mt-1">{pct}%</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
                      <span className="text-[10px] font-bold text-rose-800 uppercase">Incorrect</span>
                      <div className="text-xl font-black text-rose-900 mt-1">{answeredCount - correctCount}</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF]">
                      <span className="text-[10px] font-bold text-[#777381] uppercase">Unanswered</span>
                      <div className="text-xl font-black text-[#25212B] mt-1">{questions.length - answeredCount}</div>
                    </div>
                  </div>
                );
              })()}

              {/* Question-by-Question Review */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#777381]">
                  Detailed Answer Review & NCERT Explanations:
                </h4>

                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {questions.map((q, idx) => {
                    const studentAns = testAnswers[idx];
                    const isCorrect = studentAns === q.correct;

                    return (
                      <div key={idx} className="p-4 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] space-y-2 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-[#25212B]">
                            Q{idx + 1}. {q.q}
                          </span>
                          {isCorrect ? (
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-bold shrink-0">
                              ✓ Correct
                            </span>
                          ) : (
                            <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 font-bold shrink-0">
                              ✕ Incorrect
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 text-[#777381]">
                          <div>Your answer: <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>{studentAns !== undefined ? q.options[studentAns] : 'Not Answered'}</strong></div>
                          {!isCorrect && <div>Correct answer: <strong className="text-emerald-700">{q.options[q.correct]}</strong></div>}
                          <p className="pt-1 text-[#25212B] italic bg-white p-2.5 rounded-xl border border-[#E9E5EF]">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Retake & Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={resetTest}
                  className="px-5 py-2.5 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#25212B] font-bold text-xs transition border border-[#E9E5EF] flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>

                <button
                  onClick={onSwitchToVoice}
                  className="px-5 py-2.5 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white font-bold text-xs transition flex items-center gap-2 shadow-xs"
                >
                  <Mic className="w-3.5 h-3.5 text-[#16A39A]" />
                  <span>Reinforce via Feynman Recall</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
