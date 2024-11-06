import React, { useState, useEffect } from "react";
import "./LocationHoursSection.css";
import BusinessInfoMap from "./BusinessInfoMap";

export default function LocationHoursSection({ location, hours, address }) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const getCurrentRiyadhTime = () => {
      const now = new Date();
      const riyadhTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Riyadh",
        hour: "2-digit",
        minute: "2-digit",
      }).formatToParts(now);

      const hour = parseInt(
        riyadhTime.find((part) => part.type === "hour")?.value,
        10
      );
      const minute = parseInt(
        riyadhTime.find((part) => part.type === "minute")?.value,
        10
      );
      const isPM =
        riyadhTime.find((part) => part.type === "dayPeriod")?.value === "PM";

      const totalMinutes = (isPM && hour < 12 ? hour + 12 : hour) * 60 + minute;
      return totalMinutes;
    };

    const updateStatus = () => {
      const totalMinutes = getCurrentRiyadhTime();

      const [fromHour, fromMinute] = hours.from
        .split(" ")
        .join("")
        .split(":")
        .map(Number);
      const [toHour, toMinute] = hours.to
        .split(" ")
        .join("")
        .split(":")
        .map(Number);

      const fromMinutes = fromHour * 60 + fromMinute;
      const toMinutes = toHour * 60 + toMinute;

      const currentStatus =
        totalMinutes >= fromMinutes && totalMinutes < toMinutes
          ? "Open"
          : "Closed";

      setStatus(currentStatus);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000);

    return () => clearInterval(interval);
  }, [hours]);


  return (
    <div className="location-hours-section">
      <h3 className="section-titlep">Location & Hours</h3>
      <div className="location-hours-content">
        <div className="map-container">
          <div className="map-image" /* MA==GoogleMap here */ ><BusinessInfoMap coordinates={location}/></div>
          <div className="address">{`${address.district}, ${address.street}`}</div>
        </div>
        <div className="business-hours-list">
          <div className="hours-item">
            <span className="hours">{`${hours.from} - ${hours.to}`}</span>
            <span className={`status ${status.toLowerCase()}`}>
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
