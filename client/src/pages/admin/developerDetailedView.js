import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
const imginsta = require("../../assets/developer/instaicon.png")
const imgfacebook = require("../../assets/developer/facebookicon.jpeg")
const imglinkedin = require("../../assets/developer/linkedinicon.png")
import { serverVariables } from '../../util/serverVariables';
import { adminRequest } from '../../Helper/instance';
import { apiEndPoints } from '../../util/api';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import toast from 'react-hot-toast';
import AdminNavbar from '../../componets/adminComponent/AdminNavbar'

const DetailedView = () => {


  const location = useLocation()
  const dispatch = useDispatch()
  const devId = location.state
  const [dat, setDat] = useState({});
  const { developerDetails, Data } = dat;
  const getDeveloperData = () => {
    dispatch(showLoading())
    adminRequest({
      url: apiEndPoints.developerDetailedView,
      method: 'post',
      data: { idData: devId }

    }).then((response) => {
      dispatch(hideLoading())
      if (response.data.success) {
        setDat(response.data.data);
        toast.success(response.data.message)

      }


    }).catch((error) => {
      console.log(error)
      dispatch(hideLoading())

      // toast.error("something went wrong")


    })

  }

  // mount while clicking to this page
  useEffect(() => {
    getDeveloperData()
  }, [])

  // to convert time picker 24 to 12hr with am/pm
  function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(':');
    let period = 'AM';
    let hours12 = parseInt(hours, 10);

    if (hours12 >= 12) {
      period = 'PM';
      if (hours12 > 12) {
        hours12 -= 12;
      }
    }

    return `${hours12}:${minutes} ${period}`;
  }


  const [openState, setOpenState] = useState(false);

  // Function to handle the open state from the AdminNavbar component
  const handleChildData = (childData) => {
    setOpenState(childData);
  };
  return (
    <div>
      <AdminNavbar onDataFromChild={handleChildData} />

      <div className="bg-gray-100 h-screen">
        {/* Top Bar */}
        <div className="bg-white p-4 flex justify-between items-center">
          <Link to={serverVariables.RequestApprove}> <button className="bg-blue-950 text-white rounded-md px-4 py-2">Back</button></Link>
        </div>

        {/* Main Content */}
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Div */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Profile Image */}
            <div >
              <img className="w-32 h-32 mx-auto bg-gray-300 rounded-full object-cover"
                src={developerDetails?.image}


              />
            </div>
            {/* Data */}
            <div className="mt-4">
              <table className="w-full">
                <tbody>
                  <tr >
                    <td className="font-semibold pr-4">Name:</td>
                    <td> {Data?.name}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Name:</td>
                    <td> {Data?.phone}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Age:</td>
                    <td>{Data?.age}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Email:</td>
                    <td>{Data?.email}</td>
                  </tr>
                  {/* Add more rows with long content */}
                  <tr >
                    <td className="font-semibold pr-4">Education:</td>
                    <td>{developerDetails?.education}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Years of Experience:</td>
                    <td>{developerDetails?.experience}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Field:</td>
                    <td>{developerDetails?.field}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Language to chat:</td>
                    <td>{developerDetails?.language}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Intrested Area:</td>
                    <td>{developerDetails?.interest}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Web-Type:</td>
                    <td>{developerDetails?.webtype}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Works-done:</td>
                    <td>{developerDetails?.workCount}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">From:</td>
                    <td>{developerDetails?.fromTime ? convertTo12HourFormat(developerDetails.fromTime) : ''}</td>
                  </tr>
                  <tr >

                    <td className="font-semibold pr-4">To:</td>
                    <td>{developerDetails?.toTime ? convertTo12HourFormat(developerDetails.toTime) : ''}</td>
                  </tr>
                  {/* Add more rows */}
                </tbody>
              </table>
            </div>

          </div>
          {/* Right Div */}
          <div className="bg-blue-950 p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
            {/* Social Links */}
            <div className="text-white text-center mb-4">
              <h2 className="text-xl font-semibold">Social Links</h2>
            </div>

            {/* LinkedIn */}

            {/* Image */}
            <div className="bg-white p-2 rounded-full mb-3">
              <Link to={developerDetails?.facebookUrl} > <img src={imgfacebook} alt="LinkedIn" className="w-6 h-6" /></Link>
            </div>

            {/* Description */}
            <div className="bg-white mb-3 ml-2 rounded w-49 h-6 ">
              <a className="flex items-start space-x-2">
                <p className="text-black">Facebook</p>
              </a>
            </div>

            {/* LinkedIn */}

            {/* Image */}
            <div className="bg-white p-2 rounded-full mb-3">
              <Link to={developerDetails?.instaUrl} > <img src={imginsta} alt="LinkedIn" className="w-6 h-6" /></Link>
            </div>

            {/* Description */}
            <div className="bg-white ml-2 rounded w-49 h-6 mb-3">
              <a className="flex items-start space-x-2">
                <p className="text-black">Instagram</p>
              </a>
            </div>


            {/* LinkedIn */}

            {/* Image */}
            <div className="bg-white p-2 rounded-full mb-3 ">
              <Link to={developerDetails?.linkedinUrl} > <img src={imglinkedin} alt="LinkedIn" className="w-6 h-6" /></Link>
            </div>

            {/* Description */}
            <div className="bg-white ml-2 rounded w-49 h-6 mb-3">
              <a className="flex items-start space-x-2">
                <p className="text-black">LinkedIn</p>
              </a>
            </div>
          </div>
        </div>
        {/* about */}
        {/* About Section */}
        <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
          <div className="bg-blue-500 w-1/6 text-center rounded">
            <h1 className='font-bold text-white'>About </h1>
          </div>
          <div className="mt-4 ">
            <p>
              {developerDetails?.about}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedView;





