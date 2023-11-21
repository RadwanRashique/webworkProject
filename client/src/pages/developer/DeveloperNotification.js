import React, { useState, useEffect } from 'react';

import { apiEndPoints } from '../../util/api';
import { developerRequest } from '../../Helper/instance';
import toast from 'react-hot-toast'
import { DeveloperHeader } from '../../componets/developerComponent/developerHeader';
const developerNotification = () => {
  const [data, setData] = useState([])


  // to check notification
  const checkNotification = async () => {
    developerRequest({
      url: apiEndPoints.checkNotifications,
      method: 'get'
    }).then((response) => {
      if (response.data.success) {

        setData(response.data.data)
      }
    }).catch((error) => {
      console.log(error)
    })


  }

  useEffect(() => {

    checkNotification()
  }, [])

  //  socket control



  // to clear notification message
  const clearMessge = async (Id) => {

    const notificationId = Id

    developerRequest({

      url: apiEndPoints.clearNotification,
      method: 'delete',
      data: { Id: notificationId }
    }).then((response) => {
      if (response.data.success) {
        checkNotification()
        toast.message(response.data.message)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${year}-${month}-${day} ${formattedHours}:${formattedMinutes}${ampm}`;
  };
  // to clear all listed notifications
  const clearAllNotifications = async () => {

    developerRequest(
      {
        url: apiEndPoints.clearAllNotification,
        method: 'delete'
      }
    ).then((response) => {
      if (response.data.success) {
        checkNotification()
        toast.success(response.data.message)
      }
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <div>
      <DeveloperHeader />
      <div className="bg-white min-h-screen">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center ">
            <h1 className="text-4xl font-extrabold text-red-500">Notification Panel</h1>
            <div className="clear-all-button">
              {data.length > 1 && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full"
                  onClick={() => clearAllNotifications()}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
          <div className="space-y-4 ">
            {data?.length > 0 ? (
              data?.map((item) => (
                <div key={item?._id} className="bg-white p-4 w-full rounded-lg shadow-md flex items-center justify-between space-x-4">
                  <div className='flex-grow'>
                    <p className="text-gray-800 font-extrabold">{item?.notificationMessage}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-800 mr-4 font-bold">{formatTime(item?.date)}</p>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-full"
                      onClick={() => clearMessge(item?._id)}
                    >
                      clear
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-800 font-extrabold">No notifications</div>
            )}



          </div>
        </div>
      </div>
    </div>
  );
};

export default developerNotification;
