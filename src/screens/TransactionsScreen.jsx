import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopSidebar from '../components/DesktopSidebar';
import MobileBottomNav from '../components/MobileBottomNav';
import Header from '../components/Header';
import { ArrowLeft, Search, Receipt, Calendar, ArrowUpRight, ArrowDownRight, IndianRupee } from 'lucide-react';

const TransactionsScreen = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      const existing = localStorage.getItem('vendor_sales');
      if (existing) {
        const parsed = JSON.parse(existing);
        // Sort by date descending (newest first)
        parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
        setSales(parsed);
      }
    } catch (e) {
      console.error('Error loading sales:', e);
    }
  }, []);

  const filteredSales = sales.filter(sale => 
    sale.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.items?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen font-outfit flex overflow-hidden bg-transparent">
      <DesktopSidebar />
      
      <div className="flex-1 ml-0 md:ml-24 flex flex-col min-w-0 h-screen overflow-y-auto pb-20 md:pb-10">
        <Header />
        
        <header className="pt-8 pb-6 px-4 md:px-8 max-w-[1200px] w-full mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500 hover:text-[#00693B] cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="w-10 h-10 bg-[#00693B]/10 rounded-xl flex items-center justify-center text-[#00693B]">
              <Receipt size={20} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight font-inter m-0">Transaction History</h1>
          </div>
          <p className="text-sm font-semibold text-gray-500 max-w-xl ml-14">View all your past sales and transactions.</p>
        </header>

        <main className="max-w-[1200px] mx-auto px-4 md:px-8 w-full flex-1">
          {/* Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex items-center">
            <Search className="text-gray-400 mr-3" size={20} />
            <input 
              type="text" 
              placeholder="Search by customer name, items, or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-sm font-semibold text-gray-800 outline-none placeholder-gray-400"
            />
          </div>

          {/* Transactions List */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {filteredSales.length === 0 ? (
              <div className="p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                  <Receipt size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No Transactions Found</h3>
                <p className="text-sm text-gray-500 font-medium">Try adjusting your search or start making sales.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filteredSales.map((sale) => (
                  <div key={sale.id} className="p-5 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-[#00693B] shrink-0">
                        <ArrowUpRight size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-0.5">{sale.customerName}</h3>
                        <p className="text-xs font-semibold text-gray-500 mb-1.5">{sale.items}</p>
                        <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(sale.date)}</span>
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-md">{sale.method}</span>
                          <span className="hidden sm:inline">ID: {sale.id}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end sm:justify-start">
                      <div className="text-right">
                        <span className="text-lg font-black text-gray-900 flex items-center justify-end">
                          <IndianRupee size={16} className="mr-0.5" />
                          {sale.amount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default TransactionsScreen;
