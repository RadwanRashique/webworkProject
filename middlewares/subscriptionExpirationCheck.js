// require cron to do cron job
const cron = require('node-cron')
// require the model which contain expire date
const subscribedDeveloper = require('../models/subscriptionPayedDeveloper')
// require Developer details to make payment  unDone   
const devloperData = require('../models/developerModel')
// requiring the notification model to create notification
const Notification = require('../models/notification')
// Define a cron job to run daily at a specific time
module.exports = cron.schedule('16 11  * * *', async () => {
  try {
    const currentDate = new Date();
    currentDate.toLocaleString()


    // Find all documents where the `expireDate` is in the past
    const expiredSubscriptions = await subscribedDeveloper.find({
      expireDate: { $lt: currentDate },
      dateOver: false


    });

    if (expiredSubscriptions.length > 0) {

      // Update the `dateOver` field to true for expired subscriptions
      await subscribedDeveloper.updateMany(
        { _id: { $in: expiredSubscriptions.map(sub => sub._id) } },
        { $set: { dateOver: true } }
      );

      let ids = expiredSubscriptions.map((n) =>
        n.userId
      )

      await devloperData.updateMany({ _id: { $in: ids } }, { $set: { payment: 'unDone', dateOver: true } })

      // additional logic here, like sending notifications or emails
      for (developer of expiredSubscriptions) {
        const notification = new Notification({
          developerId: developer.userId,
          notificationMessage: "Your subscription plan has expired Take a new Plan",
          date: new Date()
        })

        await notification.save()

      }
      // to users to inform them that their subscription has expired.
    }
  } catch (error) {
    console.error('Error updating subscription status:', error);
  }
});



