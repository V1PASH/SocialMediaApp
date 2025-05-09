const Post=require("../models/Post");
const User=require("../models/User");
const cloudinary=require("cloudinary");

exports.createPost=async (req,res)=>{
    try{

        const myCloud=await cloudinary.v2.uploader.upload(req.body.image,{
            folder:"posts"
        })

        const newPostData={
            caption:req.body.caption,
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            },
            owner:req.user._id,
        }
        const post=await Post.create(newPostData);

        const user=await User.findById(req.user._id)
        user.posts.unshift(post._id)

        await user.save();
        res.status(201).json({
                success:true,
                message:"Post Created",
                post:post
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deletePost=async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found."
            })
        }

        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"You dont have permission to delete the post."
            })
        }
        await post.deleteOne();
        const user=await User.findById(req.user._id);

        const index=user.posts.indexOf(req.params.id)
        user.posts.splice(index,1)

        await user.save();
        res.status(200).json({
            success:true,
            message:"Post deleted successfully."
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


exports.likeAndUnlikePost=async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        console.log("Post ID:", req.params.id);

        if(!post){
             return res.status(404).json({
                 success:false,
                 message:'Post not found'
             })
         }
        if(post.likes.includes(req.user._id)){
            const index=post.likes.indexOf(req.user._id);
            post.likes.splice(index,1);
             await post.save()
            return res.status(200).json({
                success:true,
                message:"Post unliked"
            })
        }
        else{
            post.likes.push(req.user._id)
            await post.save()
            return res.status(200).json({
                success:true,
                message:"Post liked"
            })
        }

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


exports.getPostOfFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // Get all posts where the owner is in user's "following" list
        const posts = await Post.find({
            owner: { $in: user.following }
        })
            .populate("owner likes comments.user")

        res.status(200).json({
            success: true,
            posts:posts.reverse(),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateCaption=async (req,res)=>{
    try{
        const post= await  Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }
        if(post.owner.toString()!==req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"unauthorized user"
            })
        }
        post.caption =req.body.caption;

        await  post.save();

        res.status(200).json({
            success:true,
            message:"Post Updated"
        })
    }
    catch (e) {
        res.status(500).json({
            sucess:false,
            message:e.message
        })
    }
}


exports.commentOnPost=async (req,res)=>{
    try{
        const post=await  Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }
        let commentIndex=-1;

        post.comments.forEach((item,index)=>{
            if(item.user.toString()===req.user._id.toString()){
                commentIndex= index
            }
        })

        if(commentIndex !== -1){
            post.comments[commentIndex].comment = req.body.comment;
            await  post.save();
            res.status(200).json({
                success:true,
                message:"Comment Updated"
            })
        }

        else {
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment,
            });
            await post.save();

            return res.status(200).json({
                success:true,
                message:"Comment Added"
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


exports.deleteComment=async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                success:false,
                message:"post not found"
            })
        }



        // for owner
        if(post.owner.toString()===req.user._id.toString()){

            if(req.body.commentId==undefined){
                return res.status(400).json({
                    success:false,
                    message:"comment id found"
                })
            }
            post.comments.forEach((item,index)=>{
                if(item._id.toString()===req.body.commentId.toString()){
                    return post.comments.splice(index,1)
                }
            });

            await post.save();

            res.status(200).json({
                success:true,
                message:"selected Comment Deleted"
            })
        }
        // for others
        else{
            post.comments.forEach((item,index)=>{
                if(item.user.toString()===req.user._id.toString()){
                   return post.comments.splice(index,1)
                }
            });
            await post.save();

            res.status(200).json({
                success:true,
                message:"your Comment Deleted"
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

