const app = require("./src/app");
const config = require("./src/config/config");
const { connectDB } = require("./src/config/db");
const logger = require("./src/config/logger");

async function startServer() {
  try {
    await connectDB();
    app.listen(config.port, () => {
      logger.info("Server listening on port %d.", config.port);
    });
  } catch (error) {
    logger.error("Failed to start server: %s", error.message);
    process.exitCode = 1;
  }
}

startServer();
