import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopSidebar from '../components/DesktopSidebar';
import MobileBottomNav from '../components/MobileBottomNav';
import { Scale, ArrowLeft, ChevronDown, Star, Check, X } from 'lucide-react';

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Nativo 75 WG",
    brand: "Bayer CropScience",
    activeIngredient: "Tebuconazole 50% + Trifloxystrobin 25% WG",
    targetCrops: "Rice, Tomato, Mango",
    targetPests: "Sheath Blight, Early Blight, Powdery Mildew",
    dosage: "100–120 g / Acre",
    price: "₹1,250",
    mrp: "₹1,560",
    rating: "4.8",
    reviews: "312",
    category: "Fungicide",
    stock: "In Stock",
    image: "/images/nativo.png",
  },
  {
    id: 2,
    name: "Coragen Insecticide",
    brand: "FMC Corporation",
    activeIngredient: "Chlorantraniliprole 18.5% SC",
    targetCrops: "Cotton, Soybean, Rice, Sugarcane",
    targetPests: "Bollworm, Stem Borer, Leaf Folder",
    dosage: "60 ml / Acre",
    price: "₹890",
    mrp: "₹1,100",
    rating: "4.5",
    reviews: "218",
    category: "Insecticide",
    stock: "In Stock",
    image: "/images/coragen.png",
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
    mrp: "₹1,750",
    rating: "4.9",
    reviews: "401",
    category: "Fungicide",
    stock: "Low Stock",
    image: "/images/roundup.png",
  }
];

const CompareScreen = () => {
  const navigate = useNavigate();
  const [p1, setP1] = useState(DUMMY_PRODUCTS[0]);
  const [p2, setP2] = useState(DUMMY_PRODUCTS[1]);

  const price1 = parseFloat(p1.price.replace(/[₹,]/g, ''));
  const price2 = parseFloat(p2.price.replace(/[₹,]/g, ''));
  const mrp1   = parseFloat(p1.mrp.replace(/[₹,]/g, ''));
  const mrp2   = parseFloat(p2.mrp.replace(/[₹,]/g, ''));
  const disc1  = Math.round(((mrp1 - price1) / mrp1) * 100);
  const disc2  = Math.round(((mrp2 - price2) / mrp2) * 100);

  const rows = [
    { label: 'Active Ingredient',   key: 'activeIngredient' },
    { label: 'Category',            key: 'category' },
    { label: 'Target Crops',        key: 'targetCrops' },
    { label: 'Target Pests',        key: 'targetPests' },
    { label: 'Recommended Dosage',  key: 'dosage' },
    { label: 'Stock Status',        key: 'stock' },
  ];

  return (
    <div className="min-h-screen font-outfit flex overflow-hidden" style={{ background: 'transparent' }}>
      <DesktopSidebar />

      <div className="flex-1 ml-0 md:ml-24 flex flex-col min-w-0 h-screen overflow-y-auto pb-20 md:pb-10">

        {/* ── Header ── */}
        <header className="px-5 py-4 flex items-center gap-3 sticky top-0 z-50 bg-gray-100/70 backdrop-blur-xl border-b border-gray-200/60">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-white/70 transition-colors text-gray-500 hover:text-[#00693B] cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#00693B] rounded-xl flex items-center justify-center">
              <Scale size={15} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-black text-gray-900 m-0 font-inter">Compare Products</h1>
              <p className="text-[10px] font-semibold text-gray-400 m-0 uppercase tracking-widest">Side-by-side comparison</p>
            </div>
          </div>
        </header>

        <div className="max-w-[860px] w-full mx-auto px-4 py-6 flex flex-col gap-6">

          {/* ── Product Selector + Image Cards ── */}
          <div className="grid grid-cols-2 gap-4">
            {[{ prod: p1, set: setP1, other: p2 }, { prod: p2, set: setP2, other: p1 }].map(({ prod, set, other }, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden flex flex-col">
                {/* Selector */}
                <div className="px-4 pt-4 pb-3 border-b border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                    Product {idx + 1}
                  </p>
                  <div className="relative">
                    <select
                      value={prod.id}
                      onChange={e => {
                        const selected = DUMMY_PRODUCTS.find(p => p.id === parseInt(e.target.value));
                        if (selected) set(selected);
                      }}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 pr-8 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 cursor-pointer"
                    >
                      {DUMMY_PRODUCTS.map(p => (
                        <option key={p.id} value={p.id} disabled={p.id === other.id}>{p.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Image */}
                <div className="bg-[#F8FAF5] flex items-center justify-center py-6 px-4 min-h-[140px]">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="h-24 w-24 object-contain drop-shadow-sm"
                    onError={e => { e.target.src = 'https://via.placeholder.com/96x96?text=No+Image'; }}
                  />
                </div>

                {/* Product Info */}
                <div className="px-4 py-3 flex flex-col gap-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest m-0">{prod.brand}</p>
                  <p className="text-sm font-black text-gray-900 font-inter m-0 leading-snug">{prod.name}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={10} className={parseFloat(prod.rating) >= s ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">{prod.rating}</span>
                    <span className="text-[10px] text-gray-300 font-medium">({prod.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-lg font-black text-gray-900 font-inter">{prod.price}</span>
                    <span className="text-xs text-gray-400 line-through font-semibold">{prod.mrp}</span>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                      {idx === 0 ? disc1 : disc2}% off
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Comparison Table ── */}
          <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/60 flex items-center gap-2">
              <div className="w-[3px] h-4 bg-[#00693B] rounded-full" />
              <h2 className="text-sm font-black text-gray-800 font-inter m-0">Specification Comparison</h2>
            </div>

            {rows.map((row, i) => {
              const v1 = p1[row.key];
              const v2 = p2[row.key];
              return (
                <div key={row.key} className={`grid grid-cols-[180px_1fr_1fr] border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                  {/* Label */}
                  <div className="px-5 py-4 flex items-start">
                    <span className="text-[11px] font-black text-gray-500 uppercase tracking-wider leading-tight">{row.label}</span>
                  </div>

                  {/* Product 1 Value */}
                  <div className="px-5 py-4 border-l border-gray-100">
                    <ValueCell value={v1} field={row.key} />
                  </div>

                  {/* Product 2 Value */}
                  <div className="px-5 py-4 border-l border-gray-100">
                    <ValueCell value={v2} field={row.key} />
                  </div>
                </div>
              );
            })}

            {/* Price Row */}
            <div className="grid grid-cols-[180px_1fr_1fr] bg-[#F5F7E9] border-t-2 border-[#00693B]/10">
              <div className="px-5 py-4 flex items-center">
                <span className="text-[11px] font-black text-[#00693B] uppercase tracking-wider">Price</span>
              </div>
              {[
                { price: p1.price, mrp: p1.mrp, disc: disc1 },
                { price: p2.price, mrp: p2.mrp, disc: disc2 }
              ].map((item, idx) => (
                <div key={idx} className="px-5 py-4 border-l border-[#00693B]/10 flex flex-col gap-0.5">
                  <span className="text-base font-black text-gray-900 font-inter">{item.price}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-400 line-through font-semibold">{item.mrp}</span>
                    <span className="text-[10px] font-black text-emerald-600">{item.disc}% off</span>
                  </div>
                  {idx === 0 && price1 < price2 && (
                    <span className="text-[9px] font-black text-[#00693B] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 w-fit mt-1">
                      ✓ Cheaper
                    </span>
                  )}
                  {idx === 1 && price2 < price1 && (
                    <span className="text-[9px] font-black text-[#00693B] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 w-fit mt-1">
                      ✓ Cheaper
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Best Value Summary ── */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 flex items-start gap-4">
            <div className="w-9 h-9 bg-[#F5F7E9] border border-[#00693B]/20 rounded-xl flex items-center justify-center shrink-0">
              <Scale size={16} className="text-[#00693B]" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900 font-inter m-0">Quick Summary</p>
              <p className="text-xs text-gray-500 font-medium m-0 mt-1 leading-relaxed">
                {parseFloat(p1.rating) >= parseFloat(p2.rating) ? p1.name : p2.name} has a higher rating
                ({Math.max(parseFloat(p1.rating), parseFloat(p2.rating))}★).
                {' '}{price1 < price2 ? p1.name : p2.name} is the more affordable option at{' '}
                {price1 < price2 ? p1.price : p2.price}.
                Choose based on your crop and pest requirements above.
              </p>
            </div>
          </div>

        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
};

const ValueCell = ({ value, field }) => {
  if (field === 'stock') {
    const isGood = value === 'In Stock';
    return (
      <span className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full border ${
        isGood
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-amber-50 text-amber-700 border-amber-200'
      }`}>
        {isGood ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}
        {value}
      </span>
    );
  }

  if (field === 'category') {
    return (
      <span className="inline-block text-[11px] font-black text-[#00693B] bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
        {value}
      </span>
    );
  }

  if (field === 'targetCrops') {
    return (
      <div className="flex flex-wrap gap-1">
        {value.split(',').map((c, i) => (
          <span key={i} className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
            {c.trim()}
          </span>
        ))}
      </div>
    );
  }

  if (field === 'dosage') {
    return <span className="text-sm font-black text-gray-900 font-inter">{value}</span>;
  }

  return <span className="text-xs font-semibold text-gray-700 leading-snug">{value}</span>;
};

export default CompareScreen;
