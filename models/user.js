const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  nickname: {
    type: String,
    required: [true, "nickname is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  age: {
    type: Number,
  },
  city: {
    type: String,
  },
  socialMediaUrl: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "USER"],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;

  return user;
};

module.exports = model("Users", UserSchema);
