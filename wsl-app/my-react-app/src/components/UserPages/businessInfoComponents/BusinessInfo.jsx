import React, { useState, useEffect } from 'react';
import './BusinessInfo.css';
import HalfRating from '../HalfRating';

export default function BusinessInfo({ businessInfo }) {
  const [currentStatus, setCurrentStatus] = useState({ day: "", status: "" });

  useEffect(() => {
    const checkOpenStatus = () => {
      const today = new Date();
      const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" });
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();

      const openingTime = businessInfo.openingHours[dayOfWeek]?.start || "00:00";
      const closingTime = businessInfo.openingHours[dayOfWeek]?.end || "00:00";

      const [openingHour, openingMinute] = openingTime.split(":").map(Number);
      const [closingHour, closingMinute] = closingTime.split(":").map(Number);

      const isOpen =
        (currentHour > openingHour || (currentHour === openingHour && currentMinute >= openingMinute)) &&
        (currentHour < closingHour || (currentHour === closingHour && currentMinute < closingMinute));

      setCurrentStatus({ day: dayOfWeek, status: isOpen ? "Open" : "Closed" });
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [businessInfo.openingHours]);

  return (
    <div className="business-Info-section">
      <h2 className="business-name">{businessInfo.name}</h2>
      <div className="rating-review-container">
        <HalfRating rating={businessInfo.rating} reviewers={businessInfo.reviewers} readOnly={true} />
        <span className="review-count">({businessInfo.reviewers} reviews)</span>
      </div>
      
      <p className="business-description">{businessInfo.description}</p>
      <div className="business-status-hours">
        <span className={`status ${currentStatus.status.toLowerCase()}`}>
          {currentStatus.status}
        </span>
        <span className="business-hours">
          {`${currentStatus.day}: ${businessInfo.openingHours[currentStatus.day]?.start || "N/A"} - ${businessInfo.openingHours[currentStatus.day]?.end || "N/A"}`}
        </span>
      </div>
    </div>
  );
}
