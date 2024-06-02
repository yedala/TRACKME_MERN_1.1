import React, { useEffect, useState, useRef } from 'react'
import Task from './Task';
import CreateTask from './CreateTask';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../services/apiTask';
import { updateLoader } from '../../utils/userSlice';
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { GrPrevious,GrNext  } from "react-icons/gr";


const TodoList = () => {
  const [fetchAllTasks, setfetchAllTasks] = useState(0);
  const [createTask, setCreateTask] = useState(false);
  const token = useSelector(store => store?.user?.userData?.token);
  const [allTasks, setallTasks] = useState();
  const dispatch = useDispatch();
  const search = useRef();
  const status = useRef();
  const timeline = useRef();
  const searchTimeRef = useRef();
  const [pageNo,setPageNo]= useState(1);




  useEffect(() => {
    fetchAllTasksTable({ search: 'ALL', status: 'ALL', timeline: 'ALL' ,pageNo: 1});
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

  const handleFilter = () => {
    let filter = {
      search: search.current.value,
      timeline: timeline.current.value,
      status: status.current.value,
      pageNo: pageNo,
    }
    fetchAllTasksTable(filter);

  }
  const handleSearch = () => {
    if (searchTimeRef.current) clearTimeout(searchTimeRef.current);
    searchTimeRef.current = setTimeout(() => {
      handleFilter();
    }, 1000);
  }

  const renderPageNumbers = ()=>{
    return Array.from({length: allTasks?.data?.totalPages}, (_,i)=> 
      <button
      key={i+1}
      className={`p-2 m-1 w-10 rounded-md  hover:bg-gray-300 ${allTasks?.data?.currentPage == i+1 ? 'bg-gray-400' : 'bg-gray-200'} `}
      onClick={()=>{setPageNo(i+1); handleFilter()}}
      >
        {i+1}
      </button>
    )
  }


  return (
    <>
      {createTask && <CreateTask className="" setCreateTask={setCreateTask} setfetchAllTasks={setfetchAllTasks} />}
      {!createTask && <div className='w-full  '>
        <div className='flex justify-between items-center m-1 my-2'>
          <h2 className='mx-1 text-2xl'>My TodoList</h2>
          <div className='flex items-center space-x-2'>
            <div className="flex items-center bg-blue-100 rounded-xl p-1">
              <IoSearchSharp className="text-lg" />
              <input
                className="p-1 bg-blue-100 rounded-xl w-64 ml-1 outline-none"
                ref={search}
                type="search"
                placeholder="Search..."
                onChange={handleSearch}
              />
            </div>
            <div className="flex items-center bg-blue-100 rounded-xl p-1">
              <MdOutlineTaskAlt className="text-lg" />
              <select
                className="p-1 bg-blue-100 ml-1 rounded-xl outline-none"
                ref={status}
                onChange={handleFilter}
              >
                <option value="ALL">ALL</option>
                <option value="Done">Done</option>
                <option value="ToDo">ToDo</option>
                <option value="InProgress">InProgress</option>
              </select>
            </div>
            <div className="flex items-center bg-blue-100 rounded-xl p-1">
              <LuCalendarDays className="text-lg" />
              <select
                className="p-1 bg-blue-100 ml-1 rounded-xl outline-none"
                ref={timeline}
                onChange={handleFilter}
              >
                <option value="ALL">ALL</option>
                <option value="7">Last 7Days</option>
                <option value="10">Last 10Days</option>
                <option value="30">Last 30Days</option>
              </select>
            </div>
            <div className='flex items-center bg-orange-300 p-2 rounded-md'>
              <IoCreateOutline className="text-lg" />
              <button
                className="bg-orange-300 px-1 rounded-md"
                onClick={CreateATask}
              >
                Create
              </button>
            </div>

          </div>
        </div>


        <div>
          {allTasks?.data?.tasks?.map((task, index) => {
            return <Task setfetchAllTasks={setfetchAllTasks} key={task._id} task={task} token={token} index={index + 1} />
          })}
        </div>
        <div className='flex justify-center items-center m-1 my-3'>
         <GrPrevious className=' bg-gray-200 w-10 rounded-md h-10 p-2 px-3 mx-2 hover:bg-gray-300 ' />
          {renderPageNumbers()}
          <GrNext className=' bg-gray-200 w-10 rounded-md h-10 p-2 px-3 mx-2 hover:bg-gray-300'/>
        </div>

      </div>}
    </>
  )
}

export default TodoList