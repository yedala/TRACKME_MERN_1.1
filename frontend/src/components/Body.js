import React from 'react'
import Login from './Login/Login'
import { Navigate, Route, Routes, Router } from "react-router-dom"
import Home from './Home'
import AccountSettings from './AccountSettings'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader'
import EditTask from './Tasks/EditTask'
import ChatsConnect from './chats/ChatsConnect'
import ProtectedRoutes from './ProtectedRoutes'
import TodoList from './Tasks/TodoList'


const Body = () => {
  const isAuthenticated = useSelector(state => state?.user?.userData?.token);
  const loader = useSelector(state => state?.user?.loader);
  return (
    <>
      {loader && <div className='absolute  w-screen h-screen flex justify-center items-center'>
        <Loader />
      </div>}
      <Routes>

        <Route path="/login" element={<ProtectedRoutes path={"/login"}><Login /> </ProtectedRoutes>}></Route>
        <Route path="/" element={<ProtectedRoutes><Home /> </ProtectedRoutes>}>
          <Route path="/connect" element={<ProtectedRoutes><ChatsConnect /></ProtectedRoutes>} />
          <Route path="/account" element={<ProtectedRoutes><AccountSettings /></ProtectedRoutes>} />
          <Route path="/tasks" element={<ProtectedRoutes><TodoList /></ProtectedRoutes>} />
          <Route path="/tasks/editTask/:id" element={<EditTask />} />

        </Route>


      </Routes>
    </>

  )
}

export default Body