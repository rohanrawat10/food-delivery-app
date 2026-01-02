import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import  {Link,NavLink,useNavigate} from "react-router-dom";
import axios from "axios";
import {serverUrl} from "../config.js"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.js";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
export default function SignIn(){
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64232";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const navigate = useNavigate();
const [showPassword,setShowPassword] = useState(false)
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [error,setError] = useState("")
const [loading,setLoading] =  useState(false);
const dispatch = useDispatch();
const toggelPassword = ()=>{
    setShowPassword((prev)=>!prev);
};
  const handleLogIn = async ()=>{
    setLoading(true);
    try{
        const result = await axios.post (`${serverUrl}/api/auth/signin/`,{
            email:email.trim().toLowerCase(),password:password.trim()
        },{withCredentials:true})
        dispatch(setUserData(result.data))
         navigate("/")
         setError("")
         setLoading(false)
    }
    catch (err) {
      setLoading(false)
      const msg = err.response?.data?.message || "Something Went Wrong";
      setError(msg)
  if (err.response) {
    console.error("Backend error status:", err.response.status);
    console.error("Backend response data:", err.response.data);
  } else if (err.request) {
    console.error("No response received:", err.request);
  } else {
    console.error("Error setting up request:", err.message);
  }
}

  }

  const handleSignInWithGoogle = async()=>{
     const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth,provider);
    try{
    const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,{
      email:result.user.email,
  
    },{withCredentials:true})
    console.log(data) 
    dispatch(setUserData(data))
    navigate("/")
  }catch(err){
      console.log("Google SignIn Errors:",err)
    }
  }
    
    return(
        <div className='min-h-screen  w-full flex items-center justify-center p-4'
        style={{backgroundColor:bgColor}}
        
        >
        <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-1px'
              style={{
    border:`1px solid ${borderColor}`

          }}
   >
        <h1 className={`text-3xl font-bold mb-2`}
            style={
                {
               color:primaryColor
                } }>
                    HungerStrike
                    </h1>
                        <div className={`m-2`}>
                         
                      
                         {/* Email */}
                          <div className={`mb-4`}>
                        <input 
                        type="text"
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                         className={`w-full border rounder-lg px-3 py-2 focus:outline-none rounded-lg`}
                         style={{
                            border:`1px solid ${borderColor}`

                         }}
                         placeholder="Enter your email"
                        required
                        />
                        </div>
                 
                    
                              {/* password */}
                          <div className={`mb-4`}>
                       <div className={`relative`}>
                        <input 
                        type={showPassword?"text":"password"}
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                         className={`w-full border rounder-lg px-3 py-2 focus:outline-none rounded-lg`}
                         style={{
                            border:`1px solid ${borderColor}`

                         }}
                         placeholder="Enter your password"
                         required
                         />
                          <button className='absolute right-3 top-[14px] cursor-pointer text-gray-500'onClick={toggelPassword}>{!showPassword?<FaRegEye />:<FaEyeSlash />}</button>
                        </div>
                         </div>
                    

                 <button className={`w-full font-semibold py-2 rounded-lg bg-[#ff4d2d] text-white 
    

    hover:drop-shadow-lg
    active:translate-y-[1px]
    active:border inset-0.5
    transition-all duration-200
            `
        }
        onClick={handleLogIn}
        disabled={loading}
                 >
                  {
                    loading?<ClipLoader size={20} color="white"/>: "Log in"
                  }
                   {/* Log in */}
                 </button>
              {
                error && <p className="text-red-500 text-center m-[3px]">*{error}</p>
              }
                 <button onClick={handleSignInWithGoogle} className="w-full mt-4 flex items-center justify-center gap-2 border
                 rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100">
                    <FcGoogle size={20}/>
                    <span>Sign in with Google</span>
                    </button>
                    <Link to="/signin/forgot-password">
                     <div className="text-center m-8 text-[#ff4d2d] font-medium cursor-pointer">
                    Forgot password
                 </div>
                    </Link>
                    <p className="mt-2 text-center">Don't have an account <Link to="/signup"><span className="text-[#ff4d2d]">Create account</span></Link></p>
                     
        </div>
        </div>
        </div>
     )
}