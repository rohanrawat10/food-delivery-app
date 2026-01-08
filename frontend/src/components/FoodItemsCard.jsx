import { IoStarSharp } from "react-icons/io5";
import { FaLeaf } from "react-icons/fa6";
import { GiChickenOven } from "react-icons/gi";
import { RiStarSLine } from "react-icons/ri";
export default function FoodItemsCard({ data }) {
    const renderRating = (rating)=>{
        const stars = [];
        for(let i=1;i<=5;i++){
            stars.push(
                (i<rating)?(<IoStarSharp className="text-yello-500" />):(<RiStarSLine lassName="text-yello-500" />)
            )
        }
        return stars
    }
  return (
   <div  className="group relative w-[130px] h-[130px] md:min-w-[180px] rounded-2xl
    border-2 border-orange-200 shrink-0 overflow-hidden bg-white
    shadow-xl shadow-gray-200 hover:shadow-lg transition-shadow">
      <div className="relative w-full h-[170px] flex justify-center items-center bg-white">
        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
          {
            data.foodType == "veg"? <FaLeaf size={18} className="text-green-900"/>:<GiChickenOven size={18} className="text-red-700"/>
          }
          </div>
              <img src={data.image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
      </div>
         <div className="flex items-center gap-1 mt-1">
          {
            renderRating(data.rating?.average ||0)
          }
         </div>
    </div>

  );
}
