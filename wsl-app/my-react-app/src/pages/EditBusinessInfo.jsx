import React, { useState, useContext, useEffect } from "react";
import "./editBusinessInfo.css";
import "./editCard.css";
import { UserContext } from "../components/util/context";
import { useNavigate } from "react-router-dom";

const EditBusinessInfo = () => {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    //To prevent unauth users from reaching this page.
    if (!loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  if (!loggedInUser) {
    return <div>Redirecting</div>;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [businessName, setBusinessName] = useState("Tech Store");
  const [businessCategory, setBusinessCategory] = useState("tech");
  const [businessEmail, setBusinessEmail] = useState("info@techstore.com");
  const [businessPhone, setBusinessPhone] = useState("1234567890");
  const [businessAddress, setBusinessAddress] = useState({
    city: "New York",
    street: "5th Avenue",
  });
  const [operatingHours, setOperatingHours] = useState("9 AM - 5 PM");
  const [description, setDescription] = useState(
    "Your one-stop shop for tech gadgets."
  );
  const [ownerName, setOwnerName] = useState("John Doe");
  const [ownerEmail, setOwnerEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("password");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const newErrors = validateInputs();
    if (Object.keys(newErrors).length === 0) {
      setIsEditing(false);
      setErrors({});
      setSuccessMessage("Business info updated successfully!");
      setTimeout(() => setSuccessMessage(""), 5000); // Message disappears after 5 seconds
    } else {
      setErrors(newErrors);
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(businessEmail))
      newErrors.businessEmail = "Invalid business email format.";
    if (!phoneRegex.test(businessPhone))
      newErrors.businessPhone = "Phone number must be 10 digits.";
    if (!emailRegex.test(ownerEmail))
      newErrors.ownerEmail = "Invalid owner email format.";

    return newErrors;
  };

  return (
    <div className="business-edit-page">
      <div className="profile-container">
        <h2 className="profile-title">Edit Business Info</h2>

        {/* Business Details Section */}
        <h3 className="section-title">Business Details</h3>
        <div className="profile-field">
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            id="businessName"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            style={{ color: isEditing ? "black" : "grey" }}
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
          <input
            type="text"
            id="businessEmail"
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            style={{ color: isEditing ? "black" : "grey" }}
          />
          {errors.businessEmail && (
            <span className="error">{errors.businessEmail}</span>
          )}
        </div>
        <div className="profile-field">
          <label htmlFor="businessPhone">Business Phone Number</label>
          <input
            type="text"
            id="businessPhone"
            value={businessPhone}
            onChange={(e) => setBusinessPhone(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            style={{ color: isEditing ? "black" : "grey" }}
          />
          {errors.businessPhone && (
            <span className="error">{errors.businessPhone}</span>
          )}
        </div>
        <div className="profile-field">
          <label htmlFor="businessAddressCity">City</label>
          <input
            type="text"
            id="businessAddressCity"
            value={businessAddress.city}
            onChange={(e) =>
              setBusinessAddress({ ...businessAddress, city: e.target.value })
            }
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            style={{ color: isEditing ? "black" : "grey" }}
          />
        </div>
        <div className="profile-field">
          <label htmlFor="businessAddressStreet">Street</label>
          <input
            type="text"
            id="businessAddressStreet"
            value={businessAddress.street}
            onChange={(e) =>
              setBusinessAddress({ ...businessAddress, street: e.target.value })
            }
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            style={{ color: isEditing ? "black" : "grey" }}
          />
        </div>

        {/* Business Operation Details Section */}
        <h3 className="section-title">Business Operation Details</h3>
        <div className="profile-field">
          <label htmlFor="operatingHours">Operating Hours</label>
          <input
            type="text"
            id="operatingHours"
            value={operatingHours}
            onChange={(e) => setOperatingHours(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            style={{ color: isEditing ? "black" : "grey" }}
          />
        </div>
        <div className="profile-field">
          <label htmlFor="description">Description of Business</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            style={{ color: isEditing ? "black" : "grey" }}
          />
        </div>

        {/* Owner/Representative Details Section */}
        <h3 className="section-title">Owner/Representative Details</h3>
        <div className="profile-field">
          <label htmlFor="ownerName">Owner/Representative Name</label>
          <input
            type="text"
            id="ownerName"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            style={{ color: isEditing ? "black" : "grey" }}
          />
        </div>
        <div className="profile-field">
          <label htmlFor="ownerEmail">Owner's Email</label>
          <input
            type="text"
            id="ownerEmail"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            style={{ color: isEditing ? "black" : "grey" }}
          />
          {errors.ownerEmail && (
            <span className="error">{errors.ownerEmail}</span>
          )}
        </div>
        <div className="profile-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "editable" : ""}
            style={{ color: isEditing ? "black" : "grey" }}
          />
        </div>

        <div className="button-container">
          <button className="edit-btn" onClick={handleEditClick}>
            Edit
          </button>
          {isEditing && (
            <button className="save-btn" onClick={handleSaveClick}>
              Submit
            </button>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default EditBusinessInfo;
