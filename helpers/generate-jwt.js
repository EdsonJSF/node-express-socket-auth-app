const jwt = require("jsonwebtoken");

const { User } = require("../models");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      { expiresIn: "4h" },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Fail generate JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const validJWT = async (token = "") => {
  if (!token) return null;

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT);

    const user = await User.findById(uid);

    if (user?.state) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

module.exports = {
  generateJWT,
  validJWT,
};
