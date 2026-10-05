import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class FoodRequestCreate(BaseModel):
    food_listing_id: uuid.UUID


class FoodRequestResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    request_id: int
    food_listing_id: uuid.UUID
    user_id: uuid.UUID
    queue_number: int
    wait_time_minutes: int
    status: str
    created_at: datetime


class PickupQRResponse(BaseModel):
    qr_code: str
    token: str


class PickupConfirmRequest(BaseModel):
    token: str