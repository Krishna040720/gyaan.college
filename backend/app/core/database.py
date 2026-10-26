import json
from typing import Any, List
from sqlalchemy import create_engine, TypeDecorator, Text
from sqlalchemy.orm import declarative_base, sessionmaker
from backend.app.core.config import settings

# Database Engine setup
# Handles both SQLite (requires check_same_thread=False) and PostgreSQL
connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Dual-compatible Vector representation (PostgreSQL pgvector / SQLite JSON fallback)
class VectorType(TypeDecorator):
    """
    SQLAlchemy TypeDecorator that maps to pgvector.sqlalchemy.Vector when on PostgreSQL,
    and falls back to JSON-serialized floats on SQLite for zero-dependency local test suites.
    """
    impl = Text
    cache_ok = True

    def __init__(self, dimensions: int = 1536, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.dimensions = dimensions

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            try:
                from pgvector.sqlalchemy import Vector
                return dialect.type_descriptor(Vector(self.dimensions))
            except ImportError:
                return dialect.type_descriptor(Text())
        return dialect.type_descriptor(Text())

    def process_bind_param(self, value: Any, dialect):
        if value is None:
            return None
        if isinstance(value, (list, tuple)):
            if dialect.name == "postgresql":
                return value
            return json.dumps(list(value))
        return value

    def process_result_value(self, value: Any, dialect):
        if value is None:
            return None
        if isinstance(value, str):
            try:
                return json.loads(value)
            except Exception:
                return value
        return value


def get_db():
    """Dependency that provides a database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
