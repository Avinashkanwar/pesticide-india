import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Bot, Scale, Store, PackageSearch } from 'lucide-react';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route) => {
    if (route === 'home' && path === '/') return true;
    if (path.startsWith(`/${route}`)) return true;
    return false;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full glass-panel border-t border-gray-200 flex justify-around items-center py-2 px-4 z-50 pb-safe">
      <NavItem 
        icon={<Store />} 
        label="Dashboard" 
        isActive={isActive('vendor')} 
        onClick={() => navigate('/vendor')} 
      />
      <NavItem 
        icon={<Bot />} 
        label="AI Assist" 
        isActive={isActive('home')} 
        onClick={() => navigate('/')} 
      />
      <NavItem 
        icon={<PackageSearch />} 
        label="Products" 
        isActive={isActive('products')} 
        onClick={() => navigate('/products')} 
      />
      <NavItem 
        icon={<Scale />} 
        label="Compare" 
        isActive={isActive('compare')} 
        onClick={() => navigate('/compare')} 
      />

    </div>
  );
};

const NavItem = ({ icon, label, isActive, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 gap-1 border-none bg-transparent ${isActive ? 'text-[#00693B]' : 'text-gray-400'}`}
    >
      {React.cloneElement(icon, { size: 20, strokeWidth: isActive ? 2.5 : 2 })}
      <span className={`text-[10px] font-outfit ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
    </button>
  );
};

export default MobileBottomNav;
