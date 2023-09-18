const { Category, User, Role, Product } = require("../models");

const validateRoleDB = async (rol = "") => {
  const role = await Role.findOne({ rol });
  if (!role) {
    throw new Error("Invalid rol");
  }
};

const validateEmailDB = async (email = "") => {
  const exitsEmail = await User.findOne({ email });
  if (exitsEmail) {
    throw new Error("Email already exist");
  }
};

const validateUserIdDB = async (id = "") => {
  const exitsUser = await User.findById(id);
  if (!exitsUser) {
    throw new Error("User does not exist");
  }
};

const validateCategoryIdDB = async (id = "") => {
  const exitsCategory = await Category.findById(id);
  if (!exitsCategory) {
    throw new Error("Category does not exist");
  }
};

const validateCategoryNameDB = async (name = "") => {
  name = name.toUpperCase().trim();
  const exitsCategoryName = await Category.findOne({ name });
  if (exitsCategoryName && exitsCategoryName.state) {
    throw new Error(`Category ${name} already exist`);
  }
};

const existCategoryNameDB = async (category = "") => {
  category = category.toUpperCase().trim();
  const exitsCategoryName = await Category.findOne({ name: category });
  if (!exitsCategoryName) {
    throw new Error(`Category ${category} does not exist`);
  }
  if (!exitsCategoryName.state) {
    throw new Error(`Category ${category} was deleted`);
  }
};

const validateProductIdDB = async (id = "") => {
  const exitsProduct = await Product.findById(id);
  if (!exitsProduct) {
    throw new Error("Category does not exist");
  }
};

const validateProductNameDB = async (name = "") => {
  name = name.toUpperCase().trim();
  const exitsProductName = await Product.findOne({ name });
  if (exitsProductName) {
    throw new Error(`Category ${name} already exist`);
  }
};

const validateCollections = (collection = "", collections = []) => {
  const valid = collections.includes(collection.toLowerCase());

  if (!valid) {
    throw new Error(`${collection} is an invalid collection, ${collections}`);
  }
  return true;
};

module.exports = {
  validateRoleDB,

  validateEmailDB,
  validateUserIdDB,

  validateCategoryIdDB,
  validateCategoryNameDB,
  existCategoryNameDB,

  validateProductIdDB,
  validateProductNameDB,

  validateCollections,
};
