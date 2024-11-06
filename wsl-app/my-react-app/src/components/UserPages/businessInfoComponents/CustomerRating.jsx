import React, { useState } from "react";
import "./CustomerRating.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mui/material";
import HalfRating from "../../Shared/RatingStars";

export default function CustomerRating({ reviews }) {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Calculate the current reviews to display based on pagination
  const currentReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="customer-rating-section">
      <h3 className="section-title">Customer Reviews</h3>
      <div className="reviews-container">
        {currentReviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <FontAwesomeIcon
                icon={faUserCircle}
                size="2x"
                className="profile-icon"
              />
              <p className="customer-name">{review.client.name}</p>
            </div>

            <HalfRating name="customer-rating" rating={review.rating} />
            <p className="customer-review-text">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index + 1}
            className={`page-number ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <FontAwesomeIcon
          icon={faChevronRight}
          className="next-arrow"
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
        />
      </div>
    </div>
  );
}
