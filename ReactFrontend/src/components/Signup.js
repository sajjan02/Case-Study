import React, {  useState } from 'react';
import './Signing.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signing = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [Phone, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      email,
      Phone,
      username,
      password
    };
    try{
        const response=await axios.post('http://localhost:5200/api/Users',{
            FirstName:firstName,
            LastName:lastName,
            Email:formData.email,
            Phone:Phone,
            Username:formData.username,
            Password:formData.password
        },
        {
            headers:{
                'Content-Type':'application/json'
            }
        });
        console.log(typeof(formData));
        console.log(response)
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        navigate('/login');
    }
    catch(error)
    {
        console.log(error);
        setError('Email Already In Use');
    }
  };
  return (
    <div className="signing-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="signing-form">
      <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Phone">Phone Number</label>
          <input
            type="tel"
            id="Phoner"
            name="Phone"
            value={Phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
    </div>
  );
};
export default Signing;