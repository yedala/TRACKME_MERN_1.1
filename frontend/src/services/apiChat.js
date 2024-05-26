import axios from 'axios';
import { ALLCHATS, ALL_MESSAGES, ALL_USERS, CREATE_CHAT, SEND_MESSAGE } from '../utils/Api';


const fetchConfig = (token)=>{
    return  {
        headers:{
            Authorization: `Bearer ${token}`,
        }
     }
};

export const fetchAllUsers = async(search,token)=>{
    let config = fetchConfig(token)
    const data = await axios.get(`${ALL_USERS}?search=${search}`,config);
    return data;
};

export const createChat = async(payload,token) =>{
    let config = fetchConfig(token);
    const data = await axios.post(CREATE_CHAT, payload, config);
    return data;
}
export const fetchAllChats = async(token)=>{
    let config = fetchConfig(token);
    const data = await axios.get(ALLCHATS,config);
    return data;
}

export const fetchChatName = (users,userId)=>{
    let chatName;
    users?.map((u)=>{
        if(u._id != userId)chatName= u.name;
    });
    return chatName;
}
export const fetchChatImage = (users,userId)=>{
    let chatImage;
    users?.map((u)=>{
        if(u._id != userId)chatImage= u.pic;
    });
    return chatImage;
}

export const sendNewMessage = async(payload,token)=>{
    let config = fetchConfig(token);
    const data = await axios.post(SEND_MESSAGE,payload,config);
    return data;
};

export const fetchAllMessages = async(chatId,token)=>{
    let config = fetchConfig(token);
    const data = await axios.get(ALL_MESSAGES+`${chatId}`,config);
    return data;
}