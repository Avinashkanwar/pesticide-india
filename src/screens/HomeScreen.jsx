import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopSidebar from '../components/DesktopSidebar';
import { 
  Search, 
  Send,
  Camera,
  TrendingUp,
  Zap,
  Droplets,
  Star,
  ArrowRight,
  Bell,
  Sprout,
  AlertTriangle,
  Bug,
  FlaskConical,
  Leaf
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

const placeholderPhrases = [
  "क्या आपकी फसल में कीड़े लग गए हैं?",
  "क्या आपकी फसल की अच्छी से ग्रोथ नहीं हो रही?",
  "फसल के पत्तों पर पीले धब्बे आ गए हैं?",
  "E.g., Describe your crop issue here..."
];

const cropTips = [
  { icon: <Droplets size={16}/>, tip: "Water crops early morning to reduce evaporation by up to 30%.", color: "blue" },
  { icon: <Bug size={16}/>, tip: "Inspect leaf undersides weekly — early pest detection saves 80% of crop loss.", color: "red" },
  { icon: <Sprout size={16}/>, tip: "Rotate crops each season to maintain soil health and reduce pest buildup.", color: "green" },
  { icon: <FlaskConical size={16}/>, tip: "Always calibrate your sprayer before application for accurate dosing.", color: "purple" },
];



const alerts = [
  { type: "warning", icon: <AlertTriangle size={14}/>, text: "High whitefly activity reported in Punjab & Haryana regions this week." },
  { type: "info", icon: <Leaf size={14}/>, text: "New arrival: Bayer's Movento Energy now in stock — ideal for sucking pests." },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTip, setActiveTip] = useState(0);
  const [alertIndex, setAlertIndex] = useState(0);

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

  // Typing animation
  useEffect(() => {
    const currentPhrase = placeholderPhrases[placeholderIndex];
    let typingSpeed = isDeleting ? 30 : 60;
    if (!isDeleting && placeholderText === currentPhrase) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(pauseTimer);
    } else if (isDeleting && placeholderText === '') {
      setIsDeleting(false);
      setPlaceholderIndex((prev) => (prev + 1) % placeholderPhrases.length);
      return;
    }
    const timer = setTimeout(() => {
      setPlaceholderText((prev) => 
        isDeleting 
          ? currentPhrase.substring(0, prev.length - 1)
          : currentPhrase.substring(0, prev.length + 1)
      );
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [placeholderText, isDeleting, placeholderIndex]);

  // Auto-rotate tips
  useEffect(() => {
    const t = setInterval(() => setActiveTip(p => (p + 1) % cropTips.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Auto-rotate alerts
  useEffect(() => {
    const t = setInterval(() => setAlertIndex(p => (p + 1) % alerts.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen font-sans flex overflow-hidden" style={{background: '#FFFFFF'}}>

      <DesktopSidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-24 flex flex-col min-w-0 h-screen overflow-y-auto">

        {/* ── TOP HEADER BAR ── */}
        <header className="pt-5 pb-4 px-8 max-w-[1700px] w-full mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#333333]/60 mb-0.5">Welcome back, Farmer 👋</p>
            <h1 className="text-2xl font-extrabold gradient-text tracking-tight">PesticideIndia Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Alert ticker */}
            <div className="hidden lg:flex items-center gap-2 bg-white/70 backdrop-blur border border-white/60 rounded-2xl px-4 py-2 shadow-sm max-w-xs overflow-hidden">
              <span className={`w-2 h-2 rounded-full shrink-0 ${alertIndex === 0 ? 'bg-amber-400' : 'bg-[#FEB600]'} animate-pulse`}></span>
              <p className="text-xs font-medium text-[#333333]/70 truncate">{alerts[alertIndex].text}</p>
            </div>
            <button className="relative w-10 h-10 rounded-xl bg-white/70 backdrop-blur border border-white/60 shadow-sm flex items-center justify-center hover:scale-105 transition-transform">
              <Bell size={18} className="text-[#333333]"/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EC5017] rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-transparent border border-[#EC5017] text-[#EC5017] hover:bg-[#EC5017] hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* ── HERO BANNER ── */}
        <div className="px-8 max-w-[1700px] w-full mx-auto mb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold text-[#333333] uppercase tracking-widest mb-0.5">Precision Farming AI</p>
              <h2 className="text-base font-bold text-[#00693B] tracking-tight">
                Smart Solutions for <span className="text-[#333333] font-semibold">Healthy Crops</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {[
                { val: "10K+", label: "Products" },
                { val: "4.8★", label: "Avg Rating" },
                { val: "98%", label: "Accuracy" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center bg-white/50 rounded-lg px-3 py-1.5 border border-gray-100">
                  <span className="text-xs font-bold text-[#333333]">{s.val}</span>
                  <span className="text-[9px] text-[#333333] font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>



        <main className="max-w-[1700px] mx-auto px-8 grid grid-cols-1 xl:grid-cols-12 gap-6 w-full flex-1 pb-10">
          
          {/* ── LEFT: PRODUCTS ── */}
          <div className="flex flex-col gap-5 min-w-0 xl:col-span-8">

            {/* Search Bar */}
            <div className="flex flex-col gap-3">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400 transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search pesticides, sprayers, fertilizers..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl border border-gray-200 text-sm text-[#333333] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FEB600]/30 focus:border-[#FEB600] transition-all font-medium shadow-sm"
                />
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 border ${
                        isActive 
                          ? 'bg-[#FEB600] text-[#333333] border-[#FEB600] shadow-md shadow-[#FEB600]/20' 
                          : 'bg-white text-[#333333] border-gray-200 hover:border-[#00693B]/40 hover:text-[#00693B]'
                      }`}
                    >
                      {cat} <span className="text-[10px] ml-0.5 opacity-60">({getCount(cat)})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section Title */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-[#FEB600] rounded-full"></div>
                <h2 className="text-base font-extrabold text-[#00693B]">
                  {activeCategory === 'All' ? 'All Products' : activeCategory}
                </h2>
                <span className="text-xs text-[#333333] font-medium">({filteredProducts.length} items)</span>
              </div>
              <button onClick={() => navigate('/products')} className="text-xs font-bold text-[#333333]/60 flex items-center gap-1 hover:gap-2 hover:text-[#333333] transition-all">
                View All <ArrowRight size={13}/>
              </button>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product, i) => (
                  <div key={product.id} className="animate-fade-in-up" style={{animationDelay: `${i * 60}ms`}}>
                    <ProductCard product={product} isSmall={true} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-200 rounded-[32px] bg-white/30 px-6">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <Search size={28} className="text-[#333333]"/>
                </div>
                <p className="text-[#333333] font-bold text-sm mb-1">No products found</p>
                <p className="text-[#333333] text-xs font-medium mb-4">Try adjusting your search or filters</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="px-5 py-2.5 bg-[#FEB600] text-white rounded-xl text-xs font-bold hover:bg-[#FEB600] transition-all shadow-sm active:scale-95"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="min-w-0 xl:col-span-4 flex flex-col gap-5">


            {/* AI Crop Assistant Panel */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-extrabold text-[#00693B] tracking-tight">AI Crop Assistant</h2>
                  <p className="text-xs text-[#333333]/60 font-medium mt-0.5">Powered by Precision Farming</p>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#333333]/70 bg-[#FEB600]/10 px-2.5 py-1 rounded-full border border-[#FEB600]/30">
                  <span className="w-1.5 h-1.5 bg-[#FEB600] rounded-full animate-pulse"></span> Live
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 mb-4"></div>

              {/* Description */}
              <p className="text-xs text-[#333333]/70 mb-4 leading-relaxed">
                अपनी फसल की समस्या बताएं या फोटो अपलोड करें और तुरंत सलाह पाएं।
              </p>

              {/* Textarea */}
              <div className="mb-3">
                <label className="block text-[10px] font-bold text-[#333333]/60 mb-1.5 uppercase tracking-widest">
                  Describe Your Problem
                </label>
                <div className="relative">
                  <textarea 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-12 text-sm text-[#333333] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FEB600]/40 focus:border-[#FEB600] transition-all resize-none"
                    rows="3"
                    placeholder={`${placeholderText}|`}
                  ></textarea>
                  <button 
                    onClick={() => navigate('/chat')}
                    className="absolute bottom-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-lg transition-all active:scale-95 bg-[#FEB600] hover:bg-[#e6a400]"
                    title="Send to Chat"
                  >
                    <Send size={13} className="text-[#333333]" />
                  </button>
                </div>
              </div>

              {/* Upload button */}
              <button className="w-full py-2.5 px-4 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#333333] flex items-center justify-center gap-2 hover:bg-gray-100 transition-all mb-3">
                <Camera size={14} className="text-[#333333]/60" />
                Upload Crop Photo
              </button>

              {/* CTA */}
              <button 
                onClick={() => navigate('/chat')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold text-[#333333] flex items-center justify-center gap-2 transition-all active:scale-95 hover:opacity-90 bg-[#FEB600]"
              >
                <Zap size={13}/> Analyze & Recommend
              </button>
            </div>

            {/* Crop Tips Carousel */}
            <div className="glass-card rounded-[24px] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#00693B]"/>
                  <span className="text-sm font-extrabold text-[#00693B]">Farming Tip</span>
                </div>
                <div className="flex gap-1">
                  {cropTips.map((_,i) => (
                    <button key={i} onClick={() => setActiveTip(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeTip ? 'bg-[#FEB600] w-4' : 'bg-gray-200'}`}></button>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  activeTip === 0 ? 'bg-gray-50 text-[#333333]' :
                  activeTip === 1 ? 'bg-red-50 text-red-500' :
                  activeTip === 2 ? 'bg-gray-50 text-[#00693B]' :
                  'bg-purple-50 text-purple-500'
                }`}>
                  {cropTips[activeTip].icon}
                </div>
                <p className="text-sm text-[#333333] font-medium leading-relaxed">{cropTips[activeTip].tip}</p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;
