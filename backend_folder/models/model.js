const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },

  userid: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  
  repassword: {
    type: String,
    required: true,
  },
  
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  
  resetToken:String,

  expireToken:Date,
  
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.repassword = await bcrypt.hash(this.repassword, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {}
};

const User = mongoose.model("Employer", userSchema);

module.exports = User;
