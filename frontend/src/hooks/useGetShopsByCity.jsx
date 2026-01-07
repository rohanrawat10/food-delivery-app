import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../config";
import { useDispatch, useSelector } from "react-redux";
import {
  setShopsInCity,
  setAuthChecked,
} from "../redux/userSlice";

export default function useGetShopsByCity() {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentCity) return; // 

    const fetchShops = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/shop/get-by-city/${currentCity}`,
          { withCredentials: true }
        );

        dispatch(setShopsInCity(result.data));
        // dispatch(setShopsInCity(Array.isArray(result.data) ? result.data : []));
        console.log("useGetShopsByCity:", result.data);
      } catch (err) {
        dispatch(setShopsInCity([]));
        console.error(
          "Get shops in city error:",
          err.response?.data || err.message
        );
      } finally {
        dispatch(setAuthChecked());
      }
    };

    fetchShops();
  }, [currentCity]);
}
