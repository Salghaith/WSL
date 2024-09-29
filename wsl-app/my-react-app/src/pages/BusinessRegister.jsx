// src/pages/BusinessRegister.jsx
import React, { useState } from "react";
import axios from "axios";
import workerIcon from "../assets/worker-pic.svg";
import Input from "../components/FormElement/Input";
import { Link, useNavigate } from "react-router-dom";

import "./BusinessRegister.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAX,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../components/util/validators";
import Footer from "../components/footer";

const BusinessRegister = () => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState("");
  const [services, setServices] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      businessName: e.target['business-name'].value, //
      categories: e.target.industry.value,
      businessEmail: e.target['business-email'].value,
      phoneNumber: e.target['phone-number'].value,
      city: e.target.city.value,
      street: e.target.street.value,
      openingHours: e.target['operating-hours'].value,
      description: e.target['business-description'].value,
      name: e.target['owner-name'].value,
      email: e.target['owner-email'].value,
      password: e.target.password.value,
    };

    try {
      // Send form data to backend
      const response = await axios.post('http://localhost:3001/api/auth/registerbusiness', formData);
      
      // Handle success 
      console.log('Business registered:', response.data);
      navigate("/client/login");
    } catch (error) {
      // Handle error
      if (error.response) {
        // If the server sends a meaningful error message
        alert(error.response.data || 'An unknown error occurred');
      } else {
        // General error
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <React.Fragment>
      <div className="navExample"></div>
      <section className="worker-section">
        <div className="worker-text">
          <span>Discover Local Services with WSL</span>
        </div>
        <div className="worker-image">
          <img src={workerIcon} alt="worker" />
        </div>
      </section>

      <div className="form-title">Register Your Business</div>

      <form className="register-from" onSubmit={handleSubmit}>
        <span className="form-section-title">Business Details</span>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="business-name">Business Name</label>
            <Input
              element="input"
              type="text"
              id="business-name"
              name="business-name"
              placeholder="Enter your business name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Business Category</label>
            <select id="industry" name="industry" required>
              <option value="" disabled selected hidden>
                Select your category
              </option>
              <option value="tech-and-gadget-services">Tech and Gadget Services</option>
              <option value="home-services">Home Services</option>
              <option value="home-improvement-services">Home Improvement</option>
              <option value="auto-services">Automotive Services</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <span className="form-section-title">Contact Information</span>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="business-email">Business Email</label>
            <Input
              element="input"
              type="email"
              id="business-email"
              name="business-email"
              placeholder="Enter your business email"
              validators={[VALIDATOR_EMAIL()]}
              errorText=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone-number">Business Phone Number</label>
            <Input
              element="input"
              type="tel"
              id="phone-number"
              name="phone-number"
              placeholder="Enter your phone number"
              validators={[VALIDATOR_REQUIRE()]}
              errorText=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="business-address">Business Address</label>
            <div className="address-inputs">
              <Input
                element="input"
                type="text"
                id="city"
                name="city"
                placeholder="City"
                validators={[VALIDATOR_REQUIRE()]}
                errorText=""
              />
              <Input
                element="input"
                type="text"
                id="street"
                name="street"
                placeholder="Street"
                validators={[VALIDATOR_REQUIRE()]}
                errorText=""
              />
            </div>
          </div>
        </div>

        <span className="form-section-title">Business Operation Details</span>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="operating-hours">Operating Hours</label>
            <Input
              element="input"
              type="text"
              id="operating-hours"
              name="operating-hours"
              placeholder="e.g., Weekdays 9 AM - 6 PM"
              validators={[VALIDATOR_REQUIRE()]}
              errorText=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="business-description">
              Description of Business
            </label>
            <Input
              id="business-description"
              name="business-description"
              rows="5"
              placeholder="Briefly describe what your business does"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(220)]}
              errorText=""
            />
          </div>
        </div>

        <span className="form-section-title">Owner/Representative Details</span>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="owner-name">Owner/Representative Name</label>
            <Input
              element="input"
              type="text"
              id="owner-name"
              name="owner-name"
              placeholder="Enter the name of the business owner"
              validators={[VALIDATOR_REQUIRE()]}
              errorText=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="owner-email">Owner's Email</label>
            <Input
              element="input"
              type="email"
              id="owner-email"
              name="owner-email"
              placeholder="Enter the owner's email address"
              validators={[VALIDATOR_REQUIRE()]}
              errorText=""
            />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <span className="passwordInput">
              <label htmlFor="password">Password</label>
              <Input
                element="input"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_MAXLENGTH(16)]}
                errorText=""
              />
            </span>
          </div>
        </div>

        <div className="submit-wrapper">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default BusinessRegister;
