import { useSelector } from "react-redux"
import { MdOutlineAddBusiness } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import useGetMyShop from "../hooks/useGetMyShop";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { TiEdit } from "react-icons/ti";
import { IoRestaurant } from "react-icons/io5";
import OwnerItemCard from "./OwnerItemCard";
export default function OwnerDashboard() {
    useGetMyShop();
    const { myShopData } = useSelector(state => state.owner)
    const navigate = useNavigate();
    
    return (
        <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center">
            <Nav />
            {
                !myShopData &&
                <div className="flex justify-center items-center p-4 sm:p-6">
                    <div className="w-full max-w-sm bg-white shadow-lg 
               rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex flex-col items-center text-center">
                            <MdOutlineAddBusiness size={28} className="text-[#ff4d2d] w-16 h-16 sm:w-20 mb-4" />
                            <h2 className="text-x sm:text-2xl font-bold text-gray-800 mb-2">Add your restaurant</h2>
                            <p className="text-gray-600 mb-4 text-sm sm:text-base">
                                Turn hunger into orders—add your restaurant and reach thousands of foodies
                            </p>
                            <button
                                className="bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md
                             hover:bg-orange-600 transition-all duration-200 active:border-inset 
                                  active:-translate-y-0. cursor-pointer" onClick={() => navigate("/create-edit-shop")}
                            >Get Started</button>
                        </div>

                    </div>
                </div>
            }

            {
                myShopData &&
                <div className="w-full flex flex-col items-center gap-6 sm:px-6 ">
            <h1 className="text-2xll flex items-center font-semibold sm:text-3xl text-[#ff4d2d] gap-1
            mt-8 text-center">
                <GiForkKnifeSpoon className=" text-[#ff4d2d] w-16 sm:w-29 sm:h-20 "/>{myShopData.name}
                </h1>
            <div className=" bg-white
  shadow-lg hover:shadow-2xl
  rounded-xl
  overflow-hidden
  border border-orange-100
  transition-all duration-300 ease-out
  hover:scale-[0.98] 
  w-full max-w-3xl
  relative
            ">
                  <div className="absolute top-1 right-1  text-white p-2 rounded-full shadow-md
                   hover:bg-orange-600  active:translate-y-1  duration:200 transition-all ease-out cursor-pointer
                  " onClick={()=>navigate("/create-edit-shop")}>
                       <TiEdit size={20}/>
                    </div>
                <img src={myShopData.image} alt={myShopData.name} className="w-full h-55 sm:h-75 object-cover background-black"/>
                     <div className="p-4 sm:p-6">
                         <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{myShopData.name}</h1>
                         <p className="text-gray-500">{myShopData.city},{myShopData.state}</p>
                        <p className="text-gray-500">{myShopData.address}</p>
                      </div>
                    </div>
                    {
                        myShopData?.items?.length === 0 &&(
                       <div className="flex justify-center items-center p-4 sm:p-6">
                    <div className="w-full max-w-sm bg-white shadow-lg 
               rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex flex-col items-center text-center">
                            <IoRestaurant size={28} className="text-[#ff4d2d] w-16 h-16 sm:w-20 mb-4" />
                            <h2 className="text-l sm:text-2xl font-bold text-gray-800 mb-2">Add a dish</h2>
                            <p className="text-gray-600 mb-4 text-sm sm:text-base">
                              Add your dishes to start serving customers.
                            </p>
                            <button
                                className="bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md
                             hover:bg-orange-600 transition-all duration-200 
                                  active:translate-y-1 cursor-pointer" onClick={() => navigate("/add-item")}
                            >Get Started</button>
                        </div>

                    </div>
                </div>  
                  )  }
                  {
  myShopData?.items?.length > 0 && (
    <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
      {myShopData?.items?.map((item,index) => (
        <OwnerItemCard data={item} key={index} />
      ))}
    </div>
  )
}
                </div>
            }
        </div>
    )
}