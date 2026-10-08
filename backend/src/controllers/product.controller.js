const { StatusCodes } = require("http-status-codes");
const {
  getProductsService,
  getProductByIdService,
} = require("../services/product.service");
const { SUCCESS_MESSAGES } = require("../constants/messages");

async function getProducts(_req, res) {
  const products = await getProductsService();

  return res.status(StatusCodes.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.PRODUCTS_FETCHED,
    data: products,
  });
}

async function getProductById(req, res) {
  const product = await getProductByIdService(req.params.id);

  return res.status(StatusCodes.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.PRODUCT_FETCHED,
    data: product,
  });
}

module.exports = {
  getProducts,
  getProductById,
};
