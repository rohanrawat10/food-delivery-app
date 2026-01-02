export default function OwnerItemCard({data}){
    // console.log(data.image);
    // console.log(data.category)
    // console.log(data.foodType)
    console.log(data)
    return(
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden border mb-5 border-[#ff4d2d] w-full max-w-2xl">
          <div className="w-36 h-full flex-shrink-0 bg-gray-50">
            <img src={data.image} className="w-full h-full object-cover"/>
          </div>
          <div className="flex flex-col justify-between p-3 flex-1">
         <div>
       <h2 className="text-base font-semibold text-[#ff4d2d]">{data.name}</h2>
        <p className="font-medium text-gray-700"> Categorey:{data.category} </p>
        <p>Food Type:{data.foodType}</p>
        </div>
          </div>
        </div>

    )
}
