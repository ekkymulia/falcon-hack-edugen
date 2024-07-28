import Image from "next/image";
import { Star, Globe, Tag, Utensils, HandCoins, HandPlatter } from "lucide-react";
import MenuItem from "@/components/MenuItem";

import FoodBackground from "/public/assets/images/food/food1.jpg";
import DeliveryIcon from "/public/assets/images/feature/delivery.png";
import AnekaNasiIcon from "/public/assets/images/food/aneka-nasi.jpg";
import HidanganLautIcon from "/public/assets/images/food/hidangan-laut.jpg";
import AyamIcon from "/public/assets/images/food/ayam.jpg";
import CemilanIcon from "/public/assets/images/food/cemilan.jpg";
import CepatSajiIcon from "/public/assets/images/food/cepat-saji.jpg";
import MinumanIcon from "/public/assets/images/food/minuman.jpg";

const menus = [
  {
    name: "Nasi Uduk",
    price: "7.500",
    image: AnekaNasiIcon,
  },
  {
    name: "Lobster Rebus",
    price: "93.000",
    image: HidanganLautIcon,
  },
  {
    name: "Ayam Bakar",
    price: "35.000",
    image: AyamIcon,
  },
  {
    name: "Kacang Goreng",
    price: "5.000",
    image: CemilanIcon,
  },
  {
    name: "Burger",
    price: "25.000",
    image: CepatSajiIcon,
  },
  {
    name: "Milkshake",
    price: "15.000",
    image: MinumanIcon,
  },
];

export default function Home() {
  return (
    <main className="relative bg-white max-w-sm min-h-screen">
      <div className="absolute top-0 left-0 w-full h-40">
        <Image
          src={FoodBackground}
          alt="Food Background"
          layout="fill"
          objectFit="cover"
          className="rounded-b-lg"
        />
      </div>
      <div className="relative z-10 p-4 bg-white rounded-lg shadow-md mb-4 m-8 mt-20">
        <h2 className="text-xl font-bold">Kaca Mata - Grand Wijaya Center</h2>
        <hr className="border-gray-300 my-2" />
        <div className="flex items-center text-xs text-gray-600 mb-2 py-1">
          <p className="flex items-center mr-1">
            <span className="mr-2">
              <Star fill="#FFD600" strokeWidth={0} size={16} />
            </span>
            4.7 (1rb+) ·
          </p>
          <span>Nilai dan ulasan</span>
        </div>
        <hr className="border-gray-300 my-2" />
        <div className="text-sm text-gray-600 mb-2">
          <div className="flex items-center font-semibold mb-2 py-1">
            <span className="mr-2">
              <Globe size={16} color="#3b82f6" />
            </span>
            Bahasa menu
          </div>
          <hr className="border-gray-300 my-2" />
          <div className="flex items-center mb-2">
            <span className="mr-2">
              <Image
                src={DeliveryIcon}
                alt="Delivery Icon"
                width={16}
                height={16}
              />
            </span>
            <div className="flex flex-col">
              <p className="font-semibold">Pengantaran tanpa kontak</p>
              <p className="text-[10px]">6,8 km, Mulai dari 35 menit</p>
            </div>
          </div>
          <hr className="border-gray-300 my-2" />
          <div className="flex items-center mb-2">
            <span className="mr-2">
              <Tag size={16} fill="#ea580c" color="#fff" />
            </span>
            KOTA SOBAT 10rb min 40rb
          </div>
        </div>
      </div>
      <div className="relative z-10 p-4 bg-white rounded-lg shadow-md mb-4 m-8">
        <h2 className="text-xl font-bold">Rangkuman Gourmand AI</h2>
        <div className="text-sm text-gray-600 mb-2">
          <hr className="border-gray-300 my-2" />
          <div className="flex items-center mb-2">
            <span className="mr-2">
              <Utensils size={16} />
            </span>
            <div className="flex flex-col">
              <p className="font-semibold">Rasa</p>
              <p className="text-[10px]">Restoran ini sering mendapat pujian. Beberapa customer mendeskripsikan rasanya enak, gurih, bumbunya berasa.</p>
            </div>
          </div>
          <hr className="border-gray-300 my-2" />
          <div className="flex items-center mb-2">
            <span className="mr-2">
              <HandCoins size={16} />
            </span>
            <div className="flex flex-col">
              <p className="font-semibold">Harga</p>
              <p className="text-[10px]">Sebagian besar customer merasa harga di restoran ini murah dan banyak promo.</p>
            </div>
          </div>
          <hr className="border-gray-300 my-2" />
          <div className="flex items-center mb-2">
            <span className="mr-2">
              <HandPlatter size={16} />
            </span>
            <div className="flex flex-col">
              <p className="font-semibold">Layanan</p>
              <p className="text-[10px]">Beberapa customer mengeluhkan proses masak yang lumayan lama.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 mx-4">
        <h2 className="text-lg font-bold mb-4">Untukmu</h2>
        <div className="grid grid-cols-2 gap-4">
          {menus.map((menu, index) => (
            <MenuItem key={index} item={menu} />
          ))}
        </div>
      </div>
    </main>
  );
}
