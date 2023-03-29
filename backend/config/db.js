
const mongoos = require("mongoose")
require("dotenv").config()
const connection  = mongoos.connect(process.env.mongoURL)

module.exports={connection}

