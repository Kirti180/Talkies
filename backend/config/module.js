
const mongoose = require("mongoose")

const userschema = mongoose.Schema({
     
    name:{type:String},
    email:{type:String},
    password:{type:String}
},{
    versionKey:false
})

const usermodel = mongoose.model("user",userschema)

module.exports={usermodel}
