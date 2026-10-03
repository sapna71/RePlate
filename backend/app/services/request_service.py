import random
from sqlalchemy.orm import Session


from app.models.food_request import FoodRequest
from app.schemas.request import FoodRequestSchema
from app.repositories import request_repositories



def create_food_request(
    db: Session,
    request_data: FoodRequest
):
    new_request = FoodRequest(
        food_listing_id=request_data.food_listing_id,
        user_id=request_data.user_id,
        queue_number=random.randint(1, 10),
        wait_time_minutes=random.randint(15, 75),
        status="Pending Confirmation"
    )

    return request_repositories.create_food_request(
        db,
        new_request
    )


def get_food_requests(db: Session):
    return request_repositories.get_food_requests(db)