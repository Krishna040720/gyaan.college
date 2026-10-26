from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from backend.app.core.config import settings
from backend.app.core.database import get_db, engine, Base
import backend.app.models  # noqa: F401 - Register models with Base.metadata
from backend.app.api import voice

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    description="Cross-platform educational app backend with AI voice-based concept learning and practice quiz engine."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    """Ensure all tables, including voice_query_logs, are created upon startup."""
    Base.metadata.create_all(bind=engine)

app.include_router(voice.router)


@app.get("/api/health", tags=["System"])
def health_check(db: Session = Depends(get_db)):
    """Health check validating application lifecycle and database connectivity."""
    db_status = "healthy"
    try:
        db.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    return {
        "status": "online",
        "app_name": settings.APP_NAME,
        "environment": settings.APP_ENV,
        "database": db_status
    }


@app.get("/", tags=["System"])
def root():
    return {
        "message": "Welcome to GYAAN.AI Backend API",
        "docs_url": "/docs",
        "health_check": "/api/health"
    }
