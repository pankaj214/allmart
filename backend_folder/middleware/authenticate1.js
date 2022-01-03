const jwt=require('jsonwebtoken')
const User2=require('../models/modeladmin')
require("dotenv").config({ path: "./config.env" });
const sessionStorage=require('sessionstorage')

const Authenticate1=async(req,res,next)=>{
   try{
            const token1=sessionStorage.getItem('adminjwtoken')
            const verifyToken1=jwt.verify(token1,process.env.SECRET_KEY)

            const userRoot=await User2.findOne({_id:verifyToken1._id,"tokens.token":token1})

            if(!userRoot){
                throw new Error('Please be Login')
            }
            req.token1=token1
            req.userRoot=userRoot
            req.userId1=userRoot._id

            next()
        }
        catch(err){
            return res.status(400).json({error:'Please be login'})
        }
    
    
}

module.exports=Authenticate1