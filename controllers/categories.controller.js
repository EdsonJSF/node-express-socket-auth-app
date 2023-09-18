const { response, request } = require("express");

const { Category } = require("../models");

const getCategories = async (req = request, res = response) => {
  const { limit = 0, init = 0 } = req.query;
  const query = { state: true };

  const [data, total] = await Promise.all([
    Category.find(query)
      .populate("user", "name")
      .skip(Number(init))
      .limit(Number(limit)),
    Category.countDocuments(query),
  ]);

  res.json({
    msg: "Categories",
    total,
    data,
  });
};

const getCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate("user", "name");

  res.json({
    msg: "getCategory",
    data: category,
  });
};

const createCategory = async (req = request, res = response) => {
  const { _id } = req.getUser;
  const name = req.body.name.toUpperCase().trim();

  const data = { name, user: _id };

  const category = new Category(data);
  await category.save();

  res.status(201).json({
    msg: "The category was added",
    data: category,
  });
};

const updateCategory = async (req = request, res = response) => {
  const { _id } = req.getUser;

  const { id } = req.params;
  let { name, state } = req.body;
  name = name.toUpperCase().trim();

  const body = { name, state, user: _id };

  const category = await Category.findByIdAndUpdate(id, body, { new: true });

  res.json({
    msg: "The category was updated",
    data: category,
  });
};

const deleteCategories = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json({
    msg: "The category was deleted",
    data: category,
  });
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategories,
};
