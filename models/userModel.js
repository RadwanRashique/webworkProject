const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },

        age: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        otp: {
            type: String

        },
        isVerfied: {
            type: Boolean,
            default: false,
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        image: {
            type: String,
            default: "https://bootdey.com/img/Content/avatar/avatar7.png"
        },
        isadmin: {
            type: String,
            default: 0
        },
        developerYouFollow: {
            type: Array
        }



    },
    {
        timestamps: true
    }



)

const userModel = mongoose.model("users", userSchema)

module.exports = userModel