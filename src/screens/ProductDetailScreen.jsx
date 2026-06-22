import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DesktopSidebar from '../components/DesktopSidebar';
import MobileBottomNav from '../components/MobileBottomNav';
import TopNav from '../components/TopNav';
import { Star, ShieldAlert, BadgePercent, Sprout, Bug, ChevronLeft, ShoppingCart, CreditCard } from 'lucide-react';
import { addToCart, getCart } from '../utils/cartHelper';

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Nativo 75 WG",
    brand: "Bayer CropScience",
    price: "1,250",
    rating: "4.8",
    stock: "In Stock",
    tags: ["Rice", "Tomato"],
    category: "pesticides",
    image: "/images/nativo.png",
    activeIngredient: "Tebuconazole 50% + Trifloxystrobin 25% WG",
    description: "Nativo is a systemic broad-spectrum fungicide with protective and curative action. It not only controls disease but also improves the quality and yield of crops, providing a greener and healthier appearance.",
    targetCrops: "Rice, Tomato, Mango, Potato",
    targetPests: "Blast, Sheath Blight, Early Blight, Powdery Mildew",
    dosage: "100-120 g per Acre mixed with 200 Liters of water"
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
    image: "/images/coragen.png",
    activeIngredient: "Chlorantraniliprole 18.5% w/w SC",
    description: "Coragen insecticide provides outstanding and long-lasting control of key pests. It works through ingestion and contact, stopping feeding within hours of exposure to safeguard crop yield and quality.",
    targetCrops: "Cotton, Soybean, Rice, Sugarcane, Tomato",
    targetPests: "Bollworm, Stem Borer, Leaf Folder, Fruit Borer",
    dosage: "60 ml per Acre mixed with 150-200 Liters of water"
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
    image: "/images/roundup.png",
    activeIngredient: "Glyphosate isopropylamine salt 41% SL",
    description: "Roundup is a non-selective, systemic herbicide used for the control of a wide variety of annual and perennial weeds in agricultural, industrial, and non-cropland areas.",
    targetCrops: "Tea gardens, non-cropped areas, wheat fields pre-sowing",
    targetPests: "Broadleaf weeds, grasses, sedges",
    dosage: "1.0 - 1.5 Liters per Acre with 200 Liters of water"
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
    image: "/images/amistar.png",
    activeIngredient: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC",
    description: "Amistar Top is a broad-spectrum, preventative and curative fungicide. It ensures high yields by protecting crops from early stage leaf disease and blast.",
    targetCrops: "Tomato, Rice, Chili, Wheat, Corn",
    targetPests: "Early Blight, Sheath Blight, Powdery Mildew, Rust",
    dosage: "200 ml per Acre mixed with 200 Liters of water"
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
    image: "/images/urea.png",
    activeIngredient: "Nitrogen 46%",
    description: "Urea is the most important nitrogenous fertilizer in the market, with the highest Nitrogen content. It is widely used to promote vegetative growth in all major crops.",
    targetCrops: "Wheat, Rice, Maize, Sugarcane, Vegetables",
    targetPests: "Nitrogen deficiency, stunted crop growth",
    dosage: "45 - 50 kg per Acre as broadcast application"
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
    image: "/images/glyphosate.png",
    activeIngredient: "Glyphosate 41% SL",
    description: "A highly effective systemic herbicide designed to eradicate tough perennial weeds. It is absorbed by the foliage and translocated down into the root system to prevent regrowth.",
    targetCrops: "Tea plantations, Orchard rows, Fallow fields",
    targetPests: "Axonopus compressus, Cynodon dactylon, Cyperus rotundus",
    dosage: "1.0 - 1.2 Liters per Acre mixed with clean water"
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
    image: "/images/npk.png",
    activeIngredient: "Nitrogen 19%, Phosphorus 19%, Potassium 19%",
    description: "NPK 19-19-19 is a 100% water-soluble fertilizer containing all three primary plant nutrients in balanced ratio, perfect for foliar spraying and fertigation.",
    targetCrops: "Horticulture, Vegetables, Flowering crops, Cereals",
    targetPests: "General nutrient deficiencies, poor root or fruit development",
    dosage: "5 g per Liter of water for foliar spray"
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
    image: "/images/sprayer.png",
    activeIngredient: "12V 8Ah Lead-acid Battery, 16L capacity",
    description: "Designed for effortless and uniform chemical spraying. Features adjustable pressure, multiple nozzle attachments, and ergonomic shoulder straps for prolonged comfort.",
    targetCrops: "All agricultural fields, orchards, and nurseries",
    targetPests: "Foliar pest spraying, sanitization",
    dosage: "Operate as per spray requirements (approx 4 hours battery backup)"
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
    image: "/images/shadenet.png",
    activeIngredient: "High Density Polyethylene (HDPE)",
    description: "Premium shade netting that blocks 50% of direct sunlight. Protects sensitive young crops and nursery plants from sunburn, heavy wind, and hail damage.",
    targetCrops: "Nursery plants, Leafy greens, Flowers, Vegetables",
    targetPests: "Excessive sunlight, sunburn, birds, wind damage",
    dosage: "Install securely over crop rows or nursery greenhouse structures"
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
    image: "/images/insectnet.png",
    activeIngredient: "UV-stabilized Monofilament Netting",
    description: "Keeps out small crop pests like aphids, whiteflies, and thrips without restricting natural airflow, rain, or watering systems. Essential for organic farming.",
    targetCrops: "Tomato, Cabbage, Cucumber, Berries, Chili",
    targetPests: "Aphids, Whiteflies, Thrips, Beetles, Birds",
    dosage: "Cover target crop beds and secure edges to prevent pest entry"
  }
];

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(getCart().some(item => item.id === parseInt(id)));
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleCartUpdate = () => {
      setIsInCart(getCart().some(item => item.id === parseInt(id)));
    };
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, [id]);

  const product = DUMMY_PRODUCTS.find(p => p.id === parseInt(id)) || DUMMY_PRODUCTS[0];

  const priceVal = parseFloat(product.price.replace(/,/g, ''));
  const originalPriceVal = Math.round(priceVal * 1.25);
  const discountPercent = 20; // 20% off

  const handleAddToCart = () => {
    if (isInCart) {
      navigate('/cart');
    } else {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="min-h-screen font-sans flex overflow-hidden" style={{ background: 'transparent' }}>
      <DesktopSidebar />

      <div className="flex-1 ml-0 md:ml-24 flex flex-col min-w-0 h-screen overflow-y-auto pb-20 md:pb-10">
        <TopNav />

        {/* Back Button */}
        <div className="max-w-[1200px] w-full mx-auto px-4 md:px-8 pt-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center text-sm font-bold text-[#00693B] hover:text-[#004d2b] transition-colors cursor-pointer bg-white w-10 h-10 rounded-full border border-gray-100 shadow-sm"
            title="Go Back"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <main className="max-w-[1200px] w-full mx-auto px-4 md:px-8 py-6 flex-1">
          <div className="glass-panel rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row gap-10 items-start">
            
            {/* Product Image Panel */}
            <div className="w-full lg:w-[45%] flex flex-col gap-4">
              <div className="w-full bg-gradient-to-br from-[#f8faf9] to-[#f0f7f3] rounded-2xl flex items-center justify-center p-6 relative aspect-square border border-gray-100/50">
                {product.stock === 'Low Stock' && (
                  <span className="absolute top-4 left-4 bg-yellow-100 text-yellow-600 text-xs font-bold py-1 px-3 rounded-full border border-yellow-200 uppercase tracking-wider">
                    Low Stock
                  </span>
                )}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-full max-w-[85%] object-contain"
                />
              </div>
            </div>

            {/* Product Details Panel */}
            <div className="w-full lg:w-[55%] flex flex-col gap-6">
              
              {/* Brand and Title */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{product.brand}</p>
                <h1 className="text-3xl font-black text-gray-900 leading-tight tracking-tight font-inter">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-3">
                  <div className="flex items-center bg-[#00693B] text-white px-2 py-0.5 rounded-lg text-xs font-bold gap-0.5">
                    {product.rating} <Star size={10} fill="white" color="white" />
                  </div>
                  <span className="text-xs font-bold text-gray-400">1,420 Ratings & 320 Reviews</span>
                </div>
              </div>

              {/* Technical Formula Info */}
              <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Technical Composition</span>
                <p className="text-sm font-bold text-[#00693B] m-0 font-inter">{product.activeIngredient}</p>
              </div>

              {/* Flipkart Style Price Layout */}
              <div className="border-t border-b border-gray-100 py-5 flex items-baseline gap-3.5">
                <span className="text-3xl font-black text-gray-900 font-inter">₹{product.price}</span>
                <span className="text-sm text-gray-400 line-through font-semibold">₹{originalPriceVal.toLocaleString('en-IN')}</span>
                <span className="text-base font-bold text-emerald-600 flex items-center gap-1">
                  <BadgePercent size={18} /> {discountPercent}% Off
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Product Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium m-0">{product.description}</p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3.5 bg-white border border-gray-100 rounded-2xl">
                  <div className="p-2 bg-emerald-50 rounded-xl text-[#00693B]">
                    <Sprout size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Target Crops</span>
                    <span className="text-xs font-bold text-[#00693B] mt-0.5 block leading-normal">{product.targetCrops}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white border border-gray-100 rounded-2xl">
                  <div className="p-2 bg-red-50 rounded-xl text-red-600">
                    <Bug size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Target Pests / Diseases</span>
                    <span className="text-xs font-bold text-red-600 mt-0.5 block leading-normal">{product.targetPests}</span>
                  </div>
                </div>
              </div>

              {/* Application Dosage */}
              <div className="flex items-start gap-3.5 p-4 bg-amber-50/50 border border-amber-100 rounded-2xl">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-600 mt-0.5">
                  <ShieldAlert size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Application & Dosage</span>
                  <p className="text-xs font-semibold text-amber-900 mt-1 mb-0 leading-relaxed">{product.dosage}</p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50 p-1">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-gray-900 font-inter text-sm">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-2">
                <button 
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#00693B] text-white rounded-2xl font-bold font-outfit text-sm transition-all flex items-center justify-center gap-2 hover:bg-[#004d2b] shadow-md shadow-[#00693B]/10 active:scale-95 cursor-pointer"
                >
                  <ShoppingCart size={16} />
                  {isInCart ? 'View Cart' : 'Add to Cart'}
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default ProductDetailScreen;
