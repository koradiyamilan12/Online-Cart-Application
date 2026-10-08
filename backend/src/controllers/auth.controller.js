const { StatusCodes } = require("http-status-codes");
const authService = require("../services/auth.service");
const { SUCCESS_MESSAGES } = require("../constants/messages");
const { generateAccessToken } = require("../utils/jwt");
const { setAuthCookie, clearAuthCookie } = require("../utils/authCookie.util");

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

async function register(req, res) {
  const user = await authService.register(req.body);
  const token = generateAccessToken(user.id);

  setAuthCookie(res, token);

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
    data: {
      user: sanitizeUser(user),
    },
  });
}

async function login(req, res) {
  const user = await authService.login(req.body);
  const token = generateAccessToken(user.id);

  setAuthCookie(res, token);

  return res.status(StatusCodes.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
    data: {
      user: sanitizeUser(user),
    },
  });
}

function logout(_req, res) {
  clearAuthCookie(res);

  return res.status(StatusCodes.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
  });
}

async function profile(req, res) {
  const user = await authService.getUserById(req.authenticatedUserId);

  return res.status(StatusCodes.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.PROFILE_FETCHED,
    data: {
      user: sanitizeUser(user),
    },
  });
}

module.exports = {
  register,
  login,
  logout,
  profile,
};
