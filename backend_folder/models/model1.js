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
    itemdescription:{
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

const User1=mongoose.model('Item',userSchema)

module.exports=User1

