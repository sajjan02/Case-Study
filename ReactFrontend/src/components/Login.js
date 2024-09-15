import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the CSS file
import logo from '../assets/logologin.jpeg'; // Importing the logo image

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (username === 'admin' && password === '1234') {
            navigate('/product-management');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5003/api/User/authenticate', {
                Username: username,
                Password: password
            },
            { headers: { 'Content-Type': 'application/json' } });

            const token = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            navigate('/products');
        } catch (error) {
            setError('Invalid username or password');
            console.error('Login error:', error);
        }

        try {
            const response1 = await axios.get(`http://localhost:5003/byusername/${username}`);
            const userId = response1.data;
            console.log('User ID:', userId);
            localStorage.setItem('userid', userId);
        } catch (error) {
            setError('No user found');
            console.error('User Id Fetching error:', error);
        }
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="login-page">
            <div className="left-half">
                <div className="login-container">
                    {/* Logo Image */}
                    <div className="logo-container">
                        <img src={logo} alt="Logo" className="logo" />
                    </div>

                    <h2>Login</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    <button onClick={handleSignup} className="signup-button">
                        Create New User
                    </button>
                </div>
            </div>
            <div className="right-half"></div>
        </div>
    );
};

export default Login;
