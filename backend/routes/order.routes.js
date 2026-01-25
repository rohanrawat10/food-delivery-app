import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getDeliveryAssignment, getMyOrders, placeOrder, updateOrderStatus } from "../controllers/order.controllers.js";
const orderRouter = express.Router();
orderRouter.post("/place-order",isAuth,placeOrder)
orderRouter.get("/my-orders",isAuth,getMyOrders)
orderRouter.get("/get-assignments",isAuth,getDeliveryAssignment)
orderRouter.post("/update-status/:orderId/:shopId",isAuth,updateOrderStatus)
export default orderRouter;
