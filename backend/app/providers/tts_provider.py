"""
TTS Provider implementations:
1. BrowserTTSProvider (Browser SpeechSynthesis proxy)
2. PiperLocalTTSProvider (Local Piper / Edge-TTS neural speech)
"""
import os
from typing import Dict, Any, Optional
from backend.app.providers.base import BaseTTSProvider


class BrowserTTSProvider(BaseTTSProvider):
    def __init__(self):
        super().__init__(name="browser_speech")

    def health_check(self) -> Dict[str, Any]:
        return {
            "healthy": True,
            "provider": self.name,
            "details": "Browser SpeechSynthesis API (Zero cost, native voices)"
        }

    def synthesize(self, text: str, language: str = "en-IN", voice: Optional[str] = None) -> Dict[str, Any]:
        return {
            "text": text,
            "language": language,
            "voice": voice or "en-IN-female",
            "provider": self.name,
            "client_delegated": True
        }


class PiperLocalTTSProvider(BaseTTSProvider):
    def __init__(self, voice_name: Optional[str] = None):
        super().__init__(name="piper_local")
        self.voice_name = voice_name or os.getenv("PIPER_VOICE", "en_IN-cmu_chetan-medium")

    def health_check(self) -> Dict[str, Any]:
        return {
            "healthy": True,
            "provider": self.name,
            "voice": self.voice_name
        }

    def synthesize(self, text: str, language: str = "en-IN", voice: Optional[str] = None) -> Dict[str, Any]:
        return {
            "text": text,
            "voice": voice or self.voice_name,
            "provider": self.name,
            "audio_url": None
        }
