import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopSidebar from '../components/DesktopSidebar';
import MobileBottomNav from '../components/MobileBottomNav';
import { 
  Search, 
  Send,
  Camera,
  TrendingUp,
  Droplets,
  Star,
  ArrowRight,
  Sprout,
  AlertTriangle,
  Bug,
  FlaskConical,
  Leaf,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 1,
    name: "Nativo 75 WG",
    brand: "Bayer CropScience",
    price: "1,250",
    rating: "4.8",
    stock: "In Stock",
    tags: ["Rice", "Tomato"],
    category: "pesticides",
    image: "/images/nativo.png"
  },
  {
    id: 2,
    name: "Coragen Insecticide",
    brand: "FMC Corporation",
    price: "890",
    rating: "4.5",
    stock: "In Stock",
    tags: ["Cotton", "Soybean"],
    category: "pesticides",
    image: "/images/coragen.png"
  },
  {
    id: 3,
    name: "Roundup Herbicide",
    brand: "Bayer (Monsanto)",
    price: "450",
    rating: "4.2",
    stock: "Low Stock",
    tags: ["Wheat"],
    category: "pesticides",
    image: "/images/roundup.png"
  },
  {
    id: 4,
    name: "Amistar Top",
    brand: "Syngenta",
    price: "1,400",
    rating: "4.9",
    stock: "In Stock",
    tags: ["Tomato", "Rice"],
    category: "pesticides",
    image: "/images/amistar.png"
  },
  {
    id: 5,
    name: "Urea Fertilizer",
    brand: "IFFCO",
    price: "266",
    rating: "4.7",
    stock: "In Stock",
    tags: ["All Crops"],
    category: "fertilizers",
    image: "/images/urea.png"
  },
  {
    id: 6,
    name: "Glyphosate 41%",
    brand: "Excel Crop Care",
    price: "350",
    rating: "4.4",
    stock: "Low Stock",
    tags: ["Tea", "Non-Crop"],
    category: "pesticides",
    image: "/images/glyphosate.png"
  },
  {
    id: 7,
    name: "NPK 19-19-19 Fertilizer",
    brand: "Mahadhan",
    price: "180",
    rating: "4.6",
    stock: "In Stock",
    tags: ["All Crops"],
    category: "fertilizers",
    image: "/images/npk.png"
  },
  {
    id: 8,
    name: "16L Battery Knapsack Sprayer",
    brand: "Neptune",
    price: "2,490",
    rating: "4.7",
    stock: "In Stock",
    tags: ["Spraying"],
    category: "sprayers",
    image: "/images/sprayer.png"
  },
  {
    id: 9,
    name: "Green Shade Net (50% Block)",
    brand: "Tuuf",
    price: "850",
    rating: "4.4",
    stock: "In Stock",
    tags: ["Shading", "Protection"],
    category: "nets",
    image: "/images/shadenet.png"
  },
  {
    id: 10,
    name: "Anti-Insect Crop Netting",
    brand: "AgriNet",
    price: "620",
    rating: "4.5",
    stock: "In Stock",
    tags: ["Protection"],
    category: "nets",
    image: "/images/insectnet.png"
  }
];


const cropTips = [
  { icon: <Droplets size={16}/>, tip: "सुबह जल्दी पानी दें — वाष्पीकरण 30% तक कम होता है।", color: "blue" },
  { icon: <Bug size={16}/>, tip: "हर हफ्ते पत्तों के नीचे जाँच करें — जल्दी पहचान से 80% फसल बच सकती है।", color: "red" },
  { icon: <Sprout size={16}/>, tip: "हर मौसम में फसल बदलें — मिट्टी स्वस्थ रहती है और कीट कम होते हैं।", color: "green" },
  { icon: <FlaskConical size={16}/>, tip: "स्प्रेयर को हमेशा कैलिब्रेट करें — सही मात्रा में दवा लगती है।", color: "purple" },
];

const safetyTips = [
  { icon: <AlertTriangle size={16}/>, tip: "रासायनिक उर्वरकों का उपयोग करते समय हमेशा दस्ताने और मास्क पहनें।" },
  { icon: <FlaskConical size={16}/>, tip: "कीटनाशक स्प्रेयर को इस्तेमाल के बाद अच्छी तरह से धो लें।" },
  { icon: <Sprout size={16}/>, tip: "यूरिया का छिड़काव तेज़ धूप में न करें, इससे पत्तियाँ जल सकती हैं।" },
  { icon: <Bug size={16}/>, tip: "रसायनों को बच्चों और जानवरों की पहुँच से दूर रखें।" },
];

const alerts = [
  { type: "warning", icon: <AlertTriangle size={14}/>, text: "इस सप्ताह पंजाब और हरियाणा क्षेत्रों में सफेद मक्खी (सफेद कीट) का भारी प्रकोप देखा गया है।" },
  { type: "info", icon: <Leaf size={14}/>, text: "नया स्टॉक: बायर का मोवेंटो एनर्जी अब उपलब्ध है — रस चूसने वाले कीटों के लिए सर्वोत्तम।" },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const [aiCrop, setAiCrop] = useState('');
  const [aiAge, setAiAge] = useState('');
  const [aiDisease, setAiDisease] = useState('');
  const [aiStatus, setAiStatus] = useState('idle');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTip, setActiveTip] = useState(0);
  const [alertIndex, setAlertIndex] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const [headerTipIndex, setHeaderTipIndex] = useState(0);
  const isLoggedIn = !!localStorage.getItem('token');

  const categories = ['All', 'Pesticides', 'Fertilizers', 'Sprayers', 'Nets'];

  const getCount = (catName) => {
    if (catName === 'All') return products.length;
    return products.filter(p => p.category.toLowerCase() === catName.toLowerCase()).length;
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || 
                            product.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });



  useEffect(() => {
    const t = setInterval(() => setActiveTip(p => (p + 1) % cropTips.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAlertIndex(p => (p + 1) % alerts.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeaderTipIndex(p => (p + 1) % alerts.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen flex bg-transparent font-outfit overflow-hidden">
      <DesktopSidebar />

      <div className="flex-1 ml-0 md:ml-24 flex flex-col min-w-0 h-screen overflow-y-auto pb-16 md:pb-0">

        {/* ── HEADER ── */}
        <header className="px-6 md:px-10 py-6 md:py-8 flex items-center justify-between gap-4 sticky top-0 z-50 bg-gray-100/70 backdrop-blur-xl">
          <div className="flex items-center gap-3">
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
            <span
              key={alertIndex}
              className="text-[11px] font-bold text-amber-800 whitespace-nowrap overflow-hidden text-ellipsis m-0 font-outfit animate-[fadeInUp_0.5s_ease]"
            >
              {alerts[alertIndex].text}
            </span>
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

        {/* Mobile Ticker */}
        <div className="lg:hidden bg-[#fffbeb] border-b border-[#fde68a] px-4 py-2 flex items-center shadow-sm">
          <span className={`w-2 h-2 rounded-full mr-2 shrink-0 animate-pulse ${alertIndex === 0 ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
          <span
            key={alertIndex + 'mobile'}
            className="text-[11px] font-bold text-amber-800 whitespace-nowrap overflow-hidden text-ellipsis m-0 font-outfit animate-[fadeInUp_0.5s_ease]"
          >
            {alerts[alertIndex].text}
          </span>
        </div>


        {/* ── MAIN GRID ── */}
        <main className="flex-1 px-4 md:px-7 pt-6 md:pt-8 flex flex-col lg:flex-row gap-6 items-start pb-6">

          {/* LEFT: Products */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* Search */}
            <div className={`flex items-center gap-2 glass-panel rounded-xl py-3 px-4 transition-colors duration-200 ${searchFocused ? 'border-[#00693B] ring-2 ring-[#00693B]/10' : 'border-[#00693B]/10'}`}>
              <Search size={16} className={`shrink-0 transition-colors duration-200 ${searchFocused ? 'text-[#00693B]' : 'text-gray-400'}`} />
              <input
                id="product-search"
                type="text"
                placeholder="Search pesticides, sprayers, fertilizers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="flex-1 border-none outline-none text-[13px] text-gray-900 font-medium bg-transparent font-outfit placeholder-gray-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="bg-transparent border-none text-gray-400 hover:text-gray-700 cursor-pointer p-0 font-bold text-xs">✕</button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    id={`cat-${cat.toLowerCase()}`}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 py-[7px] px-3.5 rounded-[10px] text-[12px] font-bold border transition-all duration-200 whitespace-nowrap font-outfit cursor-pointer ${
                      isActive 
                        ? 'bg-[#00693B] text-white border-[#00693B]' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#00693B] hover:text-[#00693B]'
                    }`}
                  >
                    {cat}
                    <span className={`text-[10px] font-extrabold py-0.5 px-1.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {getCount(cat)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-[3px] h-4 bg-[#00693B] rounded-sm"></div>
                <h2 className="text-[14px] font-bold text-gray-900 m-0 font-inter">
                  {activeCategory === 'All' ? 'All Products' : activeCategory}
                </h2>
                <span className="text-[11px] text-gray-400 font-medium">{filteredProducts.length} items</span>
              </div>
              <button
                id="view-all-btn"
                onClick={() => navigate('/products')}
                className="flex items-center gap-1 text-[12px] font-semibold text-gray-400 bg-transparent border-none cursor-pointer hover:text-[#00693B] transition-colors duration-150"
              >
                View All <ArrowRight size={13}/>
              </button>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredProducts.map((product, i) => (
                  <div
                    key={product.id}
                    className="animate-[fadeInUp_0.5s_ease]"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <ProductCard product={product} isSmall={true} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 glass-panel rounded-xl border-dashed gap-1">
                <div className="text-[32px] mb-1">🔍</div>
                <p className="text-[14px] font-bold text-gray-900 m-0">No products found</p>
                <p className="text-[12px] text-gray-400 m-0">Try adjusting your search or category filter</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="py-1.5 px-4 bg-[#00693B] text-white border-none rounded-lg text-[12px] font-semibold cursor-pointer mt-2"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Sidebar Panels */}
          <div className="w-full lg:w-[300px] xl:w-[350px] flex flex-col gap-5 shrink-0 lg:sticky lg:top-32 lg:h-[calc(100vh-10rem)] lg:overflow-y-auto pb-8 custom-scrollbar">

            {/* AI Crop Assistant */}
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Sparkles size={14} color="#FEB600" />
                    <h2 className="text-[14px] font-extrabold text-gray-900 m-0 font-inter">AI Crop Assistant</h2>
                  </div>
                  <p className="text-[10px] text-gray-500 m-0 font-medium">Powered by Precision Farming</p>
                </div>
                <span className="flex items-center gap-1 py-0.5 px-2 bg-green-50 border border-green-200 rounded-full text-[9px] font-bold text-green-600 uppercase tracking-wider">
                  <span className="w-1 h-1 bg-green-600 rounded-full animate-pulse"></span> Live
                </span>
              </div>

              <div className="h-[1px] bg-gray-100 my-3.5"></div>

              {aiStatus === 'idle' && (
                <div className="flex flex-col gap-3">
                  <p className="text-[12px] text-gray-600 m-0 leading-snug">
                    अपनी फसल, उसकी अवस्था और बीमारी चुनें, और तुरंत सटीक समाधान पाएं।
                  </p>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">फसल चुनें (Select Crop)</label>
                    <select value={aiCrop} onChange={e => setAiCrop(e.target.value)} className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-[12px] text-gray-900 font-semibold outline-none transition-colors duration-200 appearance-none font-outfit focus:border-[#00693B]">
                      <option value="">-- फसल चुनें --</option>
                      <option value="गेहूँ (Wheat)">गेहूँ (Wheat)</option>
                      <option value="धान (Rice)">धान (Rice)</option>
                      <option value="कपास (Cotton)">कपास (Cotton)</option>
                      <option value="गन्ना (Sugarcane)">गन्ना (Sugarcane)</option>
                      <option value="टमाटर (Tomato)">टमाटर (Tomato)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">फसल की अवस्था (Crop Stage)</label>
                    <select value={aiAge} onChange={e => setAiAge(e.target.value)} className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-[12px] text-gray-900 font-semibold outline-none transition-colors duration-200 appearance-none font-outfit focus:border-[#00693B]">
                      <option value="">-- अवस्था चुनें --</option>
                      <option value="पौध (Seedling)">पौध (Seedling)</option>
                      <option value="वानस्पतिक विकास (Vegetative)">वानस्पतिक विकास (Vegetative)</option>
                      <option value="फूल आना (Flowering)">फूल आना (Flowering)</option>
                      <option value="फल लगना (Fruiting)">फल लगना (Fruiting)</option>
                      <option value="परिपक्व (Mature)">परिपक्व (Mature)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">बीमारी/समस्या (Observed Issue)</label>
                    <select value={aiDisease} onChange={e => setAiDisease(e.target.value)} className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-[12px] text-gray-900 font-semibold outline-none transition-colors duration-200 appearance-none font-outfit focus:border-[#00693B]">
                      <option value="">-- समस्या चुनें --</option>
                      <option value="सफेद मक्खी (Whitefly)">सफेद मक्खी (Whitefly)</option>
                      <option value="माहू (Aphids)">माहू (Aphids)</option>
                      <option value="झुलसा रोग (Leaf Blight)">झुलसा रोग (Leaf Blight)</option>
                      <option value="पत्तियों का पीला पड़ना">पत्तियों का पीला पड़ना (Yellowing)</option>
                      <option value="फल छेदक कीट (Fruit Borer)">फल छेदक कीट (Fruit Borer)</option>
                    </select>
                  </div>

                  <button 
                    className={`w-full py-3 bg-[#FEB600] text-[#1a1a1a] border-none rounded-lg text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all duration-200 mt-1 font-outfit ${
                      (aiCrop && aiAge && aiDisease) ? 'opacity-100 cursor-pointer hover:bg-[#e6a400]' : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!(aiCrop && aiAge && aiDisease)}
                    onClick={() => {
                      setAiStatus('analyzing');
                      setTimeout(() => {
                        navigate('/chat', { state: { crop: aiCrop, age: aiAge, disease: aiDisease } });
                      }, 2000);
                    }}
                  >
                    Analyze with AI <Sparkles size={14} color="#1a1a1a" />
                  </button>
                </div>
              )}

              {aiStatus === 'analyzing' && (
                <div className="flex flex-col items-center justify-center py-6 px-4 bg-gray-50 rounded-xl border border-gray-100 mt-2">
                  <div className="w-6 h-6 border-2 border-[#FEB600] border-t-transparent rounded-full animate-spin mb-2.5"></div>
                  <p className="text-[12px] font-bold text-gray-900 m-0 text-center">Analyzing {aiCrop} {aiDisease} data...</p>
                  <p className="text-[10px] text-gray-500 m-0 mt-1 text-center font-medium">Cross-referencing with local conditions</p>
                </div>
              )}


            </div>

            {/* ⚠️ उर्वरक और उपकरण सुरक्षा */}
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-[6px] bg-red-500 flex items-center justify-center shrink-0">
                    <AlertTriangle size={13} color="#fff" />
                  </div>
                  <span className="text-[13px] font-extrabold text-gray-900 m-0 font-inter">⚠️ उर्वरक और उपकरण सुरक्षा</span>
                </div>
                <div className="flex gap-1">
                  {safetyTips.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTip(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 border-none cursor-pointer p-0 ${i === activeTip ? 'bg-[#00693B] w-4' : 'bg-gray-300 w-1.5'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-white/50 backdrop-blur-md rounded-xl border border-gray-200/50 shadow-sm">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  activeTip === 0 ? 'bg-blue-100 text-blue-600' :
                  activeTip === 1 ? 'bg-red-100 text-red-600' :
                  activeTip === 2 ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                }`}>
                  {safetyTips[activeTip].icon}
                </div>
                <p className="text-[12px] font-semibold text-gray-700 m-0 leading-snug flex-1 pt-0.5 font-outfit">{safetyTips[activeTip].tip}</p>
              </div>
            </div>

            {/* स्प्रे और उर्वरक अनुसूची — Spray & Fertilizer Schedule */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-[#00693B]/10">
              <p className="text-[13px] font-extrabold text-gray-900 m-0 mb-3 font-inter">📅 स्प्रे और उर्वरक अनुसूची</p>
              <div className="flex flex-col gap-2">
                {[
                  { emoji: '⏱️', text: 'सुबह 7 से 10 बजे के बीच स्प्रे करना सबसे अच्छा है।' },
                  { emoji: '💨', text: 'तेज़ हवा में कीटनाशक स्प्रे करने से बचें।' },
                  { emoji: '🌱', text: 'उर्वरक मिट्टी में नमी होने पर ही डालें।' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100/50 shadow-sm">
                    <span className="text-[14px]">{item.emoji}</span>
                    <p className="text-[11px] font-semibold text-gray-700 m-0 leading-[1.3] flex-1 pt-0.5 font-outfit">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default HomeScreen;
