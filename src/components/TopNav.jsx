import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopNav = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <header className="px-6 md:px-10 py-6 md:py-8 flex items-center justify-between gap-4 sticky top-0 z-50 bg-gray-100/70 backdrop-blur-xl">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 bg-[#00693B] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md font-inter tracking-tighter">PI</div>
        <div>
          <h1 className="text-xl font-black text-[#111827] m-0 leading-[1.1] font-inter tracking-tight">
            Pesticide<span className="text-[#00693B]">India</span>
          </h1>
          <p className="text-[11px] font-semibold text-gray-500 m-0 uppercase tracking-widest mt-[2px]">Smart Farming Solutions</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          id="about-btn"
          onClick={() => navigate('/about')}
          className="text-[13px] font-semibold text-gray-500 hover:text-[#00693B] transition-colors font-outfit cursor-pointer"
        >
          About
        </button>

        {!isLoggedIn && (
          <button
            id="login-btn"
            onClick={() => navigate('/login')}
            className="px-5 py-1.5 bg-white border-[1.5px] border-[#00693B] rounded-lg text-[13px] font-bold text-[#00693B] hover:bg-[#00693B] hover:text-white transition-all font-outfit cursor-pointer"
          >
            Login
          </button>
        )}

        {isLoggedIn && (
          <button
            id="logout-btn"
            onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
            className="px-4 py-1.5 bg-white border-[1.5px] border-red-300 rounded-lg text-[13px] font-semibold text-red-600 hover:bg-red-50 hover:border-red-500 transition-all font-outfit cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default TopNav;
