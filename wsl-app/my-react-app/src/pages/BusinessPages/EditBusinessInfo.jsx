import React, { useState, useContext, useEffect } from "react";
import "./editBusinessInfo.css";
import "../Shared/editCard.css";

import { UserContext } from "../../components/util/context";
import { useNavigate } from "react-router-dom";

import TimeSelector from "../../components/timeSelector"; // Ensure you're importing this component
import dayjs from "dayjs";
import axios from "axios";
import ErrorBanner from "../../components/ErrorBanner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../components/util/validators.jsx";
import Input from "../../components/FormElement/Input.jsx";

const EditBusinessInfo = ({ formValidity, onValidityChange }) => {
  const { loggedInUser, login } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  const [isEditing, setIsEditing] = useState(false);
  const [businessName, setBusinessName] = useState(
    loggedInUser?.business?.businessName || ""
  );
  const [businessCategory, setBusinessCategory] = useState(
    loggedInUser?.business?.categories?.[0] || ""
  );
  const [businessEmail, setBusinessEmail] = useState(
    loggedInUser?.business?.email || ""
  );
  const [businessPhone, setBusinessPhone] = useState(
    loggedInUser?.business?.phoneNumber || ""
  );
  const [businessAddress, setBusinessAddress] = useState({
    city: loggedInUser?.business?.location?.city || "",
    street: loggedInUser?.business?.location?.street || "",
  });
  const [hoursFrom, setHoursFrom] = useState(
    loggedInUser?.business?.openingHours?.from || "2022-04-17T12:30"
  );
  const [hoursTo, setHoursTo] = useState(
    loggedInUser?.business?.openingHours?.to || "2022-04-17T23:30"
  );
  const [description, setDescription] = useState(
    loggedInUser?.business?.description || ""
  );
  const [ownerName, setOwnerName] = useState(loggedInUser?.name || "");
  const [ownerEmail, setOwnerEmail] = useState(loggedInUser?.email || "");
  const [password, setPassword] = useState("password");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (!isFormValid) {
      return alert("DON'T TOUCH THE CODE IN THE INSPECT PLEASE!!");
    }
    try {
      const response = await axios.put(
        "http://localhost:3001/api/business/update",
        {
          businessName,
          businessCategory,
          businessEmail,
          businessPhone,
          businessAddress,
          openingHours: {
            from: hoursFrom.format("h:mm A"),
            to: hoursTo.format("h:mm A"),
          },
          description,
          ownerName,
          ownerEmail,
          // password,
        },
        { withCredentials: true }
      );

      // localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      login(response.data.user);
      setIsEditing(false);
      setErrors({});
      setSuccessMessage("Business info updated successfully!");
      setTimeout(() => setSuccessMessage(""), 5000); // Message disappears after 5 seconds
    } catch (error) {
      setErrors({ general: "Failed to update business info" });
      console.log(error);
    }
  };
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    setIsFormValid(Object.values(formValidity).every((isValid) => isValid));
  }, [formValidity]);

  return (
    <div className="business-edit-page">
      <div className="profile-container">
        <h2 className="profile-title">Edit Business Info</h2>

        {/* Business Details Section */}
        <h3 className="section-title">Business Details</h3>
        <div className="profile-field">
          <label htmlFor="businessName">Business Name</label>

          <Input
            element="input"
            type="text"
            id="businessName"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            validators={[VALIDATOR_REQUIRE()]}
            errorText=""
            onValidityChange={onValidityChange}
            initiallyValid={true}
          />
        </div>
        <div className="profile-field">
          <label htmlFor="businessCategory">Business Category</label>
          <select
            id="businessCategory"
            value={businessCategory}
            onChange={(e) => setBusinessCategory(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
          >
            <option value="tech">Tech and Gadget Services</option>
            <option value="home">Home Services</option>
            <option value="improvement">Home Improvement Services</option>
            <option value="auto">Auto Services</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Contact Information Section */}
        <h3 className="section-title">Contact Information</h3>
        <div className="profile-field">
          <label htmlFor="businessEmail">Business Email</label>
          <Input
            element="input"
            type="text"
            id="businessEmail"
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            validators={[VALIDATOR_EMAIL()]}
            errorText=""
            onValidityChange={onValidityChange}
            initiallyValid={true}
          />
          {errors.businessEmail && (
            <span className="error">{errors.businessEmail}</span>
          )}
        </div>
        <div className="profile-field">
          <label htmlFor="businessPhone">Business Phone Number</label>
          <Input
            element="input"
            type="text"
            id="businessPhone"
            value={businessPhone}
            onChange={(e) => setBusinessPhone(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            validators={[VALIDATOR_REQUIRE()]}
            errorText=""
            onValidityChange={onValidityChange}
            initiallyValid={true}
          />
          {errors.businessPhone && (
            <span className="error">{errors.businessPhone}</span>
          )}
        </div>
        <div className="profile-field">
          <label htmlFor="businessAddressCity">City</label>
          <Input
            element="input"
            type="text"
            id="businessAddressCity"
            value={businessAddress.city}
            onChange={(e) =>
              setBusinessAddress({ ...businessAddress, city: e.target.value })
            }
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            validators={[VALIDATOR_REQUIRE()]}
            errorText=""
            onValidityChange={onValidityChange}
            initiallyValid={true}
          />
        </div>
        <div className="profile-field">
          <label htmlFor="businessAddressStreet">Street</label>
          <Input
            element="input"
            type="text"
            id="businessAddressStreet"
            value={businessAddress.street}
            onChange={(e) =>
              setBusinessAddress({ ...businessAddress, street: e.target.value })
            }
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            validators={[VALIDATOR_REQUIRE()]}
            errorText=""
            onValidityChange={onValidityChange}
            initiallyValid={true}
          />
        </div>

        {/* Business Operation Details Section */}
        <h3 className="section-title">Business Operation Details</h3>
        <div className="profile-field">
          <div className="operating-hours">
            <label htmlFor="operatingHours">Operating Hours</label>
            {isEditing ? (
              <div className="operating-hours">
                <TimeSelector
                  value={hoursFrom}
                  setValue={setHoursFrom}
                  label={"From"}
                />
                <TimeSelector
                  value={hoursTo}
                  setValue={setHoursTo}
                  label={"To"}
                />
              </div>
            ) : (
              <p>{`From ${hoursFrom} to ${hoursTo}`}</p>
            )}
          </div>
        </div>
        <div className="profile-field">
          <label htmlFor="description">Description of Business</label>
          <Input
            id="description"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(220)]}
            errorText=""
            onValidityChange={onValidityChange}
            initiallyValid={true}
          />
        </div>

        {/* Owner/Representative Details Section */}
        <h3 className="section-title">Owner/Representative Details</h3>
        <div className="profile-field">
          <label htmlFor="ownerName">Owner/Representative Name</label>
          <Input
            element="input"
            type="text"
            id="ownerName"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            validators={[VALIDATOR_REQUIRE()]}
            errorText=""
            onValidityChange={onValidityChange}
            initiallyValid={true}
          />
        </div>
        <div className="profile-field">
          <label htmlFor="ownerEmail">Owner's Email</label>
          <Input
            element="input"
            type="text"
            id="ownerEmail"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            validators={[VALIDATOR_EMAIL()]}
            errorText=""
            onValidityChange={onValidityChange}
            initiallyValid={true}
          />
          {errors.ownerEmail && (
            <span className="error">{errors.ownerEmail}</span>
          )}
        </div>
        <div className="profile-field">
          <label htmlFor="password">Password</label>
          <Input
            element="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={true}
            // className={isEditing ? "editable" : ""}
            // validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_MAXLENGTH(16)]}
            errorText=""
            onValidityChange={onValidityChange}
            initiallyValid={true}
          />
        </div>

        <div className="button-container">
          <button className="edit-btn" onClick={handleEditClick}>
            Edit
          </button>
          {isEditing && (
            <button className="save-btn" onClick={handleSaveClick} disabled={!isFormValid}>
              Submit
            </button>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          // <div className="success-message">{successMessage}</div>
          <ErrorBanner message={successMessage} type="success" />
        )}
      </div>
    </div>
  );
};

export default EditBusinessInfo;
