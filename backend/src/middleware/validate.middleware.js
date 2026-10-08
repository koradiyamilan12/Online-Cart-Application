const { BadRequestError } = require("../utils/errors");

function validateBody(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.issues.map(({ path, message }) => ({
        path: path.join("."),
        message,
      }));
      return next(new BadRequestError("Request validation failed", details));
    }

    req.body = result.data;
    return next();
  };
}

module.exports = validateBody;
