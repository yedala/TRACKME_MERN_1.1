import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import { fetchUser } from '../services/apiUser'

const AccountSettings = () => {
  const user = useSelector(state => state?.user?.userData);
  const [userData, setUserData] = useState();

  const findUser = async()=>{
    try{
      const data = await fetchUser(user._id,user.token);
      setUserData(data);
    }catch(err){
      console.log('need a toaster');
    }
  }
  useEffect(()=>{
    if(user){
      findUser();
      
    }
  },[user])
  return (
    <div>
      <Header/>
      <div >
        <div className='flex justify-center m-1 p-1 text-lg'>Update Profile</div>
      </div>
      </div>
  )
}

export default AccountSettings