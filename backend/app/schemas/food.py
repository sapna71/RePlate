from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class FoodListingSchema(BaseModel):
    id: str
    title: str
    description: str
    quantity: str
    servings: int
    expiry_date: str
    location: str
    category: str
    is_urgent: bool = False
    photos: Optional[str] = None


class FoodListingResponse(BaseModel):
    class Config:
        from_attributes = True
