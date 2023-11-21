require('dotenv').config()
// to hash  password (encrypt)
const bcrypt = require('bcryptjs')
// user model
const User = require("../models/userModel")
// developer model
const Developer = require("../models/developerModel")
const Banner = require('../models/bannerModel')
// developerDetailed data model
const developerDetails = require("../models/developerDetailsModel")

const jwt = require("jsonwebtoken")

// to send mail    (here otp to mail)
const nodemailer = require('nodemailer')

//  subscribed developer model
const subscribedDeveloper = require("../models/subscriptionPayedDeveloper")

// for image
const cloudinary = require("cloudinary").v2;
// from cloudinary take api_key
// import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
const developerDetailsModel = require('../models/developerDetailsModel')
const UserCommentRatings = require('../models/userCommentRatings')

const ChatConnectionModel = require('../models/chatModel')
const ChatMessageModel = require('../models/ChatMessage')

// to send notification  to developer (notificationModel)
const NotificationModel = require('../models/notification')



// mail verification
const sendVerifyMail = async (name, email, otp) => {
    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            tls: {
                rejectUnauthorized: false,
            },
            requireTLS: true,
            auth: {
                user: process.env.email,
                pass: process.env.password

            },


        })
        const mailOption = {
            from: "classtech916@gmail.com",
            to: email,
            subject: "to verify your details",
            html: "<p>Hi " + name + " This is your otp to verify your webwork account the otp is " + otp + "<p>",

        }
        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error)
            }
            else {
                console.log("email has been send", info.response)
            }
        })
    }

    catch (error) {
        console.log(error.message)

    }

}


// register

const register = async (req, res) => {
    let Email = req.body.email
    
    try {

        const userExists = await User.findOne({ email: Email })

        if (userExists) {
            return res.status(200).send({ message: "User already exists", success: false })
        }

        // password related
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword

        const newuser = new User(req.body)


        const user = await newuser.save()
        if (user) {
            const randomnumber = Math.floor(Math.random() * 900000) + 100000;


            let otp = randomnumber

            const userD = await User.updateOne({ email: Email }, { $set: { otp: otp } })



            sendVerifyMail(req.body.name, req.body.email, otp)


        }
        res.status(200).send({ message: "Enter otp in your mail for verification", success: true })
    }

    catch (error) {

        console.log("error at registeration")

        res.status(500).send({
            message: "Error creating user", success
                : false, error
        })

    }
}


// to vefify otp after registering
const verifyOtp = async (req, res) => {
   
    let EnteredOtp = req.body.otp
    try {
        const VerifiedOtp = await User.findOne({ otp: EnteredOtp })
        if (!VerifiedOtp) {

            return res.send({ message: 'otp is not valid', success: false })

        }
        else {

            const verify = await User.findOneAndUpdate({ email: req.body.email }, { $set: { otp: true, isVerfied: true } })
            res.status(200).send({ message: "otp verified", success: true })


        }

    }
    catch (error) {
        console.log("error at user otp verify", error)

        res.status(500).send({ message: "Error in otp ", success: false })
    }
}

// while clicking on resend otp button we need to send otp again

const verifyResendOtp = async (req, res) => {


    try {
        const user = await User.findOne({ email: req.body.email })
        const randomnumber = Math.floor(Math.random() * 900000) + 100000

        const name = user.name
        sendVerifyMail(name, req.body.email, randomnumber)
        var Data = await User.findOneAndUpdate({ email: req.body.email }, { $set: { otp: randomnumber } })

        if (Data) {

            res.status(200).send({ message: "check your mail ", success: true })
        } else {
            res.status(200).send({ message: "sending otp failed", success: false })
        }


    }

    catch (error) {
        console.log(error, "AT verifyResendOt")
    }
}


// login

const verifyLogin = async (req, res) => {
    try {
       

        const user = await User.findOne({ email: req.body.email })


        if (!user) {
            return res.status(200).send({ message: "User does not exist", success: false })
        }

        if (user) {
            if (user.isVerfied != true) {

                await User.findOneAndDelete({ email: req.body.email })
                return res.status(200).send({ message: "Account Not Verified SignUp Again", success: false })


            }

        }


        const password = user.password
        const cpassword = req.body.password
        const isVerfied = user.isVerfied
        const isBlocked = user.isBlocked


        const passwordMatch = await bcrypt.compare(cpassword, password);

        if (!passwordMatch) {

            return res.status(200).send({
                message: "password is incorrect", success: false
            })
        }
        else {
            if (isVerfied) {
                if (isBlocked) {
                    res.status(200).send({ message: " Sorry you are blocked  ", success: false })

                }
                else {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
                    res.status(200).send({ message: "Login successful", success: true, data: token })
                }
            }
        }

    }
    catch (error) {
        console.log(error)
        res.status(200).send({ message: "Error in login please recheck your email.", success: false, error })

    }
}



// to verify token
const tokenVerify = async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.body.userId })

        if (!user) {
            return res.status(200).send({
                message: "User does not exist ", success: false
            })
        }
        else {
            res.status(200).send({
                success: true, data: {
                    name: user.name,
                    email: user.email
                }
            })
        }

    }
    catch (error) {
        res.status(500).send({ message: "Error getting user info", success: false, error })

    }
}

// to desplay name at header 
const homeName = async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.body.userId })
        const userName = user;


        // Send the user's name as part of the JSON response
        res.status(200).send({ userName, success: true });

    }
    catch (error) {
        console.log(error)

    }


}


//  when user forget password
const forgetPassword = async (req, res) => {
    const postmail = req.body.email
    try {

        const userExist = await User.findOne({ email: postmail })

        if (!userExist) {
            return res.status(200).send({ message: "Enter the correct mail or register first", success: false })

        }
        else {

            let usermail = postmail


            const randomnumber = Math.floor(Math.random() * 900000) + 100000

            const userData = await User.findOne({ email: usermail })
            const name = userData.name

            const data = await User.findOneAndUpdate({ email: usermail }, { $set: { otp: randomnumber } })

            sendVerifyMail(name, usermail, randomnumber)
            res.status(200).send({ message: "otp has been send to your mail", success: true })

        }

    }
    catch (error) {
        console.log(error)

        res.status(500).send({ message: "Error in mail check ", success: false })

    }
}



// verify  otp entered by the user ( to reset password)
const forgetOtpVerify = async (req, res) => {

    const Enteredmail = req.body.email

    try {

        const EnteredOtp = req.body.otp

        const userData = await User.findOne({ email: Enteredmail })

        const storedOtp = userData.otp

        const usermail = userData.email

        if (storedOtp != EnteredOtp) {

            res.status(200).send({ message: "Otp is incorrect", success: false })
        }

        else {
            const data = await User.findOneAndUpdate({ email: usermail }, { $set: { otp: true } })

            res.status(200).send({ message: "otp verified Now reset your password", success: true })
        }
    }
    catch (error) {
        console.log(error)

        res.status(200).send({ message: "Something went wrong", success: false })
    }
}

// user will enter new password
const resetPassword = async (req, res) => {



    const usermail = req.body.email

    // password related
    let EnteredPassword = req.body.Password
    const salt = await bcrypt.genSalt(10);
    EnteredPassword = await bcrypt.hash(EnteredPassword, salt);




    try {

        const userData = await User.findOneAndUpdate({ email: usermail }, { $set: { password: EnteredPassword } })
        res.status(200).send({ message: "Login with your new password", success: true })

    }
    catch (error) {
        console.log(error.message)
        res.status(200).send({ message: "something went wrong", success: false })
    }
}

// to display user details in user profile page

const userProfile = async (req, res) => {

    try {
        const userData = await User.findOne({ _id: req.body.userId })


        // Send the user data as part of the JSON response
        res.status(200).send({ userData });

    }
    catch (error) {
        res.status(500).send({ message: "something went wrong", success: false })
    }
}

// edit user details
const userEditProfile = async (req, res) => {

console.log(req.body)
    try {

        if (!req.body.name && !req.body.phone && !req.body.age) {
            return res.status(400).send({ message: "fill all details", success: false })
        }

        const userData = await User.findOneAndUpdate({ email: req.body.email }, { $set: { name: req.body.name, phone: req.body.phone, age: req.body.age } })
        res.status(200).send({ message: "successfully updated", success: true })

    }
    catch (error) {
        console.log(error.message)
        res.status(200).send({ message: "something went wrong", success: false })
    }

}




//   updating users image
const ImageUpload = async (req, res) => {

    try {


        const image = req.file.filename;
        const data = await cloudinary.uploader.upload(
            "./config/uploads/img/" + req.file.filename
        )

        const cdurl = data.secure_url;
        if (cdurl) {

            const img = await User.findOneAndUpdate({ _id: req.body.userId }, { $set: { image: cdurl } })
            res.status(200).send({ message: "successfully updated", success: true })

        }
        else {
            res.status(200).send({ message: " You don't need to save . You did't selected ", success: false })
        }



    }
    catch (error) {
        console.log(error, "error in imageupload")
        res.status(200).send({ message: "don't need to save.You did't selected", success: false })

    }
}

// to fetch developer data to list in user side
const getdeveloperdataList = async (req, res) => {

    try {

        const Data = await subscribedDeveloper.find({ dateOver: false })
        res.status(200).send({ message: "conntect With developers", data: Data, success: true })
    }

    catch (error) {
        console.log(error, "error in getdeveloperdataList")
        res.status(200).send({ message: "something went wrong", success: false })


    }
}
// when user click on developer listed card  for detailed view 
const getdeveloperView = async (req, res) => {



    try {

        const Id = req.body.idData
        const userid = req.body.userId
        const followstatus = await User.findById({ _id: userid })

        // Check if the developer's ID is in the user's developerYouFollow array
        const isFollowingDeveloper = followstatus.developerYouFollow.includes(Id);


        const data = await subscribedDeveloper.find({ userId: Id })


        const StarRating = await UserCommentRatings.findOne({ userId: userid, devloperId: Id })
        let StarRatingDone
        if (StarRating) {
            StarRatingDone = StarRating.userRating
        }
        else {
            StarRatingDone = 0
        }

        // collecting  all the rating and comments comes under this developer
        const comments = await UserCommentRatings.find({ devloperId: Id })


        return res.status(200).send({ message: "follow and connect with developer", data: data, isFollowingDeveloper: isFollowingDeveloper, starRate: StarRatingDone, comment: comments, userid, success: true })

    }
    catch (error) {
        console.log(error, "error in getdeveloperView")
        res.status(200).send({ message: "something went wrong", success: false })

    }
}

// getLandingBanner

const getLandingBanner = async (req, res) => {

    try {
        const BannerData = await Banner.find({})
        const filteredBannerData = BannerData.filter((banner) => banner.list === true);


        if (filteredBannerData) {
            res.status(200).send({ data: filteredBannerData, success: true });
        }

    } catch (error) {
        console.log(error, "error in getUserData")
        res.status(500).send({ message: "something went wrong", success: false })
    }
}
// update devloper followers
const developerFollowersUpdate = async (req, res) => {


    try {
        const UserId = req.body.userId
        const devId = req.body.idData


        const Data = await subscribedDeveloper.findOne({ userId: devId })

        if (Data) {
            const Count = Data.followersCount

            const developerData = await subscribedDeveloper.findOneAndUpdate({ userId: req.body.idData }, { $set: { followersCount: Count + 1 } })
            const userData = await User.findByIdAndUpdate({ _id: UserId }, { $push: { developerYouFollow: devId } })


            // to send notification to developer
            const Notify = {
                developerId: devId,
                notificationMessage: `${userData.name} has followed You`,
                date: new Date()
            }
            const NOtification = NotificationModel(Notify)
            NOtification.save()
            const newCount = developerData.followersCount
            res.status(200).send({ message: `You followed ${developerData.name} `, newCount, success: true })
        }
    } catch (error) {
        console.log(error, "developerFollowersUpdate")
        res.status(500).send({ message: "something went wrong", success: false })

    }

}
// to get following list
const getfollowingData = async (req, res) => {
    try {

        const user = await User.findById({ _id: req.body.userId })
        const followingData = user.developerYouFollow

        if (followingData) {

            const followedDevloper = await subscribedDeveloper.find({ userId: { $in: followingData } });

            res.status(200).send({ message: "Developers You follow", followedDevloper, success: true })

        }


        //   const followingData

    } catch (error) {

    }
}

// to store CommentAndRating
const postCommentAndRating = async (req, res) => {


    try {
        const devId = req.body.developerId
        const developerData = await subscribedDeveloper.findOne({ userId: devId })
        let avgdevRating = developerData.avgRating
        const developerId = req.body.developerId
        const userId = req.body.userId
        const commentRatingDetails = await UserCommentRatings.findOne({ userId: userId, devloperId: developerId })

        if (commentRatingDetails) {

            if (!req.body.comment) {
                const Id = commentRatingDetails._id
                const newRating = req.body.rating
                const commentRatingDetailsUpdate = await UserCommentRatings.findByIdAndUpdate(Id, { $set: { userRating: newRating } })
                let developerId = req.body.developerId

                const AllRatings = await UserCommentRatings.find({ devloperId: developerId })

                const TotalRatings = AllRatings.length

                let TotalRatingSum = 0
                AllRatings.forEach(rating => {
                    TotalRatingSum += rating.userRating
                })

                avgdevRating = TotalRatings > 0 ? TotalRatingSum / TotalRatings : 0

                developerData.avgRating = avgdevRating
                await developerData.save()
                res.status(200).send({ message: "StarRating updated", success: true })
            }
            else {
                const Id = commentRatingDetails._id
                const newComment = req.body.comment
                const newRating = req.body.rating

                const commentRatingDetailsUpdate = await UserCommentRatings.findByIdAndUpdate(Id, { $set: { userRating: newRating }, $push: { userComments: { userComment: newComment } } })
                let developerId = req.body.developerId
                const AllRatings = await UserCommentRatings.find({ devloperId: developerId })
                const TotalRatings = AllRatings.length
                let TotalRatingSum = 0
                AllRatings.forEach(rating => {
                    TotalRatingSum += rating.userRating
                })
                avgdevRating = TotalRatingSum > 0 ? TotalRatingSum / TotalRatings : 0
                developerData.avgRating = avgdevRating
                await developerData.save()
                res.status(200).send({ message: "SuccessFully submited", success: true })

            }

        }

        else {
            // if there is rating and comment   and doing for first time

            const comment = req.body.comment

            const user = await User.findById({ _id: req.body.userId })

            if (!req.body.comment) {

                const data = {
                    devloperId: req.body.developerId,
                    userId: req.body.userId,
                    userImage: user.image,
                    userName: user.name,
                    userRating: req.body.rating
                }
                const mydata = new UserCommentRatings(data)
                const dat = await mydata.save()

                const developerId = req.body.developerId
                const AllRatings = await UserCommentRatings.find({ devloperId: developerId })
                const TotalRatings = AllRatings.length
                let TotalRatingSum = 0
                AllRatings.forEach(rating => {
                    TotalRatingSum += rating.userRating
                })
                avgdevRating = TotalRatings > 0 ? TotalRatingSum / TotalRatings : 0

                developerData.avgRating = avgdevRating
                await developerData.save()

                res.status(200).send({ message: "StarRating done", success: true })

            }
            else {
                const data = {
                    devloperId: req.body.developerId,
                    userId: req.body.userId,
                    userImage: user.image,
                    userName: user.name,
                    userComments: [{ userComment: comment }],
                    userRating: req.body.rating
                }

                const mydata = new UserCommentRatings(data)
                const dat = await mydata.save()

                const developerId = req.body.developerId

                const AllRatings = await UserCommentRatings.find({ devloperId: developerId })
                const TotalRatings = AllRatings.length

                let TotalRatingSum = 0
                AllRatings.forEach(rating => {
                    TotalRatingSum += rating.userRating
                })
                avgdevRating = TotalRatingSum > 0 ? TotalRatingSum / TotalRatings : 0

                developerData.avgRating = avgdevRating
                const da = await developerData.save()
                res.status(200).send({ message: "Successfully submited", success: true })
            }
        }
    } catch (error) {
        console.log(error, "ATpostCommentAndRating ")
        res.status(500).send({ message: "server error", success: false })


    }
}
// to get chat message
const ChatMessages = async (req, res) => {

    try {

        const developerId = req.body.developerId
        const userId = req.body.userId
        const chatConnectionData = await ChatConnectionModel.find({ userId: userId, developerId: developerId })

        if (chatConnectionData.length > 0) {


            const chatConnectionData = await ChatConnectionModel.findOne({ userId: userId, developerId: developerId })

            const room_id = chatConnectionData._id

            const Messages = await ChatMessageModel.find({ room_id: room_id }).sort({ time: 1 });

            if (Messages.length > 0) {

                res.status(200).send({ Data: chatConnectionData, mes: Messages, success: true, room_id, userId });
            } else {
                // Handle the case where there are no messages
                res.status(200).send({ Data: chatConnectionData, success: true, room_id, userId });
            }


        }
        else {

            const Developer = await subscribedDeveloper.findOne({ userId: developerId })
            const UserData = await User.findById({ _id: userId })


            const Data = {
                userId: userId,
                developerId: developerId,
                developerImage: Developer.image,
                developerName: Developer.name,
                userName: UserData.name,
                userImage: UserData.image
            }

            const newChatConnection = new ChatConnectionModel(Data)
            const savedChatConnection = await newChatConnection.save();
            //  to send notification to that developer

            const notify = {
                developerId: developerId,
                notificationMessage: `Your follower ${UserData.name} have started a chat with You`,
                date: new Date()

            }
            const NewNotification = new NotificationModel(notify)
            await NewNotification.save()

            res.status(200).send({ Data: savedChatConnection, success: true })
        }

    }
    catch (error) {
        console.log(error, "at getChatMessages")
    }
}
// to store new messages
const sendNewMessage = async (req, res) => {


    try {


        const room_id = req.body.r_id
        const senderId = req.body.userId

        const Data = {
            room_id: room_id,
            userId: req.body.userId,
            senderId: senderId,
            developerId: req.body.developerId,
            message: req.body.newMessage,
            time: req.body.time
        }

        const newData = new ChatMessageModel(Data)
        const savedData = await newData.save()

        res.status(200).send({ success: true, data: savedData })
    } catch (error) {
        console.log(error, "At sendNewMessage ")

    }
}
// to get data for chat list

const getChatList = async (req, res) => {

    try {
        const Id = req.body.userId
        const data = await ChatConnectionModel.find({ userId: Id })
        if (data.length > 0) {
            res.status(200).send({ Data: data, success: true })
        }
        else {
            res.status(200).send({ success: true })
        }

    } catch (error) {
        console.log(error, "at getChatList ")
    }
}

module.exports = {
    register,
    verifyLogin,
    tokenVerify,
    homeName,
    verifyOtp,
    verifyResendOtp,
    forgetPassword,
    forgetOtpVerify,
    resetPassword,
    userProfile,
    userEditProfile,
    ImageUpload,
    getdeveloperdataList,
    getdeveloperView,
    developerFollowersUpdate,

    getLandingBanner,
    getfollowingData,
    postCommentAndRating,
    ChatMessages,
    sendNewMessage,
    getChatList
}