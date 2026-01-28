import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../config";
import { useDispatch, useSelector } from "react-redux";
import {
  setItemsInCity,
  setAuthChecked,
} from "../redux/userSlice";

export default function useGetItemsByCity() {
  const dispatch = useDispatch();
  const { currentCity} = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentCity) return; // 

    const fetchItems = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-by-city/${currentCity}`,
          { withCredentials: true }
        );

        dispatch(setItemsInCity(result.data));
        // dispatch(setShopsInCity(Array.isArray(result.data) ? result.data : []));
        // console.log("useGetByCity:", result.data);
      } catch (err) {
        dispatch(setItemsInCity([]));
        console.error(
          "Get items in city error:",
          err.response?.data || err.message
        );
      } finally {
        dispatch(setAuthChecked());
      }
    };

    fetchItems();
  }, [currentCity]);
}
