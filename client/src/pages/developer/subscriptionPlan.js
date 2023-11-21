import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { serverVariables } from "../../util/serverVariables";
import { developerRequest } from "../../Helper/instance";
import { apiEndPoints } from "../../util/api";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { DeveloperHeader } from '../../componets/developerComponent/developerHeader';
const SubscriptionPlan = () => {

  const navigate = useNavigate()


  const [list, setList] = useState([])
  const getData = async () => {
    await developerRequest({
      url: apiEndPoints.getPaymentOption,
      method: 'get',

    }).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message)
        setList(response.data?.data)
      }

    }).catch((error) => {
      console.log(error)
      toast.error("something went wrongss")
    })



  }
  useEffect(() => {
    getData()
  }, [])

  //  to handle payment
  const payhandle = (id) => {

    developerRequest({
      url: apiEndPoints.paySubscription,
      method: 'post',
      data: { id }

    }).then((response) => {

      if (response.data) {
        toast(response.data.message)
        razorpayPayment(response.data.data, id)

      } else {
        toast.error(response.data.message)
      }

    }).catch((error) => {
      console.log(error)

      toast.error("something went wrong1")
    })

  }
  function razorpayPayment(order, id) {
    var options = {
      "key": "rzp_test_XnHHFl6tq5O1kj",
      "amount": order.amount,
      "currency": "INR",
      "name": "WebWork Subscription",
      "description": "Test Transaction",
      "image": "/user/images/online-shopping.png",
      "order_id": order.id,
      // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
      "handler": function (response) {
        verifyPayment(response, order, id)
      },
      "prefill": {
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }

    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  const verifyPayment = (payment, order, id) => {

    developerRequest(({
      url: apiEndPoints.verifyPayment,
      method: 'post',
      data: {
        payment: payment,
        order: order,
        id: id
      }
    })).then((response) => {
      if (response.data.success) {
        toast.success('success')
        navigate(serverVariables.AdminApprovelPage)
      } else {
        toast.error('payment fail')
      }
    }).catch((err) => {
      // toast.error('please login after try again')
      // localStorage.removeItem('token')
      // navigate('/login')

    })
  }
  return (
    <div>
      <DeveloperHeader />

      {list.length > 0 ? (
        <section className="py-20 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto mb-16 text-center">
              <span className="font-bold tracking-wider uppercase text-yellow-400">
                Pricing
              </span>
              <h2 className="text-4xl font-bold lg:text-5xl">Choose your plan</h2>
            </div>
            <div className="flex flex-wrap items-stretch -mx-4">

              {list?.map((data, index) => (
                <div key={data?._id} className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 mx-2 justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col p-6 space-y-6 rounded shadow sm:p-8 bg-white text-gray-800 dark:bg-gray-900"
                  >
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-purple-500 dark:text-yellow-400">{data?.duration}</h4>
                      <span className="text-6xl font-bold">{data?.price}</span>
                    </div>
                    <p className="mt-3 leading-6 dark:text-gray-400">
                      {data?.planName}
                    </p>
                    <ul className="flex-1 mb-6 dark:text-gray-400">
                      <li className="flex mb-2 space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-yellow-400">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span> Your details will be listed in our site</span>
                      </li>
                      <li className="flex mb-2 space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-yellow-400">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Client will connect you</span>
                      </li>

                    </ul>
                    <motion.button
                      onClick={() => payhandle(data?._id)}
                      whileHover={{ scale: 1.05 }}
                      className="inline-block px-5 py-3 font-semibold tracking-wide text-center rounded bg-green-500 text-white dark:bg-yellow-400 dark:text-gray-900"
                    >
                      Pay
                    </motion.button>
                  </motion.div>
                </div>
              ))}

            </div>
          </div>


        </section>
      ) : (
        <div className="min-h-screen flex items-center justify-center text-2xl font-bold">

          <p>Sorry, no plans available right now.we will update soon...</p>
        </div>
      )
      }
    </div>
  );
};

export default SubscriptionPlan;
