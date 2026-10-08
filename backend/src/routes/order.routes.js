const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const orderController = require("../controllers/order.controller");
const {
  validateSubmitOrder,
  validateOrderId,
} = require("../validations/order.validation");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validateSubmitOrder,
  orderController.submitOrder,
);
router.get("/", authenticate, orderController.getOrders);
router.get("/:orderId", authenticate, validateOrderId, orderController.getOrder);

module.exports = router;
