def _signup_and_login(client, email):
    client.post("/auth/signup", json={"name": "Test User", "email": email, "password": "supersecret1"})
    resp = client.post("/auth/login", json={"email": email, "password": "supersecret1"})
    return resp.json()["access_token"]


def _auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


LISTING_PAYLOAD = {
    "title": "Bread Bundle",
    "description": "Day-old bread",
    "quantity": "20 loaves",
    "servings": 20,
    "expiry_date": "Tomorrow",
    "location": "Bakery St",
    "category": "baked",
    "is_urgent": False,
}


def _create_listing_and_request(client, donor_token, receiver_token):
    listing = client.post("/api/food/", json=LISTING_PAYLOAD, headers=_auth_headers(donor_token)).json()
    req = client.post(
        "/api/requests/",
        json={"food_listing_id": listing["id"]},
        headers=_auth_headers(receiver_token),
    ).json()
    return listing, req


def test_receiver_can_generate_qr(client):
    donor_token = _signup_and_login(client, "pickup_donor1@example.com")
    receiver_token = _signup_and_login(client, "pickup_receiver1@example.com")
    _, req = _create_listing_and_request(client, donor_token, receiver_token)

    response = client.get(f"/api/requests/{req['request_id']}/qr", headers=_auth_headers(receiver_token))
    assert response.status_code == 200
    assert response.json()["qr_code"].startswith("data:image/png;base64,")


def test_other_user_cannot_generate_qr_for_someone_elses_request(client):
    donor_token = _signup_and_login(client, "pickup_donor2@example.com")
    receiver_token = _signup_and_login(client, "pickup_receiver2@example.com")
    stranger_token = _signup_and_login(client, "pickup_stranger2@example.com")
    _, req = _create_listing_and_request(client, donor_token, receiver_token)

    response = client.get(f"/api/requests/{req['request_id']}/qr", headers=_auth_headers(stranger_token))
    assert response.status_code == 403


def test_donor_can_confirm_pickup_with_valid_token(client):
    donor_token = _signup_and_login(client, "pickup_donor3@example.com")
    receiver_token = _signup_and_login(client, "pickup_receiver3@example.com")
    _, req = _create_listing_and_request(client, donor_token, receiver_token)

    # Decode the token straight from the service layer logic to simulate
    # "scanning" the QR without needing an actual image decoder in tests.
    from app.services import request_service

    token_response = client.get(f"/api/requests/{req['request_id']}/qr", headers=_auth_headers(receiver_token))
    assert token_response.status_code == 200
    # Re-derive the raw token the same way the service does, since the
    # response only contains the rendered QR image, not the raw token.
    from app.core.security import create_pickup_token

    raw_token = create_pickup_token(req["request_id"])

    response = client.post(
        "/api/requests/confirm-pickup",
        json={"token": raw_token},
        headers=_auth_headers(donor_token),
    )
    assert response.status_code == 200
    assert response.json()["status"] == "Picked Up"


def test_non_donor_cannot_confirm_pickup(client):
    from app.core.security import create_pickup_token

    donor_token = _signup_and_login(client, "pickup_donor4@example.com")
    receiver_token = _signup_and_login(client, "pickup_receiver4@example.com")
    stranger_token = _signup_and_login(client, "pickup_stranger4@example.com")
    _, req = _create_listing_and_request(client, donor_token, receiver_token)

    raw_token = create_pickup_token(req["request_id"])
    response = client.post(
        "/api/requests/confirm-pickup",
        json={"token": raw_token},
        headers=_auth_headers(stranger_token),
    )
    assert response.status_code == 403


def test_confirm_pickup_twice_fails(client):
    from app.core.security import create_pickup_token

    donor_token = _signup_and_login(client, "pickup_donor5@example.com")
    receiver_token = _signup_and_login(client, "pickup_receiver5@example.com")
    _, req = _create_listing_and_request(client, donor_token, receiver_token)

    raw_token = create_pickup_token(req["request_id"])
    first = client.post(
        "/api/requests/confirm-pickup", json={"token": raw_token}, headers=_auth_headers(donor_token)
    )
    assert first.status_code == 200

    second = client.post(
        "/api/requests/confirm-pickup", json={"token": raw_token}, headers=_auth_headers(donor_token)
    )
    assert second.status_code == 400


def test_confirm_pickup_invalid_token_rejected(client):
    donor_token = _signup_and_login(client, "pickup_donor6@example.com")
    response = client.post(
        "/api/requests/confirm-pickup",
        json={"token": "not-a-real-token"},
        headers=_auth_headers(donor_token),
    )
    assert response.status_code == 400