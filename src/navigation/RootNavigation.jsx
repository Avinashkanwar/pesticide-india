import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import ChatScreen from '../screens/ChatScreen';
import CompareScreen from '../screens/CompareScreen';
import DoseCalculatorScreen from '../screens/DoseCalculatorScreen';
import ArticleScreen from '../screens/ArticleScreen';
import LoginScreen from '../screens/LoginScreen';
import ArticleDetail from '../components/ArticleDetail';

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
              <HomeScreen />
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
          path="/chat" 
          element={
            <PrivateRoute>
              <ChatScreen />
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
          path="/articles" 
          element={
            <PrivateRoute>
              <ArticleScreen />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/articles/:id" 
          element={
            <PrivateRoute>
              <ArticleDetail />
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
