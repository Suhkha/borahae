const User = require("../models/user");
const Role = require("../models/role");

const isValidEmail = async (email = "") => {
  const checkEmail = await User.findOne({ email });

  if (checkEmail) {
    throw new Error(`${email} is in our database already`);
  }
};

const isValidRole = async (role = "") => {
  const checkRole = await Role.findOne({ role });
  if (!checkRole) {
    throw new Error(`${role} is not registered in our database`);
  }
};

module.exports = {
  isValidEmail,
  isValidRole,
};
