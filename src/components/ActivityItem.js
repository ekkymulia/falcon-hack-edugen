import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ActivityItem = ({ item }) => {
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-200">
      <div className="flex items-center">
        <div className="relative w-8 h-8 mr-4">
          <Image
            src={item.icon}
            alt={item.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.date}</p>
          <div className="flex flex-row space-x-4 text-blue-500 text-sm font-semibold">
            <div className="flex flex-row items-center space-x-2">
              <Link href={"/activity/" + item.id + "/review/"}>Ulas</Link>
              <ArrowRight
                size={16}
                className="text-blue-500 bg-blue-100 rounded-full "
              />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <Link href="">Pesan ulang</Link>
              <ArrowRight
                size={16}
                className="text-blue-500 bg-blue-100 rounded-full "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">{item.price}</p>
        <p className="text-xs text-gray-500">{item.points}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
