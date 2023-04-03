const express = require("express");
const { client } = require("../db");
const roomRoute = express.Router();

roomRoute.post("/create", async (req, res) => {
    try {
        const { roomID, type } = req.body;
        await client.set(`${roomID}`, `${type}`);
        await client.expire(`${roomID}`, 60*60);
        
        res.send({ "ok": true, "msg": "Room created successfully" });
    } catch (error) {
        console.log(error);
        res.send({ "ok": false, "msg": error.message });
    }
})

roomRoute.post('/join', async (req, res) => {
    try {
        const { roomID, type } = req.body;
        console.log("room :",roomID, "type: ",type);
        let check = await client.exists(`${roomID}`);
        console.log(check);

        if(check){
            const dbType = await client.get(`${roomID}`);
            console.log(dbType);
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
        res.send({ "ok": false, "msg": `${error.message}` });
    }
})



module.exports = {
    roomRoute
}