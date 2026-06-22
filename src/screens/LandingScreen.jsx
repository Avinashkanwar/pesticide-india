import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, TrendingUp, Users, Smartphone, Store, ArrowRight, CheckCircle2 } from 'lucide-react';

const LandingScreen = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <div className="min-h-screen bg-gray-50 font-outfit selection:bg-[#00693B] selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-10 h-10 bg-[#00693B] rounded-xl flex items-center justify-center shadow-lg shadow-[#00693B]/20">
                <span className="text-white font-black text-xl font-inter tracking-tighter">PI</span>
              </div>
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-4 md:pt-28 md:pb-6 px-4 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-[#00693B]/5 rounded-full blur-3xl" />
          <div className="absolute top-40 -right-20 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-[#00693B] text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00693B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00693B]"></span>
            </span>
            #1 Agri-Vendor Platform in India
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.2] mb-6 font-inter max-w-4xl mx-auto">
            Manage Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00693B] to-emerald-500">Pesticides, Fertilizers & Sprayers</span> Business
          </h1>
          
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
            Replace your physical ledger with a smart digital dashboard. Manage your daily sales, track product inventory, and handle customer Udhaar accounts all from one place.
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
      <section className="pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Basic Trial</h3>
              <p className="text-xs text-gray-500 font-medium mb-4">Perfect to test the waters and see how our POS works for your store.</p>
              <div className="mb-4">
                <span className="text-3xl font-black text-gray-900">Free</span>
                <span className="text-xs text-gray-500 font-medium"> / 1 month</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                <li className="flex items-center gap-2 text-xs text-gray-700 font-medium"><CheckCircle2 size={14} className="text-[#00693B]" /> Full POS Access</li>
                <li className="flex items-center gap-2 text-xs text-gray-700 font-medium"><CheckCircle2 size={14} className="text-[#00693B]" /> Basic Analytics</li>
                <li className="flex items-center gap-2 text-xs text-gray-700 font-medium"><CheckCircle2 size={14} className="text-[#00693B]" /> Up to 50 Products</li>
              </ul>
              <button onClick={() => navigate('/login', { state: { plan: 'Basic Trial', price: 0, duration: '1 month' } })} className="w-full py-2.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">Start Free Trial</button>
            </div>

            {/* 3 Months Tier */}
            <div className="bg-white p-6 rounded-2xl border-2 border-[#00693B] flex flex-col relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00693B] text-white text-[9px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                Most Popular
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Quarterly Plan</h3>
              <p className="text-xs text-gray-500 font-medium mb-4">Ideal for seasonal businesses needing full management tools.</p>
              <div className="mb-4">
                <span className="text-3xl font-black text-gray-900">₹99</span>
                <span className="text-xs text-gray-500 font-medium"> / 3 months</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                <li className="flex items-center gap-2 text-xs text-gray-700 font-medium"><CheckCircle2 size={14} className="text-[#00693B]" /> Everything in Basic</li>
                <li className="flex items-center gap-2 text-xs text-gray-700 font-medium"><CheckCircle2 size={14} className="text-[#00693B]" /> Unlimited Products</li>
                <li className="flex items-center gap-2 text-xs text-gray-700 font-medium"><CheckCircle2 size={14} className="text-[#00693B]" /> WhatsApp Reminders</li>
                <li className="flex items-center gap-2 text-xs text-gray-700 font-medium"><CheckCircle2 size={14} className="text-[#00693B]" /> Udhaar Khata</li>
              </ul>
              <button onClick={() => navigate('/login', { state: { plan: 'Quarterly Plan', price: 99, duration: '3 months' } })} className="w-full py-2.5 bg-[#00693B] text-white rounded-lg font-bold text-sm hover:bg-[#004d2b] transition-colors">Choose Quarterly</button>
            </div>

            {/* 1 Year Tier */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Annual Pro</h3>
              <p className="text-xs text-gray-500 font-medium mb-4">The ultimate package for serious retailers who want peace of mind.</p>
              <div className="mb-4">
                <span className="text-3xl font-black text-gray-900">₹500</span>
                <span className="text-xs text-gray-500 font-medium"> / 1 year</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                <li className="flex items-center gap-2 text-xs text-gray-700 font-medium"><CheckCircle2 size={14} className="text-[#00693B]" /> Everything in Quarterly</li>
                <li className="flex items-center gap-2 text-xs text-gray-700 font-medium"><CheckCircle2 size={14} className="text-[#00693B]" /> Priority Support</li>
                <li className="flex items-center gap-2 text-xs text-gray-700 font-medium"><CheckCircle2 size={14} className="text-[#00693B]" /> Advanced Tally Export</li>
                <li className="flex items-center gap-2 text-xs text-gray-700 font-medium"><CheckCircle2 size={14} className="text-[#00693B]" /> Save ₹150 yearly</li>
              </ul>
              <button onClick={() => navigate('/login', { state: { plan: 'Annual Pro', price: 500, duration: '1 year' } })} className="w-full py-2.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">Choose Annual</button>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 font-inter mb-4">Core Features</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">Everything you need to digitize your agri-input store.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <Store size={24} />, title: "Lightning POS", desc: "Checkout customers in seconds with built-in product catalogs." },
              { icon: <Users size={24} />, title: "Udhaar Khata", desc: "Manage credit effectively and view customer balance histories." },
              { icon: <Smartphone size={24} />, title: "WhatsApp Reminders", desc: "Send automated payment reminders to debtors with one click." },
              { icon: <ShieldCheck size={24} />, title: "Tally Invoices", desc: "Generate professional A4 tax invoices ready for GST filing." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:bg-emerald-50 transition-colors">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#00693B] shadow-sm mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-xs text-gray-500 font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 font-inter mb-4">Why Choose PesticideIndia?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Save 2 Hours Daily", desc: "Automate your daily accounting, avoid manual calculation errors, and spend more time growing your business." },
              { title: "Zero Udhaar Loss", desc: "Never forget a pending payment again. Real-time tracking ensures every rupee is accounted for." },
              { title: "Look Professional", desc: "Impress your farmers with clean, printed invoices and instant WhatsApp digital receipts." }
            ].map((benefit, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-[#00693B]/10 rounded-full flex items-center justify-center text-[#00693B] mb-4">
                  <span className="font-black">{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-200 text-center text-gray-400 font-medium text-sm">
        <p>© 2026 PesticideIndia. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingScreen;
