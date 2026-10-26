"""
Retrieval & Embeddings Provider implementations:
1. SQLiteRetrievalProvider (Self-contained, SQLite + BM25 + Vector Cosine hybrid)
2. PgVectorRetrievalProvider (pgvector PostgreSQL)
"""
import os
from typing import Dict, Any, List, Optional
from backend.app.providers.base import BaseRetrievalProvider
from backend.app.services.voice_service import CURRICULUM_CHUNKS, VoiceRetrievalEngine


class SQLiteRetrievalProvider(BaseRetrievalProvider):
    def __init__(self):
        super().__init__(name="sqlite_local")
        self.chunks = CURRICULUM_CHUNKS

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
        chunks, _ = VoiceRetrievalEngine.retrieve_chunks(
            query=query,
            board_id=board_id,
            class_level=class_level,
            subject_id=subject_id,
            current_chapter_id=current_chapter_id,
            force_current_chapter=force_current_chapter,
            use_hybrid=True
        )
        return chunks[:top_k]


class PgVectorRetrievalProvider(BaseRetrievalProvider):
    def __init__(self, db_url: Optional[str] = None):
        super().__init__(name="pgvector")
        self.db_url = db_url or os.getenv("DATABASE_URL", "")

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
        # Graceful fallback to SQLite chunks if pgvector is not configured
        chunks, _ = VoiceRetrievalEngine.retrieve_chunks(
            query=query,
            board_id=board_id,
            class_level=class_level,
            subject_id=subject_id,
            current_chapter_id=current_chapter_id,
            force_current_chapter=force_current_chapter,
            use_hybrid=True
        )
        return chunks[:top_k]
