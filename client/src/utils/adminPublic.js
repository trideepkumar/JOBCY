import React from 'react'
import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';


const AdminPublicRoutes = () => {

    const authState = useSelector((state) => {
        return state.adminAuth?.authState;
    })
    
    console.log("public",authState)
    return(!authState ? <Outlet/>: <Navigate to='/admin/dashboard'/>)

}

export default AdminPublicRoutes
