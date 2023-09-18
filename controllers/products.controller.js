const { response, request } = require("express");

const { Category, Product } = require("../models");

const getProducts = async (req = request, res = response) => {
  const { limit = 0, init = 0 } = req.query;
  const query = { state: true };

  const [data, total] = await Promise.all([
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(init))
      .limit(Number(limit)),
    Product.countDocuments(query),
  ]);

  res.json({
    msg: "Products",
    total,
    data,
  });
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json({
    msg: "Product",
    data: product,
  });
};

const createProduct = async (req = request, res = response) => {
  const { _id } = req.getUser;
  let { available, category, description, name, price } = req.body;

  name = name.toUpperCase().trim();
  category = category.toUpperCase();
  const categoryDB = await Category.findOne({ name: category });

  const data = {
    available,
    category: categoryDB._id,
    description,
    name,
    price,
    user: _id,
  };

  const product = new Product(data);
  await product.save();

  res.status(201).json({
    msg: "The Product was added",
    data: product,
  });
};

const updateProduct = async (req = request, res = response) => {
  const { _id } = req.getUser;

  const { id } = req.params;
  let { available, category, description, name, price, state } = req.body;

  name = name.toUpperCase().trim();
  category = category.toUpperCase();
  const categoryDB = await Category.findOne({ name: category });

  const body = {
    available,
    category: categoryDB._id,
    description,
    name,
    price,
    state,
    user: _id,
  };

  const product = await Product.findByIdAndUpdate(id, body, { new: true });

  res.json({
    msg: "The product was updated",
    data: product,
  });
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json({
    msg: "The product was deleted",
    data: product,
  });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
