import { IoArrowBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddBusiness } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../config";
import { setMyShopData } from "../redux/ownerSlice";
export default function AddItems() {
    const navigate = useNavigate();
    const { myShopData } = useSelector(state => state.owner);
   
   const [dishName,setDishName] = useState("");
    const [price,setPrice] = useState(0);
    const [loading,setLoading] = useState(false);
    const [category,setCategory] = useState("");
    const [foodType,setFoodType] = useState("veg")
    const categories = [
         "snacks",
            "main course",
            "desserts",
            "pizza",
            "burgers",
            "sandwiches",
            "south indian",
            "north indian",
            "chinese",
            "fast food",
            "others"
    ]
    const [frontendImage,setFrontendImage] = useState(null);
    const [backendImage,setBackendImage] = useState(null)
    const dispatch = useDispatch();

       const handleImage = (e)=>{
        const file = e.target.files[0]
        if(!file) return;
        setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
       }
       const handleSubmit = async(e)=>{
        e.preventDefault();
        // setLoading(true)
        if (!backendImage) {
  alert("Please select a dish image");
  return;
}
        try{
            const formData = new FormData();
            formData.append("name",dishName);
            formData.append("category",category);
            formData.append("foodType",foodType);
            formData.append("price",Number(price))
            formData.append("image",backendImage)
            // if(backendImage){
            //  formData.append("image",backendImage)
            // }
           const result = await axios.post(`${serverUrl}/api/item/add-item`,
            formData,
            {
                withCredentials:true,
                   headers: { "Content-Type": "multipart/form-data" },
            })
          dispatch(setMyShopData(result.data))
          console.log("new dish",result.data)
          navigate("/")
          setLoading(false)
        }catch(err){
               console.log("Create/Edit shop error:",err)
        }
        finally{
                setLoading(false)
       }
       }

          return (
        <div className="flex justify-center flex-col items-center p-6 bg-linear-to-br from-orange-50 relative to-white  min-h-screen">
            <div className="absolute top-[20px] left-[20px] z-[10] mb-[10]">
                <IoArrowBackSharp size={30} className="text-[#ff4d2d]" onClick={() => {
                    navigate("/")
                }} />
            </div>

            <div className="max-w-sm w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
                <div className=" flex flex-col items-center mb-6">
                    <div className=" p-4 rounded-full mb-4 cursor-pointer">
                         {frontendImage ? (
    <img
      src={frontendImage}
      alt="Shop Preview"
      className=" w-20 h-20 rounded-full bg-orange-100 "
    />
  ) : (
    <MdOutlineAddBusiness
      size={35}
      className="text-[#ff4d2d] bg-orange-100 w-20 h-20"
    />
  )}
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                        {myShopData ?"Add Dish":"Edit Dish"}
                    </div>
                    <form className="space-y-5 w-full " onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dish Name</label>
                            <input type="text" placeholder="e.g pizza,burger"  value={dishName} onChange={(e)=>setDishName(e.target.value)}className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input type="number" placeholder=""  value={price} onChange={(e)=>setPrice(e.target.value)}className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" value={category}
                            onChange={(e)=>setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                          {
                            categories.map((cate,index)=>(
                             <option value={cate} key={index}>{cate}</option>
                            ))
                          }
                           </select>
                        </div>
                        
                             <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" value={foodType}
                            onChange={(e)=>setFoodType(e.target.value)}
                            >
                               
                                <option value="veg">Veg</option>
                                <option value="non-veg">Non-Veg</option>
                           </select>
                        </div>
                       <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1"> dish Image</label>
                            <input type="file" accept="image/*" onChange={handleImage}className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        </div>
                        <button type="submit"   className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}