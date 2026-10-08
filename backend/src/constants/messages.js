const ERROR_MESSAGES = {
  BAD_REQUEST: "Invalid request",
  UNAUTHORIZED: "Unauthorized",
  AUTHENTICATION_REQUIRED: "Authentication required",
  INVALID_TOKEN: "Invalid or expired authentication",
  INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
  DUPLICATE_EMAIL: "Email already registered",
  PRODUCT_NOT_FOUND: "Product not found",
  CART_ITEM_NOT_FOUND: "Cart item not found",
  CART_EMPTY: "Cart is empty",
  ORDER_NOT_FOUND: "Order not found",
  USER_NOT_FOUND: "User not found",
  INVALID_QUANTITY: "Quantity must be at least 1",
};

const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: "Registration successful",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  PROFILE_FETCHED: "Profile fetched successfully",
  PRODUCTS_FETCHED: "Products fetched successfully",
  PRODUCT_FETCHED: "Product fetched successfully",
  CART_FETCHED: "Cart fetched successfully",
  CART_ITEM_ADDED: "Product added to cart successfully",
  CART_ITEM_UPDATED: "Cart item updated successfully",
  CART_ITEM_REMOVED: "Cart item removed successfully",
  ORDER_CREATED: "Order created successfully",
  ORDERS_FETCHED: "Orders fetched successfully",
  ORDER_FETCHED: "Order fetched successfully",
};

module.exports = {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
