import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

import footerLogo from "../../assets/footer-icon.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={footerLogo} alt="Footer Logo" />
        <nav className="footer-nav">
          <ul>
            <li>
              <Link to="/">Terms of Services</Link>
            </li>
            <li>
              <Link to="/">FAQ</Link>
            </li>
            <li>
              <Link to="/">Services</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </div>
      <hr />
    </footer>
  );
};

export default Footer;
