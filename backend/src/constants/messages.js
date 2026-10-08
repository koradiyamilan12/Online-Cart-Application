const STATUS = {
  OK: "success",
  CREATED: "success",
  UPDATED: "success",
  DELETED: "success",
  BAD_REQUEST: "error",
  UNAUTHORIZED: "error",
  FORBIDDEN: "error",
  MAIL_ERROR: "error",
  NOT_FOUND: "error",
  ERROR: "error",
};

const ERROR_MESSAGES = {
  USER_NOT_FOUND: "User not found",
  PRODUCT_NOT_FOUND: "Product not found",
  CART_ITEM_NOT_FOUND: "Cart item not found",
  BAD_REQUEST: "Invalid request",
  UNAUTHORIZED: "Unauthorized",
  AUTHENTICATION_REQUIRED: "Authentication required",
  INVALID_TOKEN: "Invalid or expired authentication",
  FORBIDDEN: "Access forbidden",
  EMAIL_SEND_ERROR: "Failed to send email",
  CART_EMPTY: "Your cart is empty",
  VALIDATION_FAILED: "Validation failed",
  INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
  DUPLICATE_EMAIL: "Email already registered",
  QUANTITY_INVALID: "Quantity must be at least 1",
  INVALID_INPUT: "Invalid input",
};

const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: "Registration successful",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  PRODUCT_ADDED_TO_CART: "Product added to cart",
  CART_UPDATED: "Cart updated successfully",
  PRODUCT_REMOVED_FROM_CART: "Product removed from cart",
  ORDER_PLACED: "Order placed successfully",
  ORDER_PLACED_EMAIL_FAILED: "Order placed successfully, but the order email could not be sent",
};

module.exports = {
  STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
