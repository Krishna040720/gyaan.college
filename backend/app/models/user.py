from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Integer,
    Boolean,
    DateTime,
    ForeignKey,
    Text
)
from sqlalchemy.orm import relationship
from backend.app.core.database import Base


def get_utc_now():
    return datetime.now(timezone.utc)


class User(Base):
    """
    Student User Entity.
    Strictly follows India Digital Personal Data Protection (DPDP) Act 2023:
    - Verifiable Parental Consent for users under 18
    - Zero behavioral tracking / zero advertisements
    - Minimal data storage principle
    """
    __tablename__ = "users"

    id = Column(String(100), primary_key=True)
    username = Column(String(100), unique=True, nullable=False, index=True)
    enrolled_board_id = Column(String(50), ForeignKey("boards.id"), nullable=False)
    enrolled_class_id = Column(Integer, ForeignKey("academic_classes.id"), nullable=False)
    preferred_language = Column(String(10), default="en", nullable=False)  # 'en', 'hi', 'hinglish'
    age = Column(Integer, nullable=False)
    is_minor = Column(Boolean, default=True, nullable=False)

    created_at = Column(DateTime, default=get_utc_now, nullable=False)

    parental_consent = relationship("ParentalConsent", back_populates="user", uselist=False, cascade="all, delete-orphan")


class ParentalConsent(Base):
    """
    Verifiable Parental Consent audit trail compliant with DPDP Act 2023.
    """
    __tablename__ = "parental_consents"

    id = Column(String(100), primary_key=True)
    user_id = Column(String(100), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    parent_name = Column(String(150), nullable=False)
    parent_email = Column(String(255), nullable=False)
    parent_phone = Column(String(20), nullable=True)
    consent_method = Column(String(50), nullable=False, default="otp_verified")  # 'otp_verified', 'email_link'
    is_consent_granted = Column(Boolean, default=False, nullable=False)
    consent_timestamp = Column(DateTime, nullable=True)
    ip_address = Column(String(50), nullable=True)
    audit_notes = Column(Text, nullable=True)

    created_at = Column(DateTime, default=get_utc_now, nullable=False)

    user = relationship("User", back_populates="parental_consent")
