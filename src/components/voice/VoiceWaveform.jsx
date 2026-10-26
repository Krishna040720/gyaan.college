// GYAAN AI Voice Waveform & Playback Controller
// Renders active speech pulse animation and playback controls (Pause, Resume, Stop)

import React, { useState, useEffect } from 'react';
import { Pause, Play, Square } from 'lucide-react';
import { speechManager } from '../../services/aiVoiceService';
import { soundService } from '../../services/soundService';

export default function VoiceWaveform({ className = '' }) {
  const [audioState, setAudioState] = useState({
    isSpeaking: speechManager.isSpeaking,
    isPaused: speechManager.isPaused,
    currentChunkIndex: speechManager.currentChunkIndex,
    totalChunks: speechManager.totalChunks
  });

  useEffect(() => {
    const unsubscribe = speechManager.subscribe((st) => {
      setAudioState(st);
    });
    return () => unsubscribe();
  }, []);

  if (!audioState.isSpeaking) return null;

  const handlePauseResume = () => {
    soundService.playClick();
    if (audioState.isPaused) {
      speechManager.resume();
    } else {
      speechManager.pause();
    }
  };

  const handleStop = () => {
    soundService.playClick();
    speechManager.stopSpeaking();
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#56358B]/10 border border-[#56358B]/25 text-[#56358B] text-xs font-bold shadow-xs animate-in fade-in duration-150 ${className}`}>
      
      {/* Waveform Animation Bars */}
      <div className="flex items-center gap-0.5 h-4 px-1">
        <span className={`w-1 rounded-full bg-[#56358B] transition-all duration-150 ${audioState.isPaused ? 'h-1.5' : 'h-3 animate-pulse'}`} />
        <span className={`w-1 rounded-full bg-[#16A39A] transition-all duration-150 ${audioState.isPaused ? 'h-2' : 'h-4 animate-bounce'}`} style={{ animationDelay: '75ms' }} />
        <span className={`w-1 rounded-full bg-[#56358B] transition-all duration-150 ${audioState.isPaused ? 'h-3' : 'h-2 animate-pulse'}`} style={{ animationDelay: '150ms' }} />
        <span className={`w-1 rounded-full bg-[#16A39A] transition-all duration-150 ${audioState.isPaused ? 'h-1.5' : 'h-3.5 animate-bounce'}`} style={{ animationDelay: '225ms' }} />
      </div>

      <span className="text-[11px] font-semibold text-[#56358B]">
        {audioState.isPaused ? 'Paused' : 'Explaining...'}
      </span>

      {audioState.totalChunks > 1 && (
        <span className="text-[10px] text-[#777381] font-mono">
          {audioState.currentChunkIndex + 1}/{audioState.totalChunks}
        </span>
      )}

      {/* Play / Pause Toggle */}
      <button
        onClick={handlePauseResume}
        className="p-1 rounded-lg bg-white hover:bg-[#FAF9FC] text-[#56358B] transition border border-[#E9E5EF] shadow-2xs"
        title={audioState.isPaused ? 'Resume' : 'Pause'}
      >
        {audioState.isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3" />}
      </button>

      {/* Stop */}
      <button
        onClick={handleStop}
        className="p-1 rounded-lg bg-white hover:bg-rose-50 text-rose-600 transition border border-[#E9E5EF] shadow-2xs"
        title="Stop Reading"
      >
        <Square className="w-3 h-3 fill-current" />
      </button>

    </div>
  );
}
