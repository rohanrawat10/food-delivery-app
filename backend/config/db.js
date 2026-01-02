import mongoose from "mongoose";
const connectDb = async()=>{
    try{
await mongoose.connect(process.env.MONGODB_URL)
    console.log("Db connected")    
}
    catch(err){
     console.error("DataBase Error is:",err)
    }
}
// console.log(process.env.MONGODB_URL)
export default connectDb;