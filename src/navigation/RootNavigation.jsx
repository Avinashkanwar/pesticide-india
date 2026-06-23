import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Screens
import LandingScreen from '../screens/LandingScreen';
import AiScreen from '../screens/AiScreen';
import ProductScreen from '../screens/ProductScreen';
import SaleNowScreen from '../screens/SaleNowScreen';
import LoginScreen from '../screens/LoginScreen';
import PaymentScreen from '../screens/PaymentScreen';
import OrderConfirmScreen from '../screens/OrderConfirmScreen';
import InvoiceScreen from '../screens/InvoiceScreen';
import VendorDashboard from '../screens/VendorDashboard';
import TransactionsScreen from '../screens/TransactionsScreen';
import PlanCheckoutScreen from '../screens/PlanCheckoutScreen';
import PlanSuccessScreen from '../screens/PlanSuccessScreen';
import DealerSetupScreen from '../screens/DealerSetupScreen';

// Mock authentication check
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Private Route Wrapper
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Public Route Wrapper (redirects to home if already logged in)
const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/vendor" />;
};

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          } 
        />

        {/* Private Routes */}
        <Route 
          path="/" 
          element={
            <LandingScreen />
          } 
        />
        <Route 
          path="/ai" 
          element={
            <PrivateRoute>
              <AiScreen />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/products" 
          element={
            <PrivateRoute>
              <ProductScreen />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/sale-now" 
          element={
            <PrivateRoute>
              <SaleNowScreen />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/invoice/:id" 
          element={
            <PrivateRoute>
              <InvoiceScreen />
            </PrivateRoute>
          } 
        />


        <Route 
          path="/payment" 
          element={
            <PrivateRoute>
              <PaymentScreen />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/order-confirm" 
          element={
            <PrivateRoute>
              <OrderConfirmScreen />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/vendor" 
          element={
            <PrivateRoute>
              <VendorDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/transactions" 
          element={
            <PrivateRoute>
              <TransactionsScreen />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/plan-checkout" 
          element={<PlanCheckoutScreen />} 
        />
        <Route 
          path="/plan-success" 
          element={<PlanSuccessScreen />} 
        />
        <Route 
          path="/setup" 
          element={
            <PrivateRoute>
              <DealerSetupScreen />
            </PrivateRoute>
          } 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootNavigation;
