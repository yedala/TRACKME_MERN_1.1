import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import { fetchUser } from '../services/apiUser'

const AccountSettings = () => {
  const user = useSelector(state => state?.user?.userData);
  const [userData, setUserData] = useState(null);
  const inputRefs = useRef({});


  const findUser = async()=>{
    try{
      const data = await fetchUser(user._id,user.token);
      setUserData(data.data);
    }catch(err){
      console.log('need a toaster');
    }
  }
  useEffect(()=>{
    if(user){
      findUser();
      
    }
  },[user]);

  const save = ()=>{
    let payload= {
      name: inputRefs.current[0].value,
      password: inputRefs.current[1].value,
    };

  }
  return (
    <div className='h-screen'>
      <div className='p-2 ' >
        <div className='flex justify-center m-1 p-1 text-lg'>Update Profile</div>
        <div className='flex w-full h-full'>
          <div className='w-1/2 flex pl-9 flex-col '>
            <label>Name: </label>
            <input type="text" className='p-2 m-1 w-3/4 bg-blue-200 rounded-md ' ref={(e)=>inputRefs.current[0]=e} defaultValue={userData?.name} />
            <label>New password:</label>
            <input type="password" ref={(e)=>inputRefs.current[0]=e} className='p-2 m-1 w-3/4 bg-blue-200 rounded-md ' />
            <label>Confirm password:</label>
            <input type="password" ref={(e)=>inputRefs.current[0]=e} className='p-2 m-1 w-3/4 bg-blue-200 rounded-md ' />
          </div>
          <div className='w-1/2  '>
            <img  className=' w-32 mb-6 rounded-md' src={userData?.pic}/>
            <button className='py-1 px-3 m-2 my-8 bg-green-400 rounded-lg '>➕Upload</button>
            <button className='px-3 py-1 m-2 my-8 bg-green-400 rounded-lg ' onClick={save}>✔️save</button>
          </div>
        </div>
      </div>
      </div>
  )
}

export default AccountSettings