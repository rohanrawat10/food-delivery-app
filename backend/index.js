// import express from "express";
// import cors from "cors"
// import dotenv from "dotenv";
// dotenv.config()
// import connectDb from "./config/db.js";
// import cookieParser from "cookie-parser";

// import autRouter from "./routes/auth.routes.js";
// import userRouter from "./routes/user.routes.js";
// import itemRouter from "./routes/item.routes.js";
// import shopRouter from "./routes/shop.routes.js";
// import orderRouter from "./routes/order.routes.js";
// import http from "http";
// import { Server } from "socket.io";
// import { socketHandler } from "./socket.js";
// const app = express();
// const server = http.createServer(app)
// const io = new Server(server,{
//     cors:{
//     origin:"http://localhost:5173",
//     credentials:true,
//     methods:["GET","POST","PUT","DELETE"],
//     // allowedHeaders:["Content-Type","Authorization"],

// }
// })
// app.set("io",io)
// const port = process.env.PORT||5000;
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true,
//     methods:["GET","POST","PUT","DELETE"],
//     // allowedHeaders:["Content-Type","Authorization"],

// }))
// app.use(express.json());
// app.use(cookieParser());
// app.use("/api/auth",autRouter)
// app.use("/api/user",userRouter)
// app.use("/api/item",itemRouter)
// app.use("/api/shop",shopRouter)
// app.use("/api/order",orderRouter)
// socketHandler(io)
// server.listen(port,()=>{
//     connectDb(); 
//     console.log(`Server is running ${port}`)
// });  
// // console.log(connectDb)


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.js";
import { socketHandler } from "./socket.js";

import autRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import itemRouter from "./routes/item.routes.js";
import shopRouter from "./routes/shop.routes.js";
import orderRouter from "./routes/order.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.set("io", io);

const port = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", autRouter);
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);
app.use("/api/shop", shopRouter);
app.use("/api/order", orderRouter);

// socket logic
socketHandler(io);

server.listen(port, () => {
  connectDb();
  console.log(`Server running on port ${port}`);
});
