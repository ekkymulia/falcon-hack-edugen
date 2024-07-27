"use client";
import Image from "next/image";

import MobilIcon from "../../public/assets/images/feature/car.png";
import MotorIcon from "../../public/assets/images/feature/bike.png";
import MakananIcon from "../../public/assets/images/feature/food.png";
import BelanjaIcon from "../../public/assets/images/feature/grosir.png";
import { Ellipsis } from "lucide-react";

const NavigationTabs = () => {
  const tabs = [
    { name: "Mobil", icon: MobilIcon },
    { name: "Motor", icon: MotorIcon },
    { name: "Makanan", icon: MakananIcon },
    { name: "Belanja", icon: BelanjaIcon },
  ];

  return (
    <div className="bg-white px-2 py-4 flex justify-around">
      {tabs.map((tab) => (
        <div key={tab.name} className="flex flex-col items-center">
          <Image src={tab.icon} alt={tab.name} width={48} height={48} />
          <span>{tab.name}</span>
        </div>
      ))}
      <div className="flex flex-col items-center">
        <Ellipsis size={48} color="#22c55e" className="bg-[#d0ecdb] rounded-full" />
        <span>Semua</span>
      </div>
    </div>
  );
};

export default NavigationTabs;
