import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login by setting a dummy token in localStorage
    localStorage.setItem('token', 'dummy_token');
    // Navigate to home (which is a private route)
    navigate('/');
  };

  return (
    <div className="min-h-screen font-sans flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{background: '#FFFFFF'}}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#FEB600] rounded-2xl shadow-lg flex items-center justify-center">
            <Leaf size={32} className="text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#00693B]">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-[#333333]">
          Welcome to the Precision Farming AI Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-3xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-bold text-[#00693B]">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-[#FEB600] sm:text-sm font-medium"
                  placeholder="admin@farming.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#00693B]">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-[#FEB600] sm:text-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#FEB600] hover:bg-[#FFF0A0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
