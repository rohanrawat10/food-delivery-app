import { useSelector } from "react-redux"
import Nav from "./Nav"
import { serverUrl } from "../config"
import { useEffect, useState } from "react"
import axios from "axios"
import { FaLocationDot } from "react-icons/fa6";
import { FaMapLocation } from "react-icons/fa6";
import { current } from "@reduxjs/toolkit"
 import { LuPackageCheck } from "react-icons/lu";
import DeliveryBoyTracking from "./DeliveryBoyTracking"
import { FaPhoneAlt } from "react-icons/fa";
export default function DeliveryBoy() {
  const { userData, currentAddress } = useSelector(state => state.user)
  const [availableAssignments,setAvailableAssignments] = useState([])   
  const [currentOrder,setCurrentOrder] = useState()
  const [showOtpInput,setShowOtpInput] = useState(false)
  const getAssignments = async()=>{
        // console.log("sending", lat, lon)

        try{
            const result = await axios.get(`${serverUrl}/api/order/get-assignments`,{withCredentials:true})
                 setAvailableAssignments(result.data)
                  console.log("get Assignmenst console",result.data)
                   
        }
        catch(err){
        }       console.log("get assignment error:",err)

      }
      const acceptOrder = async(assignmentId)=>{
           try{
           const result = await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`,{withCredentials:true})
           await getCurrentOrder()     
           console.log(result.data)
          }
          catch(err){
            console.log("accept orders err:",err)
          }
      }
      const getCurrentOrder = async()=>{
        try{
          const result  = await axios.get(`${serverUrl}/api/order/current-order`,{withCredentials:true})
         setCurrentOrder(result.data)
          console.log("get current order",result.data)
        }
        catch(err){
          console.log("get current order error:",err)
        }
      }
      const handleSendOtp = (e)=>{
        setShowOtpInput(true)
      }
      useEffect(()=>{
        getAssignments()
        getCurrentOrder()
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
            {
              !currentOrder &&
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
                <button className="bg-orange-500 m-2 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600"
                onClick={()=>acceptOrder(a.assignmentId)}
                >Accept</button>

                </div>
            ))):
            (<p className="text-xs text-gray-400">No Available Orders</p>)
            
            }
             </div>
             
        </div>
          }
          {
            currentOrder && 
            <div className="bg-white rounded-2xl p-5 mb-5 shadow-md w-[90%] border border-orange-100">
              <h2><span className="text-orange-500 flex gap-1 justify-center pb-2"><LuPackageCheck size={25} /> Order</span></h2>
                <div className="border rounded-lg p-2 mb-3">
                  <p className="text-lg font-bold  mb-1">{currentOrder?.user?.fullName}</p>
                    <p className=" text-sm text-gray-600 flex gap-1"><span><FaPhoneAlt size={15}/></span>{currentOrder.user.mobile}</p>
                     <p className=" text-sm text-gray-600">{currentOrder.deliveryAddress.text}</p>
                     <p className="text-xs text-gray-500">Qty:{currentOrder.shopOrder.shopOrderItems.length} || ₹{currentOrder.shopOrder.subTotal}</p>
                  </div>
                  <DeliveryBoyTracking data={currentOrder}/>
                  { !showOtpInput ? 
                  (
            <button className="mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 
            rounded-xl shadow-md hover:bg-green-600 active:scale-95 trasition-all duration-200
            " onClick={()=>handleSendOtp()}>
              Delivered
              </button> ):(<div className="mt-4 p-4 border border-orange-200 rounded-xl bg-gray-50">
          <p className="text-sm text-gray-700">Enter OTP:</p>
          <input type="text" className="border w-full  rounded-xl border-orange-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"/>
               <button className="mt-4 w-full bg-orange-500 text-white font-semibold py-2 px-4 
            rounded-xl shadow-md hover:bg-orange-600 active:scale-95 trasition-all duration-200
            ">
              Enter
              </button>
                </div>
                )
}
              </div>
                 
          }
      </div>
      </div>
   
  )
}
