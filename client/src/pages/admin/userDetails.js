import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../componets/adminComponent/AdminNavbar';
import { apiEndPoints } from '../../util/api';
import { adminRequest } from '../../Helper/instance';
import { toast } from 'react-hot-toast'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import Swal from 'sweetalert2'
function Dashboard() {
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // Declare totalPages state
  const itemsPerPage = 2;

  // to list data
  const getUserData = async () => {
        dispatch(showLoading())

        adminRequest({
      url:apiEndPoints.getuserdetails,
      method:'get',

    }).then((response)=>{
         dispatch(hideLoading())
         if (response.data.success) {

        setUserDetails(response.data.userData)
        setFilteredData(response.data.userData)
        // Calculate and set totalPages
        setTotalPages(Math.ceil(response.data.userData.length / itemsPerPage));

      }
    }).catch((error)=>{
              dispatch(hideLoading())
        console.log(error, "at userDetails")
  
        toast.error("Something went wrong")
    })

  }

  useEffect(() => {
    getUserData()

  }, [])

  useEffect(() => {


  }, [userDetails])



  // to deal block
  const blockUser = async (id) => {
    const isBlocked = userDetails.find((user) => user._id === id)?.isBlocked;

    const result = await Swal.fire({
      title: isBlocked ? 'Unblock Confirmation' : 'Block Confirmation',
      text: isBlocked
        ? 'Are you sure you want to Unblock this User?'
        : 'Are you sure you want to Block this User?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: isBlocked ? 'Unblock' : 'Block',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
     
      dispatch(showLoading());
      adminRequest({
        url:apiEndPoints.blockuser,
        method:'post',
        data:{ id: id },
  
  
      }).then((response)=>{
        dispatch(hideLoading());
          if (response.data.success) {
            toast.success(response.data.message)
            getUserData()
          }
        
      }).catch((error)=>{
                  dispatch(hideLoading());
         toast.error('Something went wrong');
      })
    }
  };
  // to handle serach

  const handleSearch = (val) => {
    setSearchInput(val)
    if (val === '') {
      setFilteredData(userDetails.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));

    }
    else {
      const res = userDetails.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      )

      setFilteredData(res)

    }


  }
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredData(userDetails.slice(startIndex, endIndex));
  }, [currentPage, userDetails]);


  const [openState, setOpenState] = useState(false);

  // Function to handle the open state from the AdminNavbar component
  const handleChildData = (childData) => {
    setOpenState(childData);
  };

  return (

    <div>
      <AdminNavbar onDataFromChild={handleChildData} />
      <div className="flex flex-col md:flex-row p-4 md:p-8">

        <div className="flex-grow md:w-1/2">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-0">User Details</h1>
            <input
              type="text"
              placeholder="Search with name"
              className="border border-gray-900 rounded-md px-2 py-1 text-black mb-4 md:mb-0"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto   border-collapse">
              {filteredData.length > 0 && (
                <thead>
                  <tr>
                    <th className="px-2 md:px-4 py-2">No</th>
                    <th className="px-2 md:px-4 py-2">User Id</th>
                    <th className="px-2 md:px-4 py-2">Name</th>
                    <th className="px-2 md:px-4 py-2">Phone</th>
                    <th className="px-2 md:px-4 py-2">Age</th>
                    <th className="px-2 md:px-4 py-2">Email</th>
                    <th className="px-2 md:px-4 py-2">Block</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {filteredData.map((items, index) => (
                  <tr
                    key={items._id}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="border px-2 md:px-4 py-2">{index + 1}</td>
                    <td className="border px-2 md:px-4 py-2">{items?._id}</td>
                    <td className="border px-2 md:px-4 py-2">{items?.name}</td>
                    <td className="border px-2 md:px-4 py-2">{items?.phone}</td>
                    <td className="border px-2 md:px-4 py-2">{items?.age}</td>
                    <td className="border px-2 md:px-4 py-2">{items?.email}</td>
                    <td className="border px-2 md:px-4 py-2">
                      <button
                        className={`${items.isBlocked ? 'bg-green-500' : 'bg-red-500'
                          } text-white px-2 py-1 rounded-full w-20 md:w-24 h-8 md:h-10`}
                        onClick={() => {
                          blockUser(items._id);
                        }}
                      >
                        {items.isBlocked ? 'Blocked' : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {openState === false && totalPages > 1 && (
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              pageCount={totalPages}
              onPageChange={handlePageChange}
              containerClassName={`flex justify-center mt-6 space-x-2 fixed inset-x-0 bottom-16 ${window.innerWidth < 700 ? 'md:justify-center' : ''
                }`}
              pageClassName={'px-2 py-1 bg-blue-500 text-white rounded-full cursor-pointer'}
              activeClassName={'bg-blue-700'}
              previousClassName={'px-2 py-1 bg-gray-300 text-gray-600 rounded-full cursor-pointer'}
              nextClassName={'px-2 py-1 bg-gray-300 text-gray-600 rounded-full cursor-pointer'}
              disabledClassName={'px-2 py-1 bg-gray-200 text-gray-400 rounded-full cursor-not-allowed'}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
            />
          )}

          {filteredData.length === 0 && (
            <div className="flex justify-center font-extrabold text-red-500 mt-4">
              <h1 className="text-4xl">NO Result</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
