const express = require("express");
const router = express.Router();

const admin = require("../controllers/adminController");


const { AdminRegister,
        Adminlogin,
         checkAdmin
} = require("../utils/adminAuth");

router.get("/page", checkAdmin, (req, res) => {
  // Admin-only code
  res.send("Hello, admin! -- Welcome to the admin Page");
});

router.post("/register", AdminRegister);
router.post("/login", Adminlogin);

router.get("/users", admin.getAllUser);
router.post("/", admin.createUser);
router.get("/:id", admin.getUserbyId);
router.patch("/:id", admin.updateUser);
router.delete("/:id", admin.removeUser);


  
module.exports = router;


