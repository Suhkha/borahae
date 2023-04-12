const { response } = require("express");
const bcryptjs = require("bcryptjs");

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
  const { name, nickname, email, password, age, city, social_media_url, role } =
    req.body;
  const user = new User({
    name,
    nickname,
    email,
    password,
    age,
    city,
    social_media_url,
    role,
  });

  //encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();
  res.json(user);
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, email, password, ...userData } = req.body;

  if (password) {
    //encrypt password
    const salt = bcryptjs.genSaltSync();
    userData.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, userData);
  res.json(user);
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
};
