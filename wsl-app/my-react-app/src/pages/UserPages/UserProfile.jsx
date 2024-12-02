import React, { useState, useContext, useEffect } from "react";
import "./UserProfile.css";
import "../Shared/editCard.css";
import { UserContext } from "../../components/util/context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MessageBanner from "../../components/Shared/MessageBanner.jsx";
import Input from "../../components/FormElement/Input";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../components/util/validators.jsx";

const UserProfile = ({ formValidity, onValidityChange }) => {
  const navigate = useNavigate();
  const { loggedInUser, login, apiBaseUrl } = useContext(UserContext);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  const [name, setName] = useState(loggedInUser ? loggedInUser.name : "");
  const [email, setEmail] = useState(loggedInUser ? loggedInUser.email : "");

  const [password, setPassword] = useState("password");

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      setEmail(loggedInUser.email);
      setName(loggedInUser.name);
    }
  }, [loggedInUser]);

  if (!loggedInUser) {
    <div>Redirecting...</div>;
  }
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (!isFormValid) {
      return alert("Something went wrong, please reload the page.");
    }
    setLoading(true);
    try {
      const response = await axios.put(
        `${apiBaseUrl}/user/update`,
        {
          name,
          email,
          // password,
        },
        { withCredentials: true }
      );

      login(response.data);
      setLoading(false);
      setIsEditing(false);
      setErrors({}); // Clear errors on successful submission

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 5000); // Message disappears after 5 seconds
    } catch (error) {
      setLoading(false);
      setErrors({ general: "Failed to update profile" });
    }
  };

  const [isFormValid, setIsFormValid] = useState(true);
  useEffect(() => {
    setIsFormValid(Object.values(formValidity).every((isValid) => isValid));
  }, [formValidity]);

  return (
    <div className="profile-page">
      <div>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
          onClick={() => {}}
        >
          <CircularProgress color="black" />
        </Backdrop>
      </div>
      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-field">
          <label htmlFor="name">Name</label>
          <Input
            element="input"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(40)]}
            errorText="Please Enter A Valid Name! (between 3 and 40 chars)"
            onValidityChange={onValidityChange}
            initiallyValid={true}
          />
        </div>
        <div className="profile-field">
          <label htmlFor="email">Email</label>
          <Input
            element="input"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please Enter A Valid Email! (e.g: alex@gmail.com)"
            onValidityChange={onValidityChange}
            initiallyValid={true}
          />
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
            //No Validators yet, because it's not implemented.
          />
        </div>

        <div className="button-container">
          <button className="edit-btn" onClick={handleEditClick}>
            Edit
          </button>
          {isEditing && (
            <button
              className="save-btn"
              onClick={handleSaveClick}
              disabled={!isFormValid}
            >
              Submit
            </button>
          )}
          {!isEditing && (
            <Link to="/client/resetPassword">
              <button className="edit-btn" onClick={handleEditClick}>
                Reset Password
              </button>
            </Link>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <MessageBanner message={successMessage} type="success" />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
