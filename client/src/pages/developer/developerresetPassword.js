import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom'
import { serverVariables } from '../../util/serverVariables';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { apiEndPoints } from '../../util/api';
import { developerRequest } from '../../Helper/instance';
function ResetPasswordPage() {
  // taking the mail from the page before to send to backend
  const location = useLocation()
  const usermail = location.state



  const dispatch = useDispatch()
  const navigate = useNavigate()



  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(password)) {
      return toast.error('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
    }
    if (password != confirmPassword) {
      return toast.error('Password mismatch');


    }

    //   password validation 
    if (password.trim() == '') {
      return toast.error('Enter another password.');

    }
    if (password.length <= 5) {
      return toast.error('please enter minimum 6keys for password')
    }

    if (password === confirmPassword) {
      dispatch(showLoading())

      developerRequest({
        url: apiEndPoints.developerresetPassword,
        method: 'post',
        data: { email: usermail, password: password },


      }).then((response) => {
        dispatch(hideLoading())
        if (response.data.success) {
          toast.success(response.data.message)
          navigate(serverVariables.DeveloperLogin)
        }
        else {
          toast.error(response.data.message)
        }
      }).catch((error) => {
        console.error(error, "at developerresetPassword")

      })
    }


  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-300">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">New Password</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter your new password"

              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Confirm your new password"

              onChange={handleConfirmPasswordChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full w-full"
          >
            Reset Password
          </button>
        </form>

      </div>
    </div>
  );
}

export default ResetPasswordPage;
