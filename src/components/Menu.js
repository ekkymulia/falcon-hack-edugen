import Image from "next/image";
import { Star, Tag } from "lucide-react";

const Menu = ({ menu }) => {
  return (
    <div className="mb-4 flex p-4 bg-white rounded-lg">
      <div className="relative w-20 h-20 rounded-md overflow-hidden mr-4">
        <Image
          src={menu.image}
          alt={menu.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div>
        <h3 className="font-bold text-sm">{menu.title}</h3>
        <div className="flex items-center space-x-1">
          <Star fill="#FFD600" strokeWidth={0} size={14} />
          <p className="text-xs text-gray-600">
            {menu.rating} · {menu.category}
          </p>
        </div>
        <p className="text-xs text-gray-600">{menu.price}</p>
        <div className="inline-flex space-x-1 border rounded-md p-1 items-center">
          <Tag size={12} fill="#ea580c" color="#fff" />
          <p className="text-[10px]">{menu.discount}</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
