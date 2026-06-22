import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Eye, BadgeCheck } from 'lucide-react';
import { addToCart, getCart } from '../utils/cartHelper';

const ProductCard = ({ product, isSmall = false }) => {
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(getCart().some(item => item.id === product.id));

  useEffect(() => {
    const handleCartUpdate = () => {
      setIsInCart(getCart().some(item => item.id === product.id));
    };
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, [product.id]);

  const handleCart = (e) => {
    e.stopPropagation();
    if (isInCart) {
      navigate('/cart');
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="glass-panel group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:glass-panel-hover h-full"
    >
      {/* Stock Badge */}
      {product.stock === 'Low Stock' && (
        <div className="absolute top-2.5 left-2.5 bg-yellow-100 text-yellow-600 text-[9px] font-bold py-0.5 px-2 rounded-full border border-yellow-200 z-10 tracking-wider uppercase">
          Low Stock
        </div>
      )}

      {/* Image Container */}
      <div 
        className="relative w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f8faf9] to-[#f0f7f3]"
        style={{ height: isSmall ? '130px' : '180px' }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {/* Quick View overlay */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#00693B]/90 backdrop-blur-sm text-white text-[10px] font-bold py-1 px-3 rounded-full flex items-center gap-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Eye size={10} /> Quick View
        </div>
      </div>

      {/* Details */}
      <div className={`flex-1 flex flex-col ${isSmall ? 'p-2.5 pb-3' : 'p-3.5 pb-4'}`}>
        {/* Brand & Vendor Badge */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider truncate">
            {product.brand}
          </p>
          {product.isVendorProduct && (
            <span className="flex items-center gap-0.5 text-[8px] font-bold text-[#00693B] bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-100 shrink-0 uppercase tracking-widest">
              <BadgeCheck size={10} /> Verified Seller
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className={`font-bold text-gray-900 leading-snug mb-2 line-clamp-2 font-inter ${isSmall ? 'text-[13px]' : 'text-[14px]'}`}>
          {product.name}
        </h3>

        {/* Tags */}
        <div className="flex gap-1 flex-wrap mb-2">
          {product.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-[9px] font-semibold text-[#00693B] bg-[#f0faf4] py-0.5 px-2 rounded-full border border-[#bbf7d0]">
              {tag}
            </span>
          ))}
        </div>

        {/* Rating + Price Row */}
        <div className="flex items-center justify-between mb-2.5 mt-auto">
          <div className="flex items-center gap-1">
            <Star size={10} fill="#FEB600" color="#FEB600" />
            <span className="text-[11px] font-bold text-gray-900">{product.rating}</span>
            <span className="text-[10px] text-gray-400">(1.4k)</span>
          </div>
          <div className="flex flex-col items-end font-inter">
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="text-[11px] text-gray-400 line-through font-semibold">
                ₹{product.originalPrice || Math.round(parseFloat(product.price.replace(/,/g, '')) * 1.25).toLocaleString('en-IN')}
              </span>
              <span className={`font-black text-gray-900 ${isSmall ? 'text-[15px]' : 'text-[17px]'}`}>
                ₹{product.price}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 mt-0.5">
              {Math.round((((product.originalPrice ? parseFloat(product.originalPrice.replace(/,/g, '')) : parseFloat(product.price.replace(/,/g, '')) * 1.25) - parseFloat(product.price.replace(/,/g, ''))) / (product.originalPrice ? parseFloat(product.originalPrice.replace(/,/g, '')) : parseFloat(product.price.replace(/,/g, '')) * 1.25)) * 100)}% off
            </span>
          </div>
        </div>

        {/* Add to Cart / View Cart */}
        <button
          onClick={handleCart}
          className={`w-full ${isSmall ? 'py-2' : 'py-2.5'} rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 font-outfit transition-all duration-200 ${
            isInCart 
              ? 'bg-[#00693B] text-white border-transparent' 
              : 'border-[1.5px] border-[#00693B] text-[#00693B] bg-transparent group-hover:bg-[#00693B] group-hover:text-white group-hover:border-transparent'
          }`}
        >
          <ShoppingCart size={11} />
          {isInCart ? 'View Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
