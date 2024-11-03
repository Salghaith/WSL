import React, { useState, useEffect } from "react";
import "./LocationHoursSection.css";

export default function LocationHoursSection({ location, hours }) {
  const [dayStatuses, setDayStatuses] = useState({});

  useEffect(() => {
    const getCurrentRiyadhTime = () => {
      const now = new Date();
      const riyadhTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Riyadh",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "long",
      }).formatToParts(now);

      const day =
        riyadhTime.find((part) => part.type === "weekday")?.value || "";
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
      return { day, totalMinutes };
    };

    const updateDayStatuses = () => {
      const { day: todayDay, totalMinutes } = getCurrentRiyadhTime();

      const newStatuses = {};
      for (const [day, { start, end }] of Object.entries(hours)) {
        const [startHour, startMinute] = start
          .split(" ")
          .join("")
          .split(":")
          .map(Number);
        const [endHour, endMinute] = end
          .split(" ")
          .join("")
          .split(":")
          .map(Number);

        const startMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;

        if (day === todayDay) {
          newStatuses[day] =
            totalMinutes >= startMinutes && totalMinutes < endMinutes
              ? "Open"
              : "Closed";
        } else {
          newStatuses[day] = "";
        }
      }
      setDayStatuses(newStatuses);
    };

    // updateDayStatuses();
    const interval = setInterval(updateDayStatuses, 60000);

    return () => clearInterval(interval);
  }, [hours]);

  return (
    <div className="location-hours-section">
      <h3 className="section-titlep">Location & Hours</h3>
      <div className="location-hours-content">
        <div className="map-container">
          <div className="map-image" /* MA==GoogleMap here */ ></div>
          <div className="address">{`${location.city}, ${location.street}`}</div>
        </div>
        <div className="business-hours-list">
          {Object.entries(hours).map(([day, { start, end }]) => (
            <div key={day} className="hours-item">
              <span className="day">{day.substring(0, 3).toUpperCase()}</span>
              <span className="hours">{`${start} - ${end}`}</span>
              <span className={`status ${dayStatuses[day]?.toLowerCase()}`}>
                {dayStatuses[day]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
