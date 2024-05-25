import {  createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatContext = createContext();

const ChatProvider = ({children})=>{
    const [selectedChat, setSelectedChat] = useState(null);
    const [user,setUser] = useState();
    const [chats, setChats] = useState([]);
    const getUser = useSelector(state => state?.user?.userData);

    useEffect(()=>{
        setUser(getUser);
    },[]);
    return (
        <ChatContext.Provider
        value={{
            selectedChat,
            setSelectedChat,
            user,
            setUser,
            chats,
            setChats
        }}
        >
            {children}
        </ChatContext.Provider>
    )

};

export const ChatState = ()=>{
    return useContext(ChatContext);
}
export default ChatProvider;