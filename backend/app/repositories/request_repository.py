from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.food_request import FoodRequest


def get_by_id(db: Session, request_id: int) -> FoodRequest | None:
    return db.get(FoodRequest, request_id)


def create(db: Session, food_request: FoodRequest) -> FoodRequest:
    db.add(food_request)
    db.commit()
    db.refresh(food_request)
    return food_request


def list_all(db: Session) -> list[FoodRequest]:
    return list(db.execute(select(FoodRequest)).scalars().all())


def update_status(db: Session, food_request: FoodRequest, status: str) -> FoodRequest:
    food_request.status = status
    db.commit()
    db.refresh(food_request)
    return food_request