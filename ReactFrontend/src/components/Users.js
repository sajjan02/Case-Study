import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5003/api/User', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching Users', error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.userId}>
                        {user.userName} - ${user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;

// map- it is used to loop through each value of a list and perform cahnges on that value
