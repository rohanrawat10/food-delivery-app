// import axios from "axios"
// import { serverUrl } from "../config"
// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"

// export default function useUpdateLocation(){
//     const dispactch = useDispatch();
//     const {userData} = useSelector(state=>state.user)
//     useEffect(()=>{
//          const updateLocation = async(lat,lon)=>{

//             const result = await axios.post(`${serverUrl}/api/user/update-location`,{lat,lon},{withCredentials:true})
//                console.log("update location:",result.data)
        
//         navigator.geolocation.watchPosition((pos)=>{
//             updateLocation(pos.coords.latitude,pos.coords.longitude)
//         })
//     }

//     },[userData])
// }

// i


import axios from "axios"
import { serverUrl } from "../config"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function useUpdateLocation() {
   console.log("useUpdateLocation hook mounted")
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
      console.log("userData:", userData)
    // if (!userData) return
    if (!navigator.geolocation) return

    const updateLocation = async (lat, lon) => {
      try {
        await axios.post(
          `${serverUrl}/api/user/update-location`,
          { lat, lon },
          { withCredentials: true }
        )
      } catch (err) {
        console.log("location update error:", err)
      }
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
         console.log("POSITION:", pos.coords)
        updateLocation(pos.coords.latitude, pos.coords.longitude)
      },
      (err) => console.log("geo error:", err),
      { enableHighAccuracy: true }
    )

    // 🔥 CLEANUP (MANDATORY)
    return () => navigator.geolocation.clearWatch(watchId)

  }, [userData])
}
