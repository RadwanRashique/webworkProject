import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { CgDetailsMore } from 'react-icons/cg';
import { MdDashboard, MdOutlineDeveloperMode, MdOutlineSubscriptions } from 'react-icons/md';
import { PiFlagBannerFill } from 'react-icons/pi';
import { AiOutlinePullRequest, AiOutlineLogout, AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { serverVariables } from '../../util/serverVariables';

function AdminNavbar(props) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const toggleOpen = () => {
    setOpen(!open);
    props.onDataFromChild(!open);
  };

  const Menu = [
    { title: 'Dashboard', icon: <MdDashboard />, path: serverVariables.Dashboard },
    { title: 'Banner', icon: <PiFlagBannerFill />, path: serverVariables.Banner },
    { title: 'User', icon: <FaUserCircle />, path: serverVariables.UserDetails },
    { title: 'developer', icon: <MdOutlineDeveloperMode />, path: serverVariables.DeveloperDetail },
    { title: 'Subscription plan', icon: <MdOutlineSubscriptions />, path: serverVariables.SubscriptionManage },
    { title: 'Request', icon: <AiOutlinePullRequest />, path: serverVariables.RequestApprove },
    { title: 'Logout', icon: <AiOutlineLogout />, path: serverVariables.AdminLogin },
    { title: 'Subscription Details', icon: <CgDetailsMore />, path: serverVariables.SubscriptionDetails },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admintoken');
    navigate(serverVariables.AdminLogin);
  };

  const handleBack = () => {
    setOpen(false);
    props.onDataFromChild(!open);
  };

  return (
    <div className="bg-blue-950 h-24 flex justify-between items-center px-5 text-white relative ">
      <div className="flex items-center gap-x-2">

        <h1 className="font-bold text-2xl mb-2">Webwork</h1>
      </div>

      <div className="cursor-pointer" onClick={toggleOpen}>
        {open ? (
          <h1>webwork</h1>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </div>

      {open && (


        <div className="l fixed inset-0 bg-blue-950 text-white bg-opacity-90">
          <AiOutlineArrowLeft className="h-6 w-6 text-white ml-4 mt-4" onClick={handleBack} />
          <div className="flex flex-col items-center mt-8">
            {Menu.map((title, index) => (
              <div key={index} className="text-white text-lg cursor-pointer mb-4 mt-6 flex items-center gap-x-2">
                {title.icon}
                <Link
                  to={title.title === 'Logout' ? '/adminlogin' : title.path}
                  onClick={title.title === 'Logout' ? handleLogout : undefined}
                >
                  {title.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminNavbar;
