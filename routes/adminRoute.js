const express = require("express")
const Adminrouter = express()
const AdminController = require('../controller/adminController')


const subscriptionModel = require('../models/adminsubscriptionMangeModel')

const upload = require("../config/multer");

const AdminAuthmiddleware = require('../middlewares/adminAuthmiddleware')

Adminrouter.post("/adminlogin", AdminController.adminLogin);

Adminrouter.get("/getuserdetails",AdminAuthmiddleware, AdminController.userDetails)

Adminrouter.post("/blockuser",AdminAuthmiddleware, AdminController.blockUser)

Adminrouter.get("/developerdetails",AdminAuthmiddleware, AdminController.developerDetails)

Adminrouter.post("/blockdeveloper",AdminAuthmiddleware, AdminController.blockDeveloper)

Adminrouter.post("/addPlan",AdminAuthmiddleware, AdminController.addingSubscriptionPlan)

Adminrouter.get("/PlanData",AdminAuthmiddleware, AdminController.getPlanData)

Adminrouter.post("/deletePlan",AdminAuthmiddleware, AdminController.deletePlan)

Adminrouter.get("/developerRequestData",AdminAuthmiddleware, AdminController.getRequestData)

Adminrouter.post("/developerDetailedView", AdminController.developerDetailedView)

Adminrouter.post("/developerRequestAction",AdminAuthmiddleware, AdminController.developerRequestAction)

Adminrouter.get("/getDeveloperSubscriptionDetails", AdminController.getDeveloperSubscriptionDetails)

Adminrouter.post("/adminCreateBanner", AdminAuthmiddleware, upload.upload.single("image"), AdminController.adminCreateBanner)

Adminrouter.get('/getBannerData', AdminAuthmiddleware, AdminController.getBannerData)

Adminrouter.post("/handlingBanner", AdminAuthmiddleware, AdminController.handlingBanner)

Adminrouter.get("/getDataToDash", AdminAuthmiddleware, AdminController.getDataToDash)
module.exports = Adminrouter