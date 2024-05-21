import React, { useEffect, useRef, useState } from 'react'

const Otp = () => {
    const [otp,setOtp]=useState(new Array(4).fill(''));
    const inputRef =  useRef({})
    const handleInput = (ele,index)=>{
        const newOtp = [...otp];
        newOtp[index]=ele.substring(ele.length -1);
        setOtp(newOtp);
        const combinedOtp = newOtp.join('');
        if(combinedOtp.length == 4){console.log("succesful")}
        else if(ele && index<3){
            inputRef.current[index+1].focus();
        }
    }
    useEffect(()=>{
        inputRef.current[0].focus();
        console.log(inputRef);
    },[]);

    const handleKeyDown= (e,index)=>{
        if(e.key == "Backspace" && index>0 && !otp[index]){
            inputRef.current[index-1].focus();
        }

    }

  return (
    <div className='m-3'>
        {
            otp.map((e,index)=>{
                return (
                    <input type="text"  key={index} className=' text-center w-11 h-11 mx-2 my-3 ' value={e} ref={(ele)=> inputRef.current[index]=ele} onChange={(e)=>handleInput(e.target.value,index)} onKeyDown={(e)=>handleKeyDown(e,index)} />
                );
            })
        }
        
    </div>
  )
}

export default Otp