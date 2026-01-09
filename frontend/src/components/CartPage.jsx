import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemsCard from "./CartItemsCard";
export default function CartPage(){
    const {cartItems,totalAmount} = useSelector(state=>state.user)
    const navigate = useNavigate()
    return(
     <div className="min-h-screen bg-[#fff9f6] p-6 relative">

  {/* BACK BUTTON – SCREEN CORNER */}
  
     <IoArrowBackSharp
    size={30}
    className="fixed top-5 left-5 z-50 text-[#ff4d2d] cursor-pointer"
    onClick={() => navigate("/")}
  />
  

  <div className="flex justify-center">
    <div className="w-full max-w-[800px]">

      {/* CENTERED TITLE */}
      <h1 className="text-2xl font-semibold text-center mb-6">
        Saved Items
      </h1>

      {/* EMPTY CART MESSAGE */}
      {cartItems?.length ==0?(
          <p className="text-center text-lg text-gray-500 mt-[200px]">
          Hungry? Add items to your cart 😋
        </p>
      ):(
        <>
        <div className="space-y-4">
            {
                cartItems.map((item,index)=>(
               <CartItemsCard data={item} key={index}/>
                ))
            }
            </div>
            <div className="mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center border">
             <h1 className="text-lg font-semibold">Total Amount:</h1>
             <span className="text-xl font-bold text-[#ff4d2d]">₹{totalAmount}</span>
            </div>
            <div className="mt-4 flex justify-end">
                <button className="bg-[#ff4d2d] text-white px-6 py-3 rounded-lg text-lg
                  font-medium hover:bg-[#e64526] transition cursor-pointer"
                  onClick={()=>navigate("/checkout")}
                >Proceed Checkout</button>
            </div>
            </>
      )}
      

    </div>
  </div>
</div>


    )
}
