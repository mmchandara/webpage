import React, { useState } from 'react';
import axios from 'axios';

const UserPage = ({ onLogin }) => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '', address: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/users', userData);
      localStorage.setItem('token', response.data.token);
      // Call the callback function passed from the parent component
      onLogin();
    } catch (error) {
      setError('Error creating user. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCreateUser(); }}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={userData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={userData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={userData.address} onChange={handleChange} />
        </div>
        <button type="submit">Create User</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UserPage;
