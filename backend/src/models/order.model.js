const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users",
        key: "id",
      },
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "total_amount",
      validate: {
        isDecimal: true,
        min: 0.01,
      },
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    underscored: true,
  },
);

module.exports = Order;
