const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(config.databaseUrl, {
  dialect: "postgres",
  logging: false,
});

async function queryRows(sql) {
  const [rows] = await sequelize.query(sql);
  return rows;
}

async function getColumnType(tableName, columnName) {
  const rows = await queryRows(`
    SELECT data_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = '${tableName}'
      AND column_name = '${columnName}'
  `);

  return rows[0]?.data_type ?? null;
}

async function tableExists(tableName) {
  const rows = await queryRows(`
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = '${tableName}'
  `);

  return rows.length > 0;
}

async function restoreProductForeignKey(tableName) {
  if (!(await tableExists(tableName))) {
    return;
  }

  const productIdType = await getColumnType(tableName, "product_id");

  if (productIdType && productIdType !== "uuid") {
    await sequelize.query(
      `ALTER TABLE ${tableName} DROP CONSTRAINT IF EXISTS ${tableName}_product_id_fkey`,
    );
    await sequelize.query(`ALTER TABLE ${tableName} DROP COLUMN product_id`);
  }

  if (!(await getColumnType(tableName, "product_id"))) {
    await sequelize.query(`ALTER TABLE ${tableName} ADD COLUMN product_id UUID`);
    await sequelize.query(`
      ALTER TABLE ${tableName}
      ADD CONSTRAINT ${tableName}_product_id_fkey
      FOREIGN KEY (product_id) REFERENCES products(id)
      ON UPDATE CASCADE ON DELETE RESTRICT
    `);
  }
}

async function ensureUuidProductIds() {
  const productsIdType = await getColumnType("products", "id");

  if (productsIdType && productsIdType !== "uuid") {
    await sequelize.query(
      "ALTER TABLE IF EXISTS cart_items DROP CONSTRAINT IF EXISTS cart_items_product_id_fkey",
    );
    await sequelize.query(
      "ALTER TABLE IF EXISTS order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey",
    );
    await sequelize.query("ALTER TABLE IF EXISTS cart_items DROP COLUMN IF EXISTS product_id");
    await sequelize.query("ALTER TABLE IF EXISTS order_items DROP COLUMN IF EXISTS product_id");
    await sequelize.query("DROP TABLE IF EXISTS products");
  }
}

async function connectDB() {
  try {
    await sequelize.authenticate();
    await ensureUuidProductIds();
    await sequelize.sync({ alter: true });
    await restoreProductForeignKey("cart_items");
    await restoreProductForeignKey("order_items");
    console.info("Database connection established.");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw error;
  }
}

module.exports = { connectDB, sequelize, ensureUuidProductIds, restoreProductForeignKey };
