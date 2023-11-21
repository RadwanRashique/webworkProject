import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserHeader } from '../../componets/userComponent/userHeader';
import { serverVariables } from '../../util/serverVariables';
import { apiEndPoints } from '../../util/api';
import { userRequest } from '../../Helper/instance';
function ProfilePage() {

  const navigate = useNavigate()
  const [data, setData] = useState({}) // Initialize data state with an empty object



  const getUserData = async () => {
    userRequest({
      url: apiEndPoints.getUserProfile,
      method: 'get',
    }).then((response) => {

      const userDetails = response.data.userData
      setData(userDetails)
    }).catch((error) => {
      console.error("Error in fetching userProfile data", error)
    })


  }


  useEffect(() => {
   
    getUserData()
  }, [])






  const handleEditClick = () => {
    navigate(serverVariables.EditProfile, { state: data })

  };


  // to handle image


  const handleaddimage = () => {

    const img = {
      image: data.image

    };


    navigate(serverVariables.EditImage, { state: img })
  }

  return (
    <div >
      <UserHeader />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 ">

        <div className="bg-white p-8 rounded-lg shadow-lg w-96">






          <div className="flex flex-col items-center">
            <button onClick={handleaddimage} className='self-center mb-4  bg-blue-500 hover:bg-blue-600 text-white font-semibold  py-2 px-4 rounded-full al' >AddImage</button>
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
              <img
                src={data.image}

                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800"></h2>
            <div className="text-gray-600 text-sm mt-8 font-extrabold">
              <p>Name: {data.name} </p>
              <p>Age: {data.age}</p>
              <p>Mobile: {data.phone}</p>
              <p>Email:{data.email} </p>
            </div>
          </div>
          <div className=' flex items-center justify-center'>
            <button
              className="    bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4 self-center"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
