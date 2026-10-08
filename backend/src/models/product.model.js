const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        notBlank(value) {
          if (value.trim().length === 0) {
            throw new Error("Product name cannot be empty");
          }
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.01,
      },
    },
  },
  {
    tableName: "products",
    timestamps: true,
    underscored: true,
  },
);

module.exports = Product;
