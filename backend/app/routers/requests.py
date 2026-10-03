from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.request import FoodRequestSchema, FoodRequestResponse
from app.services import request_service

router = APIRouter()


@router.post("/", response_model=FoodRequestResponse)
def create_food_request(
    food_request: FoodRequestSchema,
    db: Session = Depends(get_db)
):
    return request_service.create_food_request(
        db,
        food_request
    )


@router.get("/", response_model=List[FoodRequestResponse])
def get_food_requests(
    db: Session = Depends(get_db)
):
    return request_service.get_food_requests(db)