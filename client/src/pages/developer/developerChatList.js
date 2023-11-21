import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverVariables } from '../../util/serverVariables';
import { apiEndPoints } from '../../util/api';
import { developerRequest } from '../../Helper/instance';
import { DeveloperHeader } from '../../componets/developerComponent/developerHeader';

export default function developerChatList() {

  const navigate = useNavigate();

  const [chatList, seChatList] = useState([])
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([]);
  const getList = async () => {

    developerRequest({
      url: apiEndPoints.getUserChatList,
      method: "get",

    }).then((response) => {

      if (response.data.success) {
        seChatList(response.data.Data)
        setFilteredData(response.data.Data); // Set filtered data initially
      }
    }).catch((error) => {
      console.log(error)
    })

  }

  useEffect(() => {

    getList()
  }, [])
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    if (searchTerm === '') {
      setFilteredData(chatList)
    }
    else {
      // Update searchplus state here
      const filteredResults = chatList?.filter((item) =>
        item.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredResults);
    }

  };

  const handleClick = (userId, developerId) => {

    const Data = {
      userId: userId,
      developerId: developerId
    }
    navigate(serverVariables.DeveloperChat, { state: Data })

  };





  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Top Section */}
      {/* Full-width header */}

      <DeveloperHeader />

      {/* Search bar on the right side */}


      <div className="flex flex-grow">
        {/* Left Quarter of the Screen */}
        {filteredData?.length > 0 && (
          <div className="bg-yellow-100 w-full sm:w-1/4 p-4 overflow-y-auto">
            <div className="bg-blue-500 text-white px-4 py-2 rounded">

              <div className="text-center">Your chatList</div>
            </div>
            <div>
              {filteredData?.map((list) => (
                <div
                  key={list?._id}
                  onClick={() => handleClick(list?.userId, list?.developerId)}
                  className="flex items-center mb-4 mt-3 ml-2"
                >
                  <div className="w-12 h-12 bg-gray-500 rounded-full overflow-hidden mb-2 sm:mb-0 sm:mr-4">
                    <img src={list?.userImage} alt={list.userName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-lg font-semibold mt-2 sm:mt-0 sm:ml-2">{list?.userName}</div>
                    <button className="font-semibold text-white px-2 py-1 rounded-md mt-2"></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Right Three Quarters of the Screen */}

        {filteredData?.length > 0 ? (
          <div className="w-full p-4 flex flex-col bg-grey-50">
            <div className="flex items-center justify-end mb-4 sm:mb-0">
              <input
                value={search}
                type="text"
                onChange={handleSearch}
                placeholder="Search with Name"
                className="border border-black rounded-md px-2 py-1 text-black mr-2 mt-1 w-full sm:w-auto"
              />
            </div>

            <div className="text-lg font-extrabold text-color-red-500 text-center mt-4 sm:mt-0">
              Your Chat list
            </div>
          </div>
        ) : (
          <div className="w-full p-4 flex flex-col">

            <div className="flex items-center justify-between">
              <input
                value={search}
                type="text"
                onChange={handleSearch}
                placeholder="Search with Name"
                className="border border-black rounded-md px-2 py-1 text-black ml-auto" // Add ml-auto class
              />
            </div>
            <div className="text-lg font-bold text-center text-red-500 mt-4 sm:mt-0">No connections</div>
          </div>
        )}
      </div>
    </div>
  );
}
