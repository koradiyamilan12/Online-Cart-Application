const {
  sequelize,
  ensureUuidProductIds,
  restoreProductForeignKey,
} = require("../config/db");
const Product = require("../models/product.model");
const logger = require("../config/logger");

const products = [
  { name: "Wireless Mouse", price: "499.00" },
  { name: "USB Keyboard", price: "799.00" },
  { name: "Laptop Stand", price: "1200.00" },
  { name: "USB-C Hub", price: "999.00" },
  { name: "Webcam", price: "1499.00" },
  { name: "Mechanical Keyboard", price: "2499.00" },
  { name: "Wireless Headphones", price: "1999.00" },
  { name: "Desk Lamp", price: "899.00" },
];

async function seedProducts() {
  await sequelize.authenticate();
  await ensureUuidProductIds();
  await Product.sync({ alter: true });
  await restoreProductForeignKey("cart_items");
  await restoreProductForeignKey("order_items");

  const existingProducts = await Product.findAll({
    attributes: ["name"],
    where: { name: products.map(({ name }) => name) },
  });
  const existingNames = new Set(existingProducts.map(({ name }) => name));
  const missingProducts = products.filter(({ name }) => !existingNames.has(name));

  if (missingProducts.length > 0) {
    await Product.bulkCreate(missingProducts, { validate: true });
  }

  logger.info(
    missingProducts.length === 0
      ? "Product seed data is already present; no rows added."
      : `Seeded ${missingProducts.length} product(s).`,
  );
}

seedProducts()
  .catch((error) => {
    logger.error("Failed to seed products: %s", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
