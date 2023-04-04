var GitHubStrategy = require("passport-github2").Strategy;
const passport3 = require("passport");
require("dotenv").config();
const { usermodel } = require("../model/user.model");
const { v4: uuidv4 } = require("uuid");

passport3.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://talkies-authentication-server-1.onrender.com/auth/github/callback",
      scope: "user:email",
    },
    async function (accessToken, refreshToken, profile, done) {
      let email = profile.emails[0].value;
      let udata = await usermodel.findOne({ email });
      if (udata) {
        return done(null, udata);
      }
      let name = profile._json.name;
      let N = name.trim().split(" ");
      let logo = N[0][0] + N[N.length - 1][0];
      const user = new usermodel({
        name,
        logo,
        email,
        password: uuidv4(),
      });
      await user.save();
      return done(null, user);
      console.log(profile);
    }
  )
);

module.exports = { passport3 };
