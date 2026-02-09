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