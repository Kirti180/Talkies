// require("dotenv").config({ path: "/Users/owaisazmi/Desktop/melted-group-7444/Backend/.env" });
require("dotenv").config();
const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors({
    origin : '*'
}))
// kl
const httpServer =  http.createServer(app);

app.get("/start" , (req,res) => {
    res.send("Welcome To Talkies Video Server");
})


const io = new Server(httpServer , {
    cors : {
        origin : '*'
    }
})

io.on('connection', (socket) => {

    socket.on('join-room' , (RoomID , userID) => {

        console.log(`${userID} joined room ${RoomID}`);
        socket.join(RoomID);
        socket.to(RoomID).emit('user-join' , userID);

        socket.on('disconnect' , () => {
            socket.to(RoomID).emit('user-disconnected', userID);
        })
    })

})

httpServer.listen(process.env.PORT , () => {
    console.log(`Server started at ${process.env.PORT}`);
})