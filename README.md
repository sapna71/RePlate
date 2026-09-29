<div align="center">

# RePlate

### Food Donation & Redistribution Platform

<p>
  <strong>Connecting surplus food with people who need it.</strong>
</p>

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/SQLAlchemy-ORM-D71F00?style=for-the-badge" alt="SQLAlchemy">
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge" alt="JWT">
</p>

<p>
  <a href="#overview">Overview</a>
  &nbsp;&bull;&nbsp;
  <a href="#features">Features</a>
  &nbsp;&bull;&nbsp;
  <a href="#architecture">Architecture</a>
  &nbsp;&bull;&nbsp;
  <a href="#screenshots">Screenshots</a>
  &nbsp;&bull;&nbsp;
  <a href="#setup">Setup</a>
</p>

</div>

---

## Overview

**RePlate** is a full-stack food donation and redistribution platform designed to reduce food wastage by connecting **food donors** with **receivers and organizations** that can make use of surplus food.

Instead of relying on informal communication, RePlate provides a structured digital workflow for:

* Donating surplus food
* Discovering available food
* Submitting food requests
* Managing donation requests
* Tracking request status
* Verifying collection
* Completing the donation lifecycle

The platform has separate experiences for **Donors** and **Receivers**, while a centralized backend manages authentication, food listings, requests, and database operations.

---

## The Problem

Large quantities of edible food can go unused while individuals and organizations simultaneously face shortages.

The challenge is not only food availability, but also the lack of a simple mechanism to coordinate:

```mermaid
flowchart LR
    A[Surplus Food] --> B[Donor]
    B --> C[RePlate]
    C --> D[Available Listings]
    D --> E[Receiver]
    E --> F[Food Request]
    F --> G[Donation Confirmation]
    G --> H[Collection]
    H --> I[Completed Donation]
```

RePlate aims to provide this coordination layer through a centralized web platform.

---

# Core Workflow

```mermaid
flowchart LR
    A[Donor] --> B[Create Food Listing]
    B --> C[Food Becomes Available]
    C --> D[Receiver Browses Food]
    D --> E[Receiver Requests Food]
    E --> F[Donor Reviews Request]
    F --> G[Request Confirmed]
    G --> H[Food Collected]
    H --> I[Donation Completed]
```

### Donation lifecycle

```mermaid
stateDiagram-v2
    [*] --> Available
    Available --> Requested
    Requested --> Confirmed
    Confirmed --> Completed
    Requested --> Available : Request Rejected
    Completed --> [*]
```

---

# Features

<table>
<tr>
<td width="50%">

### Authentication

* User registration
* Secure password hashing
* JWT authentication
* Protected API routes
* Current-user dependency
* Role-based application flow

</td>

<td width="50%">

### Donor

* Create food listings
* Manage donated food
* View incoming requests
* Confirm requests
* Track donation status

</td>
</tr>

<tr>
<td>

### Receiver

* Browse available food
* View food details
* Submit requests
* Track requests
* Monitor request status

</td>

<td>

### Donation Management

* Food availability tracking
* Request lifecycle
* Donor confirmation
* Collection verification
* Completed donation tracking

</td>
</tr>
</table>

---

# User Roles

```mermaid
flowchart TB
    R[RePlate Platform]

    R --> D[Donor]
    R --> V[Receiver]

    D --> D1[Create Food Listing]
    D --> D2[View Listings]
    D --> D3[Review Requests]
    D --> D4[Confirm Donation]

    V --> V1[Browse Food]
    V --> V2[View Details]
    V --> V3[Request Food]
    V --> V4[Track Requests]
```

---

# Screenshots

> Replace the image paths below with the actual screenshots from the project.

<div align="center">

<table>
<tr>
<td align="center" width="50%">

### Authentication

<img src="./docs/screenshots/login.png" width="100%" alt="RePlate Login">

</td>

<td align="center" width="50%">

### Donor Dashboard

<img src="./docs/screenshots/donor-dashboard.png" width="100%" alt="RePlate Donor Dashboard">

</td>
</tr>

<tr>
<td align="center">

### Available Food

<img src="./docs/screenshots/food-listings.png" width="100%" alt="RePlate Food Listings">

</td>

<td align="center">

### Request Tracking

<img src="./docs/screenshots/requests.png" width="100%" alt="RePlate Requests">

</td>
</tr>
</table>

</div>

---

# System Architecture

```mermaid
flowchart TB

    U[User]

    subgraph Frontend
        R[React]
        V[Vite]
        T[Tailwind CSS]
        RT[React Router]
    end

    subgraph Backend
        F[FastAPI]
        AUTH[JWT Authentication]
        API[REST API]
        S[Service Layer]
    end

    subgraph Data Layer
        SA[SQLAlchemy]
        AL[Alembic]
        DB[(PostgreSQL)]
    end

    U --> R
    R --> V
    R --> T
    R --> RT

    R <-->|HTTP / JSON| F

    F --> AUTH
    F --> API
    API --> S
    S --> SA

    SA --> DB
    AL --> DB
```

---

# Backend Architecture

The backend follows a layered architecture to keep authentication, business logic, and database operations separated.

```mermaid
flowchart LR

    Client[React Client]

    Router[FastAPI Router]
    Schema[Pydantic Schemas]
    Service[Service Layer]
    Model[SQLAlchemy Models]
    DB[(PostgreSQL)]

    Client --> Router
    Router --> Schema
    Router --> Service
    Service --> Model
    Model --> DB
```

### Request flow

```text
React
  |
  | HTTP Request
  v
FastAPI Router
  |
  v
Validation
  |
  v
Service / Business Logic
  |
  v
SQLAlchemy
  |
  v
PostgreSQL
```

---

# Authentication Flow

RePlate uses JWT-based authentication for protected resources.

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as FastAPI
    participant DB as PostgreSQL

    U->>F: Enter credentials
    F->>A: POST /auth/login
    A->>DB: Find user
    DB-->>A: User data
    A->>A: Verify password
    A->>A: Generate JWT
    A-->>F: Access token
    F->>A: Protected API request
    A->>A: Validate JWT
    A-->>F: Protected response
```

---

# Food Request Flow

```mermaid
sequenceDiagram
    participant R as Receiver
    participant F as Frontend
    participant A as FastAPI
    participant DB as PostgreSQL
    participant D as Donor

    R->>F: Select food listing
    F->>A: POST /requests
    A->>DB: Create request
    DB-->>A: Request created
    A-->>F: Request confirmation

    D->>F: Open incoming requests
    F->>A: GET /requests
    A->>DB: Fetch donor requests
    DB-->>A: Request data
    A-->>F: Display requests

    D->>F: Confirm request
    F->>A: PATCH /requests/{id}
    A->>DB: Update status
    DB-->>A: Updated request
    A-->>F: Updated status
```

---

# Database Design

```mermaid
erDiagram

    USERS {
        uuid id PK
        string name
        string email UK
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

# Tech Stack

<div align="center">

|       Layer       |     Technology    |
| :---------------: | :---------------: |
|      Frontend     |       React       |
|     Build Tool    |        Vite       |
|      Styling      |    Tailwind CSS   |
|   UI Components   |      Radix UI     |
|      Backend      |      FastAPI      |
|      Language     |       Python      |
|        ORM        |     SQLAlchemy    |
|     Migrations    |      Alembic      |
|      Database     |     PostgreSQL    |
|   Authentication  |        JWT        |
| API Documentation | OpenAPI / Swagger |

</div>

---

# API Structure

### Authentication

```http
POST /auth/signup
POST /auth/login
POST /auth/forgot-password
```

### User

```http
GET /users/me
```

### Food

```http
POST /food
GET /food
GET /food/{food_id}
```

### Requests

```http
POST /requests
GET /requests
GET /requests/{request_id}
PATCH /requests/{request_id}
```

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
│   │   │   ├── routes/
│   │   │   └── ...
│   │   │
│   │   ├── styles/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── dependencies/
│   │   └── database/
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

# Interactive Project Details

<details>
<summary><strong>Authentication</strong></summary>

RePlate uses JWT authentication.

Passwords are hashed before being stored in PostgreSQL. After successful login, the backend generates an access token that is used to authenticate subsequent protected requests.

</details>

<details>
<summary><strong>Food Listings</strong></summary>

Donors can create listings containing information about the available food, quantity, location, availability, and expiry.

The listing is then exposed to receivers through the food discovery interface.

</details>

<details>
<summary><strong>Food Requests</strong></summary>

Receivers can request available food. The request is associated with both the receiver and the selected food listing.

The donor can subsequently review and update the request status.

</details>

<details>
<summary><strong>Database Migrations</strong></summary>

Alembic is used to manage database schema changes.

Example:

```bash
alembic revision --autogenerate -m "create food listings"
alembic upgrade head
```

</details>

<details>
<summary><strong>API Documentation</strong></summary>

When the backend is running, FastAPI automatically generates interactive API documentation.

```text
http://localhost:8000/docs
```

The Swagger interface can be used to inspect endpoints, request schemas, responses, and authenticated routes.

</details>

---

# Local Setup

## Prerequisites

```text
Node.js
pnpm
Python 3.12+
PostgreSQL
Git
```

## Clone

```bash
git clone <repository-url>
cd RePlate
```

## Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

## Backend

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

Create a `.env` file inside the backend:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/replate
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Do not commit `.env` files containing credentials or secrets.

---

# Testing

Backend tests are written to verify API behavior independently from the frontend.

```bash
pytest
```

Example authentication test:

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
    A[UI / Figma] --> B[Frontend Setup]
    B --> C[FastAPI Setup]
    C --> D[PostgreSQL]
    D --> E[User Authentication]
    E --> F[JWT Authorization]
    F --> G[Food Listings]
    G --> H[Food Requests]
    H --> I[Donor Workflow]
    I --> J[Receiver Workflow]
    J --> K[Testing]
```

---

# Project Goals

RePlate is designed around three primary goals:

<table>
<tr>
<td align="center" width="33%">

### Reduce Waste

Create a structured channel for redistributing surplus food.

</td>

<td align="center" width="33%">

### Improve Access

Make available food easier to discover and request.

</td>

<td align="center" width="33%">

### Improve Coordination

Digitize the complete donation lifecycle.

</td>
</tr>
</table>

---

# Future Scope

Potential extensions include:

* Location-based food discovery
* Map integration
* Organization verification
* QR-based collection verification
* Email notifications
* Push notifications
* Food expiry reminders
* Donation analytics
* Administrative dashboard
* Deployment using cloud infrastructure

---

# Project Status

<div align="center">

| Component              |     Status     |
| :--------------------- | :------------: |
| UI / Frontend          | In Development |
| Authentication         |   Implemented  |
| JWT Authorization      |   Implemented  |
| PostgreSQL Integration |   Implemented  |
| Food Listings          | In Development |
| Food Requests          | In Development |
| Donor Workflow         | In Development |
| Receiver Workflow      | In Development |
| Testing                | In Development |

</div>

---

<div align="center">

## RePlate

**Good Food. Greater Impact.**

</div>
