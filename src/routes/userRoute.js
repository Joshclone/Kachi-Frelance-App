const express = require("express");
const app = express();
const router = express.Router();
const middleware = require('../Middleware/firebaseMiddleware');
app.use(middleware.decodeToken);

// const {signInwithGoogle} = ("../config/firebase-config.js");
//router.post("/google-auth", middleware);


const loginAnRegisterController = require("../controllers/loginandRegistercontroller");
router.post("/register", loginAnRegisterController.register);
router.post("/login", loginAnRegisterController.login);

module.exports = router;