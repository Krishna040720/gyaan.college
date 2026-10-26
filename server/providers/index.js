// GYAAN AI Provider Gateway & Registry
// Reads provider configuration from .env and instantiates appropriate free provider

import { GeminiFreeProvider } from './llm/geminiFreeProvider.js';
import { OllamaProvider } from './llm/ollamaProvider.js';
import { WebSpeechSTTProvider } from './stt/webSpeechSTTProvider.js';
import { WhisperLocalSTTProvider } from './stt/whisperLocalSTTProvider.js';
import { BrowserTTSProvider } from './tts/browserTTSProvider.js';
import { PiperLocalTTSProvider } from './tts/piperLocalTTSProvider.js';
import { SQLiteRetrievalProvider } from './retrieval/sqliteRetrievalProvider.js';
import { PgVectorRetrievalProvider } from './retrieval/pgvectorRetrievalProvider.js';
import { GeminiVisionProvider } from './vision/geminiVisionProvider.js';
import { TesseractVisionProvider } from './vision/tesseractVisionProvider.js';

class ProviderManager {
  constructor() {
    this.instances = new Map();
  }

  getLLMProvider(overrideName) {
    const providerName = (overrideName || process.env.LLM_PROVIDER || 'gemini_free').toLowerCase().trim();
    const cacheKey = `llm:${providerName}`;
    if (this.instances.has(cacheKey)) return this.instances.get(cacheKey);

    let provider;
    switch (providerName) {
      case 'ollama':
      case 'ollama_local':
        provider = new OllamaProvider();
        break;
      case 'gemini':
      case 'gemini_free':
      default:
        provider = new GeminiFreeProvider();
        break;
    }

    this.instances.set(cacheKey, provider);
    return provider;
  }

  getSTTProvider(overrideName) {
    const providerName = (overrideName || process.env.STT_PROVIDER || 'web_speech').toLowerCase().trim();
    const cacheKey = `stt:${providerName}`;
    if (this.instances.has(cacheKey)) return this.instances.get(cacheKey);

    let provider;
    switch (providerName) {
      case 'whisper':
      case 'whisper_local':
        provider = new WhisperLocalSTTProvider();
        break;
      case 'web_speech':
      default:
        provider = new WebSpeechSTTProvider();
        break;
    }

    this.instances.set(cacheKey, provider);
    return provider;
  }

  getTTSProvider(overrideName) {
    const providerName = (overrideName || process.env.TTS_PROVIDER || 'browser_speech').toLowerCase().trim();
    const cacheKey = `tts:${providerName}`;
    if (this.instances.has(cacheKey)) return this.instances.get(cacheKey);

    let provider;
    switch (providerName) {
      case 'piper':
      case 'piper_local':
      case 'edge_tts':
        provider = new PiperLocalTTSProvider();
        break;
      case 'browser':
      case 'browser_speech':
      default:
        provider = new BrowserTTSProvider();
        break;
    }

    this.instances.set(cacheKey, provider);
    return provider;
  }

  getRetrievalProvider(overrideName) {
    const providerName = (overrideName || process.env.RETRIEVAL_PROVIDER || 'sqlite_local').toLowerCase().trim();
    const cacheKey = `retrieval:${providerName}`;
    if (this.instances.has(cacheKey)) return this.instances.get(cacheKey);

    let provider;
    switch (providerName) {
      case 'pgvector':
      case 'postgres':
        provider = new PgVectorRetrievalProvider();
        break;
      case 'sqlite':
      case 'sqlite_local':
      default:
        provider = new SQLiteRetrievalProvider();
        break;
    }

    this.instances.set(cacheKey, provider);
    return provider;
  }

  getVisionProvider(overrideName) {
    const providerName = (overrideName || process.env.VISION_PROVIDER || 'gemini_vision_free').toLowerCase().trim();
    const cacheKey = `vision:${providerName}`;
    if (this.instances.has(cacheKey)) return this.instances.get(cacheKey);

    let provider;
    switch (providerName) {
      case 'tesseract':
      case 'tesseract_local':
        provider = new TesseractVisionProvider();
        break;
      case 'gemini':
      case 'gemini_vision':
      case 'gemini_vision_free':
      default:
        provider = new GeminiVisionProvider();
        break;
    }

    this.instances.set(cacheKey, provider);
    return provider;
  }

  async getProvidersStatus() {
    const llm = this.getLLMProvider();
    const stt = this.getSTTProvider();
    const tts = this.getTTSProvider();
    const retrieval = this.getRetrievalProvider();
    const vision = this.getVisionProvider();

    const [llmHealth, sttHealth, ttsHealth, retHealth, visHealth] = await Promise.all([
      llm.healthCheck().catch(e => ({ healthy: false, error: e.message })),
      stt.healthCheck().catch(e => ({ healthy: false, error: e.message })),
      tts.healthCheck().catch(e => ({ healthy: false, error: e.message })),
      retrieval.healthCheck().catch(e => ({ healthy: false, error: e.message })),
      vision.healthCheck().catch(e => ({ healthy: false, error: e.message }))
    ]);

    return {
      status: 'ok',
      configuredProviders: {
        llm: { name: llm.name, model: llm.model, health: llmHealth },
        stt: { name: stt.name, health: sttHealth },
        tts: { name: tts.name, health: ttsHealth },
        retrieval: { name: retrieval.name, health: retHealth },
        vision: { name: vision.name, health: visHealth }
      }
    };
  }

  clearCache() {
    this.instances.clear();
  }
}

export const providerManager = new ProviderManager();
export const getLLMProvider = (name) => providerManager.getLLMProvider(name);
export const getSTTProvider = (name) => providerManager.getSTTProvider(name);
export const getTTSProvider = (name) => providerManager.getTTSProvider(name);
export const getRetrievalProvider = (name) => providerManager.getRetrievalProvider(name);
export const getVisionProvider = (name) => providerManager.getVisionProvider(name);
