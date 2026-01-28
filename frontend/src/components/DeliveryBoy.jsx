import { useSelector } from "react-redux"
import Nav from "./Nav"
import { serverUrl } from "../config"
import { useEffect, useState } from "react"
import axios from "axios"
import { FaLocationDot } from "react-icons/fa6";
import { FaMapLocation } from "react-icons/fa6";
export default function DeliveryBoy() {
  const { userData, currentAddress } = useSelector(state => state.user)
  const [availableAssignments,setAvailableAssignments] = useState([])   
  const getAssignments = async()=>{
        // console.log("sending", lat, lon)

        try{
            const result = await axios.get(`${serverUrl}/api/order/get-assignments`,{withCredentials:true})
                 setAvailableAssignments(result.data)
                  console.log("get Assignmenst console",result.data)
                  
        }
        catch(err){
       console.log("get assignment error:",err)
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
           <p className="flex justify-center mt-5"><FaLocationDot /></p>
          <p className="text-[#cf351ac4] mt-2 text-sm">
            {currentAddress}
          </p>

        </div>
        <div className="bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100">
          <h1 className="text-lg font-semibold mb-4 flex items-center p-2">Available Order</h1>
             <div className="space-y-4">
           {
            availableAssignments.length > 0 ?
            (availableAssignments.map((a,index)=>(
              <div className="border rounded-lg p-4 flex justify-between items-center " key={index}>
              <div className="">
               <p className=" text-sm font-semibold">{a?.shopName}</p>
               <p className="flex gap-1 text-sm text-gray-500"><span className=" text-gray-500"><FaMapLocation size={15}  /></span>{a?.deliveryAddress.text}</p>
               <p className="text-xs text-gray-400">Qty:{a.items.length} | ₹{a.subTotal}</p>
                </div>
                <button className="bg-orange-500 m-2 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600">Accept</button>

                </div>
            ))):
            (<p className="text-xs text-gray-400">No Available Orders</p>)
            
            }
             </div>
        </div>
      </div>
      </div>
   
  )
}
