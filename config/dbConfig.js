// node js mongodb connection setup
const mongoose = require("mongoose")

const connect = mongoose.connect(process.env.MONGO_URL)

// connetion object
const connection = mongoose.connection


// method to verify connection 

connection.on("connected", () => {
    console.log("mongodb connected")
})

connection.on("error", (error) => {
    console.log("error in mongodb connection", error)
})


// export

module.exports = mongoose