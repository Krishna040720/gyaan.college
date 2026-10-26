from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Integer,
    Boolean,
    Text,
    DateTime,
    ForeignKey,
    UniqueConstraint
)
from sqlalchemy.orm import relationship
from backend.app.core.database import Base, VectorType


def get_utc_now():
    return datetime.now(timezone.utc)


class Board(Base):
    __tablename__ = "boards"

    id = Column(String(50), primary_key=True)  # e.g., 'cbse', 'icse', 'up_board'
    code = Column(String(50), nullable=False, unique=True)
    name = Column(String(200), nullable=False)
    state = Column(String(100), nullable=True)  # 'All India' or state name
    description = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=get_utc_now, nullable=False)

    subjects = relationship("Subject", back_populates="board", cascade="all, delete-orphan")


class AcademicClass(Base):
    __tablename__ = "academic_classes"

    id = Column(Integer, primary_key=True)  # 1 to 12
    code = Column(String(20), nullable=False, unique=True)  # e.g., 'class_1'
    grade_level = Column(Integer, nullable=False, unique=True)
    display_name = Column(String(50), nullable=False)  # e.g., 'Class 10'
    created_at = Column(DateTime, default=get_utc_now, nullable=False)

    subjects = relationship("Subject", back_populates="academic_class", cascade="all, delete-orphan")


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(String(100), primary_key=True)  # e.g. 'cbse-10-maths'
    board_id = Column(String(50), ForeignKey("boards.id", ondelete="CASCADE"), nullable=False)
    class_id = Column(Integer, ForeignKey("academic_classes.id", ondelete="CASCADE"), nullable=False)
    code = Column(String(50), nullable=False)  # 'maths', 'science', 'english'
    name = Column(String(100), nullable=False)
    display_order = Column(Integer, default=1, nullable=False)
    icon = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=get_utc_now, nullable=False)

    __table_args__ = (
        UniqueConstraint("board_id", "class_id", "code", name="uq_board_class_subject"),
    )

    board = relationship("Board", back_populates="subjects")
    academic_class = relationship("AcademicClass", back_populates="subjects")
    chapters = relationship("Chapter", back_populates="subject", cascade="all, delete-orphan", order_by="Chapter.chapter_number")


class Chapter(Base):
    __tablename__ = "chapters"

    id = Column(String(120), primary_key=True)  # e.g. 'cbse-10-maths-ch01'
    subject_id = Column(String(100), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False)
    chapter_number = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    title_hi = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    syllabus_source = Column(String(255), nullable=False, default="NCERT Rationalised 2026-27")
    is_placeholder = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=get_utc_now, nullable=False)

    __table_args__ = (
        UniqueConstraint("subject_id", "chapter_number", name="uq_subject_chapter_number"),
    )

    subject = relationship("Subject", back_populates="chapters")
    topics = relationship("Topic", back_populates="chapter", cascade="all, delete-orphan", order_by="Topic.topic_number")


class Topic(Base):
    __tablename__ = "topics"

    id = Column(String(150), primary_key=True)  # e.g. 'cbse-10-maths-ch01-t01'
    chapter_id = Column(String(120), ForeignKey("chapters.id", ondelete="CASCADE"), nullable=False)
    topic_number = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    title_hi = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    importance_level = Column(String(50), default="high_yield", nullable=False)  # foundational, high_yield, advanced
    created_at = Column(DateTime, default=get_utc_now, nullable=False)

    __table_args__ = (
        UniqueConstraint("chapter_id", "topic_number", name="uq_chapter_topic_number"),
    )

    chapter = relationship("Chapter", back_populates="topics")
    concepts = relationship("Concept", back_populates="topic", cascade="all, delete-orphan")


class Concept(Base):
    __tablename__ = "concepts"

    id = Column(String(180), primary_key=True)  # e.g. 'cbse-10-maths-ch01-t01-c01'
    topic_id = Column(String(150), ForeignKey("topics.id", ondelete="CASCADE"), nullable=False)
    concept_key = Column(String(100), nullable=False)
    title = Column(String(255), nullable=False)
    explanation = Column(Text, nullable=False)
    formula_latex = Column(Text, nullable=True)
    rag_chunk = Column(Text, nullable=True)
    embedding = Column(VectorType(1536), nullable=True)
    created_at = Column(DateTime, default=get_utc_now, nullable=False)

    topic = relationship("Topic", back_populates="concepts")
    questions = relationship("Question", back_populates="concept")
