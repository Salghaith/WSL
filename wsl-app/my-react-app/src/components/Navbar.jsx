// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li className="dropdown">
          <span>For Businesses</span>
          <div className="dropdown-content">
            <Link to="/business/login">Business Login</Link>
            <Link to="/business/register">Business Registration</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
