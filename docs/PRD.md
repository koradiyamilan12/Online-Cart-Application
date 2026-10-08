# Product Requirements Document (PRD)

## Online Cart Application

**Assessment:** AMEX Technology — Junior Developer Technical Assessment
**Project Type:** One-Day Technical Assessment
**Version:** 1.0

---

# 1. Product Overview

The Online Cart Application is a simple shopping web application where users can:

1. Register an account.
2. Log in to their account.
3. View a list of products.
4. Add products to their cart.
5. Increase or decrease product quantities.
6. Remove products from their cart.
7. View the complete cart bill.
8. Submit an order.
9. Receive the order summary by email.

Each user must have their own cart, and users must never be able to view or modify another user's cart.

---

# 2. Objective

The objective of this project is to demonstrate the ability to build and deploy a functional web application with:

- User authentication
- Password hashing
- Database persistence
- Product listing
- Shopping cart management
- Correct price calculations
- Order creation
- Email delivery
- Error handling
- Responsive user interface
- Production deployment

The complete application must work from registration/login through order submission and email delivery.

---

# 3. Technology Requirements

The technology stack is flexible.

### Required Application Components

- Frontend web application
- Backend/API
- SQL or NoSQL database
- Email service
- Public deployment
- GitHub repository

### Selected Stack

| Area | Technology |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| Language | JavaScript |
| Backend | Node.js |
| API Framework | Express.js |
| Database | PostgreSQL |
| ORM | Sequelize |
| Validation | Zod |
| Authentication | JWT |
| Password Hashing | bcrypt |
| Authentication Storage | HTTP-only cookies |
| Email | Resend |

---

# 4. User Roles

The application has only one user type:

### Customer

A customer can:

- Register
- Log in
- View products
- Manage their own cart
- Submit an order
- Receive their order summary by email

No admin functionality is required.

---

# 5. Authentication Requirements

## 5.1 Registration

A new user must be able to create an account.

Required information:

- Name
- Email
- Password

### Requirements

- Email must be unique.
- Password must never be stored as plain text.
- Password must be hashed before being stored in the database.
- Invalid registration data must be rejected.
- Duplicate email addresses must return a clear error.

---

## 5.2 Login

A registered user must be able to log in using:

- Email
- Password

### Requirements

- Credentials must be validated.
- Password must be verified against the stored password hash.
- Successful authentication must create an authenticated session.
- Authentication credentials must use HTTP-only cookies.
- Wrong credentials must return a clear error message.

Example:

```text
Invalid email or password.
```

---

## 5.3 Protected Pages

The following pages require authentication:

- Dashboard/Product page
- Cart page

Unauthenticated users must not be able to access protected cart or dashboard functionality.

---

## 5.4 User Cart Isolation

Every user must have their own cart.

A user:

- Must only see their own cart.
- Must only modify their own cart.
- Must never be able to access another user's cart.

---

# 6. Product Requirements

The application must contain **at least 8 sample products**.

Each product must have:

- Product name
- Price

Product data must be added using:

- A seed script, or
- Database import

All users must see the same products.

---

# 7. Dashboard Requirements

After successful login, the user must see the available products.

Each product should display:

- Product name
- Price
- Add to Cart action

The dashboard must allow the user to add products to their cart.

---

# 8. Cart Requirements

The cart must be persisted in the database.

The cart must remain available after:

```text
Logout
↓
Login again
```

---

## 8.1 Add Product

The user must be able to add a product to their cart.

If the product already exists in the cart, the quantity should be increased rather than creating an unnecessary duplicate cart item.

---

## 8.2 Increase Quantity

The user must be able to increase the quantity of a cart item.

Example:

```text
Wireless Mouse
Quantity: 1

↓ Increase

Quantity: 2
```

---

## 8.3 Decrease Quantity

The user must be able to decrease the quantity of a cart item.

Quantity must never become invalid.

---

## 8.4 Remove Product

The user must be able to completely remove a product from their cart.

---

## 8.5 Invalid Quantity

The application must reject invalid quantities.

Examples:

```text
0
-1
negative values
invalid values
```

A clear error message must be displayed.

Example:

```text
Quantity must be at least 1.
```

---

# 9. Cart Billing Requirements

The cart page must display:

- Product name
- Quantity
- Price
- Line total
- Grand total

### Line Total

```text
Line Total = Product Price × Quantity
```

Example:

```text
Wireless Mouse
Quantity: 2
Price: ₹499

Line Total = ₹499 × 2
           = ₹998
```

### Grand Total

```text
Grand Total = Sum of all line totals
```

Example:

```text
Wireless Mouse     2 × ₹499   = ₹998
USB Keyboard       1 × ₹799   = ₹799
Laptop Stand       1 × ₹1200  = ₹1200

Grand Total = ₹2997
```

All calculations must be correct.

---

# 10. Empty Cart Requirements

A user must not be able to submit an empty cart.

If the cart contains no products, the application must show a clear error.

Example:

```text
Your cart is empty.
```

---

# 11. Order Submission Requirements

When the user submits their cart:

1. Validate that the user is authenticated.
2. Validate that the cart is not empty.
3. Validate the cart items.
4. Calculate the correct totals.
5. Create and save the order.
6. Save the order items.
7. Clear the user's cart.
8. Send the order summary to the user's registered email address.

---

# 12. Order Data Requirements

An order must contain enough information to preserve the submitted bill.

Each order item must contain:

- Product name
- Quantity
- Price
- Line total

The order must contain:

- User
- Grand total
- Order items
- Creation date/time

The submitted order information must remain available in the database after the cart is cleared.

---

# 13. Email Requirements

After a successful order submission, an email must be sent to the user's registered email address.

### Email Subject

```text
Your order summary
```

### Email Content

The email must contain:

- Customer name
- Product name
- Quantity
- Price
- Line total
- Grand total

Example:

```text
Subject: Your order summary

Hi Priya, thanks for your order. Here is your bill:

Product            Qty    Price       Total
Wireless Mouse      2     ₹499        ₹998
USB Keyboard        1     ₹799        ₹799
Laptop Stand        1     ₹1,200      ₹1,200

Grand total: ₹2,997
```

---

# 14. Email Failure Handling

Email failure must not crash the application.

If:

```text
Order creation → successful
Cart clearing → successful
Email sending → failed
```

The application must continue to work normally.

The order must remain saved in the database.

The user should receive a clear message indicating that the order was placed but the email could not be sent.

---

# 15. Error Handling Requirements

The application must provide clear error messages for at least:

### Authentication

```text
Wrong password
Invalid login credentials
Duplicate email
```

### Cart

```text
Empty cart
Invalid quantity
Product not found
```

### Authorization

```text
Authentication required
```

### Order

```text
Cannot submit an empty cart
```

Errors must not expose sensitive information such as:

- Passwords
- API keys
- Database credentials
- Email credentials

---

# 16. Database Requirements

The application must persist:

- Users
- Products
- Carts
- Cart items
- Orders
- Order items

The database must maintain the relationship between:

```text
User
 ↓
Cart
 ↓
Cart Items
 ↓
Products
```

and:

```text
User
 ↓
Orders
 ↓
Order Items
```

A user's cart and orders must belong only to that user.

---

# 17. User Flow

The complete expected flow is:

```text
Open Application
       ↓
Register
       ↓
Login
       ↓
Dashboard
       ↓
View Products
       ↓
Add Product to Cart
       ↓
Open Cart
       ↓
Increase / Decrease Quantity
       ↓
Remove Product if Required
       ↓
Review Bill
       ↓
Submit Order
       ↓
Save Order
       ↓
Clear Cart
       ↓
Send Email
       ↓
Order Completed
```

---

# 18. Persistence Requirement

The cart must be stored in the database.

Example:

```text
User logs in
     ↓
Adds products
     ↓
Logs out
     ↓
Logs in again
     ↓
Previous cart is still available
```

The cart must not depend only on browser memory or temporary frontend state.

---

# 19. UI/UX Requirements

The design is flexible, but the application should be:

- Clean
- Easy to understand
- Well-spaced
- Responsive
- Usable on desktop
- Usable on mobile

The interface should clearly present:

- Products
- Prices
- Add to Cart actions
- Cart quantities
- Line totals
- Grand total
- Order submission

Clear loading and error states should be provided where necessary.

---

# 20. Deployment Requirements

The application must be publicly accessible.

The deployed application must allow the evaluator to:

1. Open the application.
2. Register a new account.
3. Log in.
4. View products.
5. Add products to cart.
6. Modify quantities.
7. Remove products.
8. View the correct bill.
9. Submit the order.
10. Receive the order summary email.

---

# 21. GitHub Requirements

The project must be available on GitHub.

The repository should contain:

- Source code
- README
- Environment variable example
- Database setup/seed information
- Clear commit history

Secrets must never be committed.

The following must not be stored in Git:

```text
API keys
Passwords
Database credentials
Email credentials
JWT secrets
```

---

# 22. Environment Variables

Sensitive configuration must be provided through environment variables.

Example:

```env
DATABASE_URL=
JWT_SECRET=
RESEND_API_KEY=
EMAIL_FROM=
```

Actual credentials must not be included in the repository.

---

# 23. Seed Data Requirements

The project must provide at least **8 sample products**.

The evaluator must be able to populate the products using the provided seed script or database import.

Example products:

```text
Wireless Mouse
USB Keyboard
Laptop Stand
Webcam
USB Hub
Mechanical Keyboard
Headphones
Laptop Sleeve
```

---

# 24. Acceptance Criteria

The project is considered complete when all of the following work:

### Authentication

- [ ] User can register.
- [ ] Password is hashed.
- [ ] User can log in.
- [ ] Wrong password shows an error.
- [ ] Duplicate email shows an error.
- [ ] Protected pages require login.

### Products

- [ ] At least 8 products exist.
- [ ] Products are stored in the database.
- [ ] All users see the same products.

### Cart

- [ ] User can add a product.
- [ ] User can increase quantity.
- [ ] User can decrease quantity.
- [ ] User can remove a product.
- [ ] Invalid quantity is rejected.
- [ ] Cart is saved in the database.
- [ ] Cart remains after logout/login.
- [ ] Users cannot access another user's cart.

### Billing

- [ ] Product name is displayed.
- [ ] Quantity is displayed.
- [ ] Price is displayed.
- [ ] Line total is correct.
- [ ] Grand total is correct.
- [ ] Empty cart cannot be submitted.

### Order

- [ ] Order is saved.
- [ ] Order items are saved.
- [ ] Cart is cleared after submission.
- [ ] Correct total is saved.

### Email

- [ ] Email is sent to the user's registered email.
- [ ] Email contains order summary.
- [ ] Email contains grand total.
- [ ] Email failure does not crash the application.

### Deployment

- [ ] Application is publicly accessible.
- [ ] Complete flow works on the deployed application.
- [ ] GitHub repository is available.
- [ ] Secrets are not committed.

---

# 25. Final Deliverables

The final submission must provide:

### 1. GitHub Repository

A repository containing the complete source code.

### 2. Live Application

A publicly accessible deployed application.

### 3. Test Login

A test account that can be used to verify the application.

Example:

```text
Email: test@example.com
Password: ********
```

### 4. Short Completion Note

The submission should briefly mention:

- What was completed.
- What would be improved next, if anything remains.

---

# 26. Scope

Only the requirements described in this PRD are part of the assessment.

The implementation should prioritize:

```text
Working functionality
        ↓
Correct data
        ↓
Correct billing
        ↓
Email delivery
        ↓
Error handling
        ↓
Responsive UI
        ↓
Deployment
```

The application should remain focused on the required online cart workflow.
