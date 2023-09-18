const { response, request } = require("express");

const validateRoleAdmin = (req = request, res = response, next) => {
  const user = req.getUser;

  if (!user) {
    return res.status(500).json({
      msg: "Verify the token first",
      errors: [],
    });
  }

  const { rol, name } = user;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `"${name}" is not an administrator`,
      errros: [],
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    const user = req.getUser;

    if (!user) {
      return res.status(500).json({
        msg: "Verify the token first",
        errors: [],
      });
    }

    if (!roles.includes(user.rol)) {
      return res.status(401).json({
        msg: `Must have one of these roles: ${roles}`,
        errors: [],
      });
    }

    next();
  };
};

module.exports = {
  validateRoleAdmin,
  hasRole,
};
