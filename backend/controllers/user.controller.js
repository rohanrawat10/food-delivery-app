import DeliveryAssignment from "../models/deliveryAssignment.model.js";
import User from "../models/user.model.js"

export const getCurrentUser = async (req,res)=>{
    try{
        const userId = req.userId
        if(!userId){
            return res.status(400).json({message:"userId is not found"})
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({message:"no user found"})
        }

        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({message:`get Currenct User Error ${error}`})
    }
}

export const updateUserLocation = async (req,res)=>{
  // console.log(req.body.latitude, req.body.longitude)
   console.log("BODY:", req.body)

    try{
      const {lat,lon} = req.body
      
    //   convert to num
    // lat = Number(lat);
    // lon = Number(lon);
    
      const user = await User.findByIdAndUpdate(req.userId,{
        location:{
            type:'Point',
            coordinates:[lon,lat]
        }
      },{new:true})
      if(!user){
        return res.status(400).json({message:"no user found"})
      }
      return res.status(200).json({message:"location updated"})
    }
    catch(err){
        return res.status(500).json({message:"update user location:",err})
    }
}
