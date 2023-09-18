const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const {
  loadFile,
  updateFile,
  getImage,
} = require("../controllers/uploads.controller");

// Middlewares
const {
  validateFields,
  validateCollections,
  validateFile,
} = require("../middlewares");

const router = Router();

router.post("/", [validateFile], loadFile);

router.get(
  "/:collection/:id",
  [
    check("id", "Invalid id").isMongoId(),
    check("collection").custom((c) =>
      validateCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  getImage
);

router.put(
  "/:collection/:id",
  [
    validateFile,
    check("id", "Invalid id").isMongoId(),
    check("collection").custom((c) =>
      validateCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateFile
);

module.exports = router;
