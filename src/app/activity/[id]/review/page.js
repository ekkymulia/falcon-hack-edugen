"use client";
import { useState } from "react";
import { Star } from "lucide-react";

const RatingStars = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-4">
      {Array(5)
        .fill(0)
        .map((_, index) => {
          const starIndex = index + 1;
          return (
            <span
              key={starIndex}
              onClick={() => setRating(starIndex)}
              className="cursor-pointer"
            >
              <Star
                size={24}
                fill={starIndex <= rating ? "#FFD700" : "none"}
                stroke={starIndex <= rating ? "#FFD700" : "currentColor"}
              />
            </span>
          );
        })}
    </div>
  );
};

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState("");
  const [priceComment, setPriceComment] = useState("");
  const [taste, setTaste] = useState("");
  const [tasteComment, setTasteComment] = useState("");
  const [service, setService] = useState("");
  const [serviceComment, setServiceComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log({
      rating,
      price,
      priceComment,
      taste,
      tasteComment,
      service,
      serviceComment,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-row space-x-4">
        <label className=" text-xl font-medium text-gray-700">Rating</label>
        <RatingStars rating={rating} setRating={setRating} />
      </div>
      <div>
        <label className=" text-lg font-medium text-gray-700">
          Apakah harga sudah sesuai?
        </label>
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1  w-full rounded-md border outline-none p-2 border-gray-300 shadow-sm"
        >
          <option value="">Pilih</option>
          <option value="mahal">Mahal</option>
          <option value="harga pas">Harga Pas</option>
          <option value="murah">Murah</option>
        </select>
        <textarea
          value={priceComment}
          onChange={(e) => setPriceComment(e.target.value)}
          placeholder="Keterangan tambahan"
          className="resize-none outline-none border p-2 mt-2  w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className=" text-lg font-medium text-gray-700">
          Bagaimana rasa makanan anda?
        </label>
        <select
          value={taste}
          onChange={(e) => setTaste(e.target.value)}
          className="mt-1  w-full rounded-md border outline-none p-2 border-gray-300 shadow-sm"
        >
          <option value="">Pilih</option>
          <option value="enak">Enak</option>
          <option value="biasa saja">Biasa Saja</option>
          <option value="kurang memuaskan">Kurang Memuaskan</option>
        </select>
        <textarea
          value={tasteComment}
          onChange={(e) => setTasteComment(e.target.value)}
          placeholder="Keterangan tambahan"
          className="resize-none outline-none border p-2 mt-2  w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className=" text-lg font-medium text-gray-700">
          Bagaimana dengan pelayanannya?
        </label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="mt-1  w-full rounded-md border outline-none p-2 border-gray-300 shadow-sm"
        >
          <option value="">Pilih</option>
          <option value="sangat baik">Sangat Baik</option>
          <option value="biasa saja">Biasa Saja</option>
          <option value="buruk">Buruk</option>
        </select>
        <textarea
          value={serviceComment}
          onChange={(e) => setServiceComment(e.target.value)}
          placeholder="Keterangan tambahan"
          className="resize-none outline-none border p-2 mt-2  w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
      {isSubmitted && (
        <div className="mt-4 text-center text-xs font-medium text-green-700 break-words">
          Thank you for your review! You have earned 50 Grab Points. Have a
          great day!
        </div>
      )}
    </form>
  );
};

export default function Home() {
  return (
    <main className="bg-white min-h-screen w-xs mx-8 p-4">
      <div className="flex flex-col items-center justify-center h-full bg-white">
        <ReviewForm />
      </div>
    </main>
  );
}
