// import axios from "axios";
// import { useEffect } from "react";
// import { serverUrl } from "../config";
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrentAddress, setCurrentCity,setCurrentState,setUserData } from "../redux/userSlice";

// export default function useGetCity(){
//     const dispatch = useDispatch();
//     const {userData} = useSelector(state=>state.user)
//     const apiKey = import.meta.env.VITE_GEOAPIKEY
// //     console.log(apiKey)
//      useEffect(()=>{
//           try{
//         navigator.geolocation.getCurrentPosition(async(position)=>{
// // console.log(position)
// const latitude = position.coords.latitude;
// const longitude = position.coords.longitude;
// // const {latitude,longitude} = position.coords;
// const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
// // console.log(result.data.results[0].city)  
// // console.log(result.data.results[0].state)  
// // console.log(result.data.results[0].address_line2)  
// console.log(result.data)
// dispatch(setCurrentCity(result?.data?.results[0].city))   
// dispatch(setCurrentState(result?.data?.results[0].state))
// dispatch(setCurrentAddress(result?.data?.results[0].address_line2 || result?.data?.results[0].address_line1))
     
        
// })
// console.log(result.data.results[0].state)
// }
// catch(err){
//      console.log("Use get city error",err)
// }
//      },[userData])

// // navigator.geolocation.getCurrentPosition(async (position) => {
// //   try {
// //     const latitude = position.coords.latitude;
// //     const longitude = position.coords.longitude;
// //     const result = await axios.get(
// //       `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
// //     );
// //     console.log("City:", result.data.results[0].city);
// //     dispatch(setCity(result?.data?.results[0]?.city || "Unknown"));
// //   } catch (err) {
// //     console.error("GeoAPI Error:", err.message);
// //     dispatch(setCity("Unknown"));
// //   }
// // });
// }

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";
import { setAddress, setLocation } from "../redux/mapSlice";

export default function useGetCity() {
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_GEOAPIKEY;
   const {userData} = useSelector(state=>state.user)
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
     dispatch(setLocation({lat:latitude,lon:longitude}))
          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse`,
            {
              params: {
                lat: latitude,
                lon: longitude,
                format: "json",
                apiKey,
              },
            }
          );
console.log("Use get by City",result.data)
          const location = result?.data?.results?.[0];

          if (!location) return;

          dispatch(setCurrentCity(location.city || "Unknown"));
          dispatch(setCurrentState(location.state || "Unknown"));
          dispatch(
            setCurrentAddress(
              location.address_line2 || location.address_line1 || ""
            ))
           dispatch(setAddress(location.formatted))
          // console.log("location:",location.formatted)
        } catch (err) {
          console.error("GeoAPI error:", err);
        }
      },
      (error) => {
        console.error("Geolocation error:", error.message);
      }
    );
  }, [userData]); // ✅ run once
}
