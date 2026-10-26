// GYAAN AI Phase 1 Provider Abstraction Test Suite
// Verifies:
// 1. Swappable LLM providers (Gemini Free Tier vs Ollama Local)
// 2. Swappable STT providers (Web Speech vs Whisper Local)
// 3. Swappable TTS providers (Browser SpeechSynthesis vs Piper Local)
// 4. Swappable Retrieval providers (SQLite BM25/Cosine vs pgvector)
// 5. Swappable Vision/OCR providers (Gemini Vision vs Tesseract Local)
// 6. Provider status and diagnostic health check endpoint

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  providerManager,
  getLLMProvider,
  getSTTProvider,
  getTTSProvider,
  getRetrievalProvider,
  getVisionProvider
} from '../server/providers/index.js';
import { GeminiFreeProvider } from '../server/providers/llm/geminiFreeProvider.js';
import { OllamaProvider } from '../server/providers/llm/ollamaProvider.js';
import { WebSpeechSTTProvider } from '../server/providers/stt/webSpeechSTTProvider.js';
import { WhisperLocalSTTProvider } from '../server/providers/stt/whisperLocalSTTProvider.js';
import { BrowserTTSProvider } from '../server/providers/tts/browserTTSProvider.js';
import { PiperLocalTTSProvider } from '../server/providers/tts/piperLocalTTSProvider.js';
import { SQLiteRetrievalProvider } from '../server/providers/retrieval/sqliteRetrievalProvider.js';
import { PgVectorRetrievalProvider } from '../server/providers/retrieval/pgvectorRetrievalProvider.js';
import { GeminiVisionProvider } from '../server/providers/vision/geminiVisionProvider.js';
import { TesseractVisionProvider } from '../server/providers/vision/tesseractVisionProvider.js';

describe('Phase 1: Free Stack AI Provider Abstraction Suite', () => {

  it('1. Swappable LLM: Instantiates GeminiFreeProvider and OllamaProvider via config', () => {
    const gemini = getLLMProvider('gemini_free');
    assert.ok(gemini instanceof GeminiFreeProvider);
    assert.equal(gemini.name, 'gemini_free');
    assert.ok(typeof gemini.generateStructuredJson === 'function');
    assert.ok(typeof gemini.generateText === 'function');

    const ollama = getLLMProvider('ollama_local');
    assert.ok(ollama instanceof OllamaProvider);
    assert.equal(ollama.name, 'ollama_local');
    assert.ok(ollama.baseUrl.includes('localhost') || ollama.baseUrl.includes('http'));
    assert.ok(typeof ollama.generateStructuredJson === 'function');
  });

  it('2. LLM Provider cleanly handles missing API key without fabrication', async () => {
    const testGemini = new GeminiFreeProvider({ apiKey: '' });
    await assert.rejects(
      async () => {
        await testGemini.generateStructuredJson({ prompt: 'test' });
      },
      (err) => {
        assert.equal(err.status, 503);
        assert.equal(err.code, 'CONFIG_MISSING');
        return true;
      }
    );
  });

  it('3. Swappable STT: Instantiates WebSpeech and Whisper providers with standard transcribe contract', async () => {
    const webSpeech = getSTTProvider('web_speech');
    assert.ok(webSpeech instanceof WebSpeechSTTProvider);
    assert.equal(webSpeech.name, 'web_speech');

    const webRes = await webSpeech.transcribe({ audio: 'Electric current flows in conductor' });
    assert.equal(webRes.transcript, 'Electric current flows in conductor');
    assert.equal(webRes.delegatedToClient, true);

    const whisper = getSTTProvider('whisper_local');
    assert.ok(whisper instanceof WhisperLocalSTTProvider);
    assert.equal(whisper.name, 'whisper_local');
    assert.ok(whisper.endpoint.includes('transcribe'));
  });

  it('4. Swappable TTS: Instantiates BrowserSpeech and Piper providers with standard synthesize contract', async () => {
    const browserTTS = getTTSProvider('browser_speech');
    assert.ok(browserTTS instanceof BrowserTTSProvider);
    assert.equal(browserTTS.name, 'browser_speech');

    const ttsRes = await browserTTS.synthesize({ text: 'Shabash!' });
    assert.equal(ttsRes.text, 'Shabash!');
    assert.equal(ttsRes.delegatedToClient, true);

    const piper = getTTSProvider('piper_local');
    assert.ok(piper instanceof PiperLocalTTSProvider);
    assert.equal(piper.name, 'piper_local');
  });

  it('5. Swappable Retrieval: SQLite hybrid retrieval ranks curriculum chunks without cloud API', async () => {
    const sqliteRet = getRetrievalProvider('sqlite_local');
    assert.ok(sqliteRet instanceof SQLiteRetrievalProvider);
    assert.equal(sqliteRet.name, 'sqlite_local');

    // Seed mock chunks
    sqliteRet.setChunks([
      {
        id: 'c1',
        topic_title: 'Electric Current & Circuits',
        keywords: ['electricity', 'current', 'charge', 'coulomb', 'ampere'],
        content: 'Electric current is the flow of electric charge per unit time (I = Q/t).'
      },
      {
        id: 'c2',
        topic_title: 'Chemical Reactions & Equations',
        keywords: ['chemical', 'reaction', 'equation', 'reactants', 'products'],
        content: 'A chemical reaction transforms reactants into products following conservation of mass.'
      }
    ]);

    const results = await sqliteRet.searchSimilar({ query: 'how does electric current flow?' });
    assert.ok(results.length > 0);
    assert.equal(results[0].chunk.id, 'c1', 'Top result must be electricity chunk');
    assert.ok(results[0].score > 0);

    const pgvector = getRetrievalProvider('pgvector');
    assert.ok(pgvector instanceof PgVectorRetrievalProvider);
  });

  it('6. Swappable Vision/OCR: Instantiates GeminiVision and Tesseract providers', () => {
    const geminiVis = getVisionProvider('gemini_vision_free');
    assert.ok(geminiVis instanceof GeminiVisionProvider);
    assert.equal(geminiVis.name, 'gemini_vision_free');

    const tesseract = getVisionProvider('tesseract_local');
    assert.ok(tesseract instanceof TesseractVisionProvider);
    assert.equal(tesseract.name, 'tesseract_local');
  });

  it('7. Provider Manager reports unified health and config status across all providers', async () => {
    const status = await providerManager.getProvidersStatus();
    assert.equal(status.status, 'ok');
    assert.ok(status.configuredProviders.llm);
    assert.ok(status.configuredProviders.stt);
    assert.ok(status.configuredProviders.tts);
    assert.ok(status.configuredProviders.retrieval);
    assert.ok(status.configuredProviders.vision);
  });

});
