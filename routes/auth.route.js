const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const { authLogin, authGoogle, generateNewToken } = require("../controllers/auth.controller");

// Middlewares
const { validateFields, validateJWT } = require("../middlewares");

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

router.get("/", validateJWT, generateNewToken);

module.exports = router;
