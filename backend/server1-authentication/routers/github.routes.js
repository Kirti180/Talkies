// const express = require("express");

// const { passport3 } = require("../config/github-oauth");
// const githubRouter = express.Router();
// const path = require("path");

// githubRouter.get("/login", (req, res) => {
//   let X = path.join("https://github.com/");
//   res.sendFile(X);
// });
// githubRouter.get(
//   "/auth/github",
//   passport3.authenticate("github", { scope: ["user:email"] })
// );

// githubRouter.get(
//   "/auth/github/callback",
//   passport3.authenticate("github", {
//     failureRedirect: "/login",
//     session: false,
//   }),
//   function (req, res) {
//     res.redirect("/login");
//   }
// );

// module.exports = { githubRouter };
