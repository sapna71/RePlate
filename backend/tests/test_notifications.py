def _signup_and_login(client, email):
    client.post("/auth/signup", json={"name": "Test User", "email": email, "password": "supersecret1"})
    resp = client.post("/auth/login", json={"email": email, "password": "supersecret1"})
    return resp.json()["access_token"]


def _auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


LISTING_PAYLOAD = {
    "title": "Fruit Crates",
    "description": "Assorted fruit",
    "quantity": "15 kg",
    "servings": 15,
    "expiry_date": "Today",
    "location": "Market St",
    "category": "fresh",
    "is_urgent": False,
}


def test_donor_notified_when_request_created(client):
    donor_token = _signup_and_login(client, "notif_donor1@example.com")
    receiver_token = _signup_and_login(client, "notif_receiver1@example.com")

    listing = client.post("/api/food/", json=LISTING_PAYLOAD, headers=_auth_headers(donor_token)).json()
    client.post("/api/requests/", json={"food_listing_id": listing["id"]}, headers=_auth_headers(receiver_token))

    donor_notifs = client.get("/api/notifications/me", headers=_auth_headers(donor_token)).json()
    assert len(donor_notifs) == 1
    assert donor_notifs[0]["type"] == "request_created"
    assert donor_notifs[0]["is_read"] is False

    receiver_notifs = client.get("/api/notifications/me", headers=_auth_headers(receiver_token)).json()
    assert receiver_notifs == []


def test_receiver_notified_when_pickup_confirmed(client):
    from app.core.security import create_pickup_token

    donor_token = _signup_and_login(client, "notif_donor2@example.com")
    receiver_token = _signup_and_login(client, "notif_receiver2@example.com")

    listing = client.post("/api/food/", json=LISTING_PAYLOAD, headers=_auth_headers(donor_token)).json()
    req = client.post(
        "/api/requests/", json={"food_listing_id": listing["id"]}, headers=_auth_headers(receiver_token)
    ).json()

    token = create_pickup_token(req["request_id"])
    client.post("/api/requests/confirm-pickup", json={"token": token}, headers=_auth_headers(donor_token))

    receiver_notifs = client.get("/api/notifications/me", headers=_auth_headers(receiver_token)).json()
    assert any(n["type"] == "pickup_confirmed" for n in receiver_notifs)


def test_mark_notification_read(client):
    donor_token = _signup_and_login(client, "notif_donor3@example.com")
    receiver_token = _signup_and_login(client, "notif_receiver3@example.com")

    listing = client.post("/api/food/", json=LISTING_PAYLOAD, headers=_auth_headers(donor_token)).json()
    client.post("/api/requests/", json={"food_listing_id": listing["id"]}, headers=_auth_headers(receiver_token))

    notif = client.get("/api/notifications/me", headers=_auth_headers(donor_token)).json()[0]
    response = client.post(f"/api/notifications/{notif['id']}/read", headers=_auth_headers(donor_token))
    assert response.status_code == 200
    assert response.json()["is_read"] is True


def test_cannot_mark_someone_elses_notification_read(client):
    donor_token = _signup_and_login(client, "notif_donor4@example.com")
    receiver_token = _signup_and_login(client, "notif_receiver4@example.com")
    stranger_token = _signup_and_login(client, "notif_stranger4@example.com")

    listing = client.post("/api/food/", json=LISTING_PAYLOAD, headers=_auth_headers(donor_token)).json()
    client.post("/api/requests/", json={"food_listing_id": listing["id"]}, headers=_auth_headers(receiver_token))

    notif = client.get("/api/notifications/me", headers=_auth_headers(donor_token)).json()[0]
    response = client.post(f"/api/notifications/{notif['id']}/read", headers=_auth_headers(stranger_token))
    assert response.status_code == 403