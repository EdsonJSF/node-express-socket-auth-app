const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: "You have some request errors",
      errors: errors.errors,
    });
  }
  next();
};

module.exports = {
  validateFields,
};
