import React, { useRef, useState } from 'react'
import validation from '../../utils/validation';
import { useDispatch } from 'react-redux';
import { addUserData, updateLoader } from '../../utils/userSlice';
import {useNavigate} from "react-router-dom"
import bkgImg from '../../assets/bkgimg.jpeg'
import GeneratePassword from './GeneratePassword';
import MobileSignIn from './MobileSignIn';
import { LOGIN,SIGNUP } from '../../utils/Api';
import axios from "axios"

const Login = () => {
    const [isSignIn, setisSignIn] = useState(true);
    const [mobileSignIn,setMobileSignIn]= useState(false);
    const [isErrmsg, setisErrmsg] = useState(null);
    const [generatePassword,setgeneratePassword] = useState(false);
    const email = useRef();
    const password = useRef();
    const name = useRef();
    const mobileNumber = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeSignIn = () => {
        if(isSignIn)setMobileSignIn(false);
        setisSignIn(!isSignIn);
    }
    const openGeneratePassword = ()=>{
        setgeneratePassword(true);
    }
    const handleMobile = ()=>{
        setMobileSignIn(!mobileSignIn);
    }
    const isAuthenticated = (_id,name,email,token)=>{
        dispatch(addUserData({_id:_id,name:name,email:email,token:token}));
    }
    const handleSignIn = async ()=>{
        const err = validation(email.current.value, password.current.value);
        setisErrmsg(err);
        if (err) return;
        dispatch(updateLoader(true));
        if(isSignIn){
           try{
            const {data} = await axios.post(LOGIN,{email: email.current.value,password:password.current.value});
            isAuthenticated(data._id,data.name,data.email,data.token);
            navigate('/home');
            dispatch(updateLoader(false));
           }
           catch(err){
            dispatch(updateLoader(false));

           }
        }
        else{
            try{
                const {data} = await axios.post(SIGNUP,{email: email.current.value,password:password.current.value,name: name.current.value,mobileNumber: mobileNumber.current.value});
                isAuthenticated(data._id,data.name,data.email,data.token);
                navigate('/home');
                dispatch(updateLoader(false));
               }
               catch(err){
                dispatch(updateLoader(false));
               }
        }
    }
   



    return (
        <>
        <div className='flex h-screen w-screen '>
            <div className='w-3/4 bg-black'>
               <img className="h-screen" src={bkgImg} alt="img" />
            </div>
            <div className='w-2/4 p-32 bg-orange-50  '>
                <form onClick={(e) => e.preventDefault()}  >
                    <p className=' font-bold text-3xl my-6 '>{isSignIn ? "Sign In" : "Sign Up"}</p>
                    {!isSignIn && <input ref={name} type="text" placeholder='Enter Name:' className='w-full p-3 my-3 rounded-md' />}
                    {!isSignIn && <input ref={mobileNumber} type="Number" placeholder="Enter Mobile Number" className='w-full p-3 my-3 rounded-md' />}

                    {!mobileSignIn && <input ref={email} type='email' placeholder='Enter email' className='w-full p-3 my-3 rounded-md' />}
                    {!mobileSignIn && <input ref={password} type="password" placeholder={isSignIn? "Enter Password": "Type/Generate Password"} className='w-full p-3 rounded-md' />}
                    {isSignIn &&  mobileSignIn && <MobileSignIn signIn={handleSignIn} />}

                    {!isSignIn && (<div className='py-2 w-full flex justify-end'><button onClick={openGeneratePassword} className=' p-1 rounded-lg text-sm font-medium bg-orange-300'>Generate Password</button></div>)}
                    <button onClick={handleSignIn} className='w-full p-3 my-8 rounded-lg bg-orange-200'> {!isSignIn ? "Sign Up " : "Sign In"}</button>
                    {isErrmsg && <span className='text-red-800 font-bold text-sm'>{isErrmsg}</span>}
                    <div className='flex justify-between'>
                        { isSignIn && <p className='text-gray cursor-pointer my-3' onClick={handleMobile}  >{!mobileSignIn ? 'Sign in Using Mobile' : 'Sign in Using Email'}</p>}
                        <p className='text-gray cursor-pointer my-3' onClick={changeSignIn}>{isSignIn ? "SignUp " : "SignIn"}</p>
                    </div>

                </form>
            </div>
        </div>
       {generatePassword && 
       <div className='absolute top-0 w-screen h-screen bg-blue-200 '>
        <GeneratePassword setgeneratePassword={setgeneratePassword}/>
      </div>}
        </>
    )
}

export default Login