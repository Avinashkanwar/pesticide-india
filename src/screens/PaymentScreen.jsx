import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock, CreditCard, Smartphone, Banknote, Wallet, CheckCircle2, ShieldCheck } from 'lucide-react';
import { clearCart } from '../utils/cartHelper';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('gpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const { finalAmount = 0, cartItems = [], address = {}, discountSavings = 0 } = orderData;

  const isPaymentReady = () => {
    return ['gpay', 'phonepe', 'paytm'].includes(paymentMethod);
  };

  const handleConfirmOrder = () => {
    if (!isPaymentReady() || isProcessing) return;
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      const methodLabel = {
        gpay: 'Google Pay',
        phonepe: 'PhonePe',
        paytm: 'Paytm'
      }[paymentMethod] || 'Google Pay';

      navigate('/order-confirm', {
        replace: true,
        state: { paymentMethod: methodLabel, finalAmount, cartItems, address, orderId: 'PI' + Date.now().toString().slice(-8) },
      });
    }, 1600);
  };

  const methods = [
    {
      id: 'gpay',
      icon: <Smartphone size={18} className="text-blue-500" />,
      label: 'Google Pay',
      subtitle: 'Pay securely using Google Pay UPI',
      badge: (
        <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-md tracking-tighter flex items-center gap-0.5">
          <span className="text-blue-400">G</span><span className="text-red-400">o</span>
          <span className="text-yellow-400">o</span><span className="text-blue-400">g</span>
          <span className="text-green-400">l</span><span className="text-red-400">e</span>
          <span className="ml-0.5 text-white">Pay</span>
        </span>
      ),
    },
    {
      id: 'phonepe',
      icon: <Smartphone size={18} className="text-purple-600" />,
      label: 'PhonePe',
      subtitle: 'Pay directly via PhonePe app',
      badge: (
        <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-tight">
          PhonePe
        </span>
      ),
    },
    {
      id: 'paytm',
      icon: <Smartphone size={18} className="text-sky-500" />,
      label: 'Paytm',
      subtitle: 'Pay using Paytm Wallet or UPI',
      badge: (
        <span className="bg-[#002970] text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-tight flex items-center">
          pay<span className="text-[#00baf2] font-black">tm</span>
        </span>
      ),
    }
  ];

  return (
    <div className="min-h-screen font-outfit">
      {/* Header — matches HomeScreen style */}
      <header className="px-5 py-4 flex items-center justify-between gap-4 sticky top-0 z-50 bg-gray-100/70 backdrop-blur-xl border-b border-gray-200/60">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-white/70 transition-colors text-gray-500 hover:text-[#00693B] cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#00693B] rounded-xl flex items-center justify-center text-white font-black text-sm font-inter">PI</div>
            <div>
              <h1 className="text-base font-black text-[#111827] m-0 leading-tight font-inter">
                Pesticide<span className="text-[#00693B]">India</span>
              </h1>
              <p className="text-[10px] font-semibold text-gray-400 m-0 uppercase tracking-widest">Payment</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#00693B]">
          <Lock size={12} />
          Secure Checkout
        </div>
      </header>

      <div className="max-w-[600px] mx-auto px-4 py-5 flex flex-col gap-4">

        {/* Amount Summary */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/70 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount to Pay</p>
            <p className="text-2xl font-black text-[#111827] font-inter mt-0.5">₹{finalAmount.toLocaleString('en-IN')}</p>
            {discountSavings > 0 && (
              <p className="text-[11px] text-[#00693B] font-bold mt-0.5">You save ₹{discountSavings.toLocaleString('en-IN')}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-[11px] text-gray-400 font-medium">{(cartItems || []).length} item{(cartItems || []).length !== 1 ? 's' : ''}</p>
            {address?.city && <p className="text-[11px] font-semibold text-gray-600 mt-0.5">→ {address.city}</p>}
          </div>
        </div>

        {/* Delivery Address */}
        {address?.fullName && (
          <div className="bg-white rounded-2xl p-4 border border-gray-200/70 flex items-start gap-3">
            <CheckCircle2 size={16} className="text-[#00693B] mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Delivering to</p>
              <p className="text-sm font-bold text-gray-900">{address.fullName}</p>
              <p className="text-xs text-gray-500 mt-0.5">{address.streetAddress}, {address.city} – {address.pinCode}</p>
              <p className="text-xs text-gray-400">{address.phone}</p>
            </div>
          </div>
        )}

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-black text-gray-800 font-inter">Choose Payment Method</h2>
          </div>
          <div className="flex flex-col divide-y divide-gray-100">
            {methods.map((m) => (
              <label
                key={m.id}
                htmlFor={`pay-${m.id}`}
                className={`flex items-center justify-between px-4 py-3.5 cursor-pointer transition-colors ${
                  paymentMethod === m.id ? 'bg-[#F5F7E9]' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    id={`pay-${m.id}`}
                    type="radio"
                    name="payment"
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                    className="accent-[#00693B] w-4 h-4 shrink-0"
                  />
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    paymentMethod === m.id ? 'bg-emerald-100/60' : 'bg-gray-50'
                  }`}>
                    {m.icon}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${paymentMethod === m.id ? 'text-[#00693B]' : 'text-gray-800'}`}>{m.label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{m.subtitle}</p>
                  </div>
                </div>
                {m.badge}
              </label>
            ))}
          </div>
        </div>



        {/* Security note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
          <ShieldCheck size={13} className="text-[#00693B]" />
          256-bit SSL encrypted · 100% safe & secure
        </div>

        {/* Pay Button */}
        <button
          onClick={handleConfirmOrder}
          disabled={!isPaymentReady() || isProcessing}
          className={`w-full py-4 rounded-2xl font-bold font-outfit text-sm transition-all flex items-center justify-center gap-2 mb-6 ${
            isPaymentReady() && !isProcessing
              ? 'bg-[#00693B] text-white hover:bg-[#004d2b] cursor-pointer active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing…
            </>
          ) : (
            <>
              <Lock size={15} />
              Pay ₹{finalAmount.toLocaleString('en-IN')}
            </>
          )}
        </button>

      </div>
    </div>
  );
};

export default PaymentScreen;
