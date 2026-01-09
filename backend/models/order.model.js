import mongoose from "mongoose";
const shopOrderSchema = new mongoose.Schema({
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop"
    }
},{timestamps:true})
const orderSchema = new mongoose(
    {
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
paymentMethod:{
    type:"String",
    enum:['Cod','online'],
    required:true
},
deliveryAddress:{
    text:"String",
    latitude:Number,
    longitude:Number,
},
totalAmount:{
    type:Number,
},
shopOrder:[shopOrderSchema]

    },
    {timestamps:true}
)