import React from 'react';
import { ShoppingCart, Bell } from 'lucide-react';

const TopNav = () => {
  return (
    <div className="w-full px-8 py-4 flex justify-end items-center gap-6 border-b border-gray-100/50 bg-white/50 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-5">
        <button className="text-[#333333] hover:text-[#00693B] transition-colors">
          <ShoppingCart size={20} strokeWidth={2} />
        </button>
        <button className="text-[#333333] hover:text-[#00693B] transition-colors relative">
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          <Bell size={20} strokeWidth={2} />
        </button>
      </div>
      <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
        <button className="text-[#00693B] font-semibold text-sm hover:text-[#333333] transition-colors">
          Login
        </button>
        <button className="bg-[#FEB600] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#FFF0A0] transition-all shadow-md shadow-gray-900/10 active:scale-95">
          Register
        </button>
      </div>
    </div>
  );
};

export default TopNav;
