export default function CategoryCard({data}){
    return(
        <div className="relative w-[120px] h-[120px] md:w-[180px] rounded-2xl
        border-2 border-orange-200 shrink-0 overflow-hidden bg-white
        shadow-xl shadow-gray-200 hover:shadow-lg transition-shadow
        ">
         <img src={data.image} alt={data.category}
         className=" w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
         />
         <div className="absolute bottom-0 w-full left-0 bg-[#ffffff96] bg-opacity-10 px-3 
             rounded-xl text-center shadow text-sm font-medium
            text-gray-800 
         ">
             {data.category}
         </div>
        </div>
    )
}