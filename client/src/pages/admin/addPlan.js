import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { serverVariables } from '../../util/serverVariables';
import AdminNavbar from '../../componets/adminComponent/AdminNavbar'
import { apiEndPoints } from '../../util/api';
import { adminRequest } from '../../Helper/instance';


function AddPlan() {
  // state manage
  const [planName, setPlanName] = useState('default');
  const [price, setPrice] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');



  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handlePlanNameChange = (e) => {


    setPlanName(e.target.value.trim());
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value.trim());
  };

  const handlePlanSelectChange = (e) => {

    setSelectedPlan(e.target.value)

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!planName || !price) {
      return toast.error('fill all fields');

    }

    if (isNaN(price)) {
      toast.error('Price must be a valid number');
      return;
    }
    if (planName === '' || planName === 'default') {
      toast.error('Please select a valid plan option');
    }


    const planDetails = {
      planName,
      price,
      selectedPlan

    }
    dispatch(showLoading())



    adminRequest({
      url: apiEndPoints.addPlan,
      method: 'post',
      data: planDetails
    }).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message)
        navigate(serverVariables.SubscriptionManage)
      }

    }).catch((error) => {
      dispatch(hideLoading())
      console.log(error, "at addplan")
      toast.error("select a plan option")
    })

  };

  const [openState, setOpenState] = useState(false);

  // Function to handle the open state from the AdminNavbar component
  const handleChildData = (childData) => {
    setOpenState(childData);
  };
  return (
    <div>
      <AdminNavbar onDataFromChild={handleChildData} />


      <div className='flex flex-col h-screen'>
        <div className='flex justify-between p-4'>
          <Link to={serverVariables.SubscriptionManage} > <button className='bg-blue-500 text-white py-2 px-4 rounded'>
            Back
          </button>
          </Link>
        </div>
        <div className='flex-grow flex justify-center items-center'>
          <div className='bg-white p-8 rounded-lg border-2 shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/3 '>
            <h1 className='text-xl font-bold mb-4'>Add Plan</h1>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <input
                  type='text'
                  placeholder='Enter your plan name'
                  className='w-full border p-2 rounded'

                  onChange={handlePlanNameChange}
                />
              </div>
              <div className='mb-4'>
                <input
                  type='number'
                  placeholder='Enter price of the plan'
                  className='w-full border p-2 rounded'

                  onChange={handlePriceChange}
                />
              </div>
              <div className='mb-4'>
                <select
                  className='w-full border p-2 rounded'

                  onChange={handlePlanSelectChange}
                >
                  <option value='default'>Select a plan option</option>
                  <option value='1 month'>1 month</option>
                  <option value='quarter plan'>Quarter Plan</option>
                  <option value='yearly plan'>Yearly Plan</option>
                </select>
              </div>
              <div className='mb-4'>
                <button
                  type='submit'
                  className='bg-blue-500 text-white py-2 px-4 rounded w-full'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPlan;
