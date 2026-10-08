const { z } = require("zod");
const { BadRequestError } = require("../utils/errors");

const productIdSchema = z.uuid();

function validateProductId(req, _res, next) {
  const result = productIdSchema.safeParse(req.params.id);

  if (!result.success) {
    return next(new BadRequestError("Invalid product ID"));
  }

  req.params.id = result.data;
  return next();
}

module.exports = {
  productIdSchema,
  validateProductId,
};
