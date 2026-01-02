import jwt from "jsonwebtoken";
export const genToken = async (user)=>{
try{
const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
return token;
}
catch(err){
console.log("Tokengen Error:",err)
}
}
