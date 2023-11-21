import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { serverVariables } from '../../util/serverVariables';
import { apiEndPoints } from '../../util/api'
import { userRequest } from '../../Helper/instance'
import lottie from 'lottie-web'
import userAnima from '../../assets/animations/headerAnima.json'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import './userHeader.css'

export const UserHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // animation
  const lottieContainer = useRef(null);
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieContainer.current, // Reference to the container element
      animationData: userAnima, // Your animation JSON data
      loop: true, // Set to true if you want the animation to loop
      autoplay: true, // Set to true if you want the animation to play immediately
    });

    // Optionally, you can control the animation using the `animation` object:
    // animation.play(); // Play the animation
    // animation.pause(); // Pause the animation
    // animation.stop(); // Stop the animation
    animation.setSpeed(0.9); // Adjust the animation speed

    // Clean up the animation when the component unmounts
    return () => {
      animation.destroy();
    };
  }, []);


  const [userName, setUserName] = useState(''); // State variable to store the user's name
  const [showNav, setShowNav] = useState(false);


  const getData = async () => {
    userRequest({
      url: apiEndPoints.fetchUserName,
      method: 'get'
    }).then((response) => {
      if (response.data.success) {
        const userData = response.data.userName;
        setUserName(userData); // Set the user's name in state


      }
    }).catch((error) => {
      console.error(error)
      toast.error("Data fectching issue")
    })
  }


  useEffect(() => {
    getData()
  }, [])

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(showLoading());

    navigate(serverVariables.Login);
    dispatch(hideLoading());
    toast.error("You where blocked by admin")
  };

  useEffect(() => {
    if (userName.isBlocked === true) {
      handleLogout(); // Call the logout function
    }
  }, [userName.isBlocked]);


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
          <span className="text-sm">Welcome, {userName?.name}</span>
        </div>
        <div className=" top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: '6%', height: '6px', zIndex: 10 }}>
          <div ref={lottieContainer}></div>
        </div>
        <div className="flex items-center space-x-4 ">
          <Link to={serverVariables.UserHome}>
            <button className="text-white cursor-pointer text-lg leading-6 font-normal focus:text-black bg-blue-500  border-2 rounded-lg px-3 py-2 ">
              Home
            </button>
          </Link>
          <Link to={serverVariables.About}>
            <button className="text-white cursor-pointer  leading-6 font-normal focus:text-black bg-blue-500  border-2 rounded-lg px-3 py-2">
              AboutUs
            </button>
          </Link>
          <Link to={serverVariables.Profile}>
            <button className="text-white cursor-pointer text-lg leading-6 font-normal focus:text-black bg-blue-500  border-2 rounded-lg px-3 py-2">
              Profile
            </button>
          </Link>
          <Link to={serverVariables.DeveloperList}>
            <button className="text-white cursor-pointer text-lg leading-6 font-normal focus:text-black bg-blue-500  border-2 rounded-lg px-3 py-2">
              Developers
            </button>
          </Link>    <Link to={serverVariables.FollowStatus}>
            <button className="text-white cursor-pointer text-lg leading-6 font-normal focus:text-black bg-blue-500  border-2 rounded-lg px-3 py-2">
              connections
            </button>
          </Link>


          <Link to={serverVariables.Help}>
            <button className="text-white cursor-pointer text-lg leading-6 font-normal focus:text-black bg-blue-500  border-2 rounded-lg px-3 py-2 h-full">
              Help
            </button>
          </Link>
          <Link to={serverVariables.ChatList}>
            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg2.svg" alt="chat" />
          </Link>

          <button onClick={() => {
            localStorage.removeItem("token")
            dispatch(showLoading())
            navigate(serverVariables.Login)
            dispatch(hideLoading())
          }} className="text-white cursor-pointer text-lg leading-6 border-2 rounded-lg border-gray-700 font-normal focus:text-black bg-red-500 px-3 py-2">
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile Header with Toggle */}
      <div className="xl:hidden flex justify-between items-center">
        <div className="flex items-center space-x-3 ">
          <h2 className="font-normal text-4xl leading-6 text-gray-800 dark:text-white">webwork</h2>
          <span className="text-sm">Welcome, {userName?.name}</span>
          <Link to={serverVariables.ChatList}>
            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg2.svg" alt="chat" />
          </Link>
          <div className=" top-1/2 left-2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: '10%', height: '10px', zIndex: 10 }}>
            <div ref={lottieContainer}></div>
          </div>

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
            className="xl:hidden   fixed  top-0 left-0 w-full h-full bg-blue-900 opacity-50 z-50 gap-x-2"
            onClick={() => setShowNav(false)}
          >
            {/* Blue overlay for small screens */}
          </div>
          <div className="xl:hidden fixed  top-0 left-0 w-full h-full z-50 flex flex-col items-center space-y-2 gap-x-2 ">
            <span
              className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black"
              style={{ position: 'absolute', top: '1rem', left: '1rem' }}
            >
              <AiOutlineArrowLeft className="h-6 w-6 text-white ml-4 mt-4" onClick={() => setShowNav(false)} />
            </span>
            <Link to={serverVariables.UserHome}>
              <button className="text-white    cursor-pointer text-xs leading-3 font-normal focus:text-black bg-black border-2 rounded-lg px-6 py-4 py-2 mb-6 mt-32">
                Home
              </button>
            </Link>
            <Link to={serverVariables.About}>
              <button className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black bg-black border-2 rounded-lg px-6 py-4 py-2 mb-6">
                About Us
              </button>
            </Link>
            <Link to={serverVariables.Profile}>
              <button className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black bg-black border-2 rounded-lg px-6 py-4 py-2 mb-6">
                Profile
              </button>
            </Link>
            <Link to={serverVariables.DeveloperList}>
              <button className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black bg-black border-2 rounded-lg px-6 py-4 py-2 mb-6">
                Developers
              </button>
            </Link>
            <Link to={serverVariables.FollowStatus}>
              <button className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black bg-black border-2 rounded-lg px-6 py-4 py-2 mb-6">
                connections
              </button>
            </Link>

            <Link to={serverVariables.Help}>
              <button className="text-white cursor-pointer text-xs leading-3 font-normal focus:text-black bg-black border-2 rounded-lg px-6 py-4 py-2 mb-6">
                Help
              </button>
            </Link>
            <button onClick={() => {
              localStorage.removeItem("token")
              dispatch(showLoading())
              navigate(serverVariables.Login)
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
