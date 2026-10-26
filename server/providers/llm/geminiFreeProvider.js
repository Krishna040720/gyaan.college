// Gemini Free Tier Provider (Flash models)
// Uses Google AI Studio free tier: gemini-2.0-flash / gemini-1.5-flash
import { BaseLLMProvider } from './baseLLMProvider.js';

export class GeminiFreeProvider extends BaseLLMProvider {
  constructor(config = {}) {
    super({
      name: 'gemini_free',
      model: config.model || process.env.GEMINI_MODEL || 'gemini-2.0-flash',
      ...config
    });
    this.apiKey = config.apiKey || process.env.GEMINI_API_KEY || '';
    this.baseUrl = config.baseUrl || 'https://generativelanguage.googleapis.com/v1beta';
    this.timeoutMs = Number(config.timeoutMs || process.env.AI_TIMEOUT_MS) || 15000;
  }

  async healthCheck() {
    if (!this.apiKey || this.apiKey.trim() === '') {
      return {
        healthy: false,
        provider: this.name,
        model: this.model,
        details: 'GEMINI_API_KEY is not configured in .env'
      };
    }

    try {
      const url = `${this.baseUrl}/models/${this.model}?key=${this.apiKey}`;
      const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        return { healthy: true, provider: this.name, model: this.model };
      }
      const data = await res.json().catch(() => ({}));
      return {
        healthy: false,
        provider: this.name,
        model: this.model,
        details: data.error?.message || `HTTP ${res.status}`
      };
    } catch (err) {
      return {
        healthy: false,
        provider: this.name,
        model: this.model,
        details: err.message
      };
    }
  }

  async generateText({ prompt, systemPrompt, temperature = 0.7, maxTokens = 1024 }) {
    if (!this.apiKey) {
      const err = new Error('GEMINI_API_KEY is not configured');
      err.status = 503;
      err.code = 'CONFIG_MISSING';
      throw err;
    }

    const contents = [];
    if (systemPrompt) {
      contents.push({ role: 'user', parts: [{ text: `[System Instructions]: ${systemPrompt}` }] });
      contents.push({ role: 'model', parts: [{ text: 'Understood. I will follow these instructions strictly.' }] });
    }
    contents.push({ role: 'user', parts: [{ text: prompt }] });

    const url = `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens
          }
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const err = new Error(errorData.error?.message || `Gemini API returned HTTP ${response.status}`);
        err.status = response.status;
        err.code = response.status === 429 ? 'RATE_LIMIT_EXCEEDED' : 'API_ERROR';
        err.details = errorData;
        throw err;
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } finally {
      clearTimeout(timeout);
    }
  }

  async generateStructuredJson({ prompt, systemPrompt, schema, temperature = 0.4, maxRetries = 3 }) {
    if (!this.apiKey) {
      const err = new Error('GEMINI_API_KEY is not configured');
      err.status = 503;
      err.code = 'CONFIG_MISSING';
      throw err;
    }

    const contents = [];
    if (systemPrompt) {
      contents.push({ role: 'user', parts: [{ text: `[System Instructions]: ${systemPrompt}` }] });
      contents.push({ role: 'model', parts: [{ text: 'Understood. I will follow instructions and return valid JSON only.' }] });
    }
    contents.push({ role: 'user', parts: [{ text: prompt }] });

    const url = `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`;
    let attempt = 0;
    let lastError = null;

    while (attempt < maxRetries) {
      attempt++;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              responseMimeType: 'application/json',
              temperature
            }
          }),
          signal: controller.signal
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const isRetryable = response.status === 429 || response.status === 503 || response.status === 502 || response.status === 500;
          const err = new Error(errorData.error?.message || `Gemini API returned HTTP ${response.status}`);
          err.status = response.status;
          err.code = response.status === 429 ? 'RATE_LIMIT_EXCEEDED' : 'API_ERROR';
          err.details = errorData;

          if (isRetryable && attempt < maxRetries) {
            const delay = Math.pow(2, attempt) * 1000;
            console.log(`[GeminiFreeProvider] Attempt ${attempt}/${maxRetries} failed (HTTP ${response.status}). Retrying in ${delay}ms...`);
            await new Promise(r => setTimeout(r, delay));
            continue;
          }
          throw err;
        }

        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
        const cleanJson = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        return JSON.parse(cleanJson);
      } catch (err) {
        lastError = err;
        const isRetryable = err.name === 'AbortError' || err.status === 429 || err.status === 503 || err.status === 502;
        if (isRetryable && attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000;
          console.log(`[GeminiFreeProvider] Exception on attempt ${attempt}/${maxRetries} (${err.message}). Retrying in ${delay}ms...`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
        throw err;
      } finally {
        clearTimeout(timeout);
      }
    }

    throw lastError || new Error(`Gemini request failed after ${maxRetries} attempts`);
  }
}
