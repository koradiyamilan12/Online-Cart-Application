const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

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
    console.error("Unhandled request error:", error.message);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(isClientError && error.details ? { details: error.details } : {}),
  });
});

module.exports = app;
