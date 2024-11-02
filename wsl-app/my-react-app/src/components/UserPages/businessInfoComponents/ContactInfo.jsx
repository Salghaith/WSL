import React from 'react';
import './ContactInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

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
          onClick={() => window.location.href = `mailto:${contactInfo.email}`} 
        />
      </div>
      
      <hr className="light-divider" />
      
      <div className="contact-item">
        <p className="contact-text">{contactInfo.phone}</p>
        <FontAwesomeIcon 
          icon={faPhone} 
          className="contact-icon"
          onClick={() => window.location.href = `https://wa.me/${contactInfo.phone}`} 
        />
      </div>
      
      <hr className="light-divider" />
      
      
      <div className="address-container">
        <p className="contact-address">{`${contactInfo.location.city}, ${contactInfo.location.street}`}</p>
        <FontAwesomeIcon 
          icon={faMapMarkerAlt} 
          className="contact-icon"
          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${contactInfo.location.city},${contactInfo.location.street}`, '_blank')}
        />
      </div>
    </div>
  );
}
