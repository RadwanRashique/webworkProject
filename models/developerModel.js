const mongoose = require('mongoose')

const developerSchema = new mongoose.Schema(

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
            type: String,

        },
        isVerfied: {
            type: Boolean,
            default: false,
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        formCollected: {

            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: "empty"

        },
        payment: {
            type: String,
            required: false
        },
        dateOver: {
            type: Boolean,
            default: false

        },
       

        paymentHistory: [
            {
              date: Date,
              expireDate: Date,
              planName: String,
              price: Number,
              duration: String,
            }
          ],

    },
    {
        timestamp: true
    }
)

const developerModel = mongoose.model('developers', developerSchema)

module.exports = developerModel