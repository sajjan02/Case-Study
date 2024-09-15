import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import all images
function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
}


const images = importAll(require.context('../assets', false, /\.(jpg|jpeg|png)$/));

const getImageUrl = (productName) => {
    if (!productName) return null;
    const imageFileName = `${productName}.jpg`;
    return images[imageFileName] || null;
};

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newAddress, setNewAddress] = useState({});
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [addressToEdit, setAddressToEdit] = useState({});
    const navigate = useNavigate();

    // Fetch cart items and addresses on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userid');

        if (userId) {
            fetchCartItems(userId, token);
            fetchAddresses(userId, token);
        } else {
            setError('User ID not found');
            setLoading(false);
        }
    }, []);

    const fetchCartItems = async (userId, token) => {
        try {
            const response = await axios.get(`http://localhost:5127/api/CartItems/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.$values;
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart items', error);
            setError('Failed to fetch cart items');
        } finally {
            setLoading(false);
        }
    };

    const fetchAddresses = async (userId, token) => {
        try {
            const response = await axios.get(`http://localhost:5126/api/Addresses/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAddresses(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching addresses', error);
            toast.error('Failed to fetch addresses');
        }
    };

    const handleAddToCart = async (product) => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userid');

            if (!userId) {
                toast.error('You must be logged in to add items to the cart');
                return;
            }

            await axios.post(`http://localhost:5127/api/CartItems?cartId=${userId}&productId=${product.productId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            fetchCartItems(userId, token);
            toast.success(`${product.productName} quantity has been updated in your cart!`);
        } catch (error) {
            console.error('Error adding to cart', error);
            toast.error('Failed to update product in cart');
        }
    };

    const handleDelete = async (product) => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userid');

            if (!userId) {
                toast.error('You must be logged in to modify the cart');
                return;
            }

            await axios.put(`http://localhost:5127/api/CartItems/decrease?cartId=${userId}&productId=${product.productId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            fetchCartItems(userId, token);
            toast.success('Cart updated successfully!');
        } catch (error) {
            console.error('Error decreasing item quantity', error);
            toast.error('Failed to update cart');
        }
    };

    const handleRemove = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userid');

            if (!userId) {
                toast.error('You must be logged in to remove items from the cart');
                return;
            }

            await axios.delete(`http://localhost:5127/api/CartItems?cartId=${userId}&productId=${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            fetchCartItems(userId, token);
            toast.success('Product removed from cart successfully!');
        } catch (error) {
            console.error('Error removing item from cart', error);
            toast.error('Failed to remove product from cart');
        }
    };

    const handlePlaceOrder = () => {
        const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        navigate('/orderitem', { state: { cartItems, totalAmount, selectedAddressId } });
    };

    const handleAddressChange = (e) => {
        setNewAddress({
            ...newAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleAddAddress = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userid');
    
        try {
            // Post request to the API
            await axios.post('http://localhost:5126/api/Addresses', {
                UserId1: userId, // Match this with your C# model
                StreetAddress1: newAddress.streetAddress, // Match these with your C# model
                City1: newAddress.city,
                State1: newAddress.state,
                PostalCode1: newAddress.postalCode,
                Country1: newAddress.country,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Refresh the address list
            const response = await axios.get(`http://localhost:5126/api/Addresses/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAddresses(response.data);
            
            toast.success('Address added successfully!');
    
            // Clear the address fields
            setNewAddress({
                streetAddress: '',
                city: '',
                state: '',
                postalCode: '',
                country: '',
            });
        } catch (error) {
            toast.error('Failed to add address');
        }
    };
    
    const handleEditAddress = (address) => {
        setAddressToEdit(address);
        setEditingAddressId(address.addressId);
    };

    const handleUpdateAddress = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userid');
    
            if (!userId) {
                toast.error('You must be logged in to update an address');
                return;
            }
    
            // Ensure that addressToEdit is structured correctly according to the backend model
            await axios.put(`http://localhost:5126/api/Addresses/${editingAddressId}`, {
                AddressId2: editingAddressId, // Ensure this matches your C# model
                UserId2: userId, // This should match your C# model's property
                StreetAddress2: addressToEdit.streetAddress, // Match the exact property names
                City2: addressToEdit.city,
                State2: addressToEdit.state,
                PostalCode2: addressToEdit.postalCode,
                Country2: addressToEdit.country
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            // Refresh the addresses list after the update
            fetchAddresses(userId, token);
            setEditingAddressId(null);
            setAddressToEdit({}); // Clear the addressToEdit
            toast.success('Address updated successfully!');
        } catch (error) {
            console.error('Error updating address', error);
            toast.error('Failed to update address');
        }
    };
    

    const handleDeleteAddress = async (addressId) => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userid');

            if (!userId) {
                toast.error('You must be logged in to delete an address');
                return;
            }

            await axios.delete(`http://localhost:5126/api/Addresses/${addressId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            fetchAddresses(userId, token);
            toast.success('Address deleted successfully!');
        } catch (error) {
            console.error('Error deleting address', error);
            toast.error('Failed to delete address');
        }
    };

    if (loading) {
        return <div>Loading cart items and addresses...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="cart-container">
            <h2 style={{color:'black'}}>Your Cart</h2>
            {cartItems.length > 0 ? (
                <div className="cart-items-grid">
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.cartItemId}>
                            <img
                                src={getImageUrl(item.productName)}
                                alt={item.productName}
                                className="cart-item-image"
                            />
                            <h3>{item.productName}</h3>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                            <div className="quantity-controls">
                                <button onClick={() => handleDelete(item)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleAddToCart(item)}>+</button>
                                <button style ={{background:'#dc3545'}}  onClick={() => handleRemove(item.productId)} className="remove-button">Remove</button>
                            </div>
                        </div>
                    ))}
                    <button className="place-order-button" onClick={handlePlaceOrder} disabled={selectedAddressId === null}>
                        Place Order
                    </button>
                </div>
            ) : (
                <p className="empty-cart">Your cart is empty.</p>
            )}

            <h2 style={{textAlign:"center", color:"black"}}>Your Addresses</h2>
            <div className="address-management">
    <h4>Add New Address</h4>
    <input
        type="text"
        name="streetAddress"
        placeholder="Street Address"
        onChange={handleAddressChange}
        value={newAddress.streetAddress || ''}
    />
    <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleAddressChange}
        value={newAddress.city || ''}
    />
    <input
        type="text"
        name="state"
        placeholder="State"
        onChange={handleAddressChange}
        value={newAddress.state || ''}
    />
    <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        onChange={handleAddressChange}
        value={newAddress.postalCode || ''}
    />
    <input
        type="text"
        name="country"
        placeholder="Country"
        onChange={handleAddressChange}
        value={newAddress.country || ''}
    />
    <button onClick={handleAddAddress}>Add Address</button>
</div>
            {editingAddressId && (
    <div className="address-management">
        <h4>Edit Address</h4>
        <input type="text" name="streetAddress" placeholder="Street Address" onChange={(e) => setAddressToEdit({ ...addressToEdit, streetAddress: e.target.value })} value={addressToEdit.streetAddress || ''} />
        <input type="text" name="city" placeholder="City" onChange={(e) => setAddressToEdit({ ...addressToEdit, city: e.target.value })} value={addressToEdit.city || ''} />
        <input type="text" name="state" placeholder="State" onChange={(e) => setAddressToEdit({ ...addressToEdit, state: e.target.value })} value={addressToEdit.state || ''} />
        <input type="text" name="postalCode" placeholder="Postal Code" onChange={(e) => setAddressToEdit({ ...addressToEdit, postalCode: e.target.value })} value={addressToEdit.postalCode || ''} />
        <input type="text" name="country" placeholder="Country" onChange={(e) => setAddressToEdit({ ...addressToEdit, country: e.target.value })} value={addressToEdit.country || ''} />
        <button onClick={handleUpdateAddress}>Update Address</button>
    </div>
)}

<ul className="address-list">
    {addresses.map((address) => (
        <li key={address.addressId}>
            <label style={{fontWeight:400}}>
                <input
                    type="radio"
                    name="address"
                    value={address.addressId}
                    checked={selectedAddressId === address.addressId}
                    onChange={() => setSelectedAddressId(address.addressId)}
                />
                {address.streetAddress}, {address.city}, {address.state}, {address.postalCode}, {address.country}
            </label>
            <div>
            <button onClick={() => handleEditAddress(address)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDeleteAddress(address.addressId)}>Delete</button>
            </div>
        </li>
    ))}
</ul>
        </div>
    );
};

export default Cart;
