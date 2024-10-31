import React from "react";
import "./BusinessCard.css";
import HalfRating from "../Shared/RatingStars";
import Map from "../Shared/Map";

const BusinessCard = (props) => {
  const coor = { lat: 24.7660544, lng: 46.7533824 };
  return (
    <div className="business-card">
      <div key={props.index} className="post">
        {/* <img src={props.image} alt={props.title} className="post-image" /> */}
        <div className="post-image">
          <Map center={coor} zoom={15} />
        </div>
        <div className="post-info">
          <h3 className="post-title">{props.title}</h3>
          <HalfRating
            className="post-rating"
            rating={props.rating}
            reviewers={20}
          />
          <p className="post-description">{props.description}</p>
          <p className="post-hours">
            Opening Hours: From {props.openFrom} to {props.openTo}
          </p>
        </div>
      </div>
    </div>
  );
};
export default BusinessCard;
