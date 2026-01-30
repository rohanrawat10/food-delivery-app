import axios from "axios"
import { FaPhoneAlt } from "react-icons/fa"
import { PiShoppingBagDuotone } from "react-icons/pi"
import { serverUrl } from "../config"
import { useDispatch } from "react-redux"
import { updateOrderStatus } from "../redux/userSlice"
import { useEffect, useState } from "react"
function OwnerOrderCard({ data }) {
    console.log("data from redux:",data.shopOrders.availableDeliveryBoys)
    const dispatch = useDispatch()
    const availableBoys = data.shopOrders.availableDeliveryBoys || []

    // console.log("console",data?.shopOrders?.[0])
    // console.log(data.s)
    // console.log(Array.isArray(data.shopOrders)) // should be true
    // console.log("order data", data)
    // console.log("shop orders", data?.shopOrders)
    const handleUpdateStatus = async(orderId,shopId,status)=>{
        console.log("orderId:", orderId);
  console.log("shopId:", shopId);
  console.log("status:", status);
        try{
         const result = await axios.post(`${serverUrl}/api/order/update-status/${orderId}/${shopId}`,{status},{withCredentials:true})
          dispatch(updateOrderStatus({orderId,shopId,status,availableDeliveryBoys:result.data.availableDeliveryBoys}))
        //    setAvailableBoys(result.data. availableDeliveryBoys)
          console.log("handle Update status data:",result.data)
        
        
    }
        catch(err){
              console.log("handle update status",err)
              console.log("handler update err",err.response?.data)
        }
    }
    return (
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <div>
                <h2 className="text-lg font-semibold text-gray-800">{data?.user?.fullName}</h2>
                <p className="text-sm text-gray-500 ">{data?.user?.email}</p>
                <p className="flex items-center gap-2 text-sm text-gray-600 mt-1"><FaPhoneAlt /><span>{data?.user?.mobile}</span></p>

            </div>
            <div className="flex items-start gap-2 text-gray-600 text-sm">
                <p>{data?.deliveryAddress?.text}</p>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2">
                {
                    data?.shopOrders?.shopOrderItems?.map((item, index) => (
                        <div key={index} className="flex-shrink-0 w-40  border rounded-lg p-2 bg-white">
                            <img src={item.item.image} alt="" className="w-full h-24 object-cover rounded" />
                            <p className="text-sm text-center font-semibold mt-1">{item.name}</p>
                            <p className="text-sm text-center">₹{item.price}*{item.quantity}</p>
                        </div>

                    ))
                }
                {/* {data?.shopOrders?.map((shopOrder) =>
  shopOrder.shopOrderItems.map((item, index) => (
    <div key={index} className="flex-shrink-0 w-40 border rounded-lg p-2 bg-white">
      <img src={item.item.image} alt="" className="w-full h-24 object-cover rounded" />
      <p className="text-sm text-center font-semibold mt-1">{item.name}</p>
      <p className="text-sm text-center">₹{item.price} × {item.quantity}</p>
    </div>
  ))
)} */}




            </div>
            <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
             <span className="text-sm font-semibold"> Status: <span className="font-semibold capitalize text-[#ff4d2d]">{data.shopOrders.status}</span></span>  
            <select value={data.shopOrders.status} onChange={(e)=>handleUpdateStatus(data._id,data.shopOrders.shop._id,e.target.value)} className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 border-amber-600">
            {/* <option>Change</option> */}
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="out for delivery">Out for delivery</option>
            </select>
            </div>
            {/* {
                data.shopOrders.status === "out for delivery"&&
                <div className="mt-13 p-2 border rounded-lg text-sm bg-orange-50"> */}
                    {/* { !data.shopOrders.assignedDeliveryBoy ?
                    (
 <p> Available Delivery Boys:</p>
                    )
                        
                         :
                         (
                             <p>assigned to</p>
                         )
                    }
               {
                availableBoys.length >0?(
                                   availableBoys.map((value,index)=>(
                                    <div key={index} className="text-gray-800">{value.fullName}-{value.mobile}</div>

  
                                   ))
                ):data.shopOrders.assignedDeliveryBoy?<div>{data.shopOrders.assignedDeliveryBoy.fullName}</div>
                :<div>
                    Waiting for delivery boy to accept
                    </div>
               }
                    </div>
            } */}
{data.shopOrders.status === "out for delivery" && (
  <div className="mt-3 p-2 border rounded-lg text-sm bg-orange-50">
    
    {data.shopOrders.assignedDeliveryBoy ? (
      <div>
        <p className="font-semibold">Assigned Delivery Boy:</p>
        <p>
          {data.shopOrders.assignedDeliveryBoy.fullName} –{" "}
          {data.shopOrders.assignedDeliveryBoy.mobile}
        </p>
      </div>
    ) : availableBoys.length > 0 ? (
      <>
        <p className="font-semibold">Available Delivery Boys:</p>
        {availableBoys.map((boy, index) => (
          <div key={index}>
            {boy.fullName} – {boy.mobile}
          </div>
        ))}
      </>
    ) : (
      <p>Waiting for delivery boy to accept</p>
    )}
  </div>
)}


            <div className="text-right font-bold text-gray-800 text-sm">
               Total: ₹{data.shopOrders.subTotal}
                </div>


        </div>
    )
}
export default OwnerOrderCard;