// Local Whisper STT Provider (Offline, zero-cost)
// Communicates with local faster-whisper/whisper daemon
import { BaseSTTProvider } from './baseSTTProvider.js';

export class WhisperLocalSTTProvider extends BaseSTTProvider {
  constructor(config = {}) {
    super({
      name: 'whisper_local',
      model: config.model || process.env.WHISPER_MODEL || 'base',
      ...config
    });
    this.endpoint = (config.endpoint || process.env.WHISPER_ENDPOINT || 'http://localhost:8000/api/voice/transcribe').replace(/\/+$/, '');
  }

  async healthCheck() {
    try {
      const res = await fetch(`${this.endpoint.replace('/transcribe', '/health')}`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        return { healthy: true, provider: this.name, model: this.model };
      }
      return { healthy: false, provider: this.name, model: this.model, details: `HTTP ${res.status}` };
    } catch (err) {
      return {
        healthy: false,
        provider: this.name,
        model: this.model,
        details: `Whisper endpoint not reachable at ${this.endpoint}: ${err.message}`
      };
    }
  }

  async transcribe({ audio, language = 'en', vocabularyHints = [] }) {
    try {
      const body = {
        audio_base64: typeof audio === 'string' ? audio : audio.toString('base64'),
        language,
        initial_prompt: vocabularyHints.join(', ')
      };

      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(30000)
      });

      if (!res.ok) {
        throw new Error(`Whisper transcription failed with HTTP ${res.status}`);
      }

      const data = await res.json();
      return {
        transcript: data.text || data.transcript || '',
        confidence: Number(data.confidence ?? 0.95),
        provider: this.name,
        language
      };
    } catch (err) {
      console.warn(`[WhisperLocalSTTProvider] Failed: ${err.message}.`);
      throw err;
    }
  }
}
