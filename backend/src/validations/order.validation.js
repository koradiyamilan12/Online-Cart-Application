const { z } = require("zod");
const { BadRequestError } = require("../utils/errors");
const validateBody = require("../middleware/validate.middleware");

const submitOrderSchema = z.object({}).strict().optional();
const orderIdSchema = z.coerce.number().int().positive();

function validateOrderId(req, _res, next) {
  const result = orderIdSchema.safeParse(req.params.orderId);

  if (!result.success) {
    return next(new BadRequestError("Invalid order ID"));
  }

  req.params.orderId = result.data;
  return next();
}

module.exports = {
  validateSubmitOrder: validateBody(submitOrderSchema),
  validateOrderId,
};
