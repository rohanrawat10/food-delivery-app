import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../config";
import { useDispatch } from "react-redux";
import { setUserData ,setAuthChecked} from "../redux/userSlice";

export default function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${serverUrl}/api/user/current`,
          { withCredentials: true }
        );
       
        dispatch(setUserData(data));
        
      } catch (err) {
        
      dispatch(setUserData(null))
      //  dispatch(clearUser());
        console.error(
          "Get current user error:",
          err.response?.data || err.message
        );
        
    }finally{
      dispatch(setAuthChecked())
    }
  }
    fetchUser();
  }, [dispatch]);
}
