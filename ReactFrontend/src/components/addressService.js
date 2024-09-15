// import axios from 'axios';

// const API_URL = 'http://localhost:5126/api/Addresses';

// export const getUserAddresses = async (userId, token) => {
//     const response = await axios.get(`${API_URL}/user/${userId}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return response.data;
// };

// export const addAddress = async (address, token) => {
//     const response = await axios.post(API_URL, address, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//     });
//     return response.data;
// };

// export const updateAddress = async (addressId, address, token) => {
//     const response = await axios.put(`${API_URL}/${addressId}`, address, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//     });
//     return response.data;
// };

// export const deleteAddress = async (addressId, token) => {
//     await axios.delete(`${API_URL}/${addressId}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };
