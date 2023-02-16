const User = require("../models/userSchema");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider,  signInWithRedirect, getRedirectResult } from "firebase/auth";



// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDCqrymcDsL14w17F7tEpi7nwed1j27HhY",
  authDomain: "auth-b859f.firebaseapp.com",
  projectId: "auth-b859f",
  storageBucket: "auth-b859f.appspot.com",
  messagingSenderId: "635270486020",
  appId: "1:635270486020:web:9c078ecbde22dd0c6d3d51",
  measurementId: "G-8ZXP471831"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
//const analytics = getAnalytics(app);


const auth = getAuth(app);
signInWithRedirect (auth, provider);


  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
   
      
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });



module.exports = {
  signInWithRedirect
}