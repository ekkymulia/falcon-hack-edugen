import Image from "next/image";
import { ArrowRight } from "lucide-react";

import AnekaNasiIcon from "../../public/assets/images/food/aneka-nasi.jpg";
import HidanganLautIcon from "../../public/assets/images/food/hidangan-laut.jpg";
import AyamIcon from "../../public/assets/images/food/ayam.jpg";

const promotions = [
  {
    title: "Nasi Uduk",
    image: AnekaNasiIcon,
    discount: "Diskon 50%",
    duration: "25 menit",
    distance: "2,1 km",
  },
  {
    title: "Seafood Lobster",
    image: HidanganLautIcon,
    discount: "Diskon 40%",
    duration: "30 menit",
    distance: "3,0 km",
  },
  {
    title: "Ayam Bakar",
    image: AyamIcon,
    discount: "Diskon 30%",
    duration: "20 menit",
    distance: "1,5 km",
  },
];

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
        {promotions.map((promo, index) => (
          <div key={index} className="min-w-[150px] bg-white rounded-lg">
            <Image
              src={promo.image}
              alt={promo.title}
              layout="fit"
              className="object-cover rounded-md"
            />
            <p className="font-bold text-[10px] text-orange-400 mt-2">PROMO</p>
            <h3 className="font-bold text-sm">{promo.title}</h3>
            <p className="text-[10px] text-gray-500">
              {promo.duration} • {promo.distance}
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
