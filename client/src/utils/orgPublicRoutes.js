import React from 'react'
import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';


const OrgPublicRoutes = () => {

    const authState = useSelector((state) => {

        return state.organisationauth?.authState;
    })
    console.log("public",authState)
    return(!authState ? <Outlet/>: <Navigate to='/organisation/dashboard'/>)

}

export default OrgPublicRoutes
