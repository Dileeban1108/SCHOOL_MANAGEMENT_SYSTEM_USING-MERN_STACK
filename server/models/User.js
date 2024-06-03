const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: String,
  address: String,
  position: String,
  grade: String,
  subject: String,
  profile_img: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
