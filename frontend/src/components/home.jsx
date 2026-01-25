import { useSelector } from "react-redux";
import OwnerDashboard from "./OwnerDashboard";
import UserDashboard from "./UserDashboard";
import DeliveryBoy from "./DeliveryBoy";
export default function Home(){
    const {userData,authChecked} = useSelector(state=>state.user)
     if(!authChecked){
    return<div className="flex items-center justify-center min-h-screen">{<ClipLoader size={40} color="#000000" loading={true}/>}</div>
  }
    return(
        <div className="w-full min-h-screen pt-[90px] flex flex-col items-center bg-[#fff9f6]">
            {/* <Nav/> */}
 {
  userData?.role == "user" && <UserDashboard/>
 }
 {userData?.role == "admin" && <OwnerDashboard/>}
 {userData?.role == "deliveryBoy" && <DeliveryBoy/>}
        </div>
    )
}