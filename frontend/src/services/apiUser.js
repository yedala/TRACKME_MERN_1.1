import axios from "axios";
import { FETCH_USER } from "../utils/Api";


const fetchConfig = (token)=>{
    return  {
        headers:{
            Authorization: `Bearer ${token}`,
        }
     }
}

export const fetchUser = async(id,token)=>{
    let config = fetchConfig(token);
    const data = await axios.get(FETCH_USER+`${id}`,config);
    return data;
}