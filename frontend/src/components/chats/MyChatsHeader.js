import React, { useRef, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { ChatState } from '../context/ChatProvider';
import { updateLoader } from '../../utils/userSlice';
import { createChat, fetchAllUsers } from '../../services/apiChat';
import { IoClose } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";

const MyChatsHeader = () => {
    const search = useRef();
    const [showUsers, setShowUsers] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const { user, setSelectedChat, chats, setChats, notifications, setNotifications } = ChatState();

    const handleSearch = async (e) => {
        if (e.target.value === "") {
            close();
            return;
        }
        try {
            const data = await fetchAllUsers(search.current.value, user.token);
            setSearchData(data?.data);
            if (data.data.length > 0)
                setShowUsers(true);
        } catch (err) {
            console.log('need a toaster')
        }

    }
    const close = () => {
        setShowUsers(false);
        setSearchData([]);
    }
    const selectChat = async (eachUser) => {
        const payload = {
            userId: eachUser._id,
        }
        const { data } = await createChat(payload, user.token);
        setSelectedChat(data);
        if (!chats.find((c) => c._id == data._id)) {
            setChats([data, ...chats]);
        }

        close();
    }

    const selectedNotification = (n)=>{
        setSelectedChat(n.chat);
        setShowNotification(false);
        setNotifications( notifications.filter((ns)=>ns._id!=n._id));

    }

    return (
        <div className='my-1 mx-2 px-2 border-y-2 flex items-center justify-between  relative'>
             <div className='flex text-lg px-3'>My Chats</div>
            <div className='flex items-center relative'>
                <input ref={search} onChange={(e) => handleSearch(e)} className='bg-slate-200 p-1 m-2 rounded-md pl-7 ' type="search" placeholder='Search.' />
                <IoIosSearch className='absolute cursor-pointer h-5 w-5 left-3' />
            </div>
            {(showUsers && searchData.length > 0) && <div className='absolute bg-white p-3 w-52  rounded-md left-36 top-12'>
                <div onClick={close} className='flex justify-end'><IoClose /></div>
                {searchData?.map((eachUser) => {
                    return (
                        <div onClick={() => selectChat(eachUser)} className='bg-slate-800 text-white p-1 m-1 text-center rounded-lg' key={eachUser._id}>
                            {eachUser.name}
                        </div>
                    )
                })}
            </div>
            }
            <div className='w-5 h-5' onClick={()=>setShowNotification(!showNotification)}>
                <FaRegBell className={`${notifications.length>0 ? 'text-red-400': ''}`} />
            </div>
                {showNotification && <div className='absolute bg-white right-2 p-2 rounded-md top-8'>
                    {notifications?.map((n) => {
                        return (
                            <div key={n._id} className='my-1 px-2 cursor-pointer border-b-2' onClick={()=>selectedNotification(n)}>{n.chat.isGroupChat ? `New Message From ${n.chat.chatName} ` : `New Message form ${n.sender.name}`}</div>
                        )
                    })}
                    {(notifications.length == 0) && <div> No new Messages</div>}
                </div>
                }
                
        </div>
    )
}

export default MyChatsHeader