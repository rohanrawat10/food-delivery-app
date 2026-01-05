import Shop from "../models/shop.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

export const createEditShop = async(req,res)=>{
    try{
        console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);
        const {name,city,state,address} = req.body
        let image;
        if(req.file){
          console.log(req.file)
            image=await uploadOnCloudinary(req.file.path)
        }
        let shop = await Shop.findOne({owner:req.userId})
        if(!shop){
              shop = await Shop.create({
            name,city,state,address,image,owner:req.userId
        })
        }
        else{
            const updateData = { name, city, state, address };
if (image) updateData.image = image;

shop = await Shop.findByIdAndUpdate(shop._id, updateData, { new: true });
        }
       
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
    }catch(err){
        console.error("CREATE / EDIT SHOP ERROR:", err); 
        return res.status(500).json({message:`create shop error ${err}`})
    }
}

export const getMyShop = async (req,res)=>{
    try{
     const shop = await Shop.findOne({owner:req.userId}).populate([
  {
    path: "items",
    options: { sort: { updatedAt: -1 } }
  },
  {
    path: "owner"
  }
])
     if(!shop){
        return res.status(404).json({ message: "Shop not found" });
     }
     return res.status(200).json(shop)
    }
    catch(err){
        return res.status(500).json({message:`Get My Shop error${err}`})
    }
}

export const getShopByCity = async(req,res)=>{
  try{
    const {city} = req.params
   const shops = await Shop.find({

   })
  }catch(error){
    
  }
}