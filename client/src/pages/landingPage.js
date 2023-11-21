import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { serverVariables } from '../util/serverVariables';
import axios from 'axios';

const LandingPage = () => {
  const [bannerData, setBannerData] = useState([])

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData.length]);

  const getData = async () => {
    try {

      const response = await axios.get('/api/user/')
      if (response.data.success) {

        setBannerData(response.data.data)

      }
      else {

      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    getData()

  }, [])
  return (
    <div className='h-full bg-blue-900'>
      {/* First Half (50% height with background color) */}
      <div className="bg-blue-900 h-1/2 flex flex-col justify-center items-center p-5">
        <img
          className="cursor-pointer dark:bg-white p-1 rounded-full"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg1.svg"
          alt="circle"
        />
        <div className="text-white text-center">
          <h1 className="text-5xl font-semibold mb-4">Welcome to WebWork</h1>
          <h2 className="text-5xl font-semibold mb-4">
            The complete solution for your webwork
          </h2>
          <p className="text-lg mb-8">
            Connect with top talent or Find your web development work.
          </p>
          <div className="space-x-4">
            <Link to={serverVariables.Register}>
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 mb-2 ml-2 rounded-lg text-lg">
                Register as a User
              </button>
            </Link>
            <Link to={serverVariables.DeveloperRegister}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 mb-2 rounded-lg text-lg">
                Register as a Developer
              </button>
            </Link>
          </div>

        </div>

      </div>

      {/* Second Half (50% height with banners) */}



      {bannerData.map((banner, index) => (


        banner?.list == true ? (
          <div className="relative bg-white " key={index} style={{ display: index === currentBannerIndex ? 'block' : 'none' }}>

            <img
              src={banner?.image}
              className="w-full max-h-96"
              alt={`bannerData ${index}`}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-center text-2xl  font-serif  font-bold leading-9 text-black lg:text-4xl md:text-2xl mt-8 px-2">
                {(banner?.title).toUpperCase()}
              </h1>
              <p className="text-base text-lg font-sans font-bold leading-none text-red-500 text-black px-2 py-2  mt-3">
                {banner?.description}
              </p>

            </div>
          </div>

        ) : null
      ))}





    </div>
  );
};

export default LandingPage;
