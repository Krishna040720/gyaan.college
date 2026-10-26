// Base abstract interface for Speech-To-Text (STT) Providers
// Supports swappable providers: Browser Web Speech API, Local Whisper, etc.

export class BaseSTTProvider {
  constructor(config = {}) {
    this.name = config.name || 'base_stt';
    this.config = config;
  }

  /**
   * Transcribes an audio buffer or stream to text
   * @param {Object} options
   * @param {Buffer|Blob|string} options.audio - Audio bytes or base64 data
   * @param {string} [options.language='en-IN']
   * @param {string[]} [options.vocabularyHints=[]]
   * @returns {Promise<{ transcript: string, confidence: number, language?: string }>}
   */
  async transcribe({ audio, language = 'en-IN', vocabularyHints = [] }) {
    throw new Error(`transcribe() must be implemented by ${this.constructor.name}`);
  }

  async healthCheck() {
    return {
      healthy: true,
      provider: this.name,
      details: 'STT Provider initialized'
    };
  }
}
