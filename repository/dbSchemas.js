const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");



const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);


exports.User = User;

// Tweets Schema to be done