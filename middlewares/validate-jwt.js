const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      msg: "You no have authorization",
      errors: [],
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: `User no exist`,
        errors: [],
      });
    }

    if (!user.state) {
      return res.status(401).json({
        msg: `The user: ${user.name} is disabled`,
        errors: [],
      });
    }

    req.getUser = user;
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      msg: "Invalid Token",
      errors: [],
    });
  }
};

module.exports = {
  validateJWT,
};
