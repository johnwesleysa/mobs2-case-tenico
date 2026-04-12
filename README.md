# 🚗 Real-Time Fleet Monitoring Dashboard

## 📖 Overview

This project is a **full-stack, microservices-based application** designed for **real-time fleet vehicle monitoring**.

It provides an interactive dashboard to:
- Track vehicle locations
- View live telemetry data
- Analyze historical routes

### 🧩 Architecture

The system is fully containerized and composed of:

- **Backend 1 (Laravel)**  
  Handles JWT authentication and vehicle CRUD operations.

- **Backend 2 (NestJS)**  
  Simulates and streams real-time telemetry data every 5 seconds.

- **Frontend (Vue 3)**  
  A reactive SPA with authentication and Google Maps integration.

- **Database (PostgreSQL)**  
  Stores users and fleet data.

- **Orchestration (Docker)**  
  Managed via Docker Compose for seamless setup.

---

## ✨ Key Features

- ✅ **Secure Authentication**  
  JWT-based login and session handling

- ✅ **Fleet Management**  
  Full CRUD for vehicle management

- ✅ **Interactive Dashboard**  
  Real-time tracking with Google Maps API

- ✅ **Telemetry Insights**  
  Detailed vehicle info (plate, model, speed, fuel, etc.)

- ✅ **Quick Search**  
  Filter vehicles by license plate

- ✅ **Route History**  
  Toggleable route visualization (polyline)

- 🚀 **Real-Time Updates (Highlight)**  
  Live updates via WebSockets

---

## 🛠️ Prerequisites

- Docker
- Docker Compose

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL_HERE>
cd mobs2-fleet-monitoring
```

### 2. Configure Environment Variables

#### Frontend (Vue)

Create a `.env` file inside `frontend-vue`:

```bash
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
```

#### Backend (Laravel)

Use the existing `.env.example` file.

---

### 3. Install Frontend Dependencies

```bash
docker compose run --rm vue npm install
```

---

### 4. Start the Application

```bash
docker compose up -d --build
```

---

### 5. Run Migrations & Seeders

```bash
docker compose exec laravel php artisan migrate --seed
```

---

## 🎉 Application Ready!

- Frontend: http://localhost:5173  
- Laravel API: http://localhost:8000  
- NestJS API: http://localhost:3000  

### Sample Credentials

```
Email: test@example.com
Password: password
```

---

## 🧪 Running Tests

### Laravel

```bash
docker compose exec laravel php artisan test
```

### NestJS

```bash
docker compose exec nestjs npm run test
```

---

## 📡 API Endpoints

### Laravel (Auth & Fleet Management)

| Method | Endpoint           | Description                    |
|--------|------------------|--------------------------------|
| POST   | /api/register    | Register a new user           |
| POST   | /api/login       | Authenticate user (JWT)       |
| GET    | /api/vehicles    | List vehicles (Auth required) |
| POST   | /api/vehicles    | Create vehicle (Auth required)|
| PUT    | /api/vehicles/:id| Update vehicle                |
| DELETE | /api/vehicles/:id| Delete vehicle                |

---

### NestJS (Telemetry)

| Method | Endpoint                          | Description                    |
|--------|-----------------------------------|--------------------------------|
| GET    | /telemetry/:vehicleId            | Latest telemetry data          |
| GET    | /telemetry/:vehicleId/history    | Vehicle route history          |
