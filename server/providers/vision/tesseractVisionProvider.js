// Local Tesseract OCR Vision Provider (Free, offline)
// Uses tesseract CLI / local OCR service
import { BaseVisionProvider } from './baseVisionProvider.js';

export class TesseractVisionProvider extends BaseVisionProvider {
  constructor(config = {}) {
    super({
      name: 'tesseract_local',
      ...config
    });
    this.endpoint = (config.endpoint || process.env.OCR_ENDPOINT || 'http://localhost:8000/api/ocr/extract').replace(/\/+$/, '');
  }

  async healthCheck() {
    try {
      const res = await fetch(`${this.endpoint.replace('/extract', '/health')}`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      });
      return {
        healthy: res.ok,
        provider: this.name,
        details: res.ok ? 'Local Tesseract ready' : `HTTP ${res.status}`
      };
    } catch {
      return {
        healthy: false,
        provider: this.name,
        details: 'Local Tesseract daemon not running'
      };
    }
  }

  async extractTextAndDiagrams({ image, mimeType = 'image/jpeg', prompt }) {
    try {
      const base64Data = typeof image === 'string' 
        ? image.replace(/^data:[^;]+;base64,/, '') 
        : image.toString('base64');

      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_base64: base64Data,
          mime_type: mimeType
        }),
        signal: AbortSignal.timeout(15000)
      });

      if (!res.ok) {
        throw new Error(`OCR service returned HTTP ${res.status}`);
      }

      const data = await res.json();
      return {
        text: data.text || '',
        formulas: data.formulas || [],
        provider: this.name
      };
    } catch (err) {
      console.warn(`[TesseractVisionProvider] Extraction failed: ${err.message}`);
      throw err;
    }
  }
}
