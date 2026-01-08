import { IoStarSharp } from "react-icons/io5";
import { FaLeaf } from "react-icons/fa6";
import { GiChickenOven } from "react-icons/gi";
import { RiStarSLine } from "react-icons/ri";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
export default function FoodItemsCard({ data }) {
    const [quantity,setQuantity] = useState(0)
    const renderRating = (rating)=>{
        const stars = [];
        for(let i=1;i<=5;i++){
            stars.push(
                (i<rating)?(<IoStarSharp key={i} size={20} className="text-yellow-500" />):(<RiStarSLine key={i} size={20} className="text-yellow-500" />)
            )
        }
        return stars
    }
    const handleIncrease = ()=>{
          const newQuantity = quantity + 1
              setQuantity(newQuantity)
             
    }
     const handleDecrease = ()=>{
        if(quantity>0){
          const newQuantity = quantity-1
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

 <div
      className="relative bg-linear-to-br from-gray-100 to-gray-200
                 rounded-3xl overflow-hidden shadow-lg
                 hover:shadow-2xl 
                 flex flex-col h-full transform hover:scale-110 transition-all duration-300"
                 
    >
      <div className="relative w-full h-[140px] flex justify-center items-center bg-white">
     <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
       {
            data.foodType == "veg"? <FaLeaf size={18} className="text-green-900"/>:<GiChickenOven size={18} className="text-red-700"/>
          }
          </div>
              <img src={data.image}
              alt={data.name}
              className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-100"
              />
</div>
      {/* IMAGE */}
      {/* <div className="h-40 flex items-center  p-4">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover drop-shadow-xl transform hover:scale-110 transition-transform duration-300"
        />
      </div> */}

      {/* CONTENT */}
      <div className="bg-white rounded-t-sm p-4 flex flex-col flex-1">

        <h3 className="text-md font-semibold text-gray-900 line-clamp-1">
           {data.name}
        </h3>

        {/* <p className="text-sm text-gray-700 mt-2">
           ₹{data.price}
        </p> */}
         <div className="flex items center justify-between    ">
            <span> 
              <p className="text-md text-gray-900 mt-2 ">₹{data.price}</p>  
            </span>
            <div className="flex items-center  rounded-full overflow-hidden
             shadow-md
            ">
             <button className="px-2 py-1 hover:bg-gray-100 active:-translatey-0.5 transition-all" onClick={handleDecrease}>
              <FaMinus size={12}/>
             </button>
             <span >{quantity}</span>
             <button className="px-2 py-1 hover:bg-gray-100 active:-translate-0.5 transition-all" onClick={handleIncrease}>
                <FaPlus size={12}/>
             </button>
             <button className=" bg-orange-200 px-2 py-1 hover:bg-orange-300 active:-translate-0.5 transition-all">
<MdAddShoppingCart size={18}/>
             </button>
            </div>
         </div>
   <div className="flex items-center  mt-1">{renderRating(data.rating?.average || 0)}</div>
       
      </div>
    </div>

  );
}
