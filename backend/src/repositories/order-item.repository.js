const OrderItem = require("../models/order-item.model");

async function createOrderItems(items, transaction) {
  return OrderItem.bulkCreate(items, {
    transaction,
    validate: true,
  });
}

module.exports = {
  createOrderItems,
};
