const mongoose = require('mongoose')

const subscriptionManageSchema = new mongoose.Schema(
    {
        planName: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        duration: {
            type: String,
            required: true
        }



    },
    {
        timestamps: true
    }
)

const subscriptionPlanModel = mongoose.model('subscriptionPlan', subscriptionManageSchema)

module.exports = subscriptionPlanModel