import React, { useEffect } from 'react'
import { ChatState } from '../context/ChatProvider'
import { fetchAllChats, fetchChatImage, fetchChatName } from '../../services/apiChat';

const MyChats = ({ fetchAgain }) => {
    const { chats, user, setChats, selectedChat, setSelectedChat } = ChatState();

    useEffect(() => {

        if (user) {
            fetchChats();
        }
    }, [user, fetchAgain]);

    const fetchChats = async () => {
        try {
            const data = await fetchAllChats(user?.token);
            setChats(data?.data);
        } catch (err) {
            console.log('need a toaster')
        }

    }

    const bkgClr = (id) => {
        if (selectedChat?._id == id) return 'bg-gray-400'
        return 'bg-gray-100'
    }
    const selectChat = (eachChat) => {
        setSelectedChat(eachChat);
    }
    return (
        <div className='flex flex-col h-5/6'>
           
            <div className='flex-grow ' style={{ overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }} >
                {(chats.length > 0) &&
                    <div>
                        {
                            chats?.map((eachChat) => {
                                return (
                                    <div onClick={() => selectChat(eachChat)} className={` flex p-2 px-4 m-1 rounded-md ${bkgClr(eachChat?._id)}`}>
                                        <div className='mr-5'> <img className='w-10 rounded-3xl' src={fetchChatImage(eachChat?.users, user._id)} /></div>
                                        <div>
                                            <div className='cursor-pointer ' key={eachChat._id}>
                                                {!eachChat.isGroupChat ? fetchChatName(eachChat?.users, user._id) : eachChat.chatName}
                                            </div>
                                            <p className='text-xs font-serif '>{eachChat?.latestMessage?.content}</p>
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