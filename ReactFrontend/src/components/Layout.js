import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // Import your Navbar

const Layout = ({ children }) => {
    const location = useLocation();
    const noNavbarRoutes = ['/login', '/signup']; // Routes where Navbar should not be shown

    return (
        <>
            {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
            <main>
                {children}
            </main>
        </>
    );
};

export default Layout;
