import {
  House,
  FileClock,
  CircleDollarSign,
  MessageSquareText,
  CircleUserRound,
} from "lucide-react";

const BottomNavigation = () => {
  return (
    <div className="bottom-0 bg-white relative w-full inset-x-0 py-2 px-4 flex flex-row justify-evenly border-t border-gray-200">
      <div className="flex flex-col justify-center items-center">
        <House size={24} />
        <span className="text-xs">Beranda</span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <FileClock size={24} />
        <span className="text-xs">Aktivitas</span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <CircleDollarSign size={24} />
        <span className="text-xs">Pembayaran</span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <MessageSquareText size={24} />
        <span className="text-xs">Kotak Masuk</span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <CircleUserRound size={24} />
        <span className="text-xs">Akun</span>
      </div>
    </div>
  );
};

export default BottomNavigation;
