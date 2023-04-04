const express = require("express");
const { testModel } = require("../model/test");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const authRoute = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
// const idnex= require("../dashboard.html")
const { usermodel } = require("../model/user.model");

//google outh
authRoute.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRoute.get(
  "/auth/google/callback",
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/google/failure',
    session: false

  })
);
authRoute.get('/auth/google/success', (req, res) => {
  console.log("dashboard")
  res.sendFile(__dirname+ "/../view/dashboard.html")
  
})
const GOOGLE_CLIENT_ID = "583391664954-j2jsnbsg2lmqbnrgj21baorh1msstdj5.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
passport.use(

  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://talkies-authentication-server-1.onrender.com/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let email = profile._json.email;
      let name = profile._json.name;
      const user = new testModel({ email, name });
      await user.save();
      return done(null, user);
      //   console.log(profile);
    }
  )

);

authRoute.get('/auth/github/success', (req, res) => {
  console.log("dashboard")
  res.sendFile(__dirname+ "/../view/dashboard.html")
  
})

// github auth

authRoute.get("/auth/github", async (req, res) => {
  const code = req.query.code;
  const accessToken = await fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    })
  }).then((res) => res.json())
  // console.log(accessToken);

  const user = await fetch(`https://api.github.com/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken.access_token}`
    }
  })
    .then((res) => res.json());
  console.log(user);
  res.send("Authentication successfull");
})





// var GitHubStrategy = require('passport-github2').Strategy;

// passport.use(new GitHubStrategy({
//   clientID: process.env.GITHUB_CLIENT_ID,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET,
//   callbackURL: "https://talkies-authentication-server-1.onrender.com/auth/github/callback"
// },
//   async function (request, accessToken, refreshToken, profile, done) {
//     let email = profile._json.email;
//     let name = profile._json.name;
//     const user = new testModel({ email, name });
//     await user.save();
//     return done(null, user);
//     //   console.log(profile);
//   }
// ));

// authRoute.get('/auth/github',
//   passport.authenticate('github', { scope: ['user:email'] }));

// authRoute.get('/auth/github/callback',
//   passport.authenticate('github', {
//     successRedirect: '/auth/github/success',
//     failureRedirect: '/github/failure',
//     session: false

//   })
// );

// authRoute.get('/auth/github/success', (req, res) => {
//   res.send("Github page")
// })

// passport.use(
//     new GitHubStrategy(
//       {
//         clientID: process.env.GITHUB_CLIENT_ID,
//         clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         callbackURL: "https://talkies-authentication-server-1.onrender.com/auth/github/callback",
//         scope: "user:email",
//       },
//       async function (accessToken, refreshToken, profile, done) {
//         let email = profile.emails[0].value;
//         let udata = await usermodel.findOne({ email });
//         if (udata) {
//           return done(null, udata);
//         }
//         let name = profile._json.name;
//         let N = name.trim().split(" ");
//         let logo = N[0][0] + N[N.length - 1][0];
//         const user = new usermodel({
//           name,
//           logo,
//           email,
//           password: uuidv4(),
//         });
//         await user.save();
//         return done(null, user);
//         console.log(profile);
//       }
//     )
//   );

module.exports = {
  authRoute
};
