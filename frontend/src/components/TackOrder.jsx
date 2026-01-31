import { useNavigate, useParams } from "react-router-dom"
import { serverUrl } from "../config"
import { useEffect, useState } from "react"
import { IoArrowBackSharp } from "react-icons/io5";

import axios from "axios"

export default function TrackOrder(){
    const navigate = useNavigate()
    const {orderId} = useParams()
    const [currentOrder,setCurrentOrder] = useState()
     const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }
    const handleGetOrder = async(orderId)=>{
        try{
     const result = await axios.get(`${serverUrl}/api/order/get-order-by-id/${orderId}`,{withCredentials:true})
        //   setCurrentOrder(result.data)    
     console.log("hand get order",result.data)  

    }
        catch(err ){
      console.error("handle get order async:",err)
        }
    }
    useEffect(()=>{
        handleGetOrder()
    },[orderId])

    return(
       <div className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
  {/* Left arrow */}
  <div className=" relative flex items-center gap-4 top-20px left-20px z-10 mb-10px" onClick={() => {
                    navigate("/")
                }}>
    <IoArrowBackSharp size={30} className="text-[#ff4d2d]"  />

                 <h1 className="mx-auto text-2xl font-semibold">
    Order Details
  </h1>
  </div>
  {/* <button className="absolute left-4">
    ←
  </button> */}

  {/* Center text */}

  {/* {
    currentOrder?.shopOrders?.map((shopOrder,index)=>(
        // <div className="bg-white p-4 rounded-2xl shadow-md border border-orange-50  space-y-4" key={index}>
        //     <div>
        //         <p>{shopOrder.shop.name}</p>
        //         <p><span>Items</span>{shopOrder.shopOrderItems.map(i=>i.name).join(",")}</p>
        //         </div>
        //     </div>

         <div className="flex justify-between border-b pb-2" key={index}>
                <div>
                    <p className="font-semibold">
                        order #{shopOrder?._id?.slice(-6)}
                    </p>
                    <p className="text-sm text-gray-500">
                        Date:{formatDate(data?.createdAt)}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">{shopOrder.paymentMethod?.toUpperCase()}</p>
                    <p className="font-sm text-blue-500">{shopOrder.shopOrders?.[0].status}</p>
                </div>
            </div>
    ))
  } */}
</div>

    )
}