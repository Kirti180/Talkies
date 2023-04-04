const express = require("express")
const cors = require("cors");
const app  = express();
const {connection, client} = require("./config/db");
const {userrouter} = require("./routers/user.routes");
const { authRoute } = require("./routers/auth.routes");
const {githubRouter} = require("./routers/github.routes")
const { logger } = require("./middleware/logger.middleware");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(logger)

app.get("/",(req,res)=>{
     res.send("welcome to Talkies home page")
})

app.use("/user",userrouter);

// app.use("/", githubRouter);

app.use("/", authRoute);

app.listen(process.env.port,async()=>{
     try{
        await connection;
        console.log("Database is connected ");
        await client.connect();
        console.log("Redis connected");
     }catch(err){
         console.log(err)
     }
     console.log(`server is running ${process.env.port}`)
})