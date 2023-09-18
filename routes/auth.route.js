const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const { authLogin, authGoogle } = require("../controllers/auth.controller");

// Middlewares
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Invalid password").not().isEmpty(),
    validateFields,
  ],
  authLogin
);

router.post(
  "/google",
  [check("id_token", "Invalid google token").not().isEmpty(), validateFields],
  authGoogle
);

module.exports = router;
