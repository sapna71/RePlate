import uuid

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate


def get_by_email(db: Session, email: str) -> User | None:
    stmt = select(User).where(User.email == email)
    return db.execute(stmt).scalar_one_or_none()


def get_by_id(db: Session, user_id: uuid.UUID) -> User | None:
    return db.get(User, user_id)


def create(db: Session, user_in: UserCreate, hashed_password: str) -> User:
    user = User(
        name=user_in.name,
        email=user_in.email,
        hashed_password=hashed_password,
        phone=user_in.phone,
        category=user_in.category,
        address=user_in.address,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user