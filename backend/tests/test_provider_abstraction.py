"""
Test suite for backend/app/providers
Verifies swappable LLM, STT, TTS, and Retrieval providers in Python.
"""
import pytest
from backend.app.providers import (
    get_llm_provider,
    get_stt_provider,
    get_tts_provider,
    get_retrieval_provider,
    GeminiFreeProvider,
    OllamaLocalProvider,
    WebSpeechProvider,
    WhisperLocalProvider,
    BrowserTTSProvider,
    PiperLocalTTSProvider,
    SQLiteRetrievalProvider,
    PgVectorRetrievalProvider
)


def test_swappable_llm_provider():
    gemini = get_llm_provider("gemini_free")
    assert isinstance(gemini, GeminiFreeProvider)
    assert gemini.name == "gemini_free"

    ollama = get_llm_provider("ollama_local")
    assert isinstance(ollama, OllamaLocalProvider)
    assert ollama.name == "ollama_local"
    assert "localhost" in ollama.base_url or "http" in ollama.base_url


def test_swappable_stt_provider():
    web = get_stt_provider("web_speech")
    assert isinstance(web, WebSpeechProvider)
    res = web.transcribe("flow of charge")
    assert res["transcript"] == "flow of charge"
    assert res["client_delegated"] is True

    whisper = get_stt_provider("whisper_local")
    assert isinstance(whisper, WhisperLocalProvider)
    assert whisper.name == "whisper_local"


def test_swappable_tts_provider():
    browser = get_tts_provider("browser_speech")
    assert isinstance(browser, BrowserTTSProvider)
    res = browser.synthesize("Well done!")
    assert res["text"] == "Well done!"
    assert res["client_delegated"] is True

    piper = get_tts_provider("piper_local")
    assert isinstance(piper, PiperLocalTTSProvider)
    assert piper.name == "piper_local"


def test_swappable_retrieval_provider():
    sqlite_ret = get_retrieval_provider("sqlite_local")
    assert isinstance(sqlite_ret, SQLiteRetrievalProvider)

    # Search for electricity query
    results = sqlite_ret.search_similar(query="electricity and electric current", top_k=3)
    assert len(results) > 0
    assert "Electricity" in results[0]["chapter_title"]

    pg = get_retrieval_provider("pgvector")
    assert isinstance(pg, PgVectorRetrievalProvider)
