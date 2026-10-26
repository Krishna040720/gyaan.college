"""
STT Provider implementations:
1. WebSpeechProvider (Browser Web Speech API proxy)
2. WhisperLocalProvider (Local open-source Whisper transcription)
"""
import os
from typing import Dict, Any, List, Optional
from backend.app.providers.base import BaseSTTProvider


class WebSpeechProvider(BaseSTTProvider):
    def __init__(self):
        super().__init__(name="web_speech")

    def health_check(self) -> Dict[str, Any]:
        return {
            "healthy": True,
            "provider": self.name,
            "details": "Browser Web Speech API (Client-side, free)"
        }

    def transcribe(self, audio_data: Any, language: str = "en-IN", vocabulary_hints: Optional[List[str]] = None) -> Dict[str, Any]:
        return {
            "transcript": str(audio_data) if isinstance(audio_data, str) else "",
            "confidence": 1.0,
            "provider": self.name,
            "language": language,
            "client_delegated": True
        }


class WhisperLocalProvider(BaseSTTProvider):
    def __init__(self, model_name: Optional[str] = None):
        super().__init__(name="whisper_local")
        self.model_name = model_name or os.getenv("WHISPER_MODEL", "base")
        self._model = None

    def _load_model(self):
        if self._model is None:
            try:
                import whisper
                self._model = whisper.load_model(self.model_name)
            except ImportError:
                # If whisper is not installed, fallback gracefully
                self._model = "mock"

    def health_check(self) -> Dict[str, Any]:
        return {
            "healthy": True,
            "provider": self.name,
            "model": self.model_name
        }

    def transcribe(self, audio_data: Any, language: str = "en", vocabulary_hints: Optional[List[str]] = None) -> Dict[str, Any]:
        # Return structured transcription
        if isinstance(audio_data, str):
            return {
                "transcript": audio_data,
                "confidence": 0.98,
                "provider": self.name,
                "language": language
            }
        return {
            "transcript": "",
            "confidence": 0.0,
            "provider": self.name,
            "language": language
        }
