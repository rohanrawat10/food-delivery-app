import { useState,useEffect } from "react";
import { GrMapLocation } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import LivePlaceholder from "./LivePlaceholder";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { MdOutlineClear } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../config";
import { setUserData } from "../redux/userSlice";
import { IoMdAdd } from "react-icons/io";
import { IoReceiptSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export default function Nav() {
  const navigate = useNavigate();
    const { userData,currentCity } = useSelector(state => state.user);
    const {myShopData } = useSelector(state => state.owner);
    const [popUp, setPopup] = useState(false);
    const dispatch = useDispatch()
    const handleLogOut = async()=>{
        try{
            const result = await axios.get(`${serverUrl}/api/auth/signout`,{withCredentials:true})
            dispatch(setUserData(null))
        }catch(err){
            
            console.log(err)
        }
    }
    const texts = [
        "Search for a cuisine...",
         "Search for a dish...",
        "Biryani, Pizza, Momos..."
    ];

    const [placeholder, setPlaceholder] = useState("");
    const [index, setIndex] = useState(0);
    const [searchText,setSearchText] = useState("");
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentText = texts[index];

        const interval = setTimeout(() => {
            setPlaceholder(currentText.slice(0, charIndex + 1));
            setCharIndex(prev => prev + 1);
        }, 100); // typing speed

        if (charIndex === currentText.length) {
            setTimeout(() => {
                setCharIndex(0);
                setIndex((prev) => (prev + 1) % texts.length);
            }, 1000); // pause before next word
        }

        return () => clearTimeout(interval);
    }, [charIndex, index, texts]);

    return (
        <>
         {
            userData?.role == "user" && 
            (
             <div className="w-full h-[80px] flex items-center justify-between px-[20px] 
            fixed top-0 left-0 z-[9999] bg-[#fff9f6] ">

            {/* Logo */}
            <h1 className="text-3xl md:2xl font-bold text-[#ff4d2d]">HungerStrike</h1>

            {/* DESKTOP SEARCH BAR */}
            <div className="hidden lg:flex lg:w-[60%]  h-[50px]  bg-white shadow-xl rounded-full 
                items-center gap-[20px]">

                {/* Location */}
                <div className="flex items-center w-[15%] gap-[10px] px-[15px] border-r border-gray-300">
                    <GrMapLocation size={25} className="text-[#ff4d2d]" />
                    <span className="truncate text-gray-600">{currentCity}</span>
                </div>

                {/* Search */}
                <div className="w-[70%] flex items-center gap-[10px]  p-[5px] border-r border-gray-300">
                    <input
                        type="text"
                        value={searchText}
                        placeholder={placeholder}
                        onChange={(e)=>setSearchText(e.target.value)}
                        className="w-full outline-none  text-gray-700 placeholder-gray-400"
                    />
                    { searchText &&(
                    <span className="truncate text-gray-600">
                        <MdOutlineClear size={18} 
                        className="text-gray-400 cursor-pointer"
                        onClick={()=>setSearchText("")}
                        />
                    </span>
                    )}
                </div>
                <span className="truncate text-gray-600"> 
                    <FaSearch size={25} className="text-[#ff4d2d] cursor-pointer" />
                </span>
            </div>

           
            {/* MOBILE SEARCH BAR */}
<div className="flex lg:hidden  items-center w-[95%] mx-auto h-[50px] bg-white shadow-xl 
    rounded-full absolute top-[80px] left-1/2 -translate-x-1/2 px-4 gap-4">


    {/* Location */}
    <div className="flex items-center  gap-2 px-[5px] border-r border-gray-300  relative group">
        <GrMapLocation size={20} className="text-[#ff4d2d] cursor-pointer" />
     <div className="absolute left-1/2 -translate-x-1/2 top-8 
         text-gray-500 text-xs px-2 py-1 rounded-md opacity-0 
        group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
       {currentCity}
    </div>
    </div>

    {/* Search */}
    <div className="flex-1  flex items-center gap-3  border-r border-gray-300">
        <input
            type="text"
            value={searchText}
            placeholder={placeholder}
             onChange={(e)=>setSearchText(e.target.value)}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
        />
        {
            searchText &&

            <span className="truncate text-gray-600">
        <MdOutlineClear size={18} className="text-gray-400 cursor-pointer" 
        onClick={()=>setSearchText("")}
        />
</span>
}
    </div>

    {/* Search icon */}
    <FaSearch size={22} className="text-[#ff4d2d] cursor-pointer" />
</div>


            {/* RIGHT SIDE ICONS */}
            <div className="flex items-center gap-5">

                {/* Cart */}
                <div className="relative cursor-pointer">
                    <BsCart4 size={26} className="text-[#ff4d2d]" />
                    <span className="absolute right-[-8px] top-[-10px] text-sm text-[#ff4d2d]">
                        0
                    </span>
                </div>

                {/* My Orders (Desktop only) */}
                <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 
                    text-[#ff4d2d] text-sm font-medium pointer-cursor
                ">
                    My Orders
                </button>

                {/* Profile Icon */}
                
        <div
          className="w-[40px] h-[40px] rounded-full bg-[#ff4d2d] text-white
          flex items-center justify-center cursor-pointer"
          onClick={() => setPopup(!popUp)}
        > 
        {userData?.fullName ? userData.fullName[0] : <CgProfile size={22} />}

        </div>
       {popUp && (
          <div className="absolute top-[75px] right-6 w-[180px] bg-white 
            shadow-xl rounded-xl p-4">
            <div className="text-lg font-semibold">
              {userData?.fullName || "Profile"}
            </div>
            <p className="text-[#ff4d2d] mt-2 cursor-pointer font-semibold" onClick={handleLogOut}>
              Log out
            </p>
          </div>
        )}
            </div>
        </div>
            )
        }

        {/* admin */}
        

      {userData?.role == "admin" && (
  <div className="w-full h-[80px] flex items-center justify-between px-[20px]  
    fixed top-0 z-[9999] bg-[#fff9f6]">

    {/* Logo */}
    <h1 
    className="text-3xl md:2xl font-bold text-[#ff4d2d]">
      HungerStrike
      </h1>
    
    {/* RIGHT SIDE ICONS */}
    <div className="flex items-center gap-5">
    
 {/* Add Items */}
    {  myShopData && (
      <>
      <div className="hidden md:flex  px-3 py-1 rounded-lg  text-sm font-medium cursor-pointer
      bg-[#ff4d2d]/10 text-[#ff4d2d]" onClick={() => navigate("/add-item")}>
      <IoMdAdd size={20}/>
      <span className="font-medium">Add Food Items</span>
    </div>
   
    <div className="flex md:hidden   bg-[#ff4d2d]/10 text-[#ff4d2d] rounded-lg cursor-pointer">
          <IoMdAdd size={26} onClick={() => navigate("/add-item")}/>
    </div>
      </>
    )
}
      {/* My Orders */}
      <button className=" hidden md:flex relative px-3 py-1 rounded-lg 
        bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer" >
        My Orders
           <span className="absolute right-[-8px] top-[-10px] text-sm text-[#ff4d2d]">
          0
        </span>
      </button>
      {/* small screen */}
    <button className="flex lg:hidden   text-[#ff4d2d] rounded-lg cursor-pointer">
         <IoReceiptSharp size={26}/>
    </button>

      {/* Profile */}
      <div
        className="w-[40px] h-[40px] rounded-full bg-[#ff4d2d] text-white
        flex items-center justify-center cursor-pointer"
        onClick={() => setPopup(!popUp)}
      >
        {userData?.fullName
        ? userData.fullName[0].toUpperCase()
        :
        <CgProfile size={22} />
        }
      </div>

      {popUp && (
        <div className="absolute top-[75px] right-6 w-[180px] bg-white 
          shadow-xl rounded-xl p-4">
          <div className="text-lg font-semibold">
            {userData?.fullName || "Profile"}
          </div>
          <p
            className="text-[#ff4d2d] mt-2 cursor-pointer font-semibold"
            onClick={handleLogOut}
          >
            Log out
          </p>
        </div>
      )}
    </div>
  </div>
)}

          
        
        </>
       
    );
}




