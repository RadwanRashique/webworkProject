import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../componets/adminComponent/AdminNavbar';

import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { adminRequest } from '../../Helper/instance';
import { apiEndPoints } from '../../util/api';
import ReactPaginate from 'react-paginate';
function SubscriptionPlan() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Adjust the number of items per page as needed
  const dispatch = useDispatch()

  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [ExpireStartDate, setExpireStartDate] = useState('')
  const [ExpireEndDate, setExpireEndDate] = useState('')



  const getData = () => {

    dispatch(showLoading())


    adminRequest({
      url: apiEndPoints.getDeveloperSubscriptionDetails,
      method: 'get',

    }).then((response) => {
      dispatch(hideLoading())
      if (response.data.success) {

        setData(response.data.data);
        toast.success(response.data.message)


      }


    }).catch((error) => {
      console.log(error)
      dispatch(hideLoading())

      // toast.error("something went wrong")


    })
  }
  const handleClearFilter = () => {
    setStartDate('');
    setEndDate('');
    setExpireStartDate('');
    setExpireEndDate('');

    getData()


  }

  useEffect(() => {

    getData()
  }, []);

  // to do date filter
  // Function to filter data based on subscription start date range and expiration date range
  const filteredData = data.filter((subscription) => {
    const subscriptionDate = new Date(subscription.date);
    const expireDate = new Date(subscription.expireDate);
    const startFilterDate = startDate ? new Date(startDate) : null;
    const endFilterDate = endDate ? new Date(endDate) : null;
    const expireStartFilterDate = ExpireStartDate ? new Date(ExpireStartDate) : null;
    const expireEndFilterDate = ExpireEndDate ? new Date(ExpireEndDate) : null;

    // Check if a date filter is applied for subscription start date
    const startDateFilter =
      (!startFilterDate || subscriptionDate >= startFilterDate) &&
      (!endFilterDate || subscriptionDate <= endFilterDate);

    // Check if a date filter is applied for expiration date
    const expireDateFilter =
      (!expireStartFilterDate || expireDate >= expireStartFilterDate) &&
      (!expireEndFilterDate || expireDate <= expireEndFilterDate);

    // Combine the two filters (AND condition), return data only if both filters match
    return startDateFilter && expireDateFilter;
  });

  const paginatedData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // to format date
  function formatDate(dateString) {
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  }
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };




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
          <h1 className='text-2xl font-semibold mb-4'>Subscription Details</h1>


          {openState === false && (
            <div className='flex flex-col sm:flex-row mb-4'>
              <div className='flex-1 mb-2 sm:mb-0 sm:mr-2'>
                <h3 className='font-extrabold mb-2'>Started On</h3>
                <div className='flex items-center space-x-4'>
                  <div className="relative">
                    <label className="bg-white px-2">From:</label>
                    <input
                      type="date"
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-white p-2 rounded border"
                    />
                  </div>
                  <div className="relative ml-4">
                    <label className="bg-white mr-2">To:</label>
                    <input
                      type="date"
                      min={startDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-white p-2 rounded border"
                    />
                  </div>
                </div>
              </div>

              <div className='flex-1'>
                <h3 className='font-extrabold mb-2'>Expire On</h3>

                <div className='flex items-center space-x-4'>

                  <div className="relative">
                    <label className="bg-white px-2">From:</label>
                    <input
                      type="date"
                      onChange={(e) => setExpireStartDate(e.target.value)}
                      className="bg-white p-2 rounded border"
                    />
                  </div>

                  <div className="relative ml-4">
                    <label className="bg-white mr-2">To:</label>
                    <input
                      type="date"
                      min={ExpireStartDate}
                      onChange={(e) => setExpireEndDate(e.target.value)}
                      className="bg-white p-2 rounded border"
                    />
                  </div>

                </div>

              </div>

            </div>)}





          {filteredData.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full table-auto   border-collapse">
                  <thead>
                    <tr className='bg-gray-200'>
                      <th className='px-4 md:px-4 py-2'>No</th>
                      <th className='px-4 md:px-4 py-2'>Name</th>
                      <th className='px-4 md:px-4 py-2'>Plan</th>
                      <th className='px-4 md:px-4 py-2'>Email</th>
                      <th className='px-4 md:px-4 py-2'>Amount</th>
                      <th className='px-4 md:px-4 py-2'>Started On</th>
                      <th className='px-4 md:px-4 py-2'>Expire In</th>
                      <th className='px-4 md:px-4 py-2'>Subscription ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((subscription, index) => (
                      <tr
                        key={subscription.id}
                        className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                      >
                        <td className='border px-4 md:px-4  py-2'>{index + 1}</td>
                        <td className='border px-4 md:px-4 py-2'>{subscription.name}</td>
                        <td className='border px-4 md:px-4 py-2'>{subscription.planName}</td>
                        <td className='border px-4 md:px-4 py-2'>{subscription.email}</td>
                        <td className='border px-4 md:px-4 py-2'>₹{subscription.price}</td>
                        <td className='border px-4 md:px-4 py-2'>{formatDate(subscription.date)}</td>
                        <td className='border px-4 md:px-4 py-2'>{formatDate(subscription.expireDate)}</td>
                        <td className='border px-4 md:px-4 py-2'>{subscription._id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {openState === false && <ReactPaginate


                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                onPageChange={handlePageChange}
                containerClassName={`flex justify-center mt-6 space-x-2 fixed inset-x-0 bottom-16 ${window.innerWidth < 700 ? 'md:justify-center' : ''
                  }`}
                pageClassName='px-2 py-1 bg-blue-500 text-white rounded-full cursor-pointer'
                activeClassName='bg-blue-700'
                previousClassName='px-2 py-1 bg-gray-300 text-gray-600 rounded-full cursor-pointer'
                nextClassName='px-2 py-1 bg-gray-300 text-gray-600 rounded-full cursor-pointer'
                disabledClassName='px-2 py-1 bg-gray-200 text-gray-400 rounded-full cursor-not-allowed'
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
              />}


            </>
          ) : (

            <div>
              <div className='text-red-500 font-extrabold flex justify-center mt-64'>
                <h1 className='text-4xl'>No Data</h1>

              </div>
              <div className='flex justify-center '>
                <button className='w-32 bg-yellow-400 rounded-md mt-4 text-white font-extrabold ' onClick={handleClearFilter}>Clear</button>
              </div>
            </div>


          )}
        </div>
      </div>

    </div>
  );
}

export default SubscriptionPlan;
