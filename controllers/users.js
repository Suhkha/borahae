const { response } = require("express");
const User = require("../models/user");

const usersGet = async (req, res = response) => {
  const args = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(args),
    User.find(args),
  ]);

  res.status(200).json({
    total,
    users,
  });
};

const usersPost = async (req, res = response) => {
  res.status(200).json({
    message: "user post",
  });
};

module.exports = {
  usersGet,
  usersPost,
};
