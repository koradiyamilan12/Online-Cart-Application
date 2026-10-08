# API Documentation

## Online Cart Application

**Base URL**

```text
/api
```

The API provides authentication, product listing, cart management, and order submission functionality.

---

# 1. Authentication

Authentication is required for dashboard, cart, and order operations.

Authentication uses:

- JWT
- HTTP-only cookies
- bcrypt password hashing

---

## 1.1 Register

Creates a new user account.

### Endpoint

```http
POST /api/auth/register
```

### Authentication

Not required.

### Request Body

```json
{
  "name": "Priya Shah",
  "email": "priya@example.com",
  "password": "Password@123"
}
```

### Success Response

**Status:** `201 Created`

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "user-id",
      "name": "Priya Shah",
      "email": "priya@example.com"
    }
  }
}
```

The password must never be included in the response.

### Errors

**Duplicate email**

```text
409 Conflict
```

```json
{
  "success": false,
  "message": "Email already registered"
}
```

**Invalid input**

```text
400 Bad Request
```

---

# 2. Login

Authenticates an existing user.

### Endpoint

```http
POST /api/auth/login
```

### Authentication

Not required.

### Request Body

```json
{
  "email": "priya@example.com",
  "password": "Password@123"
}
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user-id",
      "name": "Priya Shah",
      "email": "priya@example.com"
    }
  }
}
```

The authentication token is stored using an HTTP-only cookie.

### Invalid Credentials

**Status:** `401 Unauthorized`

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

# 3. Logout

Logs the current user out.

### Endpoint

```http
POST /api/auth/logout
```

### Authentication

Not required; the cookie is cleared even when the user is already logged out.

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Logout successful"
}
```

The authentication cookie must be cleared.

---

# 4. Get Current User / Profile

Returns the currently authenticated user's information.

### Endpoint

```http
GET /api/auth/profile
```

`GET /api/auth/me` is also available as an alias.

### Authentication

Required.

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "user": {
      "id": "user-id",
      "name": "Priya Shah",
      "email": "priya@example.com"
    }
  }
}
```

### Unauthenticated Response

**Status:** `401 Unauthorized`

```json
{
  "success": false,
  "message": "Authentication required"
}
```

---

# 5. Products

All authenticated users can view the same products.

---

## 5.1 Get Products

Returns the shared product list. An empty list is returned when no products have been seeded.

### Endpoint

```http
GET /api/products
```

### Authentication

Required. Send the HTTP-only authentication cookie.

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Wireless Mouse",
      "price": "499.00"
    },
    {
      "id": 2,
      "name": "USB Keyboard",
      "price": "799.00"
    }
  ]
}
```

The database must contain at least 8 products after running `npm run seed:products`.

## 5.2 Get Product

Returns one product by its positive integer ID.

### Endpoint

```http
GET /api/products/:id
```

### Authentication

Required. Send the HTTP-only authentication cookie.

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {
    "id": 1,
    "name": "Wireless Mouse",
    "price": "499.00"
  }
}
```

An invalid ID returns `400 Bad Request`; a valid ID for a product that does not exist returns `404 Not Found` with `Product not found`.

---

# 6. Cart

All cart endpoints require authentication.

A user can only access and modify their own cart.

---

## 6.1 Get Cart

Returns the current user's cart.

### Endpoint

```http
GET /api/cart
```

### Authentication

Required.

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": {
    "cart": {
      "id": "cart-id",
      "items": [
        {
          "id": "cart-item-1",
          "product": {
            "id": "product-1",
            "name": "Wireless Mouse",
            "price": 499
          },
          "quantity": 2,
          "lineTotal": 998
        }
      ],
      "grandTotal": 998
    }
  }
}
```

### Empty Cart

```json
{
  "success": true,
  "data": {
    "cart": {
      "items": [],
      "grandTotal": 0
    }
  }
}
```

---

# 7. Add Product to Cart

Adds a product to the authenticated user's cart.

### Endpoint

```http
POST /api/cart/items
```

### Authentication

Required.

### Request Body

```json
{
  "productId": "product-1",
  "quantity": 1
}
```

### Success Response

**Status:** `201 Created`

```json
{
  "success": true,
  "message": "Product added to cart",
  "data": {
    "item": {
      "id": "cart-item-1",
      "productId": "product-1",
      "quantity": 1
    }
  }
}
```

### Existing Product

If the product already exists in the user's cart, its quantity should be increased instead of creating a duplicate cart item.

### Invalid Quantity

**Status:** `400 Bad Request`

```json
{
  "success": false,
  "message": "Quantity must be at least 1"
}
```

### Product Not Found

**Status:** `404 Not Found`

```json
{
  "success": false,
  "message": "Product not found"
}
```

---

# 8. Update Cart Item Quantity

Changes the quantity of an existing cart item.

### Endpoint

```http
PATCH /api/cart/items/:id
```

### Authentication

Required.

### URL Parameter

```text
id = cart item ID
```

### Request Body

```json
{
  "quantity": 3
}
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Cart updated successfully",
  "data": {
    "item": {
      "id": "cart-item-1",
      "quantity": 3,
      "lineTotal": 1497
    }
  }
}
```

### Invalid Quantity

```json
{
  "success": false,
  "message": "Quantity must be at least 1"
}
```

### Important

A user must only be able to update cart items belonging to their own cart.

---

# 9. Remove Cart Item

Removes a product from the authenticated user's cart.

### Endpoint

```http
DELETE /api/cart/items/:id
```

### Authentication

Required.

### URL Parameter

```text
id = cart item ID
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Product removed from cart"
}
```

### Cart Item Not Found

**Status:** `404 Not Found`

```json
{
  "success": false,
  "message": "Cart item not found"
}
```

A user must never be able to delete another user's cart item.

---

# 10. Submit Order

Creates an order from the authenticated user's cart.

### Endpoint

```http
POST /api/orders
```

### Authentication

Required.

### Request Body

No request body is required.

The order is created using the user's current cart.

### Success Response

**Status:** `201 Created`

```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "order": {
      "id": "order-id",
      "totalAmount": 2997,
      "items": [
        {
          "productName": "Wireless Mouse",
          "quantity": 2,
          "price": 499,
          "lineTotal": 998
        },
        {
          "productName": "USB Keyboard",
          "quantity": 1,
          "price": 799,
          "lineTotal": 799
        }
      ]
    }
  }
}
```

After successful order creation:

```text
Cart
 ↓
Order created
 ↓
Order items created
 ↓
Cart cleared
 ↓
Order email sent
```

---

# 11. Empty Cart Order

An order cannot be created when the cart is empty.

### Response

**Status:** `400 Bad Request`

```json
{
  "success": false,
  "message": "Your cart is empty"
}
```

---

# 12. Email Failure

If the order is successfully saved but the email cannot be sent, the application must not crash.

Example response:

```json
{
  "success": true,
  "message": "Order placed successfully, but the order email could not be sent",
  "data": {
    "order": {
      "id": "order-id",
      "totalAmount": 2997
    }
  }
}
```

The order must remain saved in the database.

The cart must remain cleared after the successful order creation.

---

# 13. Order Calculation

The backend must calculate the final order amount.

For every item:

```text
lineTotal = price × quantity
```

The grand total:

```text
grandTotal = sum(lineTotal)
```

Example:

```text
Wireless Mouse
₹499 × 2 = ₹998

USB Keyboard
₹799 × 1 = ₹799

Laptop Stand
₹1,200 × 1 = ₹1,200

Grand Total = ₹2,997
```

The backend must not blindly trust totals calculated by the frontend.

---

# 14. Email Content

After a successful order, an email must be sent to the authenticated user's registered email.

### Subject

```text
Your order summary
```

### Required Content

```text
Customer name

Product
Quantity
Price
Line Total

Grand Total
```

Example:

```text
Hi Priya, thanks for your order. Here is your bill:

Wireless Mouse
Qty: 2
Price: ₹499
Total: ₹998

USB Keyboard
Qty: 1
Price: ₹799
Total: ₹799

Laptop Stand
Qty: 1
Price: ₹1,200
Total: ₹1,200

Grand total: ₹2,997
```

---

# 15. Authentication Errors

## Missing Authentication

**Status:** `401 Unauthorized`

```json
{
  "success": false,
  "message": "Authentication required"
}
```

## Invalid Authentication

**Status:** `401 Unauthorized`

```json
{
  "success": false,
  "message": "Invalid or expired authentication"
}
```

---

# 16. Validation Errors

Invalid request data should return a clear validation error.

Example:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "quantity",
      "message": "Quantity must be at least 1"
    }
  ]
}
```

---

# 17. HTTP Status Codes

| Status | Meaning                        |
| ------ | ------------------------------ |
| `200`  | Successful request             |
| `201`  | Resource successfully created  |
| `400`  | Invalid request                |
| `401`  | Authentication required/failed |
| `404`  | Resource not found             |
| `409`  | Duplicate resource             |
| `500`  | Internal server error          |

---

# 18. API Endpoint Summary

| Method | Endpoint              | Auth | Purpose          |
| ------ | --------------------- | ---- | ---------------- |
| POST   | `/api/auth/register`  | No   | Register user    |
| POST   | `/api/auth/login`     | No   | Login user       |
| POST   | `/api/auth/logout`    | Yes  | Logout user      |
| GET    | `/api/auth/me`        | Yes  | Get current user |
| GET    | `/api/products`       | Yes  | Get products     |
| GET    | `/api/cart`           | Yes  | Get user's cart  |
| POST   | `/api/cart/items`     | Yes  | Add product      |
| PATCH  | `/api/cart/items/:id` | Yes  | Update quantity  |
| DELETE | `/api/cart/items/:id` | Yes  | Remove product   |
| POST   | `/api/orders`         | Yes  | Submit order     |

---

# 19. Complete API Flow

```text
                    ┌──────────────┐
                    │   Register   │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │    Login     │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │   Products   │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │  Add to Cart │
                    └──────┬───────┘
                           ↓
                ┌──────────────────────┐
                │ Update / Remove Item │
                └──────────┬───────────┘
                           ↓
                    ┌──────────────┐
                    │  Get Cart    │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │ Submit Order │
                    └──────┬───────┘
                           ↓
                  ┌──────────────────┐
                  │ Save Order       │
                  │ Save OrderItems  │
                  │ Clear Cart       │
                  └────────┬─────────┘
                           ↓
                    ┌──────────────┐
                    │ Send Email   │
                    └──────────────┘
```

---

# 20. API Requirements Checklist

## Authentication

- [ ] Register API works.
- [ ] Password is hashed.
- [ ] Login API works.
- [ ] Authentication uses HTTP-only cookies.
- [ ] Logout API clears authentication.
- [ ] Protected APIs require authentication.
- [ ] Wrong password returns an error.
- [ ] Duplicate email returns an error.

## Products

- [ ] Product listing API works.
- [ ] At least 8 products are available.

## Cart

- [ ] Get cart API works.
- [ ] Add item API works.
- [ ] Existing product quantity is increased.
- [ ] Update quantity API works.
- [ ] Remove item API works.
- [ ] Invalid quantity is rejected.
- [ ] Users can only access their own cart.

## Orders

- [ ] Empty cart cannot be submitted.
- [ ] Order total is calculated on the backend.
- [ ] Order is saved.
- [ ] Order items are saved.
- [ ] Cart is cleared after order creation.
- [ ] Order email is sent.
- [ ] Email failure does not crash the application.

## Deployment

- [ ] APIs work on the deployed backend.
- [ ] Frontend can communicate with the deployed backend.
- [ ] Production environment variables are configured.
- [ ] No secrets are committed to GitHub.
