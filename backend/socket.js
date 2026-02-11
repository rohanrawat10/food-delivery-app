import User from "./models/user.model.js"


export const  socketHandler =  (io)=>{
    io.on("connection",(socket)=>{
        socket.on("identity" ,async({userId})=>{
            if (!userId) return;
            try{
           const user = await User.findByIdAndUpdate(userId,{
            socketId:socket.id,
            isOnline:true
           },{new:true})
           console.log("updated user:",user)
            }
            catch(err){
            console.log(err)
            }
        })

        // socket.on("updateLocation",async({latitude,longitude,userId})=>{
           
        //     try{
        //   const user = await User.findByIdAndUpdate(userId,{
        //       location:{
        //     type:"Point",
        //     coordinates:[longitude,latitude]
        //   },
        // isOnline:true,
        // socketId:socket.id
        
        //     })
        //     if(user){
        //               io.emit('updateDeliveryLocation',{
        //                 deliveryBoyId:userId,
        //                 latitude,
        //                 longitude
        //               })

        //     }
        
        // }
        //     catch(err){
        //         console.log("update location socket io error:",err)
        //     }
        // })
    
        socket.on("updateLocation", async (data = {}) => {
  const { latitude, longitude, userId } = data;

  if (!latitude || !longitude || !userId) {
    console.log("Invalid updateLocation payload:", data);
    return;
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        location: {
          type: "Point",
          coordinates: [longitude, latitude]
        },
        isOnline: true,
        socketId: socket.id
      },
      { new: true }
    );

    if (user) {
      io.emit("updateDeliveryLocation", {
        deliveryBoyId: userId,
        latitude,
        longitude
      });
    }
  } catch (err) {
    console.log("update location socket io error:", err);
  }
})

        socket.on('disconnect',async()=>{
            try{
            await User.findOneAndUpdate({socket:socket.id},{
                socketId:null,
                isOnline:false
            })
        }
        catch(err){
            console.log("disconnect socket error:",err)
        }
        })
    })
}