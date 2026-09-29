import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import sessionmaker

from app.db.session import engine, get_db
from app.main import app


@pytest.fixture()
def db_session():
    """Yields a session bound to a single transaction, rolled back after
    the test so nothing written during tests persists in the dev DB."""
    connection = engine.connect()
    transaction = connection.begin()
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=connection)
    session = TestingSessionLocal()

    try:
        yield session
    finally:
        session.close()
        transaction.rollback()
        connection.close()


@pytest.fixture()
def client(db_session):
    def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
