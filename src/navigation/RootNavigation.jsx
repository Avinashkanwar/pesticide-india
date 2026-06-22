import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Screens
import AiScreen from '../screens/AiScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CompareScreen from '../screens/CompareScreen';
import DoseCalculatorScreen from '../screens/DoseCalculatorScreen';
import LoginScreen from '../screens/LoginScreen';
import PaymentScreen from '../screens/PaymentScreen';
import OrderConfirmScreen from '../screens/OrderConfirmScreen';
import VendorDashboard from '../screens/VendorDashboard';

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
  return !isAuthenticated() ? children : <Navigate to="/" />;
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
          path="/products/:id" 
          element={
            <PrivateRoute>
              <ProductDetailScreen />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <PrivateRoute>
              <CartScreen />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/compare" 
          element={
            <PrivateRoute>
              <CompareScreen />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/calculator" 
          element={
            <PrivateRoute>
              <DoseCalculatorScreen />
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
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootNavigation;
