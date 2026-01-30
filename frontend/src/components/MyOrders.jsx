import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserOrderCard from "./UserOrderCard";
import OwnerOrderCard from "./OwnerOrderCard";

function MyOrders() {
    const { userData, myOrders } = useSelector(state => state.user)
    const navigate = useNavigate()
    return (
        <div className="w-full min-h-screen bg-[#fff9f6] flex  justify-center px-4">
            <div className="w-full max-w-[800px] p-4">
              {
                userData?.role =="user" ?(
                  <div className="flex items-center gap-5 mb-6">
                    <IoArrowBackSharp
                        size={35}
                        className="fixed top-5 left-5 z-50 text-[#ff4d2d] cursor-pointer"
                        onClick={() => navigate("/cart")}
                    />
                </div>):
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