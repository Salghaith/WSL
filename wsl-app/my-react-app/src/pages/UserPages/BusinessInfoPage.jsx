import React from 'react';
import BusinessInfo from './businessInfoComponents/BusinessInfo';
import ContactInfo from './businessInfoComponents/ContactInfo';
import LicenseSection from './businessInfoComponents/LicenseSection';
import AboutSection from './businessInfoComponents/AboutSection';
import LocationHoursSection from './businessInfoComponents/LocationHoursSection';
import UserRating from './businessInfoComponents/UserRating';
import CustomerRating from './businessInfoComponents/CustomerRating';
import './BusinessInfoPage.css';

export default function BusinessPage({ businessInfo, contactInfo, highlights, owner, location, ratingDistribution, onReviewSubmit, reviews, newReview }) {
  return (
    <div className="business-page-container">
      <div className="business-info-wrapper">
        <BusinessInfo businessInfo={businessInfo} />
        <hr className="section-divider" />
        <LicenseSection />
        <hr className="section-divider" />
        <AboutSection owner={owner} />
        <hr className="section-divider" />
        <LocationHoursSection location={location} hours={businessInfo.openingHours} />
        <hr className="section-divider" />

        {/* User Rating Section */}
        <UserRating
          userName="John Doe"
          businessName={businessInfo.name}
          overallRating={businessInfo.rating}
          totalReviews={businessInfo.reviewers}
          ratingDistribution={ratingDistribution}
          onReviewSubmit={onReviewSubmit}
        />

        <hr className="section-divider" />

        {/* Customer Ratings Section */}
        <CustomerRating reviews={reviews} newReview={newReview} />
      </div>

      <div className="contact-info-wrapper">
        <ContactInfo contactInfo={contactInfo} />
      </div>
    </div>
  );
}
