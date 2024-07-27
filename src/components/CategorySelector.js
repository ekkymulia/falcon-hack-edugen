import Image from "next/image";

import AnekaNasiIcon from "../../public/assets/images/food/aneka-nasi.jpg";
import HidanganLautIcon from "../../public/assets/images/food/hidangan-laut.jpg";
import AyamIcon from "../../public/assets/images/food/ayam.jpg";
import CemilanIcon from "../../public/assets/images/food/cemilan.jpg";
import CepatSajiIcon from "../../public/assets/images/food/cepat-saji.jpg";
import MinumanIcon from "../../public/assets/images/food/minuman.jpg";

const categories = [
  { name: "Aneka Nasi", icon: AnekaNasiIcon },
  { name: "Hidangan Laut", icon: HidanganLautIcon },
  { name: "Ayam", icon: AyamIcon },
  { name: "Cemilan", icon: CemilanIcon },
  { name: "Cepat Saji", icon: CepatSajiIcon },
  { name: "Minuman", icon: MinumanIcon },
];

const CategorySelector = () => {
  return (
    <div className="p-4 flex overflow-x-scroll scrollbar-hide">
      {categories.map((category) => (
        <div key={category.name} className="flex flex-col items-center mr-6">
          <div className="w-16 h-16 rounded-full overflow-hidden relative">
            <Image
              src={category.icon}
              alt={category.name}
              layout="fixed"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <span className="mt-2 text-center text-xs">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
