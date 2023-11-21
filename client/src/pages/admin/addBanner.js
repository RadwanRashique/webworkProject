import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for the "Back" button
import { serverVariables } from '../../util/serverVariables';
import { apiEndPoints } from '../../util/api';
import { adminRequest } from '../../Helper/instance';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import AdminNavbar from '../../componets/adminComponent/AdminNavbar'

function AddBanner() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [title, setTitle] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')


  // handle change

  const handleImageChange = (e) => {

    const file = e.target.files[0];
    setImage(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation

    if (!title || !image || !description) {
      toast.error("Fill all fields")

    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("discription", description)


    dispatch(showLoading())

    adminRequest({
      url: apiEndPoints.adminCreateBanner,
      method: 'post',
      data: formData

    }).then((response) => {
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        navigate(serverVariables.Banner)

      }
      else {
        toast.error(response.data.message)
      }


    }).catch((error) => {
      console.log(error)
      dispatch(hideLoading())

      // toast.error("something went wrong")


    })
    // Handle form submission, e.g., send data to the server
  }

  const [openState, setOpenState] = useState(false);

  // Function to handle the open state from the AdminNavbar component
  const handleChildData = (childData) => {
    setOpenState(childData);
  };
  return (
    <div>
      <AdminNavbar onDataFromChild={handleChildData} />

      <div className='flex flex-col h-screen'>
        <div className=' p-4 text-white'>
          <Link to={serverVariables.Banner}><button className='text-white bg-blue-500 rounded w-32 h-8'> Back</button></Link>

        </div>

        <div className='flex-grow flex items-center justify-center'>
          <div className='bg-white p-8 rounded-md shadow-md w-96'>
            <h2 className='text-xl font-semibold mb-4'>Add Banner</h2>

            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='image' className='block text-sm font-medium text-gray-700'>
                  Image
                </label>
                <input
                  type='file' // Use file input to select an image from the system
                  id='image'
                  name='image'
                  accept='image/*' // Specify accepted file types (images)
                  onChange={handleImageChange}
                  className='w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300'
                  required
                />
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Selected Image"
                    className="w-98 h-48  mt-4"
                  />
                )}
              </div>

              <div className='mb-4'>
                <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                  Title
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'

                  onChange={(e) => setTitle(e.target.value.trim())}
                  className='w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300'
                  placeholder='Banner Title'
                  required
                />
              </div>

              <div className='mb-6'>
                <label htmlFor='description' className='block text-sm font-medium text-gray-700 '>
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'

                  onChange={(e) => setDescription(e.target.value.trim())}
                  className='w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300'
                  placeholder='Banner Description maximum 70 words'
                  rows='4'
                  required
                  maxLength="70"
                ></textarea>
              </div>

              <div className='flex justify-center'>
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBanner;
