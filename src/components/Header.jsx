import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, AlertTriangle, Leaf } from 'lucide-react';
import { getCartCount } from '../utils/cartHelper';
import logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  const [cartCount, setCartCount] = useState(getCartCount());
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      <header className="px-6 md:px-10 py-4 flex items-center justify-between gap-4 sticky top-0 z-[60] bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="Pesticide India Logo" className="w-12 h-12 object-contain" />
          <div>
            <h1 className="text-xl font-black text-[#111827] m-0 leading-[1.1] font-inter tracking-tight">
              Pesticide<span className="text-[#00693B]">India</span>
            </h1>
          </div>
        </div>


        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                localStorage.setItem('lang', e.target.value);
              }}
              className="appearance-none pl-7 pr-6 py-1 bg-white border border-gray-200 rounded-lg text-[11px] font-bold text-gray-700 hover:border-[#00693B] hover:text-[#00693B] transition-all cursor-pointer font-outfit outline-none"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="hinglish">Hinglish</option>
            </select>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs">🌐</div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] text-gray-400">▼</div>
          </div>


          <button onClick={() => navigate('/about')} className="text-[13px] font-semibold text-gray-500 hover:text-[#00693B] transition-colors font-outfit cursor-pointer">About</button>

          {!isLoggedIn ? (
            <button onClick={() => navigate('/login')} className="px-5 py-1.5 bg-white border-[1.5px] border-[#00693B] rounded-lg text-[13px] font-bold text-[#00693B] hover:bg-[#00693B] hover:text-white transition-all font-outfit cursor-pointer">Login</button>
          ) : (
            <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} className="px-4 py-1.5 bg-white border-[1.5px] border-red-300 rounded-lg text-[13px] font-semibold text-red-600 hover:bg-red-50 hover:border-red-500 transition-all font-outfit cursor-pointer">Logout</button>
          )}
        </div>
      </header>

    </>
  );
};

export default Header;
