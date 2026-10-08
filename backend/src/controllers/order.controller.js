const { StatusCodes } = require("http-status-codes");
const orderService = require("../services/order.service");
const { SUCCESS_MESSAGES } = require("../constants/messages");

async function submitOrder(req, res) {
  const order = await orderService.submitOrderService(req.authenticatedUserId);

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: SUCCESS_MESSAGES.ORDER_CREATED,
    data: order,
  });
}

async function getOrder(req, res) {
  const order = await orderService.getOrderService(
    req.authenticatedUserId,
    req.params.orderId,
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.ORDER_FETCHED,
    data: order,
  });
}

async function getOrders(req, res) {
  const orders = await orderService.getOrdersService(req.authenticatedUserId);

  return res.status(StatusCodes.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.ORDERS_FETCHED,
    data: orders,
  });
}

module.exports = {
  submitOrder,
  getOrder,
  getOrders,
};
