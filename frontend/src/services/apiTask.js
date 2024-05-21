import axios from 'axios';
import { ALLTASKS, CREATE_TASK, UPDATE_TASK } from '../utils/Api';


const fetchConfig = (token)=>{
    return  {
        headers:{
            Authorization: `Bearer ${token}`,
        }
     }
}
export  const fetchData =async (token)=>{
    let config = fetchConfig(token);
    const tasks = await axios.get(ALLTASKS,config);
    return tasks;
    
};

export const createTask = async(token, payload)=>{
    let config = fetchConfig(token);
    try{
        const task = await axios.post(CREATE_TASK, payload, config);
        return task;
    }
    catch(error){
        return null;
    }
 
}

export const deleteTask = async(token,id) =>{
    let config =fetchConfig(token);
    return await axios.delete(UPDATE_TASK +`${id}`,config);
}

export const getTask = async(token,id)=>{
    let config = fetchConfig(token);
    return await axios.get(UPDATE_TASK + `${id}`, config)

}

export const updateTask = async(token,id,payload) =>{
    let config = fetchConfig(token);
    return await axios.put(UPDATE_TASK+`${id}`,payload,config)
}