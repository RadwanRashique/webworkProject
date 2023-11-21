const mongoose = require('mongoose')

const ChatMessageSchema= new mongoose.Schema({
    room_id:{
        type:String
    },
    userId:{
        type:String
    },
    developerId:{
        type:String
    },
    senderId:{
type:String
    },
    message:{
        type:String
    },
    time:{
        type:String
    }


},
{
    timestamps: true
}

)

module.exports = mongoose.model("ChatMessage",ChatMessageSchema)