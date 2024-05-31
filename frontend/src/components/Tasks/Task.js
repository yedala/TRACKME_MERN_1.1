import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { deleteTask } from '../../services/apiTask';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateLoader } from '../../utils/userSlice';

const Task = ({ task, index, token, setfetchAllTasks }) => {
  const [date, setdate] = useState();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  useEffect(() => {
    const d = new Date(task.createdDate);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString().slice(-2);

    const formattedDate = `${day}/${month}/${year}`;
    setdate(formattedDate);
  }, [task]);


  const openMenu = () => {
    setMenu(!menu);
  }


  const DeleteTask = async () => {
    dispatch(updateLoader(true))
    const deleted = await deleteTask(token, task._id);
    if (deleted) {
      dispatch(updateLoader(false))
      setfetchAllTasks(prev => prev + 1);
    }
    else {
      dispatch(updateLoader(false))
      console.log('need a toaster')
    }
  }
  const EditTask = () => {
    const data = {
      token: token,
      id: task._id,
    };
    navigate(`/tasks/editTask/${task._id}`, { state: data });
  }
  const getStatusClass = (status) => {
    switch (status) {
      case 'InProgress':
        return 'bg-yellow-300';
      case 'Done':
        return 'bg-green-300';
      default:
        return 'bg-blue-300';
    }
  };

  return (
    <div className='flex justify-between shadow-lg bg-gray-100 px-7 py-6 mx-5 my-2'>
      <div className='px-2'> {index}.</div>
      <div className='w-1/6'>{task.title}</div>
      <div className='w-3/6 h-auto overflow-auto '>{task.content}</div>
      <div className='w-1/6'>{date}</div>
      <div className=' w-1/6 flex justify-between items-center'>
        <button className={` w-24 px-2 p-2 truncate  rounded-lg ${getStatusClass(task.status)}`} title={task?.status} >{task.status}</button>
        <div className='mx-5 p-1 cursor-pointer relative'>
          <CiMenuKebab onClick={openMenu} />
          {menu && (
            <div className='absolute shadow-md bg-white w-24 py-1 rounded-lg z-10 '>
              <div className='p-2  hover:bg-gray-200 ' onClick={EditTask} >Edit</div>
              <div className='p-2  hover:bg-gray-200 ' onClick={DeleteTask} >Delete</div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Task