from sqlalchemy.orm import Session

from app.models.food_listing import FoodListing


def get_food_listing_by_id(db: Session, listing_id: str):
    return (
        db.query(FoodListing)
        .filter(FoodListing.id == listing_id)
        .first()
    )


def create_food_listing(db: Session, food_listing: FoodListing):
    db.add(food_listing)
    db.commit()
    db.refresh(food_listing)

    return food_listing


def get_food_listings(db: Session):
    return db.query(FoodListing).all()