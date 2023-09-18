const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const { User } = require("../models");

const getUsers = async (req = request, res = response) => {
  const { limit = 0, init = 0 } = req.query;
  const query = { state: true };

  const [data, total] = await Promise.all([
    User.find(query).skip(Number(init)).limit(Number(limit)),
    User.countDocuments(query),
  ]);

  res.json({
    msg: "Users",
    total,
    data,
  });
};

const postUser = async (req = request, res = response) => {
  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });

  // Encrypt pass
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save user
  await user.save();

  res.json({
    msg: "The user was added",
    data: user,
  });
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...body } = req.body;

  if (password) {
    // Encrypt pass
    const salt = bcryptjs.genSaltSync();
    body.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, body);

  res.json({
    msg: "The user was updated",
    data: user,
  });
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    msg: "User was delete",
    data: user,
  });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
