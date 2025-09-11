import React from 'react';

const LoadingOverlay = ({ message = "Loading earthquake data..." }) => (
  <div className="loading-overlay">
    <div className="loading-content">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  </div>
);

export default LoadingOverlay;