import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Bot, Scale, Store, PackageSearch, ShoppingCart, Package } from 'lucide-react';

const DesktopSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Determine active state based on path
  const isActive = (route) => {
    if (route === 'home' && path === '/') return true;
    if (path.startsWith(`/${route}`)) return true;
    return false;
  };

  return (
    <aside className="hidden md:flex h-screen w-24 flex-col justify-between items-center py-6 px-2 relative bg-transparent fixed left-0 top-0 z-50">
      
      {/* Logo Mark */}
      <div 
        onClick={() => navigate('/')}
        className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-xl bg-[#00693B] text-white font-bold text-xl shadow-lg shadow-[#00693B]/20 mb-6 hover:scale-105 transition-transform"
      >
        PI
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col items-center gap-6 mt-2">
        <SidebarButton 
          icon={<Store />} 
          isActive={isActive('vendor')} 
          onClick={() => navigate('/vendor')} 
          title="Vendor Dashboard" 
        />
        <SidebarButton 
          icon={<ShoppingCart />} 
          isActive={isActive('sale-now')} 
          onClick={() => navigate('/sale-now')} 
          title="Sale Now" 
        />
        <SidebarButton 
          icon={<Bot />} 
          isActive={isActive('ai')} 
          onClick={() => navigate('/ai')} 
          title="AI Assistant" 
        />
        <SidebarButton 
          icon={<Package />} 
          isActive={isActive('products')} 
          onClick={() => navigate('/products')} 
          title="All Products" 
        />


      </nav>

      {/* Footer Icons */}
      <div className="flex flex-col items-center gap-6 mt-auto">
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          className="w-10 h-10 rounded-full overflow-hidden shadow-sm hover:scale-105 transition-transform border border-gray-200" title="Logout"
        >
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </aside>
  );
};

const SidebarButton = ({ icon, isActive, onClick, title }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:ring-2 hover:ring-offset-2 hover:ring-[#00693B]/40 focus:outline-none ${
        isActive
          ? "bg-[#00693B] text-white shadow-md border border-[#00693B]"
          : "bg-white text-[#333333] border border-gray-100/50 hover:bg-gray-50 shadow-sm"
      }`}
    >
      {React.cloneElement(icon, {
        size: 20,
        strokeWidth: isActive ? 2.5 : 2,
      })}
    </button>
  );
};

export default DesktopSidebar;
