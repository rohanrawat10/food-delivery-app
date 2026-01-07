import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../config";
import { setMyShopData } from "../redux/ownerSlice";
import axios from "axios";

function useGetMyShop() {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/shop/get-my`,
                    { withCredentials: true })

                dispatch(setMyShopData(result.data))
console.log("Fetched shop:", result.data);
            }
            catch (err) {
                console.log("API ERROR:", err.response?.data || err.message)
            }
        }
        fetchShop()
    }, [dispatch])
}

export default useGetMyShop