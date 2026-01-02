import express from "express";
import { signOut, signIn, signUp, sendOtp, verifyOtp, resetPassword, googleAuth } from "../controllers/auth.controllers.js";
const autRouter = express.Router()
autRouter.post("/signup",signUp)
autRouter.post("/signin",signIn)
autRouter.get("/signout",signOut)
autRouter.post ("/send-otp",sendOtp)
autRouter.post("/verify-otp",verifyOtp)
autRouter.post("/reset-password",resetPassword)
autRouter.post("/google-auth",googleAuth)
export default autRouter; 