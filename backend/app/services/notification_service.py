import uuid

from sqlalchemy.orm import Session

from app.models.notification import Notification
from app.repositories import notification_repository


class NotificationNotFoundError(Exception):
    pass


class NotOwnerError(Exception):
    pass


def notify(
    db: Session,
    user_id: uuid.UUID,
    message: str,
    type: str,
    related_request_id: int | None = None,
) -> Notification:
    """Creates a notification. Called by other services (request_service)
    on events like a new request or a confirmed pickup — never called
    directly from a router."""
    notification = Notification(
        user_id=user_id,
        message=message,
        type=type,
        related_request_id=related_request_id,
    )
    return notification_repository.create(db, notification)


def get_my_notifications(db: Session, user_id: uuid.UUID) -> list[Notification]:
    return notification_repository.list_for_user(db, user_id)


def mark_as_read(db: Session, notification_id: uuid.UUID, user_id: uuid.UUID) -> Notification:
    notification = notification_repository.get_by_id(db, notification_id)
    if notification is None:
        raise NotificationNotFoundError()
    if notification.user_id != user_id:
        raise NotOwnerError()
    return notification_repository.mark_read(db, notification)