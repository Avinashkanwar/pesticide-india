import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, User, Phone, MapPin, FileText, CheckCircle2 } from 'lucide-react';

const DealerSetupScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    mobile: '',
    address: '',
    gst: '',
    license: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call to save vendor details
    setTimeout(() => {
      // Mark setup as complete
      localStorage.setItem('isSetupComplete', 'true');
      localStorage.setItem('vendor_profile', JSON.stringify(formData));
      navigate('/vendor');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-outfit py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#00693B] rounded-2xl flex items-center justify-center shadow-lg shadow-[#00693B]/20 mx-auto mb-6">
            <span className="text-white font-black text-2xl font-inter tracking-tighter">PI</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 font-inter mb-2">Setup Your Store</h1>
          <p className="text-gray-500 font-medium">Just a few details to personalize your billing and dashboard.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Required Fields */}
              <div className="space-y-6 md:col-span-2">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Basic Details <span className="text-red-500">*</span></h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Store size={16} className="text-[#00693B]" /> Shop Name
                    </label>
                    <input
                      type="text"
                      name="shopName"
                      required
                      value={formData.shopName}
                      onChange={handleChange}
                      placeholder="e.g. Kisan Krishi Kendra"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 focus:border-[#00693B] font-medium text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <User size={16} className="text-[#00693B]" /> Owner Name
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      required
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 focus:border-[#00693B] font-medium text-gray-900"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Phone size={16} className="text-[#00693B]" /> Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 focus:border-[#00693B] font-medium text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Fields */}
              <div className="space-y-6 md:col-span-2 mt-4">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Business Information <span className="text-gray-400 text-sm font-medium ml-2">(Optional)</span></h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" /> Shop Address
                    </label>
                    <textarea
                      name="address"
                      rows="2"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Full shop address for invoices"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 focus:border-[#00693B] font-medium text-gray-900 resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" /> GST Number
                    </label>
                    <input
                      type="text"
                      name="gst"
                      value={formData.gst}
                      onChange={handleChange}
                      placeholder="22AAAAA0000A1Z5"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 focus:border-[#00693B] font-medium text-gray-900 uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-gray-400" /> License Number
                    </label>
                    <input
                      type="text"
                      name="license"
                      value={formData.license}
                      onChange={handleChange}
                      placeholder="Pesticide License No."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00693B]/20 focus:border-[#00693B] font-medium text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all flex items-center justify-center gap-2
                  ${isSubmitting 
                    ? 'bg-[#004d2b] cursor-wait' 
                    : 'bg-[#00693B] hover:bg-[#004d2b] shadow-lg shadow-[#00693B]/20 hover:-translate-y-0.5'
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving Details...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={20} /> Complete Setup & Go to Dashboard
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default DealerSetupScreen;
