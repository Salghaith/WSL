// src/pages/ClientRegister.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ClientRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/client/register', { name, email, password });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error registering client:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Client Registration</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default ClientRegister;
