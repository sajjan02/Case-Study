import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        jwtDecode(token); // Decode the token to ensure it's valid
        return children;
    } catch (err) {
        localStorage.removeItem('token'); // Remove invalid token
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
