import random
import uuid

from sqlalchemy.orm import Session

from app.core.qr import generate_qr_data_url
from app.core.security import InvalidTokenError, create_pickup_token, decode_pickup_token
from app.models.food_request import FoodRequest
from app.repositories import food_repository, request_repository
from app.schemas.request import FoodRequestCreate
from app.services import notification_service

STATUS_PENDING = "Pending Confirmation"
STATUS_PICKED_UP = "Picked Up"


class ListingNotFoundError(Exception):
    pass


class RequestNotFoundError(Exception):
    pass


class NotRequestOwnerError(Exception):
    pass


class NotListingDonorError(Exception):
    pass


class AlreadyPickedUpError(Exception):
    pass


class InvalidPickupTokenError(Exception):
    pass


def create_food_request(db: Session, request_data: FoodRequestCreate, user_id: uuid.UUID) -> FoodRequest:
    listing = food_repository.get_by_id(db, request_data.food_listing_id)
    if listing is None:
        raise ListingNotFoundError()

    new_request = FoodRequest(
        food_listing_id=request_data.food_listing_id,
        user_id=user_id,
        queue_number=random.randint(1, 10),
        wait_time_minutes=random.randint(15, 75),
        status="Pending Confirmation",
    )
    created = request_repository.create(db, new_request)

    notification_service.notify(
        db,
        user_id=listing.donor_id,
        message=f'Someone requested your listing "{listing.title}".',
        type="request_created",
        related_request_id=created.request_id,
    )
    return created


def get_food_requests(db: Session) -> list[FoodRequest]:
    return request_repository.list_all(db)


def generate_pickup_qr(
    db: Session,
    request_id: int,
    current_user_id: uuid.UUID,
) -> dict[str, str]:
    food_request = request_repository.get_by_id(db, request_id)

    if food_request is None:
        raise RequestNotFoundError()

    if food_request.user_id != current_user_id:
        raise NotRequestOwnerError()

    if food_request.status == STATUS_PICKED_UP:
        raise AlreadyPickedUpError()

    token = create_pickup_token(request_id)
    qr_code = generate_qr_data_url(token)

    return {
        "qr_code": qr_code,
        "token": token,
    }


def confirm_pickup(db: Session, token: str, current_user_id: uuid.UUID) -> FoodRequest:
    """Marks a request as picked up. Only the donor who owns the related
    listing may confirm — enforced via food_listings.donor_id."""
    try:
        request_id = decode_pickup_token(token)
    except InvalidTokenError as exc:
        raise InvalidPickupTokenError() from exc

    food_request = request_repository.get_by_id(db, request_id)
    if food_request is None:
        raise RequestNotFoundError()

    listing = food_repository.get_by_id(db, food_request.food_listing_id)
    if listing is None or listing.donor_id != current_user_id:
        raise NotListingDonorError()

    if food_request.status == STATUS_PICKED_UP:
        raise AlreadyPickedUpError()

    updated = request_repository.update_status(db, food_request, STATUS_PICKED_UP)

    notification_service.notify(
        db,
        user_id=updated.user_id,
        message=f'Your pickup for "{listing.title}" has been confirmed. Enjoy!',
        type="pickup_confirmed",
        related_request_id=updated.request_id,
    )
    return updated