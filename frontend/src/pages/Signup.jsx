import Appbar from "../components/Appbar"
import Button from "../components/Button"
import InputBox from "../components/InputBox"
import SideBar from "../components/SideBar"
import ButtonWarning  from "../components/ButtonWarning"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Signup()
{
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName ,setLastName] = useState("");
    return        <div
    className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
   
>
        <Appbar/>
        <div className='bg-amber-300 flex h-full w-full'>
          
           
            
        <SideBar/>
        <div className="bg-gray-800 w-1/2 h-full p-8 flex flex-col justify-center items-center">
            <div className='w-100'>
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">Create an Account</h2>
            
            <InputBox onChange={(e)=>{setUsername(e.target.value)}} placeholder={"Enter your Name"} label={"Username"} id={"username"} type={"text"}/>
            <InputBox onChange={(e)=>{setPassword(e.target.value)}} placeholder={"Enter your Password"} label={"Password"} id={"password"} type={"password"}/>
            <InputBox onChange={(e)=>{setFirstName(e.target.value)}} placeholder={"Enter your Firstname"} label={"First Name"} id={"firstname"} type={"text"}/>
            <InputBox onChange={(e)=>{setLastName(e.target.value)}} placeholder={"Enter your Lastname"} label={"Last Name"} id={"lastname"} type={"text"}/>
            <Button onClick={async()=>{
                const response = await axios.post('http://localhost:3030/api/v1/user/signup',{
                    username,
                    password,
                    firstName,
                    lastName
                })
                console.log(response.data.token);
                
                localStorage.setItem("token",response.data.token);
                localStorage.setItem("username",username);
                navigate('/dashboard')
            }} label={"Sign up"} bgColor = {"green"}/>
           
            <ButtonWarning label={"Already have an account? " } buttonText={"Sign in"} to={"/signin"} />    </div>
            </div>
        </div>

</div>
    
   
}
            
        