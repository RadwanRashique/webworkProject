    const mongoose= require('mongoose')

    const ChatConnectionSchema= new mongoose.Schema({

        userId:{
            type:String
        },
        developerId:{
            type:String
        },
        developerImage:{
     type:String
        },
        developerName:{
            type:String
        },
        userName:{
            type:String
        },
        userImage:{
            type:String
        }

    },
    {
        timestamps: true
    }
    
    )

    module.exports = mongoose.model("chatConnections",ChatConnectionSchema)