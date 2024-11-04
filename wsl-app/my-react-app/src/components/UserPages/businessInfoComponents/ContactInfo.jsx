import React, {useState, useEffect}from "react";
import "./ContactInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import getAddress from "../../util/getAddress";

export default function ContactInfo({ contactInfo }) {
  const [address, setAddress] = useState({ street: '', city: '', district: '' });

  useEffect(() => {
    if (contactInfo?.location) {
      getAddress(contactInfo.location.latitude, contactInfo.location.longitude)
        .then((data) => setAddress(data))
        .catch((error) => console.error("Error fetching address:", error));
    }
  }, [contactInfo]);
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
        <p className="contact-address">{`${address.district ?? "N/A"}, ${
          address.street ?? "N/A"
        }`}</p>
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          className="contact-icon"
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${contactInfo.location.latitude},${contactInfo.location.longitude}`,
              "_blank"
            )
          }
        />
      </div>
    </div>
  );
}
