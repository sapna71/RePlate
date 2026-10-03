from fastapi import APIRouter, Depends

from typing import List
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.food import FoodListingSchema, FoodListingResponse
from app.services import food_service


router =APIRouter()


@router.post("/", response_model=FoodListingResponse)
def create_food_listing(
    food_listing: FoodListingSchema,
    db: Session = Depends(get_db)
):
    return food_service.create_food_listing(
        db,
        food_listing
    )


@router.get("/", response_model=List[FoodListingResponse])
def get_food_listings(
    db: Session = Depends(get_db)
):
    return food_service.get_food_listings(db)