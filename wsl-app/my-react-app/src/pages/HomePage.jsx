// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Our Service Platform</h1>
      <div>
        <Link to="/client/login">
          <button>Client Login</button>
        </Link>
        <Link to="/client/register">
          <button>Client Registration</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
