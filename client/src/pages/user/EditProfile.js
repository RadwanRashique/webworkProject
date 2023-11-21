import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserHeader } from '../../componets/userComponent/userHeader'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { serverVariables } from '../../util/serverVariables';
import { apiEndPoints } from '../../util/api';
import { userRequest } from '../../Helper/instance';
function EditProfilePage() {
  const location = useLocation()
  const profileData = location.state
  const email = profileData.email

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [name, setName] = useState(profileData.name);
  const [age, setAge] = useState(profileData.age);
  const [phone, setPhone] = useState(profileData.phone);


  const handleSubmit = async (e) => {

    e.preventDefault()

    // Perform validation here
    if (!name || !phone || !age) {

      return toast.error("Please fill all details");
    }

    // name validation
    if (name.trim() == "") {
      return toast.error('Enter your name.');
    }
    else if (!/^[a-zA-Z\s]+$/.test(name)) {
      return toast.error('Name can only contain letters and spaces.');
    }



    //   age validation
    if (age.trim() == '') {
      return toast.error('give correct age')
    }
    if (isNaN(age)) {
      return toast.error('Please enter a numeric value for age.');
    }
    if (age < 18 || age > 100) {
      return toast.error('give your correct age');
    }

    // mobile validation
    if (!/^\d{10}$/.test(phone)) {
      return toast.error('Phone number should be 10 digits.');
    }


    var editedProfile = {
      name,
      age,
      phone,
      email
    }

    dispatch(showLoading())



    userRequest({
      url: apiEndPoints.editUserData,
      method: 'post',
      data: editedProfile,


    }).then((response) => {
      dispatch(hideLoading())

      if (response.data.success) {
        toast.success(response.data.message)
        navigate(serverVariables.Profile)
      }
      else {

        toast.error(response.data.message)

      }

    }).catch((error) => {
      dispatch(hideLoading())
      toast.error("Enter correct field")
    })

  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <UserHeader />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
          <form onSubmit={handleSubmit}>
            <div className="text-2xl font-bold text-gray-800 text-center mb-2">Edit Profile</div>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                defaultValue={profileData.name}

                onChange={(e) => setName(e.target.value.trim())}
                className="border rounded-md px-3 py-2 mb-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="age" className="text-sm text-gray-600 mb-1">
                Age
              </label>
              <input
                type="text"
                id="age"
                defaultValue={profileData.age}

                onChange={(e) => setAge(e.target.value)}
                className="border rounded-md px-3 py-2 mb-2"

              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="mobile" className="text-sm text-gray-600 mb-1">
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                defaultValue={profileData.phone}

                onChange={(e) => setPhone(e.target.value)}
                className="border rounded-md px-3 py-2 mb-2"

              />
            </div>




            <div className="mt-2 flex items-center justify-center">
              <button

                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full self-center"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
