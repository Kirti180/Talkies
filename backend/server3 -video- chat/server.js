// require("dotenv").config({ path: "/Users/owaisazmi/Desktop/melted-group-7444/Backend/.env" });
require("dotenv").config();
const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const cors = require('cors');
const { client } = require("./db");
const { roomRoute } = require("./routes/room.routes");

const app = express();
app.use(express.json());

app.use(cors({
    origin : '*'
}))

const httpServer =  http.createServer(app);

app.get("/start" , async(req,res) => {
    // Using setitemout so that the connection should be established
    try {
        setTimeout(()=>{
            res.send({"ok":true,"msg":"Connection Established successfully"});
        },3000)
        
    } catch (error) {
        res.send({"ok":false,"msg":"Something went wrong"});
    }
})

app.use("/room", roomRoute);

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

client.on('error', err => console.log('Redis Client Error', err));

httpServer.listen(process.env.PORT , async() => {
    try {
        await client.connect();
        console.log("Redis connected");
    } catch (error) {
        console.log(error);
        console.log("Redis not connected");
    }
    console.log(`Server started at ${process.env.PORT}`);
})