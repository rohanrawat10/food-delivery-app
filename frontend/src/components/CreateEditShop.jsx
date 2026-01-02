import { IoArrowBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddBusiness } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../config";
import { setMyShopData } from "../redux/ownerSlice";
import { ClipLoader } from "react-spinners";
export default function CreateEditShop() {
    const navigate = useNavigate();
    const { myShopData } = useSelector(state => state.owner);
    const {currentCity,currentState,currentAddress} = useSelector(state=>state.user)
    const [name,setName] = useState(myShopData?.name || "");
    const [city,setCity] = useState(myShopData?.city || currentCity);
    const [state,setState] = useState(myShopData?.state || currentState);
    const [address,setAddress] = useState(myShopData?.address || currentAddress)
    const [frontendImage,setFrontendImage] = useState(null);
    const [backendImage,setBackendImage] = useState(null);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

       const handleImage = (e)=>{
        const file = e.target.files[0]
        if(!file) return;
        setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
       }

       const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true)
        try{
            const formData = new FormData();
            formData.append("name",name);
            formData.append("city",city);
            formData.append("state",state);
            formData.append("address",address)
            if(backendImage){
                formData.append("image",backendImage)
            }
           const result = await axios.post(`${serverUrl}/api/shop/create-edit`,
            formData,
            {
                withCredentials:true,
                   headers: { "Content-Type": "multipart/form-data" },
            })
          dispatch(setMyShopData(result.data))
        //   console.log("new owner",result.data)
        setLoading(false)
          navigate("/")
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
                        {myShopData ?"Add Shop":"Edit Shop"}
                    </div>
                    <form className="space-y-5 w-full " onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">  Restaurant Name</label>
                            <input type="text" placeholder="Enter your Restaurant Name"  value={name} onChange={(e)=>setName(e.target.value)}className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Image</label>
                            <input type="file" accept="image/*" onChange={handleImage}className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
 <label className="block text-sm font-medium text-gray-700 mb-1"> City</label>
                            <input type="text" placeholder="Enter City..." value={city} onChange={(e)=>setCity(e.target.value)}
                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                            </div>
                            <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <input type="text" placeholder="Enter State..." value={state} onChange={(e)=>setState(e.target.value)}
                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adress</label>
                            <input type="text" placeholder="Enter address" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={address} onChange={(e)=>setAddress(e.target.value)}
                            />
                        </div>
                        <button type="submit" disabled={loading}  className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer">
                            {
                                loading ? <ClipLoader size={20}/>: "Save"
                            }
                            </button>
                    </form>
                </div>
            </div>
        </div>
    )
}