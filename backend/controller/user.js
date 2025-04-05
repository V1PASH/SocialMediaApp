const User = require("../models/User");
const Post=require("../models/Post");

exports.register= async (req, res) => {
    try{

        const {name,email,password} = req.body;

        let user=await User.findOne({email:email});
        if(user) return res.status(400).json({sucess:false,message:"User already exists"});

        user =await User.create({
            name,
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
            sucess: false,
            message: err.message,
        })
    }
};
exports.login=async (req, res) => {
    try{
        const {email,password} = req.body;
        const user=await User.findOne({email }).select("+password");
        if(!user){
            return res.status(400).json({sucess:false,message:"User doesnt exist"});
        }
        const isMatch=await  user.matchPassword(password);
         if(!isMatch) return res.status(400).json({sucess:false,message:"incorrect password"});

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
            sucess: false,
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
                sucess:false,
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
            sucess:false,
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
            return res.status(400).json({sucess:false,message:"incorrect password"});
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
            sucess:false,
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
            sucess:true,
            message:"User Updated"
        })
    }
    catch (err){
        res.status(500).json({
            sucess:false,
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
            sucess:true,
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
               sucess:false,
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