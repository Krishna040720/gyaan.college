// Base abstract interface for Text-To-Speech (TTS) Providers
// Supports swappable providers: Browser SpeechSynthesis, Piper Local, Edge-TTS

export class BaseTTSProvider {
  constructor(config = {}) {
    this.name = config.name || 'base_tts';
    this.config = config;
  }

  /**
   * Synthesizes text to spoken audio
   * @param {Object} options
   * @param {string} options.text
   * @param {string} [options.language='en-IN']
   * @param {string} [options.voice]
   * @param {number} [options.rate=1.0]
   * @param {number} [options.pitch=1.0]
   * @returns {Promise<{ audioUrl?: string, audioBuffer?: Buffer, provider: string }>}
   */
  async synthesize({ text, language = 'en-IN', voice, rate = 1.0, pitch = 1.0 }) {
    throw new Error(`synthesize() must be implemented by ${this.constructor.name}`);
  }

  async healthCheck() {
    return {
      healthy: true,
      provider: this.name,
      details: 'TTS Provider initialized'
    };
  }
}
