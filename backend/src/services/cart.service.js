const { sequelize } = require("../config/db");
const { UniqueConstraintError } = require("sequelize");
const {
  findOrCreateCartByUserId,
  findCartWithItemsByUserId,
} = require("../repositories/cart.repository");
const {
  findCartItem,
  findCartItemById,
  createCartItem,
  adjustCartItemQuantity,
  deleteCartItem,
} = require("../repositories/cart-item.repository");
const { findProductById } = require("../repositories/product.repository");
const { ERROR_MESSAGES } = require("../constants/messages");
const { NotFoundError } = require("../utils/errors");

function formatCents(cents) {
  const whole = cents / 100n;
  const fraction = String(cents % 100n).padStart(2, "0");
  return `${whole}.${fraction}`;
}

function priceToCents(price) {
  const match = /^(\d+)(?:\.(\d{1,2}))?$/.exec(String(price));

  if (!match) {
    throw new Error("Invalid product price stored in database");
  }

  return BigInt(match[1]) * 100n + BigInt((match[2] ?? "").padEnd(2, "0"));
}

function serializeCart(cart) {
  let grandTotalCents = 0n;
  const items = cart.CartItems.map((item) => {
    const price = String(item.Product.price);
    const lineTotalCents = priceToCents(price) * BigInt(item.quantity);
    grandTotalCents += lineTotalCents;

    return {
      id: item.id,
      productId: item.productId,
      name: item.Product.name,
      quantity: item.quantity,
      price,
      lineTotal: formatCents(lineTotalCents),
    };
  });

  return {
    id: cart.id,
    items,
    grandTotal: formatCents(grandTotalCents),
  };
}

async function getOrCreateCart(userId) {
  await findOrCreateCartByUserId(userId);
}

async function getCartService(userId) {
  await getOrCreateCart(userId);
  const cart = await findCartWithItemsByUserId(userId);
  return serializeCart(cart);
}

async function addItemInTransaction(userId, productId, quantity) {
  return sequelize.transaction(async (transaction) => {
    const [cart] = await findOrCreateCartByUserId(userId, { transaction });
    const existingItem = await findCartItem(cart.id, productId, {
      transaction,
    });

    if (existingItem) {
      await adjustCartItemQuantity(existingItem.id, cart.id, quantity, {
        transaction,
      });
    } else {
      await createCartItem(
        { cartId: cart.id, productId, quantity },
        { transaction },
      );
    }
  });
}

async function addToCartService(userId, productId, quantity) {
  const product = await findProductById(productId);

  if (!product) {
    throw new NotFoundError(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
  }

  try {
    await addItemInTransaction(userId, productId, quantity);
  } catch (error) {
    if (!(error instanceof UniqueConstraintError)) {
      throw error;
    }

    await addItemInTransaction(userId, productId, quantity);
  }

  return getCartService(userId);
}

async function updateCartItemService(userId, cartItemId, amount) {
  const cart = await findOrCreateCartByUserId(userId).then(
    ([userCart]) => userCart,
  );
  const cartItem = await findCartItemById(cartItemId, cart.id);

  if (!cartItem) {
    throw new NotFoundError(ERROR_MESSAGES.CART_ITEM_NOT_FOUND);
  }

  await adjustCartItemQuantity(cartItemId, cart.id, amount);
  return getCartService(userId);
}

async function increaseCartItemService(userId, cartItemId) {
  return updateCartItemService(userId, cartItemId, 1);
}

async function decreaseCartItemService(userId, cartItemId) {
  return updateCartItemService(userId, cartItemId, -1);
}

async function removeCartItemService(userId, cartItemId) {
  const [cart] = await findOrCreateCartByUserId(userId);
  const deletedCount = await deleteCartItem(cartItemId, cart.id);

  if (deletedCount === 0) {
    throw new NotFoundError(ERROR_MESSAGES.CART_ITEM_NOT_FOUND);
  }

  return getCartService(userId);
}

module.exports = {
  getCartService,
  addToCartService,
  increaseCartItemService,
  decreaseCartItemService,
  removeCartItemService,
};
