import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class FoodRequest(Base):
    __tablename__ = "food_requests"

    request_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    food_listing_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("food_listings.id"), nullable=False, index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)

    queue_number: Mapped[int] = mapped_column(Integer, nullable=False)
    wait_time_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="Pending Confirmation")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False
    )