import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Smartphone, Store, ArrowRight, CheckCircle2, Phone, Mail, TrendingUp, ChevronUp } from 'lucide-react';
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
              Pesticides<span className="text-[#00693B]">India</span>
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


      {/* Footer */}
      <footer className="relative bg-[#1A3A34] text-white overflow-hidden font-inter border-t-0 mt-20">
        {/* Abstract geometric lines background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <path d="M-200 600 L 720 0 L 1640 600" stroke="white" strokeWidth="1" />
            <path d="M400 600 L 1080 -100 L 1800 600" stroke="white" strokeWidth="1" />
            <path d="M 0 400 L 1440 200" stroke="white" strokeWidth="1" />
            <path d="M 720 0 L 1080 600" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 pt-20 pb-16 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
               <img src={logo} alt="Pesticide India" className="w-10 h-10 object-contain brightness-0 invert" style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(45%) saturate(836%) hue-rotate(345deg) brightness(97%) contrast(93%)' }} />
               <span className="text-2xl font-bold tracking-widest uppercase">Pesticides India</span>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
              Empowering agri-retailers with advanced multi-modal tools to improve business operations and customer outcomes.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-6 mb-12">
              <a href="#" className="text-white hover:text-[#DF9F42] transition-colors" aria-label="X (Twitter)">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                 </svg>
              </a>
              <a href="#" className="text-white hover:text-[#DF9F42] transition-colors" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#DF9F42] transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#DF9F42] transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>

            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-2.5 border border-white text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-white hover:text-[#1A3A34] transition-colors"
            >
              <ChevronUp size={16} /> Back to top
            </button>
          </div>

          {/* Middle Column - Site Map */}
          <div className="md:col-span-3 md:col-start-7 pt-4">
            <h4 className="text-white font-bold mb-6 text-sm">Site Map</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors underline decoration-white underline-offset-4">Homepage</a></li>
              <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Technology</a></li>
              <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Resources & news</a></li>
              <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Portal</a></li>
            </ul>
          </div>

          {/* Right Column - Legal */}
          <div className="md:col-span-3 pt-4">
            <h4 className="text-white font-bold mb-6 text-sm">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Terms of Services</a></li>
              <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Lawyer's Corners</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#E19D3B] py-3 text-center">
          <p className="text-[#1A3A34] text-xs font-medium">Copyright © 2024, pesticidesindia.com, All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen;
