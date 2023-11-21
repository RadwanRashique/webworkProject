import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast'
import { serverVariables } from '../../util/serverVariables';
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/alertsSlice'
import { apiEndPoints } from '../../util/api';
import { userRequest } from '../../Helper/instance';

function ForgotPasswordOTPPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [otp, setOTP] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(); // 60 seconds


  // taking the mail from the page before to send to backend
  const location = useLocation()
  var state = location.state




  const handleOtpChange = (e) => {
    setOTP(e.target.value)
  }



  // verify  otp
  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(showLoading())
    userRequest({
      url: apiEndPoints.sendDataForReset,
      method: 'post',
      data: { email: state, otp: otp },


    }).then((response) => {
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        navigate(serverVariables.ResetPassword, { state: state })
      }
      else {
        toast.error(response.data.message)
      }
    }).catch((error) => {
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
      data: { email: state }
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Forgot Password OTP Verification</h2>

        <div className="text-center text-4xl font-bold text-purple-700 mb-8">{otp}</div>

        <form onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="otp" className="sr-only">OTP</label>
              <input
                id="otp"
                name="otp"
                type="text"
                autoComplete="otp"
                required
                className="appearance-none  relative block w-full px-3 py-2 border text-gray-700 rounded-md focus:outline-none focus:ring focus:border-purple-400"
                placeholder="Enter OTP"

                onChange={handleOtpChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full w-full mt-4"
          >
            Verify OTP
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


        </form>

      </div>
    </div>
  );
}

export default ForgotPasswordOTPPage;
