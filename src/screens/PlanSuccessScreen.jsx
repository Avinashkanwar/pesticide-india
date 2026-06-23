import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, CalendarDays, Rocket } from 'lucide-react';

const PlanSuccessScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fallback if accessed directly
  const planData = location.state || { plan: 'Quarterly Plan', price: 99, duration: '3 months' };

  // Calculate Next Renewal Date
  const getNextRenewalDate = () => {
    const date = new Date();
    if (planData.duration.includes('month')) {
      const months = parseInt(planData.duration) || 1;
      date.setMonth(date.getMonth() + months);
    } else if (planData.duration.includes('year')) {
      date.setFullYear(date.getFullYear() + 1);
    }
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleContinue = () => {
    // Navigate to Dealer Setup since it's the first time
    navigate('/setup');
  };

  return (
    <div className="min-h-screen bg-transparent font-outfit py-12 px-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 text-center animate-fade-in-up">
        
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-[#00693B]" />
        </div>

        <h1 className="text-3xl font-black text-gray-900 font-inter mb-2">Payment Successful!</h1>
        <p className="text-gray-500 font-medium mb-8">Welcome to the PesticideIndia family.</p>

        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-left mb-8 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <span className="text-gray-500 font-medium text-sm">Plan Details</span>
            <span className="font-bold text-gray-900 text-sm">
              {planData.plan} (₹{planData.price} / {planData.duration})
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium text-sm flex items-center gap-1.5">
              <CalendarDays size={16} /> Next Renewal
            </span>
            <span className="font-bold text-gray-900 text-sm">{getNextRenewalDate()}</span>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-4 bg-[#00693B] text-white rounded-xl font-bold text-lg hover:bg-[#004d2b] transition-colors flex items-center justify-center gap-3 shadow-sm"
        >
          <Rocket size={20} />
          Complete Store Setup
        </button>

        <p className="text-sm text-gray-400 font-medium mt-6 flex items-center justify-center gap-2">
          One last step to personalize your dashboard!
        </p>

      </div>
    </div>
  );
};

export default PlanSuccessScreen;
