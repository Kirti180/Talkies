
const mongoos = require("mongoose");
const { createClient } = require('redis');
require("dotenv").config()

const connection  = mongoos.connect(process.env.mongoURL);

const client = createClient({
    url: process.env.REDIS
});

module.exports={connection, client}