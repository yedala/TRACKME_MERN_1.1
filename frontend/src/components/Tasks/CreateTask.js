import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { createTask } from '../../services/apiTask';

const CreateTask = ({ setCreateTask , setfetchAllTasks}) => {
    const title = useRef();
    const content = useRef();
    const status = useRef();
    const token = useSelector(state => state?.user?.userData?.token);

    const handleCancel =()=>{
        setCreateTask(false);
    }
    const HandleSave = ()=>{
        const payload = {
            title: title.current.value,
            content: content.current.value,
            status: status.current.value,
        }
        const savedTask = createTask(token,payload);
        setCreateTask(false);
        setfetchAllTasks(true);

    }
    return (
        <div className='  w-screen h-screen absolute bg-blue-100 '>
            <h1 className=' text-3xl flex justify-center p-3'>Create a New Task</h1>

            <div className='p-9 flex flex-col justify-center items-center'>
                
                <input ref={title} type="text" className='w-4/5 p-3 mx-7 my-5 rounded-md' placeholder='Enter Title' />
                <textarea ref={content} className='w-4/5 h-auto p-3 mx-7 my-5 rounded-md' placeholder='Enter Description '></textarea>
                <select ref={status} name="status" placeholder="Status"className='w-4/5 p-3 mx-7 my-5 rounded-md'>
                    <option value="ToDO" >To Do</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Done" >Done</option>
                </select>
                <div className=' w-4/5 flex justify-end'>
                    <button className='p-2 font-bold rounded-lg px-4 my-10 mx-5 bg-red-400' onClick={handleCancel}>Cancel</button>
                    <button className='p-2 font-bold rounded-lg px-4 my-10 bg-green-400' onClick={HandleSave}>Save</button>
                </div>
            </div>
            
        </div>
    )
}

export default CreateTask