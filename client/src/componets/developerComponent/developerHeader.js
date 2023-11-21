import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { serverVariables } from '../../util/serverVariables';
import { apiEndPoints } from '../../util/api';
import { developerRequest } from '../../Helper/instance';
import './developerHeader.css'
import { AiOutlineArrowLeft } from 'react-icons/ai';

export const DeveloperHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [developerName, setDeveloperName] = useState(); // State variable to store the developer's name
  const [notificationCount, setNotificationCount] = useState(0)

  const getData = () => {

    developerRequest({
      url: apiEndPoints.fetchDeveloperName,
      method: 'get'
    }).then((response) => {
      if (response.data.success) {
        console.log(response.data.developerName);
        const developerData = response?.data?.developerName;
        setDeveloperName(developerData); // Set the developer's name in state
      }
    }).catch((error) => {
      console.log(error)
      toast.error("something went wrongs")
    })
  }

  useEffect(() => {


    getData()

  }, [])


  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("developertoken");
    dispatch(showLoading());

    navigate(serverVariables.DeveloperLogin);
    dispatch(hideLoading());
    toast.error("You where blocked by admin")
  };

  useEffect(() => {
    if (developerName?.isBlocked === true) {

      handleLogout()
    }

  }, [developerName?.isBlocked]);
  // to get notification count
  const getnotificationCount = async () => {
    developerRequest({
      url: apiEndPoints.getnotificationCounts,
      method: 'get'
    }).then((response) => {

      if (response.data.success) {
        setNotificationCount(response.data.count)
      }
    }).catch((error) => {
      console.log(error)
    })


  }
  useEffect(() => {
    getnotificationCount()
  }, [])


  //  to adjest notificationcount
  let adjustedNotificationCount = notificationCount;

  if (notificationCount > 10) {
    if (notificationCount > 1000) {
      adjustedNotificationCount = "999+";
    } else if (notificationCount > 100) {
      adjustedNotificationCount = "99+";
    } else if (notificationCount > 50) {
      adjustedNotificationCount = "50+";
    } else if (notificationCount > 20) {
      adjustedNotificationCount = "20+";
    } else if (notificationCount > 10) {
      adjustedNotificationCount = "10+";
    }
    else {
      adjustedNotificationCount = notificationCount
    }
  }
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="header-container bg-white dark:bg-gray-800 rounded shadow-lg py-5 px-7">
      {/* Desktop Header */}
      <nav className="hidden xl:flex justify-between items-center space-x-3">
        <div className="flex items-center space-x-3">
          <img
            className="cursor-pointer dark:bg-white p-1 rounded-full h-10 w-10"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg1.svg"
            alt="circle"
          />
          <h2 className="font-normal text-4xl leading-6 text-gray-800 dark:text-white">webwork</h2>
          <span className="text-sm">Welcome, {developerName?.name}</span>
        </div>
        <div className="flex items-center space-x-4 ">
          <Link to={serverVariables.DeveloperHome}>
            <button className="text-white cursor-pointer text-lg leading-6 font-normal focus:text-black bg-blue-500  border-2 rounded-lg px-3 py-2 ">
              Home
            </button>
          </Link>
          <Link to={serverVariables.DeveloperAbout}>
            <button className="text-white cursor-pointer  leading-6 font-normal focus:text-black bg-blue-500  border-2 rounded-lg px-3 py-2">
              AboutUs
            </button>
          </Link>
          <Link to={serverVariables.DeveloperProfile}>
            <button className="text-white cursor-pointer text-lg leading-6 font-normal focus:text-black bg-blue-500  border-2 rounded-lg px-3 py-2">
              Profile
            </button>
          </Link>
          <Link to={serverVariables.DeveloperDetails}>
            <button className="text-white cursor-pointer text-lg leading-6 font-normal focus:text-black bg-blue-500  border-2 rounded-lg px-3 py-2">
              StartNow
            </button>
          </Link>

          <Link to={serverVariables.PayHistory}>
            <button className="text-white cursor-pointer text-lg leading-6 font-normal focus:text-black bg-blue-500  border-2 rounded-lg px-3 py-2 h-full">
              PayHistory
            </button>
          </Link>

          <Link to={serverVariables.DeveloperHelp}>
            <button className="text-white cursor-pointer text-lg leading-6 font-normal focus:text-black bg-blue-500  border-2 rounded-lg px-3 py-2 h-full">
              Help
            </button>
          </Link>
          <Link to={serverVariables.DeveloperChatList}>
            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg2.svg" alt="chat" />
          </Link>
       
          <button onClick={() => {
            localStorage.removeItem("developertoken")
            dispatch(showLoading())
            navigate(serverVariables.DeveloperLogin)
            dispatch(hideLoading())
          }} className="text-white cursor-pointer text-lg leading-6 border-2 rounded-lg border-gray-700 font-normal focus:text-black bg-red-500 px-3 py-2">
            Logout
          </button>
          <Link to={serverVariables.DeveloperNotification}>
            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg3.svg" alt="bell" />
            {notificationCount > 0 && (
              <span className="absolute top-3 right-10 mt-4 p-0 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {adjustedNotificationCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile Header with Toggle */}
      <div className="xl:hidden flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h2 className="font-normal text-4xl leading-6 text-gray-800 dark:text-white">webwork</h2>
          <span className="text-sm">Welcome, {developerName?.name}</span>
          <Link to={serverVariables.DeveloperChatList}>
            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg2.svg" alt="chat" />
          </Link>
          <Link to={serverVariables.DeveloperNotification}>
            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg3.svg" alt="bell" />
            {notificationCount > 0 && (
              <span className="absolute -top-0 left-94 ml-4  mt-4 mr-4 p-0 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {adjustedNotificationCount}
              </span>
            )}
          </Link>
        </div>
        <div className="cursor-pointer" onClick={() => setShowNav(!showNav)}>
          {/* Toggle button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
      </div>

      {/* Responsive Navigation Layer */}
      {showNav && (
        <>
          <div
            className="xl:hidden fixed top-0 left-0 w-full h-full bg-blue-900 opacity-50 z-50 gap-x-2"
            onClick={() => setShowNav(false)}
          >
            {/* Blue overlay for small screens */}
          </div>
          <div className="xl:hidden fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center space-y-2 gap-x-2">
            <span
              className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black"
              style={{ position: 'absolute', top: '1rem', left: '1rem' }}
            >
              <AiOutlineArrowLeft className="h-6 w-6 text-white ml-4 mt-4" onClick={() => setShowNav(false)} />
            </span>
            <Link to={serverVariables.DeveloperHome}>
              <button className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black bg-black border-2 rounded-lg px-6 py-4 py-2 mb-6 mt-32">
                Home
              </button>
            </Link>
            <Link to={serverVariables.DeveloperAbout}>
              <button className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black bg-black border-2 rounded-lg px-6 py-4 py-2 mb-6">
                About Us
              </button>
            </Link>
            <Link to={serverVariables.DeveloperProfile}>
              <button className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black bg-black border-2 rounded-lg px-6 py-4 py-2 mb-6">
                Profile
              </button>
            </Link>
            <Link to={serverVariables.DeveloperDetails}>
              <button className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black bg-black border-2 rounded-lg px-6 py-4 py-2 mb-6">
                Start Now
              </button>
            </Link>
            <Link to={serverVariables.PayHistory}>
              <button className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black bg-black border-2 rounded-lg px-6 py-4 py-2 mb-6">
                Pay History
              </button>
            </Link>
            <Link to={serverVariables.DeveloperHelp}>
              <button className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black bg-black border-2 rounded-lg px-6 py-4 py-2 mb-6">
                Help
              </button>
            </Link>
            <button onClick={() =>  {
            localStorage.removeItem("developertoken")
            dispatch(showLoading())
            navigate(serverVariables.DeveloperLogin)
            dispatch(hideLoading())
          }} className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black  bg-red-500 border-2 rounded-lg px-6 py-4 py-2 mb-6">
              Logout
            </button>
          </div>
        </>
      )}
    </div>

  )
}
