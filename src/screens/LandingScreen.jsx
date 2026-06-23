import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Smartphone, Store, ArrowRight, CheckCircle2, Phone, Mail, TrendingUp } from 'lucide-react';
import logo from '../assets/logo.png';
import dashboardMockup from '../assets/dashboard_mockup.png';
import chartsMockup from '../assets/charts_mockup.png';

const LandingScreen = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const [isDemoActive, setIsDemoActive] = useState(false);

  return (
    <div className="min-h-screen font-outfit" style={{ background: '#F8FAF9' }}>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#F8FAF9]/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <img src={logo} alt="Pesticide India Logo" className="w-12 h-12 object-contain" />
            <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tight font-inter">
              Pesticide<span className="text-[#00693B]">India</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button 
                onClick={() => navigate('/vendor')}
                className="px-6 py-2.5 bg-[#00693B] text-white rounded-full font-bold text-sm hover:bg-[#004d2b] transition-colors shadow-lg shadow-[#00693B]/20 flex items-center gap-2"
              >
                Dashboard <ArrowRight size={16} />
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="text-gray-600 hover:text-gray-900 font-bold text-sm transition-colors">
                  Login
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-6 py-2.5 bg-[#00693B] text-white rounded-full font-bold text-sm hover:bg-[#004d2b] transition-colors shadow-lg shadow-[#00693B]/20"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-4 md:pt-28 md:pb-6 px-4 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-[#00693B]/5 rounded-full blur-3xl" />
          <div className="absolute top-40 -right-20 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.2] mb-6 font-inter max-w-4xl mx-auto">
            Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00693B] to-emerald-500">Pesticides, Fertilizers & Inventory</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
            Ditch the paper ledger. Manage sales, track inventory, and handle Udhaar accounts from one smart dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate(isAuthenticated ? '/vendor' : '/login')}
              className="w-full sm:w-auto px-8 py-3 bg-[#00693B] text-white rounded-full font-bold text-sm hover:bg-[#004d2b] transition-colors flex items-center justify-center gap-2"
            >
              Start Selling Now <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Store size={16} /> Watch Demo
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm font-semibold text-gray-400">
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[#00693B]" /> No Credit Card Required</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[#00693B]" /> 100% Free Setup</div>
          </div>
        </div>
      </section>

      {/* 
        Features Grid removed to keep the landing page short and sweet.
      */}      {/* Pricing Section */}
      <section className="py-20 relative z-10 bg-[#F8FAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side text details */}
            <div className="lg:col-span-5 flex flex-col">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 font-inter leading-tight mb-6">
                Simple, transparent pricing
              </h2>
              <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8">
                Choose the plan that best fits your business needs. Upgrade anytime as your store grows. No hidden fees, no complicated contracts.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-base font-bold text-gray-800">
                  <CheckCircle2 size={20} className="text-[#00693B]" /> 14-day money-back guarantee
                </li>
                <li className="flex items-center gap-3 text-base font-bold text-gray-800">
                  <CheckCircle2 size={20} className="text-[#00693B]" /> Cancel anytime online
                </li>
                <li className="flex items-center gap-3 text-base font-bold text-gray-800">
                  <CheckCircle2 size={20} className="text-[#00693B]" /> Priority WhatsApp Support
                </li>
              </ul>
            </div>

            {/* Right side: Pricing Cards */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Free Tier */}
              <div className="bg-white p-8 rounded-3xl border border-gray-200 flex flex-col hover:shadow-xl transition-shadow h-full relative">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Basic Trial</h3>
                <p className="text-sm text-gray-500 font-medium mb-6">Perfect to test the waters and see how our POS works for your store.</p>
                <div className="mb-8">
                  <span className="text-4xl font-black text-gray-900">Free</span>
                  <span className="text-sm text-gray-500 font-medium ml-1">/ 6 months</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-sm text-gray-700 font-bold"><CheckCircle2 size={16} className="text-[#00693B]" /> Full POS Access</li>
                  <li className="flex items-center gap-3 text-sm text-gray-700 font-bold"><CheckCircle2 size={16} className="text-[#00693B]" /> Unlimited Products</li>
                  <li className="flex items-center gap-3 text-sm text-gray-700 font-bold"><CheckCircle2 size={16} className="text-[#00693B]" /> WhatsApp Reminders</li>
                  <li className="flex items-center gap-3 text-sm text-gray-700 font-bold"><CheckCircle2 size={16} className="text-[#00693B]" /> Udhaar Khata</li>
                </ul>
                <button onClick={() => navigate('/login', { state: { plan: 'Basic Trial', price: 0, duration: '6 months' } })} className="w-full py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors mt-auto">Start Free Trial</button>
              </div>

              {/* 1 Year Tier */}
              <div className="bg-white p-8 rounded-3xl border-2 border-[#00693B] flex flex-col relative shadow-2xl shadow-[#00693B]/10 hover:shadow-[#00693B]/20 transition-shadow transform md:-translate-y-4 h-full mt-6 sm:mt-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00693B] text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Annual Pro</h3>
                <p className="text-sm text-gray-500 font-medium mb-6">The ultimate package for serious retailers who want peace of mind.</p>
                <div className="mb-8">
                  <span className="text-4xl font-black text-gray-900">₹99</span>
                  <span className="text-sm text-gray-500 font-medium ml-1">/ 1 year</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-sm text-gray-700 font-bold"><CheckCircle2 size={16} className="text-[#00693B]" /> Everything in Basic</li>
                  <li className="flex items-center gap-3 text-sm text-gray-700 font-bold"><CheckCircle2 size={16} className="text-[#00693B]" /> Unlimited Products</li>
                  <li className="flex items-center gap-3 text-sm text-gray-700 font-bold"><CheckCircle2 size={16} className="text-[#00693B]" /> WhatsApp Reminders</li>
                  <li className="flex items-center gap-3 text-sm text-gray-700 font-bold"><CheckCircle2 size={16} className="text-[#00693B]" /> Udhaar Khata</li>
                </ul>
                <button onClick={() => {
                  localStorage.setItem('token', 'dummy_token');
                  localStorage.setItem('isDemo', 'false');
                  navigate('/vendor');
                }} className="w-full py-3 bg-[#00693B] text-white rounded-xl font-bold text-sm hover:bg-[#004d2b] transition-colors shadow-lg shadow-[#00693B]/30 mt-auto">Choose Annual</button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Features Showcase */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 font-inter mb-6">Built for Modern Agri-Retail</h2>
            <p className="text-lg text-gray-500 font-medium max-w-3xl mx-auto">Stop wasting time on paper ledgers. Our platform provides an intuitive dashboard and powerful analytics to manage your business efficiently.</p>
          </div>

          {/* Block 1: Dashboard Image Left, Text Right */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24">
            <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl shadow-[#00693B]/10 border border-gray-100 group relative">
               <img src={dashboardMockup} alt="Vendor Dashboard Mockup" className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700" />
            </div>
            
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#00693B] mb-2 shadow-sm border border-emerald-100">
                <Store size={28} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 font-inter">Complete Store Control</h3>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Experience a centralized dashboard where you can process sales instantly, track low-stock inventory, and monitor your Udhaar Khata. It's clean, lightning-fast, and designed specifically for pesticide and fertilizer retailers.
              </p>
              <ul className="space-y-4 mt-2">
                {['Instant POS Checkout', 'Automated Udhaar Tracking', 'WhatsApp Integration'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <CheckCircle2 size={20} className="text-[#00693B]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Block 2: Text Left, Charts Image Right */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/10 border border-gray-100 group relative">
               <img src={chartsMockup} alt="Analytics Charts Mockup" className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700" />
            </div>
            
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-2 shadow-sm border border-amber-100">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 font-inter">Yearly & Monthly Tracking</h3>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Never guess your profits again. Visualize your revenue growth and identify your top-selling products through beautifully designed interactive charts that track every transaction month-over-month.
              </p>
              <ul className="space-y-4 mt-2">
                {['Visual Revenue Trends', 'Top Selling Products Analytics', 'Detailed Exportable Reports'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <CheckCircle2 size={20} className="text-amber-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>



      {/* Contact Section */}
      <section className="py-24 bg-[#F8FAF9] border-t border-gray-200/60">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 font-inter mb-4">Need Help Getting Started?</h2>
          <p className="text-gray-500 font-medium mb-8 text-lg">Our team is always available to answer your questions.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-700 hover:text-[#00693B] transition-colors font-bold text-base group cursor-pointer">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 group-hover:border-[#00693B] transition-colors">
                <Phone size={18} className="text-[#00693B]" />
              </div>
              +91 98765 43210
            </a>
            
            <a href="mailto:support@pesticideindia.com" className="flex items-center gap-3 text-gray-700 hover:text-[#00693B] transition-colors font-bold text-base group cursor-pointer">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 group-hover:border-[#00693B] transition-colors">
                <Mail size={18} className="text-[#00693B]" />
              </div>
              support@pesticideindia.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 font-medium text-sm">
        <p>© 2026 PesticideIndia. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingScreen;
