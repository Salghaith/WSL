import React, { useContext } from "react";
import BusinessInfo from "../../components/UserPages/businessInfoComponents/BusinessInfo";
import ContactInfo from "../../components/UserPages/businessInfoComponents/ContactInfo";
import LicenseSection from "../../components/UserPages/businessInfoComponents/LicenseSection";
import AboutSection from "../../components/UserPages/businessInfoComponents/AboutSection";
import LocationHoursSection from "../../components/UserPages/businessInfoComponents/LocationHoursSection";
import UserRating from "../../components/UserPages/businessInfoComponents/UserRating";
import CustomerRating from "../../components/UserPages/businessInfoComponents/CustomerRating";
import "./BusinessInfoPage.css";
import { UserContext } from "../../components/util/context";

export default function BusinessPage() {
  const { loggedInUser } = useContext(UserContext);

  const onReviewSubmit = (newRating) => {
    let name = newRating.name;
    let rating = newRating.rating;
    let text = newRating.text;
  };

  return (
    <div className="business-page-container">
      <div className="business-info-wrapper">
        <BusinessInfo
          businessInfo={
            businessInfo
          } /* Checked businessInfo = business Object*/
        />
        <hr className="section-divider" />
        <LicenseSection /* Checked */ />
        <hr className="section-divider" />
        <AboutSection owner={owner} /* Checked owner = business Object*/ />
        <hr className="section-divider" />
        <LocationHoursSection
          location={location}
          hours={businessInfo.openingHours} /* Not ready yet! */
        />
        <hr className="section-divider" />

        {/* User Rating Section */}
        {loggedInUser && (
          <>
            <UserRating
              /* Checked businessInfo = business Object*/
              userName={loggedInUser.name}
              businessName={businessInfo.name}
              overallRating={businessInfo.rating}
              totalReviews={businessInfo.reviewers}
              //ratingDistribution={ratingDistribution}
              onReviewSubmit={onReviewSubmit}
            />

            <hr className="section-divider" />
          </>
        )}

        {/* Customer Ratings Section */}
        <CustomerRating reviews={reviews} /* Checked */ />
      </div>

      <div className="contact-info-wrapper">
        <ContactInfo
          contactInfo={contactInfo}
          /* Checked contactInfo = business Object*/
        />
      </div>
    </div>
  );
}
