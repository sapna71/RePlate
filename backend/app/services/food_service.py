from sqlalchemy.orm import Session

from app.models.food_listing import FoodListing
from app.schemas.food import FoodListingSchema
from app.repositories import food_repositories


def create_food_listing(
    db: Session,
    food_data: FoodListingSchema
):
    existing_listing = food_repositories.get_food_listing_by_id(
        db,
        food_data.id
    )

    if existing_listing:
        raise ValueError(
            "Food listing with this ID already exists"
        )

    food_listing = FoodListing(
        **food_data.model_dump()
    )

    return food_repositories.create_food_listing(
        db,
        food_listing
    )


def get_food_listings(db: Session):
    return food_repositories.get_food_listings(db)