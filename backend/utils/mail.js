import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
 const transporter = nodemailer.createTransport({
    service:"Gmail",
    port:465,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS,
    },
 })
 export const sendOtpMail = async (to,otp)=>{
    await transporter.sendMail({
        from:process.env.EMAIL,
        to,
        subject:"Reset Your Password",
        html:`<p>Hi there! 👋</p>
<p>Use the OTP below to reset your password:</p>
<h2><b>${otp}</b></h2>
<p>This OTP will expire in 5 minutes. Keep it safe!</p>
`
    })
 }
 
  export const sendDeliveryOtpMail = async (user,otp)=>{
    await transporter.sendMail({
        from:process.env.EMAIL,
        to:user.email,
        subject:"Delivery Confirmation Code",
        html:`<p>Hi there! 👋</p>
<p>We’re at your doorstep! 😊 To complete your delivery, please provide the OTP to the delivery partner only after receiving your order. This ensures a safe and smooth delivery experience for you.:</p>
<h2><b>${otp}</b></h2>
<p>This OTP will expire in 5 minutes. Keep it safe!</p>
`
    })
 }
 