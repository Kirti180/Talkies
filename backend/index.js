
const express = require("express")
require("dotenv").config()
const app  = express()
const {connection} = require("./config/db")
app.use(express.json())
const {userrouter} = require("./routers/userRouter")




app.get("/",(req,res)=>{
     res.send("wlc to home page")
})

app.use("/user",userrouter)

app.listen(process.env.port,async()=>{
     try{
        await connection
        console.log("db is connect ")
       

     }catch(err){
         console.log({err:err.message})
        
     }

     console.log(`server is running ${process.env.port} .....`)
})