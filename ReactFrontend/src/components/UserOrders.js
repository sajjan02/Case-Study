import React, { useState, useEffect } from 'react';
import './UserOrders.css';
import axios from 'axios';
import { FiPhone } from 'react-icons/fi'; // Importing phone icon from react-icons

function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../assets', false, /\.(jpg|jpeg|png)$/));

const getImageUrl = (productName) => {
    if (!productName) return null;
    const imageFileName = `${productName}.jpg`; // Adjust this if your image format is different
    return images[imageFileName] || null;
};

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userid'); // Assuming userId is stored in localStorage

    const handleCall = async () => {
        try {
          const response = await axios.post('http://localhost:7000/api/call', {
            from: '+12678677569', // Replace with your Twilio number
            url: 'https://handler.twilio.com/twiml/EH4e5b23112eabeb54b25a8b6ab0ec0514', // URL to your TwiML Bin or TwiML Application
          });
          console.log('Call initiated:', response.data);
        } catch (error) {
          console.error('Error initiating call:', error);
        }
      };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:5074/api/Order/ByUser/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    if (loading) {
        return <div>Loading orders...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

   

    return (
        <div>
            <h2 style={{ color: 'black' }}>User Orders</h2>
            {orders.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Order Item ID</th>
                            <th>Order ID</th>
                            <th>Price</th>
                            <th>Order Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderItemId}>
                                <td>
                                    {getImageUrl(order.productName) && (
                                        <img 
                                            src={getImageUrl(order.productName)} 
                                            alt={order.productName} 
                                            className="order-item-image" 
                                        />
                                    )}
                                    {order.productName}
                                </td>
                                <td>{order.orderItemId}</td>
                                <td>{order.orderId}</td>
                                <td>${order.price}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found for this user.</p>
            )}
            {/* Add the static phone button */}
            <a href="#" className="phone-button" title="Call Customer Care" onClick={handleCall}>
        <FiPhone className="phone-icon" />
        <span className="phone-text">Customer Care</span>
      </a>
        </div>
    );
};

export default UserOrders;
