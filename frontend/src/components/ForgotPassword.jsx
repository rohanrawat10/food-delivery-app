import { useState } from "react"
import { Link,useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { serverUrl } from "../config";
import axios from "axios";
import { ClipLoader } from "react-spinners"
export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp,setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false)
    const handleSendOtp = async()=>{
        setLoading(true);
             try{
                const result = await axios.post(`${serverUrl}/api/auth/send-otp`,{email:email.trim().toLowerCase(),otp:otp.trim()},{withCredentials:true})
            console.log(result)
            setStep(2)
            setError("")
            // setLoading(true)
            }
            catch(err){
                
                const msg = err.response?.data?.message || "Something went wrong"
                setError(msg)
               console.log("backend error:",err.response?.data?.message)
            }
            finally{
                setLoading(false)
            }
    }
   const handleverifyOtp = async () => {
    setLoading(true);
    setError("");

    try {
        const result = await axios.post(
            `${serverUrl}/api/auth/verify-otp`,
            { email: email.trim().toLowerCase(), otp: otp.trim() },
            { withCredentials: true }
        );

        console.log(result);
        setStep(3); // OTP verified

    } catch (err) {
        const msg = err.response?.data?.message || "Something went wrong";
        setError(msg);
    } finally {
        setLoading(false); 
    }
};


    const handleResetPassword = async()=>{
        setLoading(true);
        if(newPassword != confirmPassword)
        {
            return  setError("New password doesn't Matches the Confirm password")
        }
        try{
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`,{email:email.trim().toLowerCase(),newPassword:newPassword.trim()},{withCredentials:true})
          navigate("/signin")
          setError("")
          setLoading(true)
          
        }catch(err){
            const msg = err.response?.data?.message || "Something Went Wrong"
            setError(msg)
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                <div className="flex items-center gap-4 mb-4">
                        <Link to="/signin">
                        <IoMdArrowRoundBack size={20} className="text-[#ff4d2d]" />
                        </Link>
                    <p className="text-xl text-center  text-[#ff4d2d]">Forgot password</p>
                </div>
                {step == 1
                    &&
                    <div>
                        <div className={`mb-4 `}>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                className={`w-full border-[1px] bourder-gray rounder-lg px-3  py-3 m-1 focus:outline-none r`}
                                placeholder="Enter your email"
                                required
                           />
                            </div>
                            <button className={
                                `w-full font-semibold py-3 px-3  rounded-lg 
                                bg-[#ff4d2d] text-white 
                                 hover:drop-shadow-lg
                                active:translate-y-[1px]
                                 active:border inset-0.5
                              transition-all duration-200
   
                                 `}
                                 onClick={handleSendOtp}
                              disabled={loading}
                            >
                                {
                                    loading ?<ClipLoader size={20} color="white"/>: "Get OTP"
                                }
                                {/* Get OTP */}
                            </button>
                            {
                                error && <p className="text-red-500 text-center m-[3px]">*{error}</p>
                            }
                        </div>
                   

                }
                {
                    step == 2 
                    &&
                    <div>
                        <div className="mb-4">
                          <input type="text"
                            value={otp}
                            onChange={(e)=>setOtp(e.target.value)}
                            className="w-full border-[1px] border-gray rounded-lg px-3 py-3  focus:outline-none 
                            "
                            placeholder="Enter otp"
                            required
                          />
                          </div>
                          <button
                          className="w-full font-semibold py-3 px-3 m-1 rounded-lg
                          bg-[#ff4d2d] text-white
                          hover:drop-shadow-2xl
                          active:trasnlate-y-[1px]
                          active:border inset-0.5
                          transition-all duration-200
                          "
                          onClick={handleverifyOtp}
                          disabled={loading}
                          >
                              {
                                    loading ?<ClipLoader size={20} color="white"/>: "Verify"
                                }
                            {/* Verify */}
                          </button>
                             {
                                error && <p className="text-red-500 text-center m-[3px]">*{error}</p>
                            }
                        </div>

                }
                
                {
                    step == 3 
                    &&
                    <div>
                        <div className="mb-4 ">
                            <input type="text"
                            value={newPassword}
                            onChange={(e)=>setNewPassword(e.target.value)}
                            className="w-full border-[1px] border-gray-200 rounded-lg  px-3 py-2  foucus:outline-none"
                            placeholder="Enter new password"
                            required
                            />
                            </div>
                            <div className="mb-4">
                            <input type="text" 
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            className="w-full border-[1px] border-gray-200 rounded-lg px-2 py-2  focus:outline-none"
                            placeholder="Confirm password"
                          required
                          />
                            </div>
                            <button className="
                            w-full font-semibold py-3 px-2 
                             rounded-lg
                            bg-[#ff4d2d] text-white
                            hover:drop-shadow-2xl
                            active:trasnlate-y-[1px]
                            "
                            onClick={handleResetPassword}
                            disabled={loading}
                            >
                                {
                                    loading?<ClipLoader size={20} color="white"/>:"Confirm"
                                }
                                {/* Confirm */}
                            </button>
                               {
                                error && <p className="text-red-500 text-center m-[3px]">*{error}</p>
                            }
                            </div>
                }

            </div>
        </div>


    )
    }