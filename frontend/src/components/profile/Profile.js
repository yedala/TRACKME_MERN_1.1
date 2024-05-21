import React from 'react'
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUserData } from '../../utils/userSlice';

const Profile = ({ setProfile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LogOut = () => {
        dispatch(removeUserData());
        navigate('/')
    }

    return (
        <div>
            <div className='flex justify-end' onClick={() => setProfile(false)} ><IoMdClose /></div>
            <div className='h-52 flex flex-col'>
                <Link className='p-2 my-1' to="/home">Home</Link>
                <Link className='p-2 my-1' to="/account">Account</Link>
            </div>
            <div className='flex flex-col cursor-pointer'>
                <p className='p-2 my-1' onClick={LogOut}>Log Out</p>
            </div>
        </div>
    )
}

export default Profile