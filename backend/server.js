const app = require("./src/app");
const config = require("./config/config");
const { connectDB } = require("./config/db");

async function startServer() {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.info(`Server listening on port ${config.port}.`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exitCode = 1;
  }
}

startServer();