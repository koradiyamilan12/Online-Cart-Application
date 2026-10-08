# Online Cart Application

Online Cart is a full-stack e-commerce assessment application with a secure Express backend and a React frontend. The app includes user authentication, product browsing, persistent cart state, checkout, order history, order details, and a Resend-based confirmation email flow.

## Overview

This project is designed to demonstrate a clean full-stack architecture for a junior developer assessment. It follows a route → controller → service → repository → model flow on the backend and a React + Redux Toolkit frontend for state and API communication.

## Features

- User registration and login
- JWT-based authentication with HTTP-only cookies
- Product listing and detail access
- Persistent cart per authenticated user
- Quantity increase, decrease, and remove actions
- Checkout and order creation
- Order history and order details
- Order confirmation email via Resend
- Safe error handling and validation throughout the app

## Tech Stack

### Backend

- Node.js
- Express
- PostgreSQL
- Sequelize
- JWT
- bcrypt
- Zod
- Resend

### Frontend

- React
- Vite
- Redux Toolkit
- Axios
- Tailwind CSS
- shadcn/ui patterns
- Formik
- Yup
- React Router

## Repository Setup

```bash
git clone <repository-url>
cd Online-Cart-Application
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Environment Configuration

Create backend and frontend environment files from the provided `.env.example` files and fill in your local values. Do not commit real secrets or credentials.

### Backend variables

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://<user>:<password>@localhost:5432/online_cart
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
FRONTEND_URL=http://localhost:5173
RESEND_API_KEY=
# Optional; EMAIL_FROM takes precedence over RESEND_FROM_EMAIL.
# Both default to Online Cart <onboarding@resend.dev> when unset.
APP_NAME=Online Cart
```

### Frontend variables

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Database

The application uses PostgreSQL with Sequelize models and automatic sync for local development. Seed data is available for products, and the product catalog should be initialized before using the app.

```bash
cd backend
npm run seed:products
```

## Running the App

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

Default local URLs:

- Backend API: http://localhost:3000
- Frontend: http://localhost:5173

## Architecture

### Frontend

React → Redux Toolkit → Axios → Backend

### Backend

Route → Controller → Service → Repository → Model

### Database

PostgreSQL + Sequelize

## Email Behavior

After a successful order is created, the backend dispatches a confirmation email through Resend to the authenticated user's registered email address without waiting for delivery. If the email provider fails, the order and cart remain successful and the email failure is logged without affecting the order response.

Email configuration is optional for starting the backend. To send emails, set `RESEND_API_KEY`. The sender is resolved as `EMAIL_FROM`, then `RESEND_FROM_EMAIL`, then `Online Cart <onboarding@resend.dev>`. Resend's default testing sender can only deliver to the email address associated with that Resend account. To send to other recipients (such as registered customers), verify a domain in Resend, then set either sender variable to an address on that verified domain (for example, `orders@your-verified-domain.com`). The resolved sender is logged at startup; the API key is never logged.

## API Summary

| Method | Endpoint                               | Purpose                            |
| ------ | -------------------------------------- | ---------------------------------- |
| POST   | `/api/auth/register`                   | Register a new user                |
| POST   | `/api/auth/login`                      | Log in and create a session cookie |
| POST   | `/api/auth/logout`                     | Clear the auth cookie              |
| GET    | `/api/auth/profile`                    | Fetch the current user             |
| GET    | `/api/products`                        | Get all products                   |
| GET    | `/api/products/:id`                    | Get product details                |
| GET    | `/api/cart`                            | Fetch the current cart             |
| POST   | `/api/cart/items`                      | Add a product to the cart          |
| PATCH  | `/api/cart/items/:cartItemId/increase` | Increase cart quantity             |
| PATCH  | `/api/cart/items/:cartItemId/decrease` | Decrease cart quantity             |
| DELETE | `/api/cart/items/:cartItemId`          | Remove a cart item                 |
| POST   | `/api/orders`                          | Create a new order                 |
| GET    | `/api/orders`                          | Fetch order history                |
| GET    | `/api/orders/:orderId`                 | Fetch order details                |

## Quality and Security Notes

- Passwords are hashed with bcrypt before storage.
- Passwords are never returned in API responses.
- JWTs are stored in an HTTP-only cookie rather than browser storage.
- User-specific cart and order access is enforced on the backend.
- The backend calculates monetary totals from database price data instead of trusting client input.
- Resend API keys are server-side only and must never be exposed to the frontend.

## Validation and Checks

```bash
cd frontend
npm run build
npm run lint
```

```bash
cd backend
npm test
```

## Notes

This project is intended to be submission-ready for a junior developer technical assessment and emphasizes correctness, maintainability, and security without introducing unnecessary complexity.
