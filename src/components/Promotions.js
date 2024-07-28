import Image from "next/image";
import { ArrowRight } from "lucide-react";

import getRecommendedProducts from "../app/api/relevantProduct/route";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const data = {user_id:'66a52a8dd96382f0af31aabb'}
const promotions = getRecommendedProducts(data);
console.log(promotions);

const Promotions = () => {
  return (
    <section className="mb-4">
      <div className="flex flex-row space-x-2 items-center">
        <h2 className="text-xl font-bold mb-2">Promosi di Sekitarmu</h2>
        <ArrowRight
          size={16}
          className="text-gray-500 mb-2 bg-gray-100 rounded-full "
        />
      </div>
      <div className="flex overflow-x-scroll space-x-4 scrollbar-hide">
        {promotions.foreach((promo) => (
          <div className="min-w-[150px] bg-white rounded-lg">
            <Image
              src={promo.image}
              alt={promo.title}
              layout="fit"
              className="object-cover rounded-md"
            />
            <p className="font-bold text-[10px] text-orange-400 mt-2">PROMO</p>
            <h3 className="font-bold text-sm">{promo.title}</h3>
            <p className="text-[10px] text-gray-500">
              {getRandomInt(10,30) + "menit"} • {getRandomInt(1,10) + " km"}
            </p>
            <p className="text-[8px] bg-orange-200 inline p-1 rounded">
              {promo.discount}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promotions;
