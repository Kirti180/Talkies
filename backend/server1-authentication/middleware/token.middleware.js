const jwt = require('jsonwebtoken');
const { client } = require("../config/db");
require("dotenv").config();

const authorization = (req, res, next) => {
    const {token} = req.body;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        try {
            if (err) {
                res.send({ "ok":false ,"msg": "Please Login First" });
                return;
            }

            if (decoded) {
                let chk = await client.exists(`${token}`);

                if (chk) {
                    res.send({ "ok":false ,"msg": "Please Login First" });
                } else {
                    next();
                }

            } else {
                res.send({ "ok":false ,"msg": "Please Login First" });
            }

        } catch (error) {
            console.log(error);
            res.status(400).send({ "ok": false, "msg": "Something went wrong with middleware" })
        }
    });
}

module.exports = {
    authorization
}