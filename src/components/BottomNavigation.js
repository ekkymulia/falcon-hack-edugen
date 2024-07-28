import Link from "next/link";
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
      <Link href="/" passHref>
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <House size={24} />
          <span className="text-xs">Beranda</span>
        </div>
      </Link>
      <Link href="/activity" passHref>
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <FileClock size={24} />
          <span className="text-xs">Aktivitas</span>
        </div>
      </Link>
      <Link href="/payment" passHref>
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <CircleDollarSign size={24} />
          <span className="text-xs">Pembayaran</span>
        </div>
      </Link>
      <Link href="/inbox" passHref>
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <MessageSquareText size={24} />
          <span className="text-xs">Kotak Masuk</span>
        </div>
      </Link>
      <Link href="/account" passHref>
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <CircleUserRound size={24} />
          <span className="text-xs">Akun</span>
        </div>
      </Link>
    </div>
  );
};

export default BottomNavigation;
