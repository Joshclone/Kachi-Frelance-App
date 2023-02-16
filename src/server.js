// jshint esversion: 6
require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute.js");
const GoogleAuth = require("./routes/user-googleAuth");
const config = require("config");
const dbConfig = config.get("dbuser.dbConfig.dbName");
// const admin = require("firebase-admin");
// const { GoogleAuthProvider } = require("firebase/auth");
// const credentials = require()











app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(setUser); 
// MIDDLEWARES

app.get("/app", (req, res) => {
  res.send('Home Page')
 });
 
app.use("/app", userRoute);
app.use("/app/admin", adminRoute);
app.use("/app/google-auth", GoogleAuth);

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
//IMPORT MONGOOSE-----------------------------------------------------------------

mongoose
  .connect(dbConfig)
  .then(() => console.log(`Connection to Database successful`))
  .catch((e) => console.log(e.message));
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// -----------------------------------------------------------------

