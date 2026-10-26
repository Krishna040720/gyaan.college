// Browser SpeechSynthesis TTS Provider (Client-side, free, zero-latency)
// Uses Web Speech API window.speechSynthesis with Indian English Female voice selection
import { BaseTTSProvider } from './baseTTSProvider.js';

export class BrowserTTSProvider extends BaseTTSProvider {
  constructor(config = {}) {
    super({
      name: 'browser_speech',
      isClientSide: true,
      ...config
    });
  }

  async synthesize({ text, language = 'en-IN', voice, rate = 0.95, pitch = 1.0 }) {
    return {
      text,
      language,
      voicePreference: voice || 'en-IN-female',
      rate,
      pitch,
      provider: this.name,
      delegatedToClient: true
    };
  }

  async healthCheck() {
    return {
      healthy: true,
      provider: this.name,
      details: 'Browser SpeechSynthesis API (Client-side, free, natural voices)'
    };
  }
}
