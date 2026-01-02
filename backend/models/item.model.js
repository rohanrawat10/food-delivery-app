import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
         required: true,
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },
    category: {
        type: String,
        enum: [
            "snacks",
            "main course",
            "desserts",
            "pizza",
            "burgers",
            "sandwiches",
            "south indian",
            "north indian",
            "chinese",
            "fast food",
            "others"
        ],
        lowercase:true,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    foodType:{
        type:String,
        enum:["veg","non-veg"],
        required:true,
}
}, { timestamps: true })

const Item = mongoose.model("Item",itemSchema)
export default Item;