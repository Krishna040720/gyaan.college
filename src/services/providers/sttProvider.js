// Client-Side STT Provider Adapter
// Selects between Browser Web Speech API (default, zero cost) and Whisper Local

export class ClientSTTProvider {
  constructor(config = {}) {
    this.provider = config.provider || import.meta.env.VITE_STT_PROVIDER || 'web_speech';
  }

  isWebSpeech() {
    return this.provider === 'web_speech';
  }

  isWhisper() {
    return this.provider === 'whisper_local' || this.provider === 'whisper';
  }
}

export const clientSTT = new ClientSTTProvider();
