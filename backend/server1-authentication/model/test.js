const mongoose=require("mongoose")
const testSchema = mongoose.Schema({
    email:String,
    name:String,
    check:String
})
const testModel = mongoose.model("test",testSchema)

module.exports={testModel}