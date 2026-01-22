import axios from "axios"
import { FaPhoneAlt } from "react-icons/fa"
import { PiShoppingBagDuotone } from "react-icons/pi"
import { serverUrl } from "../config"
import { useDispatch } from "react-redux"
import { updateOrderStatus } from "../redux/userSlice"
import { useState } from "react"
function OwnerOrderCard({ data }) {
    const dispatch = useDispatch()
    const [availableBoys,setAvailableBoys ] = useState([])
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
          dispatch(updateOrderStatus({orderId,shopId,status}))
           setAvailableBoys(result.data.availableBoys)
          console.log(result.data)
        
        
    }
        catch(err){
              console.log("handle update status",err)
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
            <select value={data.status} onChange={(e)=>handleUpdateStatus(data._id,data.shopOrders.shop._id,e.target.value)} className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 border-amber-600">
            {/* <option>Change</option> */}
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="out_for_delivery">Out for delivery</option>
            </select>
            </div>
            <div className="text-right font-bold text-gray-800 text-sm">
               Total: ₹{data.shopOrders.subTotal}
                </div>


        </div>
    )
}
export default OwnerOrderCard;