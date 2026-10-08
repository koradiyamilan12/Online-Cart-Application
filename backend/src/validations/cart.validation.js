const { z } = require("zod");
const { BadRequestError } = require("../utils/errors");
const validateBody = require("../middleware/validate.middleware");
const { ERROR_MESSAGES } = require("../constants/messages");

const addToCartSchema = z
  .object({
    productId: z.uuid({ error: "Product ID must be a valid UUID" }),
    quantity: z.coerce
      .number({ error: ERROR_MESSAGES.INVALID_QUANTITY })
      .int({ error: "Quantity must be an integer" })
      .positive({ error: ERROR_MESSAGES.INVALID_QUANTITY }),
  })
  .strict();

const cartItemIdSchema = z.coerce.number().int().positive();

function validateCartItemId(req, _res, next) {
  const result = cartItemIdSchema.safeParse(req.params.cartItemId);

  if (!result.success) {
    return next(new BadRequestError("Invalid cart item ID"));
  }

  req.params.cartItemId = result.data;
  return next();
}

module.exports = {
  addToCartSchema,
  addToCartValidation: validateBody(addToCartSchema),
  validateCartItemId,
};
