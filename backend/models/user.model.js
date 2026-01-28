import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
fullName:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    // required:function(){
    //     return !this.isGoogleUser;
    // },
    select:false,
},
// isGoogleUser:{
//   type:Boolean,
//   default:false,
// },
mobile:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:["admin","user","deliveryBoy"],
    // default:"user",
    required:true,
},
resetOtp:{
    type:String
},
isOtpVerified:{
    type:Boolean,
    default:false
},
otpExpires:{
    type:Date
},
// location: {
//     type: "Point",
//     coordinates: [Number(lon), Number(lat)]
//   },
location: {
  type: {
    type: String,
    enum: ["Point"],
    default:"Point",
  },
  coordinates: {
    type: [Number],
    default:[0,0]
  }
},

// location: {
//   type: {
//     type: String,
//     enum: ["Point"],
//     required: true
//   },
//   coordinates: {
//     type: [Number],
//     required: true,
//     validate: {
//       validator: function (v) {
//         return Array.isArray(v) && v.length === 2 &&
//                !isNaN(v[0]) && !isNaN(v[1])
//       },
//       message: "Coordinates must be [longitude, latitude]"
//     }
//   }
// }
},{timestamps:true})
userSchema.index({location:"2dsphere"})
const User = mongoose.model("User",userSchema);
export default User;