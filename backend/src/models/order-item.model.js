const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "order_id",
      references: {
        model: "orders",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "product_id",
      references: {
        model: "products",
        key: "id",
      },
    },
    productName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "product_name",
      validate: {
        notEmpty: true,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "unit_price",
      validate: {
        isDecimal: true,
        min: 0.01,
      },
    },
    lineTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "line_total",
      validate: {
        isDecimal: true,
        min: 0.01,
      },
    },
  },
  {
    tableName: "order_items",
    timestamps: true,
    underscored: true,
    validate: {
      quantityIsPositive() {
        if (!Number.isInteger(this.quantity) || this.quantity < 1) {
          throw new Error("Quantity must be at least 1");
        }
      },
    },
  },
);

module.exports = OrderItem;
