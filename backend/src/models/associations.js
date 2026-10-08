const User = require("./User");
const Product = require("./product.model");
const Cart = require("./cart.model");
const CartItem = require("./cart-item.model");

User.hasOne(Cart, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Cart.belongsTo(User, {
  foreignKey: "userId",
});

Cart.hasMany(CartItem, {
  foreignKey: "cartId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
CartItem.belongsTo(Cart, {
  foreignKey: "cartId",
});

Product.hasMany(CartItem, {
  foreignKey: "productId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
CartItem.belongsTo(Product, {
  foreignKey: "productId",
});

module.exports = { User, Product, Cart, CartItem };
