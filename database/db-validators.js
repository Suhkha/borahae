const User = require("../models/user");

const isValidEmail = async (email = "") => {
  const checkEmail = await User.findOne({ email });

  if (checkEmail) {
    throw new Error(`${email} is in our database already`);
  }
};

module.exports = {
  isValidEmail,
};
