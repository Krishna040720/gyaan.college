// Gemini Free Multimodal Vision Provider
// Uses Gemini 2.0 Flash / 1.5 Flash multimodal capabilities at zero cost
import { BaseVisionProvider } from './baseVisionProvider.js';

export class GeminiVisionProvider extends BaseVisionProvider {
  constructor(config = {}) {
    super({
      name: 'gemini_vision_free',
      model: config.model || process.env.GEMINI_VISION_MODEL || 'gemini-2.0-flash',
      ...config
    });
    this.apiKey = config.apiKey || process.env.GEMINI_API_KEY || '';
    this.baseUrl = config.baseUrl || 'https://generativelanguage.googleapis.com/v1beta';
  }

  async healthCheck() {
    return {
      healthy: Boolean(this.apiKey && this.apiKey.trim().length > 0),
      provider: this.name,
      model: this.model,
      details: this.apiKey ? 'Ready' : 'GEMINI_API_KEY not set'
    };
  }

  async extractTextAndDiagrams({ image, mimeType = 'image/jpeg', prompt }) {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY is not configured for vision provider');
    }

    const base64Data = typeof image === 'string' 
      ? image.replace(/^data:[^;]+;base64,/, '') 
      : image.toString('base64');

    const instruction = prompt || 
      'Extract all text, scientific formulas (in LaTeX or standard notation), and describe any diagrams or circuit diagrams found in this image accurately.';

    const url = `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: instruction },
            {
              inlineData: {
                mimeType,
                data: base64Data
              }
            }
          ]
        }]
      }),
      signal: AbortSignal.timeout(20000)
    });

    if (!res.ok) {
      throw new Error(`Gemini Vision API returned HTTP ${res.status}`);
    }

    const data = await res.json();
    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Extract formulas
    const formulaMatches = textOutput.match(/(\$[^\$]+\$)|(\\\([^\)]+\\\))|([A-Za-z]\s*=\s*[^,\n]+)/g) || [];

    return {
      text: textOutput,
      formulas: Array.from(new Set(formulaMatches.map(f => f.trim()))),
      provider: this.name
    };
  }
}
