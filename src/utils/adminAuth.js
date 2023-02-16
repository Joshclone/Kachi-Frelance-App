var bcrypt = require('bcrypt')
const User = require("../models/adminSchema");
const {generateAccessToken} = require('../utils/authenticateUser');

const AdminRegister = async (req, res, next) => {
  try {
  const { firstName, lastName, email, password } = req.body;
  //before registering anyuser first validate that the email is not already in use

  const user = await User.findOne({ email });
  if (user) return res.status(403).json({ error: { message: "Email already in use" } });
  
  // Hash password then store in database
  const hash = await bcrypt.hash(password, 15)
  const newUser = new User({firstName, lastName, email, password: hash,  role: admin});
  const savedUser = await newUser.save()

  return res
      .status(201)
      .json({
          success: true,
          message: 'Admin registered successfully',
          data: {
              user: savedUser
          }
      })
} catch (e) {
  return res.status(500).json({
      success: false,
      message: e.message,
      error_code: e.code,
      data: {}
  })
}
};

const Adminlogin = async (req, res, next) => {
  
  const { email, password } = req.body;
  const user = await User.findOne({email});
  
  if (!user)
    return res
      .status(403)
      .json({error: {message: "invalid email/password"}});
  
  // Make sure the passwords are the same
  const comparePassword = await bcrypt.compare(password, user.password)

  // if they're not return an error
  if (!comparePassword)
    return res
      .status(403)
      .json({error: {message: "invalid email or password"}});
  
  user.toJSON()
  
  // create jwt token and send back to user
  const token = generateAccessToken(email)

  // add user object to request body
  req.user = user
  
    res.status(200).json({ message: "success- Admin logged in", access_token: token, user: user });
    
};  



//authenticate admin user
const checkAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(401).send("Unauthorized--You are not authorized to view this page(admin page)");
    }
   
    next();
  };
  
module.exports = {
  AdminRegister,
  Adminlogin,
    checkAdmin
}