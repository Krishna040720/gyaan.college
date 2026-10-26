// GYAAN AI Robust Video Player Component
// State Machine: LOADING | READY | PLAYING | ERROR | UNAVAILABLE
// Handles YouTube embed restrictions (Error 150/101), class integrity validation, and provides clean fallbacks

import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  ExternalLink, 
  RefreshCw, 
  BookOpen, 
  Mic, 
  Sparkles
} from 'lucide-react';
import { soundService } from '../services/soundService';

const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

export default function VideoPlayer({
  video,
  selectedClass,
  chapterTitle,
  onOpenFeynmanStudio,
  onOpenNotes
}) {
  const videoId = video?.id;
  const isClassValid = !video?.classLevel || !selectedClass || Number(video.classLevel) === Number(selectedClass);
  const isValidYouTubeId = Boolean(videoId && YOUTUBE_ID_REGEX.test(videoId));
  const isAvailable = Boolean(videoId && isValidYouTubeId && isClassValid);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  // Timeout fallback if iframe hangs
  useEffect(() => {
    if (!isAvailable) return;
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, [videoId, retryKey, isAvailable]);

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  const handleIframeError = () => {
    setHasError(true);
  };

  const handleRetry = () => {
    soundService.playClick();
    setIsLoaded(false);
    setHasError(false);
    setTimedOut(false);
    setRetryKey(prev => prev + 1);
  };

  const watchOnYouTubeUrl = isValidYouTubeId 
    ? `https://www.youtube.com/watch?v=${videoId}`
    : `https://www.youtube.com/results?search_query=Class+${selectedClass}+${encodeURIComponent(chapterTitle || 'lesson')}`;

  // RENDER: Class mismatch or curation pending (UNAVAILABLE)
  if (!isAvailable) {
    return (
      <div className="w-full aspect-video rounded-3xl bg-gradient-to-br from-[#25212B] to-[#3B2B50] p-6 sm:p-8 flex flex-col items-center justify-center text-center text-white border border-[#56358B]/30 shadow-lg relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#56358B]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#16A39A]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-lg space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#56358B]/40 border border-[#56358B]/60 flex items-center justify-center mx-auto text-[#16A39A] shadow-inner">
            <Sparkles className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <span className="inline-block px-3 py-1 rounded-full bg-[#16A39A]/20 border border-[#16A39A]/30 text-[#16A39A] text-xs font-bold uppercase tracking-wider">
              Class {selectedClass} • Curation In Progress
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Video lecture curation in progress for Class {selectedClass}
            </h3>
            <p className="text-xs sm:text-sm text-[#D3CCE0] leading-relaxed">
              We uphold strict content integrity: lessons from other classes are never shown. Master this chapter right now using our interactive notes or active voice recall!
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {onOpenFeynmanStudio && (
              <button
                onClick={() => { soundService.playClick(); onOpenFeynmanStudio(); }}
                className="px-4 py-2.5 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white text-xs font-bold transition flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mic className="w-4 h-4 text-[#16A39A]" />
                <span>Explain in Feynman Studio</span>
              </button>
            )}

            {onOpenNotes && (
              <button
                onClick={() => { soundService.playClick(); onOpenNotes(); }}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-2 border border-white/20"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Read Notes & Formulas</span>
              </button>
            )}

            <a
              href={watchOnYouTubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Search Class {selectedClass} on YouTube</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Error state or embed timeout
  if (hasError || timedOut) {
    return (
      <div className="w-full aspect-video rounded-3xl bg-[#25212B] p-6 sm:p-8 flex flex-col items-center justify-center text-center text-white border border-rose-500/30 shadow-lg relative">
        <div className="max-w-md space-y-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <AlertCircle className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">
              Playback Restricted or Unavailable
            </h4>
            <p className="text-xs text-[#D3CCE0]">
              This video cannot be embedded directly inside the browser due to YouTube domain security settings (Error 150/101).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <a
              href={watchOnYouTubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Watch on YouTube</span>
            </a>

            <button
              onClick={handleRetry}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition flex items-center gap-1.5 border border-white/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>

            {onOpenFeynmanStudio && (
              <button
                onClick={() => { soundService.playClick(); onOpenFeynmanStudio(); }}
                className="px-3.5 py-2 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white text-xs font-semibold transition flex items-center gap-1.5"
              >
                <Mic className="w-3.5 h-3.5 text-[#16A39A]" />
                <span>Skip to Feynman Studio</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Loading or Ready Video Embed
  return (
    <div key={`${videoId}-${retryKey}`} className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-lg border border-[#E9E5EF]">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#25212B] text-white space-y-3">
          <div className="w-10 h-10 border-4 border-[#56358B] border-t-[#16A39A] rounded-full animate-spin" />
          <p className="text-xs text-[#D3CCE0] font-medium tracking-wide">
            Loading educational video stream...
          </p>
        </div>
      )}

      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`}
        title={video?.title || chapterTitle || 'Educational Video'}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    </div>
  );
}
