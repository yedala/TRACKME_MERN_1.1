import React from 'react'
import Login from './Login/Login'
import {RouterProvider, Navigate,Route,Routes} from "react-router-dom"
import Home from './Home'
import AccountSettings from './AccountSettings'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader'
import EditTask from './Tasks/EditTask'

const Body = () => {
 const isAuthenticated = useSelector(state => state?.user?.userData?.token);
 const loader = useSelector(state => state?.user?.loader);
  return (
    <>
    {loader && <div className='absolute  w-screen h-screen flex justify-center items-center'>
    <Loader />
    </div>}
     <Routes>
      <Route path="/"  element={isAuthenticated ? <Navigate to="/home"/> :<Login/>}></Route>
      <Route path="/home" element={isAuthenticated ? <Home/>: <Navigate to="/" />}></Route>
      <Route path="/account" element={<AccountSettings/>}></Route>
      <Route path="/editTask/:id" element={<EditTask/>}></Route>
     </Routes>
    </>
  
  )
}

export default Body