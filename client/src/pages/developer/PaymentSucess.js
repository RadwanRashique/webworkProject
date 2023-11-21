import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { serverVariables } from '../../util/serverVariables';
import { DeveloperHeader } from '../../componets/developerComponent/developerHeader';
const PaymentSuccess = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div>
      <DeveloperHeader />
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gray-100"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-green-500 mt-4">
              Congratulations!
            </h2>
            <p className="text-gray-500 mt-2">
              Payment has been successfully done.
            </p>
            <div className="mt-6">
              <Link to={serverVariables.DeveloperHome} ><button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg">
                Home
              </button></Link>
            </div>
            <p className="text-gray-500 mt-4">
              We will display your details on our site untill your plan expire .
              client will connect you.
              All the best for your first work with us.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
