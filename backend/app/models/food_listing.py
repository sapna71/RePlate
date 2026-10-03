from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from app.core.database import Base


class FoodListing(Base):

    __tablename__="food_listings"

    id= Column(String, primary_key=True, index=True)
    title= Column(String, nullable=False)
    description= Column(String, nullable=False)
    quantity= Column(String, nullable=False)
    servings= Column(Integer, nullable=False)
    expiry_date= Column(String, nullable=False)
    location= Column(String, nullable=False)
    category= Column(String, nullable=False)
    is_urgent= Column(Boolean, default=False)
    photos= Column(String, nullable=True)
