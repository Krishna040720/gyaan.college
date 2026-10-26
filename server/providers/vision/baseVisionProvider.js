// Base abstract interface for Vision & OCR Providers
// Supports swappable providers: Gemini Flash Free Vision, Tesseract Local OCR

export class BaseVisionProvider {
  constructor(config = {}) {
    this.name = config.name || 'base_vision';
    this.config = config;
  }

  /**
   * Extracts text, formulas, or diagram descriptions from an image
   * @param {Object} options
   * @param {Buffer|string} options.image - Image buffer or base64 data
   * @param {string} [options.mimeType='image/jpeg']
   * @param {string} [options.prompt]
   * @returns {Promise<{ text: string, formulas?: string[], detectedDiagram?: string, provider: string }>}
   */
  async extractTextAndDiagrams({ image, mimeType = 'image/jpeg', prompt }) {
    throw new Error(`extractTextAndDiagrams() must be implemented by ${this.constructor.name}`);
  }

  async healthCheck() {
    return {
      healthy: true,
      provider: this.name,
      details: 'Vision Provider initialized'
    };
  }
}
