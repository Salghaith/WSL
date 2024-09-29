import React from "react";
import "./nav.css";
import logo from "../assets/logoWSL.svg";

function Nav() {
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
          <a href="/" className="login">
            Login
          </a>
          <button className="signup">Signup Free</button>
        </div>
      </header>
      <hr />
    </div>
  );
}

export default Nav;
