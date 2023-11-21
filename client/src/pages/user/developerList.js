import React, { useEffect, useState,useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { serverVariables } from '../../util/serverVariables';
import { apiEndPoints } from "../../util/api";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../../Helper/instance';
import { UserHeader } from '../../componets/userComponent/userHeader'
import lottie from 'lottie-web'

import AnimaData from '../../assets/animations/userdeveloperListAnima.json'
export default function Example() {
 const navigate = useNavigate()
  
  // animation
  const lottieContainer = useRef(null);
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieContainer.current, // Reference to the container element
      animationData: AnimaData, // Your animation JSON data
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
  


  const [list, setList] = useState([]); // Moved list state here
  const [searchInput, setSearchInput] = useState('')
  const cardsPerPage = 4;
const pageCount = Math.ceil(list.length / cardsPerPage);

  // for filter
  const [selectedField, setSelectedField] = useState('')

  // ... (existing code)

  // Separate function to filter data by name


  const getData = () => {
   
    userRequest({
      url: apiEndPoints.getdeveloperdataList,
      method: 'get',

    }).then((response) => {
   
      if (response.data.success) {
        toast.success(response.data.message)
        setList(response.data.data)
   
      }

    }).catch((error) => {
      console.log(error)
      toast.error("something went wrong")
    })



  }
  useEffect(() => {
    getData()
  }, [])



  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const filteredCards = list.filter((card) => (
    (selectedField === '' || card.field === selectedField) &&
    card.name.toLowerCase().includes(searchInput.toLowerCase()))
  );



  const offset = currentPage * cardsPerPage;
  const currentCards = filteredCards.slice(offset, offset + cardsPerPage);
  const secondRowCards = filteredCards.slice(offset + cardsPerPage, offset + cardsPerPage * 2);


  // to handle image click
  const handleImageClick = (id) => {

    navigate(serverVariables.DeveloperDetailedView, { state: id })

}

  return (
    <div className="bg-white">
      <UserHeader />

      <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: '25%', height: '10px', zIndex: 10 }}>
    <div ref={lottieContainer}></div>
  </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* filter */}
        <div className=" flex justify-end">
          <div className="w-1/4 mt-4">
            <select
              value={selectedField}
              onChange={(e) => {
                setSelectedField(e.target.value)
              }}

              className="px-4 py-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select Field</option>
              <option value="FrontEnd Developer">FrontEnd Developer</option>
              <option value="BackEnd Developer">BackEnd Developer</option>
              <option value="Mern stack ">Mern stack</option>
              <option value="Mean Developer ">Mean Developer</option>
              <option value="Mevn Developer ">Mevn Developer</option>
              <option value="Full stack Developer ">Full stack Developer</option>
              <option value="Web Developer ">Web Developer</option>
              <option value="App Developer ">App Developer</option>
              <option value="Pyton Developer ">Pyton Developer</option>
              <option value="other">other</option>

              {/* Add more field filter options as needed */}
            </select>
          </div>
        </div>
      
        {/* Search and Sort Controls */}
        <div className="flex justify-between mt-2">
          <div className="w-1/3 ">
            <input
              type="text"
              placeholder="Search By Name "

              onChange={(e) => { setSearchInput(e.target.value) }}
              className="px-4 py-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>


       
        </div>




        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {currentCards.map((card) => (
            <div key={card?._id} className="group relative">
              {/* Card content */}
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">

                <img onClick={() => handleImageClick(card?.userId)}
                  src={card?.image}
                  alt={card?.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{card?.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{card?.field}</p>
                </div>
                <p className="text-sm font-medium text-gray-900"></p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {secondRowCards.map((card) => (
            <div key={card._id} className="group relative">
              {/* Card content */}
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  onClick={() => handleImageClick(card?.userId)}
                  src={card?.image}
                  alt={card?.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{card?.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{card?.field}</p>
                </div>
                <p className="text-sm font-medium text-gray-900"></p>
              </div>
            </div>
          ))}
        </div>
{filteredCards.length > 0 &&
       ( <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={'flex justify-center mt-6 space-x-2'}
          pageClassName={'px-2 py-1 bg-blue-500 text-white rounded-full cursor-pointer'}
          activeClassName={'bg-blue-700'}
          previousClassName={'px-2 py-1 bg-gray-300 text-gray-600 rounded-full cursor-pointer'}
          nextClassName={'px-2 py-1 bg-gray-300 text-gray-600 rounded-full cursor-pointer'}
          disabledClassName={'px-2 py-1 bg-gray-200 text-gray-400 rounded-full cursor-not-allowed'}
        />
        ) 
        
}
{
  filteredCards.length==0 &&(
    <div className="text-center mt-6 text-red-500">
    <p className="text-4xl font-bold">Not Found</p>
  </div>
  )
}
      </div>
    </div>
  );
}
