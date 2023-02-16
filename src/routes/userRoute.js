const express = require("express");
const router = express.Router();

const googleAuth = ("../controllers/user-googleAuth.js");



const loginAnRegisterController = require("../controllers/loginAnRegisterController");
router.post("/register", loginAnRegisterController.register);
router.post("/login", loginAnRegisterController.login, googleAuth.signInWithRedirect);

module.exports = router;