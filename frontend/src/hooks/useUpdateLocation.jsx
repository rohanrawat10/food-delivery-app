import axios from "axios"
import { serverUrl } from "../config"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function useUpdateLocation(){
    const dispactch = useDispatch();
    const {userData} = useSelector(state=>state.user)
    useEffect(()=>{
         const updateLocation = async(lat,lon)=>{
            const result = await axios.post(`${serverUrl}/api/user/update-location`,{lat,lon},{withCredentials:true})
               console.log(result.data)
        }
        navigator.geolocation.watchPosition((pos)=>{
            updateLocation(pos.coords.latitude,pos.coords.longitude)
        })
    },[userData])
}