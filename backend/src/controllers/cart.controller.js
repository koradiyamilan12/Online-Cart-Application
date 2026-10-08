const { StatusCodes } = require("http-status-codes");
const cartService = require("../services/cart.service");
const { SUCCESS_MESSAGES } = require("../constants/messages");

async function getCart(req, res) {
  const cart = await cartService.getCartService(req.authenticatedUserId);

  return res.status(StatusCodes.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.CART_FETCHED,
    data: cart,
  });
}

async function addToCart(req, res) {
  const { productId, quantity } = req.body;
  const cart = await cartService.addToCartService(
    req.authenticatedUserId,
    productId,
    quantity,
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.CART_ITEM_ADDED,
    data: cart,
  });
}

async function increaseCartItem(req, res) {
  const cart = await cartService.increaseCartItemService(
    req.authenticatedUserId,
    req.params.cartItemId,
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.CART_ITEM_UPDATED,
    data: cart,
  });
}

async function decreaseCartItem(req, res) {
  const cart = await cartService.decreaseCartItemService(
    req.authenticatedUserId,
    req.params.cartItemId,
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.CART_ITEM_UPDATED,
    data: cart,
  });
}

async function removeCartItem(req, res) {
  const cart = await cartService.removeCartItemService(
    req.authenticatedUserId,
    req.params.cartItemId,
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.CART_ITEM_REMOVED,
    data: cart,
  });
}

module.exports = {
  getCart,
  addToCart,
  increaseCartItem,
  decreaseCartItem,
  removeCartItem,
};
