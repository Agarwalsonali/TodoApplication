import { useState  } from "react";
import InputBox from "../components/InputBox";
import RightPart from "../components/RightPart";
import { useNavigate ,useParams} from "react-router-dom";
import axios from 'axios'
import Button from "../components/Button";
export default function EditTodo() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [updatedTitle,setUpdatedTitle] = useState("");
  const [updatedDescription,setUpdatedDescription] = useState("");
  const [updatedDeadLine,setUpdatedDeadLine] = useState("");

  const editTodo = async()=>{
    const response =await axios.put(`http://localhost:3030/api/v1/todos/edit/${id}`,
      {
        title:updatedTitle,
        description:updatedDescription,
        deadLine:updatedDeadLine
      },
      {
     headers:{
      Authorization: "Bearer " + localStorage.getItem("token")
    }
    })
    console.log(response);
    navigate('/dashboard');
  }
    
    
  // const [allTodo,setAllTodo] = useState([]);
    return (
      <div className="min-h-screen flex bg-gray-100">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-white shadow-md">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Update Your Todo</h1>
  
            <div className="space-y-5">
              {/* Title Input */}
              <div>
                <InputBox onChange = {(e)=>{
                  setUpdatedTitle(e.target.value);
                }} id={"title"} placeholder={"Update title"} className = {"w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"} type={"text"} label={"Title"} labelColor={"black"}/>
               
              </div>
  
            
              <div>
                <label htmlFor="description" className="block text-sm  text-black  font-semibold mb-1">
                  Description
                </label>
                <textarea
                  onChange = {(e)=>{
                    setUpdatedDescription(e.target.value);
                  }}
                  
                  id="description"
                  placeholder="Update description"
                  rows="4"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                ></textarea>
              </div>
  
              {/* Deadline */}
              <div>
                <InputBox  onChange = {(e)=>{
                    setUpdatedDeadLine(e.target.value);
                  }} id={"deadline"} placeholder={"Update title"} className = {"w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"} type={"date"} label={"Deadline"} labelColor={"black"}/>
                
              </div>
  
              {/* Update Button */}
              <div className="text-center">
                <Button label={"Update Todo"} bgColor={'orange'} onClick={()=>{
                  editTodo();
                }}/>
                
              </div>
            </div>
          </div>
        </div>
  
        {/* Right: Info Panel / Graphic */}
        <RightPart/>
      </div>
    );
  }
  