const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const cartController = require("../controllers/cart.controller");
const {
  addToCartValidation,
  validateCartItemId,
} = require("../validations/cart.validation");

const router = express.Router();

router.get("/", authenticate, cartController.getCart);
router.post(
  "/items",
  authenticate,
  addToCartValidation,
  cartController.addToCart,
);
router.patch(
  "/items/:cartItemId/increase",
  authenticate,
  validateCartItemId,
  cartController.increaseCartItem,
);
router.patch(
  "/items/:cartItemId/decrease",
  authenticate,
  validateCartItemId,
  cartController.decreaseCartItem,
);
router.delete(
  "/items/:cartItemId",
  authenticate,
  validateCartItemId,
  cartController.removeCartItem,
);

module.exports = router;
