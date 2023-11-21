import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { serverVariables } from "../../util/serverVariables";
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { BsEye, BsEyeSlash } from 'react-icons/bs'; // Import Bootstrap icons
import { apiEndPoints } from '../../util/api';
import { developerRequest } from '../../Helper/instance';
function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const handlename = (e) => {
    setName(e.target.value.trim())
  }

  const [email, setEmail] = useState("")
  const handleemail = (e) => {
    setEmail(e.target.value)

  }



  const [age, setAge] = useState("")
  const handleage = (e) => {
    setAge(e.target.value)
  }
  const [password, setPassword] = useState("")
  const handlepassword = (e) => {
    setPassword(e.target.value)
  }

  const [confirmPassword, setConfirmPassword] = useState("")
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }
  // image icon
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const [phone, setPhone] = useState("")
  const handlephone = (e) => {
    setPhone(e.target.value)
  }


  const handleSubmit = async (event) => {
    event.preventDefault();


    // Perform validation here
    if (!name || !password || !phone || !email || !age || !confirmPassword) {

      return toast.error("Please fill all details");
    }

    // name validation
    if (name.trim() == "") {
      return toast.error('Enter your name.');
    }
    else if (!/^[a-zA-Z\s]+$/.test(name)) {
      return toast.error('Name can only contain letters and spaces.');
    }

    // mobile validation
    if (phone.trim() == '') {
      return toast.error('give correct phoneNumber..');

    }
    if (/^\d+$/.test(phone) && phone.length === 10) {


    } else {
      return toast.error('Please enter a valid 10-digit mobile number.');
    }

    //   age validation
    if (age.trim() == '') {
      return toast.error('give correct age')
    }
    if (isNaN(age)) {
      return toast.error('Please enter a numeric value for age.');
    }
    if (age < 18 || age > 100) {
      return toast.error('your are not allowed to use this site');
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid gmail email address.");
    }
    //   password validation 
    if (password.trim() == '') {
      return toast.error('Enter another password.');

    }
    if (password.length <= 5) {
      return toast.error('please enter minimum 6keys for password')
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(password)) {
      return toast.error('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
    }


    // Confirm Password validation
    if (confirmPassword.trim() === '') {
      return toast.error('Enter the confirm password.');
    }
    if (password !== confirmPassword) {
      return toast.error('Password and confirm password do not match.');
    }
    dispatch(showLoading())
      const registerData = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        age: age
      }

    developerRequest({
      url:apiEndPoints.developerregister,
      method:'post',
      data:registerData,


    }).then((response)=>{
      dispatch(hideLoading())
        if (response.data.success) {
          toast.success(response.data.message)
          navigate(serverVariables.DeveloperOtp, { state: email })
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
      className="min-h-screen flex"
      style={{
        backgroundImage: `url("/images/developerImages/registerimage.png")`, // Replace with your image source
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Centered Registration Box */}
      <div className="w-full max-w-md p-8 mx-auto mt-16 mb-16 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handlename}
              placeholder="Enter Your Name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold" htmlFor="age">
              Phone
            </label>
            <input

              id="age"

              onChange={handlephone}
              type="tel"
              name="phoneNumber"

              placeholder="Enter Your mobileNumber"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required


            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleemail}

              placeholder="example@gmail.com"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold"
              htmlFor="age"
            >
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              onChange={handleage}

              placeholder="Enter Your Age"
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
              onChange={handlepassword}
              placeholder="********"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 mt-2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />} {/* Show the eye icons */}
            </div>
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-600 font-semibold"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              type='password' // Toggle the input type
              id="confirmpassword"
              name="confirmpassword"
              onChange={handleConfirmPassword}
              placeholder="********"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Register
          </button>
          <div className="mt-4 text-gray-600 text-center ">
            <h2>Already have an account ?</h2>
            <span>

              <Link to="/developerlogin">
                <a className="text-purple-600 hover:underline" href="#">
                  Log in
                </a>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
