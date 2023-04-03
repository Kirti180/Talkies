const express = require("express");
const { client } = require("../db");
const roomRoute = express.Router();
require('dotenv').config();

roomRoute.post("/create", async (req, res) => {
    try {
        const { roomID, type } = req.body;
        await client.set(`${roomID}`, `${type}`);
        await client.expire(`${roomID}`, 60*60);
        
        res.send({ "ok": true, "msg": "Room created successfully" });
    } catch (error) {
        console.log(error);
        res.send({ "ok": false, "msg": "Something went wrong" });
    }
})

roomRoute.post('/join', async (req, res) => {
    try {
        const { roomID, type } = req.body;
        let check = await client.exists(`${roomID}`);

        if(check){
            const dbType = await client.get(`${roomID}`);
            
            if(dbType == type){
                res.send({ "ok": true, "msg": "Room joined successfully" });
            } else {
                res.send({ "ok": false, "msg": `${type} Room Doesn't Exist`});
            }
        } else {
            res.send({ "ok": false, "msg": "Room Doesn't Exist"});
        }

    } catch (error) {
        console.log(error);
        res.send({ "ok": false, "msg": "Something went wrong" });
    }
})



module.exports = {
    roomRoute
}