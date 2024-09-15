import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch the username from localStorage (or any other source)
    const username = localStorage.getItem('username');
    console.log(localStorage.getItem('token'));
    console.log(username);
    
    if (username) {
      // Use the new API endpoint to fetch user data by username
      axios.get(`http://localhost:5073/api/Users/username/${username}`)
        .then(response => {
          setUserData(response.data); // Set the fetched user data to state
        })
        .catch(error => {
          console.error('Error fetching user data', error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('username'); // Optionally remove username
    localStorage.removeItem('userid'); // Optionally remove user ID

    // Redirect to login page
    navigate('/login');
  };

  if (!userData) {
    return <div>Loading...</div>; // Display a loading message until the data is fetched
  }

  return (
    <div className="profile-container">
      <h2  style={{color:'black'}}>Profile Information</h2>
      <p><strong>First Name:</strong> {userData.firstName}</p>
      <p><strong>Last Name:</strong> {userData.lastName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Phone:</strong> {userData.phone || 'Not Provided'}</p>
      <p><strong>Username:</strong> {userData.username || 'Not Provided'}</p>
      {/* Add more user details if needed */}
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Profile;
