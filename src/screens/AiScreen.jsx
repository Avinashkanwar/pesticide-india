import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';
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
  ChevronRight,
  ShoppingCart,
  Store,
  Clock,
  X
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getCartCount } from '../utils/cartHelper';
import Header from '../components/Header';

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
  const isDemo = localStorage.getItem('isDemo') === 'true';

  if (isDemo) {
    return (
      <div className="min-h-screen font-outfit flex overflow-hidden bg-transparent">
        <DesktopSidebar />
        <div className="flex-1 ml-0 md:ml-24 flex flex-col min-w-0 h-screen overflow-y-auto pb-20 md:pb-10">
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">🔒</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 font-inter mb-4">Premium Feature Locked</h2>
            <p className="text-gray-500 font-medium max-w-md mb-8">The AI Precision Farming Assistant is not available in Demo Mode. Subscribe to unlock crop diagnosis.</p>
            <button onClick={() => navigate('/')} className="px-8 py-4 bg-[#00693B] text-white rounded-xl font-bold hover:bg-[#004d2b] transition-colors shadow-lg shadow-[#00693B]/20">View Plans</button>
          </div>
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  const [aiCrop, setAiCrop] = useState('');
  const [aiAge, setAiAge] = useState('');
  const [aiDisease, setAiDisease] = useState('');
  const [aiStatus, setAiStatus] = useState('idle');
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
    e.target.value = null; // Reset input so same file can be selected again
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() && !selectedFile) return;
    
    const currentInput = chatInput;
    const fileToSend = selectedFile;
    
    // Optimistic UI Update
    if (fileToSend) {
      setChatMessages(prev => [...prev, { role: 'user', text: `[Image Attached: ${fileToSend.name}]\n${currentInput}` }]);
    } else {
      setChatMessages(prev => [...prev, { role: 'user', text: currentInput }]);
    }
    
    setChatInput('');
    setSelectedFile(null);
    setIsTyping(true);
    if (aiStatus === 'idle') setAiStatus('chatting');

    try {
      if (fileToSend) {
        const formData = new FormData();
        formData.append('file', fileToSend);
        
        const res = await apiClient.post(ENDPOINTS.ANALYZE_IMAGE, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (res.data && res.data.analysis) {
          setIsTyping(false);
          setChatMessages(prev => [...prev, { role: 'ai', text: res.data.analysis }]);
          return;
        }
      } else {
        const res = await apiClient.post(ENDPOINTS.AI_CHAT, { message: currentInput });
        if (res.data && res.data.reply) {
          setIsTyping(false);
          setChatMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
          return;
        }
      }
    } catch (error) {
      console.error('API failed, falling back', error);
    }

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, {
        role: 'ai',
        text: 'Sorry, I could not process your request at this moment.'
      }]);
    }, 1500);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTip, setActiveTip] = useState(0);
  const [alertIndex, setAlertIndex] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const [headerTipIndex, setHeaderTipIndex] = useState(0);
  const isLoggedIn = !!localStorage.getItem('token');
  const [cartCount, setCartCount] = useState(getCartCount());
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  const [allProducts, setAllProducts] = useState(() => {
    try {
      const vendorProducts = JSON.parse(localStorage.getItem('vendor_products') || '[]');
      return [...products, ...vendorProducts];
    } catch {
      return products;
    }
  });

  const t = {
    en: {
      searchPlaceholder: "Search pesticides, sprayers, fertilizers...",
      about: "About",
      logout: "Logout",
      login: "Login",
      allProducts: "All Products",
      items: "items",
      viewAll: "View All",
      aiAssistant: "AI Crop Assistant",
      precisionFarming: "Powered by Precision Farming",
      aiDesc: "Select your crop, its growth stage, and the issue you see to get an instant precision solution.",
      selectCrop: "Select Crop",
      cropStage: "Crop Stage",
      observedIssue: "Observed Issue",
      analyze: "Analyze with AI",
      analyzing: "Analyzing data...",
      crossRef: "Cross-referencing with local conditions",
      noProducts: "No products found",
      adjustSearch: "Try adjusting your search or category filter",
      clearFilters: "Clear Filters",
      categories: {
        All: "All",
        Pesticides: "Pesticides",
        Fertilizers: "Fertilizers",
        Sprayers: "Sprayers",
        Nets: "Nets"
      }
    },
    hi: {
      searchPlaceholder: "कीटनाशक, स्प्रेयर, उर्वरक खोजें...",
      about: "हमारे बारे में",
      logout: "लॉगआउट",
      login: "लॉगिन",
      allProducts: "सभी उत्पाद",
      items: "वस्तुएं",
      viewAll: "सभी देखें",
      aiAssistant: "एआई फसल सहायक",
      precisionFarming: "सटीक खेती द्वारा संचालित",
      aiDesc: "सटीक समाधान पाने के लिए अपनी फसल, विकास की अवस्था और देखी गई समस्या चुनें।",
      selectCrop: "फसल चुनें",
      cropStage: "फसल की अवस्था",
      observedIssue: "समस्या चुनें",
      analyze: "एआई से विश्लेषण करें",
      analyzing: "डेटा का विश्लेषण हो रहा है...",
      crossRef: "स्थानीय परिस्थितियों के साथ मिलान किया जा रहा है",
      noProducts: "कोई उत्पाद नहीं मिला",
      adjustSearch: "खोज या श्रेणी फ़िल्टर को बदलने का प्रयास करें",
      clearFilters: "फ़िल्टर साफ़ करें",
      categories: {
        All: "सभी",
        Pesticides: "कीटनाशक",
        Fertilizers: "उर्वरक",
        Sprayers: "स्प्रेयर",
        Nets: "नेट"
      }
    },
    hinglish: {
      searchPlaceholder: "Pesticides, sprayers, fertilizers search karein...",
      about: "About Us",
      logout: "Logout",
      login: "Login",
      allProducts: "Sabh Products",
      items: "items",
      viewAll: "Sabh Dekhein",
      aiAssistant: "AI Crop Assistant",
      precisionFarming: "Precision Farming dwara powered",
      aiDesc: "Apni fasal, growth stage aur dekhi gayi problem select karein, aur turant sahi solution payein.",
      selectCrop: "Fasal select karein",
      cropStage: "Fasal ki stage",
      observedIssue: "Problem select karein",
      analyze: "AI se analyze karein",
      analyzing: "Data analyze ho raha hai...",
      crossRef: "Local conditions se check ho raha hai",
      noProducts: "Koi product nahi mila",
      adjustSearch: "Search ya category filter change karke dekhein",
      clearFilters: "Filters clear karein",
      categories: {
        All: "Sabh",
        Pesticides: "Pesticides",
        Fertilizers: "Fertilizers",
        Sprayers: "Sprayers",
        Nets: "Nets"
      }
    }
  }[language];

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  const categories = ['All', 'Pesticides', 'Fertilizers', 'Sprayers', 'Nets'];

  const getCount = (catName) => {
    if (catName === 'All') return allProducts.length;
    return allProducts.filter(p => p.category.toLowerCase() === catName.toLowerCase()).length;
  };

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.tags && product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
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

      <div className="flex-1 ml-0 md:ml-24 flex flex-col min-w-0 h-screen overflow-hidden pb-16 md:pb-0">

        {/* ── MAIN GRID ── */}
        <main className="flex-1 px-4 md:px-7 pt-6 md:pt-8 flex flex-col items-center pb-6 overflow-hidden">

          {/* AI and Tips Panels */}
          <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-6 pb-8 h-full">
            
            {/* LEFT COLUMN: Input Form & Tips */}
            <div className="w-full lg:w-[350px] flex flex-col gap-5 shrink-0 h-full overflow-y-auto custom-scrollbar pr-1 pb-4">

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

                <div className="flex flex-col gap-3">
                  <p className="text-[12px] text-gray-600 m-0 leading-snug">
                    {t.aiDesc}
                  </p>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t.selectCrop}</label>
                    <select value={aiCrop} onChange={e => setAiCrop(e.target.value)} className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-[12px] text-gray-900 font-semibold outline-none transition-colors duration-200 appearance-none font-outfit focus:border-[#00693B]">
                      <option value="">-- Select Crop --</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Rice">Rice</option>
                      <option value="Cotton">Cotton</option>
                      <option value="Sugarcane">Sugarcane</option>
                      <option value="Tomato">Tomato</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t.cropStage}</label>
                    <select value={aiAge} onChange={e => setAiAge(e.target.value)} className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-[12px] text-gray-900 font-semibold outline-none transition-colors duration-200 appearance-none font-outfit focus:border-[#00693B]">
                      <option value="">-- Select Stage --</option>
                      <option value="Seedling">Seedling</option>
                      <option value="Vegetative">Vegetative</option>
                      <option value="Flowering">Flowering</option>
                      <option value="Fruiting">Fruiting</option>
                      <option value="Mature">Mature</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t.observedIssue}</label>
                    <select value={aiDisease} onChange={e => setAiDisease(e.target.value)} className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-[12px] text-gray-900 font-semibold outline-none transition-colors duration-200 appearance-none font-outfit focus:border-[#00693B]">
                      <option value="">-- Select Issue --</option>
                      <option value="Whitefly">Whitefly</option>
                      <option value="Aphids">Aphids</option>
                      <option value="Leaf Blight">Leaf Blight</option>
                      <option value="Yellowing">Yellowing</option>
                      <option value="Fruit Borer">Fruit Borer</option>
                    </select>
                  </div>

                  <button 
                    className={`w-full py-3 bg-[#FEB600] text-[#1a1a1a] border-none rounded-lg text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all duration-200 mt-1 font-outfit ${
                      (aiCrop && aiAge && aiDisease) && aiStatus !== 'analyzing' ? 'opacity-100 cursor-pointer hover:bg-[#e6a400]' : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!(aiCrop && aiAge && aiDisease) || aiStatus === 'analyzing'}
                    onClick={async () => {
                      setAiStatus('analyzing');
                      try {
                        const res = await apiClient.post(ENDPOINTS.CROP_ANALYSIS, {
                          crop: aiCrop, stage: aiAge, issue: aiDisease
                        });
                        if (res.data && res.data.analysis) {
                          setAiAnalysisResult(res.data.analysis);
                          setAiStatus('answered');
                          return;
                        }
                      } catch (err) {
                        console.error('Crop Analysis API failed, falling back', err);
                      }
                      setTimeout(() => {
                        setAiStatus('answered');
                      }, 2000);
                    }}
                  >
                    {aiStatus === 'analyzing' ? (
                      <><div className="w-4 h-4 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin"></div> {t.analyzing}</>
                    ) : (
                      <>{t.analyze} <Sparkles size={14} color="#1a1a1a" /></>
                    )}
                  </button>
                </div>


            </div>



            {/* History Section */}
            <div className="glass-panel rounded-xl p-4 flex flex-col min-h-[200px] flex-1">
              <div className="flex items-center gap-1.5 mb-3">
                <Clock size={14} className="text-gray-500" />
                <h3 className="text-[13px] font-extrabold text-gray-900 m-0 font-inter">Chat History</h3>
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar flex-1 pr-1">
                <div className="p-3 bg-white/60 border border-gray-100 rounded-lg cursor-pointer hover:border-[#00693B]/30 transition-colors">
                  <p className="text-[11px] font-bold text-gray-900 m-0 mb-1">Wheat • Yellowing</p>
                  <p className="text-[10px] text-gray-500 m-0 truncate">Recommended: Urea application...</p>
                </div>
                <div className="p-3 bg-white/60 border border-gray-100 rounded-lg cursor-pointer hover:border-[#00693B]/30 transition-colors">
                  <p className="text-[11px] font-bold text-gray-900 m-0 mb-1">Cotton • Whitefly</p>
                  <p className="text-[10px] text-gray-500 m-0 truncate">Recommended: Imidacloprid spray...</p>
                </div>
                <div className="p-3 bg-white/60 border border-gray-100 rounded-lg cursor-pointer hover:border-[#00693B]/30 transition-colors">
                  <p className="text-[11px] font-bold text-gray-900 m-0 mb-1">Tomato • Leaf Blight</p>
                  <p className="text-[10px] text-gray-500 m-0 truncate">Recommended: Copper fungicide...</p>
                </div>
              </div>
            </div>

            </div>
            
            {/* RIGHT COLUMN: AI Chat Interface */}
            <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden h-full">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#F5F7E9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00693B] rounded-xl flex items-center justify-center">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-gray-900 m-0 leading-tight">Precision Farming AI</h2>
                    <p className="text-xs font-semibold text-[#00693B] m-0">Live Assistant</p>
                  </div>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto bg-gray-50/50">
                {aiStatus === 'idle' && chatMessages.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-80 h-full min-h-[300px]">
                    <h3 className="text-sm font-black text-[#00693B] mb-2">Ask about the crop</h3>
                    <p className="text-sm text-gray-500 font-medium max-w-sm">Type any question about your crop</p>
                  </div>
                )}

                {aiStatus === 'analyzing' && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center min-h-[300px]">
                    <div className="w-16 h-16 bg-[#FEB600]/10 rounded-2xl flex items-center justify-center mb-4">
                      <div className="w-8 h-8 border-4 border-[#FEB600] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">{t.analyzing}</h3>
                    <p className="text-sm text-gray-500 font-medium">{t.crossRef}</p>
                  </div>
                )}

                {aiStatus === 'answered' && (
                  <div className="flex flex-col gap-6">
                    {/* User Query summary */}
                    <div className="self-end max-w-[85%] bg-[#00693B] text-white p-4 rounded-2xl rounded-tr-sm shadow-sm">
                      <p className="text-sm font-medium leading-relaxed m-0">I have a problem with my <strong>{aiCrop}</strong>. It's in the <strong>{aiAge}</strong> stage, and I've noticed <strong>{aiDisease}</strong>.</p>
                    </div>
                    
                    {/* AI Answer */}
                    <div className="self-start max-w-[90%] bg-white text-gray-800 p-5 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm">
                      <p className="text-sm leading-relaxed m-0 mb-4 font-medium text-gray-600">
                        Based on your description of <strong className="text-gray-900">{aiDisease}</strong> in <strong className="text-gray-900">{aiCrop}</strong> during the <strong className="text-gray-900">{aiAge}</strong> stage, here is your precision action plan:
                      </p>
                      
                      <div className="flex flex-col gap-3">
                        {aiAnalysisResult ? (
                          <div className="p-4 bg-[#F5F7E9] border border-[#00693B]/20 rounded-xl">
                            <p className="text-xs text-gray-700 m-0 font-medium whitespace-pre-wrap leading-relaxed">
                              {aiAnalysisResult}
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                              <h4 className="text-xs font-black text-red-700 m-0 mb-1 flex items-center gap-1"><AlertTriangle size={14}/> Immediate Action</h4>
                              <p className="text-xs text-red-600 m-0 font-medium">Isolate affected areas if possible. Do not over-water the plants.</p>
                            </div>
                            
                            <div className="p-3 bg-[#F5F7E9] border border-[#00693B]/20 rounded-xl">
                              <h4 className="text-xs font-black text-[#00693B] m-0 mb-2 flex items-center gap-1"><Leaf size={14}/> Recommended Treatment</h4>
                              <p className="text-xs text-gray-700 m-0 font-medium leading-relaxed">
                                Apply a systemic pesticide suitable for {aiDisease}. Ensure you spray early morning or late evening.
                              </p>
                            </div>
                          </>
                        )}

                        {/* AI Suggested Products */}
                        <div className="mt-2 border-t border-gray-100 pt-3">
                          <h4 className="text-xs font-black text-gray-900 m-0 mb-2 flex items-center gap-1"><ShoppingCart size={14} className="text-amber-500" /> AI Suggested Products</h4>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 p-2.5 bg-white border border-gray-200 rounded-lg hover:border-[#00693B] cursor-pointer shadow-sm transition-colors">
                              <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center shrink-0">
                                <Leaf size={18} className="text-[#00693B]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-gray-900 m-0 truncate">Nativo 75 WG Fungicide</p>
                                <p className="text-[10px] text-gray-500 font-medium m-0">Recommended for {aiDisease || 'disease control'}</p>
                              </div>
                              <div className="shrink-0 bg-[#00693B] text-white text-[11px] font-bold px-2 py-1 rounded">₹1,250</div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-2.5 bg-white border border-gray-200 rounded-lg hover:border-[#00693B] cursor-pointer shadow-sm transition-colors">
                              <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center shrink-0">
                                <Bug size={18} className="text-[#00693B]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-gray-900 m-0 truncate">Coragen Insecticide</p>
                                <p className="text-[10px] text-gray-500 font-medium m-0">Effective pest management</p>
                              </div>
                              <div className="shrink-0 bg-[#00693B] text-white text-[11px] font-bold px-2 py-1 rounded">₹1,850</div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={msg.role === 'user' ? "self-end max-w-[85%] bg-[#00693B] text-white p-4 rounded-2xl rounded-tr-sm shadow-sm" : "self-start max-w-[90%] bg-white text-gray-800 p-5 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm"}>
                    <p className={`text-sm leading-relaxed m-0 font-medium whitespace-pre-wrap ${msg.role === 'user' ? '' : 'text-gray-600'}`}>{msg.text}</p>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="self-start max-w-[90%] bg-white p-4 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                )}
              </div>

              {/* Chat Input Area */}
              <div className="p-4 bg-white border-t border-gray-100 flex flex-col gap-3 shrink-0">
                {selectedFile && (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg max-w-sm self-start">
                    <div className="flex items-center gap-2">
                      <Camera size={14} className="text-blue-600" />
                      <span className="text-xs font-medium text-blue-800 truncate max-w-[200px]">{selectedFile.name}</span>
                    </div>
                    <button onClick={() => setSelectedFile(null)} className="text-blue-400 hover:text-blue-600 cursor-pointer ml-4">
                      <X size={14} />
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-3 w-full">
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageSelect} />
                  <button onClick={() => fileInputRef.current?.click()} disabled={isTyping} className="w-12 h-12 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center shrink-0 hover:bg-gray-200 hover:text-[#00693B] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    <Camera size={20} />
                  </button>
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask a follow-up question or describe an issue..." 
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#00693B] focus:bg-white transition-colors placeholder:text-gray-400"
                  />
                  <button onClick={handleSendMessage} disabled={isTyping || (!chatInput.trim() && !selectedFile)} className="w-12 h-12 bg-[#00693B] rounded-xl flex items-center justify-center shrink-0 hover:bg-[#004d2b] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all cursor-pointer">
                    <Send size={18} className="text-white ml-[2px]" />
                  </button>
                </div>
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
