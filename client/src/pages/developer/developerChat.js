import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { apiEndPoints } from '../../util/api';
import { useLocation } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns'
import { userRequest } from '../../Helper/instance'
import socket from '../../componets/SocketIo';
import lottie from 'lottie-web'
import chatAnimationData from '../../assets/animations/chat.json'
export default function developerChat() {
  const location = useLocation()
  const Mydata = location.state
  const userId = Mydata.userId
  const devId = Mydata.developerId


  // animation
  const lottieContainer = useRef(null);
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieContainer.current, // Reference to the container element
      animationData: chatAnimationData, // Your animation JSON data
      loop: true, // Set to true if you want the animation to loop
      autoplay: true, // Set to true if you want the animation to play immediately
    });

    // Optionally, you can control the animation using the `animation` object:
    // animation.play(); // Play the animation
    // animation.pause(); // Pause the animation
    // animation.stop(); // Stop the animation
    animation.setSpeed(1); // Adjust the animation speed

    // Clean up the animation when the component unmounts
    return () => {
      animation.destroy();
    };
  }, []);




  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatPartner, setChatPartner] = useState([]); // Replace with actual data
  const [roomId, setRoomid] = useState("")
  const [msg, setMsg] = useState([])


  const chatVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };




  const fetchChatMessages = async (userId, devId) => {



    const Data = {
      devId: devId,
      UserId: userId
    }

    userRequest({
      url: apiEndPoints.Room,
      method: 'post',
      data: Data
    }).then((response) => {
      if (response.data.success) {
        socket.emit("setup", response.data.developerId)

        socket.emit("join", response.data.room_id)

        setRoomid(response.data.room_id)
        setChatPartner(response.data.Data)
        setChatHistory(response.data.mes)
        setNewMessage('');
      }
    })

  }
  // useEffectt



  useEffect(() => {
    fetchChatMessages(userId, devId);
  }, [msg])

  useEffect(() => {

    socket.on("message recieved", (message) => {
      setMsg(message)

      setChatHistory([...chatHistory, message])
    })

  }, [msg]);

  // send new messages to push to history 
  const sendChatMessage = async (room_id, userId, DID) => {
    const Data = {
      newMessage: newMessage,
      rid: room_id,
      userId: userId,
      devid: DID,
      time: new Date(),

    }
    if (newMessage.trim() === '') {
      return;
    }
    else {
      userRequest({
        url: apiEndPoints.developerNewMessage,
        method: 'post',
        data: Data
      }).then((response) => {
        if (response.data.success) {
          var obj = response.data.data
          if (!obj.senderId) {
            obj.senderId = devId
          }

          socket.emit("chatMessage", obj)
          setChatHistory([...chatHistory, response.data.data])
          setNewMessage('');
          setRoomid(response.data.data.room_id)

        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
  const chatContainerRef = useRef(null);
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatHistory]);

  return (


    <div className="h-screen">
      <div className="fixed h-screen overflow-hidden"></div>

      <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col">
        {/* Chat Header */}
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 w-full">
          <div className="relative flex items-center space-x-4 w-full">
            <div className="relative">

              <img
                src={chatPartner?.userImage}
                alt={chatPartner?.userName}
                className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-700 mr-3">{chatPartner?.userName}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Chat Messages */}
        <div className="flex-grow w-full overflow-y-auto h-screen   " ref={chatContainerRef}>
          {chatHistory?.map((message) => {
            const isUserMessage = message.senderId === message.developerId;
            const timeAgo = formatDistanceToNow(new Date(message.time), {
              addSuffix: true,
            });

            return (
              <div
                key={message._id}
                className={`chat-message w-full flex justify-${isUserMessage ? 'end' : 'start'} mb-4`}
              >


                <div className={`flex flex-col w-full space-y-2 text-xs max-w-md mx-2 items-${isUserMessage ? 'end' : 'start'}`}>

                  <div>
                    <span className={`px-4 py-2 my-4 rounded-lg inline-block rounded-${isUserMessage ? 'tr' : 'tl'}-none ${isUserMessage ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                      {message.message}
                    </span>
                  </div>
                  <p className={`text-xs text-${isUserMessage ? 'right' : 'left'} text-gray-500 mt-1`}>
                    {timeAgo}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: '30%', height: '30px', zIndex: 10 }}>
            <div ref={lottieContainer}></div>
          </div>

        </div>


        {/* Message Input */}
        <div className="border-t-2 w-full border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <span className="absolute inset-y-0 flex items-center"></span>
            <input
              value={newMessage}
              type="text"
              onChange={(e) => { setNewMessage(e.target.value) }}
              placeholder="Type your message..."
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0 flex">
              <button
                type="button"
                onClick={() => { sendChatMessage(chatPartner?._id, chatPartner?.userId, chatPartner?.developerId) }}
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-400 hover:bg-blue-400 focus:outline-none"
              >
                <span style={{ color: 'blue' }} className="font-bold">
                  Send
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="blue"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
    </div>





  )
}






