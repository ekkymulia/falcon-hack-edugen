"use client";
import Link from "next/link";
import Image from "next/image";

import MobilIcon from "../../public/assets/images/feature/car.png";
import MotorIcon from "../../public/assets/images/feature/bike.png";
import MakananIcon from "../../public/assets/images/feature/food.png";
import BelanjaIcon from "../../public/assets/images/feature/grosir.png";
import { Ellipsis } from "lucide-react";

const NavigationTabs = () => {
  const tabs = [
    { name: "Mobil", icon: MobilIcon, href: "/car" },
    { name: "Motor", icon: MotorIcon, href: "/bike" },
    { name: "Makanan", icon: MakananIcon, href: "/food" },
    { name: "Belanja", icon: BelanjaIcon, href: "/mart" },
  ];

  return (
    <div className="bg-white px-2 py-4 flex justify-around">
      {tabs.map((tab) => (
        <Link key={tab.name} href={tab.href} passHref>
          <div className="flex flex-col items-center cursor-pointer">
            <Image src={tab.icon} alt={tab.name} width={48} height={48} />
            <span>{tab.name}</span>
          </div>
        </Link>
      ))}
      <Link href="/semua" passHref>
        <div className="flex flex-col items-center cursor-pointer">
          <Ellipsis size={48} color="#22c55e" className="bg-[#d0ecdb] rounded-full" />
          <span>Semua</span>
        </div>
      </Link>
    </div>
  );
};

export default NavigationTabs;
