import React from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopSidebar from '../components/DesktopSidebar';
import MobileBottomNav from '../components/MobileBottomNav';

import { ShoppingCart, Star, Plus, PackageSearch } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Lock } from 'lucide-react';

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

const ProductScreen = () => {
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
            <p className="text-gray-500 font-medium max-w-md mb-8">Product Management is not available in the Demo Dashboard. Subscribe to a plan to unlock full inventory management.</p>
            <button onClick={() => navigate('/')} className="px-8 py-4 bg-[#00693B] text-white rounded-xl font-bold hover:bg-[#004d2b] transition-colors shadow-lg shadow-[#00693B]/20">View Plans</button>
          </div>
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-outfit flex overflow-hidden bg-transparent">
      <DesktopSidebar />
      
      <div className="flex-1 ml-0 md:ml-24 flex flex-col min-w-0 h-screen overflow-y-auto pb-20 md:pb-10">

        <header className="pt-8 pb-6 px-4 md:px-8 max-w-[1600px] w-full mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#00693B] rounded-xl flex items-center justify-center shadow-sm">
              <PackageSearch className="text-white" size={20} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight font-inter m-0">Product Inventory</h1>
          </div>
          <p className="text-sm font-semibold text-gray-500 max-w-xl">Manage and track your agricultural products, pesticides, and sprayers inventory.</p>
        </header>

        <main className="max-w-[1600px] mx-auto px-4 md:px-8 w-full flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DUMMY_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default ProductScreen;
