// Web Speech API Provider (Client-side zero-cost STT)
// Uses browser window.SpeechRecognition / webkitSpeechRecognition
import { BaseSTTProvider } from './baseSTTProvider.js';

export class WebSpeechSTTProvider extends BaseSTTProvider {
  constructor(config = {}) {
    super({
      name: 'web_speech',
      isClientSide: true,
      ...config
    });
  }

  async transcribe({ audio, language = 'en-IN', vocabularyHints = [] }) {
    // When called on the server, Web Speech acts as a client-side delegation signal
    return {
      transcript: typeof audio === 'string' ? audio : '',
      confidence: 1.0,
      provider: this.name,
      language,
      delegatedToClient: true
    };
  }

  async healthCheck() {
    return {
      healthy: true,
      provider: this.name,
      details: 'Browser Web Speech API (Client-side, free, zero-latency)'
    };
  }
}
