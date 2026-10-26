import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Bot,
  Activity,
  Volume2,
  Mic,
  Server
} from 'lucide-react';
import { speechManager } from '../services/aiVoiceService';

export default function GeminiSettingsModal({
  isOpen,
  onClose
}) {
  const [serverHealth, setServerHealth] = useState({
    checking: true,
    connected: false,
    geminiConfigured: false,
    version: '2026.1'
  });
  const [speechRate, setSpeechRate] = useState(0.95);
  const [isSpeakingTest, setIsSpeakingTest] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;

    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (active) {
          setServerHealth({
            checking: false,
            connected: data.status === 'ok',
            geminiConfigured: Boolean(data.geminiConfigured),
            version: data.version || '2026.1'
          });
        }
      })
      .catch(() => {
        if (active) {
          setServerHealth({
            checking: false,
            connected: false,
            geminiConfigured: false,
            version: 'Offline'
          });
        }
      });

    return () => { active = false; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestSpeech = () => {
    setIsSpeakingTest(true);
    speechManager.speak('Namaste! GYAAN AI is ready to listen to your explanation.', {
      rate: speechRate,
      onEnd: () => setIsSpeakingTest(false)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-white border border-[#E9E5EF] shadow-2xl p-6 sm:p-7 text-[#25212B]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9FC] text-[#777381] hover:text-[#25212B] hover:bg-[#E9E5EF] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-[#56358B]/10 border border-[#56358B]/20 flex items-center justify-center text-[#56358B]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-[#25212B] text-lg">
              AI & Speech Diagnostics
            </h3>
            <p className="text-xs text-[#777381]">
              Diagnostic health, privacy status & speech settings
            </p>
          </div>
        </div>

        <div className="space-y-4">
          
          {/* Privacy & Security Badge */}
          <div className="p-3.5 rounded-2xl bg-[#16A39A]/10 border border-[#16A39A]/20 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#16A39A] shrink-0 mt-0.5" />
            <div className="text-xs text-[#25212B] leading-relaxed">
              <strong className="text-[#16A39A]">Zero Client Secret Exposure:</strong>
              <p className="text-[#777381] mt-0.5">
                Evaluations are securely handled through the server-side API or the offline Socratic engine. No API keys are stored in your browser.
              </p>
            </div>
          </div>

          {/* Diagnostic Status Box */}
          <div className="p-4 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF] space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#777381] flex items-center justify-between">
              <span>System Telemetry</span>
              <Activity className="w-4 h-4 text-[#56358B]" />
            </div>

            <div className="flex items-center justify-between text-xs py-1 border-b border-[#E9E5EF]">
              <span className="flex items-center gap-1.5 text-[#25212B]">
                <Server className="w-3.5 h-3.5 text-[#777381]" /> Backend Node API
              </span>
              <span className={`font-bold flex items-center gap-1 ${serverHealth.connected ? 'text-emerald-600' : 'text-amber-600'}`}>
                {serverHealth.checking ? 'Connecting...' : serverHealth.connected ? 'Connected (:3001)' : 'Offline (Using Socratic)'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs py-1 border-b border-[#E9E5EF]">
              <span className="flex items-center gap-1.5 text-[#25212B]">
                <Bot className="w-3.5 h-3.5 text-[#777381]" /> Server Gemini AI
              </span>
              <span className={`font-bold ${serverHealth.geminiConfigured ? 'text-emerald-600' : 'text-[#777381]'}`}>
                {serverHealth.geminiConfigured ? 'Active' : 'Offline Engine Active'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <span className="flex items-center gap-1.5 text-[#25212B]">
                <Mic className="w-3.5 h-3.5 text-[#777381]" /> Browser Speech Input
              </span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Web Speech Ready
              </span>
            </div>
          </div>

          {/* Speech Rate Adjustment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#25212B]">
              <span>Tutor Voice Speed: {speechRate}x</span>
              <button 
                onClick={handleTestSpeech}
                disabled={isSpeakingTest}
                className="text-xs text-[#56358B] hover:text-[#56358B]/80 font-bold flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isSpeakingTest ? 'Testing...' : 'Test Voice'}</span>
              </button>
            </div>
            <input 
              type="range" 
              min="0.8" 
              max="1.2" 
              step="0.05"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="w-full accent-[#56358B]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#56358B] hover:bg-[#56358B]/90 text-white text-xs font-bold transition shadow-sm"
            >
              Close Diagnostics
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
