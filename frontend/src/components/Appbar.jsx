import { Link,useNavigate } from "react-router-dom"
export default function Appbar()
{
    const navigate = useNavigate();
    const logoutHandle = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate('/signin');
    }
    const loginHandler = ()=>{
        navigate('/signin');
    }
    const token = localStorage.getItem("token");
    return <div className="bg-green-100 w-full">
    <div className="navbar navbar-light bg-light flex justify-between items-center p-4 shadow-md">
        {/* App Name Section */}
        <div className="text-xl font-bold text-gray-800 p-3">
           <Link to={'/'}> My App</Link>
        </div>
        
  
        
        {/* Navigation Links Section */}
        <div className="flex space-x-12 text-lg text-gray-700 items-center">
            <div className="hover:text-amber-600 cursor-pointer transition duration-200">
               <Link to={'/'}> Home </Link>
            </div>
            <div className="hover:text-amber-600 cursor-pointer transition duration-200">
               <Link to={'/about'}>About us</Link>
            </div>
            <div className="hover:text-amber-600 cursor-pointer transition duration-200">
               <Link to={'/contact'}> Contact Us</Link>
            </div>
            {token?<div className="hover:text-amber-600 cursor-pointer transition duration-200" onClick={logoutHandle}>
               Logout
            </div>:
            <div className="hover:text-amber-600 cursor-pointer transition duration-200" onClick={loginHandler}>
            Login
         </div>}
            <div className="rounded-full h-12 w-12 bg-slate-200  flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    <button>U</button>
                </div>
            </div>
        </div>
    </div>
</div>

}