import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopSidebar from '../components/DesktopSidebar';
import MobileBottomNav from '../components/MobileBottomNav';
import Header from '../components/Header';
import {
  ArrowLeft, Plus, Pencil, Trash2, Package, Tag,
  CheckCircle2, ChevronDown, Store, X, AlertTriangle,
  FileText, Building2, User, Phone, MapPin, ShieldCheck,
  ClipboardCheck, BadgeCheck, TrendingUp, ShoppingCart, Clock, PackageSearch, ArrowUpRight
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, Cell, LabelList, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const CATEGORIES = ['Pesticides', 'Fertilizers', 'Sprayers', 'Nets', 'Others'];
const STOCK_OPTIONS = ['In Stock', 'Low Stock', 'Out of Stock'];

const EMPTY_FORM = {
  name: '', brand: '', price: '', originalPrice: '',
  category: 'Pesticides', stock: 'In Stock', tags: '',
  activeIngredient: '', description: '', targetCrops: '',
  targetPests: '', dosage: '', image: '',
};

const VendorDashboard = () => {
  const navigate = useNavigate();
  const isDemo = localStorage.getItem('isDemo') === 'true';

  // Vendor Registration state
  const [vendorProfile, setVendorProfile] = useState(() => {
    try { 
      const existing = localStorage.getItem('vendor_profile');
      if (existing) return JSON.parse(existing);
      
      // Automatically mock a vendor profile so the dashboard is visible immediately for demonstration
      const mockProfile = {
        businessName: 'AgriTech Demo Store',
        ownerName: 'Demo User',
        phone: '9876543210',
        email: 'demo@agritech.com',
        businessType: 'Retailer',
        gstNumber: '22AAAAA0000A1Z5',
        pesticideLicenceNo: 'DEMO-12345',
        licenceExpiry: '2028-12-31',
        address: 'Demo Address',
        district: 'Demo District',
        state: 'Demo State',
        pinCode: '123456',
        bankAccountNo: '0000000000',
        ifscCode: 'SBIN0000000',
        aadharNo: '000000000000',
        panNo: 'ABCDE1234F',
      };
      localStorage.setItem('vendor_profile', JSON.stringify(mockProfile));
      return mockProfile;
    } catch { return null; }
  });

  // Product state
  const [products, setProducts] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vendor_products') || '[]'); } catch { return []; }
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  // POS State
  const [customers, setCustomers] = useState(() => {
    try { 
      const existing = localStorage.getItem('vendor_customers');
      if (existing) return JSON.parse(existing);
      const mockCustomers = [
        { id: 'c_1', name: 'Ramesh Singh', phone: '+919876543210', udhaarBalance: 15500, dueDate: '15 Jun 2026' },
        { id: 'c_2', name: 'Kisan Patel', phone: '+918765432109', udhaarBalance: 8200, dueDate: '25 Jun 2026' },
        { id: 'c_3', name: 'Mahesh Yadav', phone: '+917654321098', udhaarBalance: 4150, dueDate: '10 Jul 2026' },
        { id: 'c_4', name: 'Gopal Sharma', phone: '+916543210987', udhaarBalance: 12000, dueDate: '05 Jun 2026' },
      ];
      localStorage.setItem('vendor_customers', JSON.stringify(mockCustomers));
      return mockCustomers;
    } catch { return []; }
  });

  const [sales, setSales] = useState(() => {
    try { 
      const existing = localStorage.getItem('vendor_sales');
      if (existing) {
        const parsed = JSON.parse(existing);
        // Use existing if it already has the 4 years of data (around 96 items)
        if (parsed.length > 90) return parsed;
      }

      const mockSales = [];
      const currDate = new Date();
      
      // Generate 4 years of data (48 months) to fully test the charts
      for (let i = 0; i < 48; i++) {
        const monthsAgo = 47 - i;
        const d = new Date(currDate.getFullYear(), currDate.getMonth() - monthsAgo, 15);
        
        // Create a trend that generally goes upward, with some random spikes
        const baseTrend = 8000 + (i * 1200); 
        const randomFactor = 0.7 + (Math.random() * 0.6); // Random between 0.7 and 1.3
        const monthlyTotal = baseTrend * randomFactor;
        
        mockSales.push({ id: `s_m1_${i}`, customerName: 'Ramesh Singh', items: 'Nativo 75 WG', date: d.toISOString(), amount: Math.floor(monthlyTotal * 0.4), method: 'Cash' });
        mockSales.push({ id: `s_m2_${i}`, customerName: 'Kisan Patel', items: 'Coragen, Urea', date: new Date(d.getTime() + 86400000).toISOString(), amount: Math.floor(monthlyTotal * 0.6), method: 'Online' });
      }

      localStorage.setItem('vendor_sales', JSON.stringify(mockSales));
      return mockSales;
    } catch { return []; }
  });

  // ── Product Management ───────────────────────────
  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem('vendor_products', JSON.stringify(updated));
  };

  const validateProduct = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Product name is required';
    if (!form.brand.trim()) errs.brand = 'Brand is required';
    if (!form.price || isNaN(parseFloat(form.price))) errs.price = 'Valid price is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validateProduct()) return;
    const newProduct = {
      ...form,
      id: editingId || 'v_' + Date.now(),
      price: parseFloat(form.price).toLocaleString('en-IN'),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice).toLocaleString('en-IN') : '',
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      image: form.image || '/images/nativo.png',
      rating: '4.5',
      isVendorProduct: true,
    };
    let updated;
    if (editingId) {
      updated = products.map(p => p.id === editingId ? newProduct : p);
      setSuccessMsg('Product updated successfully!');
    } else {
      updated = [newProduct, ...products];
      setSuccessMsg('Product listed successfully!');
    }
    saveProducts(updated);
    setForm(EMPTY_FORM); setEditingId(null); setShowForm(false); setErrors({});
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleEdit = (product) => {
    setForm({
      ...product,
      price: parseFloat(product.price.replace(/,/g, '')).toString(),
      originalPrice: product.originalPrice ? parseFloat(product.originalPrice.replace(/,/g, '')).toString() : '',
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : product.tags || '',
    });
    setEditingId(product.id); setShowForm(true); setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    saveProducts(products.filter(p => p.id !== id));
    setDeleteConfirmId(null);
    setSuccessMsg('Product removed.');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const cancelForm = () => { setShowForm(false); setForm(EMPTY_FORM); setEditingId(null); setErrors({}); };

  const inStockCount = products.filter(p => p.stock === 'In Stock').length;
  const lowStockCount = products.filter(p => p.stock === 'Low Stock').length;

  // Dynamic Chart & Sales Calculation
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  let currentYearTotal = 0;
  let lastYearTotal = 0;
  let hasLastYearData = false;
  const monthlyDataMap = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 };

  sales.forEach(sale => {
    const d = new Date(sale.date);
    const year = d.getFullYear();
    if (year === currentYear) {
      currentYearTotal += sale.amount;
      monthlyDataMap[d.getMonth()] += sale.amount;
    } else if (year === lastYear) {
      lastYearTotal += sale.amount;
      hasLastYearData = true;
    }
  });

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dynamicSalesData = monthNames.map((name, index) => ({
    name,
    sales: monthlyDataMap[index]
  }));

  const yearlyDataMap = {};
  sales.forEach(sale => {
    const d = new Date(sale.date);
    const year = d.getFullYear();
    if (!yearlyDataMap[year]) yearlyDataMap[year] = 0;
    yearlyDataMap[year] += sale.amount;
  });
  const yearlySalesData = Object.keys(yearlyDataMap).sort().map(year => {
    return {
      name: year,
      total: yearlyDataMap[year]
    };
  });

  // ── DASHBOARD SCREEN ─────────────────────────────
  return (
    <div className="min-h-screen font-outfit flex overflow-hidden" style={{ background: 'transparent' }}>
      <DesktopSidebar />
      <div className="flex-1 ml-0 md:ml-24 flex flex-col min-w-0 h-screen overflow-y-auto pb-20 md:pb-10">
        <Header />
        
        <div className="max-w-[1600px] w-full mx-auto px-4 py-6 flex flex-col gap-6">

          {/* Demo Mode Banner */}
          {isDemo && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm animate-fade-in-up">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="text-amber-900 font-bold text-sm">You are viewing the Demo Dashboard</h3>
                  <p className="text-amber-700 text-xs font-medium mt-0.5">Subscribe to a plan to unlock full store setup, active support, and premium features.</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold text-xs hover:bg-amber-600 transition-colors shadow-sm shrink-0 w-full sm:w-auto"
              >
                View Plans
              </button>
            </div>
          )}



          {/* Success Banner */}
          {successMsg && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold px-4 py-3 rounded-2xl">
              <CheckCircle2 size={16} className="shrink-0" />{successMsg}
            </div>
          )}

          {/* CLEAN DASHBOARD STATS (Smaller Size) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Monthly Revenue', value: '₹ ' + (sales.reduce((sum, s) => sum + s.amount, 0)/1000).toFixed(1) + 'k', sub: 'Calculated from sales', icon: <TrendingUp size={16} />, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
              { label: 'Total Debtors', value: customers.filter(c => c.udhaarBalance > 0).length, sub: 'Active accounts', icon: <User size={16} />, color: 'text-blue-600 bg-blue-50 border-blue-200' },
              { label: 'Total Products', value: 10 + products.length, sub: `${10 + inStockCount} in stock`, icon: <Package size={16} />, color: 'text-[#00693B] bg-[#F5F7E9] border-[#00693B]/30' },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-gray-200/80 rounded-xl p-3 flex flex-col gap-1.5 relative overflow-hidden group hover:border-[#00693B]/40 hover:shadow-sm transition-all cursor-default">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${s.color} mb-0.5 shadow-sm`}>{s.icon}</div>
                <p className="text-xl font-black text-gray-900 font-inter m-0">{s.value}</p>
                <div>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest m-0">{s.label}</p>
                  <p className="text-[10px] font-semibold text-gray-400 m-0 mt-0.5">{s.sub}</p>
                </div>
                <div className={`absolute -right-3 -bottom-3 opacity-[0.03] transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12 ${s.color.split(' ')[0]}`}>
                  {React.cloneElement(s.icon, { size: 60 })}
                </div>
              </div>
            ))}

            <div 
              onClick={() => navigate('/sale-now')}
              className="bg-white border border-gray-200/80 rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 relative overflow-hidden group hover:border-amber-500/40 hover:shadow-sm transition-all cursor-pointer shadow-sm"
            >
              <ShoppingCart size={32} strokeWidth={2.5} className="text-amber-500 mb-0.5 relative z-10" />
              <p className="text-[14px] font-black text-amber-500 font-inter m-0 relative z-10 uppercase tracking-widest">Sale Now</p>
              <div className="absolute -right-2 -bottom-2 opacity-[0.05] transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12 text-amber-500">
                <ShoppingCart size={80} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Monthly Earnings Chart */}
            <div className="lg:col-span-2 bg-white border border-gray-200/70 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-[3px] h-4 bg-[#00693B] rounded-sm" />
                  <h2 className="text-sm font-black text-gray-800 font-inter m-0">Monthly Earnings Overview</h2>
                </div>
                <div className="flex gap-2">
                  {hasLastYearData && (
                    <div className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
                      Last Year: ₹{lastYearTotal.toLocaleString('en-IN')}
                    </div>
                  )}
                  <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                    This Year: ₹{currentYearTotal.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
              <div className="h-[250px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dynamicSalesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00693B" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#00693B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 600 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 600 }} tickFormatter={(val) => `₹${val/1000}k`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#00693B', fontWeight: 900 }}
                      formatter={(value) => [`₹ ${value.toLocaleString('en-IN')}`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#00693B" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Column: Recent Sales */}
            <div className="lg:col-span-1 bg-white border border-gray-200/70 rounded-2xl p-5 flex flex-col gap-4">
              
              <div className="flex justify-end">
                <button 
                  onClick={() => navigate('/transactions')}
                  className="text-[12px] font-bold text-[#00693B] hover:text-[#004d2b] hover:underline transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center gap-1"
                >
                  View All Transactions <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-[3px] h-4 bg-[#00693B] rounded-sm" />
                  <h2 className="text-sm font-black text-gray-800 font-inter m-0">Recent Sales</h2>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                  {sales.slice(0, 4).map((sale, idx) => (
                    <div key={idx} onClick={() => navigate(`/invoice/${sale.id}`)} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50/80 cursor-pointer transition-colors group border border-transparent hover:border-gray-100">
                      <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-[#00693B] transition-colors">
                        <TrendingUp size={16} className="text-[#00693B] group-hover:text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-gray-900 font-inter truncate m-0 group-hover:text-[#00693B] transition-colors">{sale.customerName}</p>
                        <p className="text-[10px] font-semibold text-gray-500 m-0 truncate">{sale.items} · {new Date(sale.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-[#00693B] m-0">+₹ {sale.amount.toLocaleString('en-IN')}</p>
                        <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">{sale.method}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            {/* Debtors List (Udhaar Khata) */}
            <div className="lg:col-span-3 bg-white border border-gray-200/70 rounded-2xl p-5 flex flex-col gap-4 overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-[3px] h-4 bg-[#00693B] rounded-sm" />
                  <h2 className="text-sm font-black text-gray-800 font-inter m-0">Debtors List (Udhaar Khata)</h2>
                </div>
                <button className="text-[10px] font-bold text-[#00693B] bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 hover:bg-emerald-100 cursor-pointer transition-colors">View All Debtors</button>
              </div>
              <div className="overflow-x-auto -mx-2 px-2">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Customer Name</th>
                      <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Phone Number</th>
                      <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Pending Amount</th>
                      <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Due Date</th>
                      <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.filter(c => c.udhaarBalance > 0).map((debtor, idx) => (
                      <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 text-xs font-bold text-gray-900 whitespace-nowrap">{debtor.name}</td>
                        <td className="py-3 text-xs font-semibold text-gray-600 whitespace-nowrap">{debtor.phone}</td>
                        <td className="py-3 text-xs font-black text-red-600 whitespace-nowrap">₹ {debtor.udhaarBalance.toLocaleString('en-IN')}</td>
                        <td className="py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-700">{debtor.dueDate || 'N/A'}</span>
                            {(!debtor.dueDate || new Date(debtor.dueDate) < new Date()) && (
                              <span className="text-[9px] font-bold bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-md">Overdue</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 text-right whitespace-nowrap">
                          <button 
                            onClick={() => window.open(`https://wa.me/${debtor.phone.replace(/\\D/g, '')}?text=${encodeURIComponent(`Namaskar ${debtor.name}, aapka store par pending udhaar ₹${debtor.udhaarBalance} baki hai. Kripya jald bhugtan karein.`)}`, '_blank')}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded-lg cursor-pointer transition-colors border-none shadow-sm"
                          >
                            <Phone size={12} /> WhatsApp
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* New Row for All Sales Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3 bg-white border border-gray-200/70 rounded-2xl p-5 flex flex-col gap-4 overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-[3px] h-4 bg-amber-500 rounded-sm" />
                  <h2 className="text-sm font-black text-gray-800 font-inter m-0">Yearly Earnings Overview</h2>
                </div>
              </div>
              <div className="h-[250px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlySalesData} margin={{ top: 30, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" opacity={0.6} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6B7280', fontWeight: 500 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 500 }} tickFormatter={(val) => `₹${val/1000}k`} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(0, 105, 59, 0.05)' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', padding: '12px 16px' }}
                      itemStyle={{ color: '#111827', fontWeight: 700, fontSize: '15px' }}
                      labelStyle={{ display: 'none' }}
                      formatter={(value) => [`₹ ${value.toLocaleString('en-IN')}`, 'Revenue']}
                    />
                    <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={36} animationDuration={1000}>
                      <LabelList dataKey="total" position="top" formatter={(val) => `₹${(val/1000).toFixed(0)}k`} style={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} dy={-8} />
                      {yearlySalesData.map((entry, index) => {
                        let color = "#FEB600";
                        if (entry.total >= 300000) color = "#3B82F6";
                        else if (entry.total >= 150000) color = "#00693B";
                        return <Cell key={`cell-${index}`} fill={color} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Add / Edit Product Form */}
          {showForm && (
            <div className="bg-white border border-gray-200/70 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-[#F5F7E9]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#00693B] flex items-center justify-center"><Tag size={14} className="text-white" /></div>
                  <h2 className="text-sm font-black text-gray-900 font-inter m-0">{editingId ? 'Edit Product' : 'List a New Product'}</h2>
                </div>
                <button onClick={cancelForm} className="p-1.5 rounded-lg hover:bg-white/70 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"><X size={16} /></button>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Name *</label>
                    <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="e.g. Nativo 75 WG"
                      className={`w-full bg-white border rounded-xl p-3 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 placeholder-gray-300 transition-all shadow-sm ${errors.name ? 'border-red-200' : 'border-gray-200'}`} />
                    {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Brand *</label>
                    <input type="text" value={form.brand} onChange={e => handleChange('brand', e.target.value)} placeholder="e.g. Bayer CropScience"
                      className={`w-full bg-white border rounded-xl p-3 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 placeholder-gray-300 transition-all shadow-sm ${errors.brand ? 'border-red-200' : 'border-gray-200'}`} />
                    {errors.brand && <p className="text-[10px] text-red-500 font-semibold">{errors.brand}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Selling Price (₹) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₹</span>
                      <input type="number" value={form.price} onChange={e => handleChange('price', e.target.value)} placeholder="450" min="0"
                        className={`w-full bg-white border rounded-xl p-3 pl-7 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 placeholder-gray-300 shadow-sm ${errors.price ? 'border-red-200' : 'border-gray-200'}`} />
                    </div>
                    {errors.price && <p className="text-[10px] text-red-500 font-semibold">{errors.price}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">MRP / Original Price (₹)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₹</span>
                      <input type="number" value={form.originalPrice} onChange={e => handleChange('originalPrice', e.target.value)} placeholder="563" min="0"
                        className="w-full bg-white border border-gray-200 rounded-xl p-3 pl-7 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 placeholder-gray-300 shadow-sm" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                    <div className="relative">
                      <select value={form.category} onChange={e => handleChange('category', e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-200 rounded-xl p-3 pr-9 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 cursor-pointer shadow-sm">
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stock Status</label>
                    <div className="flex gap-2">
                      {STOCK_OPTIONS.map(s => (
                        <button key={s} type="button" onClick={() => handleChange('stock', s)}
                          className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${form.stock === s
                            ? s === 'In Stock' ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                              : s === 'Low Stock' ? 'bg-amber-100 border-amber-300 text-amber-700'
                              : 'bg-red-100 border-red-300 text-red-700'
                            : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tags (comma separated)</label>
                  <input type="text" value={form.tags} onChange={e => handleChange('tags', e.target.value)} placeholder="Rice, Wheat, Cotton"
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 placeholder-gray-300 shadow-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Ingredient / Composition</label>
                  <input type="text" value={form.activeIngredient} onChange={e => handleChange('activeIngredient', e.target.value)} placeholder="e.g. Glyphosate 41% SL"
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 placeholder-gray-300 shadow-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description *</label>
                  <textarea value={form.description} onChange={e => handleChange('description', e.target.value)}
                    placeholder="Describe the product, its benefits and use cases..." rows={3}
                    className={`w-full bg-white border rounded-xl p-3 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 placeholder-gray-300 resize-none shadow-sm ${errors.description ? 'border-red-200' : 'border-gray-200'}`} />
                  {errors.description && <p className="text-[10px] text-red-500 font-semibold">{errors.description}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[['Target Crops', 'targetCrops', 'Rice, Tomato, Wheat'], ['Target Pests / Diseases', 'targetPests', 'Aphids, Bollworm'], ['Dosage / Application', 'dosage', '60 ml per Acre']].map(([label, field, ph]) => (
                    <div key={field} className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                      <input type="text" value={form[field]} onChange={e => handleChange(field, e.target.value)} placeholder={ph}
                        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 placeholder-gray-300 shadow-sm" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Image URL (optional)</label>
                  <div className="flex gap-3 items-center">
                    <input type="text" value={form.image} onChange={e => handleChange('image', e.target.value)} placeholder="https://... or /images/..."
                      className="flex-1 bg-white border border-gray-200 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 placeholder-gray-300 shadow-sm" />
                    {form.image && <img src={form.image} alt="Preview" className="w-12 h-12 rounded-xl object-contain border border-gray-200 bg-gray-50" onError={e => { e.target.style.display = 'none'; }} />}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={handleSubmit}
                    className="flex-1 py-3.5 bg-[#00693B] text-white rounded-2xl font-bold text-sm hover:bg-[#004d2b] transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2 shadow-md shadow-[#00693B]/20">
                    <CheckCircle2 size={16} />{editingId ? 'Save Changes' : 'List Product'}
                  </button>
                  <button onClick={cancelForm}
                    className="px-6 py-3.5 bg-gray-100 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all cursor-pointer">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}


        </div>
        
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default VendorDashboard;
