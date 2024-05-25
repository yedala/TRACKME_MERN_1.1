import React, { useRef, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { ChatState } from '../context/ChatProvider';
import { updateLoader } from '../../utils/userSlice';
import { createChat, fetchAllUsers } from '../../services/apiChat';
import { IoClose } from "react-icons/io5";

const MyChatsHeader = () => {
    const search = useRef();
    const [showUsers , setShowUsers] = useState(false);
    const [searchData,setSearchData] = useState([]);
    const {user,setSelectedChat,chats,setChats} = ChatState();

    const handleSearch=  async(e)=>{
       if(e.target.value === ""){
        close();
        return;
       }
       const data = await fetchAllUsers(search.current.value,user.token);
       setSearchData(data?.data);
       if(data.data.length >0)
       setShowUsers(true);
    }
    const close = ()=>{
        setShowUsers(false);
        setSearchData([]);
    }
    const selectChat = async(eachUser)=>{
        const payload ={
            userId: eachUser._id,
        }
        const {data} = await createChat(payload,user.token);
        console.log(data,chats);
        setSelectedChat(data);
        if(!chats.find((c)=>c._id == data._id)){
            setChats([...chats,data]);
        } 
            
        close();
    }

    return (
        <div className='my-1 mx-2 px-2 border-y-2 '>
            <div className='flex items-center relative'>
                <input ref={search }  onChange={(e)=> handleSearch(e)} className= 'bg-slate-200 p-1 m-2 rounded-md pl-7 ' type="search" placeholder='Search.' />
                <IoIosSearch  className='absolute cursor-pointer h-5 w-5 left-3' />
            </div>
            {(showUsers && searchData.length>0) && <div className='absolute bg-white p-3 w-52  rounded-md left-8 top-12'>
                <div onClick={close} className='flex justify-end'><IoClose /></div>
                {searchData?.map((eachUser)=>{
                    return (
                        <div onClick={()=> selectChat(eachUser)} className='bg-slate-800 text-white p-1 m-1 text-center rounded-lg' key={eachUser._id}> 
                            {eachUser.name}
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default MyChatsHeader