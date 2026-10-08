const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const { getProducts, getProductById } = require("../controllers/product.controller");
const { validateProductId } = require("../validations/product.validation");

const router = express.Router();

router.get("/", authenticate, getProducts);
router.get("/:id", authenticate, validateProductId, getProductById);

module.exports = router;
