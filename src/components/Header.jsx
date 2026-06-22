import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, AlertTriangle, Leaf } from 'lucide-react';
import { getCartCount } from '../utils/cartHelper';

const alerts = [
  { type: "warning", icon: <AlertTriangle size={14}/>, text: "इस सप्ताह पंजाब और हरियाणा क्षेत्रों में सफेद मक्खी (सफेद कीट) का भारी प्रकोप देखा गया है।" },
  { type: "info", icon: <Leaf size={14}/>, text: "नया स्टॉक: बायर का मोवेंटो एनर्जी अब उपलब्ध है — रस चूसने वाले कीटों के लिए सर्वोत्तम।" },
];

const Header = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  const [cartCount, setCartCount] = useState(getCartCount());
  const isLoggedIn = !!localStorage.getItem('token');
  const [alertIndex, setAlertIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setAlertIndex(p => (p + 1) % alerts.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <header className="px-6 md:px-10 py-4 flex items-center justify-between gap-4 sticky top-0 z-[60] bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-[#00693B] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md font-inter tracking-tighter">PI</div>
          <div>
            <h1 className="text-xl font-black text-[#111827] m-0 leading-[1.1] font-inter tracking-tight">
              Pesticide<span className="text-[#00693B]">India</span>
            </h1>
            <p className="text-[11px] font-semibold text-gray-500 m-0 uppercase tracking-widest mt-[2px]">Smart Farming Solutions</p>
          </div>
        </div>

        {/* Desktop Ticker */}
        <div className="hidden lg:flex items-center bg-[#fffbeb] border border-[#fde68a] px-3.5 py-1.5 rounded-full shadow-sm max-w-[480px] flex-1 overflow-hidden">
          <span className={`w-2 h-2 rounded-full mr-2 shrink-0 animate-pulse ${alertIndex === 0 ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
          <span key={alertIndex} className="text-[11px] font-bold text-amber-800 whitespace-nowrap overflow-hidden text-ellipsis m-0 font-outfit animate-[fadeInUp_0.5s_ease]">
            {alerts[alertIndex].text}
          </span>
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

          <button onClick={() => navigate('/cart')} className="text-gray-500 hover:text-[#00693B] transition-colors relative cursor-pointer flex items-center justify-center p-2 rounded-full hover:bg-gray-100/50 mr-1" title="Shopping Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => navigate('/about')} className="text-[13px] font-semibold text-gray-500 hover:text-[#00693B] transition-colors font-outfit cursor-pointer">About</button>

          {!isLoggedIn ? (
            <button onClick={() => navigate('/login')} className="px-5 py-1.5 bg-white border-[1.5px] border-[#00693B] rounded-lg text-[13px] font-bold text-[#00693B] hover:bg-[#00693B] hover:text-white transition-all font-outfit cursor-pointer">Login</button>
          ) : (
            <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} className="px-4 py-1.5 bg-white border-[1.5px] border-red-300 rounded-lg text-[13px] font-semibold text-red-600 hover:bg-red-50 hover:border-red-500 transition-all font-outfit cursor-pointer">Logout</button>
          )}
        </div>
      </header>

      {/* Mobile Ticker */}
      <div className="lg:hidden bg-[#fffbeb] border-b border-[#fde68a] px-4 py-2 flex items-center shadow-sm">
        <span className={`w-2 h-2 rounded-full mr-2 shrink-0 animate-pulse ${alertIndex === 0 ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
        <span key={alertIndex + 'mobile'} className="text-[11px] font-bold text-amber-800 whitespace-nowrap overflow-hidden text-ellipsis m-0 font-outfit animate-[fadeInUp_0.5s_ease]">
          {alerts[alertIndex].text}
        </span>
      </div>
    </>
  );
};

export default Header;
