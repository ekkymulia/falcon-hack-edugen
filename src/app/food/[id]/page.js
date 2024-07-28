"use client"
import Image from "next/image";
import { Star, Globe, Tag, Utensils } from "lucide-react";
import MenuItem from "@/components/MenuItem";
import { useState, useEffect } from "react";


import FoodBackground from "/public/assets/images/food/food1.jpg";
import DeliveryIcon from "/public/assets/images/feature/delivery.png";
import AnekaNasiIcon from "/public/assets/images/food/aneka-nasi.jpg";
import HidanganLautIcon from "/public/assets/images/food/hidangan-laut.jpg";
import AyamIcon from "/public/assets/images/food/ayam.jpg";
import CemilanIcon from "/public/assets/images/food/cemilan.jpg";
import CepatSajiIcon from "/public/assets/images/food/cepat-saji.jpg";
import MinumanIcon from "/public/assets/images/food/minuman.jpg";

const ReviewSummary = () => {
  const [reviewSummary, setReviewSummary] = useState([]);

  useEffect(() => {
    const fetchReviewSummary = async () => {
      const response = await fetch(
        "http://localhost:3000/api/review/merchant?id=66a53ba5ab6c4333f3138c7b",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      const data = await response.json();
      setReviewSummary(data);
    };

    fetchReviewSummary();
  }, []);

  return (
    <div className="relative z-10 p-4 bg-white rounded-lg shadow-md mb-4 m-8">
      <h2 className="text-xl font-bold text-black">Rangkuman Gourmand AI</h2>
      <div className="text-sm text-gray-600 mb-2">
        <hr className="border-gray-300 my-2" />
        {reviewSummary.map((summary, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="mr-2">
              <Utensils size={16} />
            </span>
            <div className="flex flex-col">
              <p className="capitalize font-semibold">{summary[0]}</p>
              <p className="capitalize text-[10px]">{summary[1]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
        <h2 className="text-xl font-bold text-black">Sinar Bulan</h2>
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
      <ReviewSummary />
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
