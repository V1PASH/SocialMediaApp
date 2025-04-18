const express = require("express");
const {register, login, followUser, updatePassword, updateProfile, deleteMyProfile, myProfile, getUserProfile,
    getAllUsers, forgotPassword, resetPassword,
    updateUsername,
    getMyPosts
} = require("../controller/user");
const {isAuthenticated} = require("../middleswares/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(isAuthenticated,myProfile);
router.route("/follow/:id").get(isAuthenticated,followUser)
router.route("/update/password").put(isAuthenticated,updatePassword)
router.route("/update/profile").put(isAuthenticated,updateProfile)
router.route("/delete/me").delete(isAuthenticated,deleteMyProfile);
router.route("/users").get(isAuthenticated,getAllUsers);
router.route("/user/:id").get(isAuthenticated,getUserProfile);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword)
router.route("/update/username").put(isAuthenticated,updateUsername)
router.route("/my/posts").get(isAuthenticated,getMyPosts)
module.exports = router;