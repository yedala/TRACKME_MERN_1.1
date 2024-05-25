import React, { useEffect } from 'react'
import { ChatState } from '../context/ChatProvider'
import { fetchAllChats, fetchChatName } from '../../services/apiChat';

const MyChats = () => {
    const { chats, user, setChats,selectedChat, setSelectedChat} = ChatState();

    useEffect(() => {

        if (user) {
            console.log(chats)
            fetchChats();

        }
    }, [user]);

    const fetchChats = async () => {
        const data = await fetchAllChats(user?.token);
        setChats(data?.data);
    }
    
    const bkgClr = (id)=>{
        if(selectedChat?._id == id)return 'bg-gray-400'
        return 'bg-gray-100'
    }
    const selectChat = (eachChat)=>{
        setSelectedChat(eachChat);
    }
    return (
        <div className='flex flex-col'>
            <div className='flex justify-center text-xl bg'>My Charts</div>
            <div className='flex-grow'>
                {(chats.length > 0) &&
                    <div>
                        {
                            chats?.map((eachChat) => {
                                return (
                                    <div className={` p-2 px-4 m-1 rounded-md ${bkgClr(eachChat?._id)}` }>
                                        <div onClick={()=>selectChat(eachChat)} className='cursor-pointer ' key={eachChat._id}>
                                            {!eachChat.isGroupChat ? fetchChatName(eachChat?.users, user._id) : eachChat.chatName}
                                        </div>
                                    </div>)
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default MyChats