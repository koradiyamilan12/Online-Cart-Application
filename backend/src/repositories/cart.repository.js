const { Cart, CartItem, Product } = require("../models/associations");

async function findCartByUserId(userId, options = {}) {
  return Cart.findOne({
    where: { userId },
    ...options,
  });
}

async function createCart(userId, options = {}) {
  return Cart.create({ userId }, options);
}

async function findCartById(cartId, options = {}) {
  return Cart.findByPk(cartId, options);
}

async function findOrCreateCartByUserId(userId, options = {}) {
  return Cart.findOrCreate({
    where: { userId },
    defaults: { userId },
    ...options,
  });
}

async function findCartWithItemsByUserId(userId, options = {}) {
  return Cart.findOne({
    where: { userId },
    include: [
      {
        model: CartItem,
        include: [{ model: Product, attributes: ["id", "name", "price"] }],
      },
    ],
    ...options,
  });
}

async function clearCart(cartId, transaction) {
  return CartItem.destroy({
    where: { cartId },
    transaction,
  });
}

module.exports = {
  findCartByUserId,
  createCart,
  findCartById,
  findOrCreateCartByUserId,
  findCartWithItemsByUserId,
  clearCart,
};
