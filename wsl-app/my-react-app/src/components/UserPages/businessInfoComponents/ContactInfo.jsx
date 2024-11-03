import React from "react";
import "./ContactInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function ContactInfo({ contactInfo }) {
  return (
    <div className="contact-info-section">
      <h2 className="contact-heading">Contact Information</h2>
      <hr className="light-divider" />

      <div className="contact-item">
        <p className="contact-text">{contactInfo.email}</p>
        <FontAwesomeIcon
          icon={faEnvelope}
          className="contact-icon"
          onClick={() => window.open(`mailto:${contactInfo.email}`)}
        />
      </div>

      <hr className="light-divider" />

      <div className="contact-item">
        <p className="contact-text">{contactInfo.phoneNumber}</p>
        <FontAwesomeIcon
          icon={faPhone}
          className="contact-icon"
          onClick={() =>
            window.open(
              `https://wa.me/${contactInfo.phoneNumber}?text=Hi,%20I%20Would%20Like%20To%20Ask%20About%20Your%20Services`,
              "_blank"
            )
          }
        />
      </div>

      <hr className="light-divider" />

      <div className="address-container">
        <p className="contact-address">{`${contactInfo.location.city}, ${contactInfo.location.street}`}</p>
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          className="contact-icon"
          onClick={() =>
            window.open(
              `https://www.google.com/maps/@${contactInfo.location.lat},${contactInfo.location.lng}`,
              "_blank"
            )
          }
        />
      </div>
    </div>
  );
}
