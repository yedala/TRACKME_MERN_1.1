import React, { useEffect } from 'react'
import Header from './Header'
import TodoList from './Tasks/TodoList'
import useCheckIdleTime from '../hooks/useCheckIdle'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { addUserData, removeUserData } from '../utils/userSlice';
import { refreshToken, refreshTokenUpdate } from '../services/apiUser';
import Loader from './Loader'


const Home = () => {
  const loader = useSelector(state => state?.user?.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state?.user?.userData);
  const LogOut = () => {
    dispatch(removeUserData());
    navigate('/')
  }
  const refreshToken = async()=>{
    const data = await refreshTokenUpdate(userData?.refreshToken,userData?.token);
    const updateUserData ={
      ...userData,
      token: data?.data?.token
    }
    dispatch(addUserData(updateUserData))
  }
  let isActive = useCheckIdleTime(1200000, LogOut);
  useEffect(()=>{
    const interval = setInterval(()=>{
      refreshToken();
    },1680000);
    return ()=>{
      clearInterval(interval);
    }
  },[isActive]);
  return (
    <>
     {loader && <div className='absolute  w-screen h-screen flex justify-center items-center'>
        <Loader />
      </div>}
      <div className='flex flex-col h-screen'>
      <Header className='' />
      <div className='overflow-y-auto'>
      <Outlet />

      </div>
    </div>
    </>
    
  )
}

export default Home