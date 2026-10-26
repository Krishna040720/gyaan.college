import enum
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Integer,
    Text,
    DateTime,
    ForeignKey,
    Enum as SQLEnum,
    JSON
)
from sqlalchemy.orm import relationship
from backend.app.core.database import Base


def get_utc_now():
    return datetime.now(timezone.utc)


class QuestionType(str, enum.Enum):
    MCQ = "mcq"
    NUMERICAL = "numerical"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    ASSERTION_REASON = "assertion_reason"
    CASE_BASED = "case_based"


class QuestionDifficulty(str, enum.Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class BloomLevel(str, enum.Enum):
    REMEMBER = "remember"
    UNDERSTAND = "understand"
    APPLY = "apply"
    ANALYZE = "analyze"
    EVALUATE = "evaluate"
    CREATE = "create"


class QuestionStatus(str, enum.Enum):
    DRAFT = "draft"
    REVIEWED = "reviewed"
    PUBLISHED = "published"


class Question(Base):
    __tablename__ = "questions"

    id = Column(String(100), primary_key=True)
    board_id = Column(String(50), ForeignKey("boards.id", ondelete="CASCADE"), nullable=False)
    class_id = Column(Integer, ForeignKey("academic_classes.id", ondelete="CASCADE"), nullable=False)
    subject_id = Column(String(100), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False)
    chapter_id = Column(String(120), ForeignKey("chapters.id", ondelete="CASCADE"), nullable=False)
    topic_id = Column(String(150), ForeignKey("topics.id", ondelete="CASCADE"), nullable=False)
    concept_id = Column(String(180), ForeignKey("concepts.id", ondelete="SET NULL"), nullable=True)

    question_type = Column(SQLEnum(QuestionType), nullable=False, default=QuestionType.MCQ)
    difficulty = Column(SQLEnum(QuestionDifficulty), nullable=False, default=QuestionDifficulty.MEDIUM)
    bloom_level = Column(SQLEnum(BloomLevel), nullable=False, default=BloomLevel.UNDERSTAND)
    status = Column(SQLEnum(QuestionStatus), nullable=False, default=QuestionStatus.DRAFT)

    question_text = Column(Text, nullable=False)
    question_latex = Column(Text, nullable=True)
    options = Column(JSON, nullable=True)  # List of options: [{"key": "A", "text": "...", "is_correct": bool}]
    correct_answer = Column(Text, nullable=False)
    explanation = Column(Text, nullable=False)

    # Multi-step Verification Workflow
    generated_by = Column(String(100), default="ai_generator_v1", nullable=False)
    verified_by = Column(String(100), nullable=True)
    verification_notes = Column(Text, nullable=True)
    verified_at = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=get_utc_now, nullable=False)

    concept = relationship("Concept", back_populates="questions")


class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"

    id = Column(String(100), primary_key=True)
    user_id = Column(String(100), nullable=False, index=True)
    board_id = Column(String(50), nullable=False)
    class_id = Column(Integer, nullable=False)
    subject_id = Column(String(100), nullable=False)
    chapter_id = Column(String(120), nullable=True)

    total_questions = Column(Integer, default=0, nullable=False)
    correct_answers = Column(Integer, default=0, nullable=False)
    score_percentage = Column(Integer, default=0, nullable=False)
    weak_topics = Column(JSON, nullable=True)
    completed_at = Column(DateTime, default=get_utc_now, nullable=False)
