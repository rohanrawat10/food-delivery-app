import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import  {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import {serverUrl} from "../config.js"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.js";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
export default function SignUp(){
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64232";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const navigate = useNavigate();
const [showPassword,setShowPassword] = useState(false)
const [fullName,setFullName] = useState("");
const [email,setEmail] = useState("");
const [mobile,setMobile] = useState("");
const [password,setPassword] = useState("");
const [role,setRole] = useState("user");
const [error,setError] = useState("");
const [loading,setLoading] = useState(false);
const dispatch = useDispatch();
const toggelPassword = ()=>{
    setShowPassword((prev)=>!prev);
};
  const handleSignUp = async ()=>{
    setLoading(true)
    try{
        const result = await axios.post (`${serverUrl}/api/auth/signup`,{
            fullName:fullName.trim(),
            email:email.trim().toLowerCase(),
            mobile:mobile.trim(),
            password:password.trim(),
            role:role.trim()
        },{withCredentials:true})
        dispatch(setUserData(result.data));
        setFullName("");
        setEmail("");
        setMobile("");
        setPassword("");
        setRole("user");
        navigate("/");
        setError(""); 
        setLoading(false);
    }
    catch (err) {
      setLoading(false)
    const msg = err.response?.data?.message || "Something went Wrong"
    setError(msg)
  if (err.response) {
    console.error("Backend error status:", err.response.status);
    console.error("Backend response data:", err.response.data);
  } else if (err.request) {
    console.error("No response received:", err.request);
  } else {
    console.error("Error setting up request:", err.message);
  }
}ss
  }

const handleSignUpWithGoogle = async()=>{
  if(!mobile.trim()){
    // alert("mobile Number is required")
     return setError("Enter Mobile Number")
    // disabled={!}
    
   }
   const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth,provider);
  try{
  const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,{
    fullName:result.user.displayName,
    email:result.user.email,
    mobile:mobile .trim(),
    role,
  },{withCredentials:true})
  setMobile("");
 dispatch(setUserData(data))
 setError("");
  navigate("/")
}catch(err){
    console.log("Google SignIn Errors:",err)
        setError(err.response?.data?.message || "Google signup failed");

  }
}
  
    return(
        <div className='min-h-screen  w-full flex items-center justify-center p-4'
        style={{backgroundColor:bgColor}}
        
        >
        <div className='bg-white  rounded-xl shadow-lg w-full max-w-md p-8 border-1px'
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
                    <p className={`text-gray-600 m-5`}>Log in or Sign Up </p>
                        <div className={`mb-4`}>
                         
                        <input 
                        type="text"
                        onChange={(e)=>setFullName(e.target.value)}
                         className={`w-full border rounder-lg px-3 py-2 focus:outline-none focus:border-orange-500 rounded-lg`}
                        value={fullName}
                         style={{
                            border:`1px solid ${borderColor}`

                         }}
                         placeholder="Enter your fullname"
                         required
                         />
                        </div>
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
                        {/* mobile */}
                          <div className={`mb-4`}>
                        <input 
                        type="text"
                        value={mobile}
                        onChange={(e)=>setMobile(e.target.value)}
                         className={`w-full border rounder-lg px-3 py-2 focus:outline-none rounded-lg`}
                         
                         style={{
                            border:`1px solid ${borderColor}`

                         }}
                         placeholder="Enter your number"
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
                        {/* number */}
                                 <div className={`mb-4`}>
                       <div className={`flex-gap-2`}>
                       {
                        ["admin","user","deliveryBoy"].map((r)=>(
                            <button key={r}
                            className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors m-0.5 cursor-pointer active:translate-y-2px" 
                          
                            onClick={()=>setRole(r)}
                            style={
                                role==r?
                                {backgroundColor:primaryColor,color:"white"}:{border:`1px solid ${primaryColor}`,color:primaryColor}}>{r}</button>
                        ))
                       }
                        </div>
                          </div>  
                    

                 <button className={`w-full font-semibold py-2 rounded-lg bg-[#ff4d2d] text-white 
    

    hover:drop-shadow-lg
    active:translate-y-[1px]
    // active:border inset-0.5
    transition-all duration-200
            `
        }
        onClick={handleSignUp}
                 disabled={loading}
                 >
                  {loading?<ClipLoader size={20} color="white"/>:"Sign Up"}
                    {/* Sign Up */}
                 </button>
             {error &&
               <p className="text-red-500 text-center m-[3px]">*{error}</p>
             }
                 <button className="w-full mt-4 flex items-center justify-center gap-2 border
                 rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100" onClick={handleSignUpWithGoogle}>
                    <FcGoogle size={20}/>
                    <span>Sign Up with Google</span>
                    </button>
                    <p className="mt-2 text-center">Already have an account? <Link to="/signin"><span className="text-[#ff4d2d]">Sign In</span></Link></p>

        </div>
        </div>
     )
}