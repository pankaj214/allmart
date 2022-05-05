const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const userSchema=new mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,

    email:{
        type:String
    },
    itemid:{
        type:String
    },

    itemname:{
        type:String,
        required:true
    },
    itemcategory:{
        type:String,
        required:true
    },
    itempicture:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kDyk4t1MZOnnXUT24zNSuVBtmeA0MPzUOg&usqp=CAU"
    }
  
})

const Addtocart=mongoose.model('Addtocart',userSchema)

module.exports=Addtocart

