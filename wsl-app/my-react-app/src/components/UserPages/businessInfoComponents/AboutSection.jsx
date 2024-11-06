import React from 'react';
import './AboutSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default function AboutSection({ owner }) {
  return (
    <div className="about-section">
      <h3 className="about-title">About the Business</h3>
      <div className="about-owner">
        <FontAwesomeIcon icon={faUserCircle} size="3x" className="owner-icon" />
        <div className="owner-info">
          <p className="owner-name">{owner.name}</p>
          <p className="owner-role">Business Owner</p>
        </div>
      </div>
      {/* <p className="owner-description">Description</p> */}
    </div>
  );
}
