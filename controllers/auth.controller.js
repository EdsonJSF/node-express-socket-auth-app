const { response } = require("express");
const bcryptjs = require("bcryptjs");

const { User } = require("../models");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google.verify");

const authLogin = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Email / Password Invalid - email",
        errors: [],
      });
    }

    // User is active ?
    if (!user.state) {
      return res.status(400).json({
        msg: "Email / Password Invalid - state",
        errors: [],
      });
    }

    // Verify password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Email / Password Invalid - pass",
        errors: [],
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      msg: "Login ok",
      data: { user, token },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "An unspected error",
      errors: [],
    });
  }
};

const authGoogle = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, image } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: "",
        image,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.state) {
      return res.status(401).json({
        msg: "The user is disabled, contact the administrator.",
        errors: [],
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      msg: "Login Google ok",
      data: { user, token },
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      msg: "Login Google error",
      errors: [],
    });
  }
};

module.exports = {
  authLogin,
  authGoogle,
};
