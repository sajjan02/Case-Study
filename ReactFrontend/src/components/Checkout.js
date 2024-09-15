import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf'; // Import jsPDF for generating PDFs
import './Checkout.css'; // Import the external CSS file

const Checkout = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  // console.log(cartItems)

  // Calculate total amount based on cart items
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSendSMS = () => {
    if (phoneNumber) {
      axios
        .post('http://localhost:5000/send-sms', { phoneNumber })
        .then((_response) => {
          alert('SMS sent successfully!');
        })
        .catch((error) => {
          alert('Failed to send SMS.');
          console.error(error);
        });
    } else {
      alert('Please enter a valid phone number.');
    }
  };

  // Function to generate PDF receipt
  const handleViewReceipt = () => {
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      alert('No items in the cart to generate a receipt.');
      return;
    }

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Order Receipt', 10, 10);

    // Add a unique order ID
    const orderId = Math.floor(Math.random() * 100000); // Simulated order ID
    doc.setFontSize(12);
    doc.text(`receipt ID: ${orderId}`, 10, 20);

    

    // Add a table header for the order items
    let yPos = 50;
    doc.text('Item', 10, yPos);
    doc.text('Price', 80, yPos);
    doc.text('Quantity', 120, yPos);
    doc.text('Total', 160, yPos);
    yPos += 10;

    // Add the order items
    cartItems.forEach((item) => {
      doc.text(item.productName, 10, yPos);
      doc.text(`$${item.price.toFixed(2)}`, 80, yPos);
      doc.text(item.quantity.toString(), 120, yPos);
      doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 160, yPos);
      yPos += 10;
    });

    // Add total amount
    doc.setFontSize(14);
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 10, yPos + 10);

    // Save the PDF
    doc.save('order_receipt.pdf');
  };

  return (
    <div className="checkout-container">
      <div className="message-container">
        <h1 className="title">Payment Successful!</h1>
        <p className="subtitle">Thank you for your purchase.</p>
        <p className="info">Your payment has been processed successfully.</p>

        {/* Button to trigger receipt generation */}
        <button className="button" onClick={handleViewReceipt}>
          Click Here to View Receipt
        </button>

        {/* Input and button to send SMS notification */}
        <div className="notification-container">
          <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="phone-input"
          />
          <button className="button" onClick={handleSendSMS}>
            Get Notification of the Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
