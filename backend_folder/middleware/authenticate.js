const jwt=require('jsonwebtoken')
const User=require('../models/model')
require("dotenv").config({ path: "./config.env" });
const sessionStorage=require('sessionstorage')
const Authenticate=async(req,res,next)=>{
   try{
            const token=sessionStorage.getItem('jwtoken')
            const verifyToken=jwt.verify(token,process.env.SECRET_KEY)

            const root=await User.findOne({_id:verifyToken._id,"tokens.token":token})

            if(!root){
                throw new Error('Please be Login')
            }
            req.token=token
            req.root=root
            req.userId=root._id

            next()
        }
        catch(err){
            return res.status(400).json({error:'Please be login'})
        }
    
    
}

module.exports=Authenticate