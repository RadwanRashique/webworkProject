import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../componets/adminComponent/AdminNavbar';
import { Link } from 'react-router-dom'
import { serverVariables } from '../../util/serverVariables';
import { apiEndPoints } from '../../util/api';
import { adminRequest } from '../../Helper/instance';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import Swal from 'sweetalert2'
function Banner() {


  const dispatch = useDispatch()

  const [bannerData, setBannerData] = useState([])

  useEffect(() => {
    getData()
  }, []);



  const getData = () => {
    dispatch(showLoading())

    adminRequest({
      url: apiEndPoints.getBannerData,
      method: 'get',

    }).then((response) => {
      dispatch(hideLoading())
      if (response.data.success) {
        setBannerData(response.data.bannerData);
        toast.success("Banner")

      }


    }).catch((error) => {
      console.log(error)
      dispatch(hideLoading())




    })
  }

  // handleBanner  LIST AND UNLIST
  const handleBanner = async (ids) => {

    const result = await Swal.fire({
      title: "Are you sure ",
      text: 'Are you sure you want to Do this action?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {

      dispatch(showLoading())
      adminRequest({

        url: apiEndPoints.handlingBanner,
        method: 'post',
        data: { ids: ids }
      }).then((response) => {
        if (response.data.success) {
          dispatch((hideLoading()))
          toast.success(response.data.message)
          getData()
        }

      }).catch((error) => {

        console.log(error)
        dispatch(hideLoading())
      })




    }


  }



  const [openState, setOpenState] = useState(false);

  // Function to handle the open state from the AdminNavbar component
  const handleChildData = (childData) => {
    setOpenState(childData);
  };
  return (
    <div>
      <AdminNavbar onDataFromChild={handleChildData} />

      <div className='flex flex-col h-screen'>



        <div className='flex-grow p-4 overflow-x-auto'>
          <div className='p-4 text-black'>
            <h1 className='text-xl font-semibold'>Banner Management</h1>
            <Link to={serverVariables.AddBanner}>
              <button className='bg-blue-800 text-white px-4 py-2 rounded-md mt-2'>
                Add Banner
              </button>
            </Link>
          </div>

          <div className="w-full overflow-x-auto">
            <table className='min-w-full bg-white border border-gray-300 shadow-md rounded-md'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='px-4 md:px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                    Image
                  </th>
                  <th className='px-4 md:px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                    Title
                  </th>
                  <th className='px-4 md:px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                    Description
                  </th>
                  <th className='px-4 md:px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-4 md:px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bannerData?.map((banner) => (
                  <tr key={banner?._id}>
                    <td className='px-4 md:px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium'>
                      <img
                        src={banner?.image}
                        alt={banner?.title}
                        className='h-12 w-12 object-cover'
                      />
                    </td>
                    <td className='px-4 md:px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900'>
                      {banner?.title}
                    </td>
                    <td className='px-4 md:px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900'>
                      {banner?.description}
                    </td>
                    <td className='px-4 md:px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium'>
                      {banner?.list === true ? 'Listed' : 'Not Listed'}
                    </td>
                    <td className='px-4 md:px-6 py-4 flex items-center'>
                      <button
                        onClick={() => { handleBanner(banner?._id) }}
                        className='text-white bg-blue-600 hover:text-blue-900 rounded-full w-20 md:w-32 h-8'>
                        {banner?.list ? 'Unlist' : 'List'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        </div>
      </div>
    </div>
  );
}

export default Banner;
