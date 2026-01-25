import { useSelector } from "react-redux"
import Nav from "./Nav"
import { serverUrl } from "../config"
import { useEffect } from "react"
import axios from "axios"

export default function DeliveryBoy() {
  const { userData, currentAddress } = useSelector(state => state.user)
      const getAssignments = async()=>{
        try{
            const result = await axios.get(`${serverUrl}/api/order/get-assignments`,{withCredentials:true})
                 console.log(result.data)
        }
        catch(err){
       console.log("get assignment:",err)
        }
      }
      useEffect(()=>{
        getAssignments()
      },[userData])
  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Nav />

      <div className="w-full max-w-[800px] flex flex-col gap-5 items-center">
        <div className="bg-white rounded-2xl shadow-md p-5 w-[90%] border border-orange-100 text-center">
          
          <h1 className="text-xl font-bold text-[#db3a1d]">
            Hey, {userData.fullName}
          </h1>

          <p className="text-[#cf351ac4] mt-2 text-sm">
            {currentAddress}
          </p>

        </div>
      </div>
    </div>
  )
}
