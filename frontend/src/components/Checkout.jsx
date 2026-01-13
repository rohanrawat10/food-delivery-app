import { IoArrowBackSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import { setAddress, setLocation } from "../redux/mapSlice";
import axios from "axios";
function RecenterMap({location}){
    if(location.lat && location.lng){
        const map = useMap()
        map.setView([location.lat.location.lon],16,{animate:true})
    }
    return null;
}
function Checkout(){
    const {location,address} = useSelector(state=>state.map)
    const navigate = useNavigate();
    const dispatch = useDispatch();
      const apiKey = import.meta.env.VITE_GEOAPIKEY
    const [addressInput,setAddressInput] = useState("")
    // const [searchLocation,setSearchLocation] = useState("");
    // useEffect(()=>{
    //      setSearchLocation(address)
    // },[address])
 const onDragend = (e)=>{
     console.log(e.target._latlng)
     const {lat,lng} = e.target._latlng;
     dispatch(setLocation({lat:lat,lon:lng}))
    //  const map = useMap();
    //  map.setView([lat,lng],16,{animate:true})
     getAddressByLatLng(lat,lng);
 }

 const getAddressByLatLng = async(lat,lng)=>{
    try{
       const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse`,
            {
              params: {
                lat: lat,
                lon: lng,
                format: "json",
                apiKey,
              },
            })
            dispatch(setAddress(result?.data?.results[0].address_line2))
            console.log(result?.data?.results[0].address_line2)
    }
    catch(err){
          console.log("get address by lat lng",err)
    }
 }
 const getCurrentLocation = ()=>{
     navigator.geolocation.getCurrentPosition(async(position)=>{
// console.log(position)
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;
 dispatch(setLocation({lat:latitude,lon:longitude})) 
//  dispatch(setAddress({lat:latitude,lon:longitude}))
getAddressByLatLng(latitude,longitude)
})
 }
 const getLatLngByAddress = async()=>{
         try{
          
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`)
          const {lat,lon}= result.data.features[0].properties 
             dispatch(setLocation({lat,lon}))
             console.log(result)
        }
         catch(err){
            console.log("get lat lng By address",err)
         }
 }
 useEffect(()=>{
setAddressInput(address)
 },[address])
    return(
        <div className="min-h-screen bg-[#fff9f6] p-6 flex items-center justify-center">
             <IoArrowBackSharp
             size={30}
             className="fixed top-5 left-5 z-50 text-[#ff4d2d] cursor-pointer"
             onClick={() => navigate("/")}
           />
           <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-x-6">
           <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
          <section>
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800">
                <FaLocationDot className="text-[#ff4d2d]" />Location</h2>
           <div className="flex gap-2 mb-3">
            <input type="text" className="flex-1 border border-gray-300 rounded-lg p-2 text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
                      placeholder="Enter your Delivery Address"
                    value={addressInput} onChange={(e)=>setAddressInput(e.target.value)}
          />
            <button className="bg-[#ff4d2d] hover:bg-[#ff4d2d] text-white px-3 py-2 rounded-lg flex
                      items-center justify-center " onClick={getLatLngByAddress}>
                <FaSearchLocation /></button>
            <button onClick={getCurrentLocation}className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex
                      items-center justify-center "><FaMapLocationDot /></button>
           </div>
           <div className="rounded-xl border overflow-hidden">
            <div className="h-64 w-full flex items-center justify-center"> 
             <MapContainer
              className={"w-full h-full"}
              center={[location?.lat,location?.lon]}
              zoom={16}
             >
               <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <RecenterMap location={location}/>
               <Marker position={[location?.lat, location?.lon]} draggable eventHandlers={{dragend:onDragend}}>
            
    </Marker>
           </MapContainer>
            </div>
           </div>
          </section>
           </div>
        </div>
    )
}
export default Checkout;