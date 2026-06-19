import React from 'react';
import DesktopSidebar from '../components/DesktopSidebar';
import { Send, Leaf, Image as ImageIcon, History, ChevronRight } from 'lucide-react';

const DUMMY_HISTORY = [
  "Tomato Leaf Curl Virus",
  "Wheat Rust Identification",
  "Best Fertilizer for Corn",
  "Pest Control for Soybeans",
  "Whiteflies on Cotton"
];

const SUGGESTED_PRODUCTS = [
  {
    name: "Nativo 75 WG",
    price: "₹1,250",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Coragen Insecticide",
    price: "₹890",
    image: "https://images.unsplash.com/photo-1628102491629-77858ab5721f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }
];

const ChatScreen = () => {
  return (
    <div className="h-screen font-sans flex overflow-hidden" style={{background: '#FFFFFF'}}>
      <DesktopSidebar />
      
      {/* Main container avoiding sidebar */}
      <div className="flex-1 flex min-w-0 h-screen ml-24 gap-4 p-4">
        
        {/* Left Column: History */}
        <div className="w-72 bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex flex-col hidden lg:flex">
          <div className="flex items-center gap-2 mb-6 text-[#00693B]">
            <History size={20} className="text-[#00693B]" />
            <h2 className="font-bold text-lg text-[#00693B]">History</h2>
          </div>
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
            {DUMMY_HISTORY.map((item, idx) => (
              <button key={idx} className="text-left px-4 py-3 rounded-2xl hover:bg-gray-50 text-sm font-medium text-[#333333] transition-colors border border-transparent hover:border-gray-100 flex items-center justify-between group">
                <span className="truncate">{item}</span>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 text-[#333333] transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Center Column: Chat Interface */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden relative">
          
          {/* Chat Header */}
          <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div>
              <h2 className="font-bold text-xl text-[#00693B]">AI Crop Assistant</h2>
              <p className="text-xs font-medium text-[#00693B] flex items-center gap-1 mt-1">
                <span className="w-2 h-2 rounded-full bg-[#FEB600]"></span> Online
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
            <div className="self-end max-w-[80%]">
              <div className="bg-[#FEB600] text-white p-4 rounded-2xl rounded-tr-sm shadow-sm">
                <p className="text-sm leading-relaxed">I noticed yellow spots on my tomato leaves, and some of them are curling upwards. What could be the issue?</p>
              </div>
              <p className="text-[10px] text-[#333333] mt-1.5 text-right font-medium">10:24 AM</p>
            </div>
            
            <div className="self-start max-w-[80%]">
              <div className="bg-gray-50 text-[#00693B] p-4 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm">
                <p className="text-sm leading-relaxed">
                  Based on your description, this sounds like <strong>Tomato Yellow Leaf Curl Virus (TYLCV)</strong>, which is typically transmitted by whiteflies. 
                  <br/><br/>
                  <strong>Recommendation:</strong><br/>
                  1. Remove and destroy infected plants immediately to prevent spread.<br/>
                  2. Use yellow sticky traps to monitor and catch whiteflies.<br/>
                  3. Apply a systemic insecticide like <em>Coragen</em> or <em>Nativo</em> to control the whitefly population.
                </p>
              </div>
              <p className="text-[10px] text-[#333333] mt-1.5 font-medium flex items-center gap-1">
                <Leaf size={10} className="text-[#00693B]" /> Precision Farming AI • 10:25 AM
              </p>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-5 border-t border-gray-100 bg-white">
            <div className="relative flex items-end gap-2 bg-gray-50 rounded-3xl p-2 border border-gray-200 focus-within:border-[#FEB600] focus-within:ring-2 focus-within:ring-gray-400/10 transition-all">
              <button className="p-3 text-[#333333] hover:text-[#333333] transition-colors">
                <ImageIcon size={20} />
              </button>
              <textarea 
                className="flex-1 bg-transparent border-none focus:outline-none resize-none py-3 text-sm text-[#00693B] placeholder:text-[#333333] min-h-[44px] max-h-32"
                placeholder="Ask about crops, diseases, or products..."
                rows="1"
              ></textarea>
              <button className="w-11 h-11 bg-[#FEB600] text-white rounded-2xl flex items-center justify-center hover:bg-[#FFF0A0] transition-colors shadow-sm shrink-0 mb-0.5 mr-0.5">
                <Send size={18} className="ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Suggested Products */}
        <div className="w-72 bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex flex-col hidden xl:flex">
          <div className="flex items-center gap-2 mb-6 text-[#00693B]">
            <Leaf size={20} className="text-[#00693B]" />
            <h2 className="font-bold text-lg text-[#00693B]">Suggested Products</h2>
          </div>
          <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-1">
            {SUGGESTED_PRODUCTS.map((product, idx) => (
              <div key={idx} className="flex gap-3 items-center p-3 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-[#00693B] truncate group-hover:text-[#00693B] transition-colors">{product.name}</h3>
                  <p className="text-xs text-[#333333] font-medium mt-1">Recommended</p>
                  <p className="text-sm font-extrabold text-[#00693B] mt-1">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatScreen;
