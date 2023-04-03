const { createClient } = require('redis');
require("dotenv").config();

const client = createClient({
    url: process.env.REDIS
});

module.exports = {
    client
}