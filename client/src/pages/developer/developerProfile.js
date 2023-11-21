import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { serverVariables } from '../../util/serverVariables';
import { DeveloperHeader } from '../../componets/developerComponent/developerHeader';
import { apiEndPoints } from '../../util/api';
import { developerRequest } from '../../Helper/instance';
const imginsta = require("../../assets/developer/instaicon.png")
const imgfacebook = require("../../assets/developer/facebookicon.jpeg")
const imglinkedin = require("../../assets/developer/linkedinicon.png")
import './DeveloperProfile.css'


const developerProfile = () => {


  const navigate = useNavigate()
  const [data, setData] = useState({}) // Initialize data state with an empty object

  const [initial, setInitial] = useState({})
  const [edit, setEdit] = useState(false)
  const [SubscriptionData, setSubscriptionData] = useState({})
  const [date, setDate] = useState(null)

  const getdeveloperData = async () => {
  
  

  developerRequest({
    url:apiEndPoints.getDeveloperProfile,
    method:'get',


  }).then((response)=>{
    setInitial(response.data.firstdata)

    setData(response.data.developerData)
    setSubscriptionData(response.data.subscriptionData)

    setEdit(response.data.firstdata.formCollected)
    setDate(response.data.firsdata?.payment)

    toast.success(response.data.message)
  }).catch((error)=>{
           console.error("Error in fetching developerProfile data", error)
    })
}
  useEffect(() => {
    
    getdeveloperData()
  }, [])



  const handleEditClick = () => {
    navigate(serverVariables.DeveloperEditProfile, { state: data })

  };

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

  return (

    <div>
  <DeveloperHeader />
    
    <div className="bg-gray-100 h-screen header-container">
    

      {/* Top Bar */}
    

      {/* Main Content */}
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Div */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="bg-white p-4 flex justify-between items-center">


{edit ? (
  <button onClick={() => handleEditClick()} className="bg-red-500 text-white rounded-md px-4 py-2">Edit</button>
) : null}

</div>
          {/* Profile Image */}

          <div >
            <img className="w-32 h-32 mx-auto bg-gray-300 rounded-full object-cover"
              src={data?.image || "https://bootdey.com/img/Content/avatar/avatar7.png"}


            />
          </div>

          {/* Followers */}
          <div className="mt-4 text-center">
            
            <p className="mt-2">{SubscriptionData[0]?.followersCount || 0}</p>
            <button className=" bg-blue-500 text-white rounded-md px-4 py-2">Followers</button>

          </div>

          {/* Data */}
          <div className="mt-4">
            <table className="w-full">
              <tbody>
                <tr >
                  <td className="font-semibold pr-4">Name:</td>
                  <td>{initial?.name}</td>
                </tr>
                <tr >
                  <td className="font-semibold pr-4">Age:</td>
                  <td>{initial?.age}</td>
                </tr>
                <tr >
                  <td className="font-semibold pr-4">Email:</td>
                  <td>{initial?.email}</td>
                </tr>
                {/* Add more rows with long content */}
                <tr >
                  <td className="font-semibold pr-4">Education:</td>
                  <td>{data?.education}</td>
                </tr>
                <tr >
                  <td className="font-semibold pr-4">Years of Experience:</td>
                  <td>{data?.experience}</td>
                </tr>
                <tr >
                  <td className="font-semibold pr-4">Field:</td>
                  <td>{data?.field}</td>
                </tr>
                <tr >
                  <td className="font-semibold pr-4">Language to chat:</td>
                  <td>{data?.language}</td>
                </tr>
                <tr >
                  <td className="font-semibold pr-4">Intrested Area:</td>
                  <td>{data?.interest}</td>
                </tr>
                <tr >
                  <td className="font-semibold pr-4">Web-Type:</td>
                  <td>{data?.webtype}</td>
                </tr>
                <tr >
                  <td className="font-semibold pr-4">Works-done:</td>
                  <td>{data?.workCount}</td>
                </tr>
                <h1 className='font-extrabold '>Chat Avilability</h1>
                <tr >

                  <td className="font-semibold pr-4">From:</td>
                  <td>{data?.fromTime ? convertTo12HourFormat(data.fromTime) : ''}</td>
                </tr>
                <tr >
                  <td className="font-semibold pr-4">To:</td>
                  <td>{data?.toTime ? convertTo12HourFormat(data.toTime) : ''} </td>
                </tr>
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



          {/* Image */}
          <div className="bg-white p-2 rounded-full mb-3">
            <Link to={data?.facebookUrl} > <img src={imgfacebook} alt="LinkedIn" className="w-6 h-6" /></Link>
          </div>

          {/* Description */}
          <div className="bg-white mb-3 ml-2 rounded w-49 h-6 ">
            <a className="flex items-start space-x-2">
              <p className="text-black">Facebook</p>
            </a>
          </div>



          {/* Image */}
          <div className="bg-white p-2 rounded-full mb-3">
            <Link to={data?.instaUrl} >    <img src={imginsta} alt="LinkedIn" className="w-6 h-6" /></Link>
          </div>

          {/* Description */}
          <div className="bg-white ml-2 rounded w-49 h-6 mb-3">
            <a className="flex items-start space-x-2">
              <p className="text-black">Instagram</p>
            </a>
          </div>




          {/* Image */}
          <div className="bg-white p-2 rounded-full mb-3 ">
            <Link to={data?.linkedinUrl} > <img src={imglinkedin} alt="LinkedIn" className="w-6 h-6" /></Link>
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
      {data ? (
        <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
          <div className="bg-blue-500 w-1/6 text-center rounded">
            <h1 className='font-bold text-white'>About </h1>

          </div>
          <div className="mt-4 ">
            <p>
              {data?.about}
            </p>
          </div>
        </div>
      ) : null}





      {/* Subscription Plan */}
      {SubscriptionData[0] ? (
        <div className="mt-4 bg-blue-950 text-white py-4 text-center">
          <h1 className="text-2xl font-bold">Subscription Plan</h1>
          <p>your  {SubscriptionData[0]?.duration} of ₹{SubscriptionData[0]?.price}  will expires on {new Date(SubscriptionData[0]?.expireDate).toISOString().split('T')[0]}</p>
        </div>) : null
      }

    </div>
    </div>
  );
};

export default developerProfile





