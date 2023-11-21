require('dotenv').config()
// to hash  password (encrypt)
const bcrypt = require('bcryptjs')
// razo
const Razorpay = require("razorpay");
var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});
// developer model
const Developer = require("../models/developerModel")
// developer more details model
const developerDetails = require("../models/developerDetailsModel")

// payment schema
const subscriptionModel = require("../models/adminsubscriptionMangeModel")
// payed member all data Model
const subscriptionPayedModel = require("../models/subscriptionPayedDeveloper")

const jwt = require("jsonwebtoken")

// to send mail    (here otp to mail)
const nodemailer = require('nodemailer')

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

const developerModel = require('../models/developerModel');
const ChatConnectionModel = require('../models/chatModel')
const ChatMessageModel = require('../models/ChatMessage');
const notificationModel = require('../models/notification');
let developermail
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
            html: " <p> Hi " + name + " This is your otp to verify your webwork account the otp is " + otp + "<p>",

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

// registeration of developer
const developerRegister = async (req, res) => {
    try {

        const developerExists = await Developer.findOne({ email: req.body.email })
        if (developerExists) {
            return res.status(200).send({ message: "User already exists", success: false })
        }


        // password related
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword

        const newdeveloper = new Developer(req.body)


        const developer = await newdeveloper.save()
        if (developer) {
            const randomnumber = Math.floor(Math.random() * 900000) + 100000;


            let generatedotp = randomnumber


            developermail = req.body.email



            var Data = await Developer.findOneAndUpdate({ email: developermail }, { $set: { otp: generatedotp } }, { new: true })


            sendVerifyMail(req.body.name, developermail, generatedotp)

        }
        res.status(200)
            .send({ message: "Enter otp in your mail for verification", success: true })


    }
    catch (error) {


        res.status(500).send({
            message: "Error creating user", success
                : false, error
        })

    }
}


// to vefify otp after registering
const verifyOtp = async (req, res) => {
    try {

        const VerifiedOtp = await Developer.findOne({ email: req.body.email })
        const orginalOtp = VerifiedOtp.otp

        if (VerifiedOtp.otp != req.body.otp) {
            return res.send({ message: 'otp is not valid', success: false })
        }
        else {
            const verify = await Developer.findOneAndUpdate({ email: developermail }, { $set: { otp: true, isVerfied: true } })
            res.status(200).send({ message: "otp verified", success: true })
        }

    }
    catch (error) {
        console.log(error)

        res.status(500).send({ message: "Error in otp ", success: false })
    }
}
// login

const verifyLogin = async (req, res) => {
    try {
        const developer = await Developer.findOne({ email: req.body.email })

        if (!developer) {
            return res.status(200).send({ message: "User does not exist", success: false })
        }


        if (developer) {
            if (developer.isVerfied != true) {

                await Developer.findOneAndDelete({ email: req.body.email })
                return res.status(200).send({ message: "Account Not Verified SignUp Again", success: false })


            }
        }

        const password = developer.password

        const cpassword = req.body.password
        const isVerfied = developer.isVerfied
        const isBlocked = developer.isBlocked
        const passwordMatch = await bcrypt.compare(cpassword, password);

        if (!passwordMatch) {

            return res.status(200).send({
                message: "password is incorrect", success: false
            })
        }
        else {
            if (isVerfied) {
                if (isBlocked) {
                    res.status(200).send({ message: "sorry you are blocked", success: false })

                }

                else {
                    const developertoken = jwt.sign({ id: developer._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
                    res.status(200).send({ message: "Login successful", success: true, data: developertoken })

                }


            }
        }

    }
    catch (error) {
        console.log(error, "verify login")
        res.status(200).send({ message: "Error logging in", success: false, error })

    }
}

// when developer forget password

const developerForgetPassword = async (req, res) => {

    const postmail = req.body.email
    try {

        const developerExist = await Developer.findOne({ email: postmail })

        if (!developerExist) {
            return res.status(200).send({ message: "Enter the correct mail or register first", success: false })

        }
        else {

            let developermail = postmail


            const randomnumber = Math.floor(Math.random() * 900000) + 100000

            const developerData = await Developer.findOne({ email: developermail })
            const name = developerData.name

            const data = await Developer.findOneAndUpdate({ email: developermail }, { $set: { otp: randomnumber } })

            sendVerifyMail(name, developermail, randomnumber)
            res.status(200).send({ message: "otp has been send to your mail", success: true })




        }

    }
    catch (error) {
        console.log(error, "developer forget password")

        res.status(500).send({ message: "Error in mail check ", success: false })

    }
}


// verify  otp entered by the user ( to reset password)
const developerforgetOtpVerify = async (req, res) => {
    const Enteredmail = req.body.email
    try {

        const EnteredOtp = req.body.otp

        const developerData = await Developer.findOne({ email: Enteredmail })

        const storedOtp = developerData.otp

        const developermail = developerData.email

        if (storedOtp != EnteredOtp) {

            res.status(200).send({ message: "Otp is incorrect", success: false })
        }

        else {
            const data = await Developer.findOneAndUpdate({ email: developermail }, { $set: { otp: true } })

            res.status(200).send({ message: "otp verified Now reset yor password", success: true })
        }
    }
    catch (error) {
        console.log(error, "developer forgetotp verify")

        res.status(200).send({ message: "Something went wrong", success: false })
    }
}

// while clicking on resend otp button in forgetotp page
const getForgetResendOtp = async (req, res) => {

    try {

        const developer = await Developer.findOne({ email: req.body.email })
        const randomnumber = Math.floor(Math.random() * 900000) + 100000

        const name = developer.name
        sendVerifyMail(name, req.body.email, randomnumber)
        var Data = await Developer.findOneAndUpdate({ email: req.body.email }, { $set: { otp: randomnumber } })

        if (Data) {

            res.status(200).send({ message: "check your mail ", success: true })
        } else {
            res.status(200).send({ message: "sending otp failed", success: false })
        }


    }
    catch (error) {

        console.log(error, "at getForgetResendOtp ")

        res.status(500).send({ message: "Something went wrong", success: false })

    }
}


// developer will enter new password
const developerResetPassword = async (req, res) => {
    let EnteredPassword = req.body.password

    const developermail = req.body.email

    //    hasing new  password
    const salt = await bcrypt.genSalt(10);
    EnteredPassword = await bcrypt.hash(EnteredPassword, salt);



    try {

        const developerData = await Developer.findOneAndUpdate({ email: developermail }, { $set: { password: EnteredPassword } })
        res.status(200).send({ message: "Login with your new password", success: true })

    }
    catch (error) {
        console.log(error.message)
        res.status(200).send({ message: "something went wrong", success: false })
    }
}

// to desplay name at header 
const homeDisplayName = async (req, res) => {
    try {
        const devId = req.body.developerId



        const developer = await Developer.findOne({ _id: req.body.developerId })

        const developerName = developer;



        // Send the user's name as part of the JSON response
        res.status(200).send({ developerName, devId, success: true });

    }
    catch (error) {
        console.log("error at homeDisplayName", error)

    }


}
// collecting all details of developer
const developerAllData = async (req, res) => {
    try {
        const Data = await developerDetails.findOne({ userId: req.body.developerId })
        if (!Data) {
            const img = await cloudinary.uploader.upload(
                "./config/uploads/img/" + req.file.filename
            )

            const cdnUrl = img.secure_url;
            const data = {

                field: req.body.field,
                interest: req.body.interest,
                workCount: req.body.workCount,
                language: req.body.language,
                webtype: req.body.webtype,
                experience: req.body.experience,
                education: req.body.education,
                fromTime: req.body.fromTime,
                toTime: req.body.toTime,

                about: req.body.about,
                instaUrl: req.body.instaUrl,
                facebookUrl: req.body.facebookUrl,
                linkedinUrl: req.body.linkedinUrl,
                image: cdnUrl,
                userId: req.body.developerId,
                status: "formsubmitted"

            }
            const newdeveloper = new developerDetails(data)

            const developerdata = await newdeveloper.save()
            const id = req.body.developerId


            const collected = await Developer.updateOne({ _id: req.body.developerId }, { $set: { formCollected: true, status: "formsubmitted" } })


            res.status(200).send({ message: "successfully completed", success: true })


        }

        else {
            res.status(200).send({ message: "Form is already submitted", success: false })
        }
    }

    catch (error) {
        console.log(error, "at developerData")

        res.status(500).send({ message: "Something went wrong", success: false })

    }
}

//    to list developer profile
const fetchDeveloperProfile = async (req, res) => {

    try {

        const developerData = await developerDetails.findOne({ userId: req.body.developerId })
        const firstData = await Developer.find({ _id: req.body.developerId })
        const subscriptionData = await subscriptionPayedModel.find({ userId: req.body.developerId })
        const firstdata = firstData[0]


        if (subscriptionData) {
            res.status(200).send({ message: "Here is your profile", firstdata, developerData, subscriptionData, success: true })

        }


        else if (firstData && developerData) {
            res.status(200).send({ message: "Here is your profile", firstdata, developerData, success: true })




        }
        else {
            res.status(200).send({ message: "Go to startNow and fill details", firstdata, success: true })


        }



    }
    catch (error) {

        console.log(error, "at getdeveloperProfile")
        res.status(500).send({ message: "some thing went worong", success: false })
    }
}

// to resend otp when clicking resend button
const getResendOtp = async (req, res) => {

    try {

        const developer = await Developer.findOne({ email: req.body.email })
        const randomnumber = Math.floor(Math.random() * 900000) + 100000

        const name = developer.name
        sendVerifyMail(name, req.body.email, randomnumber)
        var Data = await Developer.findOneAndUpdate({ email: req.body.email }, { $set: { otp: randomnumber } })

        if (Data) {

            res.status(200).send({ message: "check your mail ", success: true })
        } else {
            res.status(200).send({ message: "sending otp failed", success: false })
        }
    }
    catch (error) {
        console.log(error, "at getResendOtp ");
        res.status(500).send({ message: "some thing went worong", success: false })

    }
}

const fetchStatus = async (req, res) => {


    try {
        const Details = await Developer.findOne({ _id: req.body.developerId })


        const subExpireStatus = Details.dateOver


        if (Details) {

            res.status(200).send({ data: Details, subExpireStatus: subExpireStatus, success: true })
        }
        else {
            res.status(200).send({ message: "You did'nt filled the details ", success: false })

        }


    }

    catch (error) {

        console.log(error, "at fetchStatus");
        res.status(500).send({ message: "some thing went worong", success: false })
    }
}

// To edit developer details

const editDetailedData = async (req, res) => {

    try {
        if (!req.file) {

            const subscribedData = await subscriptionPayedModel.updateOne({ userId: req.body.developerId }, {
                $set: {
                    field: req.body.field,
                    interest: req.body.interest,
                    workCount: req.body.workCount,
                    language: req.body.language,
                    webtype: req.body.webtype,
                    experience: req.body.experience,
                    education: req.body.education,
                    fromTime: req.body.fromTime,
                    toTime: req.body.toTime,
                    about: req.body.about,
                    instaUrl: req.body.instaUrl,
                    facebookUrl: req.body.facebookUrl,
                    linkedinUrl: req.body.linkedinUrl,
                    userId: req.body.developerId,
                }
            })






            const Data = await developerDetails.updateOne({ userId: req.body.developerId }, {
                $set: {
                    field: req.body.field,
                    interest: req.body.interest,
                    workCount: req.body.workCount,
                    language: req.body.language,
                    webtype: req.body.webtype,
                    experience: req.body.experience,
                    education: req.body.education,
                    fromTime: req.body.fromTime,
                    toTime: req.body.toTime,
                    about: req.body.about,
                    instaUrl: req.body.instaUrl,
                    facebookUrl: req.body.facebookUrl,
                    linkedinUrl: req.body.linkedinUrl,
                    userId: req.body.developerId,
                }
            })
            return res.status(200).send({ message: "successfully updated", success: true })
        }


        const Data = await developerDetails.findOne({ userId: req.body.developerId })
        if (Data) {
            const img = await cloudinary.uploader.upload(
                "./config/uploads/img/" + req.file.filename
            )
            const cdurl = img.secure_url;
            const Data = await developerDetails.updateOne({ userId: req.body.developerId }, {
                $set: {
                    field: req.body.field,
                    interest: req.body.interest,
                    workCount: req.body.workCount,
                    language: req.body.language,
                    webtype: req.body.webtype,
                    experience: req.body.experience,
                    education: req.body.education,
                    fromTime: req.body.fromTime,
                    toTime: req.body.toTime,
                    about: req.body.about,
                    instaUrl: req.body.instaUrl,
                    facebookUrl: req.body.facebookUrl,
                    linkedinUrl: req.body.linkedinUrl,
                    image: cdurl,
                    userId: req.body.developerId,
                }
            })
            const subedData = await subscriptionPayedModel.updateOne({ userId: req.body.developerId }, {
                $set: {
                    field: req.body.field,
                    interest: req.body.interest,
                    workCount: req.body.workCount,
                    language: req.body.language,
                    webtype: req.body.webtype,
                    experience: req.body.experience,
                    education: req.body.education,
                    fromTime: req.body.fromTime,
                    toTime: req.body.toTime,
                    about: req.body.about,
                    instaUrl: req.body.instaUrl,
                    facebookUrl: req.body.facebookUrl,
                    linkedinUrl: req.body.linkedinUrl,
                    image: cdurl,
                    userId: req.body.developerId,
                }
            })


            res.status(200).send({ message: "successfully updated", success: true })

        }
        else {
            res.status(200).send({ message: "User Not found", success: false })

        }

    }
    catch (error) {

        console.log(error, "at editDetailedData ")
        res.status(500).send({ message: "some thing went worong", success: false })
    }
}

// to list payment card
const getPaymentOption = async (req, res) => {

    try {

        const data = await subscriptionModel.find({})

        if (data) {
            res.status(200).send({ message: "select a subscription plans", data: data, success: true })

        }
        else {
            res.status(200).send({ message: "Sorry No subscription plans are available", success: false })
        }

    } catch (error) {
        console.log(error, "at getPaymentOption ")
        res.status(500).send({ message: "some thing went worong", success: false })

    }
}
//  take subscription

const paySubscription = async (req, res) => {

    try {
        const id = req.body.id;
        const developer_id = req.body.developerId
        const planData = await subscriptionModel.findById(id)

        if (!planData) {
            return res.status(200).send({ message: 'sorry developer not exist', success: false })
        }

        const payment_price = planData.price * 100;
        const payment_capture = 1;
        const orderOptions = {
            amount: payment_price,
            currency: "INR",
            receipt: "order_receipt_" + id,
            payment_capture,
        };
        instance.orders.create(orderOptions, async (err, order) => {
            if (err) {
                return res.status(200).send({ message: 'please try again ', success: false })
            }
            res.status(200).send({ message: 'pay', success: true, data: order })
        });



    } catch (error) {
        console.log(error, "at paySubscription")
        res.status(500).send({ message: "some thing went worong", success: false })
    }
}

const verifyPayments = async (req, res) => {
    try {

        const details = (req.body)

        const crypto = require("crypto");
        let hmac = crypto.createHmac("sha256", process.env.KEY_SECRET)
        hmac.update(details.payment.razorpay_order_id + '|' + details.payment.razorpay_payment_id)
        hmac = hmac.digest('hex')
        const advance = details.order.amount / 100
        if (hmac == details.payment.razorpay_signature) {

            const planData = await subscriptionModel.findById(details.id)
            const devloper = await developerModel.findById({ _id: details.developerId })
            const DeveloperBigData = await developerDetails.findOne({ userId: details.developerId })

            const datas = await developerModel.updateOne({ _id: details.developerId }, {
                $set: {
                    payment: "Done",
                    dateOver: false
                }
            })
            // pushing payment data to developer schema 
            const paymentEntry = {
                date: new Date(),
                expireDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                planName: planData.planName,
                price: planData.price,
                duration: planData.duration,
            };
            // Push the payment entry to the paymentHistory array
            devloper.paymentHistory.push(paymentEntry);

            // Save the updated developer document with payment history
            await devloper.save();



            const subScribedDeveloperData = await subscriptionPayedModel.find({})

            if (subScribedDeveloperData.length > 0) {

                const updateDeveloperData = await subscriptionPayedModel.find({ userId: details.developerId })

                if (updateDeveloperData.length != 0) {

                    await subscriptionPayedModel.findOneAndUpdate({ userId: details.developerId }, {
                        $set: {
                            date: new Date(), expireDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), planName: planData.planName, price: planData.price,
                            duration: planData.duration,
                            dateOver: false
                        }
                    })

                }
                else {

                    const data = {
                        field: DeveloperBigData.field,
                        userId: details.developerId,
                        date: new Date(),
                        expireDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days in milliseconds
                        name: devloper.name,
                        email: devloper.email,
                        age: devloper.age,
                        phone: devloper.phone,
                        interest: DeveloperBigData.interest,
                        workCount: DeveloperBigData.workCount,
                        language: DeveloperBigData.language,
                        webtype: DeveloperBigData.webtype,
                        experience: DeveloperBigData.experience,
                        education: DeveloperBigData.education,
                        fromTime: DeveloperBigData.fromTime,
                        toTime: DeveloperBigData.toTime,
                        about: DeveloperBigData.about,
                        instaUrl: DeveloperBigData.instaUrl,
                        facebookUrl: DeveloperBigData.facebookUrl,
                        linkedinUrl: DeveloperBigData.linkedinUrl,
                        image: DeveloperBigData.image,
                        planName: planData.planName,
                        price: planData.price,
                        duration: planData.duration,
                    }
                    const newData = new subscriptionPayedModel(data)

                    const subscribedData = await newData.save()

                }

            }

            else {

                const data = {
                    field: DeveloperBigData.field,
                    userId: details.developerId,
                    date: new Date(),
                    expireDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days in milliseconds
                    name: devloper.name,
                    email: devloper.email,
                    age: devloper.age,
                    phone: devloper.phone,
                    interest: DeveloperBigData.interest,
                    workCount: DeveloperBigData.workCount,
                    language: DeveloperBigData.language,
                    webtype: DeveloperBigData.webtype,
                    experience: DeveloperBigData.experience,
                    education: DeveloperBigData.education,
                    fromTime: DeveloperBigData.fromTime,
                    toTime: DeveloperBigData.toTime,
                    about: DeveloperBigData.about,
                    instaUrl: DeveloperBigData.instaUrl,
                    facebookUrl: DeveloperBigData.facebookUrl,
                    linkedinUrl: DeveloperBigData.linkedinUrl,
                    image: DeveloperBigData.image,
                    planName: planData.planName,
                    price: planData.price,
                    duration: planData.duration,
                }
                const newData = new subscriptionPayedModel(data)

                const subscribedData = await newData.save()



            }


            return res.status(200).send({ message: 'payment success full', success: true })

        } else {
            res.status(200).send({ message: 'payment fail', success: false })
        }
    } catch (error) {
        console.log(error, "at verifyPayments")
        res.status(500).send({ message: "some thing went worong", success: false })

    }
}
// to get payment data
const getPayHistory = async (req, res) => {

    try {

        const devId = req.body.developerId
        const HistoryData = await Developer.findById({ _id: devId })
        const Data = HistoryData.paymentHistory
        Data.sort((a, b) => {
            // Sort by date in ascending order, assuming that each object has a 'date' property.
            return new Date(b.date) - new Date(a.date);
        });
        res.status(200).send({ data: Data, success: true })

    } catch (error) {
        console.log(error, "at getPayHistory")
        res.status(500).send({ message: "some thing went worong", success: false })
    }
}
// get user chat list
const getUserChatList = async (req, res) => {

    try {


        const developerId = req.body.developerId

        const data = await ChatConnectionModel.find({ developerId: developerId })
        const count = data.length

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
//  get room
const Room = async (req, res) => {

    try {
        const developerId = req.body.devId
        const userId = req.body.UserId

        const chatConnectionData = await ChatConnectionModel.findOne({ userId: userId, developerId: developerId })
        const room_id = chatConnectionData._id


        const Messages = await ChatMessageModel.find({ room_id: room_id }).sort({ time: 1 });


        if (Messages.length > 0) {

            res.status(200).send({ Data: chatConnectionData, mes: Messages, success: true, room_id, developerId });
        } else {


            // Handle the case where there are no messages
            res.status(200).send({ Data: chatConnectionData, success: true, room_id, developerId });
        }


    }



    catch (error) {

        console.log(error, "at getRoom ")
    }
}

// to post new message
const developerNewMessage = async (req, res) => {

    try {
        const senderId = req.body.devid
        const developerId = req.body.devid
        const room_id = req.body.rid



        const Data = {
            room_id: room_id,
            userId: req.body.userId,
            senderId: senderId,
            developerId: developerId,
            message: req.body.newMessage,
            time: req.body.time
        }

        const newData = new ChatMessageModel(Data)
        const savedData = await newData.save()


        res.status(200).send({ success: true, data: savedData })

    }

    catch (error) {
        console.log(error, " at developerNewMessage")
    }
}

// to check notifications
const checkNotification = async (req, res) => {


    try {

        const Id = req.body.developerId

        const seenUpdate = await notificationModel.updateMany({ developerId: Id, seen: false }, { $set: { seen: true } })
        const Data = await notificationModel.find({ developerId: Id, seen: true }).sort({ date: -1 });
        res.status(200).send({ data: Data, success: true })
    }

    catch (error) {
        console.log(error, "At checkNotification ")
    }
}
// to clearNotifications
const clearNotifications = async (req, res) => {
    try {
        const Id = req.body.Id
        const DeleteNotification = await notificationModel.findByIdAndDelete(Id)

        res.status(200).send({ success: true })
    }
    catch (error) {
        console.log(error, "AT clearNotifications")
    }
}
// to show notification count at header
const notificationCounts = async (req, res) => {
    try {

        const Id = req.body.developerId
        const Notification = await notificationModel.countDocuments({ developerId: Id, seen: false });

        res.status(200).send({ success: true, count: Notification })
    }
    catch (error) {
        console.log(error, "AT notificationCounts")
    }
}
//  to clear all notifications
const clearAllNotifications = async (req, res) => {
    try {
        const Id = req.body.developerId
        const Deletedata = await notificationModel.deleteMany({ developerId: Id, seen: true })
        res.status(200).send({ message: "successfully cleared all Nofitications", success: true })

    } catch (error) {
        console.log(error)

    }
}
module.exports = {

    developerRegister,
    verifyOtp,
    getResendOtp,
    verifyLogin,
    developerForgetPassword,

    developerforgetOtpVerify,
    getForgetResendOtp,
    developerResetPassword,
    homeDisplayName,
    developerAllData,
    fetchDeveloperProfile,
    fetchStatus,
    editDetailedData,
    getPaymentOption,
    paySubscription,
    verifyPayments,
    getPayHistory,
    getUserChatList,
    Room,
    developerNewMessage,
    checkNotification,
    clearNotifications,
    notificationCounts,
    clearAllNotifications
}