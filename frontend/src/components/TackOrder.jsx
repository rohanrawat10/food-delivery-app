import { useNavigate, useParams } from "react-router-dom"
import { serverUrl } from "../config"
import { useEffect, useState } from "react"
import { IoArrowBackSharp } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import axios from "axios"
import DeliveryBoyTracking from "./DeliveryBoyTracking";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
export default function TrackOrder() {
    const {socket} = useSelector(state=>state.user)
    const navigate = useNavigate()
    const { orderId } = useParams()
    const [currentOrder, setCurrentOrder] = useState()
    const [liveLocation,setLiveLocation] = useState({})
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }
    const capitalize = (str) => str ? str[0].toUpperCase() + str.slice(1) : ""
    // console.log(
    //     "current data",currentOrder
    // )
    const handleGetOrder = async (orderId) => {
        if (!orderId) return
        try {
            const result = await axios.get(`${serverUrl}/api/order/get-order-by-id/${orderId}`, { withCredentials: true })
            setCurrentOrder(result.data)
            console.log("hand get order", result.data)

        }
        catch (err) {
            console.error("handle get order async:", err)
        }
    }

    useEffect(()=>{
        if(!socket)return;
      socket.on("updateDeliveryLocation",({
         deliveryBoyId,
         latitude,
       longitude
      })=>{
setLiveLocation(prev=>({
    ...prev,
    [deliveryBoyId]:{lat:latitude,lon:longitude}
}))
      })
    },[socket])

    useEffect(() => {
        // handleGetOrder()
        if (orderId) handleGetOrder(orderId)
    }, [orderId])
    // console.log(currentOrder?.shopOrders?.[0]?.assignedDeliveryBoy?.mobile)
    return (

        <div className=" p-4 flex flex-col gap-6">
            {/* Left arrow */}
            <div className=" relative flex items-center gap-4 top-20px left-20px z-10 mb-10px cursor-pointer">
                <IoArrowBackSharp size={30} className="text-[#ff4d2d]" onClick={() => {
                    navigate("/")
                }} />

                <h1 className="mx-auto text-2xl font-semibold">
                    Order Details
                </h1>
            </div>
            {/* <button className="absolute left-4">
    ←
  </button> */}

            {/* Center text */}

            {
                currentOrder?.shopOrders?.map((shopOrder, index) => (
                    // <div className="bg-white p-4 rounded-2xl shadow-md border border-orange-50  space-y-4" key={index}>
                    //     <div>
                    //         <p>{shopOrder.shop.name}</p>
                    //         <p><span>Items</span>{shopOrder.shopOrderItems.map(i=>i.name).join(",")}</p>
                    //         </div>
                    //     </div>

                    <div className="flex justify-between border-b pb-2 m-4 " key={index}>
                        <div>
                            <p className="font-semibold">
                                order #{shopOrder?._id?.slice(-6)}
                            </p>
                            <p className="text-sm  font-semibold">
                                {/* Date:{formatDate(currentOrder?.createdAt)} */}
                                Delivery boy:{shopOrder?.assignedDeliveryBoy?.mobile}
                            </p>
                        </div>
                        <div className="text-right">
                            {
                                shopOrder?.[0]?.status !== "delivered" &&
                                <p className="text-sm text-blue-500">{capitalize(currentOrder?.shopOrders?.[0]?.status)}</p>
                            }

                            <p className="font-sm text-blue-500 flex flex-col">Amount:₹{currentOrder?.totalAmount}</p>
                        </div>


                    </div>

                ))
            }
            {
                (currentOrder?.shopOrders?.[0]?.assignedDeliveryBoy && currentOrder?.shopOrders?.[0]?.status !== "delivered") &&
                <div className="h-[400px] w-full  rounded-2xl overflow-hidd">
                    <DeliveryBoyTracking data={
                        {
                            deliveryBoyLocation: liveLocation[currentOrder?.shopOrders?.[0]?.assignedDeliveryBoy?._id]|| {
                                lat: currentOrder.shopOrders?.[0]?.assignedDeliveryBoy.location.coordinates[1],
                                lon: currentOrder.shopOrders?.[0]?.assignedDeliveryBoy.location.coordinates[0]

                            },
                            customerLocation: {
                                lat: currentOrder?.deliveryAddress?.latitude,
                                lon: currentOrder?.deliveryAddress?.longitude
                            }
                        }
                    } />
                </div>
            }

            {
                currentOrder?.shopOrders?.[0]?.status == "delivered" && (
                    <div className="flex flex-col justify-center items-center m-20">
                        <h1 className="text-green-600 flex"><FaCheckCircle size={30} /></h1>
                        <h1 className="text-2xl text-green-500 font-semibold">{capitalize(currentOrder?.shopOrders?.[0]?.status)}</h1>
                        <p className="text-green-400">
                            Your order has been successfully delivered.
                        </p>
                        <p className="text-green-400">
                            We hope your meal arrived hot, fresh, and delicious.
                        </p>
                        <p className="text-green-400">
                            Thank you for choosing us, and enjoy your food!

                        </p>
                    </div>
                )

            }
        </div>

    )
}
