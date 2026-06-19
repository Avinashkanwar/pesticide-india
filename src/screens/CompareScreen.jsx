import React, { useState } from 'react';
import DesktopSidebar from '../components/DesktopSidebar';
import { Scale } from 'lucide-react';

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Nativo 75 WG",
    brand: "Bayer CropScience",
    activeIngredient: "Tebuconazole 50% + Trifloxystrobin 25% WG",
    targetCrops: "Rice, Tomato, Mango",
    targetPests: "Sheath Blight, Early Blight, Powdery Mildew",
    dosage: "100-120 g / Acre",
    price: "₹1,250",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    name: "Coragen Insecticide",
    brand: "FMC Corporation",
    activeIngredient: "Chlorantraniliprole 18.5% SC",
    targetCrops: "Cotton, Soybean, Rice",
    targetPests: "Bollworm, Stem Borer, Leaf Folder",
    dosage: "60 ml / Acre",
    price: "₹890",
    rating: "4.5",
    image: "https://images.unsplash.com/photo-1628102491629-77858ab5721f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    name: "Amistar Top",
    brand: "Syngenta",
    activeIngredient: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC",
    targetCrops: "Tomato, Rice, Wheat",
    targetPests: "Late Blight, Rust, Blast",
    dosage: "200 ml / Acre",
    price: "₹1,400",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1584472282996-24151752e505?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  }
];

const CompareScreen = () => {
  const [product1, setProduct1] = useState(DUMMY_PRODUCTS[0]);
  const [product2, setProduct2] = useState(DUMMY_PRODUCTS[1]);

  return (
    <div className="min-h-screen font-sans flex overflow-hidden" style={{background: '#FFFFFF'}}>
      <DesktopSidebar />
      
      <div className="flex-1 ml-24 flex flex-col min-w-0 h-screen overflow-y-auto pb-10">
        {/* Header */}
        <header className="pt-8 pb-6 px-8 max-w-[1600px] w-full mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
              <Scale size={24} className="text-[#00693B]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#00693B] tracking-tight">Compare Products</h1>
          </div>
          <p className="text-[#333333] font-medium">Side-by-side technical comparison to help you choose the right solution.</p>
        </header>

        <main className="max-w-[1600px] mx-auto px-8 w-full flex-1 flex flex-col">
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden flex flex-col flex-1">
            
            {/* Selection Row */}
            <div className="grid grid-cols-3 border-b border-gray-100 bg-gray-50/50 p-6">
              <div className="flex items-center justify-center font-bold text-[#00693B] uppercase tracking-widest text-sm">
                Features
              </div>
              <div className="px-4 border-l border-gray-100">
                <select 
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-bold text-[#00693B] focus:outline-none focus:ring-2 focus:ring-gray-400/20 transition-all shadow-sm cursor-pointer"
                  value={product1.id}
                  onChange={(e) => setProduct1(DUMMY_PRODUCTS.find(p => p.id === parseInt(e.target.value)))}
                >
                  {DUMMY_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="px-4 border-l border-gray-100">
                <select 
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-bold text-[#00693B] focus:outline-none focus:ring-2 focus:ring-gray-400/20 transition-all shadow-sm cursor-pointer"
                  value={product2.id}
                  onChange={(e) => setProduct2(DUMMY_PRODUCTS.find(p => p.id === parseInt(e.target.value)))}
                >
                  {DUMMY_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="flex-1 overflow-y-auto">
              <ComparisonRow title="Product Image">
                <img src={product1.image} alt={product1.name} className="h-32 object-contain mix-blend-multiply mx-auto" />
                <img src={product2.image} alt={product2.name} className="h-32 object-contain mix-blend-multiply mx-auto" />
              </ComparisonRow>

              <ComparisonRow title="Brand">
                <span className="font-semibold text-[#00693B]">{product1.brand}</span>
                <span className="font-semibold text-[#00693B]">{product2.brand}</span>
              </ComparisonRow>

              <ComparisonRow title="Active Ingredient" bg="bg-gray-50/30">
                <span className="text-sm text-[#333333] font-medium">{product1.activeIngredient}</span>
                <span className="text-sm text-[#333333] font-medium">{product2.activeIngredient}</span>
              </ComparisonRow>

              <ComparisonRow title="Target Crops">
                <span className="text-xs font-bold text-[#00693B] bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg inline-block">{product1.targetCrops}</span>
                <span className="text-xs font-bold text-[#00693B] bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg inline-block">{product2.targetCrops}</span>
              </ComparisonRow>

              <ComparisonRow title="Target Pests" bg="bg-gray-50/30">
                <span className="text-sm text-[#333333] font-medium">{product1.targetPests}</span>
                <span className="text-sm text-[#333333] font-medium">{product2.targetPests}</span>
              </ComparisonRow>

              <ComparisonRow title="Recommended Dosage">
                <span className="font-bold text-[#00693B]">{product1.dosage}</span>
                <span className="font-bold text-[#00693B]">{product2.dosage}</span>
              </ComparisonRow>

              <ComparisonRow title="Price" bg="bg-gray-50/30">
                <span className="text-xl font-extrabold text-[#00693B]">{product1.price}</span>
                <span className="text-xl font-extrabold text-[#00693B]">{product2.price}</span>
              </ComparisonRow>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

const ComparisonRow = ({ title, children, bg = "bg-white" }) => {
  const [col1, col2] = React.Children.toArray(children);
  return (
    <div className={`grid grid-cols-3 border-b border-gray-100 p-6 items-center ${bg} hover:bg-gray-50/80 transition-colors`}>
      <div className="font-bold text-[#00693B] text-sm">{title}</div>
      <div className="px-4 text-center border-l border-gray-100">{col1}</div>
      <div className="px-4 text-center border-l border-gray-100">{col2}</div>
    </div>
  );
};

export default CompareScreen;
