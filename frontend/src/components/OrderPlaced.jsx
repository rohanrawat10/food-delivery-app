import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function OrderPlaced() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#fff9f6] flex flex-col justify-center items-center px-4 text-center relative overflow-hidden">
            <FaCheckCircle className="text-green-500 text-4xl mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h1>
            <p className="text-gray-500">Thank you for your order! 🍽️</p>
            <p className="text-gray-500">We’re preparing your food with care and it will be delivered to you shortly.</p>
            <p className="text-gray-500">We hope you enjoy every bite!</p>
            <button onClick={()=>navigate("/my-orders")} className="bg-[#ff4d2d] text-white px-5 py-1 m-3 rounded-lg text-lg font-medium transition-all cursor-pointer">My Orders</button>
        </div >
    )
}
export default OrderPlaced;