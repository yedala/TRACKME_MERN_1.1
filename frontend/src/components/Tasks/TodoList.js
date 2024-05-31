import React, { useEffect, useState } from 'react'
import Task from './Task';
import CreateTask from './CreateTask';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../services/apiTask';
import { updateLoader } from '../../utils/userSlice';


const TodoList = () => {
  const [fetchAllTasks, setfetchAllTasks] = useState(0);
  const [createTask, setCreateTask] = useState(false);
  const token = useSelector(store => store?.user?.userData?.token);
  const [allTasks, setallTasks] = useState();
  const [prevFilter, setPrevFilter] = useState('ALL');
  const dispatch = useDispatch()



  useEffect(() => {
    fetchAllTasksTable('ALL');
  }, [fetchAllTasks]);

  const CreateATask = () => {
    
    try {
      setCreateTask(true);

    } catch (err) {
      console.log('need a toaster')

    }
  }

  const fetchAllTasksTable = async (filter) => {
    dispatch(updateLoader(true));
    try {
      setallTasks(await fetchData(token, filter));
      dispatch(updateLoader(false))

    } catch (err) {
      dispatch(updateLoader(false))
      console.log('need a toaster')
    }
  }

  const handleFilter = (e) => {
    if (prevFilter != e.target.value) {
      setPrevFilter(e.target.value);
      fetchAllTasksTable(e.target.value);
    }

  }


  return (
    <>
      {createTask && <CreateTask className="" setCreateTask={setCreateTask} setfetchAllTasks={setfetchAllTasks} />}
      {!createTask && <div className='w-full  '>
        <div className='flex justify-between items-center   m-1'>
          <h2 className='mx-1 text-2xl'>My TodoList</h2>
          <div>
            <select className='p-2 bg-blue-100 m-2 rounded-md' onClick={(e) => handleFilter(e)}>
              <option value="ALL" className='p-2 m-2 ' >ALL</option>
              <option value="Done">Done</option>
              <option value="ToDo">ToDo</option>
              <option value="InProgress">InProgress</option>
            </select>
            <button className=' bg-orange-300 p-2 my-3 rounded-md' onClick={CreateATask}>Create  New Task ➕</button>
          </div>
        </div>


        <div>
          {allTasks?.data?.map((task, index) => {
            return <Task setfetchAllTasks={setfetchAllTasks} key={task._id} task={task} token={token} index={index + 1} />
          })}
        </div>

      </div>}
    </>
  )
}

export default TodoList