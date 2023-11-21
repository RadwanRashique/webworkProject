import React, { useState, useEffect } from 'react';

import AdminNavbar from '../../componets/adminComponent/AdminNavbar'

import { apiEndPoints } from '../../util/api';
import { adminRequest } from '../../Helper/instance';
import ReactApexChart from 'react-apexcharts';
// import "../../styles/global.css"
function ApexChart() {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        if (val === 0) {
          return '₹' + val; // Display '₹0' for zero values
        } else {
          const formattedValue = `₹${val.toFixed(0)}`; // Format non-zero values
          return formattedValue;
        }
      },
      rotate: -90,
      offsetY: 0,
      style: {
        fontSize: '12px',
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return '₹' + val;
        },
      },
    },
    title: {
      text: 'Monthly Revenue',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: 'Revenue',
      data: [] // Initialize with an empty array
    },
  ]);

  const getData = () => {
    adminRequest({
      url: apiEndPoints.getDataToDash,
      method: 'get',
    })
      .then((response) => {
        if (response.data.success) {
          const paymentByMonth = response.data.paymentByMonth;
          const revenueData = Array(12).fill(0); // Initialize an array for 12 months

          // Iterate through the payment data and accumulate revenue by month
          paymentByMonth.forEach((payment) => {
            const month = new Date(payment.date).getMonth();
            revenueData[month] += payment.price;
          });

          setChartSeries([
            {
              name: 'Revenue',
              data: revenueData,
            },
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
    </div>
  );
}



function Dashboard() {
  const [usercount, setUsercount] = useState('');
  const [developercount, setDevelopercount] = useState('');
  const [subscriptioncount, setSubscriptioncount] = useState('');
  const [totalrevenue, setTotalrevenue] = useState()

  const getData = () => {
    adminRequest({
      url: apiEndPoints.getDataToDash,
      method: 'get',
    })
      .then((response) => {
        if (response.data.success) {
          setUsercount(response.data.user);
          setDevelopercount(response.data.developer);
          setSubscriptioncount(response.data.sub);
          setTotalrevenue(response.data.totalPayment)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const [openState, setOpenState] = useState(false);

  // Function to handle the open state from the AdminNavbar component
  const handleChildData = (childData) => {
    setOpenState(childData);
  };

  return (

    <div>
      <AdminNavbar onDataFromChild={handleChildData} />


      {openState === false && (<div className="flex flex-col md:flex-row">

        <div style={{ flex: '75%' }} className="admin-content bg-gray-50 p-4">
          <div className="flex flex-wrap justify-center space-y-4 md:space-y-0 md:space-x-4 md:pl-8 font-bold">
            <div className="bg-blue-500 text-white w-72 h-14 flex flex-col items-center justify-center">
              <h1>Users</h1>
              <p>Count: {usercount}</p>
            </div>
            <div className="bg-blue-500 text-white w-72 h-14 flex flex-col items-center justify-center">
              <h1>Developers</h1>
              <p>Count: {developercount}</p>
            </div>
            <div className="bg-blue-500 text-white w-72 h-14 flex flex-col items-center justify-center">
              <h1>Subscribed Developers</h1>
              <p>Count: {subscriptioncount}</p>
            </div>
          </div>

          <div className="w-full text-center mt-6">
            <ApexChart />
          </div>

          <div className="ml-8 mt-4 text-center">
            <h1 className="font-extrabold text-red-500">Total Revenue: ₹{totalrevenue}</h1>
          </div>
        </div>
      </div>)}
    </div>
  );
}

export default Dashboard;
