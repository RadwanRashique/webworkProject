

const express = require("express")

const userrouter = express()

const userController = require("../controller/userController")

const userModel = require('../models/userModel')

const userAuthMiddleware = require('../middlewares/userAuthmiddleware')


const upload = require('../config/multer')


userrouter.post("/register", userController.register)

userrouter.post("/login", userController.verifyLogin)

userrouter.post("/get-user-info-by-id", userAuthMiddleware, userController.tokenVerify)

userrouter.get("/fetchData", userAuthMiddleware, userController.homeName)

userrouter.post("/otp", userController.verifyOtp)

userrouter.post('/userResendotp', userController.verifyResendOtp)

userrouter.post("/forgetPassword", userController.forgetPassword)



userrouter.post("/forgetOtp", userController.forgetOtpVerify)

userrouter.post("/resetPassword", userController.resetPassword)

userrouter.get("/getProfile", userAuthMiddleware, userController.userProfile)

userrouter.post("/editData",userAuthMiddleware, userController.userEditProfile)

userrouter.post("/updateImage", upload.upload.single("image"), userAuthMiddleware, userController.ImageUpload)

userrouter.get("/getdeveloperdataList", userAuthMiddleware, userController.getdeveloperdataList)

userrouter.post("/getdeveloperView", userAuthMiddleware, userController.getdeveloperView)

userrouter.post("/developerFollowersUpdate", userAuthMiddleware, userController.developerFollowersUpdate)


userrouter.get("/getfollowingData", userAuthMiddleware, userController.getfollowingData)

userrouter.post("/postCommentAndRating", userAuthMiddleware, userController.postCommentAndRating)

userrouter.post('/Messages',userAuthMiddleware,userController.ChatMessages)

userrouter.post('/sendNewMessage',userAuthMiddleware,userController.sendNewMessage)

userrouter.get('/getChatList',userAuthMiddleware,userController.getChatList)


// to get banner data at landing page

userrouter.get("/", userController.getLandingBanner)





module.exports = userrouter