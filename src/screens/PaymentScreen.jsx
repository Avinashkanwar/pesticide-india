import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock, CreditCard, Banknote, BookOpen, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);

  const { finalAmount = 0, cartItems = [], customer = null, discountAmt = 0, subtotal = 0 } = orderData;

  const isPaymentReady = () => {
    return ['cash', 'online', 'udhaar'].includes(paymentMethod);
  };

  const handleConfirmOrder = () => {
    if (!isPaymentReady() || isProcessing) return;
    setIsProcessing(true);
    setTimeout(() => {
      // 1. Process Sale
      const methodLabel = {
        cash: 'Cash',
        online: 'Online/UPI',
        udhaar: 'Udhaar (Credit)'
      }[paymentMethod] || 'Cash';

      const saleRecord = {
        id: 's_' + Date.now(),
        customerName: customer ? customer.name : 'Walk-in Customer',
        customerPhone: customer ? customer.phone : '',
        items: cartItems.map(i => i.name).join(', '),
        cartItems: cartItems,
        subtotal: subtotal,
        discount: discountAmt,
        date: new Date().toISOString(),
        amount: finalAmount,
        method: methodLabel
      };

      // 2. Update Sales
      let sales = [];
      try { sales = JSON.parse(localStorage.getItem('vendor_sales') || '[]'); } catch(e){}
      localStorage.setItem('vendor_sales', JSON.stringify([saleRecord, ...sales]));

      // 3. Update Udhaar if applicable
      if (paymentMethod === 'udhaar' && customer) {
        let customers = [];
        try { customers = JSON.parse(localStorage.getItem('vendor_customers') || '[]'); } catch(e){}
        const updatedCustomers = customers.map(c => {
          if (c.id === customer.id) {
            return { ...c, udhaarBalance: (c.udhaarBalance || 0) + finalAmount };
          }
          return c;
        });
        // If customer was newly created, add them
        if (!updatedCustomers.find(c => c.id === customer.id)) {
          updatedCustomers.push({ ...customer, udhaarBalance: finalAmount });
        }
        localStorage.setItem('vendor_customers', JSON.stringify(updatedCustomers));
      }

      // 4. Update Inventory Stock (optional logic to decrement)
      let products = [];
      try { products = JSON.parse(localStorage.getItem('vendor_products') || '[]'); } catch(e){}
      const updatedProducts = products.map(p => {
        const cartItem = cartItems.find(ci => ci.id === p.id);
        if (cartItem) {
          // just an example structure if we had quantity, assuming 'In Stock'
          return { ...p, stock: 'In Stock' }; // simplified
        }
        return p;
      });
      localStorage.setItem('vendor_products', JSON.stringify(updatedProducts));

      navigate('/order-confirm', {
        replace: true,
        state: { paymentMethod: methodLabel, finalAmount, cartItems, customer, orderId: 'POS' + Date.now().toString().slice(-6) },
      });
    }, 1200);
  };

  const methods = [
    {
      id: 'cash',
      icon: <Banknote size={18} className="text-emerald-600" />,
      label: 'Cash Payment',
      subtitle: 'Customer pays offline',
      badge: <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md tracking-tight">Offline</span>,
    },
    {
      id: 'online',
      icon: <CreditCard size={18} className="text-blue-600" />,
      label: 'Online / UPI',
      subtitle: 'Google Pay, PhonePe, Card',
      badge: <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md tracking-tight">Digital</span>,
    },
    {
      id: 'udhaar',
      icon: <BookOpen size={18} className="text-amber-600" />,
      label: 'Udhaar (Credit Khata)',
      subtitle: 'Add to customer\'s pending balance',
      badge: <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-md tracking-tight">Khata</span>,
    }
  ];

  return (
    <div className="min-h-screen font-outfit bg-gray-50/50">
      <header className="px-5 py-4 flex items-center justify-between gap-4 sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-50 transition-colors text-gray-500 hover:text-[#00693B] cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2.5">
            <h1 className="text-base font-black text-gray-900 m-0 leading-tight font-inter">Record Payment</h1>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#00693B]">
          <Lock size={12} /> POS Checkout
        </div>
      </header>

      <div className="max-w-[600px] mx-auto px-4 py-6 flex flex-col gap-4">

        {/* Customer Details */}
        {customer && (
          <div className="bg-white rounded-2xl p-4 border border-gray-200/70 flex items-start gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <span className="font-bold text-sm">{customer.name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Customer</p>
              <p className="text-sm font-bold text-gray-900">{customer.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{customer.phone}</p>
              {customer.udhaarBalance > 0 && (
                <p className="text-[10px] font-bold text-amber-600 mt-1 bg-amber-50 inline-block px-2 py-0.5 rounded">
                  Current Udhaar: ₹{customer.udhaarBalance.toLocaleString('en-IN')}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Amount Summary */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500 font-semibold">Subtotal</span>
            <span className="text-sm font-bold text-gray-800">₹ {subtotal.toLocaleString('en-IN')}</span>
          </div>
          {discountAmt > 0 && (
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold flex items-center gap-1.5 text-emerald-600">
                <Tag size={14} /> Discount Applied
              </span>
              <span className="text-sm font-bold text-emerald-600">- ₹ {discountAmt.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount to Collect</p>
              <p className="text-3xl font-black text-[#111827] font-inter mt-1">₹{finalAmount.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-lg">{(cartItems || []).length} items</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-sm font-black text-gray-800 font-inter">Payment Method</h2>
          </div>
          <div className="flex flex-col divide-y divide-gray-100">
            {methods.map((m) => (
              <label
                key={m.id}
                htmlFor={`pay-${m.id}`}
                className={`flex items-center justify-between px-4 py-3.5 cursor-pointer transition-colors ${
                  paymentMethod === m.id ? 'bg-[#F5F7E9]' : 'hover:bg-gray-50'
                } ${m.id === 'udhaar' && !customer ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    id={`pay-${m.id}`}
                    type="radio"
                    name="payment"
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                    disabled={m.id === 'udhaar' && !customer}
                    className="accent-[#00693B] w-4 h-4 shrink-0"
                  />
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    paymentMethod === m.id ? 'bg-emerald-100/60' : 'bg-gray-50'
                  }`}>
                    {m.icon}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${paymentMethod === m.id ? 'text-[#00693B]' : 'text-gray-800'}`}>
                      {m.label} {m.id === 'udhaar' && !customer && '(Requires Customer)'}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{m.subtitle}</p>
                  </div>
                </div>
                {m.badge}
              </label>
            ))}
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium py-2">
          <ShieldCheck size={13} className="text-[#00693B]" />
          Sales recorded instantly to ledger
        </div>

        {/* Pay Button */}
        <button
          onClick={handleConfirmOrder}
          disabled={!isPaymentReady() || isProcessing}
          className={`w-full py-4 rounded-2xl font-bold font-outfit text-sm transition-all flex items-center justify-center gap-2 mb-6 shadow-md ${
            isPaymentReady() && !isProcessing
              ? 'bg-[#00693B] text-white hover:bg-[#004d2b] cursor-pointer active:scale-95 shadow-[#00693B]/20'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 shadow-none'
          }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Recording Sale…
            </>
          ) : (
            <>
              {paymentMethod === 'udhaar' ? 'Add to Khata' : 'Complete Sale'} (₹{finalAmount.toLocaleString('en-IN')})
            </>
          )}
        </button>

      </div>
    </div>
  );
};

export default PaymentScreen;
