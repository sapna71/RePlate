from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.food import FoodListingCreate, FoodListingResponse
from app.services import food_service

router = APIRouter()


@router.post("/", response_model=FoodListingResponse, status_code=201)
def create_food_listing(
    food_listing: FoodListingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return food_service.create_food_listing(db, food_listing, donor_id=current_user.id)


@router.get("/", response_model=List[FoodListingResponse])
def get_food_listings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return food_service.get_food_listings(db)