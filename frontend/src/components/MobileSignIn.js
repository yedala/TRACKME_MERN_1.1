import React, { useState ,useRef, useEffect } from 'react'
import Otp from './Otp';

const MobileSignIn = ({signIn}) => {
    const [enableOtp,setEnableOtp]=useState(false);
    const [resend,setResend]=useState(0);
    const [timer,setTimer]=useState(60);
    useEffect(()=>{
        setTimer(60);
        const intervalId = setInterval(()=>{
            setTimer((t)=>Math.max(0,t-1));
        },1000)
        return ()=>{
            clearInterval(intervalId);
        }
    },[enableOtp,resend]);

    const mobileNumber = useRef();
    const handleSendOtp = ()=>{
        if(enableOtp){
            setResend((prev)=> prev+1);
        }
        else if(mobileNumber.current.value.length == 10)setEnableOtp(true);
    }
  return (
         <div className=''>
            {!enableOtp && <input ref={mobileNumber} className="w-full p-2  rounded-lg m-3" type="number" placeholder='Enter Mobile Number' />}
            {enableOtp && <Otp  />}
            <button className='w-1/4 bg-orange-200 rounded-lg p-1 mx-3 my-5 ' onClick={handleSendOtp}>{!enableOtp ? 'Send Otp' : timer? 'Sent':'Resend Otp'}</button>
            {(enableOtp && timer) && <div className=' mx-2 text-red-400 p-1'>Resend In: {timer}</div>}
        </div>
  )
}

export default MobileSignIn