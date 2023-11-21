const express = require('express')

const developerrouter = express()
const developerController = require('../controller/developerController')

const developerModel = require('../models/developerModel')

const developerDetailsModel = require("../models/developerDetailsModel")
const upload = require("../config/multer");

//  to do cron job   npm i  node-cron    (  it will auto check , the date is expired or not)
const cronJobExpireCheck = require('../middlewares/subscriptionExpirationCheck')

const developerAuth = require('../middlewares/developerAuthmiddleware')

developerrouter.post("/developerregister", developerController.developerRegister)


developerrouter.post("/developerlogin", developerController.verifyLogin)

developerrouter.post("/developerotp", developerController.verifyOtp)

developerrouter.post("/resendotp", developerController.getResendOtp)

developerrouter.post("/developerforgetPassword", developerController.developerForgetPassword)

// developerrouter.post("/developergenOtp",developerController.developergenerateOtp)

developerrouter.post("/developerforgetOtp", developerController.developerforgetOtpVerify)

developerrouter.post('/forgetresendotp', developerController.getForgetResendOtp)

developerrouter.post("/developerresetPassword", developerController.developerResetPassword)

developerrouter.get("/fetchName", developerAuth, developerController.homeDisplayName)

developerrouter.post("/developerData", upload.upload.single("image"), developerAuth, developerController.developerAllData)

developerrouter.get("/getProfile", developerAuth, developerController.fetchDeveloperProfile)

developerrouter.post("/getStartNowStatus", developerAuth, developerController.fetchStatus)

developerrouter.post("/developerDetailedDataEdit", upload.upload.single("image"), developerAuth, developerController.editDetailedData)

developerrouter.get("/getPaymentOption", developerAuth, developerController.getPaymentOption)

developerrouter.post("/paySubscription", developerAuth, developerController.paySubscription)

developerrouter.post("/verifyPayment", developerAuth, developerController.verifyPayments)

developerrouter.get("/payHistoryData",developerAuth,developerController.getPayHistory)

developerrouter.get('/getUserChatList',developerAuth,developerController.getUserChatList)

developerrouter.post('/Room',developerAuth,developerController.Room)
developerrouter.post('/developerNewMessage',developerAuth,developerController.developerNewMessage)

developerrouter.get('/checkNotifications',developerAuth,developerController.checkNotification)

developerrouter.delete('/clearNotifications',developerAuth,developerController.clearNotifications)
developerrouter.get('/notificationCounts',developerAuth,developerController.notificationCounts)
developerrouter.delete('/clearAllNotification',developerAuth,developerController.clearAllNotifications)
module.exports = developerrouter 