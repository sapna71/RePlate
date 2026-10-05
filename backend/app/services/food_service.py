import uuid

from sqlalchemy.orm import Session

from app.models.food_listing import FoodListing
from app.repositories import food_repository
from app.schemas.food import FoodListingCreate


def create_food_listing(
    db: Session,
    food_data: FoodListingCreate,
    donor_id: uuid.UUID,
) -> FoodListing:
    food_listing = FoodListing(
        **food_data.model_dump(),
        donor_id=donor_id,
    )

    return food_repository.create(db, food_listing)


def get_food_listings(db: Session) -> list[FoodListing]:
    return food_repository.list_all(db)