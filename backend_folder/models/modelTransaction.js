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
  itemname:{
    type:String
  },
  itemprice:{
      type:Number
  },
  payment_id:{
        type:String
  },
  order_id:{
      type:String
  },
  payment_status:{
      type:String
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },


});


const Transaction = mongoose.model("Usertransaction", userSchema);

module.exports = Transaction;
