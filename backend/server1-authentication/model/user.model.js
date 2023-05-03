const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    oauth:{type:Object}
},{
    versionKey:false
})

const usermodel = mongoose.model("user",userschema)

module.exports={usermodel}
