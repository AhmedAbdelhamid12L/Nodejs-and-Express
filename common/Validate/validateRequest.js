const { StatusCodes } = require("http-status-codes");

module.exports = (schema) => {
  return (req, res, next) => {
    const validationError = [];
    // Validate on body
    const validationResult = schema.body.validate(req.body);
    if (validationResult.error) {
      validationError.push(validationResult.error.details[0].message);
    }
    if (validationError.length) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "validation error", error: validationError.join() });
    } else {
      next();
    }
  };
};
