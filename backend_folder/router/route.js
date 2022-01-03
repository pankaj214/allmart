const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("../connection");
const sessionStorage=require('sessionstorage')
require("dotenv").config({ path: "./config.env" });
const authenticate=require('../middleware/authenticate')
const authenticate1=require('../middleware/authenticate1')
const Employee = require("../models/model");
const User1=require('../models/model1')
const User2=require('../models/modeladmin')


router.post("/register", async (req, res) => {
  const { username, email, phone, userid, password, repassword } = req.body;

  if (!username || !email || !phone || !userid || !password || !repassword) {
    return res.status(422).json({ error: "Please filled all the fields" });
  }
  if (username.length < 3) {
    return res.status(422).json({ error: "Invalid Name" });
  }
  if (!validator.isEmail(email)) {
    return res.status(422).json({ error: "Invalid Email id" });
  }
  const mobile = /^[0]?[789]\d{9}$/;
  if (!mobile.test(phone)) {
    return res.status(422).json({ error: "Invalid Phone Number" });
  }
  if (userid.length < 4) {
    return res.status(422).json({ error: "UserId should be greater than 4" });
  }
  if (password.length < 8) {
    return res
      .status(422)
      .json({ error: "Password digits should be greater than 7" });
  }
  try {
    const userExist = await Employee.findOne({ email: email });
    const userExist1 = await Employee.findOne({ phone: phone });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (userExist1) {
      return res.status(422).json({ error: "Phone number already exists" });
    }
    if (password == repassword) {
      const employee = new Employee({
        _id: mongoose.Types.ObjectId(),
        username:username.toUpperCase(),
        email,
        phone,
        userid,
        password,
        repassword,
      });
      await employee.save();
    } else {
      return res.status(422).json({ error: "Password not matched" });
    }

    res.status(201).json({ message: "Registration Successful" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please filled all the fields" });
  }
  const userExist = await Employee.findOne({ email: email });
  if (userExist) {
    const isMatch = await bcrypt.compare(password, userExist.password);
     
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid Credentials" });
    } else {
      const token=await userExist.generateAuthToken();

        sessionStorage.setItem('jwtoken',token)
    return res.status(200).json({ message: "Now,you are LoggedIn"});
    }
  } else {
    return res.status(422).json({ error: "Invalid Credentials" });
  }
});

router.get('/about',authenticate,(req,res)=>{

  return res.send(req.root)

})

router.get('/dashboard',authenticate,(req,res)=>{
 
  return res.send(req.root)


})

router.get('/contact',authenticate,(req,res)=>{
 
  return res.send(req.root)

})

router.get('/viewmore',authenticate,(req,res)=>{
  return res.send(req.root)
})


router.get('/addtocart',authenticate,(req,res)=>{
  return res.send(req.root)
})

router.get('/logout',async(req,res)=>{
  
  const token=sessionStorage.getItem('jwtoken')
  if(token){
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY)

    const root=await Employee.findOne({_id:verifyToken._id,"tokens.token":token})

    // logout from one device
    root.tokens=root.tokens.filter((currentElement)=>{
      return currentElement.token!==token
    })

    await root.save()

    sessionStorage.removeItem('jwtoken')
  return res.status(200).json({message:'Now,you are logout'})

  }
  else if(token==null){
  return res.status(400).json({error:'You are already logout'})
}
})

router.get('/logoutall',async(req,res)=>{
  
  const token=sessionStorage.getItem('jwtoken')
  if(token){
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY)

    const root=await Employee.findOne({_id:verifyToken._id,"tokens.token":token})

    // logout from all devices
    root.tokens=[]

    await root.save()

    sessionStorage.removeItem('jwtoken')
  return res.status(200).json({message:'Now,you are logout'})

  }
  else if(token==null){
  return res.status(400).json({error:'You are already logout'})
}    

})

router.get('/home',async(req,res)=>{

  const itemdata=await User1.find()
  res.send(itemdata)

})

router.post('/adminlogin',async(req,res)=>{

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please filled all the fields" });
  }
  const admindata=await User2.findOne({adminid:email,password:password})
  if(admindata){
    const token=await admindata.generateAuthToken();

    sessionStorage.setItem('adminjwtoken',token)
    return res.status(200).json({ message: "you are loggedin"});
  }
  else{
    return res.status(422).json({ error: "Invalid Credentials" });
  }
})



router.get('/adminlogout',async(req,res)=>{
  
  const token=sessionStorage.getItem('adminjwtoken')
  if(token){
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY)

    const root=await User2.findOne({_id:verifyToken._id,"tokens.token":token})

    root.tokens=[]

    await root.save()

    sessionStorage.removeItem('adminjwtoken')
    return res.status(200).json({message:'you are logout'})

  }
  else if(token==null){
  return res.status(400).json({error:'you are already logout'})
}    

})


router.get('/admindashboard',authenticate1,(req,res)=>{

  return res.send(req.userRoot)
})






module.exports = router;
