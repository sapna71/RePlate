from pydantic import BaseModel

class FoodRequestSchema(BaseModel):
    food_listing_id: str
    user_id: str | None = None

class FoodRequestResponse(BaseModel):
    request_id: int
    food_listing_id: str
    user_id: str
    queue_number: int
    wait_time_minutes: int
    status: str

    class Config:
        from_attributes = True