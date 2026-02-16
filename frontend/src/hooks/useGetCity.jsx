

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
      // console.error("Geolocation not supported");
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
// console.log("Use get by City",result.data)
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
