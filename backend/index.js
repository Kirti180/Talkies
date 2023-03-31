const express = require("express")
const cors = require("cors");
const app  = express();
const {connection} = require("./config/db");
const {userrouter} = require("./routers/user.routes");
const { authRoute } = require("./routers/auth.routes");
const {passport}=require("./routers/auth.routes")
require("dotenv").config();

app.use(cors());
app.use(express.json());


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