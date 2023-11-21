const mongoose = require('mongoose')

const userCommentRatingsSchema = new mongoose.Schema({


    devloperId: {
        type: String
    },
    userId: {
        type: String
    },
    userImage: {
        type: String
    },
    userName: {
        type: String
    },

    userComments: [{
        userComment: {
            type: String
        }
    }
    ]
    ,
    userRating: {
        type: Number
    }

},
    {
        timestaps: true
    }

)

const UserCommentRatings = mongoose.model("UserCommentAndRating", userCommentRatingsSchema)

module.exports = UserCommentRatings