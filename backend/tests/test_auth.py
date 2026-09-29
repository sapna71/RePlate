def test_signup_success(client):
    response = client.post(
        "/auth/signup",
        json={"name": "Jane Doe", "email": "jane@example.com", "password": "supersecret1"},
    )
    assert response.status_code == 201
    body = response.json()
    assert body["email"] == "jane@example.com"
    assert body["name"] == "Jane Doe"
    assert body["category"] == "individual"
    assert "password" not in body
    assert "hashed_password" not in body


def test_signup_duplicate_email_rejected(client):
    payload = {"name": "Jane Doe", "email": "dupe@example.com", "password": "supersecret1"}
    first = client.post("/auth/signup", json=payload)
    assert first.status_code == 201

    second = client.post("/auth/signup", json=payload)
    assert second.status_code == 400


def test_login_success_returns_token(client):
    client.post(
        "/auth/signup",
        json={"name": "Jane Doe", "email": "login@example.com", "password": "supersecret1"},
    )

    response = client.post(
        "/auth/login",
        json={"email": "login@example.com", "password": "supersecret1"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["token_type"] == "bearer"
    assert isinstance(body["access_token"], str) and len(body["access_token"]) > 0


def test_login_wrong_password_rejected(client):
    client.post(
        "/auth/signup",
        json={"name": "Jane Doe", "email": "wrongpw@example.com", "password": "supersecret1"},
    )

    response = client.post(
        "/auth/login",
        json={"email": "wrongpw@example.com", "password": "not-the-password"},
    )
    assert response.status_code == 401


def test_login_unknown_email_rejected(client):
    response = client.post(
        "/auth/login",
        json={"email": "nobody@example.com", "password": "whatever123"},
    )
    assert response.status_code == 401


def test_me_with_valid_token(client):
    client.post(
        "/auth/signup",
        json={"name": "Token User", "email": "tokenuser@example.com", "password": "supersecret1"},
    )
    login_response = client.post(
        "/auth/login",
        json={"email": "tokenuser@example.com", "password": "supersecret1"},
    )
    token = login_response.json()["access_token"]

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["email"] == "tokenuser@example.com"


def test_me_without_token_rejected(client):
    response = client.get("/auth/me")
    assert response.status_code in (401, 403)


def test_me_with_invalid_token_rejected(client):
    response = client.get("/auth/me", headers={"Authorization": "Bearer not-a-real-token"})
    assert response.status_code == 401