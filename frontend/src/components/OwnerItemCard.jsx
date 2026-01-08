import axios from "axios";
import { TiEdit } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../config";
import { setMyShopData } from "../redux/ownerSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
export default function OwnerItemCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [popup,setPopup] = useState(false)
const handleDeleteItem =async(itemId)=>{
                try{
                const result = await axios.get(`${serverUrl}/api/item/delete/${data._id}`,
                {withCredentials:true}
                )
               dispatch(setMyShopData(result.data))
                }
                catch(err){

                }
    }
  return (
    <div
      className="relative bg-linear-to-br from-gray-100 to-gray-200
                 rounded-3xl overflow-hidden shadow-lg
                 hover:shadow-2xl 
                 flex flex-col h-full transform hover:scale-110 transition-all duration-300"
                 
    >
      {/* menu */}
      < button className="absolute top-1 text-gray-700 right-1  
                   backdrop-blur-md p-2 rounded-full
                   hover:bg-orange-100 z-10"
                   onClick={()=>setPopup(!popup)}
                   >{   
                    popup?
                     <RiDeleteBack2Fill size={20}/>:
                  < BsThreeDotsVertical size={20}/>
                
                   }
                    </button>
                    {
                    popup &&(
                      <>
                      <span className="bg-white">
                       <button
        className="absolute top-10 right-3 bg-white/70
                   backdrop-blur-md p-2 rounded-full
                   hover:bg-orange-100 z-10"
        onClick={() => navigate(`/edit-item/${data._id}`)}
      >
        <TiEdit size={20} />
      </button>
      <button
        className="absolute top-20 right-3 bg-white/70
                   backdrop-blur-md p-2 rounded-full
                   hover:bg-orange-100 z-10"
        onClick={handleDeleteItem}
      >
        <AiTwotoneDelete size={20}/>
      </button>
      </span>
      </>
                    )
                   }
      

      {/* IMAGE */}
      <div className="h-40 flex items-center  p-4">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover drop-shadow-xl transform hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-t-3xl p-4 flex flex-col flex-1">

        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          Name: {data.name}
        </h3>

        <p className="text-sm text-gray-700 mt-2">
          Price: ₹{data.price}
        </p>

        <p className="text-sm text-gray-700">
          Category: {data.category}
        </p>

        <p className="text-sm text-gray-700">
          Food Type: {data.foodType}
        </p>

        {/* keeps bottom spacing equal */}
        <div className="mt-auto" />
      </div>
    </div>
  );
}
