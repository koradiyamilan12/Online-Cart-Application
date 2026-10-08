const { Order, OrderItem } = require("../models/associations");

async function createOrder(data, transaction) {
  return Order.create(data, { transaction });
}

async function findOrderById(orderId, userId) {
  return Order.findOne({
    where: { id: orderId, userId },
    include: [
      {
        model: OrderItem,
        attributes: [
          "id",
          "productId",
          "productName",
          "quantity",
          "unitPrice",
          "lineTotal",
        ],
      },
    ],
    order: [[OrderItem, "id", "ASC"]],
  });
}

async function findOrdersByUserId(userId) {
  return Order.findAll({
    where: { userId },
    attributes: ["id", "totalAmount", "createdAt"],
    order: [["createdAt", "DESC"]],
  });
}

module.exports = {
  createOrder,
  findOrderById,
  findOrdersByUserId,
};
