// Client-Side TTS Provider Adapter
// Selects between Browser SpeechSynthesis (default, natural Indian voices) and Piper Local

export class ClientTTSProvider {
  constructor(config = {}) {
    this.provider = config.provider || import.meta.env.VITE_TTS_PROVIDER || 'browser_speech';
  }

  isBrowserSpeech() {
    return this.provider === 'browser_speech' || this.provider === 'browser';
  }

  isPiper() {
    return this.provider === 'piper_local' || this.provider === 'piper' || this.provider === 'edge_tts';
  }
}

export const clientTTS = new ClientTTSProvider();
