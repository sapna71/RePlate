def _signup_and_login(client, email):
    client.post("/auth/signup", json={"name": "Test User", "email": email, "password": "supersecret1"})
    resp = client.post("/auth/login", json={"email": email, "password": "supersecret1"})
    return resp.json()["access_token"]


def _auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


LISTING_PAYLOAD = {
    "title": "Veg Boxes",
    "description": "Fresh veggies",
    "quantity": "12 kg",
    "servings": 10,
    "expiry_date": "Today, 7 PM",
    "location": "Downtown",
    "category": "fresh",
    "is_urgent": True,
}


def test_create_listing_requires_auth(client):
    response = client.post("/api/food/", json=LISTING_PAYLOAD)
    assert response.status_code in (401, 403)


def test_create_and_list_listing(client):
    token = _signup_and_login(client, "donor1@example.com")

    create_resp = client.post("/api/food/", json=LISTING_PAYLOAD, headers=_auth_headers(token))
    assert create_resp.status_code == 201
    body = create_resp.json()
    assert body["title"] == "Veg Boxes"
    assert "donor_id" in body and body["donor_id"]

    list_resp = client.get("/api/food/", headers=_auth_headers(token))
    assert list_resp.status_code == 200
    assert any(item["id"] == body["id"] for item in list_resp.json())


def test_create_request_and_list(client):
    donor_token = _signup_and_login(client, "donor2@example.com")
    receiver_token = _signup_and_login(client, "receiver2@example.com")

    listing = client.post("/api/food/", json=LISTING_PAYLOAD, headers=_auth_headers(donor_token)).json()

    request_resp = client.post(
        "/api/requests/",
        json={"food_listing_id": listing["id"]},
        headers=_auth_headers(receiver_token),
    )
    assert request_resp.status_code == 201
    body = request_resp.json()
    assert body["status"] == "Pending Confirmation"
    assert body["food_listing_id"] == listing["id"]

    list_resp = client.get("/api/requests/", headers=_auth_headers(receiver_token))
    assert list_resp.status_code == 200
    assert any(r["request_id"] == body["request_id"] for r in list_resp.json())


def test_create_request_for_missing_listing_404(client):
    token = _signup_and_login(client, "receiver3@example.com")
    response = client.post(
        "/api/requests/",
        json={"food_listing_id": "00000000-0000-0000-0000-000000000000"},
        headers=_auth_headers(token),
    )
    assert response.status_code == 404