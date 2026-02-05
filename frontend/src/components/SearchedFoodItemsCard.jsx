import { IoStarSharp } from "react-icons/io5";
import { FaLeaf } from "react-icons/fa6";
import { GiChickenOven } from "react-icons/gi";
import { RiStarSLine } from "react-icons/ri";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setAddToCart } from "../redux/userSlice";
export default function SearchedFoodItemsCard({ data }) {
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state=>state.user)
    const [quantity, setQuantity] = useState(1)
    const renderRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                (i < rating) ? (<IoStarSharp key={i} size={20} className="text-yellow-500" />) : (<RiStarSLine key={i} size={20} className="text-yellow-500" />)
            )
        }
        return stars
    }
    const handleIncrease = () => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)

    }
    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1
            setQuantity(newQuantity)
        }
    }
    return (
        //    <div  className="group relative w-[130px] h-[130px] md:min-w-[180px] rounded-2xl
        //     border-2 border-orange-200 shrink-0 overflow-hidden bg-white
        //     shadow-xl shadow-gray-200 hover:shadow-lg transition-shadow">
        //       <div className="relative w-full h-[170px] flex justify-center items-center bg-white">
        //         <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
        //           {
        //             data.foodType == "veg"? <FaLeaf size={18} className="text-green-900"/>:<GiChickenOven size={18} className="text-red-700"/>
        //           }
        //           </div>
        //               <img src={data.image}
        //               alt=""
        //               className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        //               />
        //       </div>

        //          <div className="flex-1 flex flex-col p-4">
        //             <h1 className="font-semibold text-gray-900 text-bas">{data.map}</h1>

        //          </div>
        //     </div>

    //    
    <div
  className="relative bg-linear-to-br from-gray-100 to-gray-200
  rounded-3xl overflow-hidden shadow-lg
  hover:shadow-2xl
  flex flex-row gap-2 p-2
  transition-all duration-300"
>
  {/* LEFT: IMAGE */}
  <div className="relative w-[140px] h-[140px] shrink rounded-2xl overflow-hidden bg-white">
    <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow z-10">
      {
        data.foodType === "veg"
          ? <FaLeaf size={16} className="text-green-900" />
          : <GiChickenOven size={16} className="text-red-700" />
      }
    </div>

    <img
      src={data.image}
      alt={data.name}
      className="w-full h-full object-cover"
    />
  </div>

  {/* RIGHT: CONTENT */}
  <div className="flex flex-col flex-1 justify-between bg-white rounded-2xl p-4">

    {/* Title */}
    <h3 className="text-md font-semibold text-gray-900 line-clamp-1">
      {data.name}
    </h3>

    {/* Rating */}
    <div className="flex items-center mt-1">
      {renderRating(data.rating?.average || 0)}
    </div>

    {/* Price + Quantity + Cart */}
    <div className="flex items-center justify-between mt-3">
      <p className="text-md font-semibold text-gray-900">
        ₹{data.price}
      </p>

      <div className="flex items-center rounded-full overflow-hidden shadow-md">

        <button
          className="px-2 py-1 hover:bg-gray-100"
          onClick={handleDecrease}
        >
          <FaMinus size={12} />
        </button>

        <span className="px-2">{quantity}</span>

        <button
          className="px-2 py-1 hover:bg-gray-100"
          onClick={handleIncrease}
        >
          <FaPlus size={12} />
        </button>

        <button
          onClick={() =>
            dispatch(setAddToCart({
              id: data._id,
              name: data.name,
              price: data.price,
              image: data.image,
              shop: data.shop,
              quantity,
              foodType: data.foodType,
            }))
          }
          className={`px-2 py-1 transition-all
            ${cartItems.some(i => i.id === data._id)
              ? "bg-orange-100"
              : "bg-orange-300 hover:bg-orange-400"
            }`}
        >
          <MdAddShoppingCart size={18} />
        </button>

      </div>
    </div>
  </div>
</div>


    );
}
