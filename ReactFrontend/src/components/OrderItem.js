import React from 'react';
import { useLocation } from 'react-router-dom';
import './OrderItem.css'; // Import the CSS file
import { loadStripe } from '@stripe/stripe-js';

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

const OrderItem = () => {
    const location = useLocation();
    const { cartItems } = location.state || { cartItems: [] };
    const userId = localStorage.getItem('userid');

    // Recalculate total amount with taxes
    const calculateTotalAmount = () => {
        return cartItems.reduce((acc, item) => {
            const itemTotal = item.price * item.quantity;
            const tax = itemTotal * (12 / 100);
            return acc + itemTotal + tax;
        }, 0);
    };

    const totalAmount = calculateTotalAmount();
    

    const handlePayment = async () => {

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
       
        alert('Proceeding to payment...');

        

        // Initialize Stripe (adjust with your public key)
        const stripe = await loadStripe("");

        // Loop through the cart items and make separate POST requests
        for (const item of cartItems) {
            const orderData = {
                orderId: Math.floor(Math.random() * 10000), // Random Order ID, ideally handled by backend
                userId: parseInt(userId), // Get the userId from localStorage
                totalAmount: item.price * item.quantity , // Total for each item
                status: 'Shipped',
                items: [
                    {
                        orderItemId: Math.floor(Math.random() * 10000), // Random Order Item ID
                        productId: item.productId,
                        productName: item.productName,
                        quantity: item.quantity,
                        unitPrice: item.price,
                    },
                ],
            };

            try {
                const response = await fetch('http://localhost:5074/api/Order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                });

                if (response.ok) {
                    const orderResponse = await response.json();
                    console.log('Order placed for item:', item.productName, orderResponse);
                } else {
                    console.error('Failed to place order for item:', item.productName, response.statusText);
                }
            } catch (error) {
                console.error('Error placing order for item:', item.productName, error);
            }
        }

        // After posting all cart items, continue to Stripe payment
        try {
            const body = { products: cartItems };
            const stripeResponse = await fetch("http://localhost:7000/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const session = await stripeResponse.json();
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                console.log(result.error);
            }
        } catch (error) {
            console.error('Error during Stripe session creation:', error);
        }
    };

    console.log(cartItems);

    return (
        <div>
            <h2 style={{color:'black'}}>Your Order</h2>
            {cartItems.length > 0 ? (
                <div className="order-item-container">
                    {cartItems.map((item) => (
                        <div key={item.cartItemId} className="order-item">
                            {getImageUrl(item.productName) && (
                                <img 
                                    src={getImageUrl(item.productName)} 
                                    alt={item.productName} 
                                    className="order-item-image" 
                                />
                            )}
                            <h3>{item.productName}</h3>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Taxes: ${(item.price * item.quantity * (12/100)).toFixed(2)}</p>
                            <p>Subtotal: ${(item.price * item.quantity + (item.price * item.quantity * (12/100))).toFixed(2)}</p>
                        </div>
                    ))}
                    <div className="payment-container">
                        <div className="total-amount-container">
                            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                        </div>
                        <button className="payment-button" onClick={handlePayment}>
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            ) : (
                <p>No items in the order.</p>
            )}
        </div>
    );
};

export default OrderItem;
