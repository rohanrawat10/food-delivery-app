import { useEffect } from "react";
import { serverUrl } from "../config";
import { setMyOrders } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function useGetMyOrders(){
    const dispactch = useDispatch();
    const {userData} = useSelector(state=>state.user)
useEffect(()=>{
    const fetchOrders = async()=>{
     try{
   const result  = await axios.get(`${serverUrl}/api/order/my-orders`,{withCredentials:true})
     dispactch(setMyOrders(result.data))
    //  console.log("Use get my orders:",result.data)     
}  
     catch(err){
     console.log("get my orders error:",err)
     } 
    }
    fetchOrders()
},[userData])
}
export default useGetMyOrders;