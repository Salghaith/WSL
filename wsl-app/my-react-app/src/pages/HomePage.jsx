import React from "react";
import "./HomePage.css";
import maintenanceIcon from "../assets/maintenance-icon.svg";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Our Service Platform</h1>
      <div className="body">
        <h1>Connect with trusted helpers for your home tasks.</h1>

        <img src={maintenanceIcon} alt="maintenance-icon" />
      </div>
    </div>
  );
};

export default HomePage;
