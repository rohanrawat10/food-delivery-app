import { useEffect, useRef, useState } from "react";
import { categories } from "../Category";
import CategoryCard from "./CategoryCard";
import Nav from "./Nav";
import { FaChevronCircleRight } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useSelector } from "react-redux";
export default function UserDashboard(){
  const {currentCity,shopsInCity } = useSelector(state => state.user);
    const cateScrollRef = useRef();
    const shopScrollRef = useRef();
    const [showLeftButton,setShowLeftButton] = useState(false);
     const [showRightButton,setShowRightButton] = useState(false);
      const [showShopLeftButton,setShowShopLeftButton] = useState(false);
     const [showShopRightButton,setShowShopRightButton] = useState(false);
    const updateButton=(ref,setLeftButton,setRightButton)=>{
        const element = ref.current;
        if(element){
          setLeftButton(element.scrollLeft>0)
          setRightButton(element.scrollLeft+element.clientWidth<element.scrollWidth)
        }
    }
    
    // const scrollHandler = (ref,direction)=>{
    //   if(ref.current){
    //     ref.current.scrollBy({
    //       left:direction == "left"?-200:200,
    //       behavior:"smooth"
    //     })
    //   }
    // }
    const scrollHandler = (ref, direction) => {
  if (!ref.current) return;
  ref.current.scrollBy({
    left:
      direction === "left"
        ? -ref.current.clientWidth
        : ref.current.clientWidth,
    behavior: "smooth",
  });
};

    useEffect(()=>{
      if(cateScrollRef.current){
        updateButton(cateScrollRef,setShowLeftButton,setShowRightButton)
        updateButton(shopScrollRef,setShowShopLeftButton,setShowShopRightButton)
        cateScrollRef.current.addEventListener("scroll",()=>{
          updateButton(cateScrollRef,setShowLeftButton,setShowRightButton);
        })
          shopScrollRef.current.addEventListener("scroll",()=>{
          updateButton(shopScrollRef,setShowShopLeftButton,setShowShopRightButton);
        })
      }
      return()=>{cateScrollRef.current.removeEventListener("scroll",()=>{
          updateButton(cateScrollRef,setShowLeftButton,setShowRightButton);
        })
      shopScrollRef.current.removeEventListener("scroll",()=>{
          updateButton(shopScrollRef,setShowShopLeftButton,setShowShopRightButton);
        })
      }
    },[categories,shopsInCity])

//     useEffect(() => {
//   const cateEl = cateScrollRef.current;
//   const shopEl = shopScrollRef.current;

//   if (cateEl) {
//     updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
//   }

//   if (shopEl) {
//     updateButton(shopScrollRef, setShowShopLeftButton, setShowShopRightButton);
//   }
// }, [shopsInCity.length]);

   console.log("shops in City",shopsInCity)
    return(
          <div className="w-screen mih-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-auto">
          <Nav/>
          <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-2.5 pt-20 lg:pt-7">
            <h1 className="text-gray-800 e text-2xl sm:text-3xl">Insipiration for your first order</h1>
               <div className="w-full relative rounded-2xl">
                {showLeftButton &&  <button className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-orange-100 text-gray-600 bg-opacity-10  p-1
                         hover:shadow-lg active:scale-110 transition-all duration-300  z-10 
                    " onClick={()=>scrollHandler(cateScrollRef,"left")}>
                    <IoIosArrowDropleftCircle size={18}  />
                  </button>}
                   
                <div className="w-full flex flex-nowrap overflow-x-auto gap-4 pb-2  "
                 ref={cateScrollRef}
                >
               {categories.map((cate,index)=>(
                  <CategoryCard name={cate.category} image={cate.image} key={index}/>
               ))}
               </div>
               { showRightButton &&
                 <button className="hidden md:flex  absolute right-0 top-1/2 -translate-y-1/2 bg- bg-orange-100 text-gray-600 bg-opacity-10 p-1
                         hover:shadow-lg active:scale-110 transition-all duration-300  z-10" onClick={()=>scrollHandler(cateScrollRef,"right")}>
                  <FaChevronCircleRight size={18} />
               </button>
               }
              
               {/* } */}
               </div>
          </div>
          <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-2.5">
            <h1 className="text-gray-800 e text-2xl sm:text-3xl">Best in tast in {currentCity}</h1>
              <div className="w-full relative rounded-2xl">
                {showShopLeftButton &&  <button className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-orange-100 text-gray-600 bg-opacity-10  p-1
                         hover:shadow-lg active:scale-110 transition-all duration-300  z-10 
                    " onClick={()=>scrollHandler(shopScrollRef,"left")}>
                    <IoIosArrowDropleftCircle size={18}  />
                  </button>}
                   
                <div className="w-full flex flex-nowrap overflow-x-auto gap-4 pb-2  "
                 ref={shopScrollRef}
                >
               {shopsInCity?.map((shop,index)=>(
                  <CategoryCard name={shop.name} image={shop.image} key={index}/>
               ))}
               </div>
               { showShopRightButton &&
                 <button className="hidden md:flex  absolute right-0 top-1/2 -translate-y-1/2 bg- bg-orange-100 text-gray-600 bg-opacity-10 p-1
                         hover:shadow-lg active:scale-110 transition-all duration-300  z-10" onClick={()=>scrollHandler(shopScrollRef,"right")}>
                  <FaChevronCircleRight size={18} />
               </button>
               }
              
               {/* } */}
               </div>
          </div>
          <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-2.5">
           <h1 className="text-gray-800 e text-2xl sm:text-3xl">Loved by people</h1>
          </div>
        </div>
    )
}