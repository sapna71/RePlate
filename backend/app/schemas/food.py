from uuid import UUID

from pydantic import BaseModel


class FoodListingCreate(BaseModel):
    title: str
    description: str
    quantity: str
    servings: int
    expiry_date: str
    location: str
    category: str
    is_urgent: bool = False
    photos: str | None = None


class FoodListingResponse(FoodListingCreate):
    id: UUID
    donor_id: UUID

    model_config = {
        "from_attributes": True,
    }


# Kept for compatibility with the existing food_service.py
FoodListingSchema = FoodListingResponse