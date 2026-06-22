import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    // Simulate login by setting a dummy token in localStorage
    localStorage.setItem('token', 'dummy_token');
    
    // If user arrived from choosing a plan on Landing page, send them to checkout
    if (location.state && location.state.plan) {
      localStorage.setItem('isDemo', 'false');
      navigate('/plan-checkout', { state: location.state });
    } else {
      // Otherwise, normal login goes to demo dashboard
      localStorage.setItem('isDemo', 'true');
      navigate('/vendor');
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#00693B] rounded-2xl shadow-lg shadow-[#00693B]/20 flex items-center justify-center">
            <span className="text-white font-black text-2xl font-inter tracking-tighter">PI</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black text-gray-900 font-inter">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 font-medium">
          Sign in to your PesticideIndia Vendor Account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-12 px-4 shadow-xl shadow-gray-200/50 sm:rounded-3xl sm:px-10 border border-gray-100 text-center">
          
          <button
            onClick={handleGoogleLogin}
            className="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-sm"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
            Login with Google
          </button>
          
          <p className="mt-6 text-xs text-gray-400 font-medium">
            By logging in, you agree to our Terms of Service and Privacy Policy.
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
