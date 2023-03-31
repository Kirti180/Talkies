const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const userrouter = express.Router();

userrouter.use(express.json());

const { usermodel } = require("../config/module");



// sign in part is hare ...............................

userrouter.post("/sign", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const auser = await usermodel.findOne({ email });

    if (auser) {
      res.send("user already register");
    }else{

      
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ err: err.message });
        }
        
        const user = new usermodel({ name, email, password: hash});
        
        await user.save();
        
        res.send({ mes: "resistration sucucfull" });
      });
    }
    } catch (err) {
      res.send({ mes: err.message });
    }
});


//  login part is hare ..............................

userrouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email });
    
    if (!user) {
      res.send({"ok":false, mes: "user not found" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30m",
          });


          res.send({
            "ok":true,
            "mes": "login successfully",
            "user_details":{name:user[0].name,email:user[0].email},
            "token": token         
          });
        } else {
          res.send({"ok":false, "mes":"Wrong credentials"});
        }
      });
    }
  } catch (err) {
    res.send({ mes: err.message });
  }
});



module.exports = { userrouter };
