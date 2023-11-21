const mongoose = require('mongoose')

const developerDetailsSchema = new mongoose.Schema(

    {
        field: {
            type: String,
            required: true
        },
        interest: {
            type: String,
            required: true
        },
        workCount: {
            type: Number,
            required: true
        },
        language: {
            type: String,
            required: true
        },
        webtype: {
            type: String,
            required: true
        },
        experience: {
            type: Number,
            required: true
        },
        education: {
            type: String,
            required: true
        },
        fromTime: {
            type: String,
            required: true,
        },
        toTime: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            required: true
        },
        instaUrl: {
            type: String,
            required: false

        },
        facebookUrl: {
            type: String,
            required: false
        },
        linkedinUrl: {
            type: String,
            required: false

        },
        image: {
            type: String,
            default: "https://bootdey.com/img/Content/avatar/avatar7.png"

        },
        userId: {
            type: String
        },
        status: {
            type: String,
            default: "empty"
        },


    },

    {
        timestamps: true
    }
)

const developerDetailsModel = mongoose.model('developerDetails', developerDetailsSchema)

module.exports = developerDetailsModel