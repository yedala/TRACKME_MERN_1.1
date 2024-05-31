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
        <div  onClick={() => setProfile(false)}>
            <div className='flex justify-end' ><IoMdClose /></div>
            <div className='h-52 flex flex-col'>
                <Link className='px-2  my-1' to="/">Home</Link>
                <Link className='px-2  my-1' to="/connect">Chats</Link>
                <Link className='px-2  my-1' to="/tasks">Tasks</Link>
            </div>
            <div className='flex flex-col cursor-pointer'>
                <Link className='px-2  my-1' to="/account">Update Profile</Link>
                <p className='px-2  my-1' onClick={LogOut}>Log Out</p>
            </div>
        </div>
    )
}

export default Profile