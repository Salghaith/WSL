import React from "react";
import "./BusinessCard.css";
import HalfRating from "../Shared/RatingStars";
import Map from "../Shared/Map";
import { useNavigate } from "react-router-dom";

const BusinessCard = (props) => {
  const navigate = useNavigate();
  const coor = { lat: 24.7660544, lng: 46.7533824 };
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="business-card" onClick={handleClick}>
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
            reviewers={props.reviewers}
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
