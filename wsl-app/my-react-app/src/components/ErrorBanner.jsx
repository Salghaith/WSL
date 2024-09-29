import React from 'react';
import './ErrorBanner.css'; // Import CSS for styling

const ErrorBanner = ({ message }) => {
  if (!message) return null; // Don't render if no message

  return (
    <div className="error-banner">
      <p>{message}</p>
    </div>
  );
};

export default ErrorBanner;
