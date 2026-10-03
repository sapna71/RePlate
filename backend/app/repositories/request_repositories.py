from sqlalchemy.orm import Session
from app.models.food_request import FoodRequest


def create_food_request(db: Session, food_request: FoodRequest):
    db.add(food_request)
    db.commit()
    db.refresh(food_request)
    return food_request


def get_food_request(db: Session):
    return db.query(FoodRequest).all()