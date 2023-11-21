import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../componets/adminComponent/AdminNavbar';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import { adminRequest } from '../../Helper/instance';
import { apiEndPoints } from '../../util/api';
import { serverVariables } from '../../util/serverVariables';
function SubscriptionPlan() {
  // state management
  const [planData, setPlanData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();


  const getPlanData = () => {
    dispatch(showLoading());
    adminRequest({
      url: apiEndPoints.PlanData,
      method: 'get'
    }).then((response) => {
      if (response.data.success) {

        setPlanData(response.data.planData);
        dispatch(hideLoading())
        setLoading(false);
      }
    }).catch((error) => {
      dispatch(hideLoading());
      console.log(error, 'at subscriptionPlan');

    })
  }
  useEffect(() => {
    getPlanData();
  }, []);
  useEffect(() => {

  }, [planData])




  // to deal delete
  const deletePlan = async (id) => {


    const result = await Swal.fire({
      title: "Are you sure you want to delete",
      text: 'Are you sure you want to delete this plan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {


      dispatch(showLoading());
      adminRequest({
        url: apiEndPoints.deletePlan,
        method: 'post',
        data: { id: id }

      }).then((response) => {
        if (response.data.success) {
          dispatch(hideLoading());
          toast.success(response.data.message)
          getPlanData()
        }
      }).catch((error) => {
        dispatch(hideLoading());
        toast.error('Something went wrong', id);
      })
    }
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
          <h1 className='text-2xl font-semibold mb-4'>Manage Payment Plans</h1>
          <div className='mb-4'>
            <Link to={serverVariables.AddPlan}>
              <button className='bg-blue-500 text-white py-2 px-4 rounded'>Add Plan</button>
            </Link>
          </div>

          {loading ? (
            // Display a loading indicator while data is being fetched
            <div className='text-center text-red-500 font-bold'>loading...</div>
          ) : planData.length === 0 ? (
            // Display "No plans added yet" when there's no data
            <div className='text-center text-red-500 font-extrabold mt-64 text-4xl'>No plans added yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto   border-collapse">


                <thead>
                  <tr>
                    <th className='px-4 py-2'>No</th>
                    <th className='px-4 py-2'>Plan Name</th>
                    <th className='px-4 py-2'>Price</th>
                    <th className='px-4 py-2'>Duration</th>
                    <th className='px-4 py-2'>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {planData.map((plan, index) => (
                    <tr key={plan?._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                      <td className='border px-4 py-2'>{index + 1}</td>
                      <td className='border px-4 py-2'>{plan?.planName}</td>
                      <td className='border px-4 py-2'>₹{plan?.price}</td>
                      <td className='border px-4 py-2'>{plan?.duration}</td>
                      <td className='border px-4 py-2'>
                        <button
                          onClick={() => { deletePlan(plan._id) }}
                          className='bg-red-500 text-white py-1 px-2 rounded'>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          )}
        </div>
      </div>
    </div>

  );
}

export default SubscriptionPlan;