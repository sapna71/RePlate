from sqlalchemy import Column, String, Integer, ForeignKey
from app.core.database import Base


class FoodRequest(Base):
    __tablename__="food_requests"

    request_id=Column(Integer, primary_key=True, index=True, autoincrement=True)

    food_listing_id=Column(String, ForeignKey("food_listings.id"), nullable=False)

    user_id=Column(String, nullable=False)
    queue_number=Column(Integer, nullable=False)
    wait_time_minutes=Column(Integer, nullable=False)
    status=Column(String, nullable=False, default="Pending Confirmation")

