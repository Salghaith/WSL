import React from 'react';
import './LicenseSection.css';
import licenseImage from '../../images/License.svg';


export default function LicenseSection() {
  return (
    <div className="license-section">
      <img src={licenseImage} alt="License Organization" className="license-image" />
      <div className="license-info">
        <h3 className="verified-license">Verified License</h3>
        <p className="license-confirmation">WSL confirmed a business or employee license.</p>
      </div>
    </div>
  );
}
