import os
from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "GYAAN.AI Backend"
    APP_ENV: str = "development"
    DEBUG: bool = True
    PORT: int = 8000
    HOST: str = "0.0.0.0"

    # Database
    DATABASE_URL: str = "sqlite:///./gyaan_local.db"

    # AI & Speech Providers
    LLM_PROVIDER: str = "gemini"
    GEMINI_API_KEY: Optional[str] = None
    OPENAI_API_KEY: Optional[str] = None
    STT_PROVIDER: str = "whisper"
    TTS_PROVIDER: str = "edge_tts"
    ELEVENLABS_API_KEY: Optional[str] = None

    # Auth & Compliance
    JWT_SECRET: str = "gyaan_dev_secret_key_92837482910384759283749283"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    PARENTAL_CONSENT_REQUIRED_BELOW_AGE: int = 18

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
