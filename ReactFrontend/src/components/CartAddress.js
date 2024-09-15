import React, { useState, useEffect } from 'react';
import { getUserAddresses, addAddress, updateAddress, deleteAddress } from './addressService';
import { toast } from 'react-toastify';

const CartAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({ streetAddress: '', city: '', state: '', postalCode: '', country: '' });
    const [editAddressId, setEditAddressId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userid');

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const addresses = await getUserAddresses(userId, token);
            setAddresses(addresses);
        } catch (error) {
            setError('Failed to fetch addresses');
        } finally {
            setLoading(false);
        }
    };

    const handleAddAddress = async () => {
        try {
            const address = { ...newAddress, userId };
            await addAddress(address, token);
            toast.success('Address added successfully');
            fetchAddresses();
        } catch (error) {
            toast.error('Failed to add address');
        }
    };

    const handleEditAddress = (address) => {
        setEditAddressId(address.addressId);
        setNewAddress(address);
    };

    const handleUpdateAddress = async () => {
        try {
            await updateAddress(editAddressId, newAddress, token);
            toast.success('Address updated successfully');
            setEditAddressId(null);
            fetchAddresses();
        } catch (error) {
            toast.error('Failed to update address');
        }
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            await deleteAddress(addressId, token);
            toast.success('Address deleted successfully');
            fetchAddresses();
        } catch (error) {
            toast.error('Failed to delete address');
        }
    };

    if (loading) return <p>Loading addresses...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Your Addresses</h2>
            {addresses.length > 0 ? (
                <ul>
                    {addresses.map((address) => (
                        <li key={address.addressId}>
                            {address.streetAddress}, {address.city}, {address.state}, {address.postalCode}, {address.country}
                            <button onClick={() => handleEditAddress(address)}>Edit</button>
                            <button onClick={() => handleDeleteAddress(address.addressId)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No addresses found.</p>
            )}
            <div>
                <h3>{editAddressId ? 'Edit Address' : 'Add Address'}</h3>
                <input
                    type="text"
                    placeholder="Street Address"
                    value={newAddress.streetAddress}
                    onChange={(e) => setNewAddress({ ...newAddress, streetAddress: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Postal Code"
                    value={newAddress.postalCode}
                    onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                />
                <button onClick={editAddressId ? handleUpdateAddress : handleAddAddress}>
                    {editAddressId ? 'Update Address' : 'Add Address'}
                </button>
            </div>
        </div>
    );
};

export default CartAddress;
