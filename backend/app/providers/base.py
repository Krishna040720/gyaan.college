"""
Base abstract classes for swappable AI providers in GYAAN.AI backend.
All implementations are free of vendor lock-in and can be swapped via .env.
"""
from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional


class BaseLLMProvider(ABC):
    def __init__(self, name: str, model: str):
        self.name = name
        self.model = model

    @abstractmethod
    def generate_text(self, prompt: str, system_prompt: Optional[str] = None, temperature: float = 0.7) -> str:
        pass

    @abstractmethod
    def generate_json(self, prompt: str, system_prompt: Optional[str] = None, temperature: float = 0.3) -> Dict[str, Any]:
        pass

    @abstractmethod
    def health_check(self) -> Dict[str, Any]:
        pass


class BaseSTTProvider(ABC):
    def __init__(self, name: str):
        self.name = name

    @abstractmethod
    def transcribe(self, audio_data: Any, language: str = "en-IN", vocabulary_hints: Optional[List[str]] = None) -> Dict[str, Any]:
        pass

    @abstractmethod
    def health_check(self) -> Dict[str, Any]:
        pass


class BaseTTSProvider(ABC):
    def __init__(self, name: str):
        self.name = name

    @abstractmethod
    def synthesize(self, text: str, language: str = "en-IN", voice: Optional[str] = None) -> Dict[str, Any]:
        pass

    @abstractmethod
    def health_check(self) -> Dict[str, Any]:
        pass


class BaseRetrievalProvider(ABC):
    def __init__(self, name: str):
        self.name = name

    @abstractmethod
    def search_similar(
        self,
        query: str,
        top_k: int = 5,
        board_id: str = "cbse",
        class_level: int = 10,
        subject_id: str = "science",
        current_chapter_id: Optional[str] = None,
        force_current_chapter: bool = False
    ) -> List[Dict[str, Any]]:
        pass
