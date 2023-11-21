import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs'; // Import Bootstrap icons
import { useNavigate } from 'react-router-dom';
import { adminRequest } from '../../Helper/instance';
import { apiEndPoints } from '../../util/api';
import { serverVariables } from '../../util/serverVariables';
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { GrUserAdmin } from "react-icons/gr";

function LoginPage() {

    const navigate = useNavigate()

    const dispatch = useDispatch()



    const [email, setEmail] = useState("")
    const handleemailchange = (e) => {
        setEmail(e.target.value)

    }

    const [password, setPassword] = useState("")
    const handlepassword = (e) => {

        setPassword(e.target.value)
    }

    // image icon
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };




    const handleSubmit = async (event) => {
        event.preventDefault()




        const loginData = {
            email,
            password
        }


     dispatch(showLoading())

        adminRequest({
            url:apiEndPoints.adminlogin,
            method:'post',
            data:loginData,
      
      
          }).then((response)=>{
            dispatch(hideLoading())

                if (response.data.success) {
                    toast.success(response.data.message)
    
                    localStorage.setItem("admintoken", response.data.data)
                    navigate(serverVariables.Dashboard)
                }
                else {
                    toast.error(response.data.message)
                }
          }).catch((error)=>{
                    console.log(error, "adminoo")
                dispatch(hideLoading())
                toast.error(error.response.data.message)
          })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-indigo-600" style={{ backgroundImage: `url('your-background-image.jpg')` }}>
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <p className='text-center text-2xl flex justify-center'>
                    <GrUserAdmin />
                </p>

                <h2 className="text-center text-2xl font-bold leading-9 text-gray-900 mt-4">
                    Welcome Admin
                </h2>
                <form onSubmit={handleSubmit} className="mt-8">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleemailchange}
                            placeholder="example@gmail.com"
                            autoComplete="email"
                            required
                            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6 relative">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-700">
                                Password
                            </label>

                        </div>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'} // Toggle the input type
                            autoComplete="current-password"
                            onChange={handlepassword}
                            placeholder="*********"
                            required
                            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder-gray-400"
                        />
                        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 mt-3 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <BsEyeSlash /> : <BsEye />} {/* Show the eye icons */}
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
