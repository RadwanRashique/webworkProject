import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import { serverVariables } from './serverVariables';

import LandingPage from '../pages/landingPage'
// ***********user ***********

import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import Home from '../pages/user/Home'
import About from "../pages/user/About"
import Help from '../pages/user/Help';
import ProtecedRoute from '../componets/userComponent/userProtectedRoute'
import PublicRoute from '../componets/userComponent/userPublicRoute'
import ChatPage from '../pages/user/chat'
import DeveloperList from '../pages/user/developerList'
import UserDeveloperDetailedView from '../pages/user/developerDetailedView'
import FollowingStatus from '../pages/user/followStatus';
import OtpPage from '../pages/user/otp';
import ForgetPassword from '../pages/user/forgetPassword';
import ForgetPasswordOtp from '../pages/user/forgetOtp'
import ResetPassword from '../pages/user/resetPassword'
import Profile from '../pages/user/profile'
import EditProfile from '../pages/user/EditProfile';
import EditImage from '../pages/user/EditImage'
import ChatList from '../pages/user/chatList'

// ***********developer ***********
import DeveloperProtectedRoute from '../componets/developerComponent/developerProtectedRoute'
import DeveloperPublicRoute from '../componets/developerComponent/developerPublicRoute'
import DeveloperRegister from '../pages/developer/developerRegister'
import DeveloperLogin from '../pages/developer/developerlogin'
import DeveloperOtp from '../pages/developer/developerotp'
import DeveloperForgetPassword from '../pages/developer/developerforgetPassword'
import DeveloperForgetOtp from '../pages/developer/developerforgetOtp'
import DeveloperHome from '../pages/developer/developerHome'
import DeveloperAbout from '../pages/developer/developerabout'
import DeveloperResetPassword from '../pages/developer/developerresetPassword'
import DeveloperEditProfile from '../pages/developer/developerEditProfile';
import DeveloperProfile from '../pages/developer/developerProfile';
import DeveloperCollectDetails from '../pages/developer/developerDetails'
import DeveloperSubscriptionPlan from '../pages/developer/subscriptionPlan'
import DeveloperHelp from '../pages/developer/developerHelp'
import DeveloperAdminApprovelPage from '../pages/developer/PaymentSucess'
import DeveloperNotification from '../pages/developer/DeveloperNotification';
import DeveloperChat from '../pages/developer/developerChat';
import PayHistory from '../pages/developer/developerHistory'
import DeveloperChatList from '../pages/developer/developerChatList'


// *********Admin*********
import Dashboard from '../pages/admin/Dashboard'
import Banner from '../pages/admin/Banner'
import UserDetails from '../pages/admin/userDetails'
import DeveloperDetails from '../pages/admin/developerDetails'
import SubscriptionPlan from '../pages/admin/subscriptionPlan'
import RequestApprovel from '../pages/admin/requestApprovel'
import DeveloperDetailedView from '../pages/admin/developerDetailedView'
import SubscriptionDetails from '../pages/admin/subscriptionDetails'
import AddPlan from '../pages/admin/addPlan'
import AddBanner from '../pages/admin/addBanner'
import AdminLogin from '../pages/admin/adminLogin'
import AdminProtectedRoute from '../componets/adminComponent/adminProtectedRoute';
import AdminPublicRoute from '../componets/adminComponent/adminPublicRoute';
export default function appRoutes() {
  const { loading } = useSelector(state => state.alerts)

  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-100 bg-opacity-90">
          <div className="text-blue-500 flex justify-center items-center">
            <svg class="animate-spin h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6.292-1.29-8.544-3.544l1.414-1.414z"></path>
            </svg>
          </div>
        </div>
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <Routes>
        <Route path={serverVariables.Landing} element={<PublicRoute><LandingPage /></PublicRoute>} />
        {/* user routes */}
        <Route path={serverVariables.Login} element={<PublicRoute><Login /></PublicRoute>} />
        <Route path={serverVariables.Register} element={<PublicRoute><Register /></PublicRoute>} />
        <Route path={serverVariables.UserHome} element={<ProtecedRoute><Home /></ProtecedRoute>} />
        <Route path={serverVariables.About} element={<ProtecedRoute><About /></ProtecedRoute>} />
        <Route path={serverVariables.Help} element={<ProtecedRoute><Help /></ProtecedRoute>} />
        <Route path={serverVariables.Otp} element={<PublicRoute><OtpPage /></PublicRoute>} />
        <Route path={serverVariables.ForgetPassword} element={<PublicRoute><ForgetPassword /></PublicRoute>} />
        <Route path={serverVariables.ForgetOtp} element={<PublicRoute><ForgetPasswordOtp /></PublicRoute>} />
        <Route path={serverVariables.ResetPassword} element={<PublicRoute><ResetPassword /></PublicRoute>} />
        <Route path={serverVariables.Profile} element={<ProtecedRoute><Profile /></ProtecedRoute>} />
        <Route path={serverVariables.EditProfile} element={<ProtecedRoute><EditProfile /></ProtecedRoute>} />
        <Route path={serverVariables.FollowStatus} element={<ProtecedRoute><FollowingStatus /></ProtecedRoute>} />
        <Route path={serverVariables.Chat} element={<ProtecedRoute><ChatPage /></ProtecedRoute>} />
        <Route path={serverVariables.DeveloperList} element={<ProtecedRoute><DeveloperList /></ProtecedRoute>} />
        <Route path={serverVariables.DeveloperDetailedView} element={<ProtecedRoute><UserDeveloperDetailedView /></ProtecedRoute>} />
        <Route path={serverVariables.EditImage} element={<ProtecedRoute><EditImage /></ProtecedRoute>} />
        <Route path={serverVariables.ChatList} element={<ProtecedRoute><ChatList /></ProtecedRoute>} />
        {/* developer routes */}
        <Route path={serverVariables.DeveloperRegister} element={<DeveloperPublicRoute ><DeveloperRegister /></DeveloperPublicRoute>} />
        <Route path={serverVariables.DeveloperLogin} element={<DeveloperPublicRoute ><DeveloperLogin /></DeveloperPublicRoute>} />
        <Route path={serverVariables.DeveloperOtp} element={<DeveloperPublicRoute ><DeveloperOtp /></DeveloperPublicRoute>} />
        <Route path={serverVariables.DeveloperForgetPassword} element={<DeveloperPublicRoute ><DeveloperForgetPassword /></DeveloperPublicRoute>} />
        <Route path={serverVariables.DeveloperForgetOtp} element={<DeveloperPublicRoute ><DeveloperForgetOtp /></DeveloperPublicRoute>} />
        <Route path={serverVariables.DeveloperResetPassword} element={<DeveloperPublicRoute ><DeveloperResetPassword /></DeveloperPublicRoute>} />
        <Route path={serverVariables.DeveloperHome} element={<DeveloperProtectedRoute> < DeveloperHome /></DeveloperProtectedRoute>} />
        <Route path={serverVariables.DeveloperAbout} element={<DeveloperProtectedRoute> <DeveloperAbout /></DeveloperProtectedRoute>} />
        <Route path={serverVariables.DeveloperEditProfile} element={<DeveloperProtectedRoute>< DeveloperEditProfile /></DeveloperProtectedRoute>} />
        <Route path={serverVariables.DeveloperProfile} element={<DeveloperProtectedRoute><DeveloperProfile /></DeveloperProtectedRoute>} />
        <Route path={serverVariables.DeveloperDetails} element={<DeveloperProtectedRoute><DeveloperCollectDetails /></DeveloperProtectedRoute>} />
        <Route path={serverVariables.SubscriptionPlan} element={<DeveloperProtectedRoute>< DeveloperSubscriptionPlan /></DeveloperProtectedRoute>} />
        <Route path={serverVariables.DeveloperHelp} element={<DeveloperProtectedRoute><DeveloperHelp /></DeveloperProtectedRoute>} />
        <Route path={serverVariables.AdminApprovelPage} element={<DeveloperProtectedRoute><DeveloperAdminApprovelPage /></DeveloperProtectedRoute>} />
        <Route path={serverVariables.DeveloperChat} element={<DeveloperProtectedRoute><DeveloperChat /></DeveloperProtectedRoute>} />
        <Route path={serverVariables.DeveloperNotification} element={<DeveloperProtectedRoute><DeveloperNotification /></DeveloperProtectedRoute>} />
        <Route path={serverVariables.PayHistory} element={<DeveloperProtectedRoute><PayHistory /></DeveloperProtectedRoute>} />
        <Route path={serverVariables.DeveloperChatList} element={<DeveloperProtectedRoute><DeveloperChatList /></DeveloperProtectedRoute>} />
        {/* admin routes */}
        <Route path={serverVariables.AdminLogin} element={<AdminPublicRoute><AdminLogin /></AdminPublicRoute>} />
        <Route path={serverVariables.Dashboard} element={<AdminProtectedRoute ><Dashboard /></AdminProtectedRoute>} />
        <Route path={serverVariables.Banner} element={<AdminProtectedRoute ><Banner /></AdminProtectedRoute>} />
        <Route path={serverVariables.UserDetails} element={<AdminProtectedRoute ><UserDetails /></AdminProtectedRoute>} />
        <Route path={serverVariables.DeveloperDetail} element={<AdminProtectedRoute ><DeveloperDetails /></AdminProtectedRoute>} />
        <Route path={serverVariables.SubscriptionManage} element={<AdminProtectedRoute ><SubscriptionPlan /></AdminProtectedRoute>} />
        <Route path={serverVariables.RequestApprove} element={<AdminProtectedRoute ><RequestApprovel /></AdminProtectedRoute>} />
        <Route path={serverVariables.DeveloperView} element={<AdminProtectedRoute ><DeveloperDetailedView /></AdminProtectedRoute>} />
        <Route path={serverVariables.SubscriptionDetails} element={<AdminProtectedRoute ><SubscriptionDetails /></AdminProtectedRoute>} />
        <Route path={serverVariables.AddPlan} element={<AdminProtectedRoute ><AddPlan /></AdminProtectedRoute>} />
        <Route path={serverVariables.AddBanner} element={<AdminProtectedRoute ><AddBanner /></AdminProtectedRoute>} />
      </Routes>
    </div>
  )
}
