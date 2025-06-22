# 🏥 Hospital Management System

A full-stack web application for managing hospital workflows including user authentication, patient registration, and role-based access control for receptionists and doctors.

## 🚀 Live Demo

🌐 **Frontend**: [https://hospital-management-1-qmpi.onrender.com](https://hospital-management-1-qmpi.onrender.com)

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Flow](#architecture--flow)
- [JWT Cookie-Based Authentication](#jwt-cookie-based-authentication)
- [Demo Credentials](#demo-credentials)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [License](#license)

---

## ✅ Features

- Secure login with email/password
- JWT-based authentication stored in HttpOnly cookies
- Role-based access for **Receptionist** and **Doctor**
- Receptionist can:
  - Register new patients
  - View all patients
  - Update or delete patient records
- Protected routes using middleware in backend
- Responsive, modern UI with toast feedback and loading states

---

## 🛠 Tech Stack

| Frontend       | Backend         | Database      | Deployment |
|----------------|----------------|---------------|------------|
| React + Vite   | Golang + Gin   | PostgreSQL    | Render     |
| Tailwind CSS   | GORM ORM       | Hosted on Render | Static + Web Service |

---

## 🧠 Architecture & Flow

1. **Frontend (React)**:
   - Built with Vite and Tailwind CSS.
   - Manages authentication context globally via `AuthContext`.
   - API calls are made with `credentials: 'include'` to persist cookies.

2. **Backend (Golang)**:
   - Gin framework with modular architecture (Handler → Service → Repository).
   - Auth uses JWT signed with a secret key.
   - JWT is sent and stored in HttpOnly cookie to prevent XSS.
   - Middleware verifies JWT from cookie before allowing access to protected routes.

3. **Deployment**:
   - Backend as a **Web Service** on Render.
   - Frontend as a **Static Site** on Render.
   - CORS & secure cookies configured properly for cross-origin requests.

---

## 🔐 JWT Cookie-Based Authentication

- Upon login:
  - A JWT token is generated containing `user_id` and `role`.
  - Token is set in a **HttpOnly cookie**: `auth_token`.
- On subsequent requests:
  - The browser includes this cookie automatically.
  - Backend middleware reads the cookie and verifies it.
- This protects against:
  - XSS (HttpOnly)
  - CSRF (due to same-origin constraints and CORS settings)

### Gin Auth Flow
```go
c.SetCookie("auth_token", signed, 86400, "/", "", true, true)
