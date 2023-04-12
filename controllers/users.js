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

  await user.save();
  res.json(user);
};

module.exports = {
  usersGet,
  usersPost,
};
