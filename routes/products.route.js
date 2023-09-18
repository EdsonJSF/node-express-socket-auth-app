const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

// Middlewares
const {
  validateJWT,
  validateFields,
  validateRoleAdmin,
  existCategoryNameDB,
  validateProductIdDB,
  validateProductNameDB,
} = require("../middlewares");

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  [
    check("id", "Invalid id").isMongoId(),
    check("id").custom(validateProductIdDB),
    validateFields,
  ],
  getProduct
);

router.post(
  "/",
  [
    validateJWT,
    validateRoleAdmin,
    check("name", "Invalid name").not().isEmpty(),
    check("name").custom(validateProductNameDB),
    check("category", "Invalid category").not().isEmpty(),
    check("category").custom(existCategoryNameDB),
    validateFields,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    validateJWT,
    validateRoleAdmin,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(validateProductIdDB),
    check("name", "Invalid name").not().isEmpty(),
    check("category", "Invalid category").not().isEmpty(),
    check("category").custom(existCategoryNameDB),
    validateFields,
  ],
  updateProduct
);

router.delete(
  "/:id",
  [
    validateJWT,
    validateRoleAdmin,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(validateProductIdDB),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
