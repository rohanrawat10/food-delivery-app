import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentAddress, setCurrentCity,setCurrentState,setUserData } from "../redux/userSlice";

export default function useGetCity(){
    const dispatch = useDispatch();
    const {userData} = useSelector(state=>state.user)
    const apiKey = import.meta.env.VITE_GEOAPIKEY
    console.log(apiKey)
     useEffect(()=>{
        navigator.geolocation.getCurrentPosition(async(position)=>{
// console.log(position)
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;
// const {latitude,longitude} = position.coords;
const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
// console.log(result.data.results[0].city)  
// console.log(result.data.results[0].state)  
// console.log(result.data.results[0].address_line2)  
console.log(result.data)
dispatch(setCurrentCity(result?.data?.results[0].city))   
dispatch(setCurrentState(result?.data?.results[0].state))
dispatch(setCurrentAddress(result?.data?.results[0].address_line2 || result?.data?.results[0].address_line1))

// console.log(result.data.results[0].state)
})
     },[userData])

// navigator.geolocation.getCurrentPosition(async (position) => {
//   try {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     const result = await axios.get(
//       `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
//     );
//     console.log("City:", result.data.results[0].city);
//     dispatch(setCity(result?.data?.results[0]?.city || "Unknown"));
//   } catch (err) {
//     console.error("GeoAPI Error:", err.message);
//     dispatch(setCity("Unknown"));
//   }
// });
}

