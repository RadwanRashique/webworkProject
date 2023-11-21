import React from 'react'
import { Navigate } from 'react-router-dom'
import { serverVariables } from '../../util/serverVariables'
function developerPublicRoute(props) {
    if (localStorage.getItem('developertoken')) {
        return <Navigate to={serverVariables.DeveloperHome} />

    }
    else {
        return props.children
    }
}
export default developerPublicRoute