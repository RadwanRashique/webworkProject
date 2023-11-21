import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../componets/adminComponent/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { serverVariables } from '../../util/serverVariables';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { adminRequest } from '../../Helper/instance';
import { apiEndPoints } from '../../util/api';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
// import '../../styles/global.css';

function DeveloperRequests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // Declare totalPages state
  const itemsPerPage = 3;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    dispatch(showLoading());

    adminRequest({
      url: apiEndPoints.developerRequestData,
      method: 'get',
    })
      .then((response) => {
        dispatch(hideLoading());
        if (response.data.success) {
          setData(response.data.developerData);
          setFilteredData(response.data.developerData);
          setTotalPages(Math.ceil(response.data.developerData.length / itemsPerPage));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(hideLoading());
        // toast.error("something went wrong");
      });
  }

  const handleDetailedView = (ids) => {
    navigate(serverVariables.DeveloperView, { state: ids });
  }

  const handleApproval = (id, status) => {
    Swal.fire({
      title: `${status === 'Approved' ? 'Approve' : 'Reject'} Confirmation`,
      text: `Are you sure you want to ${status === 'Approved' ? 'Approve' : 'Reject'} this request?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(showLoading());

        adminRequest({
          url: apiEndPoints.developerRequestAction,
          method: 'post',
          data: { id: id, status: status },
        })
          .then((response) => {
            dispatch(hideLoading());
            if (response.data.success) {
              toast.success(response.data.message);
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
            dispatch(hideLoading());
            // toast.error("something went wrong");
          });
      }
    });
  };

  const handleChange = async (val) => {
    setSearchData(val);
    if (val === '') {
      setFilteredData(data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
    } else {
      const serRes = data.filter((item) =>
        item.email.toLowerCase().includes(searchData.toLowerCase())
      );
      setFilteredData(serRes);
    }
  }

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredData(data.slice(startIndex, endIndex));
  }, [currentPage, data]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const showScrollbar = window.innerWidth <= 1000;

  const [openState, setOpenState] = useState(false);

  // Function to handle the open state from the AdminNavbar component
  const handleChildData = (childData) => {
    setOpenState(childData);
  };


  
  return (
    <div>
      <AdminNavbar onDataFromChild={handleChildData} />

      <div className='flex flex-col md:flex-row h-screen'>
        <div style={{ zIndex: 2, position: 'absolute' }}></div>
        <div className='flex-grow pl-4 md:pl-11 ml-4 md:ml-11'>
          <div className='container mx-auto mt-4'>
            <div className='flex flex-col md:flex-row'>
              <div className='flex-1 md:w-1/2'>
                <h1 className='text-2xl font-semibold mb-4'>Request from Developer</h1>
              </div>
              <div className='flex-1 md:w-1/2 mt-4 md:mt-0'>
                <div className='flex'>
                  <div className={`flex-1 ${windowWidth < 700 ? 'w-1/5' : ''}`}>

                    <input
                      type='text'
                      placeholder='Search with Email'
                      className='border border-gray-900 font-bold rounded-md px-2 py-1 text-black w-full md:w-auto'
                      onChange={(e) => {
                        handleChange(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='admin-content mt-4 mr-16' style={{ overflowX: showScrollbar ? 'auto' : 'hidden' }}>
              <table className='min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden '>

                {filteredData?.length > 0 && (
                  <thead>
                    <tr className='bg-white'>
                      <th className='px-6 py-3 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider'>
                        No
                      </th>
                      <th className='px-6 py-3 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider'>
                        Name
                      </th>
                      <th className='px-6 py-3 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider'>
                        Email
                      </th>
                      <th className='px-6 py-3 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider'>
                        View
                      </th>
                      <th className='px-6 py-3 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-6 py-3 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider'>
                        Action
                      </th>
                    </tr>
                  </thead>
                )}

                <tbody>
                {filteredData
    ?.sort((a, b) => {
      // Sort by status, placing "formsubmitted" items on top
      if (a.status === 'formsubmitted' && b.status !== 'formsubmitted') {
        return -1;
      } else if (a.status !== 'formsubmitted' && b.status === 'formsubmitted') {
        return 1;
      } else {
        return 0;
      }
    })?.map((item, index) => (
                    <tr key={item?._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                      <td className='px-6 py-4 whitespace-no-wrap text-sm leading-5 font-bold text-gray-900'>
                        {index + 1}
                      </td>
                      <td className='px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500'>
                        {item?.name}
                      </td>
                      <td className='px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500'>
                        {item?.email}
                      </td>
                      <td className='border px-4 py-2'>
                        <button
                          className='bg-green-600 text-white px-2 py-1 rounded-full w-32 h-8'
                          onClick={() => {
                            handleDetailedView(item?._id);
                          }}
                        >
                          View
                        </button>
                      </td>
                      <td className='px-6 py-4 whitespace-no-wrap text-sm leading-5 font-semibold'>
                        {item?.status}
                      </td>
                      <td className='px-6 py-4 whitespace-no-wrap text-sm leading-5'>
                        {item?.email ? (
                          item?.status === 'Approved' || item?.status === 'Rejected' ? (
                            'N/A'
                          ) : (
                            <>
                              <button
                                className='text-blue-600 hover-text-blue-900'
                                onClick={() => handleApproval(item?._id, 'Approved')}
                              >
                                Approve
                              </button>{' '}
                              /{' '}
                              <button
                                className='text-red-600 hover-text-red-900'
                                onClick={() => handleApproval(item?._id, 'Rejected')}
                              >
                                Reject
                              </button>
                            </>
                          )
                        ) : (
                          'N/A'
                        )}
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
            {filteredData?.length == 0 && (
              <div className='text-red-500 font-extrabold flex justify-center mt-4'>
                <h1 className='text-4xl'>NO Result</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperRequests;
