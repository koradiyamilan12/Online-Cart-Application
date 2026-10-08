const { sequelize } = require("../config/db");
const {
  findCartWithItemsByUserId,
  clearCart,
} = require("../repositories/cart.repository");
const {
  createOrder,
  findOrderById,
  findOrdersByUserId,
} = require("../repositories/order.repository");
const { createOrderItems } = require("../repositories/order-item.repository");
const { ERROR_MESSAGES } = require("../constants/messages");
const { BadRequestError, NotFoundError } = require("../utils/errors");

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

function validateCartItem(item) {
  if (!item.Product) {
    throw new NotFoundError(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
  }

  if (!Number.isSafeInteger(item.quantity) || item.quantity < 1) {
    throw new BadRequestError(ERROR_MESSAGES.INVALID_QUANTITY);
  }
}

function buildOrderItems(cartItems) {
  let totalCents = 0n;
  const items = cartItems.map((cartItem) => {
    validateCartItem(cartItem);

    const unitPriceCents = priceToCents(cartItem.Product.price);
    const lineTotalCents = unitPriceCents * BigInt(cartItem.quantity);
    totalCents += lineTotalCents;

    return {
      productId: cartItem.Product.id,
      productName: cartItem.Product.name,
      quantity: cartItem.quantity,
      unitPrice: formatCents(unitPriceCents),
      lineTotal: formatCents(lineTotalCents),
    };
  });

  return { items, totalAmount: formatCents(totalCents) };
}

function serializeOrderItem(item) {
  return {
    productName: item.productName,
    quantity: item.quantity,
    unitPrice: String(item.unitPrice),
    lineTotal: String(item.lineTotal),
  };
}

function serializeOrder(order) {
  return {
    id: order.id,
    items: order.OrderItems.map(serializeOrderItem),
    totalAmount: String(order.totalAmount),
    createdAt: order.createdAt,
  };
}

async function submitOrderService(userId) {
  return sequelize.transaction(async (transaction) => {
    const cart = await findCartWithItemsByUserId(userId, { transaction });

    if (!cart || cart.CartItems.length === 0) {
      throw new BadRequestError(ERROR_MESSAGES.CART_EMPTY);
    }

    const { items, totalAmount } = buildOrderItems(cart.CartItems);
    const order = await createOrder(
      { userId, totalAmount },
      transaction,
    );
    const orderItems = items.map((item) => ({ ...item, orderId: order.id }));

    await createOrderItems(orderItems, transaction);
    await clearCart(cart.id, transaction);

    return {
      id: order.id,
      items: orderItems.map(serializeOrderItem),
      totalAmount,
    };
  });
}

async function getOrderService(userId, orderId) {
  const order = await findOrderById(orderId, userId);

  if (!order) {
    throw new NotFoundError(ERROR_MESSAGES.ORDER_NOT_FOUND);
  }

  return serializeOrder(order);
}

async function getOrdersService(userId) {
  const orders = await findOrdersByUserId(userId);

  return orders.map((order) => ({
    id: order.id,
    totalAmount: String(order.totalAmount),
    createdAt: order.createdAt,
  }));
}

module.exports = {
  submitOrderService,
  getOrderService,
  getOrdersService,
};
