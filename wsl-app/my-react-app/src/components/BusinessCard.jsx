import React from "react";
import "./BusinessCard.css";
import workerIcon from "../assets/worker-pic.svg";
import HalfRating from "./RatingStars";

const BusinessCard = (props) => {
  return (
    <div className="business-card">
      <div key={props.index} className="post">
        <img src={props.image} alt={props.title} className="post-image" />
        <div className="post-info">
          <h3 className="post-title">{props.title}</h3>
          <HalfRating className="post-rating" rating={props.rating} reviewers={20}/>
          <p className="post-description">{props.description}</p>
          <p className="post-hours">Opening Hours: From {props.openFrom} to {props.openTo}</p>
        </div>
      </div>
    </div>
  );
};
export default BusinessCard;
