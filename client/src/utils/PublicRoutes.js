import React from 'react'
import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';


const PublicRoutes = () => {

    const authState = useSelector((state) => {

        return state.auth?.authState;
    })
    return(!authState ? <Outlet/>: <Navigate to='/posts'/>)

}

export default PublicRoutes
