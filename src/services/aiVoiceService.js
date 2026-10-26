// GYAAN AI Voice & Socratic Diagnostic Concept Evaluation Engine
// Powers the core loop: Explain in your own words -> Evaluate understanding -> Detect gaps & misconceptions -> Socratic follow-up -> Re-explain -> Mastery

import { conceptGraphEngine } from './conceptGraphEngine.js';
import { progressService } from './progressService.js';

// Human-friendly error messages for speech recognition
export function getFriendlySpeechErrorMessage(error) {
  switch (error) {
    case 'not-allowed':
    case 'service-not-allowed':
    case 'PermissionDeniedError':
      return 'Microphone permission is required to use Speak & Learn. Please click the camera/mic icon in your browser address bar and choose "Allow", or type your thoughts below!';
    case 'audio-capture':
      return 'No microphone was detected on your device. Please plug in a headset or microphone, or use text mode below!';
    case 'network':
      return 'Network connection issue with speech recognition. Please check your connection or use text mode!';
    case 'no-speech':
      return 'No speech was detected. Please speak closer to your microphone, or type your answer!';
    case 'aborted':
      return 'Voice recording stopped.';
    default:
      return 'Your browser speech service encountered a temporary hiccup. You can speak again or type your answer below!';
  }
}

export function cleanSpeechText(text = '') {
  if (!text) return '';
  return text
    // Strip markdown links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Strip HTML tags
    .replace(/<[^>]+>/g, '')
    // Strip markdown formatting symbols
    .replace(/[*#_`~]/g, '')
    // Strip badge brackets [EXAM FOCUS], [IMPORTANT], etc.
    .replace(/\[[A-Za-z0-9_\s-]+\]/g, '')
    // Strip decorative symbols & emojis
    .replace(/[★☆✓✕•●▪◆▲⚡🧠🦁🚀🐬🎯🏆]/gu, '')
    // Convert math and science symbols to readable words
    .replace(/(\d+)\s*Ω\b/g, '$1 ohms')
    .replace(/Ω/g, ' ohms')
    .replace(/μm\b/g, ' micrometers')
    .replace(/μ/g, ' micro ')
    .replace(/Δ([A-Za-z])/g, ' change in $1')
    .replace(/Δ/g, ' delta ')
    .replace(/\^2\b/g, ' squared')
    .replace(/\^3\b/g, ' cubed')
    .replace(/→|-->/g, ' reacts to form ')
    .replace(/⇌|<=>/g, ' is in equilibrium with ')
    .replace(/±/g, ' plus or minus ')
    .replace(/°C\b/g, ' degrees Celsius')
    .replace(/%/g, ' percent')
    .replace(/\s+/g, ' ')
    .trim();
}

export function chunkIntoSentences(text = '') {
  const clean = cleanSpeechText(text);
  if (!clean) return [];

  // Split by primary sentence end markers (. ! ? \n)
  const rawSentences = clean.split(/(?<=[.!?\n])\s+/).map(s => s.trim()).filter(Boolean);
  const chunks = [];

  for (const sentence of rawSentences) {
    if (sentence.length <= 130) {
      chunks.push(sentence);
    } else {
      // Split long sentences by clauses (, ; : -) to keep spoken chunks natural and prevent buffer timeout
      const subClauses = sentence.split(/(?<=[,;:\-—])\s+/).map(s => s.trim()).filter(Boolean);
      let currentSub = '';

      for (const clause of subClauses) {
        if (!currentSub) {
          currentSub = clause;
        } else if ((currentSub + ' ' + clause).length <= 130) {
          currentSub += ' ' + clause;
        } else {
          chunks.push(currentSub);
          currentSub = clause;
        }
      }
      if (currentSub) {
        if (currentSub.length <= 130) {
          chunks.push(currentSub);
        } else {
          // Word boundary split for exceptionally long clauses
          const words = currentSub.split(/\s+/);
          let wordChunk = '';
          for (const w of words) {
            if ((wordChunk + ' ' + w).length <= 120) {
              wordChunk = wordChunk ? wordChunk + ' ' + w : w;
            } else {
              if (wordChunk) chunks.push(wordChunk);
              wordChunk = w;
            }
          }
          if (wordChunk) chunks.push(wordChunk);
        }
      }
    }
  }

  return chunks.filter(c => c.length > 0);
}

export class SpeechManager {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentChunkIndex = 0;
    this.totalChunks = 0;
    this.activeChunks = [];
    this.listeners = new Set();
    this.settings = this.loadSettings();
    this.silenceTimer = null;

    this.initSpeechRecognition();
    this.accumulatedTranscript = '';
  }

  loadSettings() {
    try {
      if (typeof window === 'undefined') return { rate: 0.95, pitch: 1.0, lang: 'en-IN' };
      const raw = localStorage.getItem('gyaan_voice_settings_v1');
      return raw ? JSON.parse(raw) : { rate: 0.95, pitch: 1.0, lang: 'en-IN' };
    } catch {
      return { rate: 0.95, pitch: 1.0, lang: 'en-IN' };
    }
  }

  saveSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('gyaan_voice_settings_v1', JSON.stringify(this.settings));
      }
    } catch {
      // Ignore
    }
    this.notifyState();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyState() {
    const state = {
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      currentChunkIndex: this.currentChunkIndex,
      totalChunks: this.totalChunks
    };
    this.listeners.forEach(cb => {
      try { cb(state); } catch (e) { console.warn(e); }
    });
  }

  initSpeechRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = this.settings.lang || 'en-IN';
      } catch (e) {
        console.warn('SpeechRecognition initialization error:', e);
      }
    }
  }

  isSupported() {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  startListening({ onTranscript, onError, onEnd, lang = 'en-IN', vocabularyHints = [] }) {
    if (!this.recognition) {
      this.initSpeechRecognition();
    }

    if (!this.recognition) {
      onError?.('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Brave, or type your answer in the box below!');
      return false;
    }

    try {
      this.recognition.lang = lang || this.settings.lang || 'en-IN';

      // PHASE 4: Custom vocabulary/hints for subject terms
      const SpeechGrammarList = typeof window !== 'undefined' ? (window.SpeechGrammarList || window.webkitSpeechGrammarList) : null;
      if (SpeechGrammarList && Array.isArray(vocabularyHints) && vocabularyHints.length > 0) {
        try {
          const grammarList = new SpeechGrammarList();
          const cleanTerms = vocabularyHints
            .map(t => String(t).replace(/[^a-zA-Z0-9\s]/g, '').trim())
            .filter(t => t.length > 1);
          if (cleanTerms.length > 0) {
            const grammar = '#JSGF V1.0; grammar subjectTerms; public <term> = ' + cleanTerms.join(' | ') + ' ;';
            grammarList.addFromString(grammar, 1);
            this.recognition.grammars = grammarList;
          }
        } catch (gErr) {
          console.warn('[SpeechManager] Grammar list registration skipped:', gErr);
        }
      }

      this.isListening = true;
      this.accumulatedTranscript = '';

      // Reset any active silence timer
      if (this.silenceTimer) {
        clearTimeout(this.silenceTimer);
        this.silenceTimer = null;
      }

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        // Iterate over all results in the recognition session to ensure zero data loss
        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const fullSpoken = (finalTranscript + ' ' + interimTranscript).trim().replace(/\s+/g, ' ');
        if (fullSpoken.length > 0) {
          this.accumulatedTranscript = fullSpoken;
        }

        const textToEmit = this.accumulatedTranscript || fullSpoken;
        if (textToEmit && textToEmit.trim().length > 0) {
          onTranscript?.({
            text: textToEmit,
            isFinal: Boolean(finalTranscript),
            interim: interimTranscript
          });
        }

        // Auto-stop microphone when speech concludes (1.8s of silence after speech)
        if (fullSpoken.length > 0) {
          if (this.silenceTimer) clearTimeout(this.silenceTimer);
          this.silenceTimer = setTimeout(() => {
            if (this.isListening) {
              this.stopListening();
            }
          }, 1800);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition event error:', event.error);
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
          this.silenceTimer = null;
        }
        if (event.error !== 'no-speech') {
          onError?.(getFriendlySpeechErrorMessage(event.error));
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
          this.silenceTimer = null;
        }
        onEnd?.();
      };

      this.recognition.start();
      return true;
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      onError?.(getFriendlySpeechErrorMessage(err.name || err.message));
      return false;
    }
  }

  stopListening() {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
    if (this.recognition && this.isListening) {
      this.isListening = false;
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn('Stop error:', e);
      }
    }
  }

  getVoices() {
    if (!this.synthesis) return [];
    return this.synthesis.getVoices() || [];
  }

  async ensureVoicesLoaded() {
    if (!this.synthesis) return [];
    const current = this.synthesis.getVoices();
    if (current && current.length > 0) return current;

    return new Promise(resolve => {
      let resolved = false;
      const onVoices = () => {
        if (!resolved) {
          resolved = true;
          resolve(this.synthesis.getVoices() || []);
        }
      };
      this.synthesis.onvoiceschanged = onVoices;
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve(this.synthesis?.getVoices() || []);
        }
      }, 500);
    });
  }

  getPreferredVoice(targetLang = 'en-IN') {
    const voices = this.getVoices();
    if (voices.length === 0) return null;

    // Explicit user preference
    if (this.settings.voiceURI) {
      const saved = voices.find(v => v.voiceURI === this.settings.voiceURI);
      if (saved) return saved;
    }

    const isFemaleName = (name) => {
      const lower = (name || '').toLowerCase();
      return lower.includes('female') ||
        lower.includes('heera') ||
        lower.includes('neerja') ||
        lower.includes('veena') ||
        lower.includes('zira') ||
        lower.includes('swara') ||
        lower.includes('kalpana') ||
        lower.includes('jenny') ||
        lower.includes('aria') ||
        lower.includes('samantha') ||
        lower.includes('natural');
    };

    // If Hindi requested: Priority to hi-IN
    if (targetLang && targetLang.startsWith('hi')) {
      const hiFemale = voices.find(v => (v.lang.startsWith('hi') || v.lang.includes('hi-IN')) && isFemaleName(v.name));
      if (hiFemale) return hiFemale;

      const hiAny = voices.find(v => v.lang.startsWith('hi') || v.lang.includes('hi-IN'));
      if (hiAny) return hiAny;
    }

    // Default / Indian English Priority:
    // 1. Indian English Female
    const inFemale = voices.find(v => (v.lang.includes('en-IN') || v.lang.includes('en_IN')) && isFemaleName(v.name));
    if (inFemale) return inFemale;

    // 2. Indian English Any
    const inAny = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en_IN') || v.name.includes('India'));
    if (inAny) return inAny;

    // 3. Natural Female English (US/UK/AU)
    const enFemale = voices.find(v => v.lang.startsWith('en') && isFemaleName(v.name));
    if (enFemale) return enFemale;

    // 4. Any English Voice
    const enAny = voices.find(v => v.lang.startsWith('en'));
    if (enAny) return enAny;

    return voices[0] || null;
  }

  async speak(text, { onStart, onEnd, pitch, rate, lang } = {}) {
    // Stop previous utterance cleanly without race condition
    this.stopSpeaking();

    const chunks = chunkIntoSentences(text);
    this.activeChunks = chunks;
    this.totalChunks = chunks.length;
    this.currentChunkIndex = 0;

    if (!this.synthesis) {
      onEnd?.();
      return;
    }

    if (chunks.length === 0) {
      onEnd?.();
      return;
    }

    // Wait for voiceschanged before speaking
    await this.ensureVoicesLoaded();

    this.isSpeaking = true;
    this.isPaused = false;
    this.notifyState();

    const effectivePitch = pitch ?? this.settings.pitch ?? 1.0;
    const effectiveRate = rate ?? this.settings.rate ?? 0.95;
    const effectiveLang = lang ?? this.settings.lang ?? 'en-IN';
    const voice = this.getPreferredVoice(effectiveLang);

    onStart?.();

    const speakChunkAt = (index) => {
      if (index >= chunks.length || !this.isSpeaking) {
        this.isSpeaking = false;
        this.isPaused = false;
        this.currentUtterance = null;
        this.notifyState();
        onEnd?.();
        return;
      }

      this.currentChunkIndex = index;
      this.notifyState();

      try {
        const utterance = new SpeechSynthesisUtterance(chunks[index]);
        this.currentUtterance = utterance;
        utterance.pitch = effectivePitch;
        utterance.rate = effectiveRate;
        utterance.lang = effectiveLang;
        if (voice) utterance.voice = voice;

        utterance.onend = () => {
          this.currentUtterance = null;
          if (this.isSpeaking && !this.isPaused) {
            // Micro-pause between sentences for natural cadenced delivery
            setTimeout(() => speakChunkAt(index + 1), 120);
          }
        };

        utterance.onerror = (event) => {
          this.currentUtterance = null;
          const errorCode = event.error || 'unknown';

          // If stopped intentionally, exit cleanly without console error
          if (errorCode === 'canceled' || errorCode === 'interrupted') {
            this.isSpeaking = false;
            this.notifyState();
            onEnd?.();
            return;
          }

          console.warn('[SpeechSynthesis] Chunk notice:', errorCode, 'Chunk index:', index);

          // Advance to next chunk gracefully without breaking UI
          if (this.isSpeaking) {
            speakChunkAt(index + 1);
          }
        };

        this.synthesis.speak(utterance);
      } catch (err) {
        console.error('[SpeechSynthesis] Utterance creation exception:', err);
        this.isSpeaking = false;
        this.notifyState();
        onEnd?.();
      }
    };

    speakChunkAt(0);
  }

  pause() {
    if (this.synthesis && this.isSpeaking && !this.isPaused) {
      this.synthesis.pause();
      this.isPaused = true;
      this.notifyState();
    }
  }

  resume() {
    if (this.synthesis && this.isSpeaking && this.isPaused) {
      this.synthesis.resume();
      this.isPaused = false;
      this.notifyState();
    }
  }

  stopSpeaking() {
    // Detach listeners from current utterance before cancelling to avoid spurious errors
    if (this.currentUtterance) {
      this.currentUtterance.onend = null;
      this.currentUtterance.onerror = null;
      this.currentUtterance = null;
    }

    if (this.synthesis && (this.synthesis.speaking || this.synthesis.pending)) {
      try {
        this.synthesis.cancel();
      } catch (e) {
        console.warn('[SpeechSynthesis] Cancel error:', e);
      }
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.activeChunks = [];
    this.currentChunkIndex = 0;
    this.notifyState();
  }
}

export const speechManager = new SpeechManager();

/**
 * PHASE 4: Fix Mishearing Engine
 * Corrects likely STT mishearings using chapter vocabulary and common phonetic confusions
 * (e.g. "Electricity dies available charge" -> "Electricity is flow of electric charge")
 */
export function cleanMisheardTranscript(text = '', { conceptTitle = '', vocabulary = [] } = {}) {
  if (!text || typeof text !== 'string') {
    return { raw: '', corrected: '', hasCorrection: false, suggestedText: '' };
  }

  let cleaned = text;

  // Specific phonetic mishearing patterns:
  // "Electricity dies available charge" -> "Electricity is flow of electric charge"
  cleaned = cleaned.replace(/\belectricity\s+dies\s+available\s+charge\b/gi, 'Electricity is flow of electric charge');
  cleaned = cleaned.replace(/\bdies\s+available\s+charge\b/gi, 'flow of charge');
  cleaned = cleaned.replace(/\bdies\s+available\b/gi, 'is flow of');
  cleaned = cleaned.replace(/\bavailable\s+charge\b/gi, 'electric charge');

  // Ohm's law & electrical terms
  cleaned = cleaned.replace(/\bhome'?s\s+law\b/gi, "Ohm's law");
  cleaned = cleaned.replace(/\bhomes\s+law\b/gi, "Ohm's law");
  cleaned = cleaned.replace(/\bresister\b/gi, 'resistor');
  cleaned = cleaned.replace(/\bresisters\b/gi, 'resistors');

  // Units
  cleaned = cleaned.replace(/\b(\d+)\s*columns?\b/gi, '$1 Coulombs');
  cleaned = cleaned.replace(/\bcolumns?\s+of\s+charge\b/gi, 'Coulombs of charge');
  cleaned = cleaned.replace(/\b(\d+)\s*empires?\b/gi, '$1 Amperes');
  cleaned = cleaned.replace(/\bempires?\s+of\s+current\b/gi, 'Amperes of current');
  cleaned = cleaned.replace(/\bvolt\s+age\b/gi, 'voltage');

  // Chemistry & Physics terms
  cleaned = cleaned.replace(/\belectro\s+static\b/gi, 'electrostatic');
  cleaned = cleaned.replace(/\bio\s*nick\b/gi, 'ionic');
  cleaned = cleaned.replace(/\bcat\s+ion\b/gi, 'cation');
  cleaned = cleaned.replace(/\ban\s+ion\b/gi, 'anion');
  cleaned = cleaned.replace(/\bproto\s+ns?\b/gi, 'protons');
  cleaned = cleaned.replace(/\belectro\s+ns?\b/gi, 'electrons');

  const hasCorrection = cleaned.trim().toLowerCase() !== text.trim().toLowerCase();
  return {
    raw: text,
    corrected: cleaned.trim(),
    hasCorrection,
    suggestedText: hasCorrection ? cleaned.trim() : ''
  };
}

/**
 * PHASE 2: Ask / Learn Mode Doubt Explainer
 * Allows students to ask any doubt by voice or text and always receive a clear,
 * curriculum-grounded explanation without minimum word count or scoring.
 */
export async function explainStudentDoubt({
  question,
  concept,
  chapter,
  grade = 10,
  boardId = 'cbse'
}) {
  const normQ = (question || '').trim();
  if (!normQ) {
    return {
      error: 'Please ask a doubt or question.',
      userFriendly: true
    };
  }

  const conceptTitle = concept?.title || chapter?.title || 'this topic';
  const notesSnippet = concept?.description || (concept?.mustKnowPoints?.[0]) || chapter?.keyPoints?.[0] || '';

  // Try calling backend /api/doubt
  const doubtUrl = (typeof window !== 'undefined' && window.location?.origin)
    ? `${window.location.origin}/api/doubt`
    : (process.env.API_BASE_URL || 'http://127.0.0.1:3001') + '/api/doubt';

  try {
    const res = await fetch(doubtUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: normQ,
        conceptId: concept?.id,
        conceptTitle,
        chapterId: chapter?.id || concept?.chapterId,
        chapterTitle: chapter?.title || concept?.chapterTitle,
        grade: Number(grade) || 10,
        boardId: boardId || 'cbse'
      })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && !data.error) return data;
    }
  } catch (e) {
    // Local fallback below
  }

  // Local pedagogical doubt explanation (grounded in chapter notes)
  const mustKnow = concept?.mustKnowPoints || chapter?.keyPoints || [];
  const primaryExplanation = notesSnippet 
    ? `${conceptTitle}: ${notesSnippet}`
    : `In Class ${grade} ${concept?.subject || 'Science'}, ${conceptTitle} is governed by fundamental physical laws.`;

  const isElectricity = conceptTitle.toLowerCase().includes('electric') || conceptTitle.toLowerCase().includes('current') || conceptTitle.toLowerCase().includes('ohm');
  const analogy = concept?.analogy || 
    (isElectricity
      ? 'Think of it like water flowing through a pipe: voltage is the water pressure, current is the flow of water, and resistance is the narrowness of the pipe.'
      : 'Think of this concept like building blocks where each part has a specific role that keeps the whole system balanced.');

  const formulaOrFact = (concept?.formulas && concept.formulas.length > 0)
    ? concept.formulas.join(', ')
    : (mustKnow[0] || 'Focus on the governing definition, units, and conditions.');

  const hindiHinglish = concept?.hindiHinglish || 
    `Aasan shabdon me: "${conceptTitle}" ko samajhne ke liye iske mukhya niyam aur units par dhyaan dein.`;

  const tutorSpeech = `That's a fantastic doubt! ${primaryExplanation.slice(0, 160)} Let me know if you would like to test your understanding!`;

  return {
    isExplanation: true,
    question: normQ,
    conceptTitle,
    explanation: primaryExplanation,
    analogy,
    formulaOrFact,
    hindiHinglish,
    keyPoints: mustKnow.slice(0, 3),
    tutorSpeech,
    suggestedFollowUps: [
      `How does ${conceptTitle} apply in real life?`,
      `What is the main formula or unit used in ${conceptTitle}?`
    ]
  };
}

/**
 * Normalizes and validates the evaluation response structure
 * Populates Phase 3 Rich Feedback sections:
 * 1. whatYouGotRight
 * 2. whereYouAreWrongOrMissing (mistake, whyItIsWrong, correction)
 * 3. correctExplanationSimple
 * 4. otherWaysToUnderstand (analogy, worked example, formula/diagram, Hindi/Hinglish, memory trick)
 * 5. followUpQuestion
 * 6. canRetry & attempt history
 */
export function normalizeEvaluationResponse(raw, concept = {}) {
  let accuracy = Math.min(100, Math.max(0, Number(raw.accuracy ?? raw.accuracyScore ?? 65)));
  const clarity = Math.min(100, Math.max(0, Number(raw.clarity ?? raw.clarityScore ?? 65)));
  const confidence = Math.min(100, Math.max(0, Number(raw.confidence ?? raw.confidenceScore ?? 70)));
  const misconceptionsDetected = Array.isArray(raw.misconceptionsDetected) ? raw.misconceptionsDetected : [];

  // Consistency checks:
  // 1. If misconceptions are detected, score cannot be >= 80 (must be penalized)
  if (misconceptionsDetected.length > 0 && accuracy >= 80) {
    accuracy = Math.min(70, Math.max(20, accuracy - (misconceptionsDetected.length * 15)));
  }
  // 2. If accuracy >= 85, misconceptions must not contradict high score
  if (accuracy >= 85 && misconceptionsDetected.length > 0) {
    accuracy = 70;
  }

  const understanding = Math.min(100, Math.max(0, Number(raw.understandingScore ?? Math.round((accuracy * 0.6) + (clarity * 0.4)))));

  const mustKnowCovered = Array.isArray(raw.mustKnowCovered) ? raw.mustKnowCovered : (concept.mustKnowPoints?.slice(0, 2) || []);
  const mustKnowMissed = Array.isArray(raw.mustKnowMissed) ? raw.mustKnowMissed : (concept.mustKnowPoints?.slice(2, 4) || []);

  // PHASE 3 Section 1: What you got right
  const whatYouGotRight = Array.isArray(raw.whatYouGotRight) && raw.whatYouGotRight.length > 0
    ? raw.whatYouGotRight
    : (Array.isArray(raw.strengths) && raw.strengths.length > 0
        ? raw.strengths
        : (mustKnowCovered.length > 0 
            ? mustKnowCovered.map(pt => `Accurately identified: ${pt}`)
            : ['Expressed core scientific terms in your own words', 'Clear thought sequence']));

  // PHASE 3 Section 2: Where you are wrong or what is missing
  const whereYouAreWrongOrMissing = Array.isArray(raw.whereYouAreWrongOrMissing) && raw.whereYouAreWrongOrMissing.length > 0
    ? raw.whereYouAreWrongOrMissing
    : [
        ...misconceptionsDetected.map(m => ({
          mistake: typeof m === 'string' ? m : (m.detected || 'Inaccurate formulation'),
          whyItIsWrong: typeof m === 'object' && m.whyItIsWrong ? m.whyItIsWrong : 'This contradicts the governing scientific law or formula.',
          correction: typeof m === 'object' ? (m.correction || m.fix || '') : ''
        })),
        ...mustKnowMissed.map(pt => ({
          mistake: `Missed key principle: ${pt}`,
          whyItIsWrong: 'This core point is required for complete board exam precision and scientific accuracy.',
          correction: `Remember: ${pt}`
        }))
      ];

  // PHASE 3 Section 3: Correct explanation in simple words
  const correctExplanationSimple = raw.correctExplanationSimple || 
    concept.description || 
    (concept.mustKnowPoints && concept.mustKnowPoints.length > 0 
      ? concept.mustKnowPoints.join('. ') 
      : `In ${concept.title || 'this topic'}, physical systems follow well-defined laws.`);

  // PHASE 3 Section 4: Other ways to understand it
  const isElectricity = (concept.title || '').toLowerCase().includes('electric') || (concept.title || '').toLowerCase().includes('current') || (concept.title || '').toLowerCase().includes('ohm');
  const otherWaysToUnderstand = {
    realLifeAnalogy: raw.otherWaysToUnderstand?.realLifeAnalogy || raw.analogy || 
      (isElectricity
        ? 'Think of electric current like water flowing through a pipe: voltage is the water pressure, current is the flow of water, and resistance is the pipe getting narrow.'
        : `Think of ${concept.title || 'the concept'} like a balanced seesaw where both sides must obey conservation rules.`),
    workedExample: raw.otherWaysToUnderstand?.workedExample || raw.workedExample ||
      (concept.mustKnowPoints?.[1] ? `Example: Applying "${concept.mustKnowPoints[1]}" under standard test conditions.` : 'Worked problem: Substitute known values into the governing formula to calculate the missing parameter.'),
    formulaOrDiagram: raw.otherWaysToUnderstand?.formulaOrDiagram || raw.formulaOrDiagram ||
      (concept.mustKnowPoints?.[0] ? `Formula/Diagram: ${concept.mustKnowPoints[0]}` : 'Diagram/Formula representation showing variables and direction of interaction.'),
    hindiHinglishExplanation: raw.otherWaysToUnderstand?.hindiHinglishExplanation || raw.hindiHinglishExplanation ||
      `Simple Hindi/Hinglish: Is concept ko samajhne ke liye yaad rakhein ki mukhya formula aur niyam exam ke liye bahut zaroori hain.`,
    memoryTrick: raw.otherWaysToUnderstand?.memoryTrick || raw.memoryTrick ||
      `Memory Trick: Remember the core formula initials as a simple 1-line rule.`
  };

  // PHASE 3 Section 5: One follow-up question
  const followUpQuestion = raw.followUpQuestion || raw.socraticFollowUp || 
    (concept.socraticQuestion || `How would this principle apply if conditions or variables change?`);

  return {
    isEvaluated: true,
    understandingScore: understanding,
    clarityScore: clarity,
    accuracyScore: accuracy,
    confidenceScore: confidence,
    accuracy,
    clarity,
    confidence,
    praise: raw.praise || `Shabash! Great effort explaining ${concept.title || 'the concept'} in your own words.`,
    gentleTip: raw.gentleTip || 'Try emphasizing the exact physical formula and condition for even higher precision.',
    speakingTip: raw.speakingTip || 'Your spoken articulation and confidence are improving with every explanation!',
    strengths: whatYouGotRight,
    whatYouGotRight,
    whereYouAreWrongOrMissing,
    correctExplanationSimple,
    otherWaysToUnderstand,
    followUpQuestion,
    mistakes: Array.isArray(raw.mistakes) ? raw.mistakes : misconceptionsDetected.map(m => typeof m === 'string' ? m : m.detected),
    mustKnowCovered,
    mustKnowMissed,
    misconceptionsDetected,
    prerequisiteDiagnosed: raw.prerequisiteDiagnosed || null,
    actionableGapFix: raw.actionableGapFix || (concept.mustKnowPoints?.[0] ? `Key rule: ${concept.mustKnowPoints[0]}` : 'Focus on the definition and governing law.'),
    socraticFollowUp: followUpQuestion,
    tutorSpeech: raw.tutorSpeech || `Well done! You explained the concept nicely. Let's explore one follow-up question!`,
    masteryImpact: Number(raw.masteryImpact) || (accuracy >= 75 ? 20 : 12),
    canRetry: true
  };
}

/**
 * PHASE 4: Transcript Cleanup and Mishearing Correction
 * Corrects likely speech mishearings using chapter vocabulary before evaluation.
 */
export async function cleanSpokenTranscript({
  rawTranscript,
  vocabularyHints = [],
  conceptTitle = '',
  chapterId = ''
} = {}) {
  const raw = String(rawTranscript || '').trim();
  if (!raw) {
    return { raw: '', corrected: '', hasCorrection: false, suggestedText: '' };
  }

  // 1. Try backend cleanup endpoint
  try {
    const res = await fetch('/api/voice/clean-transcript', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rawTranscript: raw,
        vocabularyHints,
        conceptTitle,
        chapterId
      })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.corrected === 'string') {
        return data;
      }
    }
  } catch (e) {
    // Backend unavailable, fallback to client-side phonetic rule correction
  }

  // 2. Authoritative client-side phonetic and vocabulary corrections
  let cleaned = raw;
  cleaned = cleaned.replace(/\belectricity\s+dies\s+available\s+charge\b/gi, 'Electricity is the flow of electric charge');
  cleaned = cleaned.replace(/\bAtlantic\s+City\b/gi, 'Electricity');
  cleaned = cleaned.replace(/\batlantic\s+city\b/gi, 'electricity');
  cleaned = cleaned.replace(/\bdies\s+available\s+charge\b/gi, 'flow of charge');
  cleaned = cleaned.replace(/\bdies\s+available\b/gi, 'is flow of');
  cleaned = cleaned.replace(/\bavailable\s+charge\b/gi, 'electric charge');
  cleaned = cleaned.replace(/\bhome'?s\s+law\b/gi, "Ohm's law");
  cleaned = cleaned.replace(/\bhomes\s+law\b/gi, "Ohm's law");
  cleaned = cleaned.replace(/\bresister\b/gi, 'resistor');
  cleaned = cleaned.replace(/\bcolumns?\b/gi, 'Coulombs');
  cleaned = cleaned.replace(/\bempires?\b/gi, 'Amperes');
  cleaned = cleaned.replace(/\bpotential\s+different\b/gi, 'potential difference');
  cleaned = cleaned.replace(/\bvolt\s+age\b/gi, 'voltage');
  cleaned = cleaned.replace(/\bserious\s+circuit\b/gi, 'series circuit');
  cleaned = cleaned.replace(/\bmagnetic\s+feel\b/gi, 'magnetic field');

  // Check vocabulary hints for chapter-specific mishearings
  if (Array.isArray(vocabularyHints) && vocabularyHints.length > 0) {
    for (const hint of vocabularyHints) {
      if (typeof hint === 'string' && hint.length > 3) {
        const hintLower = hint.toLowerCase();
        if (hintLower.includes('electric') && cleaned.toLowerCase().includes('atlantic')) {
          cleaned = cleaned.replace(/atlantic/gi, 'electric');
        }
      }
    }
  }

  const hasCorrection = cleaned.trim().toLowerCase() !== raw.toLowerCase();
  return {
    raw,
    corrected: cleaned.trim(),
    hasCorrection,
    suggestedText: hasCorrection ? cleaned.trim() : ''
  };
}

/**
 * Main Evaluation Pipeline:
 * Tier 1: Backend Secure Node API (/api/evaluate)
 * Tier 2: High-Fidelity Local Socratic Diagnostic Engine (100% offline & free fallback)
 */
export async function evaluateStudentExplanation({
  studentAnswer,
  concept,
  chapter,
  grade = 10,
  boardId = 'cbse',
  attempts = 1,
  confidence,
  simulateFailure = false,
  inputSource = 'text'
}) {
  const normAnswer = (studentAnswer || '').trim();
  const words = normAnswer.split(/\s+/).filter(Boolean);

  const targetConcept = concept || {
    id: chapter?.id,
    title: chapter?.title || 'Concept',
    chapterTitle: chapter?.title || 'Chapter',
    mustKnowPoints: chapter?.keyPoints || [],
    commonMisconceptions: []
  };

  const conceptTitle = targetConcept.title || targetConcept.name || 'this topic';
  if (!conceptTitle) {
    return {
      error: 'Please select a valid concept to evaluate.',
      validationError: true,
      userFriendly: true,
      accuracy: 0,
      xpAwarded: 0
    };
  }

  const mustKnow = (Array.isArray(targetConcept.mustKnowPoints) && targetConcept.mustKnowPoints.length > 0)
    ? targetConcept.mustKnowPoints
    : (chapter?.keyPoints || []);

  const explanationSnippet = targetConcept.description || targetConcept.content || mustKnow[0] || 
    `In ${conceptTitle}, focus on understanding the key physical laws, definitions, and formulas that describe how systems behave.`;

  const guidingQuestions = [
    targetConcept.socraticQuestion || `What is the core definition or governing principle of ${conceptTitle}?`,
    mustKnow[1] ? `Can you describe how "${mustKnow[1]}" applies in real life or an experiment?` : `Can you mention the primary formula, units, or key variables involved?`
  ];

  // The only rule: transcript must not be empty. As long as there is >= 1 word, evaluate!
  if (!normAnswer || words.length === 0) {
    return {
      error: 'Please speak or enter an explanation to evaluate.',
      validationError: true,
      userFriendly: true,
      accuracy: 0,
      xpAwarded: 0,
      canRetry: true
    };
  }

  const sampleSentence = targetConcept.sampleSentence || (mustKnow[0] 
    ? `For example, you could say: "In ${conceptTitle}, ${mustKnow[0].toLowerCase()}"` 
    : `For example, you could say: "${conceptTitle} is governed by basic scientific principles."`);
  const exampleAnswer = targetConcept.exampleAnswer || (mustKnow.length > 0 ? mustKnow.slice(0, 2).join('. ') : `A complete explanation of ${conceptTitle} covering definition and application.`);

  // Check 1: STT low confidence (< 0.65)
  if (confidence !== undefined && confidence !== null && Number(confidence) < 0.65) {
    return {
      needsGuidance: true,
      lowConfidence: true,
      unscored: true,
      userFriendly: true,
      accuracy: 0,
      accuracyScore: 0,
      understandingScore: 0,
      clarityScore: 0,
      confidenceScore: Math.round(Number(confidence) * 100),
      xpAwarded: 0,
      error: "I couldn't hear a clear explanation. Try speaking closer to the mic.",
      message: "I couldn't hear a clear explanation. Try speaking closer to the mic.",
      conceptTitle,
      conceptExplanation: explanationSnippet,
      sampleSentence,
      guidingQuestions,
      exampleAnswer,
      mustKnowPoints: mustKnow,
      canRetry: true
    };
  }

  // Check 2: Gibberish input (e.g. "VRGRGRRTRRTRY" - consonant clusters with no vowels)
  const lettersOnly = normAnswer.replace(/[^a-zA-Z]/g, '');
  const hasVowels = /[aeiou]/i.test(lettersOnly);
  const isGibberish = lettersOnly.length >= 3 && !hasVowels;
  if (isGibberish) {
    const unclearMsg = inputSource === 'voice'
      ? "I couldn't hear a clear explanation. Try speaking closer to the mic."
      : "I couldn't understand this. Try writing a full sentence about the topic.";
    return {
      needsGuidance: true,
      gibberish: true,
      unscored: true,
      userFriendly: true,
      accuracy: 0,
      accuracyScore: 0,
      understandingScore: 0,
      clarityScore: 0,
      confidenceScore: 0,
      xpAwarded: 0,
      error: unclearMsg,
      message: unclearMsg,
      conceptTitle,
      conceptExplanation: explanationSnippet,
      sampleSentence,
      guidingQuestions,
      exampleAnswer,
      mustKnowPoints: mustKnow,
      canRetry: true
    };
  }

  // Check 3: Off-topic input (only for longer phrases with no topic vocab match)
  const topicVocab = new Set([
    ...(targetConcept.title || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/),
    ...(targetConcept.description || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/),
    ...mustKnow.flatMap(pt => pt.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/))
  ].filter(w => w.length > 3 && !['what', 'when', 'where', 'this', 'that', 'from', 'with', 'have', 'more', 'some', 'also', 'their', 'which', 'about', 'they', 'will', 'then'].includes(w)));

  if (topicVocab.size > 0 && normAnswer.length > 15 && words.length >= 4) {
    const studentWords = normAnswer.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    const hasTopicHit = studentWords.some(w => topicVocab.has(w));
    if (!hasTopicHit) {
      const unclearMsg = inputSource === 'voice'
        ? "I couldn't hear a clear explanation. Try speaking closer to the mic."
        : "I couldn't understand this. Try writing a full sentence about the topic.";
      return {
        needsGuidance: true,
        offTopic: true,
        unscored: true,
        userFriendly: true,
        accuracy: 0,
        accuracyScore: 0,
        understandingScore: 0,
        clarityScore: 0,
        confidenceScore: 0,
        xpAwarded: 0,
        error: unclearMsg,
        message: unclearMsg,
        conceptTitle,
        conceptExplanation: explanationSnippet,
        sampleSentence,
        guidingQuestions,
        exampleAnswer,
        mustKnowPoints: mustKnow,
        canRetry: true
      };
    }
  }

  if (!mustKnow || mustKnow.length === 0) {
    return {
      error: 'Evaluation criteria are missing for this topic. Please select a verified topic.',
      validationError: true,
      userFriendly: true,
      accuracy: 0,
      xpAwarded: 0
    };
  }

  // STEP 2: Explicitly include concept, must-know points, and studentAnswer
  const payload = {
    studentAnswer: normAnswer,
    concept: conceptTitle,
    conceptTitle: conceptTitle,
    conceptId: targetConcept.id,
    mustKnowPoints: mustKnow,
    chapterId: chapter?.id || targetConcept.chapterId,
    chapterTitle: chapter?.title || targetConcept.chapterTitle,
    subject: chapter?.subjectId || targetConcept.subject || 'science',
    grade: Number(grade) || 10,
    boardId: boardId || 'cbse',
    attempts: Number(attempts) || 1,
    simulateFailure: Boolean(simulateFailure)
  };

  const evaluateUrl = (typeof window !== 'undefined' && window.location?.origin)
    ? `${window.location.origin}/api/evaluate`
    : (process.env.API_BASE_URL || 'http://127.0.0.1:3001') + '/api/evaluate';

  try {
    const backendRes = await fetch(evaluateUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const serverData = await backendRes.json().catch(() => ({}));

    // STEP 2: Handle 400 Bad Request without silent fallback
    if (backendRes.status === 400) {
      console.warn('[evaluateStudentExplanation] 400 Bad Request from server:', serverData);
      return {
        error: 'Evaluation is unavailable right now, please try again',
        details: serverData.error || 'Server validation error',
        isServiceUnavailable: true,
        canRetry: true,
        accuracy: 0,
        xpAwarded: 0
      };
    }

    // STEP 3: Handle 503 Service Unavailable / 502 / Failure without mock fallback
    if (!backendRes.ok || backendRes.status === 503 || backendRes.status === 502) {
      console.error(`[evaluateStudentExplanation] Server returned HTTP ${backendRes.status}:`, serverData);
      return {
        error: 'Evaluation is unavailable right now, please try again',
        details: serverData.error || serverData.details || `HTTP ${backendRes.status}`,
        isServiceUnavailable: true,
        canRetry: true,
        accuracy: 0,
        xpAwarded: 0
      };
    }

    if (serverData && !serverData.error) {
      return normalizeEvaluationResponse(serverData, targetConcept);
    }

    return {
      error: serverData.error || 'Evaluation is unavailable right now, please try again',
      isServiceUnavailable: true,
      canRetry: true,
      accuracy: 0,
      xpAwarded: 0
    };
  } catch (netErr) {
    console.error('[evaluateStudentExplanation] Network error communicating with /api/evaluate:', netErr);
    return {
      error: 'Evaluation is unavailable right now, please try again',
      details: netErr.message,
      isServiceUnavailable: true,
      canRetry: true,
      accuracy: 0,
      xpAwarded: 0
    };
  }
}

/**
 * Multi-Turn Socratic Follow-Up Evaluation
 */
export async function evaluateSocraticFollowUp({
  concept,
  initialEvaluation,
  followUpQuestion,
  studentFollowUpAnswer
}) {
  if (!studentFollowUpAnswer || studentFollowUpAnswer.trim().length < 3) {
    return {
      answered: false,
      feedback: "Please share a few words in response to the follow-up question!",
      bonusScore: 0
    };
  }

  // Tier 1: Try backend
  try {
    const res = await fetch('/api/evaluate/followup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conceptId: concept?.id,
        followUpQuestion,
        studentFollowUpAnswer
      })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && !data.error) return data;
    }
  } catch {
    // Local fallback
  }

  // Local follow-up heuristic
  const normalized = studentFollowUpAnswer.toLowerCase();
  const wordCount = normalized.split(/\s+/).length;
  const isReasoning = normalized.includes('because') || normalized.includes('increase') || normalized.includes('decrease') || normalized.includes('same') || normalized.includes('constant');

  const bonusScore = Math.min(25, wordCount > 6 ? (isReasoning ? 20 : 15) : 10);

  return {
    answered: true,
    bonusScore,
    newMastery: Math.min(100, (initialEvaluation?.accuracyScore || 70) + bonusScore),
    feedback: `Superb! Your response to the follow-up question demonstrates real intuition, not just memorization.`,
    tutorSpeech: `Fantastic thinking! Answering that follow-up proved you understand how this concept behaves under new conditions. Shabash!`
  };
}

/**
 * Tier 3: Local Socratic Evaluation Engine
 * Evaluates must-know coverage, catches known misconceptions, and triggers prerequisite diagnostics
 */
export function evaluateLocally(studentAnswer, concept, grade, attempts) {
  const norm = (studentAnswer || '').toLowerCase();
  const words = norm.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const mustKnowPoints = concept.mustKnowPoints || [];
  const mustKnowCovered = [];
  const mustKnowMissed = [];

  // Check coverage of must-know points
  mustKnowPoints.forEach(pt => {
    const ptClean = pt.toLowerCase();
    const formulaMatch = ptClean.match(/[a-z]\s*=\s*[a-z]+/g);
    const hasFormulaInAnswer = formulaMatch && formulaMatch.some(f => 
      norm.replace(/\s+/g, '').includes(f.replace(/\s+/g, ''))
    );

    const keyTerms = ptClean.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3);
    const matchCount = keyTerms.filter(t => norm.includes(t)).length;
    const ratio = keyTerms.length > 0 ? (matchCount / keyTerms.length) : 0;

    if (hasFormulaInAnswer || ratio >= 0.35 || (keyTerms[0] && norm.includes(keyTerms[0]))) {
      mustKnowCovered.push(pt);
    } else {
      mustKnowMissed.push(pt);
    }
  });

  // Detect common misconceptions
  const detectedMisconceptions = [];
  (concept.commonMisconceptions || []).forEach(m => {
    const miscText = (typeof m === 'string' ? m : m.misconception || '').toLowerCase();
    const corrText = (typeof m === 'object' ? m.correction : '') || '';

    // Avoid false positives when the student correctly stated a negation (e.g., "do not conduct", "cannot conduct", "is not consumed")
    const isNegatedInText = (
      norm.includes('not ' + miscText) ||
      norm.includes('do not ' + miscText) ||
      norm.includes('does not ' + miscText) ||
      norm.includes('cannot ' + miscText) ||
      norm.includes('never ' + miscText) ||
      norm.includes('cannot displace') ||
      norm.includes('does not displace') ||
      norm.includes('do not displace') ||
      norm.includes('copper cannot') ||
      norm.includes('cannot react') ||
      norm.includes('does not react') ||
      norm.includes('not consumed') ||
      norm.includes('is not consumed') ||
      norm.includes('never consumed') ||
      norm.includes('not used up') ||
      norm.includes('is not used up') ||
      (miscText.includes('conduct') && (
        norm.includes('do not conduct') || 
        norm.includes('does not conduct') || 
        norm.includes('cannot conduct') || 
        norm.includes('not conduct') || 
        norm.includes('never conduct') ||
        norm.includes('cannot move')
      ))
    );

    if (isNegatedInText) return;

    // Filter out common ubiquitous domain words to isolate the core misconception terms
    const commonTopicStopWords = new Set([
      'metals', 'metal', 'non-metals', 'nonmetals', 'atoms', 'atom', 'compounds', 'compound', 
      'ionic', 'bonds', 'bond', 'reaction', 'elements', 'element', 'electrons', 'electron', 
      'object', 'objects', 'body', 'bodies', 'thing', 'things', 'with', 'from', 'when', 'that', 
      'have', 'this', 'they', 'will', 'also', 'about', 'more', 'into', 'some', 'other', 'their'
    ]);

    const distWords = miscText
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3 && !commonTopicStopWords.has(w));

    if (distWords.length > 0) {
      const hits = distWords.filter(w => norm.includes(w)).length;
      const threshold = Math.min(2, distWords.length);
      if (hits >= threshold) {
        detectedMisconceptions.push({
          detected: typeof m === 'string' ? m : m.misconception,
          correction: corrText
        });
      }
    }
  });

  // Calculate scores
  const coverageRatio = mustKnowPoints.length > 0 ? (mustKnowCovered.length / mustKnowPoints.length) : 0.7;
  let accuracy = Math.round((coverageRatio * 60) + Math.min(wordCount * 1.5, 35));
  if (detectedMisconceptions.length > 0) accuracy = Math.max(20, accuracy - (detectedMisconceptions.length * 25));
  accuracy = Math.min(98, Math.max(detectedMisconceptions.length > 0 ? 20 : 35, accuracy));

  let clarity = Math.min(96, Math.max(45, 55 + (wordCount > 12 ? 20 : 5) + (norm.includes('because') || norm.includes('example') ? 15 : 0)));
  let confidence = Math.min(95, Math.max(50, 50 + (wordCount * 1.2)));

  // Prerequisite diagnostic check
  const studentProgress = progressService.getProgress();
  const prereqDiagnosis = conceptGraphEngine.diagnoseRootCause({
    conceptId: concept.id,
    score: accuracy,
    misconceptions: detectedMisconceptions,
    studentAnswer,
    attempts,
    studentProgress
  });

  // Construct feedback
  let praise = '';
  let gentleTip = '';
  let tutorSpeech = '';

  if (accuracy >= 80) {
    praise = `Shabash! 🌟 Brilliant explanation! You clearly grasped the core concepts of "${concept.title}".`;
    gentleTip = mustKnowMissed[0] ? `To get full marks in exams, also remember: "${mustKnowMissed[0]}"` : 'Keep applying this concept to problems!';
    tutorSpeech = `Shabash! That was a really articulate explanation of ${concept.title}. You nailed the core logic!`;
  } else if (accuracy >= 60) {
    praise = `Good effort! You understand the basic idea of "${concept.title}".`;
    gentleTip = mustKnowMissed[0] ? `Pay special attention to: "${mustKnowMissed[0]}"` : 'Try connecting the formula to everyday life.';
    tutorSpeech = `Good job explaining that! You've got the general idea down, but let's refine a couple of details together.`;
  } else {
    praise = `Great courage to speak! Explaining out loud is how real learning happens.`;
    gentleTip = concept.actionableGapFix || (mustKnowPoints[0] ? `Core point to master: ${mustKnowPoints[0]}` : 'Review the definition first.');
    tutorSpeech = `Thank you for sharing your thoughts! Let's work on clearing up the fundamental relationship.`;
  }

  const socraticFollowUp = concept.socraticQuestion || 
    (concept.applications?.[0] ? `How would this principle apply in: ${concept.applications[0]}?` : `What happens if one of the key variables in the formula is doubled?`);

  // PHASE 3 Rich Feedback Sections for local evaluation:
  const whatYouGotRight = mustKnowCovered.length > 0
    ? mustKnowCovered.map(pt => `Accurately identified: ${pt}`)
    : ['Attempted scientific explanation in your own words', 'Clear thought sequence'];

  const whereYouAreWrongOrMissing = [
    ...detectedMisconceptions.map(m => ({
      mistake: m.detected,
      whyItIsWrong: 'This contradicts the governing physical relationship.',
      correction: m.correction
    })),
    ...mustKnowMissed.map(pt => ({
      mistake: `Missed key principle: ${pt}`,
      whyItIsWrong: 'This core point is required for full scientific understanding and exam precision.',
      correction: `Remember: ${pt}`
    }))
  ];

  // Dynamic, NCERT-grounded pedagogical explanations tailored across science and math topics
  const titleLower = (concept.title || '').toLowerCase();
  
  let realLifeAnalogy = '';
  let workedExample = '';
  let formulaOrDiagram = '';
  let hindiHinglishExplanation = '';
  let memoryTrick = '';

  if (titleLower.includes('electric') || titleLower.includes('current') || titleLower.includes('ohm') || titleLower.includes('circuit')) {
    realLifeAnalogy = 'Think of electric current like water flowing through a pipeline: potential difference (voltage) is the pressure pump, current is the volume rate of water flow, and resistance is an obstacle narrowing the pipe.';
    workedExample = 'Worked Example: If a potential difference of 12 V is applied across a conductor having resistance 4 Ω, the current is I = V / R = 12 / 4 = 3 Amperes.';
    formulaOrDiagram = 'Governing Equation: Ohm\'s Law V = I × R (Volts = Amperes × Ohms). Circuit diagram: closed loop with cell, plug key, ammeter in series, and voltmeter across resistor.';
    hindiHinglishExplanation = 'Vidyut dhaara (Electric Current) aavesh ke bahaav ki dar hai: I = Q / t. Conductor ke do sirron ke beech vibhavantar (voltage) lagane par hi electrons niyamit disha mein chalte hain.';
    memoryTrick = 'VIR Triangle: Put V at the top, I and R at the bottom. Cover the letter you want to find!';
  } else if (titleLower.includes('metal') || titleLower.includes('ionic') || titleLower.includes('bond') || titleLower.includes('non-metal')) {
    realLifeAnalogy = 'Think of ionic bonding like a magnet trade: an electropositive metal willingly transfers its valence electron(s) to become a stable positive cation, while an electronegative non-metal accepts them to become an anion. The powerful electrostatic pull between opposite charges creates a rock-solid crystal lattice.';
    workedExample = 'Worked Example: Sodium (2,8,1) loses 1 electron -> Na⁺, Chlorine (2,8,7) gains 1 electron -> Cl⁻. Electrostatic force forms NaCl with high melting point (801°C).';
    formulaOrDiagram = 'Reaction / Structure: 2Na(s) + Cl₂(g) → 2NaCl(s). Electron dot structure showing complete transfer of valence electron from metal to non-metal.';
    hindiHinglishExplanation = 'Dhaatu (Metals) electron chhodkar cation (+) banati hain aur aadhaatu (Non-metals) electron lekar anion (-) banati hain. Inke beech sthit vidyut bal (electrostatic force) se mazboot ionic bond banta hai.';
    memoryTrick = 'Metals = Givers (+ cations), Non-metals = Takers (- anions). Opposites snap together!';
  } else if (titleLower.includes('light') || titleLower.includes('reflection') || titleLower.includes('refraction') || titleLower.includes('mirror') || titleLower.includes('lens')) {
    realLifeAnalogy = 'Think of a ray of light like a fast car driving from smooth pavement onto wet sand: the wheel entering the sand slows down first, causing the car\'s trajectory to bend towards the normal line.';
    workedExample = 'Worked Example: An object is placed at 20 cm in front of a concave mirror of focal length 10 cm (u = -20 cm, f = -10 cm). Using 1/f = 1/v + 1/u gives v = -20 cm (real, inverted, same size image at Center of Curvature).';
    formulaOrDiagram = 'Mirror Formula: 1/f = 1/v + 1/u; Lens Formula: 1/f = 1/v - 1/u. Magnification m = -v/u (mirrors) or +v/u (lenses).';
    hindiHinglishExplanation = 'Prakash jab ek paridarshi maadhyam se doosre mein jaata hai, toh gati badalney se apavartan (refraction) hota hai. Paravartan mein hamesha aapatan kon barabar paravartan kon hota hai (∠i = ∠r).';
    memoryTrick = 'Concave = Caves IN (focus in front = negative). Convex = bulges OUT (focus behind = positive).';
  } else if (titleLower.includes('reaction') || titleLower.includes('chemical') || titleLower.includes('acid') || titleLower.includes('base') || titleLower.includes('salt')) {
    realLifeAnalogy = 'Think of chemical reactions like rearranging LEGO blocks: old assemblies are broken apart and atoms reassemble into new compounds, but every single brick is preserved according to the Law of Conservation of Mass.';
    workedExample = 'Worked Example: Neutralization reaction: HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l) + Heat. Acid + Base yields Salt and Water with pH approaching 7.';
    formulaOrDiagram = 'Balanced Equation: 2H₂(g) + O₂(g) → 2H₂O(l) with states of matter clearly indicated.';
    hindiHinglishExplanation = 'Rasayanik abhikriya mein puraane bandh tootate hain aur naye utpaad bante hain. Dravyamaan sanrakshan ke niyam ke anusaar abhikarak aur utpaad dono taraf parmaanuon ki sankhya barabar honi chahiye.';
    memoryTrick = 'OIL RIG: Oxidation Is Loss of electrons, Reduction Is Gain of electrons.';
  } else if (titleLower.includes('magnetic') || titleLower.includes('field') || titleLower.includes('solenoid') || titleLower.includes('induction')) {
    realLifeAnalogy = 'Think of magnetic field lines like stretched elastic rubber bands looping seamlessly from North pole to South pole outside a magnet, crowding densely where the magnetic force is strongest.';
    workedExample = 'Worked Example: Current passing through a long straight wire produces concentric magnetic field lines whose strength B is directly proportional to current I and inversely proportional to distance r (B ∝ I/r).';
    formulaOrDiagram = 'Right-Hand Thumb Rule & Fleming\'s Left-Hand Rule: Thumb points to Force/Motion, Forefinger to Field, Center finger to Current (FBI rule).';
    hindiHinglishExplanation = 'Chumbakiye kshetra (Magnetic Field) ek sadish rashi hai jisme disha aur parimaan dono hote hain. Dhaara chalne par conductor ke chaaron taraf chumbakiye kshetra utpann hota hai.';
    memoryTrick = 'FBI Rule (Left Hand): F = Force (Thumb), B = Magnetic Field (Index), I = Current (Middle).';
  } else if (titleLower.includes('force') || titleLower.includes('motion') || titleLower.includes('gravitat') || titleLower.includes('newton')) {
    realLifeAnalogy = 'Think of inertia like a heavy passenger in a bus: when the driver hits the brakes suddenly, the passenger\'s body continues moving forward at the previous speed because no stopping force was applied to their upper torso.';
    workedExample = 'Worked Example: A net external force of 20 N applied to a 5 kg stationary mass produces acceleration a = F / m = 20 / 5 = 4 m/s².';
    formulaOrDiagram = 'Newton\'s Second Law: F = m × a; Universal Gravitation: F = G × (m₁ × m₂) / r².';
    hindiHinglishExplanation = 'Newton ka doosra niyam batata hai ki samveg parivartan ki dar (Rate of change of momentum) lagaye gaye bal ke anupaati hoti hai: F = ma.';
    memoryTrick = 'F = ma: Force pushes Mass with Acceleration!';
  } else {
    // Dynamic generation grounded in concept's authoritative must-know points & title
    realLifeAnalogy = `In everyday life, "${concept.title}" demonstrates fundamental conservation principles: observe how ${mustKnowPoints[0] || 'the governing variables'} regulate physical behavior under changing conditions.`;
    workedExample = concept.solvedNumericals?.[0]
      ? `Worked Example: ${concept.solvedNumericals[0].q} -> ${concept.solvedNumericals[0].sol}`
      : (mustKnowPoints[1]
          ? `Worked Example: Applying "${mustKnowPoints[1]}" to compute expected values under standard conditions.`
          : `Worked Example: Applying the core equation of "${concept.title}" to solve for unknown quantities.`);
    formulaOrDiagram = concept.formulas?.[0]
      ? `${concept.formulas[0].name}: ${concept.formulas[0].formula} (${concept.formulas[0].desc || ''})`
      : (mustKnowPoints[0]
          ? `Governing Equation / Must-Know Principle: ${mustKnowPoints[0]}`
          : `Schematic representation displaying the key properties and parameters of ${concept.title}.`);
    hindiHinglishExplanation = `Saral Hindi mein: "${concept.title}" ka mukhya niyam yeh sikhata hai ki ${mustKnowPoints[0] || 'is siddhant ke sabhi sutra aur paribhashaayein exam ke liye aavashyak hain'}.`;
    memoryTrick = `Core Recall Tip: Focus on the defining variables of "${concept.title}" to remember the governing relation during board exams.`;
  }

  const otherWaysToUnderstand = {
    realLifeAnalogy,
    workedExample,
    formulaOrDiagram,
    hindiHinglishExplanation,
    memoryTrick
  };

  return {
    isEvaluated: true,
    accuracy,
    clarity,
    confidence,
    understandingScore: Math.round((accuracy * 0.6) + (clarity * 0.4)),
    praise,
    gentleTip,
    speakingTip: 'Your spoken fluency is developing well. Speaking out loud improves retention by 300%!',
    strengths: whatYouGotRight,
    whatYouGotRight,
    whereYouAreWrongOrMissing,
    correctExplanationSimple: concept.description || (mustKnowPoints.length > 0 ? mustKnowPoints.join('. ') : 'Governing principle.'),
    otherWaysToUnderstand,
    followUpQuestion: socraticFollowUp,
    mistakes: detectedMisconceptions.map(d => d.detected),
    mustKnowCovered,
    mustKnowMissed,
    misconceptionsDetected: detectedMisconceptions,
    prerequisiteDiagnosed: prereqDiagnosis,
    actionableGapFix: detectedMisconceptions[0]?.correction || mustKnowMissed[0] || 'Focus on the physical law and units.',
    socraticFollowUp,
    tutorSpeech,
    canRetry: true
  };
}
