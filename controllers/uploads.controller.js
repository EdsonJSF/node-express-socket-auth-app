const { response, request } = require("express");
const path = require("path");
const fs = require("fs");

const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

const loadFile = async (req, res = response) => {
  uploadFile(req.files)
    .then((resp) => {
      const { file } = req.files;
      return res.json({ msg: `File uploaded: ${resp}`, data: file });
    })
    .catch((resp) => {
      return res.status(400).json({ msg: resp });
    });
};

const getImage = async (req = request, res = response) => {
  const { collection, id } = req.params;
  const collectionName = collection.toLowerCase();

  let model;

  switch (collectionName) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "User does not exist",
          errors: [],
        });
      }
      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "Product does not exist",
          errors: [],
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: "Update file error, contact the administrator",
        errors: [],
      });
  }

  // Clear last image
  if (model.image) {
    const pathImage = path.join(
      __dirname,
      "../uploads",
      collectionName,
      model.image
    );

    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }

  const pathImageNotFound = path.join(
    __dirname,
    "../assets/image-not-found.jpg"
  );

  res.sendFile(pathImageNotFound);
};

const updateFile = async (req = request, res = response) => {
  const { collection, id } = req.params;
  const collectionName = collection.toLowerCase();

  let model;

  switch (collectionName) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "User does not exist",
          errors: [],
        });
      }
      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "Product does not exist",
          errors: [],
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: "Update file error, contact the administrator",
        errors: [],
      });
  }

  // Clear last image
  if (model.image) {
    const pathImage = path.join(
      __dirname,
      "../uploads",
      collectionName,
      model.image
    );

    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  const name = await uploadFile(req.files, undefined, collectionName);

  model.image = name;
  await model.save();

  res.json({
    msg: `${collection} was updated`,
    data: model,
  });
};

module.exports = {
  loadFile,
  getImage,
  updateFile,
};
