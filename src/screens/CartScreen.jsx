import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopSidebar from '../components/DesktopSidebar';
import MobileBottomNav from '../components/MobileBottomNav';
import { Trash2, ShoppingBag, Plus, Minus, BadgePercent, ArrowRight, ArrowLeft } from 'lucide-react';
import { getCart, updateCartQuantity, removeFromCart } from '../utils/cartHelper';

const CartScreen = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(getCart());
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState('');
  const [isAddressSaved, setIsAddressSaved] = useState(false);

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartItems(getCart());
    };
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  const handleQtyChange = (id, newQty) => {
    updateCartQuantity(id, newQty);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const isAddressComplete = fullName.trim() !== '' && 
                            phone.trim() !== '' && 
                            streetAddress.trim() !== '' && 
                            pinCode.trim() !== '' && 
                            city.trim() !== '';

  const handleCheckout = () => {
    if (!isAddressComplete) return;
    navigate('/payment', {
      state: {
        finalAmount,
        cartItems,
        discountSavings,
        address: { fullName, phone, streetAddress, pinCode, city },
      },
    });
  };

  // Calculations
  const totalMRP = cartItems.reduce((sum, item) => {
    const priceVal = parseFloat(item.price.replace(/,/g, ''));
    const originalPriceVal = item.originalPrice 
      ? parseFloat(item.originalPrice.replace(/,/g, '')) 
      : Math.round(priceVal * 1.25);
    return sum + (originalPriceVal * item.quantity);
  }, 0);

  const totalDiscountPrice = cartItems.reduce((sum, item) => {
    const priceVal = parseFloat(item.price.replace(/,/g, ''));
    return sum + (priceVal * item.quantity);
  }, 0);

  const discountSavings = totalMRP - totalDiscountPrice;
  const deliveryCharges = totalDiscountPrice > 500 || totalDiscountPrice === 0 ? 0 : 40;
  const finalAmount = totalDiscountPrice + deliveryCharges;

  return (
    <div className="min-h-screen font-sans flex overflow-hidden" style={{ background: 'transparent' }}>
      <DesktopSidebar />

      <div className="flex-1 ml-0 md:ml-24 flex flex-col min-w-0 h-screen overflow-y-auto pb-20 md:pb-10">
        {/* Simple back-nav header — PI header stays on HomeScreen only */}
        <header className="px-5 py-4 flex items-center gap-3 sticky top-0 z-50 bg-gray-100/70 backdrop-blur-xl border-b border-gray-200/60">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-white/70 transition-colors text-gray-500 hover:text-[#00693B] cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-black text-[#111827] font-inter">Shopping Cart</h1>
        </header>

        <main className="max-w-[1200px] w-full mx-auto px-4 md:px-8 py-8 flex-1 flex flex-col">

          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 glass-panel rounded-3xl p-10 text-center max-w-[600px] mx-auto w-full">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-[#00693B]">
                <ShoppingBag size={40} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2 font-inter">Your cart is empty</h2>
              <p className="text-sm font-medium text-gray-500 max-w-sm mb-8">
                Explore our rich catalog of pesticides, fertilizers, and smart agricultural products to get started.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="px-8 py-3.5 bg-[#00693B] text-white rounded-2xl font-bold font-outfit text-sm hover:bg-[#004d2b] transition-all cursor-pointer shadow-md shadow-[#00693B]/10"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
              
              {/* Cart Items List */}
              <div className="flex-1 flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-4">
                  {cartItems.map((item) => {
                    const priceVal = parseFloat(item.price.replace(/,/g, ''));
                    const originalPriceVal = item.originalPrice 
                      ? parseFloat(item.originalPrice.replace(/,/g, '')) 
                      : Math.round(priceVal * 1.25);
                    
                    return (
                      <div key={item.id} className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-gradient-to-br from-[#f8faf9] to-[#f0f7f3] rounded-xl flex items-center justify-center p-3 border border-gray-100 shrink-0">
                          <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                        </div>

                        {/* Info & Quantity controls */}
                        <div className="flex-1 min-w-0 flex flex-col gap-1.5 w-full">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{item.brand}</span>
                          <h3 className="text-base font-bold text-gray-900 truncate font-inter">{item.name}</h3>
                          
                          <div className="flex items-center gap-1.5 font-inter mt-1">
                            <span className="text-sm text-gray-400 line-through font-semibold">₹{originalPriceVal.toLocaleString('en-IN')}</span>
                            <span className="text-base font-black text-gray-900">₹{item.price}</span>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50 p-0.5">
                              <button 
                                onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-10 text-center font-bold text-gray-900 font-inter text-xs">{item.quantity}</span>
                              <button 
                                onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button 
                              onClick={() => handleRemove(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-xl hover:bg-red-50/50 flex items-center gap-1 text-xs font-bold"
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Shipping Address Form / Saved Address Summary */}
                {isAddressSaved ? (
                  <div className="flex flex-col gap-6">
                    <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col gap-4 border border-gray-100/50 animate-[fade-in-up_0.3s_ease]">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-black text-gray-900 font-inter">Delivery Address</h3>
                        <button 
                          onClick={() => { setIsAddressSaved(false); }}
                          className="text-xs font-bold text-[#00693B] hover:text-[#004d2b] transition-colors cursor-pointer bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-100"
                        >
                          Edit Address
                        </button>
                      </div>
                      <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4 flex flex-col gap-1">
                        <p className="text-sm font-bold text-gray-900 m-0">{fullName}</p>
                        <p className="text-xs font-semibold text-gray-500 m-0">{phone}</p>
                        <p className="text-xs font-medium text-gray-600 m-0 mt-1">{streetAddress}, {city} - {pinCode}</p>
                      </div>
                    </div>


                  </div>
                ) : (
                  <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col gap-5 border border-gray-100/50">
                    <h3 className="text-lg font-black text-gray-900 font-inter">Delivery Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Avinash Kanwar" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold text-[#00693B] focus:outline-none focus:ring-2 focus:ring-gray-400/20 transition-all placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                        <input 
                          type="tel" 
                          placeholder="+91 98765 43210" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold text-[#00693B] focus:outline-none focus:ring-2 focus:ring-gray-400/20 transition-all placeholder-gray-400"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Street Address</label>
                        <input 
                          type="text" 
                          placeholder="House No., Street Name, Colony" 
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold text-[#00693B] focus:outline-none focus:ring-2 focus:ring-gray-400/20 transition-all placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">PIN Code</label>
                        <input 
                          type="number" 
                          placeholder="110001" 
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold text-[#00693B] focus:outline-none focus:ring-2 focus:ring-gray-400/20 transition-all placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">City / District</label>
                        <input 
                          type="text" 
                          placeholder="New Delhi" 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold text-[#00693B] focus:outline-none focus:ring-2 focus:ring-gray-400/20 transition-all placeholder-gray-400"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsAddressSaved(true)}
                      disabled={!isAddressComplete}
                      className={`w-full py-3.5 rounded-xl font-bold font-outfit text-sm transition-all flex items-center justify-center gap-2 mt-2 shadow-sm ${
                        isAddressComplete 
                          ? 'bg-[#00693B] text-white hover:bg-[#004d2b] cursor-pointer' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Save Address
                    </button>
                  </div>
                )}
              </div>

              {/* Price Details Panel */}
              <div className="w-full lg:w-[380px] glass-panel rounded-3xl p-6 flex flex-col gap-5 shrink-0">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Price Details</h3>
                
                <div className="flex flex-col gap-3.5 border-b border-gray-100 pb-5">
                  <div className="flex justify-between text-sm font-medium text-gray-500">
                    <span>Price ({cartItems.length} items)</span>
                    <span className="font-semibold text-gray-900 font-inter">₹{totalMRP.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-emerald-600">
                    <span>Discount</span>
                    <span className="font-bold font-inter">-₹{discountSavings.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-500">
                    <span>Delivery Charges</span>
                    <span className="font-semibold text-gray-900 font-inter">
                      {deliveryCharges === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        `₹${deliveryCharges}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline border-b border-gray-100 pb-5">
                  <span className="text-base font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-black text-gray-900 font-inter">₹{finalAmount.toLocaleString('en-IN')}</span>
                </div>

                <p className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 py-2 px-3.5 rounded-xl border border-emerald-100 flex items-center gap-1.5">
                  <BadgePercent size={16} /> You will save ₹{discountSavings.toLocaleString('en-IN')} on this order
                </p>

                {isAddressSaved ? (
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-4 bg-[#00693B] text-white rounded-2xl font-bold font-outfit text-sm transition-all flex items-center justify-center gap-2 hover:bg-[#004d2b] shadow-md shadow-[#00693B]/10 active:scale-95 cursor-pointer mt-2"
                  >
                    Place Order <ArrowRight size={16} />
                  </button>
                ) : (
                  <div className="text-center py-3 px-4 bg-amber-50 border border-amber-100 rounded-2xl text-[11px] font-semibold text-amber-800 mt-2">
                    Please fill and save the delivery address to place your order.
                  </div>
                )}
              </div>

            </div>
          )}
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default CartScreen;
