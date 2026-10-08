const Product = require("../models/product.model");

async function findAllProducts() {
  return Product.findAll({
    attributes: ["id", "name", "price"],
    order: [["id", "ASC"]],
  });
}

async function findProductById(id) {
  return Product.findByPk(id, {
    attributes: ["id", "name", "price"],
  });
}

module.exports = {
  findAllProducts,
  findProductById,
};
