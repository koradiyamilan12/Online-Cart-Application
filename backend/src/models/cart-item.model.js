const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "cart_id",
      references: {
        model: "carts",
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  {
    tableName: "cart_items",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["cart_id", "product_id"],
      },
    ],
    validate: {
      quantityIsPositive() {
        if (!Number.isInteger(this.quantity) || this.quantity < 1) {
          throw new Error("Quantity must be at least 1");
        }
      },
    },
  },
);

module.exports = CartItem;
