import React, { useState } from "react";
import { serverVariables } from "../../util/serverVariables";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { BsEyeSlash, BsEye } from "react-icons/bs"; // Import Bootstrap Icons
import { apiEndPoints } from '../../util/api';
import { userRequest } from '../../Helper/instance';

function Register() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const handlename = (e) => {
    setName(e.target.value.trim());
  };

  const [email, setEmail] = useState("");
  const handleemail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handlepassword = (e) => {
    setPassword(e.target.value);
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [confirmPassword, setConfirmPassword] = useState("")
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const [phone, setPhone] = useState("");
  const handlephone = (e) => {
    setPhone(e.target.value);
  };

  const [age, setAge] = useState("");
  const handleage = (e) => {
    setAge(e.target.value);
  };

  const navigate = useNavigate();

  const registerSubmit = async (event) => {
    event.preventDefault();

    if (!name || !password || !phone || !email || !age || !confirmPassword) {
      return toast.error("Please fill all details");
    }

    if (name.trim() === "") {
      return toast.error("Enter your name.");
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      return toast.error("Name can only contain letters and spaces.");
    }

    if (phone.trim() === "") {
      return toast.error("Give correct phoneNumber.");
    }
    if (/^\d+$/.test(phone) && phone.length === 10) {
    } else {
      return toast.error("Please enter a valid 10-digit mobile number.");
    }

    if (age.trim() === "") {
      return toast.error("Give correct age");
    }
    if (isNaN(age)) {
      return toast.error("Please enter a numeric value for age.");
    }
    if (age < 18 || age > 100) {
      return toast.error("You are not allowed to use this site.");
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid gmail email address.");
    }

    if (password.trim() === "") {
      return toast.error("Enter another password.");
    }
    if (password.length <= 5) {
      return toast.error("Please enter a minimum of 6 characters for the password.");
    }

    // Confirm Password validation
    if (confirmPassword.trim() === '') {
      return toast.error('Enter the confirm password.');
    }
    if (password !== confirmPassword) {
      return toast.error('Password and confirm password do not match.');
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(password)) {
      return toast.error('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
    }


    dispatch(showLoading());
    const registerData = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      age: age,
    };

    userRequest({

      url: apiEndPoints.postRegisterData,
      method: 'post',
      data: registerData
    }).then((response) => {
      dispatch(hideLoading());
      if (response.data.success) {
       
        toast.success(response.data.message);
        navigate(serverVariables.Otp, { state: email });
      }
      else {
        toast.error(response.data.message);
      }

    }).catch((error) => {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    })

  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/userHome">
            <h3 className="text-4xl font-bold text-purple-600">
              Welcome To Webwork
            </h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                onChange={handlename}
                type="text"
                required
                name="name"
                placeholder="Enter Your Name"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                onChange={handleage}
                type="text"
                required
                name="age"
                placeholder="Enter Your Age"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                onChange={handleemail}
                required
                placeholder="example@gmail.com"
                type="email"
                name="email"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mt-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                onChange={handlepassword}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="******"
                required
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-1 right-2 px-2 py-6 focus:outline-none text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>

            <div className="mt-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                onChange={handleConfirmPassword}
                type='password'
                name="confirmpassword"
                placeholder="******"
                required
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />

            </div>


            <div className="mt-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                onChange={handlephone}
                type="tel"
                name="phoneNumber"
                placeholder="Enter Your PhoneNumber"
                required
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div className="flex items-center mt-4">
              <button
                onClick={registerSubmit}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600 flex flex-col items-center">
            Already have an account?{" "}
            <span>
              <Link to="/login">
                <a className="text-purple-600 hover:underline" href="#">
                  Log in
                </a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
