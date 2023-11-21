require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const User = require('../models/userModel')
const Developer = require('../models/developerModel')
const subscription = require('../models/adminsubscriptionMangeModel')
const DeveloperDetails = require('../models/developerDetailsModel')
const developerDetailsModel = require('../models/developerDetailsModel')
const BannerModel = require("../models/bannerModel")

// payed member all data Model
const subscriptionPayedModel = require("../models/subscriptionPayedDeveloper")

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



const adminLogin = async (req, res) => {

  console.log(req.body)
  try {
    // admin verify
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.isadmin != 1) {
       
        return res.status(200).send({ message: "This mail does't match", success: false });
      }
      else {
       
        const passwordMatch = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!passwordMatch) {
        
          return res
            .status(200)
            .send({ message: "please check your password", success: false });
        } else {
         
          const admintoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          res.status(200).send({ message: "login successful", success: true, data: admintoken });
        }

      }

    }
    else {
      return res.status(400).send({ message: "please check your email", success: false })
    }


  }

  catch (error) {
    console.log("error in admin login", error)
    res.status(500).send({ message: "error in login", success: false, error });
  }
};

// to get user details
const userDetails = async (req, res) => {

  try {
    const userData = await User.find({})


    res.status(200).send({ success: true, userData });


  }
  catch (error) {

    console.log(error, "to get user details")
    res.status(500).send({ message: "error in takeking user data", success: false, error })
  }
}

// to block and unblock user

const blockUser = async (req, res) => {
  
  try {
    const user = await User.findOne({ _id: req.body.id });
    const userUpdated = await User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { isBlocked: !user.isBlocked } },
      { new: true }
    );
    if (userUpdated) {
      res.status(200).send({ message: "user List updated", data: userUpdated, success: true });
    } else {
      res.status(200).send({ success: false });
    }
  }
  catch (error) {
    console.log(error, "in blocking user")
    res.status(500).send({ message: "error in blocking user", success: false, error })
  }
}

// listing admin details

const developerDetails = async (req, res) => {

  try {
    const developerData = await Developer.find({})


    res.status(200).send({ developerData, success: true })

  }

  catch (error) {

  }
}
// block developer
const blockDeveloper = async (req, res) => {

  try {
    const developerData = await Developer.findOne({ _id: req.body.id });
    const developerUpdate = await Developer.findOneAndUpdate({ _id: req.body.id }, { $set: { isBlocked: !developerData.isBlocked } }, { new: true })
    if (developerUpdate) {
      res.status(200).send({ message: " updated", data: developerUpdate, success: true });
    } else {
      res.status(200).send({ success: false });
    }
  }

  catch (error) {

  }
}

// dealing mange subscription 
const addingSubscriptionPlan = async (req, res) => {

  try {

    const newplanData = new subscription({
      planName: req.body.planName,
      price: req.body.price,
      duration: req.body.selectedPlan

    })

    const plan = await newplanData.save()

    res.status(200).send({ message: "plan successfully created", success: true })
  }

  catch (error) {

    console.log(error, "at addingSubscriptionPlan")
    res.status(500).send({ message: "some thing went worong", success: false })
  }
}

const getPlanData = async (req, res) => {

  try {


    const planData = await subscription.find({})


    res.status(200).send({ planData, success: true })
  }
  catch (error) {
    console.log(error, "at getplanData backend")
    res.status(500).send({ message: "some thing went wrong", success: false })
  }
}
// delete plan
const deletePlan = async (req, res) => {

  try {

    const id = req.body.id

    const deletePlan = await subscription.findByIdAndDelete({ _id: id })
    if (deletePlan) {
      res.status(200).send({ message: "successfully deleted the plan", success: true })
    }

  }
  catch (error) {

    console.log(error, "at deletePlan backend")
    res.status(500).send({ message: "some thing went wrong", success: false })
  }
}

// to fetch data to list in  developer request page
const getRequestData = async (req, res) => {

  try {
    const developerDetails = await DeveloperDetails.find({})
    // Extract the user IDs from developerDetails
    const userIds = developerDetails.map(detail => detail.userId);

    // Query the "developer" collection for developers with matching user IDs
    const developerData = await Developer.find({ _id: { $in: userIds } })

    res.send({ success: true, message: "Data retrieved successfully", developerData, developerDetails });
  }
  catch (error) {

    console.log(error, "at getRequestData")
    res.status(500).send({ message: "some thing went wrong", success: false })
  }


}

// to list data in developerdetailed view . when clicking view in request page
const developerDetailedView = async (req, res) => {
  try {


    const developerDetails = await DeveloperDetails.findOne({ userId: req.body.idData })
    const Data = await Developer.findById({ _id: req.body.idData })
    const Alldata = {
      developerDetails,
      Data
    }
    res.status(200).send({ message: "Check developer details", data: Alldata, success: true })
  }
  catch (error) {
    console.log(error, "at developerDetailedView")
    res.status(500).send({ message: "some thing went wrong", success: false })

  }
}

// for  updatating status
const developerRequestAction = async (req, res) => {

  try {
    const Data = await Developer.findOneAndUpdate({ _id: req.body.id }, { $set: { status: req.body.status } })
    const detailedData = await developerDetailsModel.findOneAndUpdate({ userId: req.body.id }, { $set: { status: req.body.status } })
    res.status(200).send({ message: "Done", success: true })

  } catch (error) {
    console.log(error, "at  developerRequestAction")
    res.status(500).send({ message: "some thing went wrong", success: false })

  }
}
// to fetch subscribed develoepr details
const getDeveloperSubscriptionDetails = async (req, res) => {

  try {
    const Data = await subscriptionPayedModel.find({})


    if (!Data) {

      return res.status(200).send({ message: "No subscription yet", success: false })
    }
    res.status(200).send({ message: "subscription details ", data: Data, success: true })


  } catch (error) {
    console.log(error, "at  getDeveloperSubscriptionDetails")
    res.status(500).send({ message: "some thing went wrong", success: false })

  }
}

// to create new banner

const adminCreateBanner = async (req, res) => {

  try {
    if (!req.body.title && !req.body.description && !req.file.filename) {
      res.status(200).send({ message: "fill all fields", success: false })
    }
    else {

      const img = await cloudinary.uploader.upload(
        "./config/uploads/img/" + req.file.filename
      )

      const cdnUrl = img.secure_url;
      banner = {
        image: cdnUrl,
        title: req.body.title,
        description: req.body.discription

      }


      const Data = new BannerModel(banner)
      const ban = await Data.save()
      res.status(200).send({ message: "Banner successfully created", success: true })
    }

  } catch (error) {
    console.log(error, "at adminCreateBanner ")
    res.status(500).send({ message: "some thing went wrong", success: false })

  }
}

// to fetch banner data
const getBannerData = async (req, res) => {
  try {
    const bannerData = await BannerModel.find({})

    res.status(200).send({ bannerData, success: true })

  } catch (error) {
    console.log(error, "at getBannerData ")
    res.status(500).send({ message: "some thing went wrong", success: false })

  }
}

const handlingBanner = async (req, res) => {
  try {

    const data = await BannerModel.findById({ _id: req.body.ids })
    const listUpdate = await BannerModel.findByIdAndUpdate({ _id: req.body.ids }, { $set: { list: !data.list } })

    res.status(200).send({ message: "Done", success: true })
  } catch (error) {
    console.log(error, "at handlingBanner ")
    res.status(500).send({ message: "some thing went wrong", success: false })

  }
}
// to get count to dashboard
const getDataToDash = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});

    const developerCount = await Developer.countDocuments({})
    const revenueByMonth = {};
    const developerData = await Developer.find({})



    const aggregationPipeline = [
      {
        $match: {} //  can add match conditions here if needed
      },
      {
        $unwind: '$paymentHistory'
      },
      {
        $group: {
          _id: null,
          totalPayment: { $sum: '$paymentHistory.price' },
          paymentByMonth: {
            $push: {
              date: '$paymentHistory.date',
              price: '$paymentHistory.price'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalPayment: 1,
          paymentByMonth: 1
        }
      }
    ];


    const subscrib = await subscriptionPayedModel.countDocuments({})


    const aggregationResult = await Developer.aggregate(aggregationPipeline);

    if (aggregationResult.length === 0) {
      return res.status(200).send({ success: true, user: userCount, developer: developerCount, sub: subscrib, totalPayment: 0, paymentByMonth: [] });
    }

    const { totalPayment, paymentByMonth } = aggregationResult[0];


    res.status(200).send({ success: true, user: userCount, developer: developerCount, totalPayment, paymentByMonth, sub: subscrib });

    const user = await User.find({}).c
  } catch (error) {
    console.log(error, "At getDataToDash")
    res.status(500).send({ message: "some thing went wrong", success: false })

  }
}

module.exports = {
  adminLogin,
  userDetails,
  blockUser,
  developerDetails,
  blockDeveloper,
  addingSubscriptionPlan,
  getPlanData,
  deletePlan,
  getRequestData,
  developerDetailedView,
  developerRequestAction,
  getDeveloperSubscriptionDetails,
  adminCreateBanner,
  getBannerData,
  handlingBanner,
  getDataToDash
}