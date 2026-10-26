"""
Master Provider Registry for GYAAN.AI Backend
Reads environment configuration and resolves the requested free provider.
"""
import os
from backend.app.providers.llm_provider import GeminiFreeProvider, OllamaLocalProvider
from backend.app.providers.stt_provider import WebSpeechProvider, WhisperLocalProvider
from backend.app.providers.tts_provider import BrowserTTSProvider, PiperLocalTTSProvider
from backend.app.providers.retrieval_provider import SQLiteRetrievalProvider, PgVectorRetrievalProvider


def get_llm_provider(override_name: str = None):
    provider_name = (override_name or os.getenv("LLM_PROVIDER", "gemini_free")).lower().strip()
    if provider_name in ["ollama", "ollama_local"]:
        return OllamaLocalProvider()
    return GeminiFreeProvider()


def get_stt_provider(override_name: str = None):
    provider_name = (override_name or os.getenv("STT_PROVIDER", "web_speech")).lower().strip()
    if provider_name in ["whisper", "whisper_local"]:
        return WhisperLocalProvider()
    return WebSpeechProvider()


def get_tts_provider(override_name: str = None):
    provider_name = (override_name or os.getenv("TTS_PROVIDER", "browser_speech")).lower().strip()
    if provider_name in ["piper", "piper_local", "edge_tts"]:
        return PiperLocalTTSProvider()
    return BrowserTTSProvider()


def get_retrieval_provider(override_name: str = None):
    provider_name = (override_name or os.getenv("RETRIEVAL_PROVIDER", "sqlite_local")).lower().strip()
    if provider_name in ["pgvector", "postgres"]:
        return PgVectorRetrievalProvider()
    return SQLiteRetrievalProvider()
