import React, { useState, useEffect } from "react";
import "./LocationHoursSection.css";
import BusinessInfoMap from "./BusinessInfoMap";

export default function LocationHoursSection({ location, hours, address }) {
  return (
    <div className="location-hours-section">
      <h3 className="section-titlep">Location</h3>
      <div className="location-hours-content">
        <div className="map-container">
          <div className="map-image" /* MA==GoogleMap here */>
            <BusinessInfoMap coordinates={location} />
          </div>
          <div className="address">{`${address.district}, ${address.street}`}</div>
        </div>
        <div className="business-hours-list">
          <div className="hours-item">
            {/* <span className="hours">{`${hours.from} - ${hours.to}`}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
