const CustomError = require("./customError");
const { StatusCodes } = require("http-status-codes");
const { ERROR_MESSAGES } = require("../constants/messages");

class BadRequestError extends CustomError {
  constructor(message = ERROR_MESSAGES.BAD_REQUEST, details) {
    super(message, StatusCodes.BAD_REQUEST, details);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = ERROR_MESSAGES.UNAUTHORIZED, details) {
    super(message, StatusCodes.UNAUTHORIZED, details);
  }
}

class ConflictError extends CustomError {
  constructor(message = ERROR_MESSAGES.DUPLICATE_EMAIL, details) {
    super(message, StatusCodes.CONFLICT, details);
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
};
