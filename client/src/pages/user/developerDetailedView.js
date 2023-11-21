import React, { useEffect, useState } from 'react';
import { serverVariables } from '../../util/serverVariables';
import { UserHeader } from '../../componets/userComponent/userHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import { apiEndPoints } from '../../util/api';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import toast from 'react-hot-toast';
import { userRequest } from '../../Helper/instance';
import Swal from 'sweetalert2'
const imginsta = require("../../assets/developer/instaicon.png")
const imgfacebook = require("../../assets/developer/facebookicon.jpeg")
const imglinkedin = require("../../assets/developer/linkedinicon.png")
const DetailedView = () => {

  const location = useLocation()
  const devId = location.state

  const navigte = useNavigate()

  const dispatch = useDispatch()
  const [list, setList] = useState([])
  const [followChange, setFollowChnage] = useState()
  const [follow, setFollow] = useState()
  // state to handle comment and ratings
  const [userComment, setUserComment] = useState('')
  const [userRating, setUserRating] = useState(0)
  const [usersCommentAndRate, setUsersCommentAndRate] = useState([])
  const [showAllComments, setShowAllComments] = useState(usersCommentAndRate.map(() => false));
  const [userId, setUserId] = useState('')
  const getData = () => {
    dispatch(showLoading())
    userRequest({
      url: apiEndPoints.getdeveloperView,
      method: 'post',
      data: { idData: devId }
    }).then((response) => {
      dispatch(hideLoading())
      if (response.data.success) {
        setList(response.data.data)
        setFollow(response.data.isFollowingDeveloper)
        setFollowChnage(response.data.data[0].followersCount)
        setUserRating(response.data.starRate)
        setUsersCommentAndRate(response.data.comment)
        setUserId(response.data.userid)

      }


    }).catch((error) => {
      console.log(error)
      dispatch(hideLoading())




    })
  }

  useEffect(() => {
    getData()


  }, [])

  //  to handdle follow
  const handlefollow = async (id) => {
    dispatch(showLoading())


    userRequest({
      url: apiEndPoints.developerFollowersUpdate,
      method: 'post',
      data: { idData: id }


    }).then((response) => {
      dispatch(hideLoading())
      if (response.data.success) {

        toast.success(response.data.message)


        setFollowChnage(response.data.newCount)
        getData()
      }
    }).catch((error) => {
      console.log(error)
      dispatch(hideLoading())
    })

  }

  useEffect(() => {
    getData()
  }, [followChange])


  const handlechatButton = async (Id) => {


    navigte(serverVariables.Chat, { state: Id })

  }




  // to send comment and rating
  const handleCommentAndRating = async () => {

    // no comment No rating

    if (!userComment && userRating === 0) {

      toast.error("please do comment and rating first")

    }
    else if (userRating === 0) {

      toast.error("sorry please do Rating before sumbit")
    }
    // with comment and rating
    else if (userComment && userRating > 0) {
      const result = await Swal.fire({
        title: "Confirmation",
        text:
          "Are you sure you want to submit your comment ? This action cannot be undone, and your comment will be shown to other users.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, submit",
        cancelButtonText: "Cancel",
      });


      if (result.isConfirmed) {
        const data = {
          developerId: devId,
          comment: userComment,
          rating: userRating

        }
        dispatch(showLoading())
        userRequest({
          url: apiEndPoints.postCommentAndRating,
          method: 'post',
          data: data

        }).then((response) => {
          dispatch(hideLoading())
          if (response.data.success) {
            toast.success(response.data.message)
            setUserComment('');

            getData()
          }

        }


        ).catch((error) => {
          console.log(error)

        })
      }
    }

    else if (!userComment && userRating > 0) {
      const result = await Swal.fire({
        title: "Confirmation",
        text:
          "Are you sure you want to submit your rating ?.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, submit",
        cancelButtonText: "Cancel",
      });


      if (result.isConfirmed) {
        const data = {
          developerId: devId,
          rating: userRating,


        }
        dispatch(showLoading())
        userRequest({
          url: apiEndPoints.postCommentAndRating,
          method: 'post',
          data: data

        }).then((response) => {
          dispatch(hideLoading())
          if (response.data.success) {
            toast.success(response.data.message)
            setUserComment('');
            getData()
          }
        }


        ).catch((error) => {
          console.log(error)

        })
      }
    }



  }

  // situation 2 





  // handle rating data
  const handleRatingClick = async (val) => {
    setUserRating(val)

  }



  // Function to generate star icons with exactly 5 stars
  const generateStarRating = (n) => {
    const integerRating = Math.floor(n); // Get the integer part of the rating
    const remainingStars = 5 - integerRating; // Calculate the number of white stars

    const stars = [];

    // Display yellow stars for the integer part of the rating
    for (let i = 1; i <= integerRating; i++) {
      stars.push(<span key={i} className="text-yellow-400 text-xl">★</span>);
    }

    // Display white stars for the remaining stars
    for (let i = 1; i <= remainingStars; i++) {
      stars.push(<span key={`white-${i}`} className="text-red text-xl">★</span>);
    }

    return stars;
  };

  // for induvigal rating
  const induvigalStarRating = (m) => {
    const integerRating = Math.floor(m); // Get the integer part of the rating
    const remainingStars = 5 - integerRating; // Calculate the number of white stars

    const stars = [];

    // Display yellow stars for the integer part of the rating
    for (let i = 1; i <= integerRating; i++) {
      stars.push(<span key={i} className="text-red-400 text-xl">★</span>);
    }

    // Display white stars for the remaining stars
    for (let i = 1; i <= remainingStars; i++) {
      stars.push(<span key={`black-${i}`} className="text-black text-xl">★</span>);
    }

    return stars;
  };

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
      <UserHeader />


      <div className="bg-gray-100 h-screen">
        {/* Top Bar */}


        {/* Main Content */}


        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Div */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Profile Image */}
            <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full">
              <img className="w-32 h-32 mx-auto bg-gray-300 rounded-full object-cover"
                src={list[0]?.image}
              />
            </div>

            {/* Followers */}
            <div className="mt-4 text-center">
              <p className="mt-2">{followChange}</p>
              <button className="bg-black text-white rounded-md px-4 py-2">Followers</button>

            </div>

            {/* Data */}

            <div className="mt-4">
              <table className="w-full">
                <tbody>
                  <tr >
                    <td className="font-semibold pr-4">Name</td>
                    <td>{list[0]?.name}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Age:</td>
                    <td>{list[0]?.age}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Email:</td>
                    <td>{list[0]?.email}</td>
                  </tr>
                  {/* Add more rows with long content */}
                  <tr >
                    <td className="font-semibold pr-4">Education:</td>
                    <td>{list[0]?.education}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Years of Experience:</td>
                    <td>{list[0]?.experience}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Field:</td>
                    <td>{list[0]?.field}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Language to chat:</td>
                    <td>{list[0]?.language}</td>
                  </tr>


                  <tr >
                    <td className="font-semibold pr-4">Intrested Area:</td>
                    <td>{list[0]?.interest}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Web-Type:</td>
                    <td>{list[0]?.webtype}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">Works-done:</td>
                    <td>{list[0]?.workCount}</td>
                  </tr>
                  <h1 className='font-extrabold '>Chat Avilability</h1>
                  <tr >

                    <td className="font-semibold pr-4">From:</td>
                    <td>{list[0]?.fromTime ? convertTo12HourFormat(list[0].fromTime) : ''}</td>
                  </tr>
                  <tr >
                    <td className="font-semibold pr-4">To:</td>
                    <td>{list[0]?.toTime ? convertTo12HourFormat(list[0].toTime) : ''}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
          {/* Right Div */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
            {/* Social Links */}
            <div className="text-black text-center mb-4">
              <h2 className="text-xl font-semibold">Social Links</h2>
            </div>

            {/* LinkedIn */}

            {/* Image */}
            <div className="bg-white p-2 rounded-full mb-3">
              <img src={imginsta} alt="LinkedIn" className="w-6 h-6" />
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
              <img src={imgfacebook} alt="LinkedIn" className="w-6 h-6" />
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
              <img src={imglinkedin} alt="LinkedIn" className="w-6 h-6" />
            </div>

            {/* Description */}
            <div className="bg-white ml-2 rounded w-49 h-6 mb-3">
              <a className="flex items-start space-x-2">
                <p className="text-black">LinkedIn</p>
              </a>
            </div>
            {
              follow === false ?
                (<h1>Follow the developer to connect  with them </h1>) : null
            }

            {follow === false ?

              (<button onClick={() => { setFollow(true); handlefollow(list[0]?.userId) }} className="bg-black text-white rounded-md px-4 py-2 mx-auto mt-4 block">
                Follow
              </button>) :

              <button onClick={() => handlechatButton(list[0]?.userId)} className="bg-black text-white rounded-md px-4 py-2 mx-auto mt-4 block">
                Chat
              </button>
            }
          </div>







        </div>

        {/* about */}
        {/* About Section */}
        <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
          <div className="bg-black w-1/6 text-center rounded">
            <h1 className='font-bold text-white'>About </h1>

          </div>
          <div className="mt-4 ">
            <p>
              {list[0]?.about}
            </p>
          </div>
        </div>



        {
          follow === true ? (<div className='bg-gray-200 mt-4'>
            <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 dark:bg-gray-900 dark:text-gray-100">
              <div className="flex flex-col items-center w-full">
                <h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-center">How was your experience?</span>
                  <div className='flex item-center'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        title={`Rate ${star} stars`}
                        aria-label={`Rate ${star} stars`}
                        onClick={() => handleRatingClick(star)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill={star <= userRating ? 'yellow' : 'currentColor'}
                          className="w-10 h-10 dark:text-yellow-500"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex items-center">
                  <textarea
                    rows="3"
                    placeholder="Comment your opinion about this developer..."
                    className="p-4 ml-4 rounded-md  resize-none dark:text-gray-100 dark:bg-gray-900"
                    value={userComment}
                    onChange={(e) => { setUserComment(e.target.value) }}
                  ></textarea>
                  <button
                    type="button"

                    onClick={() => { handleCommentAndRating() }}
                    className="py-2 my-4 w-1/5 ml-4 h-10 font-semibold rounded-md dark:text-white dark-bg-violet-400 bg-yellow-300 text-center"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>) : null
        }

        {/* Start Rating and Reviews Section */}
        {list[0]?.avgRating ? (<div className="bg-white p-4 mt-4 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold">Start Rating:</h1>
          <div className="flex items-center mt-2">
            {/* Display star ratings (you can customize this) */}
            {generateStarRating(list[0]?.avgRating)}
            <p className="ml-2 font-semibold ml-4">{list[0]?.avgRating}</p>
          </div>


          <h1 className="text-xl font-semibold mt-4">Review:</h1>
          {usersCommentAndRate?.map((data, index) => (
            <div key={index} className="mt-2">

              {/* Example profile entry */}
              <div className="flex items-center mt-4">
                {/* Rounded Profile Image */}
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-4">
                  <img src={data.userImage} alt={data.userName} className="w-10 h-10 rounded-full object-cover" />
                </div>

                {/* Data */}
                <div>
                  <p className="font-semibold">{data?.userName}</p>
                  <p>{data?.userRating}</p>
                </div>

                {/* Star Rating */}
                <div className="text-yellow-400 text-xl ml-auto">
                  {induvigalStarRating(data?.userRating)}
                </div>
              </div>

              {/* Comment */}


              {data?.userComments.slice(0, showAllComments[index] ? data.userComments.length : 1).map((val) => (
                <p className="mt-4">
                  {val.userComment}
                </p>
              ))}
              {showAllComments[index] ? (
                <button
                  onClick={() => {
                    const updatedShowAllComments = [...showAllComments];
                    updatedShowAllComments[index] = false; // Close the comments
                    setShowAllComments(updatedShowAllComments);
                  }}
                  className="text-blue-500 mt-2"
                >
                  Close It
                </button>
              ) : (
                <button
                  onClick={() => {
                    const updatedShowAllComments = [...showAllComments];
                    updatedShowAllComments[index] = true; // Open all comments
                    setShowAllComments(updatedShowAllComments);
                  }}
                  className="text-blue-500 mt-2"
                >
                  Show All Comments By this User
                </button>
              )}

            </div>
          ))}




        </div>) : null}
      </div>

    </div>
  );
};

export default DetailedView;





