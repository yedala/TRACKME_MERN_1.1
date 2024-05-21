import React, { useEffect, useState } from 'react'
import Task from './Task';
import CreateTask from './CreateTask';
import { useSelector } from 'react-redux';
import { fetchData } from '../../services/apiTask';


const TodoList = () => {
  console.log('todo')
  const [fetchAllTasks, setfetchAllTasks] = useState(0);
  const [createTask, setCreateTask] = useState(false);
  const token = useSelector(store => store?.user?.userData?.token);
  const [allTasks, setallTasks] = useState();


  useEffect(() => {
    fetchAllTasksTable();
  }, [fetchAllTasks]);

  const CreateATask = () => {
    setCreateTask(true);
  }

  const fetchAllTasksTable = async () => {
    setallTasks(await fetchData(token));
    console.log(allTasks);
  }


  return (
    <>
      {createTask && <CreateTask setCreateTask={setCreateTask} setfetchAllTasks={setfetchAllTasks} />}
      <div className='w-full '>
        <div className='flex justify-between items-center   m-1'>
          <h2 className='mx-1 text-2xl'>My TodoList</h2>
          <button className=' bg-orange-300 p-2 my-3 rounded-md' onClick={CreateATask}>Create  New Task ➕</button>
        </div>
      

        <div>
          {allTasks?.data?.map((task,index) => {
            return <Task setfetchAllTasks={setfetchAllTasks} key={task._id} task={task} token={token} index={index+1}/>
          })}
        </div>

      </div>
    </>
  )
}

export default TodoList