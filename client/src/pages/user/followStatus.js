import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverVariables } from '../../util/serverVariables';
import { apiEndPoints } from '../../util/api';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { userRequest } from '../../Helper/instance';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { UserHeader } from '../../componets/userComponent/userHeader';

function FollowingStatus() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([]);


  const getData = () => {

    dispatch(showLoading())
    userRequest({
      url: apiEndPoints.getfollowingData,
      method: 'get',

    }).then((response) => {
      dispatch(hideLoading())

      if (response.data.success) {
        toast.success(response.data.message)
        setData(response.data.followedDevloper)
        setFilteredData(response.data.followedDevloper); // Set filtered data initially

      }

    }).catch((error) => {
      dispatch(hideLoading())
      console.log(error)
      toast.error("some issue in fetching data")
    })



  }
  useEffect(() => {

    getData()
  }, [])

  // to  handleClick
  const handleClick = (id) => {

    navigate(serverVariables.DeveloperDetailedView, { state: id })

  }
  // handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    if (searchTerm === '') {
      setFilteredData(data)
    }
    else {
      // Update searchplus state here
      const filteredResults = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredResults);
    }

  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Top Section */}

      <UserHeader />
      <div className="flex items-center ml-4 pb-2 pt-2">
        <input
          type="text"
          placeholder="Search with Name"
          className="border border-gray-300 rounded-md px-2 py-1 mr-2 text-black"
          value={search}

          onChange={handleSearch}
        />


      </div>

      <div className="flex flex-grow">
        {/* Left Quarter of the Screen */}
        {data?.length > 0 ? (
          <div className="bg-gray-300 w-1/4 p-4 overflow-y-auto">
            <div className="bg-blue-500 text-white px-4 py-2 rounded overflow-y-auto ">
              <div className="text-center"> Developers you follow</div>
            </div>
            <div>

              {filteredData?.map((list) => (
                <div key={list?._id} onClick={() => handleClick(list?.userId)} className="flex items-center mb-4 mt-3 ml-2" >
                  <div className="w-12 h-12 bg-gray-500 rounded-full overflow-hidden mr-4">
                    <img
                      src={list?.image}
                      alt={list?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-lg font-semibold">{list?.name}</div>
                    <button
                      className={

                        'bg-blue-500 text-white px-2 py-1 rounded-md mt-2'

                      }
                    >
                      Following
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>) : null
        }
        {/* Right Three Quarters of the Screen */}
        {data?.length > 0 ? (
          <div className="w-3/4 p-4 flex items-center justify-center">
            <div className="text-xl font-semibold text-color-red-500 ">
              Follow more developers and connect with them
            </div>
          </div>) :
          <div className="w-3/4 p-4 flex items-center justify-center">
            <div className="text-xl font-bold text-center  ml-72 ">
              You did't followed any one yet
            </div>
          </div>

        }
      </div>

    </div>
  );
}

export default FollowingStatus;
