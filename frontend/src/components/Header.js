import React, { useEffect } from 'react'
import  LOGO  from '../assets/logo.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserData } from '../utils/userSlice';
import {useNavigate} from "react-router-dom"


const Header = () => {
  console.log('header')
  const user = useSelector(store => store?.user?.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogOut = ()=>{
  dispatch(removeUserData());
  navigate('/')
  }
 
 
  const handleAccount=()=>{
    navigate("/account")
  }
  const handleHome=()=>{
    navigate("/home")
  }
  return (
    <div className='flex justify-between w-screen items-center p-2 bg-blue-300 '>
      <img onClick={handleHome} className='w-8   overflow-hidden rounded-lg' src={LOGO} alt="logo" />
     <div className='flex px-2'>
     <p onClick={handleAccount} className='px-3 font-bold text-sm'>👋 {user?.name}</p>
      <p className='px-3 font-bold text-sm' onClick={LogOut}>SignOut</p>
     </div>
    </div>
  )
}

export default Header