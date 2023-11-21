import React from 'react'
import { Navigate } from 'react-router-dom'
import { serverVariables } from '../../util/serverVariables'
function userProtectedRoute(props) {
  // so if there is no token it will navigate to the login page
  if (localStorage.getItem('token')) {
    return props.children
  }
  else {
    return <Navigate to={serverVariables.Login} />
  }

}

export default userProtectedRoute