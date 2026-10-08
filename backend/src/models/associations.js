const User = require("./User");
const Product = require("./product.model");
const Cart = require("./cart.model");
const CartItem = require("./cart-item.model");
const Order = require("./order.model");
const OrderItem = require("./order-item.model");

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

User.hasMany(Order, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Order.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Product.hasMany(OrderItem, {
  foreignKey: "productId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
OrderItem.belongsTo(Product, {
  foreignKey: "productId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

module.exports = { User, Product, Cart, CartItem, Order, OrderItem };
