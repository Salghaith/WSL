
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClientLogin from './pages/ClientLogin';
import ClientRegister from './pages/ClientRegister';
import BusinessLogin from './pages/BusinessLogin';
import BusinessRegister from './pages/BusinessRegister';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/client/register" element={<ClientRegister />} />
        <Route path="/business/login" element={<BusinessLogin />} />
        <Route path="/business/register" element={<BusinessRegister />} />
      </Routes>
    </Router>
  );
};

export default App;

