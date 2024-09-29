import React from "react";
import "./nav.css";
import logo from "../assets/logoWSL.svg";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Nav() {
  const [loggedInUser, setLoggedInUser] = useState(null); // Track user info
  const navigate = useNavigate(); // For handling logout and redirects
  
  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setLoggedInUser(user); // Store user info in state
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Make a request to the backend to clear the accessToken cookie
      await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
  
      // Clear localStorage and reset state on successful logout
      localStorage.removeItem('currentUser');
      setLoggedInUser(null);
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Error logging out. Please try again.");
    }
  };
  
  return (
    <div className="navBar">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Services</a>
            </li>
            <li>
              <a href="/">Write a Review</a>
            </li>
          </ul>
        </nav>
        <div className="auth">
          {/* Check if the user is logged in */}
          {loggedInUser ? (
            <>
              <span>Hello, {loggedInUser.name}</span>
              <button onClick={handleLogout} className="logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/client/login" className="login">
                Login
              </a>
              <a href="/client/login">
                <button className="signup">Signup Free</button>
              </a>
            </>
          )}
        </div>
      </header>
      <hr />
    </div>
  );
}

export default Nav;
