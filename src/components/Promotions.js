'use client'
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      const response = await fetch(
        "http://localhost:3000/api/relevantProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: "66a52a8dd96382f0af31aabb" }),
        }
      );
      const data = await response.json();
      setPromotions(data);
    };

    fetchPromotions();
  }, []);

  return (
    <section className="mb-4">
      <div className="flex flex-row space-x-2 items-center">
        <h2 className="text-xl text-black font-bold mb-2">Rekomendasi untuk kamu</h2>
        <ArrowRight
          size={16}
          className="text-gray-500 mb-2 bg-gray-100 rounded-full "
        />
      </div>
      <div className="flex overflow-x-scroll space-x-4 scrollbar-hide">
        {promotions.map((promo, index) => (
          <div key={index} className="min-w-[150px] bg-white rounded-lg p-2">
            <div className="relative w-full h-32">
              <img
                src={promo.gambar}
                alt={promo.nama}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <p className="font-bold text-[10px] text-orange-400 mt-2">Sedang Viral Untuk Kamu</p>
            <h3 className="font-bold text-sm text-black">{promo.nama}</h3>
            <p className="text-[10px] text-gray-500">
              {getRandomInt(10, 30) + " menit"} • {getRandomInt(1, 10) + " km"}
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
