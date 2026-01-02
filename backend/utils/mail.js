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