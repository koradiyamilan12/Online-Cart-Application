const jwt = require("jsonwebtoken");
const config = require("../../config/config");

function generateAccessToken(userId) {
  return jwt.sign({ sub: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
