const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({

  adminid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admindateofbirth:{
    type:String
  },
  adminphone:{
    type:Number
  },
  adminimage:{
  type:String,
  default:"https://react.semantic-ui.com/images/avatar/small/christian.jpg",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {}
};

const User2 = mongoose.model("Admin", userSchema);

module.exports = User2;
