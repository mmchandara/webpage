import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({ onLogin, setCurrentUser }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users', credentials);
      localStorage.setItem('token', response.data.token);
      // Update currentUser state with the logged-in user data
      setCurrentUser(response.data.user); // Assuming response.data contains user information
      // Call the callback function passed from the parent component
      onLogin();
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Don't have an account? <Link to="/create-user">Create User</Link></p>
    </div>
  );
};

export default Login;
