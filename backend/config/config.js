const path = require("node:path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const requiredVariables = [
  "DATABASE_URL",
  "JWT_SECRET",
  "RESEND_API_KEY",
  "EMAIL_FROM",
];

const missingVariables = requiredVariables.filter(
  (name) => !process.env[name]?.trim(),
);

if (missingVariables.length > 0) {
  throw new Error(
    `Missing required environment variable(s): ${missingVariables.join(", ")}. ` +
      "Set them in backend/.env or your environment.",
  );
}

const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535.");
}

module.exports = Object.freeze({
  databaseUrl: process.env.DATABASE_URL,
  emailFrom: process.env.EMAIL_FROM,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV ?? "development",
  port,
  resendApiKey: process.env.RESEND_API_KEY,
});
