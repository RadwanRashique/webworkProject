import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'; // Import Bootstrap icons
import { serverVariables } from '../../util/serverVariables';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { apiEndPoints } from '../../util/api';
import { userRequest } from '../../Helper/instance';
function Login() {
    // to check the working of redux 
    const { loading } = useSelector(state => state.alerts)
    // (loading, "redux check  initialy we setted loading as false it will get consoled in alert slice")

    const navigate = useNavigate()

    const dispatch = useDispatch()



    const [email, setEmail] = useState("")
    const handleemail = (e) => {
        setEmail(e.target.value)

    }

    const [password, setPassword] = useState("")
    const handlepassword = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value)
    }

    // image icon
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };




    const formSubmit = async (event) => {
        event.preventDefault()
        const loginData = {
            email,
            password
        }
     dispatch(showLoading())
     userRequest({
        url:apiEndPoints.UserLogin,
        method:'post',
        data:loginData
     }).then((response)=>{

        dispatch(hideLoading())
       
            if (response.data.success) {
                toast.success(response.data.message)
                toast("Redirecting to home page")
                localStorage.setItem("token", response.data.data)
                navigate(serverVariables.UserHome)
            }
            else {

                toast.error(response.data.message)
            }
        
     }).catch((error)=>{
        dispatch(hideLoading())
            toast.error("Something went wrong")
     })
        }
    return (
        <div>


            <div >


                <div className="h-full bg-gray-50  w-full  py-16 px-4">
                    <div className="flex flex-col items-center justify-center">


                        <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
                            <p tabindex="0" className="focus:outline-none text-2xl font-extrabold leading-6  text-purple-700 text-center">Login</p>


                            <div className="w-full flex items-center justify-between py-5">



                            </div>
                            <div>
                                <label id="email" className="text-sm font-medium leading-none text-gray-800">
                                    Email
                                </label>
                                <input placeholder='example@gmail.com' onChange={handleemail} aria-labelledby="email" type="email" name='email' required className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                            </div>
                            <div className="mt-6  w-full">
                                <label for="pass" className="text-sm font-medium leading-none text-gray-800">
                                    Password
                                </label>

                                <div className="relative flex items-center justify-center">
                                    <input
                                        type={showPassword ? 'text' : 'password'} // Toggle the input type

                                        placeholder='*******' onChange={handlepassword} id="pass" required name='password' className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                                    <div className="absolute right-0 mt-2 mr-3 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <BsEyeSlash /> : <BsEye />} {/* Show the eye icons */}
                                    </div>

                                </div>
                            </div>
                            <div className="mt-8">
                                <a
                                    href="/forgetPassword"
                                    className="text-xs text-purple-600 hover:underline"
                                >
                                    Forget Password?
                                </a>
                                <button onClick={formSubmit} role="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibolwhite focus:outline-none  bg-purple-700 border rounded  py-4 w-full">Login</button>
                                <p tabindex="0" className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500 text-center">Dont have account?</p>
                                <Link to="/register">
                                    < p tabindex="0" className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500 text-center"> <a href="javascript:void(0)" className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer text-center"> Sign up </a></p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Login