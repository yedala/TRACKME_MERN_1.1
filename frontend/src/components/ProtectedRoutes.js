import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Route} from 'react-router-dom';
import { Navigate} from "react-router-dom"


const ProtectedRoutes = ({children, path}) => {
    const user = useSelector(state => state?.user?.userData);
    if(path=='/login' && !user) return children;
    if(user && path=='/login')return <Navigate to="/"/>

  return user ? (children? children: <Outlet/>): <Navigate to="/login" />
}

export default ProtectedRoutes