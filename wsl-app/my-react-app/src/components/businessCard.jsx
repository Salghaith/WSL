import React from "react";
import "./businessCard.css";

const BusinessCard = (props) => {
  return (
    <div key={index} className="post">
      <img src={workerIcon} alt={props.title} className="post-image" />
      <div className="post-info">
        <h3 className="post-title">{props.title}</h3>
        <p className="post-rating">Rating: {props.rating}</p>
        <p className="post-description">{props.description}</p>
        <p className="post-hours">Opening Hours: {props.openingHours}</p>
      </div>
    </div>
  );
};
