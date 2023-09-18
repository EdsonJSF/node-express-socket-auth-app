const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/users.controller");

// Middlewares
const {
  // validateJWT
  validateJWT,

  // validateFields
  validateFields,

  // validateDB
  validateRoleDB,
  validateEmailDB,
  validateUserIdDB,

  // validateRole
  validateRoleAdmin,
} = require("../middlewares");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("name", "Invalid name").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check("email").custom(validateEmailDB),
    check("password", "Invalid password").isLength({ min: 6 }),
    check("rol").custom(validateRoleDB),
    validateFields,
  ],
  postUser
);

router.put(
  "/:id",
  [
    check("id", "Invalid id").isMongoId(),
    check("id").custom(validateUserIdDB),
    check("rol").custom(validateRoleDB),
    validateFields,
  ],
  putUser
);

router.delete(
  "/:id",
  [
    validateJWT,
    validateRoleAdmin,
    // hasRole("ADMIN_ROLE", "USER_ROLE", "MORE_ROLE"),
    check("id", "Invalid id").isMongoId(),
    check("id").custom(validateUserIdDB),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
