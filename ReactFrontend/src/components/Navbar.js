import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaBoxOpen, FaHeart, FaShoppingCart, FaSearch } from 'react-icons/fa';
import './Navbar.css';
import logo from '../assets/logologin.jpeg';

const Navbar = ({ setSearchTerm }) => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); // Hook to get current route

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(searchInput); // Update search term in Products
    };

    const handleProfileClick = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            navigate('/profile'); // Navigate to profile if user is logged in
        }
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <Link className="navbar-brand" to="/">
                <img src={logo} alt="Logo" className="navbar-logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">
                            <FaBoxOpen className="icon" />
                            <span>Products</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/orders">
                            <FaShoppingCart className="icon" />
                            <span>Orders</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/wishlist">
                            <FaHeart className="icon" />
                            <span>Wishlist</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">
                            <FaShoppingCart className="icon" />
                            <span>Cart</span>
                        </Link>
                    </li>
                </ul>
                
                {/* Conditionally render the search bar only on the /products page */}
                {location.pathname === '/products' && (
                    <form className="form-inline search-form" onSubmit={handleSearch}>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-success" type="submit">
                                    <FaSearch />
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                <ul className="navbar-nav right-profile-link">
                    <li className="nav-item">
                        <button className="nav-link profile-button" onClick={handleProfileClick}>
                            <FaUser className="profile-icon" />
                            <span>Profile</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
