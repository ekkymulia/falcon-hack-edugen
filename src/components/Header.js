import { ScanLine, Search, Heart } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-green-500 p-4 flex items-center justify-between">
      <button className="text-white bg-white rounded-md shadow-md p-3">
        <ScanLine color="#6b7280" size={16} />
      </button>
      <div className="flex-1 mx-2 relative shadow-md">
        <input
          type="text"
          placeholder="Cari makanan"
          className="w-full p-2 pl-10 rounded-md bg-white"
        />
        <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 h-full border-l border-gray-200"></div>
        <Heart className="absolute right-3 top-2.5 text-gray-500" size={20} />
      </div>
    </div>
  );
};

export default Header;
