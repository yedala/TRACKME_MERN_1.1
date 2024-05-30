import React, { useEffect } from 'react'
import Header from './Header'
import TodoList from './Tasks/TodoList'
import useCheckIdleTime from '../hooks/useCheckIdle'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserData, removeUserData } from '../utils/userSlice';
import { refreshToken, refreshTokenUpdate } from '../services/apiUser';


const Home = () => {
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
    <div>
      <Header />
      <TodoList />
    </div>
  )
}

export default Home