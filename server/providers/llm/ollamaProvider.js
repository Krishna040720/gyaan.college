// Ollama Local Provider (Zero-cost, completely offline)
// Connects to local Ollama daemon at http://localhost:11434
import { BaseLLMProvider } from './baseLLMProvider.js';

export class OllamaProvider extends BaseLLMProvider {
  constructor(config = {}) {
    super({
      name: 'ollama_local',
      model: config.model || process.env.OLLAMA_MODEL || 'llama3.2:1b',
      ...config
    });
    this.baseUrl = (config.baseUrl || process.env.OLLAMA_BASE_URL || 'http://localhost:11434').replace(/\/+$/, '');
    this.timeoutMs = Number(config.timeoutMs || process.env.OLLAMA_TIMEOUT_MS) || 45000;
  }

  async healthCheck() {
    try {
      const res = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
        signal: AbortSignal.timeout(4000)
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({ models: [] }));
        const availableModels = (data.models || []).map(m => m.name);
        const hasModel = availableModels.some(m => m.startsWith(this.model.split(':')[0]));
        return {
          healthy: true,
          provider: this.name,
          model: this.model,
          details: hasModel ? 'Ready' : `Model ${this.model} not downloaded locally. Run: ollama pull ${this.model}`,
          availableModels
        };
      }
      return {
        healthy: false,
        provider: this.name,
        model: this.model,
        details: `Ollama returned HTTP ${res.status}`
      };
    } catch (err) {
      return {
        healthy: false,
        provider: this.name,
        model: this.model,
        details: `Ollama server not reachable at ${this.baseUrl}: ${err.message}`
      };
    }
  }

  async generateText({ prompt, systemPrompt, temperature = 0.7, maxTokens = 1024 }) {
    const url = `${this.baseUrl}/api/generate`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          prompt,
          system: systemPrompt || undefined,
          stream: false,
          options: {
            temperature,
            num_predict: maxTokens
          }
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        const err = new Error(`Ollama returned HTTP ${response.status}: ${errText}`);
        err.status = response.status;
        err.code = 'OLLAMA_ERROR';
        throw err;
      }

      const data = await response.json();
      return data.response || '';
    } finally {
      clearTimeout(timeout);
    }
  }

  async generateStructuredJson({ prompt, systemPrompt, schema, temperature = 0.3 }) {
    const url = `${this.baseUrl}/api/generate`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    const fullPrompt = `${prompt}\n\nIMPORTANT: Return ONLY a valid JSON object matching the requested schema. No conversational preamble, no markdown formatting.`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          prompt: fullPrompt,
          system: systemPrompt ? `${systemPrompt}\nYou must output strictly valid JSON.` : 'You must output strictly valid JSON.',
          format: 'json',
          stream: false,
          options: {
            temperature
          }
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        const err = new Error(`Ollama returned HTTP ${response.status}: ${errText}`);
        err.status = response.status;
        err.code = 'OLLAMA_ERROR';
        throw err;
      }

      const data = await response.json();
      const rawText = data.response || '{}';
      const cleanJson = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      return JSON.parse(cleanJson);
    } finally {
      clearTimeout(timeout);
    }
  }
}
