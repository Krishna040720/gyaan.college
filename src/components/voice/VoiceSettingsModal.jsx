// GYAAN AI Voice Settings Modal
// Configures Natural Female Voice preferences, speech delivery speed (0.8x - 1.25x), and live sample preview

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Volume2, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Sliders 
} from 'lucide-react';
import { speechManager } from '../../services/aiVoiceService';
import { soundService } from '../../services/soundService';
import VoiceWaveform from './VoiceWaveform';

export default function VoiceSettingsModal({ isOpen, onClose }) {
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(speechManager.settings.voiceURI || '');
  const [rate, setRate] = useState(speechManager.settings.rate || 0.95);
  const pitch = speechManager.settings.pitch || 1.0;
  const [lang, setLang] = useState(speechManager.settings.lang || 'en-IN');
  const [isPreviewing, setIsPreviewing] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const loadVoicesList = () => {
      const list = speechManager.getVoices();
      if (list && list.length > 0) {
        setVoices(list);
        if (!selectedVoiceURI) {
          const pref = speechManager.getPreferredVoice(lang);
          if (pref) setSelectedVoiceURI(pref.voiceURI);
        }
      }
    };

    loadVoicesList();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoicesList;
    }
  }, [lang, selectedVoiceURI]);

  if (!isOpen) return null;

  const handleSave = () => {
    soundService.playSuccess();
    speechManager.saveSettings({
      voiceURI: selectedVoiceURI,
      rate: Number(rate),
      pitch: Number(pitch),
      lang
    });
    onClose();
  };

  const handlePreview = () => {
    soundService.playClick();
    setIsPreviewing(true);
    speechManager.saveSettings({
      voiceURI: selectedVoiceURI,
      rate: Number(rate),
      pitch: Number(pitch),
      lang
    });

    const previewSentence = lang.startsWith('hi')
      ? 'नमस्ते! मैं आपकी ज्ञान एआई मेंटर हूँ। किसी भी विषय को अपने शब्दों में समझाइए, और हम मिलकर अभ्यास करेंगे।'
      : 'Hello! I am your GYAAN AI learning mentor. Explain any concept in your own words, and I will help you master it!';

    speechManager.speak(previewSentence, {
      rate: Number(rate),
      pitch: Number(pitch),
      lang,
      onEnd: () => setIsPreviewing(false)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25212B]/45 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-white border border-[#E9E5EF] shadow-2xl p-6 text-[#25212B] space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            speechManager.stopSpeaking();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9FC] text-[#777381] hover:text-[#25212B] hover:bg-[#E9E5EF] transition border border-[#E9E5EF]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#56358B]/10 border border-[#56358B]/20 text-[#56358B] flex items-center justify-center">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#25212B]">
              AI Voice & Audio Settings
            </h3>
            <p className="text-xs text-[#777381]">
              Natural female audio tutor for textbook explanations & Feynman recall
            </p>
          </div>
        </div>

        {/* Settings Body */}
        <div className="space-y-4">
          
          {/* Language Selection */}
          <div>
            <label className="block text-xs font-bold text-[#25212B] mb-1.5">
              Preferred Learning Language
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { soundService.playClick(); setLang('en-IN'); }}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  lang === 'en-IN' 
                    ? 'bg-[#56358B] text-white border-[#56358B]' 
                    : 'bg-[#FAF9FC] text-[#777381] border-[#E9E5EF] hover:bg-[#E9E5EF]'
                }`}
              >
                <span>Indian English (en-IN)</span>
              </button>
              <button
                type="button"
                onClick={() => { soundService.playClick(); setLang('hi-IN'); }}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  lang === 'hi-IN' 
                    ? 'bg-[#56358B] text-white border-[#56358B]' 
                    : 'bg-[#FAF9FC] text-[#777381] border-[#E9E5EF] hover:bg-[#E9E5EF]'
                }`}
              >
                <span>हिन्दी (hi-IN)</span>
              </button>
            </div>
          </div>

          {/* Voice Selector */}
          <div>
            <label className="block text-xs font-bold text-[#25212B] mb-1.5">
              Natural Voice Engine
            </label>
            <select
              value={selectedVoiceURI}
              onChange={(e) => setSelectedVoiceURI(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E9E5EF] bg-white text-xs font-medium text-[#25212B] focus:outline-none focus:border-[#56358B] transition cursor-pointer"
            >
              {voices.map((v) => {
                const isFemale = v.name.toLowerCase().includes('female') || 
                  v.name.toLowerCase().includes('heera') || 
                  v.name.toLowerCase().includes('neerja') || 
                  v.name.toLowerCase().includes('veena') ||
                  v.name.toLowerCase().includes('zira') ||
                  v.name.toLowerCase().includes('natural');
                return (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang}) {isFemale ? '★ Female' : ''}
                  </option>
                );
              })}
            </select>
            <p className="text-[10px] text-[#777381] mt-1">
              Voices with ★ Female Natural provide the most pleasant educational cadence.
            </p>
          </div>

          {/* Speed Rate Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-[#16A39A]" /> Speaking Speed:
              </span>
              <span className="text-[#56358B] font-mono">{rate}x</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.2"
              step="0.05"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full accent-[#56358B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#777381] mt-0.5">
              <span>0.8x (Deliberate)</span>
              <span className="text-[#56358B] font-bold">0.95x (Optimal)</span>
              <span>1.2x (Fast)</span>
            </div>
          </div>

          {/* Live Preview Button */}
          <div className="pt-2 flex items-center justify-between gap-2 p-3 rounded-2xl bg-[#FAF9FC] border border-[#E9E5EF]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#56358B]" />
              <span className="text-xs font-semibold text-[#25212B]">Preview Delivery:</span>
            </div>
            <div className="flex items-center gap-2">
              <VoiceWaveform />
              <button
                type="button"
                onClick={handlePreview}
                className="py-1.5 px-3 rounded-xl bg-white hover:bg-[#FAF9FC] border border-[#E9E5EF] text-xs font-bold text-[#56358B] transition flex items-center gap-1 shadow-2xs"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isPreviewing ? 'Playing...' : 'Test Voice'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              speechManager.stopSpeaking();
              onClose();
            }}
            className="py-2.5 px-4 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#777381] text-xs font-semibold transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="py-2.5 px-5 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A39A]" />
            <span>Save Preferences</span>
          </button>
        </div>

      </div>
    </div>
  );
}
