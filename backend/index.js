import express from "express";
import cors from "cors"
import dotenv from "dotenv";
dotenv.config()
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import autRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import itemRouter from "./routes/item.routes.js";
import shopRouter from "./routes/shop.routes.js";
const app = express();
const port = process.env.PORT||5000;
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    method:["GET","POST","PUT","DELETE"],
    // allowedHeaders:["Content-Type","Authorization"],

}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",autRouter)
app.use("/api/user",userRouter)
app.use("/api/item",itemRouter)
app.use("/api/shop",shopRouter)
app.listen(port,()=>{
    connectDb(); 
    console.log(`Server is running ${port}`)
});  
// console.log(connectDb)