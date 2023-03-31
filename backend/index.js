const express = require("express")

const cors = require("cors")
const app = express()
const { connection } = require("./config/db")
app.use(cors())
app.use(express.json())
const { userrouter } = require("./routers/userRouter")

require("dotenv").config();

app.get("/", (req, res) => {
     res.send("wlc to home page")
})

app.use("/user", userrouter)

app.listen(process.env.port, async () => {
     try {
          await connection
          console.log("db is connect ")


     } catch (err) {
          console.log({ err: err.message })

     }

     console.log(`server is running ${process.env.port} .....`)
})