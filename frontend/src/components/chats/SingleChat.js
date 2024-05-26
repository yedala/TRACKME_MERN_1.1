import React, { useEffect, useRef, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { LuSendHorizonal } from "react-icons/lu";
import { fetchAllMessages, sendNewMessage } from '../../services/apiChat';
import io from "socket.io-client"


// const ENDPOINT = "http://localhost:5000";
const ENDPOINT = "https://mrn1-task.onrender.com";
var socket, selectChatCompare;

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const { user, selectedChat,notifications,setNotifications } = ChatState();
    const message = useRef('');
    const [allMessages, setAllMessages] = useState([]);
    const containerRef = useRef();
    const [socketConnect,setSocketConnect]=useState(false);
    const [typing,setTyping]=useState(false);
    const [isTyping,setIsTyping] = useState(false);
    const lastTypingTimeRef = useRef(null);
    const typingTimeOutRef = useRef(null);


    useEffect(() => {
        if (user) {
            socket = io(ENDPOINT);
            socket.emit('setup', user);
            socket.on('connected',()=>{
                setSocketConnect(true);
            });
            socket.on('typing',()=>{setIsTyping(true)});
            socket.on('stop typing',()=>{setIsTyping(false)});

        }
    }, [user]);

    useEffect(()=>{
        if(socketConnect){
            socket.on('message recieved',(newMessage_recieved)=>{
                if(!selectChatCompare  || selectChatCompare._id != newMessage_recieved.chat._id){
                   if( !notifications?.includes(newMessage_recieved)){
                    setNotifications([...notifications,newMessage_recieved]);
                    console.log(notifications);
                    setFetchAgain(!fetchAgain);
                   }
    
                }else{
                    setAllMessages([...allMessages,newMessage_recieved]);
                }
            })
        }
       
    });


    const fetchMessages = async () => {
        const { data } = await fetchAllMessages(selectedChat?._id, user.token);
        setAllMessages(data);
        socket.emit('join chat', selectedChat._id);
    }
   
    useEffect(() => {
        if (user && selectedChat) {
            fetchMessages();
            selectChatCompare = selectedChat
        }
    }, [user, selectedChat])


    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [allMessages]);

    const sendMessage = async () => {
        socket.emit('stop typing', selectedChat._id);
        setTyping(false);
        if (message.current.val == "") return;
        const payload = {
            content: message.current.value,
            chatId: selectedChat._id,
        };
        try{
            const { data } = await sendNewMessage(payload, user.token)
            message.current.value = "";
            socket.emit('new message', data);
            setAllMessages([...allMessages, data]);
            setFetchAgain(!fetchAgain);
        }catch(err){
            console.log('need toaster')
        }


    }
    const typeOfMsg = (msg) => {
        if (msg?.sender._id != user?._id) return 'justify-start '
        return ' justify-end'
    }
    const sendOnEnter = (e) => {
        if (e.key == 'Enter') sendMessage();
    }

    const typingCheck = ()=>{
        if(!socketConnect)return;
        if(!typing){
            console.log('setting to true')
            setTyping(true);
            socket.emit('typing',selectedChat._id);
        }
       lastTypingTimeRef.current = new Date().getTime();

       if(typingTimeOutRef.current)clearTimeout(typingTimeOutRef.current);

       typingTimeOutRef.current = setTimeout(()=>{
        let currentTime = new Date().getTime();
        let diff = currentTime - lastTypingTimeRef.current;
        console.log(diff)
        if(diff>3000){
            socket.emit('stop typing', selectedChat._id);
            setTyping(false);
        }
       },3000)
    }

    return (
        <div className='flex flex-col h-screen'>
            <div className='flex justify-center p-2 text-3xl bg-slate-400'>Chat..</div>
            <div className='flex-grow  bg-slate-300 overflow-auto' ref={containerRef} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {
                    selectedChat && <>
                        {allMessages?.map((msg => {
                            return (<div className={`flex ${typeOfMsg(msg)}`}><div className='p-1 px-3 m-1 mx-2 rounded-lg bg-gray-200   '>{msg.content}</div></div>)
                        }))}
                    </>}
                {!selectedChat && <div className='flex m-24 justify-center items-center'>Select a Chat </div>}
                {isTyping &&<div>Typing...</div>}
            </div>
            <div className={`h-16 flex justify-center items-center ${!selectedChat ? 'opacity-50 pointer-events-none' : ''} `} >
                <input onChange={typingCheck} onKeyDown={(e) => sendOnEnter(e)} ref={message} defaultValue={message.current.value} className='m-2  bg-gray-400 rounded-3xl p-2 w-3/4' />
                <LuSendHorizonal onClick={sendMessage} className='cursor-pointer w-7 h-7' />
            </div>
        </div>
    )
}

export default SingleChat