import React, { useEffect , useRef, useState} from 'react'
import { ChatState } from '../context/ChatProvider'
import { LuSendHorizonal } from "react-icons/lu";
import { fetchAllMessages, sendNewMessage } from '../../services/apiChat';

const SingleChat = () => {
    const {user,selectedChat} = ChatState();
    const message = useRef('');
    const [allMessages,setAllMessages] = useState([]);
    const containerRef = useRef();
  
    const fetchMessages = async()=>{
        const {data} = await fetchAllMessages(selectedChat?._id,user.token);
        setAllMessages(data);
    }
    useEffect(()=>{
        if(user && selectedChat)fetchMessages();
    },[user,selectedChat])
    useEffect(()=>{
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    },[allMessages])
    const sendMessage = async()=>{
        if(message.current.val == "")return;
        const payload ={
            content: message.current.value,
            chatId: selectedChat._id,
        };
        const {data} = await sendNewMessage(payload,user.token)
        message.current.value =""
        setAllMessages([...allMessages,data]);
       


    }
    const typeOfMsg = (msg)=>{
        if(msg?.sender._id != user?._id) return 'justify-start '
        return ' justify-end'
    }

  return (
    <div className='flex flex-col h-screen'>
        <div className='flex justify-center p-2 text-3xl bg-slate-400'>Chat..</div>
        <div className='flex-grow  bg-slate-300 overflow-auto' ref={containerRef} style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {
                selectedChat && <>
                {allMessages?.map((msg=>{
                    return (<div className={`flex ${typeOfMsg(msg)}`}><div  className='p-1 px-3 m-1 mx-2 rounded-lg bg-gray-200   '>{msg.content}</div></div>)
                }))}
                </>}
            {!selectedChat && <div className='flex m-24 justify-center items-center'>Select a Chat </div>} 
        </div>
        <div className={`h-16 flex justify-center items-center ${!selectedChat ?'opacity-50 pointer-events-none' : ''} ` } >
            <input ref={message} defaultValue={message.current.value} className='m-2  bg-gray-400 rounded-3xl p-2 w-3/4'/>
            <LuSendHorizonal  onClick={sendMessage} className='cursor-pointer w-7 h-7' />
        </div>
    </div>
  )
}

export default SingleChat