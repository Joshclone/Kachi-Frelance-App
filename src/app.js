// jshint esversion: 6
require("dotenv").config();

const express = require("express");
const cors = require('cors');
const connectDB = require('./config/config.database');
const app = express();
const bodyParser = require('body-parser');
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute.js");
const firebaseRoute = require("./routes/fireBasegoogleauthroute");






/* Middleware */

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(setUser); 



/* Routes */
app.get("/app", (req, res) => {
  res.send('Home Page')
 });
 
app.use("/app", userRoute);
app.use("/app/admin", adminRoute);
app.use("/app", firebaseRoute);
app.get("/app/dashboard", (req, res) => {
 res.send('Dashboard Page')
});




function setUser(req, res, next)
{
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
}
/* Mongoose Setup */
connectDB(app);
// -----------------------------------------------------------------

