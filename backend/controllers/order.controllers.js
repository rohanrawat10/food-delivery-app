import Shop from "../models/shop.model"

export const placeOrder = async(req,res)=>{
try{
   const {cartItems,paymetMethod,deliveryAddress} = req.body
   if(cartItems.length == 0 || !cartItems){
    return res.status(400).json({message:"cart is empty"})
}
if(!deliveryAddress.text || !deliveryAddress.latitude || !deliveryAddress.longitude ){
    return res.status(400).json({message:"Address is required"})
}
const groupItemsByShop ={}
cartItems.forEach(item=>{
       const shopId = item.shop
       if(!groupItemsByShop[shopId]){
        groupItemsByShop[shopId] = []
       }
       groupItemsByShop[shopId].push(item)
})
const shopOrders = await Promise.all(Object.keys(groupItemsByShop).map(async(shopId)=>{
    const shop = await  Shop.findById(shopId).populate("owner")
    if(!shop){
        return res.status(400).json({message:"shop not found"})   
    }
    const items = groupItemsByShop[shopId]
    const subTotal = items.reduce((sum,i)=>sum+Number(i.price*i.quantity,0))
        return{
            shop:shop._id,
            owner:shop.owner._id,
            subTotal,
            shopOrderItems:items.map((i)=>({
                item:i._id,
                price:i.price,
                quantity:i.quantity,
                name:i.name

            }))
        }
})
)}
catch(err){
    
}
}
