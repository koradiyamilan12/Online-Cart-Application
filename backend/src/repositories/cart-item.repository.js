const { Op } = require("sequelize");
const CartItem = require("../models/cart-item.model");

async function findCartItem(cartId, productId, options = {}) {
  return CartItem.findOne({
    where: { cartId, productId },
    ...options,
  });
}

async function findCartItemById(cartItemId, cartId, options = {}) {
  return CartItem.findOne({
    where: { id: cartItemId, cartId },
    ...options,
  });
}

async function createCartItem(data, options = {}) {
  return CartItem.create(data, options);
}

async function updateCartItemQuantity(
  cartItemId,
  cartId,
  quantity,
  options = {},
) {
  return CartItem.update(
    { quantity },
    {
      where: { id: cartItemId, cartId },
      ...options,
    },
  );
}

async function adjustCartItemQuantity(
  cartItemId,
  cartId,
  amount,
  options = {},
) {
  if (amount > 0) {
    await CartItem.increment("quantity", {
      by: amount,
      where: { id: cartItemId, cartId },
      ...options,
    });
    return;
  }

  if (amount < 0) {
    await CartItem.decrement("quantity", {
      by: 1,
      where: {
        id: cartItemId,
        cartId,
        quantity: { [Op.gt]: 1 },
      },
      ...options,
    });
  }
}

async function deleteCartItem(cartItemId, cartId, options = {}) {
  return CartItem.destroy({
    where: { id: cartItemId, cartId },
    ...options,
  });
}

async function deleteAllCartItems(cartId, options = {}) {
  return CartItem.destroy({
    where: { cartId },
    ...options,
  });
}

module.exports = {
  findCartItem,
  findCartItemById,
  createCartItem,
  updateCartItemQuantity,
  adjustCartItemQuantity,
  deleteCartItem,
  deleteAllCartItems,
};
