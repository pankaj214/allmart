const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  email: {
    type: String,
    required: true,
  },
  itemid:{
      type:String
  },
  ratingvalue:{
      type:Number
  }

});


const Rating = mongoose.model("Userrating", userSchema);

module.exports = Rating;
