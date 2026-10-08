const config = require("../../config/config");

const cookieOptions = {
  httpOnly: true,
  path: "/",
  sameSite: config.nodeEnv === "production" ? "none" : "lax",
  secure: config.nodeEnv === "production",
  maxAge: 24 * 60 * 60 * 1000,
};

function setAuthCookie(res, token) {
  res.cookie("access_token", token, cookieOptions);
  return res;
}

function clearAuthCookie(res) {
  const clearOptions = { ...cookieOptions };
  delete clearOptions.maxAge;
  res.clearCookie("access_token", clearOptions);

  return res;
}

module.exports = {
  setAuthCookie,
  clearAuthCookie,
};
