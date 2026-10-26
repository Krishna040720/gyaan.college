// Base abstract interface for LLM Providers
// Supports swappable providers: Gemini Free Tier, Ollama Local, etc.

export class BaseLLMProvider {
  constructor(config = {}) {
    this.name = config.name || 'base_llm';
    this.model = config.model || 'default';
    this.config = config;
  }

  /**
   * Generates free-form text from a prompt
   * @param {Object} options
   * @param {string} options.prompt
   * @param {string} [options.systemPrompt]
   * @param {number} [options.temperature=0.7]
   * @param {number} [options.maxTokens=1024]
   * @returns {Promise<string>}
   */
  async generateText({ prompt, systemPrompt, temperature = 0.7, maxTokens = 1024 }) {
    throw new Error(`generateText() must be implemented by ${this.constructor.name}`);
  }

  /**
   * Generates structured JSON matching a desired schema
   * @param {Object} options
   * @param {string} options.prompt
   * @param {string} [options.systemPrompt]
   * @param {Object} [options.schema]
   * @param {number} [options.temperature=0.4]
   * @returns {Promise<Object>}
   */
  async generateStructuredJson({ prompt, systemPrompt, schema, temperature = 0.4 }) {
    throw new Error(`generateStructuredJson() must be implemented by ${this.constructor.name}`);
  }

  /**
   * Checks if the provider is currently reachable and available
   * @returns {Promise<{ healthy: boolean, provider: string, model: string, details?: string }>}
   */
  async healthCheck() {
    return {
      healthy: false,
      provider: this.name,
      model: this.model,
      details: 'healthCheck() not implemented'
    };
  }
}
