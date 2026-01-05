import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req,res)=>{
try{
const {name,category,foodType,price} = req.body
let image;
console.log("Item File Path",req.file)
if(req.file){
 image = await uploadOnCloudinary(req.file.path);
      

}
const shop  = await Shop.findOne({owner:req.userId})
console.log("userId:", req.userId)
if(!shop){
    return res.status(400).json({message:"shop not found"})
}
if(!image){
    return res.status(400).json({
        message:"Item image is required"
    });
}
const item = await Item.create({
    name,category,foodType,price,image,shop:shop._id
}) 
shop.items.push(item._id)
await shop.save();
await shop.populate([
  {
    path: "items",
    options: { sort: { updatedAt: -1 } }
  },
  {
    path: "owner"
  }
]);
return res.status(201).json(shop)
}
catch(err){
 return res.status(500).json({message:`add item error ${err} `})
}
}


export const editItem = async(req,res)=>{
    try{
        const itemId = req.params.itemId
        const {name,category,foodType,price} = req.body
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }
        const updatedData = {name,category,foodType,price}
         if(image){
                updatedData.image = image;
            }
            const item = await Item.findByIdAndUpdate(
                itemId,
                updatedData
                ,{new:true})

            if(!item){
                return res.status(400).json({message:"item not found"})
            }
            const shop = await Shop.findOne({owner:req.userId}).populate({
                path:"items",
                option:{sort:{updatedAt:-1}}
            })
             return res.status(200).json(shop)
        }  catch(err){
            return res.status(400).json({message:`edit item error ${err}`})
}
}

export const getItemById = async(req,res)=>{
    try{
    const itemId = req.params.itemId
    const item = await Item.findById(itemId)
    if(!item){
        return res.status(400).json({message:"item not found"})
    }
    return res.status(200).json(item)
    }
    catch(error){
  return res.status(500).json({message:`get item error ${error}`})
    }

}

export const deleteItem = async(req,res)=>{
    try{
     const itemId = req.params.itemId
     const item = await Item.findByIdAndDelete(itemId)
     if(!item){
        return res.status(400).json({message:"item not found"})
     }
     const shop = await Shop.findOne({owner:req.userId})
     shop.items = shop.items.filter(i=>i!==item._id)
     await shop.save()
    await shop.populate({
                path:"items",
                option:{sort:{updatedAt:-1}}
            })
    return res.status(200).json(shop)
     
    }
    catch(err){
     return res.status(500).json({message:`delete item error`})
    }}