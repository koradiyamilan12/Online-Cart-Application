const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const logger = require("./config/logger");

const allowedOrigins = new Set(
  [
    process.env.CORS_ORIGINS,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ]
    .flatMap((value) =>
      (value ?? "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    )
    .filter(Boolean),
);

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((error, _req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const requestedStatus = error.statusCode || error.status;
  const statusCode =
    Number.isInteger(requestedStatus) &&
    requestedStatus >= 400 &&
    requestedStatus <= 599
      ? requestedStatus
      : 500;
  const isClientError = statusCode >= 400 && statusCode < 500;
  const message =
    error.type === "entity.parse.failed"
      ? "Invalid JSON request body"
      : isClientError
        ? error.message
        : "Internal server error";

  if (!isClientError) {
    logger.error("Unhandled request error: %s", error.message);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(isClientError && error.details ? { details: error.details } : {}),
  });
});

module.exports = app;
