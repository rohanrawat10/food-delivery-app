import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {genToken} from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";
 export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    if (!fullName || !email || !password || !mobile || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      mobile,
      role,
      password: hashedPassword,
    });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      _id: user._id,
      fullName:user.fullName,
      email: user.email,
      role: user.role,
    });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Signup failed" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User
      .findOne({ email })
      .select("+password");

    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      _id: user._id,
      fullName:user.fullName,
      email: user.email,
      role: user.role,
    });

  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ message: "Signin failed" });
  }
};


 export let signOut = async(req,res)=>{
    try{
res.clearCookie("token");

return res.status(200).json({message:"logged out succesfully"});
    }
    catch(err){
        return res.status(500).json({message:"sign out error :",err});

    }
 }
 export const sendOtp = async(req,res)=>{
    try{
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user Does not exist."})
        }
        const otp = Math.floor(1000 + Math.random()*9000).toString()
         user.resetOtp = otp
         user.otpExpires = Date.now()+5*60*1000
         user.isOtpVerified = false;
         await user.save()
         await sendOtpMail(email,otp)
         return res.status(200).json({message:"otp sent successfully"})
    }catch(err){
       return res.status(500).json(`send otp error  ${err}`)
    }
    }
    export const verifyOtp = async(req,res)=>{
        try{
            const {email,otp} = req.body
            const  user = await User.findOne({email})
            if(!user || user.resetOtp != otp || user.otpExpires<Date.now()){
                 return res.status(400).json({message:"invalid/expired otp"})
            }
            user.isOtpVerified = true
            user.resetOtp = undefined
            user.otpExpires = undefined
            await user.save()
            return res.status(200).json({message:"otp verify successfully"})
        }
        catch(err){
return res.status(500).json(`otp error  ${err}`)
        }
    }
    export const resetPassword = async(req,res)=>{
        try{
            const {email,newPassword} = req.body
            const user = await User.findOne({email:email.trim().toLowerCase()})
            if(!user||!user.isOtpVerified){
                return res.status(400).json({message:"otp verification is required"})
            }
            const hashedPassword = await bcrypt.hash(newPassword,10)
            user.password = hashedPassword
            user.isOtpVerified = false 
            await user.save();
            return res.status(200).json({message:`reset password successfully `})
        }
        catch(err){
            return res.status(500).json({message:`reset password error ${err}`})
        }
    }

    export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName,
        email,
        mobile,
        role,
        isGoogleUser: true,
      });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      _id: user._id,
      fullName:user.fullName,
      email: user.email,
      role: user.role,
    });

  } catch (err) {
    console.error("Google auth error:", err);
    return res.status(500).json({ message: "Google login failed" });
  }
};
