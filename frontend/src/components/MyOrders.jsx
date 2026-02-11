import { IoArrowBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import UserOrderCard from "./UserOrderCard";
import OwnerOrderCard from "./OwnerOrderCard";
import { useEffect } from "react";
import { setMyOrders, updateRealtimeOrderStatus } from "../redux/userSlice";
import { Socket } from "socket.io-client";

function MyOrders() {
  const { userData, myOrders, socket } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    // if(!socket || !userData?._id) return;
    // const handleNewOrder=(data)=>{
    // if(data?.shopOrders?.owner?._id == userData._id){
    //   dispatch(setMyOrders([data,...myOrders]))
    // }
    // };
    // socket?.on("newOrder",handleNewOrder)


    socket?.on('newOrder', (data) => {
      if (data.shopOrders?.owner._id == userData._id) {
        dispatch(setMyOrders([data, ...myOrders]))
      }
    })
    socket?.on('update-status', ({ orderId, shopId, status, userId })=> {
      if(userId == userData._id){
        dispatch(updateRealtimeOrderStatus({orderId,shopId,status}))
    }
  })
  return () => {
    socket?.off('newOrder')
    socket?.off('update-status')
  }
}, [socket, userData?._id, dispatch])
return (
  <div className="w-full min-h-screen bg-[#fff9f6] flex  justify-center px-4">
    <div className="w-full max-w-[800px] p-4">
      {
        userData?.role == "user" ? (
          <div className="flex items-center gap-5 mb-6">
            <IoArrowBackSharp
              size={35}
              className="fixed top-5 left-5 z-50 text-[#ff4d2d] cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>) :
          (
            <div className="flex items-center gap-5 mb-6">
              <IoArrowBackSharp
                size={35}
                className="fixed top-5 left-5 z-50 text-[#ff4d2d] cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>)

      }
      <h1 className="text-2xl font-semibold text-center mb-6">
        My Orders
      </h1>
      <div className="space-y-6">{
        <div className="space-y-6">
          {Array.isArray(myOrders) && myOrders.map((items, index) => (
            userData?.role === "user" ? (
              <UserOrderCard data={items} key={index} />
            ) : userData?.role === "admin" ? (
              <OwnerOrderCard data={items} key={index} />
            ) : null
          ))}
        </div>
      }
      </div>
    </div>
  </div>
)
}
export default MyOrders;