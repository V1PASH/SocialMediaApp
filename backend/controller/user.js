const User = require("../models/User");
const Post=require("../models/Post");
const {sendEmail}=require("../middleswares/sendEmail")
const crypto = require("crypto");

exports.register= async (req, res) => {
    try{
        const {name,email,password,username} = req.body;

        let user=await User.findOne({username:username});
        if(user) return res.status(400).json({success:false,message:"User already exists"});

        user =await User.create({
            name,
            username,
            email,
            password,
            avatar:{public_id:"",url:""}
        });

        const token=await user.generateToken();

        const options={
            expires:new Date(Date.now()+30*24*60*60*1000),
            httpOnly:true,
        }
        res.status(201).cookie("token",token,options).json({
            success:true,
            user,
            token
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};
exports.login=async (req, res) => {
    try{
        const {username,password} = req.body;
        const user=await User.findOne({username}).select("+password");
        if(!user){
            return res.status(400).json({success:false,message:"User doesn't exist"});
        }
        const isMatch=await  user.matchPassword(password);
         if(!isMatch) return res.status(400).json({success:false,message:"Incorrect password"});

         const token=await user.generateToken();

         const options={
             expires:new Date(Date.now()+30*24*60*60*1000),
             httpOnly:true,
         }
         res.status(201).cookie("token",token,options).json({
             success:true,
             user,
             token
         });

    }
    catch (err){
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

exports.followUser=async (req, res) => {
    try{
        const userToFollow=await User.findById(req.params.id)
        const loggedInUser=await User.findById(req.user._id)

        if(!userToFollow){
          return  res.status(404).json({
                success:false,
                    message:"User Not Found"
            })
        }
        if(loggedInUser.following.includes(userToFollow._id)){

            const indexFollowing=loggedInUser.following.indexOf(userToFollow._id)
            loggedInUser.following.splice(indexFollowing,1);
            const indexFollowers=userToFollow.followers.indexOf(loggedInUser._id);
            userToFollow.followers.splice(indexFollowers,1)
            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                success:true,
                message:"User Unfollowed"
            })
        }
        else{
            loggedInUser.following.push(userToFollow._id);
            userToFollow.followers.push(loggedInUser._id);


            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                success:true,
                message:"User Followed"
            })
        }


    }
    catch (error){
    res.status(500).json({
        success:false,
        message:error.message
    })
    }
}

exports.logout=async (req, res) => {
    try{
        res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true}).json({
            success:true,
            message:"User Logged out"
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message,
        })
    }
}

exports.updatePassword=async (req, res) => {
    try{
        const user=await User.findById(req.user._id).select("+password");

        const {oldPassword,newPassword} = req.body;

        const isMatch=await user.matchPassword(oldPassword);


        if(!isMatch){
            return res.status(400).json({success:false,message:"incorrect password"});
        }

        user.password=newPassword;
        await user.save();

        res.status(200).json({
            success:true,
            message:"User Updated"
        })
    }
    catch (error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.updateProfile=async (req, res) => {
    try{
        const user=await User.findById(req.user._id);
        const {name, email}=req.body;

        if(name){
            user.name=name
        }
        if(email){
            user.email=email
        }

        await user.save();

        res.status(200).json({
            success:true,
            message:"User Updated"
        })
    }
    catch (err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.deleteMyProfile=async (req,res)=>{
    try{
        const user =await User.findById(req.user._id);
        const posts=user.posts;
        const followers=user.followers;
        const userId=user._id;
        // removing posts
        for (let i = 0; i < posts.length; i++) {
            const post= await Post.findById(posts[i])
            await post.deleteOne();
        }

        // removing user from following and followers

        await Promise.all(user.followers.map(async (followerId) => {
            const follower = await User.findById(followerId);
            if (follower) {
                follower.following = follower.following.filter(id => id.toString() !== userId.toString());
                await follower.save();
            }
        }));

        // 3. Remove this user from followings' followers list
        await Promise.all(user.following.map(async (followingId) => {
            const followingUser = await User.findById(followingId);
            if (followingUser) {
                followingUser.followers = followingUser.followers.filter(id => id.toString() !== userId.toString());
                await followingUser.save();
            }
        }));



        await user.deleteOne();

        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })

        res.status(200).json({
            success:true,
            message:"user Deleted"
        })
        
    }
    catch (e) {
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

exports.myProfile=async (req,res)=>{
    try{
        const user=await User.findById(req.user._id).populate("posts")

        res.status(200).json({
            success:true,
            user
        })
    }
    catch (e) {
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

exports.getUserProfile=async (req,res)=>{
    try{
       const user=await User.findById(req.params.id).populate("posts")

        if(!user){
           res.status(404).json({
               success:false,
               message:"user not found"
           })
        }
        res.status(200).json({
            success: true,
            user,
        });

    }
    catch (e) {
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

exports.getAllUsers=async (req,res)=>{
    try{
        const users=await User.find({});
        res.status(200).json({
            success:true,
            users,
        })
    }
    catch (e) {
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

exports.forgotPassword=async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }

        const resetPasswordToken= await user.getResetPasswordToken();

        await user.save();

        const resetUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetPasswordToken}`;

        const message=`Reset your password by clicking on the link below \n\n ${resetUrl}`

        try{
            await sendEmail({
                to: user.email,
                subject: "reset password",
                message,
            });


            res.status(200).json({
                success:true,
                message:`email sent to ${user.email}`
            })
        }
        catch (e) {
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;

            await user.save();
            res.status(500).json({
                success:false,
                message:e.message
            })
        }

    }
    catch (e) {
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

exports.resetPassword=async (req,res)=>{
    try{

        const resetPasswordToken=crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user=await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()},
        })

        if (!user){
            return res.status(401).json({
                success:false,
                message:"invalid or expired token "
            })
        }

        user.password=req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();

        res.status(200).json({
            success:true,
            message:`password reset successfully`
        })

    }
    catch (e){
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}


exports.updateUsername = async (req, res) => {
    try {
        const newUserName = req.body.newusername;

        const user = await User.findById(req.user._id).select("+username");

        const isAvailable = await User.findOne({ username: newUserName });
        if (isAvailable) {
            return res.status(400).json({
                success: false,
                message: "Username already exists",
            });
        }

        user.username = newUserName;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Username updated",
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};
