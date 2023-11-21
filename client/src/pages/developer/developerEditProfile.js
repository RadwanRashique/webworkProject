import React, { useState } from 'react';
import { DeveloperHeader } from '../../componets/developerComponent/developerHeader'
const imginsta = require("../../assets/developer/instaicon.png")
const imgfacebook = require("../../assets/developer/facebookicon.jpeg")
const imglinkedin = require("../../assets/developer/linkedinicon.png")
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { serverVariables } from '../../util/serverVariables';
import { developerRequest } from "../../Helper/instance";
import { apiEndPoints } from "../../util/api";


function developerEditProfile() {

  const location = useLocation()
  const profileData = location.state
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [field, setField] = useState(profileData.field);
  const [interest, setInterest] = useState(profileData.interest);
  const [workCount, setWorkCount] = useState(profileData.workCount);
  const [language, setLanguage] = useState(profileData.language);
  const [webtype, setWebtype] = useState(profileData.webtype);
  const [experience, setExperience] = useState(profileData.experience);
  const [education, setEducation] = useState(profileData.education);
  const [fromTime, setFromTime] = useState(profileData.fromTime)
  const [toTime, setToTime] = useState(profileData.toTime)
  const [about, setAbout] = useState(profileData.about);
  const [instaUrl, setInstaUrl] = useState(profileData.instaUrl);
  const [facebookUrl, setFacebookUrl] = useState(profileData.facebookUrl);
  const [linkedinUrl, setLinkedinUrl] = useState(profileData.linkedinUrl);
  const [image, setImage] = useState(profileData.image);


  // handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

  };


  // form submit
  const handleSubmit = async (e) => {


    e.preventDefault()



    // Validate required fields here
    if (!field || !interest || !workCount || !language || !webtype || !experience || !education || !fromTime || !toTime || !about || !image) {
      return toast.error('Please fill all required fields.');
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
      url:apiEndPoints.DeveloperformData,
      method:'post',
      data:formData,


    }).then((response)=>{
          dispatch(hideLoading())

      if (response.data.success) {
        toast.success(response.data.message)
        navigate(serverVariables.DeveloperProfile)
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
      <DeveloperHeader />
      <div className="bg-gray-100 flex flex-col items-center p-1 sm:p-5 justify-center">
        <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 w-full sm:w-11/12 p-2 sm:p-6 rounded-lg shadow-md overflow-y-auto">
          <div className='mb-1 sm:mb-2 flex justify-center items-center font-bold text-white'>
            <h1>Edit Details</h1>
            <h1>Edit Details</h1>
          </div>
          <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit}>

              <div className="mb-4">
                <label htmlFor="webtype" className="text-gray-800 font-semibold">Field</label>
                <select
                  id="Field"

                  onChange={(e) => setField(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  defaultValue={profileData.field}
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
                <label htmlFor="interest" className="text-white font-semibold">Interest</label>
                <input
                  type="text"
                  id="interest"
                  className="w-full p-2 border rounded-md"
                  placeholder="The project you are interested in e.g. Ecommerce"
                  defaultValue={profileData.interest}
                  onChange={(e) => setInterest(e.target.value.trim())}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="workcount" className="text-white font-semibold">Number of works you have done before</label>
                <input
                  type="number"
                  id="workcount"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter work count"
                  min="0"
                  defaultValue={profileData.
                    workCount
                  }
                  onChange={(e) => setWorkCount(e.target.value.trim())}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="language" className="text-white font-semibold">Language to chat with clients</label>
                <input
                  type="text"
                  id="language"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter the language comfortable for you"
                  defaultValue={profileData.language}
                  onChange={(e) => setLanguage(e.target.value.trim())}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="webtype" className="text-gray-800 font-semibold">Web Type</label>
                <select
                  id="webtype"

                  onChange={(e) => setWebtype(e.target.value.trim())}
                  className="w-full p-2 border rounded-md"
                  defaultValue={profileData.webtype}
                  required
                >
                  <option value="">Select Web Type</option>
                  <option value="static">Static</option>
                  <option value="dynamic">Dynamic</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="experience" className="text-white font-semibold">Years of experience you have</label>
                <input
                  type="number"
                  id="experience"
                  className="w-full p-2 border rounded-md"
                  placeholder="Number of years in this field"
                  min="0"
                  defaultValue={profileData.experience}
                  onChange={(e) => setExperience(e.target.value.trim())}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="education" className="text-white font-semibold">Your Education</label>
                <input
                  type="text"
                  id="education"
                  className="w-full p-2 border rounded-md"
                  placeholder="Qualifications you have"
                  defaultValue={profileData.education}
                  onChange={(e) => setEducation(e.target.value.trim())}
                  required
                />
              </div>
              <div className="mb-4">

                <label htmlFor="availability" className="text-gray-800 font-semibold">Chat Availability</label>

                <h1 htmlFor="fromTime">From</h1>
                <input
                  type="time"
                  id="fromTime"
                  className="w-full p-2 border rounded-md"
                  placeholder="From time"
                  defaultValue={profileData.fromTime}
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
                  defaultValue={profileData.toTime}
                  required
                  onChange={(e) => setToTime(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="text-white font-semibold">
                  Profile Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*" // Allow only image files
                  onChange={handleImageChange}
                />
                {image && image instanceof File ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Profile Image"
                    className="w-48 h-48 rounded-full mt-4"
                  />
                ) : (
                  <img
                    src={profileData.image}
                    alt="Profile Image"
                    className="w-48 h-48 rounded-full mt-4"
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="text-white font-semibold">About</label>
                <textarea
                  id="about"
                  rows="4"
                  className="w-full p-2 border rounded-md"
                  placeholder="Tell us about you (max 800 words)"
                  maxLength="800"
                  defaultValue={profileData.about}
                  onChange={(e) => setAbout(e.target.value.trim())}
                  required
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
                    defaultValue={profileData.instaUrl}
                    onChange={(e) => setInstaUrl(e.target.value.trim())}

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
                    defaultValue={profileData.facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value.trim())}

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
                    defaultValue={profileData.linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value.trim())}

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
    </div>
  );
}

export default developerEditProfile;
