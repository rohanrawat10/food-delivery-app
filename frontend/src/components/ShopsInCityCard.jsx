export default function ShopsInCityCard({name,image}){
    return (
  <div
    className="group relative w-[130px] h-[130px] md:min-w-[180px] rounded-2xl
    border-2 border-orange-200 shrink-0 overflow-hidden bg-white
    shadow-xl shadow-gray-200 hover:shadow-lg transition-shadow"
  >
    <img
      src={image}
      alt=""
      className="w-full h-full object-cover transform
      group-hover:scale-110 transition-transform duration-300"
    />

    <div
      className="absolute bottom-0 left-0 w-full px-3 py-1
      bg-[#ffffff96] text-center text-sm font-medium text-gray-800
      opacity-0 group-hover:opacity-100
      transition-opacity duration-300"
    >
      {name}
    </div>
  </div>
);

}