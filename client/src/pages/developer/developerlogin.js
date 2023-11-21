import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom for navigation
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { BsEye, BsEyeSlash } from 'react-icons/bs'; // Import Bootstrap icons
import { serverVariables } from "../../util/serverVariables";
import { developerRequest } from '../../Helper/instance';
import { apiEndPoints } from '../../util/api';

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // image icon
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleEmailChange = (e) => {
    setEmail(e.target.value)


  }

  const handlePasswordChage = (e) => {
    setPassword(e.target.value)
  }
const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password
    }
    dispatch(showLoading())
   
    developerRequest({
      url:apiEndPoints.developerlogin,
      method:'post',
      data:loginData,
    }).then((response)=>{
      dispatch(hideLoading())
      if (response.data.success) {
            toast.success(response.data.message)
            toast("Redirecting to home page")
            localStorage.setItem("developertoken", response.data.data)
            navigate(serverVariables.DeveloperHome)
    
          }
          else {
                toast.error(response.data.message)
              }

    }).catch((error)=>{
                 dispatch(hideLoading())
         toast.error("Something went wrong")
  
    })

  };

  return (

    <div
      className="flex items-center justify-center h-screen bg-gradient-to-b from-white to-purple-300"

    >


      {/* Centered Login Box */}
      <div className="w-ful max-w-md p-8 mx-auto mt-16 mb-4 bg-white rounded-lg shadow-md   ">


        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleEmailChange}

              placeholder="example@gmail.com"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-600 font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'} // Toggle the input type
              id="password"
              name="password"
              onChange={handlePasswordChage}

              placeholder="********"
              className="w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 mt-2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />} {/* Show the eye icons */}
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-center">

            <Link to={serverVariables.DeveloperForgetPassword} className="text-blue-500 hover:underline">
              Forget password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-gray-600 text-center ">
          Don't have an account yet?{" "}
          <Link to="/developerregister" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
