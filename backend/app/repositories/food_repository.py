import uuid

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.food_listing import FoodListing


def get_by_id(db: Session, listing_id: uuid.UUID) -> FoodListing | None:
    return db.get(FoodListing, listing_id)


def create(db: Session, food_listing: FoodListing) -> FoodListing:
    db.add(food_listing)
    db.commit()
    db.refresh(food_listing)
    return food_listing


def list_all(db: Session) -> list[FoodListing]:
    return list(db.execute(select(FoodListing)).scalars().all())