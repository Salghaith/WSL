import React, { useState } from "react";
import { Container, Stepper, Step, StepLabel, Typography } from "@mui/material";
import axios from "axios";
import Input from "../components/FormElement/Input";
import { Link, useNavigate } from "react-router-dom";
import "./BusinessRegister.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../components/util/validators";
import Button from "../components/FormElement/Button";

const BusinessRegister = ({ formValidity, onValidityChange }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const nextStepHandler = () => {
    setStep(step + 1);
  };
  const previousStepHandler = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      businessName: e.target["business-name"].value, //
      categories: e.target.industry.value,
      businessEmail: e.target["business-email"].value,
      phoneNumber: e.target["phone-number"].value,
      city: e.target.city.value,
      street: e.target.street.value,
      openingHours: e.target["operating-hours"].value,
      description: e.target["business-description"].value,
      name: e.target["owner-name"].value,
      email: e.target["owner-email"].value,
      password: e.target.password.value,
    };

    try {
      // Send form data to backend
      const response = await axios.post(
        "http://localhost:3001/api/auth/registerbusiness",
        formData
      );

      // Handle success
      console.log("Business registered:", response.data);
      navigate("/client/login");
    } catch (error) {
      // Handle error
      if (error.response) {
        // If the server sends a meaningful error message
        alert(error.response.data || "An unknown error occurred");
      } else {
        // General error
        alert("An error occurred. Please try again.");
      }
    }
  };
  const isFormValid = Object.values(formValidity).every((isValid) => isValid);
  const stepsValidity = [
    formValidity["business-name"],
    formValidity["business-email"] &&
      formValidity["phone-number"] &&
      formValidity["city"] &&
      formValidity["street"],
    formValidity["operating-hours"] && formValidity["business-description"],
    formValidity["owner-name"] &&
      formValidity["owner-email"] &&
      formValidity.password,
  ];
  const steps = [
    "Business Details",
    "Contact Information",
    "Business Operation Details",
    "Owner/Representative Details",
  ];

  return (
    <React.Fragment>
      <Container sx={{ height: "100vh" }}>
        <div className="business-register-page">
          <div className="body">
            <div className="form-title">Register Your Business</div>

            <div>
              <Stepper activeStep={step - 1} alternativeLabel>
                {steps.map((label, index) => {
                  const labelProps = {};

                  if (!stepsValidity[index] && step - 1 > index) {
                    labelProps.optional = (
                      <Typography variant="caption" color="error"></Typography>
                    );

                    labelProps.error = true;
                  }

                  return (
                    <Step key={label}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </div>
            <form className="register-from" onSubmit={handleSubmit}>
              <div className={`${step != 1 ? "disapper" : "step-one"}`}>
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
                      onValidityChange={onValidityChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Business Category</label>
                    <select id="industry" name="industry" required>
                      <option value="" disabled selected hidden>
                        Select your category
                      </option>
                      <option value="tech-and-gadget-services">
                        Tech and Gadget Services
                      </option>
                      <option value="home-services">Home Services</option>
                      <option value="home-improvement-services">
                        Home Improvement
                      </option>
                      <option value="auto-services">Automotive Services</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <Button
                    className="step-button first"
                    type="button"
                    onClick={nextStepHandler}
                  >
                    Next Step
                  </Button>
                </div>
              </div>

              <div className={`${step != 2 ? "disapper" : "step-two"}`}>
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
                      onValidityChange={onValidityChange}
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
                      onValidityChange={onValidityChange}
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
                        onValidityChange={onValidityChange}
                      />
                      <Input
                        element="input"
                        type="text"
                        id="street"
                        name="street"
                        placeholder="Street"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText=""
                        onValidityChange={onValidityChange}
                      />
                    </div>
                  </div>
                  <Button
                    className="step-button"
                    type="button"
                    onClick={previousStepHandler}
                  >
                    Previous Step
                  </Button>
                  <Button
                    className="step-button"
                    type="button"
                    onClick={nextStepHandler}
                  >
                    Next Step
                  </Button>
                </div>
              </div>

              <div className={`${step != 3 ? "disapper" : "step-three"}`}>
                <span className="form-section-title">
                  Business Operation Details
                </span>

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
                      onValidityChange={onValidityChange}
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
                      validators={[
                        VALIDATOR_REQUIRE(),
                        VALIDATOR_MAXLENGTH(220),
                      ]}
                      errorText=""
                      onValidityChange={onValidityChange}
                    />
                  </div>
                  <Button
                    className="step-button"
                    type="button"
                    onClick={previousStepHandler}
                  >
                    Previous Step
                  </Button>
                  <Button
                    className="step-button"
                    type="button"
                    onClick={nextStepHandler}
                  >
                    Next Step
                  </Button>
                </div>
              </div>

              <div className={`${step != 4 ? "disapper" : "step-four"}`}>
                <span className="form-section-title">
                  Owner/Representative Details
                </span>

                <div className="form-section">
                  <div className="form-group">
                    <label htmlFor="owner-name">
                      Owner/Representative Name
                    </label>
                    <Input
                      element="input"
                      type="text"
                      id="owner-name"
                      name="owner-name"
                      placeholder="Enter the name of the business owner"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText=""
                      onValidityChange={onValidityChange}
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
                      validators={[VALIDATOR_EMAIL()]}
                      errorText=""
                      onValidityChange={onValidityChange}
                    />
                  </div>
                  <div className="form-group">
                    <span className="passwordInput">
                      <label htmlFor="password">Password</label>
                      <Input
                        element="input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        validators={[
                          VALIDATOR_MINLENGTH(6),
                          VALIDATOR_MAXLENGTH(16),
                        ]}
                        errorText=""
                        onValidityChange={onValidityChange}
                      />
                    </span>
                  </div>
                </div>

                <div className="form-section">
                  <Button
                    className="step-button"
                    type="button"
                    onClick={previousStepHandler}
                  >
                    Previous Step
                  </Button>
                  <Button
                    type="submit"
                    className={"submit-button"}
                    disabled={!isFormValid}
                  >
                    Submit
                  </Button>
                </div>
              </div>

              <div className="submit-wrapper"></div>
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default BusinessRegister;
