import Image from "next/image";
import CategorySelector from "@/components/CategorySelector";
import { Heart, NotepadText, ChevronDown, Search } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-white min-h-screen max-w-md bg-gradient-to-r from-green-400 to-blue-500">
      <header className="bg-gradient-to-r from-green-400 to-blue-500 relative inset-y-4 p-4 space-x-2 flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-white text-xs">ANTAR KE</div>
          <div className="text-white text-sm font-semibold flex flex-row">
            <p className="truncate overflow-hidden whitespace-nowrap w-xs">
              PT. Latte Indonesia Head Quarter
            </p>
            <ChevronDown size={16} />
          </div>
        </div>
        <Heart
          size={32}
          color="#fff"
          className="bg-[#7ad3d3] rounded-full p-2"
        />
        <NotepadText
          size={32}
          color="#fff"
          className="bg-[#7ad3d3] rounded-full p-2"
        />
      </header>
      <div className="flex-1 mx-4 relative inset-y-4 shadow-md rounded-md">
        <input
          type="text"
          placeholder="What shall we deliver?"
          className="w-full p-2 pl-10 rounded-md bg-white"
        />
        <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
      </div>
      <div className="bg-white p-4 h-screen">
        <CategorySelector />
      </div>
    </main>
  );
}
