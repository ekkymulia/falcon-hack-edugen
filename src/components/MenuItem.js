import Image from "next/image";
import { Plus } from "lucide-react";

const MenuItem = ({ item }) => {
  return (
    <div className="w-full mb-4">
      <div className="relative w-full h-32 rounded-md overflow-hidden mb-2">
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          objectFit="cover"
        />
        <button className="absolute bottom-2 right-2 text-white bg-green-700 px-2 py-1 rounded-full">
          <Plus />
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
