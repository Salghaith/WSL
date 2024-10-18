import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import logo from "./images/logo.svg";
import './header.css';

export default function MyHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className="header">
        {/* Logo Section */}
        <div className="logo">
          <img src={logo} alt="WSL" />
        </div>

        {/* Search Section */}
        <div className="search-container">
          <div className="search-input">
            <input
              type="text"
              placeholder="plumbers, movers, HVAC"
              className="search-bar"
            />
            <button className="search-button">Search</button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <p className="nav-item">Register Business</p>
          <p className="nav-item">Write a Review</p>

          {/* Profile + Three-line Icons */}
          <div className="profile-icon" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUserCircle} size="2x" style={{ color: 'black', cursor: 'pointer' }} />
            <FontAwesomeIcon icon={faBars} size="2x" style={{ color: 'black', cursor: 'pointer', marginLeft: '10px' }} />
          </div>
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="dropdown-menu">
            <a href="/profile" className="dropdown-item">Profile</a>
            <a href="/user-reviews" className="dropdown-item">User Reviews</a>
            <a href="/edit-business-info" className="dropdown-item">Edit Business Info</a> {/* Added link */}
            <a href="/" className="dropdown-item">Logout</a>
          </div>
        )}
      </div>
      <hr className="header-divider" />
    </>
  );
}
