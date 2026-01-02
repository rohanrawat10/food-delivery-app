import { TiEdit } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

export default function OwnerItemCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-gradient-to-br from-gray-100 to-gray-200
                 rounded-3xl overflow-hidden shadow-lg
                 hover:shadow-2xl transition
                 flex flex-col h-full"
    >
      {/* Edit Button */}
      <button
        className="absolute top-3 right-3 bg-white/70
                   backdrop-blur-md p-2 rounded-full
                   hover:bg-orange-100 z-10"
        onClick={() => navigate(`/edit-item/${data._id}`)}
      >
        <TiEdit size={20} />
      </button>

      {/* IMAGE */}
      <div className="h-44 flex items-center justify-center p-4">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-contain drop-shadow-xl"
        />
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-t-3xl p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          Name: {data.name}
        </h3>

        <p className="text-sm text-gray-700 mt-2">
          Price: ₹{data.price}
        </p>

        <p className="text-sm text-gray-700">
          Category: {data.category}
        </p>

        <p className="text-sm text-gray-700">
          Food Type: {data.foodType}
        </p>

        {/* keeps bottom spacing equal */}
        <div className="mt-auto" />
      </div>
    </div>
  );
}
