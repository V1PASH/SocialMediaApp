const express = require("express");
const {register, login, followUser, updatePassword} = require("../controller/user");
const {isAuthenticated} = require("../middleswares/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/follow/:id").get(isAuthenticated,followUser)
router.route("/update/password").put(isAuthenticated,updatePassword)

module.exports = router;