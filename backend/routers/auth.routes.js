const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const authRoute = express.Router();
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config();


authRoute.get("/github",async (req,res)=>{
    const code = req.query.code;
    const accessToken = await fetch(`https://github.com/login/oauth/access_token`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "content-type":"application/json"
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret:process.env.GITHUB_CLIENT_SECRET,
            code:code
        })
    }).then((res)=> res.json())

    const user = await fetch(`https://api.github.com/user`,{
        method:"GET",
        headers:{
            Authorization: `Bearer ${accessToken.access_token}`
        }
    })
    .then((res)=> res.json());
    console.log(user);
    res.send("Authentication successfull");
})





passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://talkies-authentication-server-1.onrender.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log(profile)
  }

));


app.get('/auth/google',passport.authenticate('google', { scope: ['profile',"email"] }));

app.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
});


module.exports={
    passport
}


module.exports = {
    authRoute
}