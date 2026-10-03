from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.health import router as health_router
from app.core.config import settings

from app.routers import food, requests
from app.core.database import Base, engine
from app.models.food_listing import FoodListing
from app.models.food_request import FoodRequest


Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(auth_router)

app.include_router(
    food.router,
    prefix="/api/food",
    tags=["Food Listings"]
)

app.include_router(
    requests.router,
    prefix="/api/requests",
    tags=["Food Requests"]
)


@app.get("/")
async def root():
    return {"message": "Backend is running successfully!"}