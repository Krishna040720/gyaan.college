// Piper / Edge-TTS Local Neural TTS Provider (Free, offline/self-hosted)
import { BaseTTSProvider } from './baseTTSProvider.js';

export class PiperLocalTTSProvider extends BaseTTSProvider {
  constructor(config = {}) {
    super({
      name: 'piper_local',
      voice: config.voice || process.env.PIPER_VOICE || 'en_IN-cmu_chetan-medium',
      ...config
    });
    this.endpoint = (config.endpoint || process.env.PIPER_ENDPOINT || 'http://localhost:8000/api/voice/synthesize').replace(/\/+$/, '');
  }

  async healthCheck() {
    try {
      const res = await fetch(`${this.endpoint.replace('/synthesize', '/health')}`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      });
      return {
        healthy: res.ok,
        provider: this.name,
        voice: this.voice,
        details: res.ok ? 'Piper/Edge-TTS ready' : `HTTP ${res.status}`
      };
    } catch (err) {
      return {
        healthy: false,
        provider: this.name,
        voice: this.voice,
        details: `Piper endpoint unreachable at ${this.endpoint}: ${err.message}`
      };
    }
  }

  async synthesize({ text, language = 'en-IN', voice, rate = 1.0, pitch = 1.0 }) {
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voice: voice || this.voice,
          language,
          rate,
          pitch
        }),
        signal: AbortSignal.timeout(20000)
      });

      if (!res.ok) {
        throw new Error(`Piper synthesis returned HTTP ${res.status}`);
      }

      const audioBuffer = await res.arrayBuffer();
      return {
        audioBuffer: Buffer.from(audioBuffer),
        provider: this.name,
        contentType: res.headers.get('content-type') || 'audio/wav'
      };
    } catch (err) {
      console.warn(`[PiperLocalTTSProvider] Synthesis failed: ${err.message}`);
      throw err;
    }
  }
}
