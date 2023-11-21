import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverVariables } from '../../util/serverVariables';
import { apiEndPoints } from '../../util/api';
import { userRequest } from '../../Helper/instance';
import { UserHeader } from '../../componets/userComponent/userHeader';

const ChatList = () => {
  const navigate = useNavigate();

  const [chatList, seChatList] = useState([])
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([]);

  const getList = async () => {

    userRequest({
      url: apiEndPoints.getChatList,
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
        item.developerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredResults);
    }

  };

  const handleClick = (developerId) => {
    navigate(serverVariables.Chat, { state: developerId })

  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Top Section */}

      <UserHeader />
      <div className="flex justify-end mt-2 mr-2">
        <input
          value={search}
          type="text"
          onChange={handleSearch}
          placeholder="Search with Name"
          className="border border-gray-300 rounded-md px-2 py-1 mr-2 text-black "
        />

      </div>


      <div className="flex flex-grow">
        {/* Left Quarter of the Screen */}
        {filteredData?.length > 0 && (
          <div className="bg-gray-300 w-1/4 p-4 overflow-y-auto bg-yellow-100">
            <div className="bg-blue-500 text-white px-4 py-2 rounded">
              <div className="text-center">Your chatList</div>
            </div>
            <div >
              {filteredData?.map((list) => (
                <div
                  key={list?._id}
                  onClick={() => handleClick(list?.developerId)}
                  className="flex items-center mb-4 mt-3 ml-2"
                >
                  <div className="w-12 h-12 bg-gray-500 rounded-full overflow-hidden mr-4">
                    <img
                      src={list?.developerImage}
                      alt={list.developerName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-lg font-semibold mt-6">{list?.developerName}</div>
                    <button className="font-semibold text-white px-2 py-1 rounded-md mt-2">

                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Right Three Quarters of the Screen */}
        {filteredData?.length > 0 ? (
          <div className="w-3/4 p-4 flex items-center justify-center">
            <div className="text-xl font-extrabold text-color-red-500">
              ChatList
            </div>
          </div>
        ) : (
          <div className="w-full p-4 flex items-center justify-center">
            <div className="text-xl font-bold text-center ">
              No connections
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
