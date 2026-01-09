import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { setRemoveCartItem, setUpdateQuantity } from "../redux/userSlice";
import { current } from "@reduxjs/toolkit";
// import { setAddToCart, setDecrementQty, setIncrementQty } from "../redux/userSlice";

function CartItemsCard({ data }) {
    // const {cartItems} = useSelector(state=>state.user)
    // console.log("quantity",data.quantity)
    const dispatch = useDispatch();
    //    const [quantity, setQuantity] = useState(data.quantity)
     const handleIncrease = (id,currentQty) => {
      dispatch(setUpdateQuantity({id,quantity:currentQty+1}))

    }
    const handleDecrease = (id,currentQty) => {
       dispatch(setUpdateQuantity({id,quantity:currentQty-1}));
    }
    return (
        <div className="flex items-center  justify-between  bg-linear-to-br from-white-100 to-gray-100 p-4 gap-5 rounded-xl 
           shadow border-gray-700">
            <div className="flex items-center gap-5">
                <img src={data.image} alt={data.name}
                    className="w-20 h-20 object-cover rounded-lg "
                />
                <div>

                    <h1 className="font-medium text-gray-800">{data.name}</h1>
                    <p className="font-medium text-gray-600">Qty:{data.quantity}</p>
                    <p className="font-medium text-gray-600">₹{data.price * data.quantity}</p>

                    <div>

                        {/* <button className="px-2 py-1 hover:bg-gray-100 active:-translate-0.5 transition-all" onClick={handleDecrease}>
                                                <FaMinus size={12} />
                                            </button>
                                            <span >{data.quantity}</span>
                                            <button className="px-2 py-1 hover:bg-gray-100 active:-translate-0.5 transition-all" onClick={handleIncrease}>
                                                <FaPlus size={12} />
                                            </button>
                                            */}
                    </div>
                </div>

            </div>
            <div className="flex items-center gap-3 rounded-lg  shadow-md">
                {
                    data.quantity >1 ?(
                <button onClick={()=>handleDecrease(data.id,data.quantity)} className="p-2 bg-gray-100 rounded0full hover:bg-gray-200 rounded-lg active:-translate-0.5 transition-all duration-200 cursor-pointer">
                    <FaMinus size={12} />
                </button>
                    ):
                    (
                           <button 
                           onClick={()=>dispatch(setRemoveCartItem(data.id))}
                            className="p-2 bg-gray-100 rounded0full hover:bg-gray-200  rounded-lg active:-translate-0.5 transition-all duration-200 cursor-pointer">
                    <MdDelete size={15} />
                </button>

                    )
}
                <span >{data.quantity}</span>
                <button onClick={()=>handleIncrease(data.id,data.quantity)}className="p-2 bg-gray-100 rounded0full hover:bg-gray-200 rounded-lg active:-translate-0.5 transition-all duration-200 cursor-pointer">
                    <FaPlus size={12} />
                </button>

             
            </div>
        </div>
    )
}
export default CartItemsCard;