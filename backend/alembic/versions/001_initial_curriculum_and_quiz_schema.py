"""initial_curriculum_and_quiz_schema

Revision ID: 001_initial_curriculum_and_quiz_schema
Revises: 
Create Date: 2026-10-18 12:45:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from backend.app.core.database import VectorType

# revision identifiers, used by Alembic.
revision: str = '001_initial_curriculum_and_quiz_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Boards
    op.create_table(
        'boards',
        sa.Column('id', sa.String(length=50), nullable=False),
        sa.Column('code', sa.String(length=50), nullable=False),
        sa.Column('name', sa.String(length=200), nullable=False),
        sa.Column('state', sa.String(length=100), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default=sa.text('1')),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('code')
    )

    # 2. Academic Classes
    op.create_table(
        'academic_classes',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('code', sa.String(length=20), nullable=False),
        sa.Column('grade_level', sa.Integer(), nullable=False),
        sa.Column('display_name', sa.String(length=50), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('code'),
        sa.UniqueConstraint('grade_level')
    )

    # 3. Subjects
    op.create_table(
        'subjects',
        sa.Column('id', sa.String(length=100), nullable=False),
        sa.Column('board_id', sa.String(length=50), nullable=False),
        sa.Column('class_id', sa.Integer(), nullable=False),
        sa.Column('code', sa.String(length=50), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('display_order', sa.Integer(), nullable=False, server_default=sa.text('1')),
        sa.Column('icon', sa.String(length=50), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['board_id'], ['boards.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['class_id'], ['academic_classes.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('board_id', 'class_id', 'code', name='uq_board_class_subject')
    )

    # 4. Chapters
    op.create_table(
        'chapters',
        sa.Column('id', sa.String(length=120), nullable=False),
        sa.Column('subject_id', sa.String(length=100), nullable=False),
        sa.Column('chapter_number', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('title_hi', sa.String(length=255), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('syllabus_source', sa.String(length=255), nullable=False),
        sa.Column('is_placeholder', sa.Boolean(), nullable=False, server_default=sa.text('0')),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['subject_id'], ['subjects.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('subject_id', 'chapter_number', name='uq_subject_chapter_number')
    )

    # 5. Topics
    op.create_table(
        'topics',
        sa.Column('id', sa.String(length=150), nullable=False),
        sa.Column('chapter_id', sa.String(length=120), nullable=False),
        sa.Column('topic_number', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('title_hi', sa.String(length=255), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('importance_level', sa.String(length=50), nullable=False, server_default='high_yield'),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['chapter_id'], ['chapters.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('chapter_id', 'topic_number', name='uq_chapter_topic_number')
    )

    # 6. Concepts
    op.create_table(
        'concepts',
        sa.Column('id', sa.String(length=180), nullable=False),
        sa.Column('topic_id', sa.String(length=150), nullable=False),
        sa.Column('concept_key', sa.String(length=100), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('explanation', sa.Text(), nullable=False),
        sa.Column('formula_latex', sa.Text(), nullable=True),
        sa.Column('rag_chunk', sa.Text(), nullable=True),
        sa.Column('embedding', VectorType(1536), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['topic_id'], ['topics.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )

    # 7. Questions
    op.create_table(
        'questions',
        sa.Column('id', sa.String(length=100), nullable=False),
        sa.Column('board_id', sa.String(length=50), nullable=False),
        sa.Column('class_id', sa.Integer(), nullable=False),
        sa.Column('subject_id', sa.String(length=100), nullable=False),
        sa.Column('chapter_id', sa.String(length=120), nullable=False),
        sa.Column('topic_id', sa.String(length=150), nullable=False),
        sa.Column('concept_id', sa.String(length=180), nullable=True),
        sa.Column('question_type', sa.String(length=50), nullable=False),
        sa.Column('difficulty', sa.String(length=50), nullable=False),
        sa.Column('bloom_level', sa.String(length=50), nullable=False),
        sa.Column('status', sa.String(length=50), nullable=False),
        sa.Column('question_text', sa.Text(), nullable=False),
        sa.Column('question_latex', sa.Text(), nullable=True),
        sa.Column('options', sa.JSON(), nullable=True),
        sa.Column('correct_answer', sa.Text(), nullable=False),
        sa.Column('explanation', sa.Text(), nullable=False),
        sa.Column('generated_by', sa.String(length=100), nullable=False),
        sa.Column('verified_by', sa.String(length=100), nullable=True),
        sa.Column('verification_notes', sa.Text(), nullable=True),
        sa.Column('verified_at', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['board_id'], ['boards.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['class_id'], ['academic_classes.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['subject_id'], ['subjects.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['chapter_id'], ['chapters.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['topic_id'], ['topics.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['concept_id'], ['concepts.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )

    # 8. Quiz Attempts
    op.create_table(
        'quiz_attempts',
        sa.Column('id', sa.String(length=100), nullable=False),
        sa.Column('user_id', sa.String(length=100), nullable=False),
        sa.Column('board_id', sa.String(length=50), nullable=False),
        sa.Column('class_id', sa.Integer(), nullable=False),
        sa.Column('subject_id', sa.String(length=100), nullable=False),
        sa.Column('chapter_id', sa.String(length=120), nullable=True),
        sa.Column('total_questions', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('correct_answers', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('score_percentage', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('weak_topics', sa.JSON(), nullable=True),
        sa.Column('completed_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # 9. Users (DPDP Act 2023 Compliant)
    op.create_table(
        'users',
        sa.Column('id', sa.String(length=100), nullable=False),
        sa.Column('username', sa.String(length=100), nullable=False),
        sa.Column('enrolled_board_id', sa.String(length=50), nullable=False),
        sa.Column('enrolled_class_id', sa.Integer(), nullable=False),
        sa.Column('preferred_language', sa.String(length=10), nullable=False, server_default='en'),
        sa.Column('age', sa.Integer(), nullable=False),
        sa.Column('is_minor', sa.Boolean(), nullable=False, server_default=sa.text('1')),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['enrolled_board_id'], ['boards.id']),
        sa.ForeignKeyConstraint(['enrolled_class_id'], ['academic_classes.id']),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('username')
    )

    # 10. Parental Consents
    op.create_table(
        'parental_consents',
        sa.Column('id', sa.String(length=100), nullable=False),
        sa.Column('user_id', sa.String(length=100), nullable=False),
        sa.Column('parent_name', sa.String(length=150), nullable=False),
        sa.Column('parent_email', sa.String(length=255), nullable=False),
        sa.Column('parent_phone', sa.String(length=20), nullable=True),
        sa.Column('consent_method', sa.String(length=50), nullable=False, server_default='otp_verified'),
        sa.Column('is_consent_granted', sa.Boolean(), nullable=False, server_default=sa.text('0')),
        sa.Column('consent_timestamp', sa.DateTime(), nullable=True),
        sa.Column('ip_address', sa.String(length=50), nullable=True),
        sa.Column('audit_notes', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id')
    )


def downgrade() -> None:
    op.drop_table('parental_consents')
    op.drop_table('users')
    op.drop_table('quiz_attempts')
    op.drop_table('questions')
    op.drop_table('concepts')
    op.drop_table('topics')
    op.drop_table('chapters')
    op.drop_table('subjects')
    op.drop_table('academic_classes')
    op.drop_table('boards')
