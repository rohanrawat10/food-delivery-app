import axios from "axios"
import { useNavigate } from "react-router-dom"
import { serverUrl } from "../config"
import { useState } from "react"
import { TiStar } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";


function UserOrderCard({ data }) {
    const navigate = useNavigate()
    const [selectedRating, setSelectedRating] = useState({})//itemId:rating
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }

    const handleRating = async (itemId, rating) => {
        try {
            const numericRating = Number(rating);
            await axios.post(`${serverUrl}/api/item/rating`, { itemId, rating: numericRating }, { withCredentials: true })
            setSelectedRating(prev => ({
                ...prev, [itemId]: numericRating
            }))
        }
        catch (err) {
            console.log("handle rating error:", err)
        }
    }
    console.log("data", data)
    return (
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <div className="flex justify-between border-b pb-2">
                <div>
                    <p className="font-semibold">
                        order #{data?._id?.slice(-6)}
                    </p>
                    <p className="text-sm text-gray-500">
                        Date:{formatDate(data?.createdAt)}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">{data.paymentMethod?.toUpperCase()}</p>
                    <p className="font-sm text-blue-500">{data.shopOrders?.[0].status}</p>
                </div>
            </div>

            {
                data.shopOrders.map((shopOrder, index) => (
                    <div className="border rounded-lg p-3 bg-[#fffaf7] space-y-3 " key={index}>
                        <p>{shopOrder.shop.name}</p>
                        <div className="flex space-x-4 overflow-x-auto pb-2">
                            {
                                shopOrder.shopOrderItems.map((item, index) => (
                                    <div key={index} className="flex-shrink-0 w-40  border rounded-lg p-2 bg-white">
                                        <img src={item.item.image} alt="" className="w-full h-24 object-cover rounded" />
                                        <p className="text-sm text-center font-semibold mt-1">{item.name}</p>
                                        <p className="text-sm text-center">₹{item.price}*{item.quantity}</p>
                                        {
                                            shopOrder.status == "delivered" && <div className="flex space-x-1 mt-2">
                                                {/* {   [1,2,3,4,5].map((star)=>(
                                                <button  className={`text-lg ${selectedRating[item.item._id]>=star?"text-yellow-500 outline-black":"text-white outline-black"}`} onClick={()=>handleRating(item.item._id,star)}>★</button>
                                        //    <TiStar className={`text-lg ${selectedRating[item.item._id]>=star?"text-yellow-500 bg-amber-400":"text-white"}`}/>
                                           ))} */}
                                                {[1, 2, 3, 4, 5].map((star) => {
                                                    const currentRating = Number(selectedRating[item.item._id] || 0);
                                                    const isSelected = currentRating >= star;

                                                    return (
                                                        <button
                                                            key={star}
                                                            onClick={() => handleRating(item.item._id, star)}
                                                            className="text-2xl cursor-pointer transition duration-200"
                                                            style={{
                                                                color: isSelected ? "#facc15" : "white", // yellow-400 when selected
                                                                WebkitTextStroke: isSelected ? "0px" : "1px black"
                                                            }}
                                                        >
                                                            ★
                                                        </button>
                                                    );
                                                })}


                                            </div>
                                        }

                                    </div>

                                ))
                            }
                        </div>
                        <div className="flex justify-between items-center border-t pt-2">
                            <p className="font-semibold">Subtotal:₹{shopOrder.subTotal}</p>
                            <span className="text-sm font-medium text-blue-500">{shopOrder.status}</span>
                        </div>
                    </div>
                ))
            }
            <div className="flex justify-between items-center boreder-t pt-2">
                <p className="font-semibold">Total:₹{data.totalAmount}</p>
                <button className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 rounded-lg text-sm" onClick={() => navigate(`/track-order/${data._id}`)}>Track Order</button>
            </div>

        </div>
    )
}
export default UserOrderCard;