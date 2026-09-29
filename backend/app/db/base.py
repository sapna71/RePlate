from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Shared declarative base for all ORM models.

    No models are defined yet (Step 2 is infrastructure only).
    Future model modules will import this Base and Alembic's
    env.py will pick up their metadata automatically once they
    exist and are imported here.
    """
