const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(config.databaseUrl, {
  dialect: "postgres",
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.sync({ alter: true });
    console.info("Database connection established.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
  await sequelize.authenticate();
}

module.exports = { connectDB, sequelize };
