import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { DeveloperHeader } from '../../componets/developerComponent/developerHeader';
import { developerRequest } from "../../Helper/instance";
import { apiEndPoints } from "../../util/api";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';

function PayHistory() {
    const [data, setData] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {



        const getData = async () => {

            dispatch(showLoading())
            toast.success("Your Payment History")

            developerRequest({
                url: apiEndPoints.PayHistory,
                method: 'get',
            }).then((response) => {

                if (response.data.success) {
                    dispatch(hideLoading())
                    setData(response.data.data)
                }
            }).catch((error) => {
                dispatch(hideLoading())
                console.log(error)
            })


        }
        getData()
    }, [])

    return (
        <div >

            <DeveloperHeader />


            <div className="p-4 flex flex-col items-center bg-yellow-100 min-h-screen ">
                <h1 className="text-2xl font-bold text-custom-text ">Payment History</h1>

                {data.length > 0 ? (


                    <div className="overflow-x-auto w-full">
                        <table className="w-full bg-custom-background shadow-md rounded my-10 border border-black">
                            <thead>
                                <tr>
                                    <th className="bg-blue-500 text-white p-2 border border-blue-700">No</th>
                                    <th className="bg-blue-500 text-white p-2 border border-blue-700">Plan Name</th>
                                    <th className="bg-blue-500 text-white p-2 border border-blue-700">Price</th>
                                    <th className="bg-blue-500 text-white p-2 border border-blue-700">Duration</th>
                                    <th className="bg-blue-500 text-white p-2 border border-blue-700">Start Date</th>
                                    <th className="bg-blue-500 text-white p-2 border border-blue-700">End Date</th>
                                </tr>
                            </thead>
                            <tbody>


                                {data?.map((paydata, index) => (
                                    <tr key={index}>
                                        <td className="bg-green-300 p-2 border border-green-500 text-center">{index + 1}</td>
                                        <td className="bg-green-300 p-2 border border-green-500 text-center">{paydata.planName}</td>
                                        <td className="bg-green-300 p-2 border border-green-500 text-center">{paydata.price}</td>
                                        <td className="bg-green-300 p-2 border border-green-500 text-center">{paydata.duration}</td>
                                        <td className="bg-green-300 p-2 border border-green-500 text-center">{paydata.date.substring(0, 10)}</td>
                                        <td className="bg-green-300 p-2 border border-green-500 text-center">{paydata.expireDate.substring(0, 10)}</td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                ) :
                    <h1 className="text-2xl font-bold text-custom-text flex items-center justify-center mb-8 h-screen text-red-500">
                        You didn't taken any subscription Yet
                    </h1>
                }

            </div>
        </div>
    );
}

export default PayHistory;
