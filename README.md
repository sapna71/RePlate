<div align="center">

# RePlate

### Food Donation & Redistribution Platform

<p>
  A full-stack platform connecting surplus food with people and organizations that need it.
</p>

<br>

<a href="#features">Features</a> · <a href="#architecture">Architecture</a> · <a href="#tech-stack">Tech Stack</a> · <a href="#setup">Setup</a> · <a href="#api">API</a>

<br><br>

<img src="https://img.shields.io/badge/Status-In%20Development-2E7D32?style=flat-square" />
<img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" />
<img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" />

</div>

---

## Overview

RePlate is a full-stack food donation and redistribution platform designed to reduce food wastage by connecting **donors** with **receivers** through a structured digital workflow.

The platform allows donors to list surplus food, receivers to discover available donations, and both sides to manage the donation lifecycle from request to completion.

```mermaid
flowchart LR
    A[Donor] --> B[Food Listing]
    B --> C[Available Food]
    C --> D[Receiver]
    D --> E[Food Request]
    E --> F[Donor Confirmation]
    F --> G[Collection]
    G --> H[Completed Donation]
```

---

## Features

|          Donor         |        Receiver       |
| :--------------------: | :-------------------: |
|  Create food listings  | Browse available food |
|    Manage donations    |   View food details   |
| View incoming requests |      Request food     |
|    Confirm requests    |     Track requests    |
|  Track donation status |   Verify collection   |

### Platform Features

* JWT-based authentication
* Secure password hashing
* Role-based user experience
* Food listing management
* Food request management
* Request status tracking
* Donor and receiver dashboards
* PostgreSQL persistence
* RESTful backend APIs
* Automatic API documentation
* Database migrations with Alembic

---

# Tech Stack

<div align="center">

### Frontend

<table>
<tr>
<td align="center" width="140">
<img src="https://cdn.simpleicons.org/react/61DAFB" width="55"><br>
<b>React</b>
</td>

<td align="center" width="140">
<img src="https://cdn.simpleicons.org/vite/646CFF" width="55"><br>
<b>Vite</b>
</td>

<td align="center" width="140">
<img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" width="55"><br>
<b>Tailwind CSS</b>
</td>

<td align="center" width="140">
<img src="https://cdn.simpleicons.org/radixui/161618" width="55"><br>
<b>Radix UI</b>
</td>

<td align="center" width="140">
<img src="https://cdn.simpleicons.org/lucide/000000" width="55"><br>
<b>Lucide</b>
</td>
</tr>
</table>

### Backend

<table>
<tr>
<td align="center" width="160">
<img src="https://cdn.simpleicons.org/fastapi/009688" width="55"><br>
<b>FastAPI</b>
</td>

<td align="center" width="160">
<img src="https://cdn.simpleicons.org/python/3776AB" width="55"><br>
<b>Python</b>
</td>

<td align="center" width="160">
<img src="https://cdn.simpleicons.org/sqlalchemy/D71F00" width="55"><br>
<b>SQLAlchemy</b>
</td>

<td align="center" width="160">
<img src="https://cdn.simpleicons.org/alembic/000000" width="55"><br>
<b>Alembic</b>
</td>
</tr>
</table>

### Database & Authentication

<table>
<tr>
<td align="center" width="180">
<img src="https://cdn.simpleicons.org/postgresql/4169E1" width="60"><br>
<b>PostgreSQL</b>
</td>

<td align="center" width="180">
<img src="https://cdn.simpleicons.org/jsonwebtokens/000000" width="60"><br>
<b>JWT</b>
</td>
</tr>
</table>

</div>

---

# Architecture

```mermaid
flowchart TB

    User[Donor / Receiver]

    subgraph Frontend
        React[React]
        Vite[Vite]
        Tailwind[Tailwind CSS]
    end

    subgraph Backend
        FastAPI[FastAPI]
        Auth[JWT Authentication]
        Services[Business Logic]
        Schemas[Pydantic Schemas]
    end

    subgraph Database
        SQLAlchemy[SQLAlchemy ORM]
        PostgreSQL[(PostgreSQL)]
        Alembic[Alembic Migrations]
    end

    User --> React
    React --> Vite
    React --> Tailwind

    React <-->|REST API / JSON| FastAPI

    FastAPI --> Auth
    FastAPI --> Schemas
    FastAPI --> Services

    Services --> SQLAlchemy
    SQLAlchemy --> PostgreSQL
    Alembic --> PostgreSQL
```

---

# Application Workflow

<div align="center">

```text
DONOR
  │
  ▼
Create Food Listing
  │
  ▼
Food Available
  │
  ▼
RECEIVER
  │
  ▼
Browse Available Food
  │
  ▼
Request Food
  │
  ▼
DONOR
  │
  ▼
Confirm Request
  │
  ▼
Food Collection
  │
  ▼
Donation Completed
```

</div>

---

# Authentication

RePlate uses JWT-based authentication.

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API as FastAPI
    participant DB as PostgreSQL

    User->>Frontend: Enter credentials
    Frontend->>API: POST /auth/login
    API->>DB: Find user
    DB-->>API: User record
    API->>API: Verify password
    API->>API: Generate JWT
    API-->>Frontend: Access token

    Frontend->>API: Protected request
    API->>API: Validate JWT
    API-->>Frontend: Protected response
```

---

# Database Design

```mermaid
erDiagram

    USERS {
        uuid id PK
        string name
        string email
        string password_hash
        string category
        datetime created_at
    }

    FOOD_LISTINGS {
        uuid id PK
        uuid donor_id FK
        string title
        string description
        string quantity
        string location
        datetime expiry
        string status
        datetime created_at
    }

    FOOD_REQUESTS {
        uuid id PK
        uuid food_id FK
        uuid receiver_id FK
        string status
        datetime created_at
        datetime updated_at
    }

    USERS ||--o{ FOOD_LISTINGS : creates
    USERS ||--o{ FOOD_REQUESTS : submits
    FOOD_LISTINGS ||--o{ FOOD_REQUESTS : receives
```

---

# Screenshots

Store your screenshots inside:

```text
docs/
└── screenshots/
    ├── login.png
    ├── signup.png
    ├── donor-dashboard.png
    ├── receiver-dashboard.png
    ├── food-listings.png
    └── requests.png
```

Then display them in the README:

<div align="center">

### Authentication

<img src="./docs/screenshots/login.png" width="850">

<br><br>

### Donor Dashboard

<img src="./docs/screenshots/donor-dashboard.png" width="850">

<br><br>

### Food Discovery

<img src="./docs/screenshots/food-listings.png" width="850">

<br><br>

### Request Tracking

<img src="./docs/screenshots/requests.png" width="850">

</div>

---

# API

## Authentication

```http
POST /auth/signup
POST /auth/login
POST /auth/forgot-password
```

## Users

```http
GET /users/me
```

## Food Listings

```http
POST /food
GET /food
GET /food/{food_id}
```

## Food Requests

```http
POST /requests
GET /requests
GET /requests/{request_id}
PATCH /requests/{request_id}
```

---

# Interactive API Documentation

Once the backend is running:

<div align="center">

### FastAPI Swagger UI

`http://localhost:8000/docs`

</div>

FastAPI automatically generates interactive OpenAPI documentation where endpoints can be inspected and tested directly from the browser.

---

# Project Structure

```text
RePlate/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── routes/
│   │   └── styles/
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── dependencies/
│   │   ├── database/
│   │   └── main.py
│   │
│   ├── alembic/
│   ├── alembic.ini
│   └── requirements.txt
│
├── docs/
│   └── screenshots/
│
└── README.md
```

---

# Setup

## Requirements

```text
Node.js
pnpm
Python 3.12+
PostgreSQL
Git
```

### Clone

```bash
git clone <repository-url>
cd RePlate
```

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

### Backend

```bash
cd backend

python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt

alembic upgrade head

uvicorn app.main:app --reload
```

---

# Environment Variables

Create `.env` inside the backend directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/replate
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Never commit credentials or secrets to the repository.

---

# Testing

Run backend tests with:

```bash
pytest
```

Example:

```python
def test_signup_success(client):
    response = client.post(
        "/auth/signup",
        json={
            "name": "Jane Doe",
            "email": "jane@example.com",
            "password": "supersecret1",
        },
    )

    assert response.status_code == 201

    body = response.json()

    assert body["email"] == "jane@example.com"
    assert body["name"] == "Jane Doe"
```

---

# Development Progress

```mermaid
flowchart LR
    A[Frontend] --> B[FastAPI]
    B --> C[PostgreSQL]
    C --> D[Authentication]
    D --> E[Food Listings]
    E --> F[Food Requests]
    F --> G[Donor Workflow]
    G --> H[Receiver Workflow]
    H --> I[Testing]
```

---

# Future Scope

* QR-based donation verification
* Location-based food discovery
* Map integration
* Organization verification
* Email notifications
* Push notifications
* Food expiry reminders
* Donation analytics
* Administrative dashboard
* Cloud deployment

---

<div align="center">

## RePlate

### Good Food. Greater Impact.

**React · FastAPI · PostgreSQL · SQLAlchemy**

</div>
