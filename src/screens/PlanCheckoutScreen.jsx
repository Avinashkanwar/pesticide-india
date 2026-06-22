import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';

const PlanCheckoutScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Fallback if accessed directly
  const planData = location.state || { plan: 'Quarterly Plan', price: 99, duration: '3 months' };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      navigate('/plan-success', { state: planData });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-outfit py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-[#00693B] px-8 py-10 text-center text-white">
            <h1 className="text-3xl font-black font-inter mb-2">Complete Checkout</h1>
            <p className="text-emerald-100 font-medium">You are subscribing to PesticideIndia</p>
          </div>

          {/* Order Summary */}
          <div className="px-8 py-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{planData.plan}</h3>
                  <p className="text-sm text-gray-500 font-medium">Billed every {planData.duration}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#00693B]">
                    {planData.price === 0 ? 'Free' : `₹${planData.price}`}
                  </span>
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <CheckCircle2 size={16} className="text-[#00693B]" /> Access to all core features
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <CheckCircle2 size={16} className="text-[#00693B]" /> Free setup & onboarding
                </li>
              </ul>
            </div>

            {/* Payment Section */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h2>
              <div className="border border-[#00693B] bg-emerald-50 rounded-2xl p-4 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <CreditCard size={20} className="text-[#00693B]" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">UPI / Credit Card / Net Banking</p>
                    <p className="text-xs text-gray-500 font-medium">Razorpay Secure Checkout</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border-4 border-[#00693B] bg-white"></div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all shadow-lg flex items-center justify-center gap-2
                ${isProcessing 
                  ? 'bg-[#004d2b] shadow-[#00693B]/20 cursor-wait' 
                  : 'bg-[#00693B] hover:bg-[#004d2b] shadow-[#00693B]/30 hover:-translate-y-0.5'
                }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShieldCheck size={20} />
                  {planData.price === 0 ? 'Start Free Trial' : `Pay ₹${planData.price} Securely`}
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-6 font-medium flex items-center justify-center gap-1">
              <Lock size={12} /> SSL Secured Payment Gateway
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCheckoutScreen;
