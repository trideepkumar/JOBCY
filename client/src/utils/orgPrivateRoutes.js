import React from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet } from 'react-router-dom';


function OrgProtectedRoutes() {
    const authState = useSelector((state) => {

        return state.organisationauth?.authState;
    })
    console.log("private",authState)

    return (authState ? <Outlet /> : <Navigate to='/organisation/login' />)
}

export default OrgProtectedRoutes