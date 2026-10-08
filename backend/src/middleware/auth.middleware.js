const { UnauthorizedError } = require("../utils/errors");
const { verifyAccessToken } = require("../utils/jwt");
const { ERROR_MESSAGES } = require("../constants/messages");

function authenticate(req, _res, next) {
  const token = req.cookies?.access_token;

  if (!token) {
    return next(new UnauthorizedError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED));
  }

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch {
    return next(new UnauthorizedError(ERROR_MESSAGES.INVALID_TOKEN));
  }

  const subject = decoded.sub;
  const numericUserId = Number(subject);
  const isNumericUserId =
    Number.isSafeInteger(numericUserId) && numericUserId > 0;
  const isUuidUserId =
    typeof subject === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      subject,
    );

  if (!isNumericUserId && !isUuidUserId) {
    return next(new UnauthorizedError(ERROR_MESSAGES.INVALID_TOKEN));
  }

  req.authenticatedUserId = isUuidUserId ? subject : numericUserId;
  return next();
}

module.exports = authenticate;
