import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Minus, CreditCard, Package, ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';

const SaleNowScreen = () => {
  const navigate = useNavigate();
  const isDemo = localStorage.getItem('isDemo') === 'true';

  if (isDemo) {
    return (
      <div className="min-h-screen font-outfit flex overflow-hidden bg-transparent flex-col items-center justify-center p-8 text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🔒</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 font-inter mb-4">Premium Feature Locked</h2>
        <p className="text-gray-500 font-medium max-w-md mb-8">The Point of Sale (POS) system is not available in Demo Mode. Subscribe to a plan to start recording sales.</p>
        <button onClick={() => navigate('/')} className="px-8 py-4 bg-[#00693B] text-white rounded-xl font-bold hover:bg-[#004d2b] transition-colors shadow-lg shadow-[#00693B]/20">View Plans</button>
      </div>
    );
  }

  // Load state from local storage instead of props
  const [products] = useState(() => {
    try { 
      const existing = localStorage.getItem('vendor_products');
      if (existing) {
        const parsed = JSON.parse(existing);
        // Force update if old mock format is detected
        if (parsed.length > 0 && !parsed.find(p => p.id === 'v_1')) {
          return parsed;
        }
      }
      
      const mockProducts = [
        { id: 1, name: "Nativo 75 WG", brand: "Bayer CropScience", price: "1,250", rating: "4.8", stock: "In Stock", tags: ["Rice", "Tomato"], category: "pesticides", image: "/images/nativo.png" },
        { id: 2, name: "Coragen Insecticide", brand: "FMC Corporation", price: "890", rating: "4.5", stock: "In Stock", tags: ["Cotton", "Soybean"], category: "pesticides", image: "/images/coragen.png" },
        { id: 3, name: "Roundup Herbicide", brand: "Bayer (Monsanto)", price: "450", rating: "4.2", stock: "Low Stock", tags: ["Wheat"], category: "pesticides", image: "/images/roundup.png" },
        { id: 4, name: "Amistar Top", brand: "Syngenta", price: "1,400", rating: "4.9", stock: "In Stock", tags: ["Tomato", "Rice"], category: "pesticides", image: "/images/amistar.png" },
        { id: 5, name: "Urea Fertilizer", brand: "IFFCO", price: "266", rating: "4.7", stock: "In Stock", tags: ["All Crops"], category: "fertilizers", image: "/images/urea.png" },
        { id: 6, name: "Glyphosate 41%", brand: "Excel Crop Care", price: "350", rating: "4.4", stock: "Low Stock", tags: ["Tea", "Non-Crop"], category: "pesticides", image: "/images/glyphosate.png" },
        { id: 7, name: "NPK 19-19-19 Fertilizer", brand: "Mahadhan", price: "180", rating: "4.6", stock: "In Stock", tags: ["All Crops"], category: "fertilizers", image: "/images/npk.png" },
        { id: 8, name: "16L Battery Knapsack Sprayer", brand: "Neptune", price: "2,490", rating: "4.7", stock: "In Stock", tags: ["Spraying"], category: "sprayers", image: "/images/sprayer.png" },
        { id: 9, name: "Green Shade Net (50% Block)", brand: "Tuuf", price: "850", rating: "4.4", stock: "In Stock", tags: ["Shading", "Protection"], category: "nets", image: "/images/shadenet.png" },
        { id: 10, name: "Anti-Insect Crop Netting", brand: "AgriNet", price: "620", rating: "4.5", stock: "In Stock", tags: ["Protection"], category: "nets", image: "/images/insectnet.png" }
      ];
      localStorage.setItem('vendor_products', JSON.stringify(mockProducts));
      return mockProducts;
    } catch { return []; }
  });
  
  const [customers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vendor_customers') || '[]'); } catch { return []; }
  });

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const subtotal = cart.reduce((sum, item) => {
    const priceStr = item.price.toString().replace(/,/g, '');
    return sum + (parseFloat(priceStr) * item.qty);
  }, 0);
  
  const discountAmt = parseFloat(discount) || 0;
  const finalAmount = Math.max(0, subtotal - discountAmt);

  const handleProceed = () => {
    if (cart.length === 0) return alert('Please add products to the sale.');
    
    let customerData = selectedCustomer;
    if (!customerData) {
      if (!newCustomerName) return alert('Please select or add a customer.');
      customerData = {
        id: 'c_' + Date.now(),
        name: newCustomerName,
        phone: newCustomerPhone,
        udhaarBalance: 0
      };
    }

    navigate('/payment', {
      state: {
        customer: customerData,
        cartItems: cart,
        subtotal,
        discountAmt,
        finalAmount,
        isPOS: true
      }
    });
  };

  return (
    <div className="h-screen flex flex-col bg-transparent font-outfit overflow-hidden">
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-50 transition-colors text-gray-500 hover:text-[#00693B] cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="PI Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-base font-black text-[#111827] m-0 leading-tight font-inter">Sale Now</h1>
              <p className="text-[10px] font-semibold text-gray-400 m-0 uppercase tracking-widest">POS Checkout</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden h-full">
        
        {/* Left Side: Product Selection */}
        <div className="w-full md:w-3/5 flex flex-col border-r border-gray-200 h-full overflow-hidden bg-white">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-[3px] h-5 bg-amber-500 rounded-sm" />
              <h2 className="text-lg font-black text-gray-900 font-inter m-0">Select Products</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00693B]/20"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 bg-gray-50/50">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">No products found. Please add products from the dashboard.</div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-200 group flex flex-col h-full cursor-pointer" onClick={() => addToCart(p)}>
                    
                    {/* Image Box */}
                    <div className="relative w-full h-32 bg-[#f8faf9] flex items-center justify-center p-2">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-[#00693B]">
                          <Package size={24} />
                        </div>
                      )}
                      {p.stock === 'Low Stock' && (
                        <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-600 text-[8px] font-bold py-0.5 px-1.5 rounded border border-yellow-200 uppercase">
                          Low Stock
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-3 flex-1 flex flex-col">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate mb-0.5">{p.brand || p.category}</p>
                      <h3 className="font-bold text-gray-900 text-[13px] leading-tight line-clamp-2 font-inter mb-1">
                        {p.name}
                      </h3>
                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <span className="font-black text-gray-900 text-sm">₹{p.price}</span>
                      </div>
                      
                      <button className="w-full mt-3 py-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 font-outfit transition-all duration-200 border border-[#00693B] text-[#00693B] bg-transparent group-hover:bg-[#00693B] group-hover:text-white">
                        <Plus size={12} /> Add to Cart
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Sale Details & Cart */}
        <div className="w-full md:w-2/5 flex flex-col bg-gray-50 h-full overflow-hidden">
          <div className="p-5 border-b border-gray-200 bg-white shadow-sm z-10 shrink-0">
            <h2 className="text-lg font-black text-gray-900 font-inter">Cart & Customer</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {/* Customer Selection */}
            <div className="mb-6 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Customer Details</label>
              <div className="space-y-3">
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-[#00693B]/20"
                  onChange={(e) => {
                    if (e.target.value === 'new') setSelectedCustomer(null);
                    else setSelectedCustomer(customers.find(c => c.id === e.target.value));
                  }}
                  value={selectedCustomer ? selectedCustomer.id : 'new'}
                >
                  <option value="new">+ Add New Customer</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
                  ))}
                </select>

                {!selectedCustomer && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <input 
                      type="text" 
                      placeholder="Customer Name" 
                      value={newCustomerName}
                      onChange={e => setNewCustomerName(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-semibold placeholder-gray-400 outline-none"
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      value={newCustomerPhone}
                      onChange={e => setNewCustomerPhone(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-semibold placeholder-gray-400 outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Cart Items */}
            <div className="mb-6 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Selected Items</label>
              {cart.length === 0 ? (
                <div className="text-center py-6 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl bg-gray-50">Cart is empty</div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm gap-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center shrink-0 p-1">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                        ) : (
                          <Package size={16} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 truncate pr-2">
                        <span className="font-bold text-gray-800 text-xs md:text-sm">{item.name}</span>
                        <div className="text-[11px] text-gray-500 font-medium">₹{item.price} × {item.qty}</div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 md:w-7 md:h-7 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200"><Minus size={12} /></button>
                        <span className="font-bold w-5 md:w-6 text-center text-xs">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 md:w-7 md:h-7 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200"><Plus size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer Totals */}
          <div className="p-5 border-t border-gray-200 bg-white shrink-0">
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500 font-semibold">Subtotal</span>
              <span className="text-sm font-bold text-gray-700">₹ {subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500 font-semibold">Discount (₹)</span>
              <div className="w-24">
                <input 
                  type="number" 
                  placeholder="0" 
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                  min="0"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-right text-sm font-bold text-emerald-600 outline-none focus:ring-2 focus:ring-[#00693B]/20"
                />
              </div>
            </div>
            <div className="flex justify-between items-center my-4 py-4 border-t border-gray-100">
              <span className="text-base font-black text-gray-900 font-inter">Total to Pay</span>
              <span className="text-2xl font-black text-[#00693B] font-inter">₹ {finalAmount.toLocaleString('en-IN')}</span>
            </div>

            <button 
              onClick={handleProceed}
              className="w-full py-4 bg-[#00693B] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#004d2b] transition-all shadow-md shadow-[#00693B]/20 active:scale-95"
            >
              <CreditCard size={18} /> Proceed to Payment
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SaleNowScreen;
