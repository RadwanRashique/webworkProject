
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { serverVariables } from '../../util/serverVariables'
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { apiEndPoints } from '../../util/api';
import { developerRequest } from '../../Helper/instance';
function ForgotPassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('');


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoading())

    developerRequest({
      url: apiEndPoints.developerforgetPassword,
      method: 'post',
      data: { email: email },


    }).then((response) => {
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        // here we are passing developerss mail also so that we can use it in the page that we navigate by using use location 
        navigate(serverVariables.DeveloperForgetOtp, { state: email })
      }
      else {
        toast.error(response.data.message)
      }
    }).catch((error) => {
      dispatch(hideLoading())
      toast.error("something went wrong")
    })




  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-400">
      <div className="max-w-md w-full rounded-lg bg-white p-6 space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">Forgot Your Password?</h2>
          <p className="mt-2 text-center text-sm text-black">
            Enter your email address below and we will send an OTP to your email.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Enter Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border text-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>


          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
