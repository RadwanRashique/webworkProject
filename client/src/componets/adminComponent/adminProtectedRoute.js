import React from 'react'
import { Navigate } from 'react-router-dom'
import { serverVariables } from '../../util/serverVariables'


function adminProtectedRoute(props) {
    if (localStorage.getItem("admintoken")) {

        return props.children
    }

    else {

        return <Navigate to={serverVariables.AdminLogin} />
    }


}
export default adminProtectedRoute