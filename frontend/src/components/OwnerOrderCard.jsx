import { FaPhoneAlt } from "react-icons/fa"
function OwnerOrderCard({data}){
    console.log(data.user)
    return(
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
             <div>
                 <h2 className="text-lg font-semibold text-gray-800">{data.user.fullName}</h2>
              <p className="text-sm text-gray-500 ">{data.user.email}</p>
              <p className="flex items-center gap-2 text-sm text-gray-600 mt-1"><FaPhoneAlt /><span>{data.user.mobile}</span></p>
              
             </div>
             <div className="flex items-start gap-2 text-gray-600 text-sm">
                 <p>{data?.deliveryAddress.text}</p>
             </div>
               <div className="flex space-x-4 overflow-x-auto pb-2">
                            { 
                            data.shopOrders.shopOrderItems.item.map((items, index)=>(
                                    <div key={index} className="flex-shrink-0 w-40  border rounded-lg p-2 bg-white">
                                        <img src={items.item.image} alt="" className="w-full h-24 object-cover rounded" />
                                        <p className="text-sm text-center font-semibold mt-1">{item.name}</p>
                                        <p className="text-sm text-center">₹{item.price}*{item.quantity}</p>
                                    </div>

                                ))
                            }
                        </div>
        </div>
    )
}
export default OwnerOrderCard;