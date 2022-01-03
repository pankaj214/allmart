const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const userSchema=new mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,

    itemname:{
        type:String,
        required:true
    },
    itemdiscount:{
        type:String,
        required:true
    },
    itemprice:{
        type:String,
        required:true
    },
    itemdesignation:{
        type:String,
        required:true
    },
  
})

const User1=mongoose.model('Item',userSchema)

module.exports=User1

