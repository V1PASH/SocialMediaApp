const User=require('../models/User')
const jwt=require('jsonwebtoken')

exports.isAuthenticated=async (req, res, next)=>{
   try
   {
       const {token}=req.cookies;
       if(!token){
           return res.status(401).json({
               message:"Please log in",
           });
       }
       const decoded=await jwt.verify(token, process.env.JWT_SECRET);

       const { ObjectId } = require("mongodb");

       req.user = await User.findOne({ _id: new ObjectId(decoded._id) });

       next();
   }
   catch(error){
       res.status(500).json({
           message:error.message,
       })
   }

}

//Done