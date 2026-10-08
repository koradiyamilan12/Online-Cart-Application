const { Resend } = require("resend");
const config = require("./config");

// Keep email optional locally so an unavailable provider cannot prevent core
// order functionality from starting. The email service reports a controlled
// failure when these deployment variables have not been configured.
const resend = config.resendApiKey ? new Resend(config.resendApiKey) : null;

module.exports = resend;
