
import React from "react";
import "./HomePage.css";

import homeP from "../../assets/HomeP 1.svg"

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content-container">
          <div className="hero-content">
            <h1 className="hero-heading">Connect with trusted helpers for your home tasks.</h1>
            <p className="hero-subheading">
              Find the best professionals and services at your fingertips.
            </p>
            <div className="hero-search-container">
              <input 
                type="text" 
                placeholder="What service are you looking for?" 
                className="hero-search-bar" 
              />
              <button className="hero-search-button">Find Now</button>
            </div>
          </div>
          <div className="hero-image">
            <img src={homeP} alt="Service illustration" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-heading">Explore Our Services</h2>
        <div className="categories">
          <div className="category-card">
            <h3>Home Improvement</h3>
            <p>From plumbing to electrical work, find reliable services for your home.</p>
          </div>
          <div className="category-card">
            <h3>Vehicle Services</h3>
            <p>Find reliable mechanics and services for vehicle maintenance and repairs.</p>
          </div>
          <div className="category-card">
            <h3>Device Repair</h3>
            <p>Fast and reliable repair services for phones, tablets, and other electronic devices.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-heading">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <p>Browse through a wide range of local services.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <p>Read reviews and connect with top-rated professionals in your area.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <p>Leave reviews and rate your service experiences to help others.</p>
          </div>
        </div>
      </section>

      {/* Get Help Today Section */}
      <section className="get-help-today-section">
        <h2 className="section-heading">Get Started Today</h2>
        <div className="help-tags">
          <span>Auto Repair</span>
          <span>Electricians</span>
          <span>Contractors</span>
          <span>Dry Cleaning</span>
          <span>Home Cleaners</span>
          <span>HVAC</span>
          <span>Landscaping</span>
          <span>Movers</span>
          <span>Oil Change</span>
          <span>Phone Repair</span>
          <span>Plumbers</span>
          <span>Car Wash</span>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
