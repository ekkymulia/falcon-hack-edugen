"use client";
import { useState } from "react";
import { Star } from "lucide-react";

const RatingStars = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-4">
      {Array.from({ length: 5 }, (_, index) => index + 1).map((starIndex) => (
        <span
          key={starIndex}
          onClick={() => setRating(starIndex)}
          className="cursor-pointer"
        >
          <Star
            size={24}
            fill={starIndex <= rating ? "#FFD700" : "none"}
            stroke={"black"}
          />
        </span>
      ))}
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

  const postReviews = async (data) => {
    try {
      const response = await fetch("https://angelhacks-fullstack-msi3blwcf-ekkymulias-projects.vercel.app//api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(false);

    const result = await postReviews({
      user_id: "66a594d8805baa2088ee7a78",
      bill_id: "66a5992f13ae6c21dbf57192",
      message: `${price} ${priceComment} ${taste} ${tasteComment} ${service} ${serviceComment}`,
      rating,
      merchant_id: "66a53ba5ab6c4333f3138c7b",
    });

    if (result) {
      setIsSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-row space-x-4">
        <label className="text-xl font-medium text-black">Rating</label>
        <RatingStars rating={rating} setRating={setRating} />
      </div>
      <div>
        <label className="text-lg font-medium text-black">
          Apakah harga sudah sesuai?
        </label>
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 w-full rounded-md border outline-none p-2 border-gray-300 shadow-sm text-black"
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
          className="resize-none outline-none border p-2 mt-2 w-full rounded-md border-gray-300 shadow-sm text-black"
        />
      </div>
      <div>
        <label className="text-lg font-medium text-black">
          Bagaimana rasa makanan anda?
        </label>
        <select
          value={taste}
          onChange={(e) => setTaste(e.target.value)}
          className="mt-1 w-full rounded-md border outline-none p-2 border-gray-300 shadow-sm text-black"
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
          className="resize-none outline-none border p-2 mt-2 w-full rounded-md border-gray-300 shadow-sm text-black"
        />
      </div>
      <div>
        <label className="text-lg font-medium text-black">
          Bagaimana dengan pelayanannya?
        </label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="mt-1 w-full rounded-md border outline-none p-2 border-gray-300 shadow-sm text-black"
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
          className="resize-none outline-none border p-2 mt-2 w-full rounded-md border-gray-300 shadow-sm text-black"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded text-black"
        >
          Submit
        </button>
      </div>
      {isSubmitted && (
        <div className="text-center text-xs font-medium text-green-700">
          Thank you for your review! You have earned 50 Grab Points. Have a
          great day!
        </div>
      )}
    </form>
  );
};

export default function Home() {
  return (
    <main className="bg-white min-h-screen max-w-md mx-8 p-4">
      <div className="flex flex-col items-center justify-center h-full bg-white">
        <ReviewForm />
      </div>
    </main>
  );
}
