import { House, CircleUser } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-cyan-100 p-2 flex items-center justify-between">
      <button className="text-black text-sm gap-2 bg-white rounded-md shadow-md p-3 flex items-center">
        <House color="#6b7280" size={16} />
        EdugenAI
      </button>

      <button className="text-black text-sm gap-2 bg-white rounded-md shadow-md p-3 flex items-center">
        <CircleUser color="#6b7280" size={16} />
        Account
      </button>
      
    </div>
  );
};

export default Header;
