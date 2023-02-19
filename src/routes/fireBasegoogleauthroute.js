const router = express.Router();
const admin = require('../config/firebaseConfig');

const requireAuth = (req, res, next) => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/dashboard", requireAuth, (req, res) => {
  res.render("dashboard", { user: req.user });
});

router.get("/auth/google", (req, res) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const token = result.credential.accessToken;
      const user = result.user;
      res.redirect("/dashboard");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/login");
    });
});

router.get("/auth/logout", (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      res.redirect("/app/login");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/login");
    });
});








module.exports = router;
