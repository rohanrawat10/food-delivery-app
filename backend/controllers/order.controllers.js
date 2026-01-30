import Order from "../models/order.model.js"
import Shop from "../models/shop.model.js"
import User from "../models/user.model.js"
import DeliveryAssignment from "../models/deliveryAssignment.model.js"
export const placeOrder = async (req, res) => {
    try {
        const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "cart is empty" })
        }
       const lat = Number(deliveryAddress?.latitude)
const lng = Number(deliveryAddress?.longitude)

if (
  !deliveryAddress?.text ||
  isNaN(lat) ||
  isNaN(lng)
) {
  return res.status(400).json({ message: "Valid delivery address with coordinates is required" })
}

// normalize values (VERY IMPORTANT)
deliveryAddress.latitude = lat
deliveryAddress.longitude = lng

        const groupItemsByShop = {}
        cartItems.forEach(item => {
            const shopId = item.shop
            if (!groupItemsByShop[shopId]) {
                groupItemsByShop[shopId] = []
            }
            groupItemsByShop[shopId].push(item)
        })
        const shopOrders = await Promise.all(Object.keys(groupItemsByShop).map(async (shopId) => {
            const shop = await Shop.findById(shopId).populate("owner")
            if (!shop) {
                return res.status(400).json({ message: "shop not found" })
            }
            const items = groupItemsByShop[shopId]
            const subTotal = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0)
            return {
                shop: shop._id,
                owner: shop.owner._id,
                subTotal,
                shopOrderItems: items.map((i) => ({
                    item: i.id,
                    price: i.price,
                    quantity: i.quantity,
                    name: i.name

                }))
            }
        })
        )
        const newOrder = await Order.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrders
        })
        await newOrder.populate("shopOrders.shopOrderItems.item","name image price")
        await newOrder.populate("shopOrders.shop","name")
        return res.status(201).json(newOrder)
    }
    catch (err) {
        return res.status(500).json({ message: `place order error ${err}` })
    }
}

export const getMyOrders = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (user.role == "user") {
            const orders = await Order.find({ user: req.userId })
                .sort({ createdAt: -1 })
                 .populate("user") // ✅ CUSTOMER
                .populate("shopOrders.shop", "name")
                .populate("shopOrders.owner", "name email mobile")
                .populate("shopOrders.shopOrderItems.item", "name image price")
              
            return res.status(200).json(orders)
        }
        else if (user.role == "admin") {
            const orders = await Order.find({ "shopOrders.owner": req.userId })
                .sort({ createdAt: -1 })
                 .populate("user") // ✅ CUSTOMER
                .populate("shopOrders.shop", "name")
                // .populate("shopOrders.owner", "name email mobile")
                .populate("shopOrders.shopOrderItems.item", "name image price")
                .populate("shopOrders.assignedDeliveryBoy","fullName mobile ")
          const filteredOrders = orders.map((order=>({
               _id:order._id,
               paymentMethod:order.paymentMethod,
               user:order.user,
               shopOrders:order.shopOrders.find(o=>o.owner._id==req.userId),
               createdAt:order.createdAt,
               deliveryAddress:order.deliveryAddress
          })))
                return res.status(200).json(filteredOrders)
        }
    }
    catch (err) {
        return res.status(500).json({ message: `get User order error${err}` })
    }
}

// export const updateOrderStatus = async(req,res)=>{
//     try{
//       const {orderId,shopId} = req.params
//       const {status} = req.body
//       const order = await Order.findById(orderId)
//       const shopOrder =  order.shopOrders.find(o=>o.shop.toString() == shopId)
//       if(!shopOrder){
//         return res.status(400).json({message:"shop order not found"})
//       }
//       shopOrder.status  = status
//       let deliveryBoysPayload = [];
//       if(status == "out for delivery" && !shopOrder.assignment){
//            const {longitude,latitude} = order.deliveryAddress
// //         const latitude = Number(lat)
// // const longitude = Number(lng)

//          const nearByDeliveryBoys = await  User.find({
//             role:"deliveryBoy",
//             location:{
//                 $near:{
//                     $geometry:{type:"Point",
//                         coordinates:[
//                              Number(longitude),
//                             Number(latitude),
//                         ]
//                     },
//                     $maxDistance:5000
//                 }
//             }
//          })   

//          const nearByIds = nearByDeliveryBoys.map(b=>b._id)
//          const busyIds = await DeliveryAssignment.find({
//             assignedTo:{$in:nearByIds},
//             status:{$nin:["broadcasted","completed"]}

//             // status:"assigned",
//        } ).distinct("assignedTo")
//        const busyIdSet = new Set(busyIds.map(id=>String(id)))
//        const availabDeliveryBoys = nearByDeliveryBoys.filter(b=>!busyIdSet.has(String((b._id))))
//         const candidates = availabDeliveryBoys.map(b=>b._id)
//         if(candidates?.length==0){
//             await order.save();
//             return res.json({
//                 message:"order status updated but there is no availablity of delivery boys "
//             })
//         }
//         const deliveryAssignment = await DeliveryAssignment.create({
//             order:order._id,
//             shop:shopOrder.shop,
//             shopOrderId:shopOrder._id,
//             broadcastedTo:candidates,
//             status:"broadcasted"
//         })
//         shopOrder.assignedDeliveryBoy = deliveryAssignment.assignedTo
//         shopOrder.assignment = deliveryAssignment._id
//         deliveryBoysPayload = availabDeliveryBoys.map(b=>({
//             id:b._id,
//             fullName:b.fullName,
//             longitude:b.location.coordinates?.[0],
//             latitude:b.location.coordinates?.[1],
//             mobile:b.mobile
//         }))


//     }
//     //   await shopOrder.save()
//       await order.save()
//          const  updatedShopOrder = order.shopOrders.find(o=>o.shop==shopId)

//       await order.populate("shopOrders.assignedDeliveryBoy","fullName email mobile")
//      await order.populate("shopOrders.shop","name")
//     //   await order.populate("shopOrders.shop","name")
     
//     //   await shopOrder.populate("shopOrderItems.item","name image price")
//       return res.status(200).json({
//         shopOrder:updatedShopOrder,
//         assignedDeliveryBoy:updatedShopOrder?.assignedDeliveryBoy,
//            availableDeliveryBoys:deliveryBoysPayload,
//            assignment:updatedShopOrder?.assignment._id
//     })
//     }
//     catch(err){
//              return res.status(500).json({err:err.message})
//     }
// }

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, shopId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const shopOrder = order.shopOrders.find(
      o => o.shop.toString() === shopId
    );

    if (!shopOrder) {
      return res.status(400).json({ message: "Shop order not found" });
    }

    shopOrder.status = status;
    let deliveryBoysPayload = [];

    // ✅ HANDLE OUT FOR DELIVERY PROPERLY
    if (status === "out for delivery") {

      let assignment = null;

      if (shopOrder.assignment) {
        assignment = await DeliveryAssignment.findById(shopOrder.assignment);
      }

      // ❌ Stop ONLY if already assigned
    //   if (assignment && assignment.status === "assigned")
     if(assignment && !assignment.status ==="assigned")
         {
        return res.status(400).json({
          message: "Delivery boy already assigned for this Order"
        });
      }

      const { longitude, latitude } = order.deliveryAddress;

      const nearByDeliveryBoys = await User.find({
        role: "deliveryBoy",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Number(longitude), Number(latitude)]
            },
            $maxDistance: 5000
          }
        }
      });

      const nearByIds = nearByDeliveryBoys.map(b => b._id);

      // ✅ ONLY assigned delivery boys are busy
      const busyIds = await DeliveryAssignment.find({
        assignedTo: { $in: nearByIds },
        // status: "assigned"
        status:{$nin:["broadcasted","completed"]},
      }).distinct("assignedTo");

      const busySet = new Set(busyIds.map(id => id.toString()));

      const availableDeliveryBoys = nearByDeliveryBoys.filter(
        b => !busySet.has(b._id.toString())
      );

      if (availableDeliveryBoys.length === 0) {
        await order.save();
        return res.json({
          message: "Order status updated but no delivery boys available"
        });
      }

      // 🔁 Reuse existing broadcast OR create new
      let deliveryAssignment;

      if (assignment) {
        assignment.broadcastedTo = availableDeliveryBoys.map(b => b._id);
        assignment.status = "broadcasted";
        await assignment.save();
        deliveryAssignment = assignment;
      } else {
        deliveryAssignment = await DeliveryAssignment.create({
          order: order._id,
          shop: shopOrder.shop,
          shopOrderId: shopOrder._id,
          broadcastedTo: availableDeliveryBoys.map(b => b._id),
          status: "broadcasted"
        });

        shopOrder.assignment = deliveryAssignment._id;
      }

      shopOrder.assignedDeliveryBoy = null;

      deliveryBoysPayload = availableDeliveryBoys.map(b => ({
        id: b._id,
        fullName: b.fullName,
        longitude: b.location.coordinates?.[0],
        latitude: b.location.coordinates?.[1],
        mobile: b.mobile
      }));
    }

    await order.save();

    const updatedShopOrder = order.shopOrders.find(
      o => o.shop.toString() === shopId
    );

    await order.populate("shopOrders.assignedDeliveryBoy", "fullName email mobile");
    await order.populate("shopOrders.shop", "name");

    return res.status(200).json({
      shopOrder: updatedShopOrder,
      assignedDeliveryBoy: updatedShopOrder?.assignedDeliveryBoy,
      availableDeliveryBoys: deliveryBoysPayload ||[],
      assignment: updatedShopOrder?.assignment?._id || []
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export const getDeliveryBoysAssignment = async(req,res)=>{
     console.log("userId",req.userId) 
    try{
          const deliveryBoyId = req.userId
          const assignments = await DeliveryAssignment.find({
               status:"broadcasted",
               assignedTo:null,
            broadcastedTo: deliveryBoyId
          }) 
          .populate("order")
          .populate("shop")
          const formatted = assignments.map(a=>({
            assignmentId:a._id,
            orderId:a.order._id,
            shopName:a.shop.name,
            deliveryAddress:a.order.deliveryAddress,
               items:a.order.shopOrders.find(so=>so._id.equals(a.shopOrderId)).shopOrderItems || [],
              subTotal:a.order.shopOrders.find(so=>so._id.equals(a.shopOrderId)).subTotal
          }))
    //      const formatted = assignments.map(a => {
    //          if (!a.order || !a.shop) return null;
    //   const shopOrder = a.order.shopOrders.find(
    //     so => so._id.toString() === a.shopOrderId.toString()
    //   )

    //   return {
    //     assignmentId: a._id,
    //     orderId: a.order._id,
    //     shopName: a.shop.name,
    //     deliveryAddress: a.order.deliveryAddress,
    //     items: shopOrder?.shopOrderItems || [],
    //     subTotal: shopOrder?.subTotal || 0
    //   }
    // })
          return res.status(200).json(formatted)
     }
     catch(err){
          return res.status(500).json({message:`get assignment error ${err}`})
//         console.log("get assignment error message:", err.message);
//   console.log("get assignment error response:", err.response);
//   console.log("get assignment error status:", err.response?.status);
//   console.log("get assignment error data:", err.response?.data);
     }
}


// export const getDeliveryBoysAssignment = async (req, res) => {
//   try {
//     const deliveryBoyId = new mongoose.Types.ObjectId(req.userId);

//     const assignments = await DeliveryAssignment.find({
//       status: "broadcasted",
//       assignedTo: null,
//       broadcastedTo: { $in: [deliveryBoyId] }
//     })
//       .populate("order")
//       .populate("shop");

//     const formatted = assignments
//       .map(a => {
//         if (!a.order || !a.shop) return null;

//         const shopOrder = a.order.shopOrders?.find(
//           so => so._id.equals(a.shopOrderId)
//         );

//         if (!shopOrder) return null;

//         return {
//           assignmentId: a._id,
//           orderId: a.order._id,
//           shopName: a.shop.name,
//           deliveryAddress: a.order.deliveryAddress,
//           items: shopOrder.shopOrderItems,
//           subTotal: shopOrder.subTotal
//         };
//       })
//       .filter(Boolean);

//     return res.status(200).json(formatted);
//   } catch (err) {
//     console.error("Delivery assignment error:", err);
//     return res.status(500).json({ message: err.message });
//   }
// };



export const acceptOrders = async(req,res)=>{
         try{
           const {assignmentId} = req.params
           const assignment = await DeliveryAssignment.findById(assignmentId)
       if(!assignment){
        return res.status(400).json({message:"assingment not found"})
       }
       if(assignment.status !== 'broadcasted'){
        return res.status(400).json({message:"assignment is expired"})
       }
       const alreadyAssigned = await DeliveryAssignment.findOne({
        assignedTo:req.userId,
        status:{$nin:["broadcasted","assigned"]}
       })
       if(alreadyAssigned){
        return res.status(400).json({message:"You are already assigned to another order"})
       }
              assignment.assignedTo = req.userId
              assignment.status = 'assigned'    
              assignment.acceptedAt = new Date()
              await assignment.save()
              const order = await Order.findById(assignment.order)
              if(!order){
                return res.status(400).json({message:"assigment is expired"})
              }
              const shopOrder = order.shopOrders.find(so=>so._id.toString()===assignment.shopOrderId.toString())
                 shopOrder.assignedDeliveryBoy =req.userId
                 await order.save()

                // await order.populate("shopOrders.assignedDeliveryBoy")
            return res.status(200).json({message:"order accepted"})
            }          
         catch(err){
           res.status(500).json({message:"Accept orders error:",err})
         }
}


export const getCurrentOrder = async(req,res)=>{
    try{
        const assignment = await DeliveryAssignment.findOne({
            assignedTo:req.userId,
            status:"assigned"
        }).populate("shop","name")
        .populate("assignedTo","fullName email mobile location")
        .populate({
            path:"order",
            populate:[{path:"user",select:"fullName email location mobile"}],
        })
        if(!assignment){
            return res.status(400).json({message:"assignment not found"})
        }
        if(!assignment.order){
         return res.status(400).json({message:"assignment order not found"})   
        }
        const shopOrder = assignment.order.shopOrder.find(so=>String(so._id) ==String(assignment.shopOrderId))
       if(!shopOrder){
        return res.status(400).json({message:"shopOrder not found"})
       }

       let deliveryBoyLocation = {lat:null,lon:null}
      deliveryBoyLocation.lat=  assignment.assignedTo.location.coordinates[1]
      deliveryBoyLocation.lon = assignment.assignedTo.location.coordinates[0]
       const customerLocations = assignment.order.deliveryAddress
    }
    catch(err){
         res.status(500).json({message:"get current orders error:",err})
    }
}