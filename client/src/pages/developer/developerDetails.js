import React, { useEffect, useState, useRef } from 'react';
import { DeveloperHeader } from '../../componets/developerComponent/developerHeader'
const imginsta = require("../../assets/developer/instaicon.png")
const imgfacebook = require("../../assets/developer/facebookicon.jpeg")
const imglinkedin = require("../../assets/developer/linkedinicon.png")
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { serverVariables } from '../../util/serverVariables';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { developerRequest } from "../../Helper/instance";
import { apiEndPoints } from "../../util/api";


function EditProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [field, setField] = useState('');
  const [interest, setInterest] = useState('');
  const [workCount, setWorkCount] = useState('');
  const [language, setLanguage] = useState('');
  const [webtype, setWebtype] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');

  const [fromTime, setFromTime] = useState('1:00 AM')
  const [toTime, setToTime] = useState('12:00 PM')
  const [about, setAbout] = useState('');
  const [instaUrl, setInstaUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');


  // State for the selected image file
  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);



  const handleSubmit = async (event) => {


    event.preventDefault();


    if (!field || !interest || !workCount || !language || !experience || !education || !toTime || !fromTime || !about) {
      return toast.error('Please fill  all required fields.');
    }

    // Number validation
    if (isNaN(workCount) || isNaN(experience)) {
      return toast.error('Work Count and Experience should be numeric values.');
    }


    const formData = new FormData();
    formData.append("field", field);
    formData.append("interest", interest);
    formData.append("workCount", workCount);
    formData.append("language", language);
    formData.append("webtype", webtype);
    formData.append("experience", experience);
    formData.append("education", education);
    formData.append("toTime", toTime);
    formData.append("fromTime", fromTime);
    formData.append("about", about);
    formData.append("instaUrl", instaUrl);
    formData.append("facebookUrl", facebookUrl);
    formData.append("linkedinUrl", linkedinUrl);
    formData.append("image", image);
    dispatch(showLoading())


    developerRequest({
      url: apiEndPoints.developerData,
      method: 'post',
      data: formData,


    }).then((response) => {
      dispatch(hideLoading())

      if (response.data.success) {

        toast.success(response.data.message)

        getStatus()
      }
      else {

        toast.error(response.data.message)

      }
    }).catch((error) => {
      console.log(error)
      toast.error("Something went wrong")
    })

  }



  //  to get status
  const [status, setStatus] = useState('');
  const [subExpireStatus, setSubExpireStatus] = useState('')
  const getStatus = async () => {

    developerRequest({
      url: apiEndPoints.getStartNowStatus,
      method: 'post',

    }).then((response) => {

      if (response.data.success) {
        setStatus(response?.data.data)
        setSubExpireStatus(response.data.subExpireStatus)



      }

    }).catch((error) => {
      console.log(error)


      toast.error("something went wrong")
    })
  }


  useEffect(() => {

    getStatus()


  }, [])



  return (
    <div>
      <DeveloperHeader />
      {status?.status === 'empty' ? (
        <div className="bg-gray-100 flex flex-col items-center p-1 sm:p-5 justify-center">
          <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 w-full sm:w-11/12 p-2 sm:p-6 rounded-lg shadow-md overflow-y-auto">
            <div className='mb-1 sm:mb-2 flex justify-center items-center font-bold text-white'>
              <h1>Fill Details Below</h1>
            </div>
            <div className="flex flex-col items-center">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="webtype" className="text-gray-800 font-semibold">Field</label>
                  <select
                    id="Field"

                    onChange={(e) => setField(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  >

                    <option value="">Select Your field</option>
                    <option value="FrontEnd Developer">FrontEnd Developer</option>
                    <option value="">BackEnd Developer</option>
                    <option value="Mern stack ">Mern stack</option>
                    <option value="Mean Developer ">Mean Developer</option>
                    <option value="Mevn Developer ">Mevn Developer</option>
                    <option value="Full stack Developer ">Full stack Developer</option>
                    <option value="Web Developer ">Web Developer</option>
                    <option value="App Developer ">App Developer</option>
                    <option value="Pyton Developer ">Pyton Developer</option>
                    <option value="other">other</option>

                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="interest" className="text-gray-800 font-semibold">Interest</label>
                  <input
                    type="text"
                    id="interest"
                    className="w-full p-2 border rounded-md"
                    placeholder="The project you are interested in e.g. Ecommerce"
                    required
                    onChange={(e) => setInterest(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="workcount" className="text-gray-800 font-semibold">Number of works you have done before</label>
                  <input
                    type="number"
                    id="workcount"

                    className="w-full p-2 border rounded-md" // Apply pointer-events-none class
                    min='0'
                    placeholder="Enter work count"

                    required
                    onChange={(e) => setWorkCount(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="language" className="text-gray-800 font-semibold">Language to chat with clients</label>
                  <input
                    type="text"
                    id="language"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter the language comfortable for you"
                    required
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </div>


                <div className="mb-4">
                  <label htmlFor="webtype" className="text-gray-800 font-semibold">Web Type</label>
                  <select
                    id="webtype"

                    onChange={(e) => setWebtype(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Web Type</option>
                    <option value="static">Static</option>
                    <option value="dynamic">Dynamic</option>
                  </select>
                </div>



                <div className="mb-4">
                  <label htmlFor="experience" className="text-gray-800 font-semibold">Years of experience you have</label>
                  <input
                    type="number"
                    id="experience"
                    className="w-full p-2 border rounded-md"
                    placeholder="Number of years in this field"
                    required
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="education" className="text-gray-800 font-semibold">Your Education</label>
                  <input
                    type="text"
                    id="education"
                    className="w-full p-2 border rounded-md"
                    placeholder="Qualifications you have"
                    required
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="profile" className="text-gray-800 font-semibold ">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="profile"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (file) {
                        setImage(file);
                      }


                      // Create a temporary URL for the selected image and set it as the preview
                      const imageUrl = file ? URL.createObjectURL(file) : null;
                      setImagePreview(imageUrl);
                    }}
                    className="w-full p-2 border rounded-md bg-white"

                  />
                  {/* Display image preview */}
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="mt-2 max-h-32 w-32 rounded-full"
                    />
                  )}
                </div>
                <div className="mb-4">

                  <label htmlFor="availability" className="text-gray-800 font-semibold">Chat Availability</label>

                  <h1 htmlFor="fromTime">From</h1>
                  <input
                    type="time"
                    id="fromTime"
                    className="w-full p-2 border rounded-md"
                    placeholder="From time"
                    required
                    onChange={(e) => setFromTime(e.target.value)}
                  />

                </div>

                <div className="mb-4">
                  <label htmlFor="toTime">To</label>
                  <input
                    type="time"
                    id="toTime"
                    className="w-full p-2 border rounded-md"
                    placeholder="To time"
                    required
                    onChange={(e) => setToTime(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-gray-800 font-semibold">About</label>
                  <textarea
                    id="about"
                    rows="4"
                    className="w-full p-2 border rounded-md"
                    placeholder="Tell us about you (max 800 words)"
                    maxLength="800"
                    required
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-4">
                  <div className="bg-black p-2 rounded-md mb-2">
                    <p className="text-white font-semibold">Your Social Links</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-2">
                      <img src={imginsta} alt="Instagram Icon" className="w-6 h-6" />
                    </div>
                    <input
                      type="text"
                      id="instagram"
                      className="w-full p-2 border rounded-md"
                      placeholder="Instagram URL"

                      onChange={(e) => setInstaUrl(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex-shrink-0 mr-2">
                      <img src={imgfacebook} alt="Facebook Icon" className="w-6 h-6" />
                    </div>
                    <input
                      type="text"
                      id="facebook"
                      className="w-full p-2 border rounded-md"
                      placeholder="Facebook URL"

                      onChange={(e) => setFacebookUrl(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex-shrink-0 mr-2">
                      <img src={imglinkedin} alt="LinkedIn Icon" className="w-6 h-6" />
                    </div>
                    <input
                      type="text"
                      id="linkedin"
                      className="w-full p-2 border rounded-md"
                      placeholder="LinkedIn URL"

                      onChange={(e) => setLinkedinUrl(e.target.value)}
                    />
                  </div>
                </div>
                <div className='mb-4 flex justify-center items-center'>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-full p-2 px-6 hover:bg-red-600"
                  >
                    Submit
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
            {
              status?.status === 'Approved' && status?.payment === 'unDone' && subExpireStatus === true ? (
                <div className="text-center">
                  <div>
                    <strong><s className="text-red-500">plan</s></strong>   <br />
                    Your Plan Has expired <br />
                    From here after we will Not  display Your data to  clients. But you can continue connetions with your followers <br />
                    To get more service take a subscription plan

                  </div>
                  <button
                    className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 mt-8 rounded"
                    onClick={() => navigate(serverVariables.SubscriptionPlan)}>Subscription Plan</button>

                </div>

              ) :




                status?.status === 'Approved' && status?.payment === 'Done' && subExpireStatus === false ? (

                  <div className="text-center">
                    {/* Flex container to center the content vertically and horizontally */}
                    <div className="flex flex-col items-center justify-center h-screen">

                      <div className="text-center">
                        <div>We have displayed the details you gave to Our clients.</div>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-8 rounded"
                          onClick={() => navigate(serverVariables.DeveloperHome)}
                        >
                          Home
                        </button>
                      </div>
                    </div>
                  </div>
                ) :

                  status?.status === 'formsubmitted' && subExpireStatus === false ? (
                    <div className="text-center">
                      <p>Congrats! You completed the first step.</p>
                      <p>Now admin will check your details and approve you soon.</p>

                      <button
                        className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 mt-8 rounded"
                        onClick={() => navigate(serverVariables.DeveloperHome)}
                      >
                        Back To Home
                      </button>
                    </div>
                  ) : status?.status === 'Approved' && subExpireStatus === false ? (
                    <div className="text-center">
                      <p>Congrats! Admin approved you for the payment option.</p>
                      <button
                        className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 mt-8 rounded"
                        onClick={() => navigate(serverVariables.SubscriptionPlan)}>Continue</button>
                    </div>
                  )

                    :
                    (
                      <div className="text-center">
                        <div>sorry Your Application was rejected by admin</div>
                        <button
                          className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 mt-8 rounded"
                          onClick={() => navigate(serverVariables.DeveloperHome)}>Home</button>

                      </div>
                    )


            }
          </div>
        </div>
      )}
    </div>
  );

}

export default EditProfile;
