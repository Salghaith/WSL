import React from 'react';
import './HighlightsSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLeaf, faCertificate } from '@fortawesome/free-solid-svg-icons';

export default function HighlightsSection({ highlights }) {
  const icons = {
    faStar,
    faLeaf,
    faCertificate,
  };

  return (
    <div className="highlights-section">
      <h3 className="highlights-title">Highlights from the Business</h3>
      <div className="highlights-container">
        {highlights.map((highlight, index) => (
          <div key={index} className="highlight-item">
            <FontAwesomeIcon icon={icons[highlight.icon]} size="2x" className="highlight-icon" />
            <p className="highlight-label">{highlight.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
