import React from 'react'
import { Navigate } from 'react-router-dom'
import { serverVariables } from '../../util/serverVariables'

function userPublicRoute(props) {
    if (localStorage.getItem("token")) {

        return <Navigate to={serverVariables.UserHome} />
    }

    else {
        return props.children
    }

}

export default userPublicRoute