const ERROR_MESSAGES = {
  BAD_REQUEST: "Invalid request",
  UNAUTHORIZED: "Unauthorized",
  AUTHENTICATION_REQUIRED: "Authentication required",
  INVALID_TOKEN: "Invalid or expired authentication",
  INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
  DUPLICATE_EMAIL: "Email already registered",
};

const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: "Registration successful",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  PROFILE_FETCHED: "Profile fetched successfully",
};

module.exports = {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
