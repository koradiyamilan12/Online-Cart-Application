# Database Design

## Online Cart Application

**Database:** PostgreSQL
**ORM:** Sequelize

---

# 1. Database Overview

The application uses PostgreSQL because the system contains related data between:

- Users
- Products
- Carts
- Cart Items
- Orders
- Order Items

A relational database helps maintain data consistency and enforce relationships between these entities.

---

# 2. Entity Relationship Overview

```text
┌──────────────┐
│    Users     │
└──────┬───────┘
       │
       │ 1 : 1
       ▼
┌──────────────┐
│    Carts     │
└──────┬───────┘
       │
       │ 1 : N
       ▼
┌──────────────┐       N : 1       ┌──────────────┐
│  CartItems   │───────────────────►│   Products   │
└──────────────┘                    └──────────────┘


┌──────────────┐
│    Users     │
└──────┬───────┘
       │
       │ 1 : N
       ▼
┌──────────────┐
│    Orders    │
└──────┬───────┘
       │
       │ 1 : N
       ▼
┌──────────────┐
│  OrderItems  │
└──────────────┘
```

---

# 3. Tables

The application requires six tables:

```text
users
products
carts
cart_items
orders
order_items
```

No additional tables are required for the assessment.

---

# 4. Users Table

Stores registered user accounts.

### Table: `users`

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID / INTEGER | Primary Key | Unique user ID |
| name | VARCHAR(100) | NOT NULL | User's name |
| email | VARCHAR(255) | NOT NULL, UNIQUE | User's email |
| password | VARCHAR(255) | NOT NULL | Hashed password |
| created_at | TIMESTAMP | NOT NULL | Account creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

### Requirements

- Email must be unique.
- Password must contain only the hashed password.
- Plain-text passwords must never be stored.

---

# 5. Products Table

Stores the products available to all users.

### Table: `products`

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID / INTEGER | Primary Key | Unique product ID |
| name | VARCHAR(255) | NOT NULL | Product name |
| price | DECIMAL(10,2) | NOT NULL | Product price |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

### Requirements

- At least 8 products must be inserted using seed data.
- Product prices must be positive.
- All users see the same products.

---

# 6. Carts Table

Stores one cart for each user.

### Table: `carts`

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID / INTEGER | Primary Key | Unique cart ID |
| user_id | UUID / INTEGER | Foreign Key, UNIQUE | Owner of the cart |
| created_at | TIMESTAMP | NOT NULL | Cart creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

### Relationship

```text
User 1 ───────── 1 Cart
```

### Requirement

Each user must have their own cart.

`user_id` must be unique so that a user cannot have multiple active carts.

---

# 7. Cart Items Table

Stores the products and quantities inside a user's cart.

### Table: `cart_items`

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID / INTEGER | Primary Key | Unique cart item ID |
| cart_id | UUID / INTEGER | Foreign Key | Cart ID |
| product_id | UUID / INTEGER | Foreign Key | Product ID |
| quantity | INTEGER | NOT NULL | Product quantity |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

### Relationships

```text
Cart 1 ───────── N CartItems

Product 1 ────── N CartItems
```

### Constraints

```text
quantity >= 1
```

A cart should not contain duplicate entries for the same product.

Recommended database constraint:

```text
UNIQUE(cart_id, product_id)
```

---

# 8. Orders Table

Stores submitted orders.

### Table: `orders`

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID / INTEGER | Primary Key | Unique order ID |
| user_id | UUID / INTEGER | Foreign Key | User who placed the order |
| total_amount | DECIMAL(10,2) | NOT NULL | Final order total |
| created_at | TIMESTAMP | NOT NULL | Order creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

### Relationship

```text
User 1 ───────── N Orders
```

An order belongs to exactly one user.

---

# 9. Order Items Table

Stores the products included in an order.

### Table: `order_items`

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID / INTEGER | Primary Key | Unique order item ID |
| order_id | UUID / INTEGER | Foreign Key | Order ID |
| product_id | UUID / INTEGER | Foreign Key | Original product ID |
| product_name | VARCHAR(255) | NOT NULL | Product name at order time |
| price | DECIMAL(10,2) | NOT NULL | Product price at order time |
| quantity | INTEGER | NOT NULL | Ordered quantity |
| line_total | DECIMAL(10,2) | NOT NULL | Price × quantity |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

### Relationship

```text
Order 1 ───────── N OrderItems
```

---

# 10. Order Price Snapshot

`order_items` stores the product name and price at the time the order is placed.

For example:

```text
Product price when ordered:
Wireless Mouse = ₹499
```

Order item:

```text
product_name = Wireless Mouse
price         = 499
quantity      = 2
line_total    = 998
```

If the product price changes later:

```text
Wireless Mouse = ₹599
```

the existing order must still show:

```text
Wireless Mouse
2 × ₹499
₹998
```

This ensures that historical order bills remain correct.

---

# 11. Relationships

## User → Cart

```text
User
  │
  │ 1 : 1
  ▼
Cart
```

A user owns one cart.

---

## Cart → Cart Items

```text
Cart
  │
  │ 1 : N
  ▼
CartItem
```

A cart can contain multiple products.

---

## Product → Cart Items

```text
Product
  │
  │ 1 : N
  ▼
CartItem
```

A product can exist in many users' carts.

---

## User → Orders

```text
User
  │
  │ 1 : N
  ▼
Order
```

A user can place multiple orders.

---

## Order → Order Items

```text
Order
  │
  │ 1 : N
  ▼
OrderItem
```

An order can contain multiple products.

---

# 12. Complete Relationship Diagram

```text
                         ┌──────────────┐
                         │    USERS     │
                         │──────────────│
                         │ id           │
                         │ name         │
                         │ email        │
                         │ password     │
                         └──────┬───────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                  1 : 1                   1 : N
                    │                       │
                    ▼                       ▼
             ┌──────────────┐       ┌──────────────┐
             │    CARTS     │       │    ORDERS    │
             │──────────────│       │──────────────│
             │ id           │       │ id           │
             │ user_id      │       │ user_id      │
             └──────┬───────┘       │ total_amount │
                    │               └──────┬───────┘
                  1 : N                    │
                    │                    1 : N
                    ▼                       ▼
             ┌──────────────┐       ┌──────────────┐
             │  CART_ITEMS  │       │ ORDER_ITEMS  │
             │──────────────│       │──────────────│
             │ id           │       │ id           │
             │ cart_id      │       │ order_id     │
             │ product_id   │       │ product_id   │
             │ quantity     │       │ product_name │
             └──────┬───────┘       │ price        │
                    │               │ quantity     │
                    │               │ line_total   │
                    │               └──────────────┘
                    │
                  N : 1
                    │
                    ▼
             ┌──────────────┐
             │   PRODUCTS   │
             │──────────────│
             │ id           │
             │ name         │
             │ price        │
             └──────────────┘
```

---

# 13. Foreign Keys

The following foreign keys must be maintained:

```text
carts.user_id
        ↓
users.id
```

```text
cart_items.cart_id
        ↓
carts.id
```

```text
cart_items.product_id
        ↓
products.id
```

```text
orders.user_id
        ↓
users.id
```

```text
order_items.order_id
        ↓
orders.id
```

```text
order_items.product_id
        ↓
products.id
```

---

# 14. Delete Behavior

The database should prevent orphan records.

Recommended behavior:

### User → Cart

If a user is deleted, their cart can be deleted.

```text
User deleted
    ↓
Cart deleted
    ↓
CartItems deleted
```

### Cart → CartItems

Deleting a cart should delete its cart items.

### Order → OrderItems

Deleting an order should delete its order items.

Orders should otherwise remain associated with their user and preserve their submitted billing information.

---

# 15. Cart Calculation

The application must calculate the cart total using:

```text
line_total = product_price × quantity
```

Then:

```text
grand_total = sum(all line_total)
```

Example:

```text
Wireless Mouse
₹499 × 2 = ₹998

USB Keyboard
₹799 × 1 = ₹799

Laptop Stand
₹1,200 × 1 = ₹1,200

Grand Total
₹998 + ₹799 + ₹1,200 = ₹2,997
```

The final amount must be calculated on the backend before creating the order.

---

# 16. Order Creation

When the user submits an order:

```text
Cart
  ↓
Read Cart Items
  ↓
Validate Products & Quantities
  ↓
Calculate Line Totals
  ↓
Calculate Grand Total
  ↓
Create Order
  ↓
Create Order Items
  ↓
Clear Cart
  ↓
Send Email
```

The order and order items should be created consistently so that a partially created order is avoided.

---

# 17. Data Integrity Requirements

The database must enforce:

- Unique user emails.
- One cart per user.
- Positive product prices.
- Quantity of at least 1.
- Unique product per cart.
- Valid foreign-key relationships.
- Non-null required fields.

---

# 18. Seed Data

The database must provide at least 8 sample products.

Example:

| Product | Price |
|---|---:|
| Wireless Mouse | ₹499 |
| USB Keyboard | ₹799 |
| Laptop Stand | ₹1,200 |
| Webcam | ₹1,499 |
| USB Hub | ₹699 |
| Headphones | ₹1,999 |
| Laptop Sleeve | ₹899 |
| Mechanical Keyboard | ₹2,499 |

The exact product names and prices may be changed, but at least 8 products must be available.

---

# 19. Database Environment

The database connection must use environment variables.

Example:

```env
DATABASE_URL=your_postgresql_connection_string
```

Database credentials must never be committed to GitHub.

---

# 20. Database Requirements Checklist

- [ ] PostgreSQL database configured.
- [ ] Users table created.
- [ ] Products table created.
- [ ] Carts table created.
- [ ] Cart items table created.
- [ ] Orders table created.
- [ ] Order items table created.
- [ ] User email is unique.
- [ ] One cart per user.
- [ ] Cart item quantity cannot be less than 1.
- [ ] Duplicate product entries in the same cart are prevented.
- [ ] Foreign-key relationships are configured.
- [ ] At least 8 products are seeded.
- [ ] Cart persists after logout/login.
- [ ] Order data is saved.
- [ ] Order item price snapshot is saved.
- [ ] Grand total is calculated correctly.
- [ ] Database credentials are stored in environment variables.
