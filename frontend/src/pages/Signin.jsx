import Appbar from "../components/Appbar"
import Button from "../components/Button"
import InputBox from "../components/InputBox"
import SideBar from "../components/SideBar"
import ButtonWarning from "../components/ButtonWarning"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
export default function Signin()
{
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    return  <>
        <Appbar/>
        <div className='bg-amber-300 flex h-full w-full'>
           <SideBar/>
       <div className="bg-gray-800 w-1/2 h-full p-8 flex flex-col justify-center items-center">
           <div className='w-100'>
           <h2 className="text-3xl font-semibold text-white mb-6 text-center">Login Your Account</h2>
           
           <InputBox onChange = {(e)=>{
            setUsername(e.target.value);
           }} placeholder={"Enter your Name"} label={"Username"} id={"username"} type={"text"}/>
           <InputBox onChange= {(e)=>{
            setPassword(e.target.value);
           }} placeholder={"Enter your Password"} label={"Password"} id={"password"} type={"password"}/>
           
           <Button onClick={async()=>{
                try {
                    const response = await axios.post('http://localhost:3030/api/v1/user/signin',{
                        username,
                        password
                    });

                    console.log("Server Response:", response.data); 

                    if(response.data.token) {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("username", username);
                    } else {
                        console.log("No token received!");
                    }
                } catch (err) {
                    console.error("Signin error:", err);
                }
                navigate('/dashboard');
            }} label={"Sign in"} bgColor={"green"}/>
           <ButtonWarning label={"Don't have an account?"} to={'/signup'} buttonText={"sign up"}/>
           </div>
       </div>
   </div>
    </>
}