import React from 'react';
import { Star } from 'lucide-react';

const ProductCard = ({ product, isSmall = false }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col group border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all duration-200 relative">
      
      {/* Product Image Container */}
      <div className={`relative w-full flex items-center justify-center bg-[#F9F9F8] p-3 overflow-hidden ${isSmall ? 'h-36' : 'h-52'}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Details */}
      <div className={`flex-1 flex flex-col ${isSmall ? 'p-3' : 'p-4'}`}>
        {/* Brand */}
        <div className="text-[10px] tracking-wide text-[#333333] font-bold uppercase mb-0.5">
          {product.brand}
        </div>

        {/* Title */}
        <h3 className={`font-semibold text-[#00693B] leading-snug line-clamp-1 ${isSmall ? 'text-xs mb-1.5' : 'text-sm mb-2'}`}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star size={10} className="fill-[#EC5017] text-[#EC5017]" />
          <span className="text-[10px] font-bold text-[#00693B]">{product.rating || "4.4"}</span>
          <span className="text-[10px] text-[#333333] font-medium">(1,447)</span>
        </div>
        
        {/* Price */}
        <div className={`mt-auto ${isSmall ? 'mb-2.5' : 'mb-3.5'}`}>
          <div className="text-[#00693B] font-extrabold tracking-tight">
            <span className={`font-semibold mr-0.5 ${isSmall ? 'text-xs' : 'text-sm'}`}>₹</span>
            <span className={`${isSmall ? 'text-base' : 'text-lg'}`}>{product.price}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className={`w-full font-bold rounded-full bg-transparent border-[#EC5017] text-[#EC5017] hover:bg-[#EC5017] hover:text-white transition-colors duration-200 active:scale-95 ${isSmall ? 'py-1.5 text-[11px] border' : 'py-2.5 text-xs border-2'}`}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
