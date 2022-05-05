const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("../connection");
const nodeMailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const sessionStorage=require('sessionstorage')
require("dotenv").config({ path: "./config.env" });
const authenticate=require('../middleware/authenticate')
const authenticate1=require('../middleware/authenticate1')
const Employee = require("../models/model");
const User1=require('../models/model1')
const User2=require('../models/modeladmin')
const crypto=require('crypto');
const upload=require('../middleware/imagemulter')
const imagevalidation=require('../middleware/imagevalidation')
const transporter=nodeMailer.createTransport(sendgridTransport({
  auth:{
    api_key:process.env.API
  }
}))


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
  const pass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!pass.test(password)) {
    return res
      .status(422)
      .json({ error: "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:" });
  }
  try {
    const userExist = await Employee.findOne({ email: email });
    const userExist1 = await Employee.findOne({ phone: phone });
    const userExist2 = await Employee.findOne({ userid: userid });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (userExist1) {
      return res.status(422).json({ error: "Phone number already exists" });
    }
    else if(userExist2){
      return res.status(422).json({ error: "User id already exists" });
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
    transporter.sendMail({
      to:email,
      from:process.env.EMAIL,
      subject:"Registration Confirmation",
      html:`
      <div style="color:#05386B; margin:5%; border-style:solid; text-align:center;">
      <h1>Hello, ${username}</h1>
      <h2 style="text-decoration:underline;">Welcome to the ALLMART</h2>
      <h3>Your Allmart Signup process is successfully completed<br/>now try to login the allmart.</h3>
      </div>
`
    })
    res.status(201).json({ message: "Registration Successful\n Please check the mail" });
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

router.post('/resetpassword',async(req,res)=>{
  const { email } = req.body;
  if (!email) {
    return res.status(422).json({ error: "Please enter email id" });
  }
crypto.randomBytes(32,async(err,buffer)=>{
  if(err){
    return res.status(422).json({ error: "Invalid" });
  }
  const token=buffer.toString('hex')
  const checkEmail  = await Employee.findOne({email:email})
  if(!checkEmail){
    return res.status(422).json({ error: "Email id doesn't match our records" });
  }
  checkEmail.resetToken = token
  checkEmail.expireToken  = Date.now()  + 120000
  const tokenSave=await checkEmail.save()
  if(tokenSave){
    transporter.sendMail({
      to:checkEmail.email,
      from:process.env.EMAIL,
      subject:"Reset Password Link",
      html:`
      <div style="border-style:solid; margin:5%; color:#05386B; text-align:center;">
      <h2 style="text-decoration:underline;">ALLMART</h2>
      <h2>You requested for password reset</h2>
            <h3>now,click in this <a href="http://localhost:3000/reset_password/${token}">link</a> to reset password.</h3>
            <h3>this link will be valid till 2 minutes.</h3>
           </div> 
      `
    })
    return res.status(200).json({message:'Email Sent Successfully'})
  }
  else{
    return res.status(422).json({ error: "Server error" });
  }
  
})
})

router.post('/passwordreset',async(req,res)=>{
  const { password,repassword,token } = req.body;
  if (!password || !repassword) {
    return res.status(422).json({ error: "Please filled all the fields" });
  }

  const pass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!pass.test(password)) {
    return res
      .status(422)
      .json({ error: "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:" });
  }

  if(password!=repassword){
    return res.status(422).json({ error: "Password not matched" });
  }
 
  const checkToken  = await Employee.findOne({resetToken:token,expireToken:{$gt:Date.now()}})
  if(!checkToken){
    return res.status(422).json({ error: "Sorry! Page session is expired" });
}
      checkToken.password=password
      checkToken.repassword=repassword
      checkToken.resetToken=undefined
      checkToken.expireToken=undefined
      const checkSave = await checkToken.save();
      if(checkSave){
        return res.status(200).json({message:'Password updated successfully'})
      }
      else{
        return res.status(422).json({ error: "Password not updated" });

      }



})

router.get('/checkLogin',authenticate,(req,res)=>{

  return res.send(req.root)

})


router.get('/logout',async(req,res)=>{
  
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


router.get('/checkadminlogin',authenticate1,(req,res)=>{

  return res.send(req.userRoot)
})

router.post('/adminitemdata',async(req,res)=>{
  const { iname,iprice,idiscount,idescription,icategory } = req.body;
  if (!iname || !iprice || !idiscount || !idescription || !icategory) {
    return res.status(422).json({ error: "Please filled all the fields" });
  }
  const adminitemdata = new User1({
    _id: mongoose.Types.ObjectId(),
    itemname:iname,itemdiscount:idiscount,itemprice:iprice,itemdescription:idescription,itemcategory:icategory
  });

  await adminitemdata.save();
  if(adminitemdata){

    return res.status(200).json({ message: "Uploaded"});
  }
  else{

    return res.status(422).json({ error: "Not Uploaded" });
  }
})

router.post('/contactdata',async(req,res)=>{
  const { username,
    email,
    phone,
    feedback } = req.body;
  if (!username || !email || !phone || !feedback ) {
    return res.status(422).json({ error: "Please filled all the fields" });
  }

  
  const contactdata = await Employee.updateOne({email:email},{
    $push:{
      feedback:feedback
    }
  })

  
  if(contactdata.ok){
    transporter.sendMail({
      to:email ,
      from:process.env.EMAIL,
      subject:"Thanks for contact us",
      html:`
      <div style="border-style:solid; margin:5%; color:#05386B; text-align:center;">
      <h2 style="text-decoration:underline;">ALLMART</h2>
      <h2>Thank you,We have got your feedback/query/suggestion we will see this further and revert back into 2-3 working days.</h2>
            
           </div> 
      `
    })
    return res.status(200).json({ message: "Please check your mail"});
  }
  else{

    return res.status(422).json({ error: "Not Uploaded" });
  }
    
})

router.post('/changepassword',async(req,res)=>{
  const { email,
    currentpassword,
    newpassword,
    renewpassword } = req.body;
  if ( !currentpassword || !newpassword || !renewpassword ) {
    return res.status(422).json({ error: "Please filled all the fields" });
  }

  const checkpassword=await Employee.findOne({email:email})
 const isMatch = await bcrypt.compare(currentpassword, checkpassword.password);
  if(!isMatch){
    return res.status(422).json({ error: "Current password not matched" });

  }
  const pass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!pass.test(newpassword)) {
    return res
      .status(422)
      .json({ error: "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:" });
  }

  if(newpassword!=renewpassword){
    return res.status(422).json({ error: "Password not matched" });
  }

 
  checkpassword.password=newpassword
  checkpassword.repassword=renewpassword
  const checkSave = await checkpassword.save()
  if(checkSave){
    return res.status(200).json({ message: "Password updated successfully"});
  }
  else{
    return res.status(422).json({ error: "Password not updated" });

  }

})

router.post('/editprofile',async(req,res)=>{
  
  const checkemail = await Employee.findOne({email:req.body.email})
  if(req.body.username){
    checkemail.username=req.body.username
  }

  if(req.body.dateofbirth){
    checkemail.dateofbirth=req.body.dateofbirth
  }

  if(req.body.addressfororders){
    checkemail.addressfororders=req.body.addressfororders
  }
  const data=await checkemail.save()
  

  if(data){
    return res.status(200).json({ message: "Profile updated"});

  }
  else{
    return res.status(422).json({ error: "Profile not updated"});

  }

})

router.post('/deleteprofile',async(req,res)=>{
  const checkemail=await Employee.findOne({email:req.body.email})
  checkemail.deleteprofilestatus="wants to delete"
  const data=await checkemail.save()
  if(data){
    return res.status(200).json({message:"Your delete request send to website admin if, further process will done then you receive the mail."})
  }
else{
  return res.status(422).json({error:"Delete request not send"})
}
})

router.get('/seeusers',async(req,res)=>{
  const data=await Employee.find()
  return res.send(data)
})

router.post('/deletedprofile/:id',async(req,res)=>{
  const data=await Employee.findOne({_id:req.params.id})

  transporter.sendMail({
    to:data.email ,
    from:process.env.EMAIL,
    subject:"ALLMART profile delete status",
    html:`
    <div style="border-style:solid; margin:5%; color:#05386B; text-align:center;">
    <h2 style="text-decoration:underline;">ALLMART</h2>
    <h2>Thank you, ${data.username} request to delete profile has been completed now,your profile has been deleted.</h2>
          
         </div> 
    `
  })

  const deleteProfile=await Employee.deleteOne({_id:req.params.id})
  if(deleteProfile){
    return res.status(200).json({message:"Profile deleted and mail sent to user."})
  }
  else{
    return res.status(422).json({error:"Profile not deleted"})
  }

  
})

router.post('/feedbackmail',async(req,res)=>{
  const {emails,mailfeedback} = req.body
  if(!mailfeedback){
    return res.status(422).json({error:"Please write the mail"})
  }

  if(mailfeedback){
    transporter.sendMail({
      to:emails ,
      from:process.env.EMAIL,
      subject:"Your ALLMART Feedback/Query/Suggestion response",
      html:`
      <div style="border-style:solid; margin:5%; color:#05386B; text-align:center;">
      <h2 style="text-decoration:underline;">ALLMART</h2>
      <h2>Thank you, ${emails}\n
      Response: ${mailfeedback}</h2>
            
           </div> 
      `
    })
    return res.status(200).json({message:"Successfully sent"})
  }
  else{
    return res.status(422).json({error:"Mail not sent"})

  }

})

router.post('/admineditprofile',async(req,res)=>{
  
  const checkdata = await User2.findOne({_id:req.body.id})
 
  if(req.body.adminid){
    checkdata.adminid=req.body.adminid
  }

  if(req.body.admindateofbirth){
    checkdata.admindateofbirth=req.body.admindateofbirth
  }

  if(req.body.adminphone){
    checkdata.adminphone=req.body.adminphone
  }
  const data=await checkdata.save()
  

  if(data){
    return res.status(200).json({ message: "Profile updated"});

  }
  else{
    return res.status(422).json({ error: "Profile not updated"});

  }

})


router.post('/adminchangepassword',async(req,res)=>{
  const { adminid,
    currentpassword,
    newpassword,
    renewpassword } = req.body;
  if ( !currentpassword || !newpassword || !renewpassword ) {
    return res.status(422).json({ error: "Please filled all the fields" });
  }

  const checkadminpassword=await User2.findOne({adminid:adminid})

  if(currentpassword!=checkadminpassword.password){
    return res.status(422).json({ error: "Current password not matched" });

  }
  if(newpassword!=renewpassword){
    return res.status(422).json({ error: "Password not matched" });
  }

 
  checkadminpassword.password=newpassword
  const checkSave = await checkadminpassword.save()
  if(checkSave){
    return res.status(200).json({ message: "Password updated successfully"});
  }
  else{
    return res.status(422).json({ error: "Password not updated" });

  }

})





module.exports = router;
