import React, { useState } from 'react';
import DesktopSidebar from '../components/DesktopSidebar';
import MobileBottomNav from '../components/MobileBottomNav';
import TopNav from '../components/TopNav';
import { Calculator, Droplets, FlaskConical, Beaker } from 'lucide-react';

const DoseCalculatorScreen = () => {
  const [dosePerAcre, setDosePerAcre] = useState(200); // ml or grams
  const [waterPerAcre, setWaterPerAcre] = useState(150); // liters
  const [tankSize, setTankSize] = useState(15); // liters

  // Calculations
  // Dose per liter = dosePerAcre / waterPerAcre
  // Dose per tank = dose per liter * tankSize
  const dosePerLiter = waterPerAcre > 0 ? (dosePerAcre / waterPerAcre) : 0;
  const dosePerTank = dosePerLiter * tankSize;

  return (
    <div className="min-h-screen font-sans flex overflow-hidden" style={{background: 'transparent'}}>
      <DesktopSidebar />
      
      <div className="flex-1 ml-0 md:ml-24 flex flex-col min-w-0 h-screen overflow-y-auto pb-20 md:pb-10">
        <TopNav />
        {/* Header */}
        <header className="pt-8 pb-6 px-4 md:px-8 max-w-[1600px] w-full mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
              <Calculator size={24} className="text-[#00693B]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#00693B] tracking-tight">Dose Calculator</h1>
          </div>
          <p className="text-[#333333] font-medium">Calculate the exact amount of pesticide to mix per spray tank.</p>
        </header>

        <main className="max-w-[800px] mx-auto px-4 md:px-8 w-full flex-1 flex flex-col items-center justify-center">
          
          <div className="w-full bg-white border border-gray-100 rounded-[32px] shadow-[0_20px_40px_rgb(0,0,0,0.04)] p-6 md:p-10 relative overflow-hidden">
            
            {/* Decorative background circle */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gray-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              
              {/* Inputs */}
              <div className="flex flex-col gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-[#00693B] mb-3">
                    <FlaskConical size={16} className="text-[#00693B]" />
                    Recommended Dose (per Acre)
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="0"
                      value={dosePerAcre}
                      onChange={(e) => setDosePerAcre(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 pr-16 text-xl font-bold text-[#00693B] focus:outline-none focus:ring-2 focus:ring-gray-400/20 focus:border-[#FEB600] transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-[#333333]">ml/g</div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-[#00693B] mb-3">
                    <Droplets size={16} className="text-[#00693B]" />
                    Water Volume (per Acre)
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="1"
                      value={waterPerAcre}
                      onChange={(e) => setWaterPerAcre(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 pr-16 text-xl font-bold text-[#00693B] focus:outline-none focus:ring-2 focus:ring-gray-400/20 focus:border-[#FEB600] transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-[#333333]">Liters</div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-[#00693B] mb-3">
                    <Beaker size={16} className="text-[#00693B]" />
                    Your Spray Tank Size
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="1"
                      value={tankSize}
                      onChange={(e) => setTankSize(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 pr-16 text-xl font-bold text-[#00693B] focus:outline-none focus:ring-2 focus:ring-gray-400/20 focus:border-[#FEB600] transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-[#333333]">Liters</div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="flex flex-col justify-center">
                <div className="bg-[#FEB600] rounded-[28px] p-8 text-white shadow-xl shadow-gray-900/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-full pointer-events-none"></div>
                  
                  <h3 className="text-sm font-bold text-[#333333] uppercase tracking-widest mb-6">Mix Required</h3>
                  
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-extrabold tracking-tighter">{dosePerTank.toFixed(1)}</span>
                      <span className="text-2xl font-semibold text-[#333333]">ml/g</span>
                    </div>
                    <p className="text-sm font-medium text-[#333333] mt-2">per {tankSize}L spray tank</p>
                  </div>

                  <div className="pt-6 border-t border-[#FEB600]/50">
                    <p className="text-sm font-medium text-[#333333] flex items-center justify-between">
                      <span>Concentration:</span>
                      <span className="font-bold text-white">{dosePerLiter.toFixed(2)} ml/L</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default DoseCalculatorScreen;
