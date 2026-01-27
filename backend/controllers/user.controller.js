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

    try{
      const {lat,lon} = req.body
      
    //   convert to num
    lat = Number(lat);
    lon = Number(lon);
    
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
// export const updateUserLocation = async (req, res) => {
//   try {
//     let { lat, lon } = req.body;   // ✅ use let

//     // ❌ validation
//     if (lat === undefined || lon === undefined) {
//       return res.status(400).json({ message: "lat and lon required" });
//     }

//     lat = Number(lat);
//     lon = Number(lon);

//     if (isNaN(lat) || isNaN(lon)) {
//       return res.status(400).json({ message: "Invalid coordinates" });
//     }

//     // const user = await User.findByIdAndUpdate(
//     //   req.userId,
//     //   {
//     //     location: {
//     //       type: "Point",
//     //       coordinates: [lon, lat] // ✅ longitude first
//     //     }
//     //   },
//     //   { new: true }
//     // );

//     const user = await User.findByIdAndUpdate(
//   req.userId,
//   {
//     location: {
//       type: "Point",          // 🔥 REQUIRED
//       coordinates: [lon, lat] // lng, lat
//     }
//   },
//   {
//     new: true,
//     runValidators: true
//   }
// );


//     if (!user) {
//       return res.status(400).json({ message: "no user found" });
//     }

//     return res.status(200).json({
//       message: "location updated",
//       location: user.location
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: "update user location error",
//       error: err.message
//     });
//   }
// };
