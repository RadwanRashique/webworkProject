// this schema is to store all details of subscribed developer


const mongoose = require('mongoose')


const SubscribeddeveloperSchema = new mongoose.Schema(

    {
        userId: {
            type: String,

        },
        date: {
            type: Date,
        },
        expireDate: {
            type: Date
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        age: {
            type: String,
        },
        password: {
            type: String,
        },
        phone: {
            type: Number,
        },


        field: {
            type: String,
        },
        interest: {
            type: String,
        },
        workCount: {
            type: Number,
        },
        language: {
            type: String,
        },
        webtype: {
            type: String,
        },
        experience: {
            type: Number,
        },
        education: {
            type: String,
        }, fromTime: {
            type: String,
            required: true,
        },
        toTime: {
            type: String,
            required: true,
        },
        about: {
            type: String,
        },
        instaUrl: {
            type: String,
            default: ""

        },
        facebookUrl: {
            type: String,
            default: ""
        },
        linkedinUrl: {
            type: String,
            default: ""

        },
        image: {
            type: String,
            default: "https://bootdey.com/img/Content/avatar/avatar7.png"

        },
        planName: {
            type: String,
        },
        price: {
            type: Number,
        },
        duration: {
            type: String,
        },
        followersCount: {
            type: Number,
            default: 0
        },
        avgRating: {
            type: String

        },
        dateOver: {
            type: Boolean,
            default: false

        }




    },

    {
        timestamps: true
    }
)

const subscribedDeveloper = mongoose.model('subscribedDeveloper', SubscribeddeveloperSchema)

module.exports = subscribedDeveloper