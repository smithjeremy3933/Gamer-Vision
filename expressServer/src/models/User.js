const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let randomNumber = Math.random() * 1000;

const UserSchema = new Schema({
  username: {
    type: String,
    default: "Guest-" + randomNumber.toString(),
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
