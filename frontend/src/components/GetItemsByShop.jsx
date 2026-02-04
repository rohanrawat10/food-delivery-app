import axios from "axios"
import { serverUrl } from "../config"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { FaStore } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import FoodItemsCard from "./FoodItemsCard";
import { IoIosArrowRoundBack } from "react-icons/io";
import { setCurrentCity } from "../redux/userSlice";
export default function GetItemsByShop(){
    const navigate = useNavigate();
    const {shopId} = useParams();
    const [items,setItems] = useState([])
    const [shop,setShop] = useState([])
    const handleGetItemsByShop= async (params) =>{
   try{
         const result  = await axios.get(`${serverUrl}/api/item/get-by-shop/${shopId}`,{withCredentials:true})
         setShop(result.data.shop)  
         setItems(result.data.items)
         console.log(" handle get items By Shop Data",result.data)
        }
   catch(err){
    console.error("Handle shop Error:",err)
   }
    }
    
    
    useEffect(()=>{
      handleGetItemsByShop()
    },[shopId])
    return(
        <div className="min-h-screen bg-gray-50">
            <button className="absolute top-4 left-4 z-20 flex items-center gap-2
            bg-black/50 hover:bg-black/70 text-orange-600 font-bold px-3 py-z rounded-full shadow
            transition
            " onClick={()=>navigate("/")}>
                <span><IoIosArrowRoundBack size={30}/></span>
                </button>
        {shop && (
            <div className="relative w-full h-64 md:h-80 lg:h-95">
            <img src={shop.image} alt="" className="w-full h-full object-cover"/>
           {/* <div className=" absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 flex flex-col justify-center items-center text-center px-4">
            <FaStore  className="text-white text-4xl mb-3 drop-shadow-md"/>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">{shop.name}</h1>
            </div> */}
            <div className="max-w-7xl mx-auto px-6 py-5"  >
             <h2 className="flex items-center justify-center gap-3 text-3xl font-bold mb-10 text-gray-800">
                 <GiForkKnifeSpoon color="red" /> 
                 Menu
             </h2>
            {
                items.length>0?(
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        {items.map((item)=>(
                         <FoodItemsCard data={item}/>
                        ))}
                        </div>
                ):(<p className="text-center text-gray-500 text-lg">No Items Available</p>)
            }
                </div>
            </div>
        )}
        </div>
    )
}