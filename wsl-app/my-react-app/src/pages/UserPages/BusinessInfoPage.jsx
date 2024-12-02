import React, { useContext, useEffect, useState } from "react";
import BusinessInfo from "../../components/UserPages/businessInfoComponents/BusinessInfo";
import ContactInfo from "../../components/UserPages/businessInfoComponents/ContactInfo";
import LicenseSection from "../../components/UserPages/businessInfoComponents/LicenseSection";
import AboutSection from "../../components/UserPages/businessInfoComponents/AboutSection";
import LocationHoursSection from "../../components/UserPages/businessInfoComponents/LocationHoursSection";
import UserRating from "../../components/UserPages/businessInfoComponents/UserRating";
import CustomerRating from "../../components/UserPages/businessInfoComponents/CustomerRating";
import "./BusinessInfoPage.css";
import { UserContext } from "../../components/util/context";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import getAddress from "../../components/util/getAddress";
import sendEmail from "../../components/util/sendEmail";
import {
  userReviewEmailTemplate,
  ownerReviewNotificationTemplate,
} from "../../components/util/emailTemplates";
import Snackbar from "@mui/material/Snackbar";

export default function BusinessPage() {
  const { loggedInUser, apiBaseUrl } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  //const { businessData } = location.state || {};
  const initialBusinessData = location.state?.businessData || {};
  const [businessData, setBusinessData] = useState(initialBusinessData);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successReview, setSuccessReview] = useState(false);
  const audio = new Audio("https://www.soundjay.com/buttons/button-37a.mp3");

  useEffect(() => {
    if (businessData) {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(
            `${apiBaseUrl}/business/${businessData._id}/reviews`
          );
          setReviews(response.data.reviews); // Assuming the API returns reviews in this format
          setBusinessData((prev) => ({
            ...prev,
            ratings: response.data.ratings,
            reviews: response.data.reviews,
          }));
        } catch (error) {
          console.error("Error fetching reviews:", error);
          setErrorMessage("Failed to load reviews");
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    }
  }, [businessData._id]);

  const onReviewSubmit = async (newReview) => {
    try {
      const { rating, text } = newReview;

      const response = await axios.post(
        `${apiBaseUrl}/business/review`,
        {
          businessId: businessData._id, // Pass the business ID
          rating,
          text,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        console.log("Review submitted successfully:", response.data);
        setBusinessData(response.data.business);
        // Optionally update local state to display the new review immediately
        setSuccessReview(true);
        audio.play();
        sendEmail(
          loggedInUser.email,
          "Review submitted successfully!",
          userReviewEmailTemplate(),
          apiBaseUrl
        ); //Send email to the user.
        sendEmail(
          businessData.email,
          "New Review to Your Business!",
          ownerReviewNotificationTemplate(loggedInUser.name, rating),
          apiBaseUrl
        ); //Send email to the business owner
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const [address, setAddress] = useState({ street: "", district: "" });

  useEffect(() => {
    if (businessData?.location) {
      getAddress(
        businessData.location.latitude,
        businessData.location.longitude
      )
        .then((data) => setAddress(data))
        .catch((error) => console.error("Error fetching address:", error));
    }
  }, []);

  if (!businessData) {
    return <p>No Business Data Available</p>;
  }

  return (
    <div className="business-page-container">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={successReview}
        message="Review submitted successfully!"
      />
      <div className="business-info-wrapper">
        <BusinessInfo businessInfo={businessData} />
        <hr className="section-divider" />
        <LicenseSection /* Checked */ />
        <hr className="section-divider" />
        <AboutSection owner={businessData.owner} />
        <hr className="section-divider" />
        <LocationHoursSection
          location={businessData.location}
          address={address}
          hours={businessData.openingHours} // Not ready yet!
        />
        <hr className="section-divider" />

        {/* User Rating Section */}
        {loggedInUser && (
          <>
            <UserRating
              userName={loggedInUser.name}
              businessName={businessData}
              overallRating={businessData.ratings}
              totalReviews={businessData.reviews.length}
              //ratingDistribution={ratingDistribution}
              onReviewSubmit={onReviewSubmit}
            />

            <hr className="section-divider" />
          </>
        )}

        {/* Customer Ratings Section */}
        <CustomerRating reviews={reviews} />
      </div>
      <div className="contact-info-wrapper">
        <ContactInfo contactInfo={businessData} address={address} />
      </div>
    </div>
  );
}
