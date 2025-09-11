import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => (
    <div className="loading-container" role="status">
        <div className="loading-spinner"></div>
        <p>Loading earthquake data...</p>
    </div>
);

export default LoadingSpinner;