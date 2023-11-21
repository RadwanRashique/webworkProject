import React from 'react'
import { Navigate } from 'react-router-dom'
import { serverVariables } from '../../util/serverVariables'
function adminPublicRoute(props) {
    if (localStorage.getItem('admintoken')) {
        return <Navigate to={serverVariables.Dashboard} />

    }
    else {
        return props.children
    }
}
export default adminPublicRoute