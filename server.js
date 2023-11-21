const express = require("express")
const app = express()
const cors = require("cors");
app.use(cors({
  origin:"*"
}));
// to use (.env file access)
require('dotenv').config()
const dbConfig = require("./config/dbConfig")
const http = require("http").createServer(app)
const initializeSocket = require('./sockets/chatSocket')

// to destructure json type data from user as reqest 
app.use(express.json())

// user
const userRoute = require('./routes/userRoute')
// when ever this kind of end points come it will search in userRoute
app.use("/api/user", userRoute)

// developer
const developerRoute = require('./routes/developerRoute')
app.use("/api/developer", developerRoute)


//  developer
const adminRoute = require('./routes/adminRoute')
app.use("/api/admin", adminRoute)
const port = process.env.PORT || 5000;
const server = http.listen(port, () => {
  console.log("server running");
})

initializeSocket(server)