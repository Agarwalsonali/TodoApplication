import { useEffect, useState } from 'react';
import Appbar from '../components/Appbar'
import Button from '../components/Button'
import InputBox from '../components/InputBox';
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useFetchTodos } from '../helper';
export default function Dashboard() {
  const navigate = useNavigate();
  const [title,setTitle] = useState("");
  const [description,setDescription]  = useState("");
  const [deadLine,setDeadLine] = useState("");
  const [allTodo,setAllTodo] = useState([]);
  useEffect(()=>{
    const fetchTodos = async()=>{
      try{
        const data = await useFetchTodos();
        setAllTodo(data);
      }
      catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    fetchTodos();
  },[])

  const handleDelete = async(id)=>
  {
    try{
        await axios.delete(`http://localhost:3030/api/v1/todos/delete/${id}`,{
        headers:{
          Authorization: "Bearer " + localStorage.getItem("token")
        }
        
      })
      await fetchTodos();
    }
    catch(err)
    {
      console.error("Error deleting todo:", err);
    }
  }

  return (
    <div className='w-full h-s'>
      <Appbar />
      {/* start from here */}
      <div className='w-full h-screen bg-black flex'>
       
      <div className='h-screen w-5/8 bg-orange-500 p-6 overflow-auto'>
      <h2 className="text-3xl font-semibold text-white mb-6 text-center">Todo List</h2>

      <table className="w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-blue-100 text-gray-700">
            <th className="py-2 px-15 text-left">Task</th>
            <th className="py-2 px-18 text-left">Description</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Deadline</th>
            {/* <th className="py-2 px-4 text-left">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {allTodo.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{item.title.length >20 ? item.title.slice(0,20) + "..." : item.title}</td>
              <td className="py-2 px-4">{item.description.length >25 ? item.description.slice(0,25) + "..." : item.description}</td>
              <td className="py-2 px-4">{item.status}</td>
              <td className="py-2 px-4">
              {new Date(item.deadLine).toISOString().split('T')[0]}
              </td>

              <td className="py-2 px-4 space-x-2">
              <div className='flex items-center justify-center'>
                <Button label={"Edit"} bgColor={"orange"} onClick={()=>{
                  navigate(`/edit/${item._id}`)
                }}/>
                &nbsp; &nbsp;
                <Button label={"Delete"} bgColor={"orange"} onClick={async()=>{
                    // console.log(item._id);
                    
                   await axios.delete(`http://localhost:3030/api/v1/todos/delete/${item._id}`,{
                    headers:{
                      Authorization: "Bearer " + localStorage.getItem("token")
                    }
                  })
                  const data = await useFetchTodos();
                  setAllTodo(data);
                }}/>
                
            </div>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


     
        <div className='h-screen w-3/8 flex items-center justify-center bg-red-600'>
          <div className="bg-slate-500 p-6 shadow-md rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Task</h2>
            <div className="space-y-4">
            
            <InputBox onChange={(e)=>{
              setTitle(e.target.value);
            }} placeholder={"Enter Title"} label={"Title"} id={"title"} type={"text"} value={title}/>
            <div>
            <div className="flex font-semibold mb-2">
                <label htmlFor="description" className="text-white">Descriptioin</label>
            </div>
                <textarea
                  onChange={(e)=>{
                    setDescription(e.target.value)
                  }}
                  value={description}
                  id='description'
                  name="description"
                  placeholder="Task Description"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
             

            <InputBox onChange={(e)=>{
              setDeadLine(e.target.value)
            }} label={"DeadLine"} type={"date"} placeholder={"Enter the Deadline"} id={"deadline"} value={deadLine}/>
             

             
              <div className="flex justify-center">
                <Button onClick={async()=>{
                   const isLoggedIn = localStorage.getItem("token");
                   if(!isLoggedIn)
                   {
                    navigate('/signup')
                   }
                  
                  
                   const response = await axios.post(
                    'http://localhost:3030/api/v1/todos/todo',
                    {
                      title: title,
                      description: description,
                      deadLine: deadLine
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                      }
                    }
                  );
                 const data =await useFetchTodos();
                 console.log(data);
                 
                  setAllTodo(data);

                 
                  setTitle("");
                  setDescription("");
                  setDeadLine("");
                  console.log("res",response);
  
                    
                }} label={"Add Task"} bgColor={"green"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
