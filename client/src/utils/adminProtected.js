import React from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet } from 'react-router-dom';


function AdminProtectedRoutes() {
    const authState = useSelector((state) => {
        return state.adminAuth?.authState;
    })

    console.log("private",authState)

    return (authState ? <Outlet /> : <Navigate to='/admin/login' />)
}

export default AdminProtectedRoutes