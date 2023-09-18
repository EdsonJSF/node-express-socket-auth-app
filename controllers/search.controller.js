const { response, request } = require("express");
const { Category, Product, Role, User } = require("../models");

const { ObjectId } = require("mongoose").Types;

const collections = ["categories", "products", "roles", "users"];

const search = (req = request, res = response) => {
  let { collection, term } = req.params;
  collection = collection.toLowerCase();

  if (!collections.includes(collection)) {
    return res.status(400).json({
      msg: `Collection ${collection} is not allowed`,
      errors: [],
    });
  }

  switch (collection) {
    case "categories":
      doSearch(Category, term, res);
      break;
    case "products":
      doSearch(Product, term, res);
      break;
    case "roles":
      doSearch(Role, term, res);
      break;
    case "users":
      doSearch(User, term, res);
      break;

    default:
      return res.status(500).json({
        msg: "Collection error, contact the administrator",
        errors: [],
      });
      break;
  }
};

const doSearch = async (model, term, res = response) => {
  const mongoId = ObjectId.isValid(term);

  let searchResult = [];
  if (mongoId) {
    searchResult = await model.findById(term);
    searchResult = [searchResult];
  } else {
    const regex = new RegExp(term, "i");
    searchResult = await model.find({
      $or: [{ rol: regex }, { name: regex }, { email: regex }],
      $and: [{ state: true }],
    });
  }

  return res.json({
    msg: `Searching ${term} finished`,
    data: searchResult ? searchResult : [],
  });
};

module.exports = {
  search,
};
