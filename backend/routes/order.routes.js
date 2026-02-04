import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { acceptOrders, getCurrentOrder, getDeliveryBoysAssignment, getMyOrders, getOrderById, placeOrder, sendDeliveryOtp, verifyDeliveryOtp,updateOrderStatus } from "../controllers/order.controllers.js";
const orderRouter = express.Router();
orderRouter.post("/place-order",isAuth,placeOrder)
orderRouter.get("/my-orders",isAuth,getMyOrders)
orderRouter.get("/get-assignments",isAuth,getDeliveryBoysAssignment)
  orderRouter.get("/current-order",isAuth,getCurrentOrder)
     orderRouter.post("/send-delivery-otp",isAuth,sendDeliveryOtp)
     orderRouter.post("/verify-delivery-otp",isAuth,verifyDeliveryOtp)
  orderRouter.get("/get-order-by-id/:orderId",isAuth,getOrderById)
  orderRouter.post("/update-status/:orderId/:shopId",isAuth,updateOrderStatus)
 orderRouter.get("/accept-order/:assignmentId",isAuth,acceptOrders)

  export default orderRouter;
