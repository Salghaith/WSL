// src/pages/BusinessRegister.jsx
import React, { useState } from 'react';
import axios from 'axios';

const BusinessRegister = () => {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState('');
  const [services, setServices] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/business/register', {
        businessName, email, password, phoneNumber, location, categories, services
      });
      console.log('Business registration successful:', response.data);
    } catch (error) {
      console.error('Error registering business:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Business Registration</h2>
      <input type="text" placeholder="Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="text" placeholder="Categories" value={categories} onChange={(e) => setCategories(e.target.value)} />
      <input type="text" placeholder="Services" value={services} onChange={(e) => setServices(e.target.value)} />
      <button type="submit">Register Business</button>
    </form>
  );
};

export default BusinessRegister;
