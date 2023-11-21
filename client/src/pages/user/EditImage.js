import React, { useState } from 'react'
import { UserHeader } from "../../componets/userComponent/userHeader";
import { useNavigate, useLocation } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { serverVariables } from '../../util/serverVariables';
import { apiEndPoints } from '../../util/api';
import { userRequest } from '../../Helper/instance';
const EditImage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation()
  const data = location.state
  const [profileImage, setProfileImage] = useState();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      setProfileImage(file);
    }
  };




  // while clicking save
  const handleImageSave = async (e) => {
    e.preventDefault();

    if (!profileImage) {
      // If no new image is selected, send the existing image URL
      const existingImageURL = data.image;
      if (existingImageURL) {

        dispatch(showLoading());
      if (existingImageURL) {
        userRequest({
          url: apiEndPoints.updateImage,
          method: 'post',
          data: { image: existingImageURL },


        }).then((response) => {
          dispatch(hideLoading());



          if (response.data.success) {
            toast.success(response.data.message);
            navigate(serverVariables.Profile);
          } else {
            toast.error(response.data.message);
          }

        }).catch((error) => {
          console.log(error, 'imageupdate');
          dispatch(hideLoading());
          toast.error('Sorry, there was an error while saving the image.');
        }


        )}
      }
        else {
              toast.error('No image selected or available to save.');
            }
          }
        
    else {
     


 // New image is selected, proceed with the upload
      dispatch(showLoading());
      userRequest({
        url:apiEndPoints.updateImage,
        method:'post',
        data:{ image: existingImageURL },
  
  
      }).then((response)=>{
        dispatch(hideLoading());

            if (response.data.success) {
              toast.success(response.data.message);
              navigate(serverVariables.Profile);
            } else {
              toast.error(response.data.message);
            }

      }).catch((error)=>{
              console.log(error, 'imageupdate');
           dispatch(hideLoading());
            toast.error('Sorry, this file is not acceptable.');
        
      })


    }
  
}


    return (
      <div >
        <UserHeader />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 ">

          <div className="bg-white p-8 rounded-lg shadow-lg w-96">

            <div className="flex flex-col">
              <label htmlFor="profile" className="text-sm text-gray-600 mb-1 font-bold">
                Profile Picture
              </label>
              <input
                type="file"
                id="profile"
                accept="image/*"
                onChange={handleImageChange}
                className="border rounded-md px-3 py-2 mb-2"
              />
            </div>
            <div className="flex flex-col items-center" >
              <img
                src={profileImage ? URL.createObjectURL(profileImage) : data.image} // Display selected image or a default image
                alt="Profile Image"
                className="w-48 h-48 rounded-full mt-4"
              />
            </div>
            <div className="mt-2 flex items-center justify-center">
              <button

                type="submit"
                onClick={handleImageSave}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded-full self-center"
              >
                Save
              </button>
            </div>




          </div>
        </div>
      </div>
    );
  };

  export default EditImage;
