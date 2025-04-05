const express=require("express");
const {createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, } = require("../controller/post");
const {isAuthenticated} = require("../middleswares/auth");
const {logout} = require("../controller/user");

const router=express.Router();

router.route("/post/upload").post(isAuthenticated,createPost);
router.route("/post/:id").get(isAuthenticated,likeAndUnlikePost).delete(isAuthenticated,deletePost);
router.route("/posts").get(isAuthenticated,getPostOfFollowing);
router.route("/logout").get(isAuthenticated,logout)

module.exports = router;