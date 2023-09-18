const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const {
  createCategory,
  deleteCategories,
  getCategories,
  getCategory,
  updateCategory,
} = require("../controllers/categories.controller");

// Middlewares
const {
  validateJWT,
  validateFields,
  validateRoleAdmin,
  validateCategoryIdDB,
  validateCategoryNameDB,
} = require("../middlewares");

const router = Router();

router.get("/", getCategories);

router.get(
  "/:id",
  [
    check("id", "Invalid id").isMongoId(),
    check("id").custom(validateCategoryIdDB),
    validateFields,
  ],
  getCategory
);

router.post(
  "/",
  [
    validateJWT,
    validateRoleAdmin,
    check("name", "Invalid name").not().isEmpty(),
    check("name").custom(validateCategoryNameDB),
    validateFields,
  ],
  createCategory
);

router.put(
  "/:id",
  [
    validateJWT,
    validateRoleAdmin,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(validateCategoryIdDB),
    check("name", "Invalid name").not().isEmpty(),
    check("name").custom(validateCategoryNameDB),
    validateFields,
  ],
  updateCategory
);

router.delete(
  "/:id",
  [
    validateJWT,
    validateRoleAdmin,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(validateCategoryIdDB),
    validateFields,
  ],
  deleteCategories
);

module.exports = router;
