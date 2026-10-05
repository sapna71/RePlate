from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.request import (
    FoodRequestCreate,
    FoodRequestResponse,
    PickupQRResponse,
    PickupConfirmRequest,
)
from app.services import request_service


router = APIRouter()


@router.post("/", response_model=FoodRequestResponse, status_code=201)
def create_food_request(
    food_request: FoodRequestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return request_service.create_food_request(
            db,
            food_request,
            user_id=current_user.id,
        )
    except request_service.ListingNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Food listing not found",
        )


@router.get("/", response_model=List[FoodRequestResponse])
def get_food_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return request_service.get_food_requests(db)


@router.get("/{request_id}/qr", response_model=PickupQRResponse)
def get_pickup_qr(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Receiver-only: generates the QR code they show the donor at pickup."""

    try:
        qr = request_service.generate_pickup_qr(
            db,
            request_id,
            current_user.id,
        )

    except request_service.RequestNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Request not found",
        )

    except request_service.NotRequestOwnerError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not your request",
        )

    except request_service.AlreadyPickedUpError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already picked up",
        )

    return PickupQRResponse(
        qr_code=qr["qr_code"],
        token=qr["token"],
    )


@router.post("/confirm-pickup", response_model=FoodRequestResponse)
def confirm_pickup(
    body: PickupConfirmRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Donor-only: submits the receiver's QR token to mark pickup complete."""

    try:
        return request_service.confirm_pickup(
            db,
            body.token,
            current_user.id,
        )

    except request_service.InvalidPickupTokenError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired QR code",
        )

    except request_service.RequestNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Request not found",
        )

    except request_service.NotListingDonorError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not the donor for this listing",
        )

    except request_service.AlreadyPickedUpError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already picked up",
        )