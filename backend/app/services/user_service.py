import uuid

from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.repositories import user_repository
from app.schemas.user import UserCreate, UserLogin


class EmailAlreadyRegisteredError(Exception):
    pass


class InvalidCredentialsError(Exception):
    pass


class UserNotFoundError(Exception):
    pass


def register_user(db: Session, user_in: UserCreate) -> User:
    if user_repository.get_by_email(db, user_in.email):
        raise EmailAlreadyRegisteredError(user_in.email)

    hashed = hash_password(user_in.password)

    return user_repository.create(
        db,
        user_in,
        hashed,
    )


def authenticate_user(db: Session, credentials: UserLogin) -> User:
    user = user_repository.get_by_email(
        db,
        credentials.email,
    )

    print("========== LOGIN DEBUG ==========")
    print("LOGIN EMAIL:", credentials.email)
    print("USER FOUND:", user is not None)

    if user is None:
        print("RESULT: USER NOT FOUND")
        print("=================================")
        raise InvalidCredentialsError()

    print("USER ID:", user.id)
    print("PASSWORD HASH EXISTS:", bool(user.hashed_password))
    print("PASSWORD HASH LENGTH:", len(user.hashed_password))

    password_valid = verify_password(
        credentials.password,
        user.hashed_password,
    )

    print("PASSWORD VALID:", password_valid)

    if not password_valid:
        print("RESULT: WRONG PASSWORD")
        print("=================================")
        raise InvalidCredentialsError()

    print("RESULT: LOGIN SUCCESS")
    print("=================================")

    return user


def login(
    db: Session,
    credentials: UserLogin,
) -> tuple[User, str]:
    """Authenticates the user and returns (user, access_token)."""

    user = authenticate_user(
        db,
        credentials,
    )

    token = create_access_token(
        subject=str(user.id),
    )

    return user, token


def get_user_by_token_subject(
    db: Session,
    subject: str,
) -> User:
    try:
        user_id = uuid.UUID(subject)
    except ValueError as exc:
        raise UserNotFoundError() from exc

    user = user_repository.get_by_id(
        db,
        user_id,
    )

    if user is None:
        raise UserNotFoundError()

    return user