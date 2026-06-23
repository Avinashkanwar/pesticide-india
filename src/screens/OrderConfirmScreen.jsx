import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Home, Package, Printer, FileText } from 'lucide-react';

const OrderConfirmScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentMethod, finalAmount, cartItems, customer, orderId } = location.state || {};

  useEffect(() => {
    if (!orderId) navigate('/', { replace: true });
  }, [orderId, navigate]);

  const paymentIcon = {
    'Online/UPI': '📲',
    'Cash': '💵',
    'Udhaar (Credit)': '📖',
  }[paymentMethod] || '💳';

  return (
    <div className="min-h-screen font-outfit bg-transparent">
      <header className="px-5 py-4 flex items-center gap-3 sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="w-8 h-8 bg-[#00693B] rounded-xl flex items-center justify-center text-white font-black text-sm font-inter">PI</div>
        <div>
          <h1 className="text-base font-black text-[#111827] m-0 leading-tight font-inter">
            Pesticide<span className="text-[#00693B]">India</span>
          </h1>
          <p className="text-[10px] font-semibold text-gray-400 m-0 uppercase tracking-widest">Sale Recorded</p>
        </div>
      </header>

      <div className="max-w-[560px] mx-auto px-4 py-5 flex flex-col gap-4 pb-10">

        {/* Success card */}
        <div className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden shadow-sm">
          <div className="h-1 bg-[#00693B] w-full" />
          <div className="flex flex-col items-center py-8 px-5 gap-3">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-20 h-20 bg-emerald-100 rounded-full animate-ping opacity-20" />
              <div className="w-16 h-16 bg-[#F5F7E9] rounded-full flex items-center justify-center border-2 border-emerald-200">
                <CheckCircle2 size={36} className="text-[#00693B]" strokeWidth={2.5} />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-black text-[#111827] font-inter">Sale Successful! 🎉</h2>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                The transaction has been recorded in your ledger.
              </p>
            </div>
            <div className="bg-[#F5F7E9] border border-emerald-100 rounded-xl px-5 py-2.5 text-center mt-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Receipt No.</p>
              <p className="text-lg font-black text-[#00693B] font-inter tracking-wider mt-0.5">#{orderId}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
            <Package size={15} className="text-[#00693B]" />
            <h3 className="text-sm font-black text-gray-800 font-inter">Sale Items</h3>
          </div>
          <div className="px-4 py-3 flex flex-col gap-3">
            {(cartItems || []).map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F7E9] border border-emerald-100 flex items-center justify-center text-[#00693B] text-xs font-bold">
                    {item.qty || 1}x
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 leading-tight line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-gray-400">₹{item.price} each</p>
                  </div>
                </div>
                <span className="text-sm font-black text-[#111827] font-inter">
                  ₹{(parseFloat(item.price.replace(/,/g, '')) * (item.qty || 1)).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700">Total Collected</span>
              <span className="text-lg font-black text-[#00693B] font-inter">₹{(finalAmount || 0).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl border border-gray-200/70 p-4 flex items-center gap-3 shadow-sm">
          <div className="w-9 h-9 bg-[#F5F7E9] rounded-xl flex items-center justify-center text-lg shrink-0 border border-emerald-100">
            {paymentIcon}
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Paid via</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">{paymentMethod}</p>
          </div>
          <span className="text-[10px] font-bold text-[#00693B] bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
            Recorded
          </span>
        </div>

        {/* Customer Detail if Udhaar or linked */}
        {customer && (
          <div className="bg-white rounded-2xl border border-gray-200/70 p-4 flex items-start gap-3 shadow-sm">
            <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
              <FileText size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Billed To</p>
              <p className="text-sm font-bold text-gray-900">{customer.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{customer.phone}</p>
              {paymentMethod === 'Udhaar (Credit)' && (
                <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded inline-block mt-1">
                  Added to Udhaar Khata
                </p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2.5 mt-2">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3.5 bg-[#00693B] text-white rounded-xl font-bold font-outfit text-sm flex items-center justify-center gap-2 hover:bg-[#004d2b] active:scale-95 transition-all shadow-md shadow-[#00693B]/20 cursor-pointer"
          >
            <Home size={15} />
            Back to Dashboard
          </button>
          <button
            onClick={() => window.print()}
            className="w-full py-3.5 bg-white text-gray-700 rounded-xl font-bold font-outfit text-sm flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-all border border-gray-200 cursor-pointer shadow-sm"
          >
            <Printer size={15} />
            Print Receipt
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmScreen;
