const { findAllProducts, findProductById } = require("../repositories/product.repository");
const { ERROR_MESSAGES } = require("../constants/messages");
const { NotFoundError } = require("../utils/errors");

async function getProductsService() {
  return findAllProducts();
}

async function getProductByIdService(id) {
  const product = await findProductById(id);

  if (!product) {
    throw new NotFoundError(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
  }

  return product;
}

module.exports = {
  getProductsService,
  getProductByIdService,
};
