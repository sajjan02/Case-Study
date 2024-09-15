// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Products from './components/Products';
import Users from './components/Users';
import Wishlist from './components/Wishlist'; 
import ProductManagement from './components/ProductManagement';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import ProductDetails from './components/ProductDetails';
import Profile from './components/Profile';
import Layout from './components/Layout'; // Import Layout component
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './components/Cart'
import OrderItem from './components/OrderItem';
import Checkout from './components/Checkout';
import UserOrders from './components/UserOrders';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Routes with layout and navigation */}
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
        <Route path="/products" element={<Layout><ProtectedRoute><Products /></ProtectedRoute></Layout>} />
        <Route path="/users" element={<Layout><ProtectedRoute><Users /></ProtectedRoute></Layout>} />
        <Route path="/products/:productId/reviews" element={<Layout><ProtectedRoute><ProductDetails /></ProtectedRoute></Layout>} />
        <Route path="/product-management" element={<Layout><ProtectedRoute><ProductManagement /></ProtectedRoute></Layout>} />
        <Route path="/wishlist" element={<Layout><ProtectedRoute><Wishlist /></ProtectedRoute></Layout>} />
        <Route path="/profile" element={<Layout><ProtectedRoute><Profile /></ProtectedRoute></Layout>} />
        <Route path="/cart" element={<Layout><ProtectedRoute><Cart /></ProtectedRoute></Layout>} />
        <Route path="/orderitem" element={<Layout><ProtectedRoute><OrderItem /></ProtectedRoute></Layout>} />
        <Route path="/checkout" element={<Layout><ProtectedRoute><Checkout /></ProtectedRoute></Layout>} />
        <Route path="/orders" element={<Layout><ProtectedRoute><UserOrders /></ProtectedRoute></Layout>} />        
        {/* Wildcard route to handle undefined paths */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
