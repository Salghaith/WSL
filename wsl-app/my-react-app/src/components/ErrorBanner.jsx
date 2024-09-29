import React from 'react';
import './ErrorBanner.css';

const ErrorBanner = ({ message }) => {
  if (!message) return null; // Don't render if no message

  return (
    <div className="error-banner">
      <p>{message}</p>
    </div>
  );
};

export default ErrorBanner;
