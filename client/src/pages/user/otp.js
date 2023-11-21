
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice'
import { serverVariables } from '../../util/serverVariables';
import { apiEndPoints } from '../../util/api';
import { userRequest } from '../../Helper/instance';
function OTPPage() {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const location = useLocation()
  const email = location.state

  const [otp, setOTP] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(); // 60 seconds


  const handleInputChange = (e) => {
    setOTP(e.target.value);
  }


  const otpSubmit = async (event) => {
    event.preventDefault()

    dispatch(showLoading())
userRequest({
  url:apiEndPoints.postUserOtp,
  method:'post',
  data:{ otp: otp, email: email }
}).then((response)=>{


    if (response.data.success) {
      dispatch(hideLoading())
      toast.success(response.data.message)
      navigate(serverVariables.Login)
    }
    else {
      toast.error(response.data.message)

    }
  
}).catch((error)=>{
    dispatch(hideLoading())
      toast.error("something went wrong")
})


  }

// resend otp
  const startResendTimer = () => {

    // Reset the countdown to 10 when starting
    setResendDisabled(true);
    setCountdown(60);

    const timer = setInterval(() => {
      if (countdown < 0) {

        clearInterval(timer);
        setResendDisabled(false);
      } else {
        setCountdown((prevCountdown) => {

          if (prevCountdown <= 0) {
            // If countdown is already 0, stop decreasing
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prevCountdown - 1;
        });
      }
    }, 1000);
  };

 useEffect(() => {
    if (resendDisabled) {
      startResendTimer();
    }
  }, [resendDisabled]);


  const handleResendOtp = (e) => {
    e.preventDefault();
    dispatch(showLoading());

    // resend call

    userRequest({
      url: apiEndPoints.userResendotp,
      method: 'post',
      data: { email: email }
    })
      .then((response) => {

        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);



          startResendTimer(); // Start the timer again
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(hideLoading());
        toast.error("Something went wrong");
      });
  };


  return (
    <div className="flex h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="m-auto p-6 rounded-lg bg-white shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-purple-600 mb-6">One-Time Password (OTP)</h1>
        <div className="text-center text-4xl font-bold text-purple-700 mb-8">{otp}</div>
        <input

          type="text"
          name="otp"
          onChange={handleInputChange}
          placeholder="Enter OTP Send to your phone"
          className="w-full px-4 py-2 mb-4 border rounded-full focus:outline-none focus:ring focus:border-purple-400"
        />
        <button
          onClick={otpSubmit}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full w-full"
        >
          Submit
        </button>



        {resendDisabled ? (
          <div className='flex justify-center items-center'>
            <span className="text-center text-gray-600 mt-4">Resend OTP in {countdown} seconds</span>
          </div>
        ) : (
          <div className='flex justify-center items-center'>
            <button
              onClick={
                handleResendOtp
              }
              className="bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 px-4 rounded-full w-1/2 mt-4 "
            >
              Resend OTP
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default OTPPage;
