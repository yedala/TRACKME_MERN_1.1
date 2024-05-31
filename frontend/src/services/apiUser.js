import axios from "axios";
import { FETCH_USER, LOGOUT, PUBLLIC_KEY, TOKEN } from "../utils/Api";
import forge from 'node-forge';

const fetchConfig = (token)=>{
    return  {
        headers:{
            Authorization: `Bearer ${token}`,
        }
     }
}

// const fetchToken = ()=>{
//     const state = store.getState();
//     const token = state?.user?.userData?.token;
//     return token;
// }

export const fetchUser = async(id,token)=>{
    let config = fetchConfig(token);
    const data = await axios.get(FETCH_USER+`${id}`,config);
    return data;
}

export const encryptPassword = (password) =>{
    const publicKey = forge.pki.publicKeyFromPem(PUBLLIC_KEY);
    const encrypted = publicKey.encrypt(password, 'RSA-OAEP', {
        md: forge.md.sha256.create()
    });
    return forge.util.encode64(encrypted);
}

export const  refreshTokenUpdate = async(refreshToken,token)=>{
    let config = fetchConfig(token);
    const data = await axios.post(TOKEN,{refreshToken},config);
    return data;
}

export const userLogOut = async(token)=>{
    let config = fetchConfig(token);
    const data = await axios.post(LOGOUT,config);
    return data;
}