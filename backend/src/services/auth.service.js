const { hashPassword, comparePassword } = require("../utils/hashPassword");
const UserRepository = require("../repositories/user.repository");
const { ERROR_MESSAGES } = require("../constants/messages");
const { ConflictError, UnauthorizedError } = require("../utils/errors");

async function register({ name, email, password }) {
  const normalizedEmail = String(email).trim().toLowerCase();
  const existingUser = await UserRepository.findByEmail(normalizedEmail);

  if (existingUser) {
    throw new ConflictError();
  }

  const hashedPassword = await hashPassword(password);
  try {
    return await UserRepository.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new ConflictError();
    }
    throw error;
  }
}

async function login({ email, password }) {
  const normalizedEmail = String(email).trim().toLowerCase();
  const user = await UserRepository.findByEmail(normalizedEmail);

  if (!user) {
    throw new UnauthorizedError(ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD);
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError(ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD);
  }

  return user;
}

async function getUserById(userId) {
  const user = await UserRepository.findById(userId);

  if (!user) {
    throw new UnauthorizedError(ERROR_MESSAGES.INVALID_TOKEN);
  }

  return user;
}

module.exports = {
  register,
  login,
  getUserById,
};
